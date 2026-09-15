export type LeadStatus = 
  | 'novo'
  | 'contato'
  | 'reuniao'
  | 'proposta'
  | 'negociacao'
  | 'ganho'
  | 'perdido';

export type LeadPriority = 'baixa' | 'media' | 'alta';

export type SegmentType = 
  | 'Comércio & Varejo'
  | 'Indústria & Manufatura'
  | 'Serviços & Consultoria'
  | 'Saúde & Clínicas'
  | 'Logística & Transportes'
  | 'Agronegócio'
  | 'Educação & Treinamentos'
  | 'Tecnologia & Startups'
  | 'Outro Segmento';

export type SolutionType = 
  | 'Orbit CRM (Gestão de Vendas & Clientes)'
  | 'Orbit ERP (Gestão Empresarial Completa)'
  | 'Orbit Apps (App Mobile Sob Medida)'
  | 'Ecossistema Completo (ERP + CRM + App)';

export type TeamSizeType = '1-5 colaboradores' | '6-20 colaboradores' | '21-50 colaboradores' | '51-100 colaboradores' | '100+ colaboradores';

export interface ActivityLog {
  id: string;
  date: string;
  type: 'status_change' | 'note_added' | 'created' | 'contact_attempt' | 'meeting_scheduled';
  text: string;
  author?: string;
}

export interface LeadNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  segment: SegmentType;
  solution: SolutionType;
  teamSize?: TeamSizeType;
  estimatedBudget?: string;
  estimatedValue: number; // in R$
  message?: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: 'Landing Page' | 'WhatsApp Direto' | 'Indicação' | 'Inbound Manual' | 'Campanha Ads';
  createdAt: string;
  updatedAt: string;
  nextFollowUp?: string;
  notes: LeadNote[];
  activityLog: ActivityLog[];
}

export interface PipelineStageConfig {
  id: LeadStatus;
  label: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
}

export interface LeadFilters {
  search: string;
  status: LeadStatus | 'todos';
  segment: SegmentType | 'todos';
  solution: SolutionType | 'todos';
  priority: LeadPriority | 'todas';
  sortBy: 'createdAt_desc' | 'createdAt_asc' | 'value_desc' | 'value_asc' | 'name_asc';
}
