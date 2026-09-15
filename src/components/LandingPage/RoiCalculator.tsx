import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(12);
  const [hourlyCost, setHourlyCost] = useState<number>(35); // R$/hora médio
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState<number>(6); // horas gastas em tarefas manuais por pessoa

  // Calculations
  const hoursSavedPerWeekTotal = teamSize * hoursWastedPerWeek * 0.7; // Orbit automatiza 70%
  const hoursSavedPerMonth = Math.round(hoursSavedPerWeekTotal * 4.3);
  const monthlySavingsBRL = Math.round(hoursSavedPerMonth * hourlyCost);
  const annualSavingsBRL = monthlySavingsBRL * 12;

  const scrollToForm = () => {
    const el = document.getElementById('captura-lead');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculadora" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/70 border border-purple-500/30 px-3 py-1 rounded-full">
            Simulador de Impacto Financeiro
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white mt-3">
            Calcule quanto sua empresa economiza com a Orbit Smart
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Elimine retrabalho com planilhas duplicadas, atrasos de ordens e faturamento manual.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Controls */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-purple-900/40 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Slider 1: Team size */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-2 text-white">
                <span>Número de Colaboradores na Operação:</span>
                <span className="text-purple-400 font-bold font-mono text-base">{teamSize} pessoas</span>
              </div>
              <input
                type="range"
                min="3"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>3 colab.</span>
                <span>50</span>
                <span>100+</span>
              </div>
            </div>

            {/* Slider 2: Hours wasted per person */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-2 text-white">
                <span>Horas semanais perdidas em tarefas manuais (por pessoa):</span>
                <span className="text-purple-400 font-bold font-mono text-base">{hoursWastedPerWeek}h / sem</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={hoursWastedPerWeek}
                onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>2 horas</span>
                <span>10 horas</span>
                <span>20 horas</span>
              </div>
            </div>

            {/* Slider 3: Average hourly cost */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-2 text-white">
                <span>Custo médio por hora trabalhada:</span>
                <span className="text-purple-400 font-bold font-mono text-base">R$ {hourlyCost},00 / h</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>R$ 15</span>
                <span>R$ 60</span>
                <span>R$ 120</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Baseado no ganho médio de produtividade aferido em clientes ativos Orbit Smart.</span>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-6 bg-gradient-to-br from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 rounded-2xl p-6 sm:p-8 space-y-6 text-center">
            
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Economia Estimada para sua Empresa
            </span>

            <div className="py-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-indigo-200 font-['Space_Grotesk']">
                R$ {annualSavingsBRL.toLocaleString('pt-BR')}
              </div>
              <div className="text-sm font-medium text-purple-300 mt-1">
                em custos operacionais economizados por ano
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-500/20 text-left">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Horas Economizadas</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {hoursSavedPerMonth}h / mês
                </div>
                <div className="text-[10px] text-slate-500">Mais foco em vendas</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Retorno Mensal</span>
                </div>
                <div className="text-lg font-bold text-emerald-400 mt-1">
                  R$ {monthlySavingsBRL.toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] text-slate-500">Economia recorrente</div>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Quero Viabilizar Essa Economia</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
