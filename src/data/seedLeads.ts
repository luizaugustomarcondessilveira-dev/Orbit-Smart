import { Lead, PipelineStageConfig } from '../types';

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: 'novo',
    label: 'Novos Leads',
    color: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
    borderColor: 'border-indigo-500/40',
    description: 'Leads recém-chegados pela Landing Page aguardando primeiro contato'
  },
  {
    id: 'contato',
    label: 'Primeiro Contato',
    color: 'text-blue-400',
    badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    borderColor: 'border-blue-500/40',
    description: 'Mensagem de WhatsApp ou ligação realizada'
  },
  {
    id: 'reuniao',
    label: 'Diagnóstico / Demo',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    borderColor: 'border-amber-500/40',
    description: 'Demonstração agendada da Orbit Smart'
  },
  {
    id: 'proposta',
    label: 'Proposta Enviada',
    color: 'text-purple-400',
    badgeBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    borderColor: 'border-purple-500/40',
    description: 'Proposta comercial de SaaS sob medida em análise'
  },
  {
    id: 'negociacao',
    label: 'Em Negociação',
    color: 'text-pink-400',
    badgeBg: 'bg-pink-500/15 border-pink-500/30 text-pink-300',
    borderColor: 'border-pink-500/40',
    description: 'Ajustes de escopo, contratos ou faturamento'
  },
  {
    id: 'ganho',
    label: 'Fechado (Ganho) 🚀',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    borderColor: 'border-emerald-500/40',
    description: 'Contrato assinado e início do onboarding Orbit'
  },
  {
    id: 'perdido',
    label: 'Perdido / Desqualificado',
    color: 'text-slate-400',
    badgeBg: 'bg-slate-500/15 border-slate-500/30 text-slate-400',
    borderColor: 'border-slate-500/40',
    description: 'Lead sem orçamento ou fora de escopo'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Carlos Eduardo Silveira',
    email: 'carlos@metallux.ind.br',
    phone: '(11) 98124-5542',
    company: 'Metalúrgica Lux Indústria',
    segment: 'Indústria & Manufatura',
    solution: 'Orbit ERP (Gestão Empresarial Completa)',
    teamSize: '51-100 colaboradores',
    estimatedBudget: 'R$ 15.000 a R$ 35.000',
    estimatedValue: 24500,
    message: 'Precisamos substituir nosso sistema legado antigo. Queremos integrar controle de chão de fábrica, estoque e emissão de notas fiscais.',
    status: 'proposta',
    priority: 'alta',
    source: 'Landing Page',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    nextFollowUp: 'Apresentação da proposta com diretoria na quinta-feira 14h',
    notes: [
      {
        id: 'note-1',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        author: 'Consultor Orbit',
        content: 'Reunião de diagnóstico realizada com Carlos e o gerente financeiro. Alto interesse no módulo de compras e ordem de produção.'
      }
    ],
    activityLog: [
      {
        id: 'act-1',
        date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        type: 'created',
        text: 'Lead cadastrado via Landing Page da Orbit Smart'
      },
      {
        id: 'act-2',
        date: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
        type: 'status_change',
        text: 'Movido para Diagnóstico / Demo'
      },
      {
        id: 'act-3',
        date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        type: 'status_change',
        text: 'Proposta comercial formal enviada por e-mail e WhatsApp'
      }
    ]
  },
  {
    id: 'lead-2',
    name: 'Dra. Mariana Vasconcelos',
    email: 'mariana@clinicavitae.com.br',
    phone: '(19) 99762-3310',
    company: 'Clínica Vitae Integrada',
    segment: 'Saúde & Clínicas',
    solution: 'Ecossistema Completo (ERP + CRM + App)',
    teamSize: '21-50 colaboradores',
    estimatedBudget: 'R$ 20.000+',
    estimatedValue: 32000,
    message: 'Temos 3 unidades de atendimento. Precisamos de um CRM para agendamento e captação de pacientes particulares, mais App para os pacientes verem exames.',
    status: 'reuniao',
    priority: 'alta',
    source: 'Landing Page',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    nextFollowUp: 'Demo ao vivo agendada para amanhã às 10h via Google Meet',
    notes: [
      {
        id: 'note-2',
        date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        author: 'Especialista de Vendas',
        content: 'Mariana gostou muito do recurso de disparos automáticos de lembretes no WhatsApp.'
      }
    ],
    activityLog: [
      {
        id: 'act-4',
        date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        type: 'created',
        text: 'Lead cadastrado via Landing Page da Orbit Smart'
      }
    ]
  },
  {
    id: 'lead-3',
    name: 'Rodrigo Baccarin',
    email: 'rodrigo@translograpido.com.br',
    phone: '(41) 98841-2090',
    company: 'TransLog Sul Distribuidora',
    segment: 'Logística & Transportes',
    solution: 'Orbit Apps (App Mobile Sob Medida)',
    teamSize: '51-100 colaboradores',
    estimatedBudget: 'R$ 15.000 a R$ 25.000',
    estimatedValue: 18500,
    message: 'Buscamos um aplicativo mobile offline-first para os motoristas registrarem canhoto de entrega assinado e comprovante fotográfico.',
    status: 'negociacao',
    priority: 'media',
    source: 'Landing Page',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    nextFollowUp: 'Revisão final de cláusula de suporte 24h na minuta',
    notes: [
      {
        id: 'note-3',
        date: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        author: 'Consultor Orbit',
        content: 'Enviamos a minuta contratual para o jurídico da TransLog. Esperamos fechar até sexta.'
      }
    ],
    activityLog: [
      {
        id: 'act-5',
        date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        type: 'created',
        text: 'Lead cadastrado via Landing Page'
      }
    ]
  },
  {
    id: 'lead-4',
    name: 'Juliana Mendes',
    email: 'juliana@boutiquekids.com.br',
    phone: '(21) 97133-8822',
    company: 'Boutique Kids Moda Infantil',
    segment: 'Comércio & Varejo',
    solution: 'Orbit CRM (Gestão de Vendas & Clientes)',
    teamSize: '6-20 colaboradores',
    estimatedBudget: 'R$ 5.000 a R$ 10.000',
    estimatedValue: 7800,
    message: 'Nossa equipe atende por WhatsApp mas perdemos muitas vendas porque não temos funil organizado.',
    status: 'novo',
    priority: 'alta',
    source: 'Landing Page',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    notes: [],
    activityLog: [
      {
        id: 'act-6',
        date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        type: 'created',
        text: 'Lead quente acabou de preencher o formulário na Landing Page'
      }
    ]
  },
  {
    id: 'lead-5',
    name: 'Felipe Albuquerque',
    email: 'felipe@agronegociosfoco.com.br',
    phone: '(62) 99654-1188',
    company: 'Foco Agro Grãos & Insumos',
    segment: 'Agronegócio',
    solution: 'Orbit ERP (Gestão Empresarial Completa)',
    teamSize: '21-50 colaboradores',
    estimatedBudget: 'R$ 20.000+',
    estimatedValue: 28000,
    message: 'Queremos centralizar a cotação de insumos e contratos futuros com produtores.',
    status: 'ganho',
    priority: 'alta',
    source: 'Landing Page',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    notes: [
      {
        id: 'note-4',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        author: 'Diretor Comercial Orbit',
        content: 'Contrato assinado! Setup de implantação iniciado com o módulo fiscal e financeiro.'
      }
    ],
    activityLog: [
      {
        id: 'act-7',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        type: 'status_change',
        text: 'Negócio fechado e ganho! Parabéns equipe Orbit Smart!'
      }
    ]
  }
];
