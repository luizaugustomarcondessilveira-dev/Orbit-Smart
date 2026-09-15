import React from 'react';
import { useLeads } from '../../context/LeadsContext';
import { PIPELINE_STAGES } from '../../data/seedLeads';
import { SegmentType, SolutionType } from '../../types';
import { BarChart3, PieChart, TrendingUp, Target, ShieldCheck, DollarSign } from 'lucide-react';

export const CrmAnalyticsView: React.FC = () => {
  const { leads, totalPipelineValue } = useLeads();

  const total = leads.length;

  // Group by Segment
  const segmentCounts: Record<string, { count: number; value: number }> = {};
  leads.forEach((l) => {
    if (!segmentCounts[l.segment]) {
      segmentCounts[l.segment] = { count: 0, value: 0 };
    }
    segmentCounts[l.segment].count += 1;
    segmentCounts[l.segment].value += l.estimatedValue || 0;
  });

  const sortedSegments = Object.entries(segmentCounts).sort((a, b) => b[1].count - a[1].count);

  // Group by Solution
  const solutionCounts: Record<string, { count: number; value: number }> = {};
  leads.forEach((l) => {
    const shortName = l.solution.split('(')[0].trim();
    if (!solutionCounts[shortName]) {
      solutionCounts[shortName] = { count: 0, value: 0 };
    }
    solutionCounts[shortName].count += 1;
    solutionCounts[shortName].value += l.estimatedValue || 0;
  });

  // Funnel progression
  const stageStats = PIPELINE_STAGES.map((s) => {
    const count = leads.filter((l) => l.status === s.id).length;
    const value = leads
      .filter((l) => l.status === s.id)
      .reduce((acc, l) => acc + (l.estimatedValue || 0), 0);
    return { ...s, count, value };
  });

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
            Inteligência Comercial Orbit Smart
          </span>
          <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mt-1">
            Análise de Conversão e Distribuição do Funil
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Métricas consolidadas de captação e previsão de faturamento recorrente.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Volume Total no Funil</div>
            <div className="text-xl font-bold text-emerald-400 font-['Space_Grotesk']">
              {formatBRL(totalPipelineValue)}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 2 analytical charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Distribution by Segment */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-400" />
              <span>Distribuição de Oportunidades por Segmento</span>
            </h4>
            <span className="text-xs text-slate-400">{sortedSegments.length} segmentos</span>
          </div>

          <div className="space-y-3">
            {sortedSegments.map(([seg, data]) => {
              const pct = total > 0 ? Math.round((data.count / total) * 100) : 0;
              return (
                <div key={seg} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">{seg}</span>
                    <span className="text-slate-400 font-mono">
                      {data.count} leads ({pct}%) • <strong className="text-emerald-400">{formatBRL(data.value)}</strong>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Distribution by Solution SaaS */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Interesse por Solução SaaS Orbit</span>
            </h4>
            <span className="text-xs text-slate-400">{Object.keys(solutionCounts).length} módulos</span>
          </div>

          <div className="space-y-4">
            {Object.entries(solutionCounts).map(([sol, data]) => {
              const pct = total > 0 ? Math.round((data.count / total) * 100) : 0;
              return (
                <div key={sol} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-purple-300 text-sm">{sol}</strong>
                    <span className="text-emerald-400 font-bold font-mono">{formatBRL(data.value)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{data.count} empresas interessadas</span>
                    <span>{pct}% do pipeline total</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Funnel Drop-off / Stage Flow */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Fluxo Linear de Passagem do Funil Orbit Smart</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {stageStats.map((st) => (
            <div key={st.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase truncate">
                {st.label.replace('🚀', '')}
              </div>
              <div className="text-xl font-bold text-white font-['Space_Grotesk']">
                {st.count}
              </div>
              <div className="text-[10px] text-emerald-400/90 font-mono">
                {formatBRL(st.value)}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
