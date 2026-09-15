import React from 'react';
import { useLeads } from '../../context/LeadsContext';
import { 
  Users, 
  Sparkles, 
  TrendingUp, 
  Trophy, 
  DollarSign, 
  Target 
} from 'lucide-react';

export const CrmMetrics: React.FC = () => {
  const { leads, totalPipelineValue, newLeadsCount } = useLeads();

  const totalLeads = leads.length;
  const inProgressLeads = leads.filter(
    (l) => ['contato', 'reuniao', 'proposta', 'negociacao'].includes(l.status)
  ).length;
  const wonLeads = leads.filter((l) => l.status === 'ganho').length;
  const wonValue = leads
    .filter((l) => l.status === 'ganho')
    .reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 p-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Metric 1: Total Leads */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Total de Leads</span>
          <div className="p-1.5 rounded-lg bg-slate-800 text-purple-400">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-white font-['Space_Grotesk']">{totalLeads}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Captados via Web & Inbound</div>
        </div>
      </div>

      {/* Metric 2: Novos Leads */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center justify-between text-xs text-indigo-300">
          <span>Novos / Sem Contato</span>
          <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-indigo-300 font-['Space_Grotesk'] flex items-center gap-2">
            <span>{newLeadsCount}</span>
            {newLeadsCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Ação Requerida
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Aguardando atendimento</div>
        </div>
      </div>

      {/* Metric 3: Em Andamento */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Em Negociação Ativa</span>
          <div className="p-1.5 rounded-lg bg-slate-800 text-amber-400">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-white font-['Space_Grotesk']">{inProgressLeads}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Reunião, demo ou proposta</div>
        </div>
      </div>

      {/* Metric 4: Pipeline Financeiro Total */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-purple-300">
          <span>Pipeline em Aberto</span>
          <div className="p-1.5 rounded-lg bg-purple-950 text-purple-400">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200 font-['Space_Grotesk']">
            R$ {(totalPipelineValue / 1000).toFixed(0)}k
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Valor somado de propostas</div>
        </div>
      </div>

      {/* Metric 5: Fechados / Conversão */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-xs text-emerald-300">
          <span>Fechados / Taxa</span>
          <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400">
            <Trophy className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-emerald-400 font-['Space_Grotesk'] flex items-center gap-2">
            <span>{wonLeads}</span>
            <span className="text-xs text-slate-400 font-normal">({conversionRate}%)</span>
          </div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5 font-mono">
            +R$ {(wonValue / 1000).toFixed(0)}k em contratos
          </div>
        </div>
      </div>

    </div>
  );
};
