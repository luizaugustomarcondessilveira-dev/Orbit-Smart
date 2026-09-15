import React from 'react';
import { 
  ShoppingBag, 
  Factory, 
  Briefcase, 
  Stethoscope, 
  Truck, 
  Sprout, 
  GraduationCap, 
  Cpu, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { SegmentType } from '../../types';

interface SegmentCard {
  title: SegmentType;
  icon: React.ReactNode;
  subtitle: string;
  features: string[];
  color: string;
}

export const SegmentsGrid: React.FC = () => {
  const segments: SegmentCard[] = [
    {
      title: 'Comércio & Varejo',
      icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
      subtitle: 'Lojas físicas, e-commerce e franquias',
      features: ['Frente de Caixa (PDV) rápido', 'Controle unificado de estoque', 'CRM com histórico de compras'],
      color: 'border-amber-500/30 bg-amber-950/10'
    },
    {
      title: 'Indústria & Manufatura',
      icon: <Factory className="w-5 h-5 text-indigo-400" />,
      subtitle: 'Fábricas, usinagem e confecções',
      features: ['Ordem de Produção (PCP)', 'Custo de matéria-prima e perdas', 'Rastreabilidade de lotes'],
      color: 'border-indigo-500/30 bg-indigo-950/10'
    },
    {
      title: 'Serviços & Consultoria',
      icon: <Briefcase className="w-5 h-5 text-purple-400" />,
      subtitle: 'Agências, escritórios e consultores',
      features: ['Gestão de projetos e horas (timesheet)', 'Contratos de recorrência (SaaS/Mensal)', 'Funil comercial consultivo'],
      color: 'border-purple-500/30 bg-purple-950/10'
    },
    {
      title: 'Saúde & Clínicas',
      icon: <Stethoscope className="w-5 h-5 text-emerald-400" />,
      subtitle: 'Clínicas médicas, odonto e estética',
      features: ['Prontuário eletrônico seguro', 'Agendamento e lembretes via WhatsApp', 'App do paciente para exames'],
      color: 'border-emerald-500/30 bg-emerald-950/10'
    },
    {
      title: 'Logística & Transportes',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      subtitle: 'Transportadoras, frotas e distribuição',
      features: ['App mobile do motorista offline', 'Comprovante digital com foto e assinatura', 'Emissão de CTe e MDFe ágil'],
      color: 'border-sky-500/30 bg-sky-950/10'
    },
    {
      title: 'Agronegócio',
      icon: <Sprout className="w-5 h-5 text-lime-400" />,
      subtitle: 'Fazendas, cooperativas e insumos',
      features: ['Controle de safras e custos por hectare', 'Gestão de maquinário e defensivos', 'Contratos futuros e cotação'],
      color: 'border-lime-500/30 bg-lime-950/10'
    },
    {
      title: 'Educação & Treinamentos',
      icon: <GraduationCap className="w-5 h-5 text-violet-400" />,
      subtitle: 'Escolas, polos EAD e cursos livres',
      features: ['Secretaria digital e matrículas', 'Cobrança recorrente de mensalidades', 'Portal do aluno e aplicativo'],
      color: 'border-violet-500/30 bg-violet-950/10'
    },
    {
      title: 'Tecnologia & Startups',
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      subtitle: 'Software houses e empresas digitais',
      features: ['APIs abertas para integração', 'Métricas SaaS (MRR, Churn, CAC)', 'Billing automatizado'],
      color: 'border-pink-500/30 bg-pink-950/10'
    }
  ];

  const scrollToForm = () => {
    const el = document.getElementById('captura-lead');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="segmentos" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
            Versatilidade Comprovada
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white mt-3 tracking-tight">
            Sistemas Desenvolvidos Para o Seu Segmento
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Cada nicho possui regras de negócio únicas. Na <strong>Orbit Smart</strong>, seu sistema nasce configurado para os desafios da sua rotina comercial e operacional.
          </p>
        </div>

        {/* 8 Segments Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {segments.map((seg, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border ${seg.color} backdrop-blur-sm hover:border-purple-500/60 transition-all duration-200 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                    {seg.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-['Space_Grotesk'] leading-tight">
                      {seg.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">{seg.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-2 my-4">
                  {seg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={scrollToForm}
                className="mt-3 pt-3 border-t border-slate-800/80 text-xs font-semibold text-purple-300 group-hover:text-purple-200 flex items-center justify-between cursor-pointer"
              >
                <span>Ver solução para {seg.title}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Segment Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Não encontrou seu nicho exato? Nós criamos sob medida!
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              Nossa equipe de engenharia e produto mapeia seu fluxo de trabalho e projeta telas, regras fiscais e integrações sob demanda.
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-md cursor-pointer transition-all"
          >
            Falar com Especialista
          </button>
        </div>

      </div>
    </section>
  );
};
