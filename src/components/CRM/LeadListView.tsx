import React from 'react';
import { useLeads } from '../../context/LeadsContext';
import { PIPELINE_STAGES } from '../../data/seedLeads';
import { LeadStatus } from '../../types';
import { 
  Building2, 
  MessageCircle, 
  Mail, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowUpDown
} from 'lucide-react';

export const LeadListView: React.FC = () => {
  const { leads, filters, setFilters, setSelectedLead, updateLeadStatus, deleteLead } = useLeads();

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q);
      if (!match) return false;
    }
    if (filters.segment !== 'todos' && l.segment !== filters.segment) return false;
    if (filters.solution !== 'todos' && l.solution !== filters.solution) return false;
    if (filters.priority !== 'todas' && l.priority !== filters.priority) return false;
    if (filters.status !== 'todos' && l.status !== filters.status) return false;
    return true;
  });

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const handleWhatsApp = (phone: string, name: string, company: string, solution: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Olá ${name.split(' ')[0]}, tudo bem? Sou consultor da Orbit Smart! Recebemos seu interesse em ${solution} para a ${company}. Vamos conversar?`
    );
    window.open(`https://wa.me/55${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Table Header Summary */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Exibindo <strong className="text-white">{filteredLeads.length}</strong> de{' '}
            <strong className="text-white">{leads.length}</strong> leads cadastrados
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Lead / Empresa</th>
                <th className="py-3 px-4">Segmento</th>
                <th className="py-3 px-4">Solução SaaS</th>
                <th className="py-3 px-4">Valor Estimado</th>
                <th className="py-3 px-4">Estágio do Funil</th>
                <th className="py-3 px-4">Prioridade</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    Nenhum lead encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const stageObj = PIPELINE_STAGES.find((s) => s.id === lead.status);

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Name & Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-purple-300 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3 h-3 text-purple-400" />
                          <span>{lead.company}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {lead.phone} • {lead.email}
                        </div>
                      </td>

                      {/* Segment */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                          {lead.segment}
                        </span>
                      </td>

                      {/* Solution */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <span className="text-purple-300 font-medium block truncate">
                          {lead.solution.split('(')[0]}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {lead.teamSize || 'Porte padrão'}
                        </span>
                      </td>

                      {/* Value */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-emerald-400">
                          {formatBRL(lead.estimatedValue)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="py-1 px-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-purple-500 cursor-pointer"
                        >
                          {PIPELINE_STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                            lead.priority === 'alta'
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                              : lead.priority === 'media'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {lead.priority === 'alta' && <Flame className="w-2.5 h-2.5 text-rose-400" />}
                          <span>{lead.priority.toUpperCase()}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px] font-mono">
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp button */}
                          <button
                            onClick={() => handleWhatsApp(lead.phone, lead.name, lead.company, lead.solution)}
                            className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/30 cursor-pointer"
                            title="Conversar no WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>

                          {/* View details */}
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-500/30 cursor-pointer"
                            title="Abrir Detalhes do Lead"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Deseja realmente excluir o lead "${lead.name}"?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-rose-950 text-slate-500 hover:text-rose-400 border border-slate-800 cursor-pointer"
                            title="Excluir lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
