import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lead, LeadStatus, LeadPriority, LeadFilters, SegmentType, SolutionType } from '../types';
import { INITIAL_LEADS } from '../data/seedLeads';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface ToastInfo {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info';
}

interface LeadsContextType {
  leads: Lead[];
  isLoading: boolean;
  isSupabaseActive: boolean;
  activeTab: 'landing' | 'crm';
  setActiveTab: (tab: 'landing' | 'crm') => void;
  activeCrmView: 'kanban' | 'tabela' | 'analytics';
  setActiveCrmView: (view: 'kanban' | 'tabela' | 'analytics') => void;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  isNewLeadModalOpen: boolean;
  setIsNewLeadModalOpen: (open: boolean) => void;
  filters: LeadFilters;
  setFilters: React.Dispatch<React.SetStateAction<LeadFilters>>;
  addLead: (leadData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    segment: SegmentType;
    solution: SolutionType;
    teamSize?: string;
    estimatedBudget?: string;
    message?: string;
    source?: Lead['source'];
  }) => Promise<Lead>;
  updateLeadStatus: (leadId: string, newStatus: LeadStatus) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  addLeadNote: (leadId: string, content: string, author?: string) => void;
  deleteLead: (leadId: string) => void;
  exportLeadsToCsv: () => void;
  resetToDemoData: () => void;
  refreshLeads: () => Promise<void>;
  newLeadsCount: number;
  totalPipelineValue: number;
  toast: ToastInfo | null;
  dismissToast: () => void;
}

const STORAGE_KEY = 'orbit_smart_crm_leads_v2';

const defaultFilters: LeadFilters = {
  search: '',
  status: 'todos',
  segment: 'todos',
  solution: 'todos',
  priority: 'todas',
  sortBy: 'createdAt_desc',
};

// Helper to safely convert any Supabase DB row (snake_case or camelCase) into Orbit CRM Lead type
const mapRowToLead = (row: any): Lead => {
  const now = new Date().toISOString();
  return {
    id: String(row.id ?? `lead-${Date.now()}`),
    name: row.name || row.nome || 'Contato Sem Nome',
    email: row.email || '',
    phone: row.phone || row.telefone || '',
    company: row.company || row.empresa || 'Empresa Não Informada',
    segment: (row.segment || row.segmento || 'Outro Segmento') as SegmentType,
    solution: (row.solution || row.solucao || 'Orbit CRM (Gestão de Vendas & Clientes)') as SolutionType,
    teamSize: (row.team_size || row.teamSize || '6-20 colaboradores') as any,
    estimatedBudget: row.estimated_budget || row.estimatedBudget || 'Sob consulta',
    estimatedValue: Number(row.estimated_value ?? row.estimatedValue ?? 8000),
    message: row.message || row.mensagem || '',
    status: (row.status || 'novo') as LeadStatus,
    priority: (row.priority || row.prioridade || 'media') as LeadPriority,
    source: (row.source || row.origem || 'Landing Page') as Lead['source'],
    createdAt: row.created_at || row.createdAt || now,
    updatedAt: row.updated_at || row.updatedAt || now,
    notes: Array.isArray(row.notes)
      ? row.notes
      : typeof row.notes === 'string'
      ? (() => { try { return JSON.parse(row.notes); } catch { return []; } })()
      : [],
    activityLog: Array.isArray(row.activity_log)
      ? row.activity_log
      : Array.isArray(row.activityLog)
      ? row.activityLog
      : typeof row.activity_log === 'string'
      ? (() => { try { return JSON.parse(row.activity_log); } catch { return []; } })()
      : [
          {
            id: `act-${Date.now()}`,
            date: row.created_at || now,
            type: 'created',
            text: 'Lead sincronizado com o Supabase',
          },
        ],
  };
};

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar leads do localStorage', e);
    }
    return INITIAL_LEADS;
  });

  const [isLoading, setIsLoading] = useState<boolean>(isSupabaseConfigured);
  const [activeTab, setActiveTab] = useState<'landing' | 'crm'>('landing');
  const [activeCrmView, setActiveCrmView] = useState<'kanban' | 'tabela' | 'analytics'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<LeadFilters>(defaultFilters);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, title, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 5500);
  }, []);

  const dismissToast = () => {
    setToast(null);
  };

  // Sync leads back to localStorage as reliable local cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Falha ao salvar cache no localStorage', e);
    }
  }, [leads]);

  // Keep selectedLead in sync if leads list changes
  useEffect(() => {
    if (selectedLead) {
      const updated = leads.find((l) => l.id === selectedLead.id);
      if (updated) {
        setSelectedLead(updated);
      }
    }
  }, [leads]);

  // 1. Fetch leads from Supabase on mount
  const fetchLeads = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Orbit Supabase] Consulta à tabela leads:', error.message);
      } else if (data && Array.isArray(data)) {
        if (data.length > 0) {
          const loadedLeads = data.map(mapRowToLead);
          setLeads(loadedLeads);
        }
      }
    } catch (err) {
      console.warn('[Orbit Supabase] Falha na sincronização inicial:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // 2. Realtime subscription for Supabase
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('leads-realtime-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          console.info('[Supabase Realtime Event]', payload.eventType, payload);

          if (payload.eventType === 'INSERT') {
            const newLead = mapRowToLead(payload.new);
            setLeads((prev) => {
              // Prevent duplicates if already inserted locally
              if (prev.some((l) => l.id === newLead.id)) {
                return prev.map((l) => (l.id === newLead.id ? newLead : l));
              }
              return [newLead, ...prev];
            });

            showToast(
              '⚡ Novo Lead em Tempo Real!',
              `${newLead.name} (${newLead.company}) acabou de entrar no CRM via Supabase Realtime.`,
              'success'
            );
          } else if (payload.eventType === 'UPDATE') {
            const updatedLead = mapRowToLead(payload.new);
            setLeads((prev) =>
              prev.map((l) => (l.id === updatedLead.id ? { ...l, ...updatedLead } : l))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = String((payload.old as any)?.id);
            if (deletedId) {
              setLeads((prev) => prev.filter((l) => l.id !== deletedId));
              if (selectedLead?.id === deletedId) {
                setSelectedLead(null);
              }
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.info('🟢 [Supabase Realtime] Conectado e ouvindo eventos da tabela `leads`');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedLead, showToast]);

  const estimateValueBySolution = (solution: SolutionType, teamSize?: string): number => {
    let base = 8000;
    if (solution.includes('CRM')) base = 6500;
    if (solution.includes('ERP')) base = 18000;
    if (solution.includes('Apps')) base = 15000;
    if (solution.includes('Ecossistema')) base = 32000;

    if (teamSize?.includes('21-50')) base *= 1.35;
    if (teamSize?.includes('51-100')) base *= 1.7;
    if (teamSize?.includes('100+')) base *= 2.2;
    return Math.round(base);
  };

  // 3. addLead: Inserts into Supabase `leads` table and updates state
  const addLead = async (leadData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    segment: SegmentType;
    solution: SolutionType;
    teamSize?: string;
    estimatedBudget?: string;
    message?: string;
    source?: Lead['source'];
  }): Promise<Lead> => {
    const now = new Date().toISOString();
    const estVal = estimateValueBySolution(leadData.solution, leadData.teamSize);

    const initialLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadData.name.trim(),
      email: leadData.email.trim(),
      phone: leadData.phone.trim(),
      company: leadData.company.trim(),
      segment: leadData.segment,
      solution: leadData.solution,
      teamSize: (leadData.teamSize as any) || '6-20 colaboradores',
      estimatedBudget: leadData.estimatedBudget || 'Sob consulta',
      estimatedValue: estVal,
      message: leadData.message?.trim() || '',
      status: 'novo',
      priority: leadData.solution.includes('Ecossistema') || leadData.teamSize?.includes('50') ? 'alta' : 'media',
      source: leadData.source || 'Landing Page',
      createdAt: now,
      updatedAt: now,
      notes: [],
      activityLog: [
        {
          id: `act-${Date.now()}`,
          date: now,
          type: 'created',
          text: `Lead cadastrado via ${leadData.source || 'Landing Page'} da Orbit Smart`,
        },
      ],
    };

    // Optimistically update local state immediately
    setLeads((prev) => [initialLead, ...prev]);

    showToast(
      '🚀 Novo Lead Recebido!',
      `${initialLead.name} (${initialLead.company}) foi adicionado ao funil de vendas.`,
      'success'
    );

    // If Supabase is configured, insert directly into the `leads` table
    if (isSupabaseConfigured) {
      try {
        const payload: Record<string, any> = {
          name: initialLead.name,
          email: initialLead.email,
          phone: initialLead.phone,
          company: initialLead.company,
          segment: initialLead.segment,
          solution: initialLead.solution,
          team_size: initialLead.teamSize,
          estimated_budget: initialLead.estimatedBudget,
          estimated_value: initialLead.estimatedValue,
          message: initialLead.message,
          status: initialLead.status,
          priority: initialLead.priority,
          source: initialLead.source,
          created_at: initialLead.createdAt,
          updated_at: initialLead.updatedAt,
          notes: initialLead.notes,
          activity_log: initialLead.activityLog,
        };

        const { data, error } = await supabase
          .from('leads')
          .insert([payload])
          .select();

        if (error) {
          console.warn('[Orbit Supabase] Gravação de lead na nuvem:', error.message || error);
          if (error.code === '42501' || (error.message && error.message.includes('row-level security'))) {
            showToast(
              '⚠️ Política de Segurança RLS (Supabase)',
              'O lead foi salvo com sucesso localmente! Para gravar na nuvem do Supabase, certifique-se de liberar a política de INSERT pública para anon no SQL Editor.',
              'info'
            );
          }
          // Retry with basic core columns in case the user's table schema has only basic fields
          if (error.message && (error.message.includes('column') || error.code === '42703')) {
            console.warn('[Orbit Supabase] Tentando inserção com colunas básicas...');
            const fallbackPayload = {
              name: initialLead.name,
              email: initialLead.email,
              phone: initialLead.phone,
              company: initialLead.company,
              message: initialLead.message,
              status: initialLead.status,
            };
            const fallbackRes = await supabase.from('leads').insert([fallbackPayload]).select();
            if (fallbackRes.data && fallbackRes.data[0]) {
              const saved = mapRowToLead(fallbackRes.data[0]);
              setLeads((prev) => prev.map((l) => (l.id === initialLead.id ? saved : l)));
              return saved;
            }
          }
        } else if (data && data[0]) {
          const savedLead = mapRowToLead(data[0]);
          setLeads((prev) => prev.map((l) => (l.id === initialLead.id ? savedLead : l)));
          return savedLead;
        }
      } catch (err) {
        console.warn('[Orbit Supabase] Exceção ao gravar lead:', err);
      }
    }

    return initialLead;
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    const now = new Date().toISOString();
    const stageNames: Record<LeadStatus, string> = {
      novo: 'Novos Leads',
      contato: 'Primeiro Contato',
      reuniao: 'Diagnóstico / Demo',
      proposta: 'Proposta Enviada',
      negociacao: 'Em Negociação',
      ganho: 'Fechado (Ganho) 🚀',
      perdido: 'Perdido / Desqualificado',
    };

    let updatedActivity: any[] = [];

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        updatedActivity = [
          {
            id: `act-${Date.now()}`,
            date: now,
            type: 'status_change',
            text: `Status alterado para: ${stageNames[newStatus]}`,
          },
          ...lead.activityLog,
        ];
        return {
          ...lead,
          status: newStatus,
          updatedAt: now,
          activityLog: updatedActivity,
        };
      })
    );

    if (isSupabaseConfigured) {
      supabase
        .from('leads')
        .update({
          status: newStatus,
          updated_at: now,
          activity_log: updatedActivity,
        })
        .eq('id', leadId)
        .then(({ error }) => {
          if (error) console.warn('[Orbit Supabase] Erro ao atualizar status:', error.message);
        });
    }
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    const now = new Date().toISOString();
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        return {
          ...lead,
          ...updates,
          updatedAt: now,
        };
      })
    );

    if (isSupabaseConfigured) {
      const dbUpdates: Record<string, any> = {
        ...updates,
        updated_at: now,
      };
      if (updates.teamSize) dbUpdates.team_size = updates.teamSize;
      if (updates.estimatedValue) dbUpdates.estimated_value = updates.estimatedValue;
      if (updates.estimatedBudget) dbUpdates.estimated_budget = updates.estimatedBudget;
      if (updates.activityLog) dbUpdates.activity_log = updates.activityLog;

      supabase
        .from('leads')
        .update(dbUpdates)
        .eq('id', leadId)
        .then(({ error }) => {
          if (error) console.warn('[Orbit Supabase] Erro ao atualizar lead:', error.message);
        });
    }
  };

  const addLeadNote = (leadId: string, content: string, author: string = 'Consultor Orbit') => {
    if (!content.trim()) return;
    const now = new Date().toISOString();
    const newNote = {
      id: `note-${Date.now()}`,
      date: now,
      author,
      content: content.trim(),
    };

    let updatedNotes: any[] = [];
    let updatedActivity: any[] = [];

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        updatedNotes = [newNote, ...lead.notes];
        updatedActivity = [
          {
            id: `act-${Date.now()}`,
            date: now,
            type: 'note_added',
            text: `Nota adicionada por ${author}`,
          },
          ...lead.activityLog,
        ];
        return {
          ...lead,
          updatedAt: now,
          notes: updatedNotes,
          activityLog: updatedActivity,
        };
      })
    );

    if (isSupabaseConfigured) {
      supabase
        .from('leads')
        .update({
          notes: updatedNotes,
          activity_log: updatedActivity,
          updated_at: now,
        })
        .eq('id', leadId)
        .then(({ error }) => {
          if (error) console.warn('[Orbit Supabase] Erro ao adicionar nota:', error.message);
        });
    }
  };

  const deleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    if (selectedLead?.id === leadId) {
      setSelectedLead(null);
    }
    showToast('Lead Removido', 'O lead foi excluído com sucesso.', 'info');

    if (isSupabaseConfigured) {
      supabase
        .from('leads')
        .delete()
        .eq('id', leadId)
        .then(({ error }) => {
          if (error) console.warn('[Orbit Supabase] Erro ao deletar lead:', error.message);
        });
    }
  };

  const resetToDemoData = () => {
    setLeads(INITIAL_LEADS);
    setSelectedLead(null);
    showToast('Dados Restaurados', 'Leads de demonstração recarregados com sucesso.', 'info');
  };

  const exportLeadsToCsv = () => {
    if (leads.length === 0) return;
    const headers = [
      'ID',
      'Nome',
      'Empresa',
      'E-mail',
      'Telefone',
      'Segmento',
      'Solução',
      'Porte da Equipe',
      'Valor Estimado (R$)',
      'Status',
      'Prioridade',
      'Origem',
      'Data de Cadastro',
      'Mensagem/Desafio',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.segment}"`,
      `"${l.solution}"`,
      `"${l.teamSize || ''}"`,
      `"${l.estimatedValue}"`,
      `"${l.status}"`,
      `"${l.priority}"`,
      `"${l.source}"`,
      `"${new Date(l.createdAt).toLocaleDateString('pt-BR')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orbit_smart_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Exportado', 'Arquivo de leads baixado para o seu computador.', 'success');
  };

  const newLeadsCount = leads.filter((l) => l.status === 'novo').length;
  const totalPipelineValue = leads
    .filter((l) => l.status !== 'perdido')
    .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        isLoading,
        isSupabaseActive: isSupabaseConfigured,
        activeTab,
        setActiveTab,
        activeCrmView,
        setActiveCrmView,
        selectedLead,
        setSelectedLead,
        isNewLeadModalOpen,
        setIsNewLeadModalOpen,
        filters,
        setFilters,
        addLead,
        updateLeadStatus,
        updateLead,
        addLeadNote,
        deleteLead,
        exportLeadsToCsv,
        resetToDemoData,
        refreshLeads: fetchLeads,
        newLeadsCount,
        totalPipelineValue,
        toast,
        dismissToast,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
};
