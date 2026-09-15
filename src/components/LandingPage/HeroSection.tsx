import React from 'react';
import { useLeads } from '../../context/LeadsContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  Zap, 
  TrendingUp, 
  Layers, 
  Smartphone,
  Users,
  Building2,
  Database
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useLeads();

  const scrollToForm = () => {
    const el = document.getElementById('captura-lead');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Cosmic Atmosphere & Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Subtle Orbital Rings Vector in Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4">
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full stroke-purple-400">
          <circle cx="250" cy="250" r="230" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="170" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="110" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* High-Tech Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-6 shadow-inner backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>SaaS Sob Medida & Automação Inteligente</span>
            <span className="text-purple-500/60">•</span>
            <span className="text-slate-300">Orbit Smart Ecosystem</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white leading-[1.15] mb-6">
            Transforme a gestão do seu negócio com{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
              CRM, ERP e Apps
            </span>{' '}
            feitos sob medida.
          </h1>

          {/* Supporting Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            A <strong>Orbit Smart</strong> desenvolve softwares de gestão completos, intuitivos e 100% adaptados à sua operação. Centralize vendas, finanças, estoque e equipes em uma única plataforma na nuvem.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              id="btn-hero-consultoria"
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3"
            >
              <span>Solicitar Demonstração Gratuita</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="btn-hero-crm"
              onClick={() => setActiveTab('crm')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Conhecer o CRM Orbit</span>
            </button>
          </div>

          {/* Value Propositions / Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 border-t border-slate-800/80 text-left">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Para Qualquer Segmento</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>100% em Nuvem & Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Implantação Assistida</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Sem Taxas de Fidelidade</span>
            </div>
          </div>
        </div>

        {/* Interactive Showcase Preview Canvas / Mockup */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-purple-500/30 bg-slate-900/80 p-2 sm:p-4 shadow-2xl shadow-purple-950/60 backdrop-blur-xl">
            {/* Top Mockup Window Controls */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline">
                  https://app.orbitsmart.com.br/hub
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Orbit Smart Cloud Platform v3.4</span>
              </div>
            </div>

            {/* Simulated Orbit Smart SaaS Dashboard View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-4">
              
              {/* Card 1: Orbit CRM */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-purple-900/40 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Orbit CRM</h4>
                      <p className="text-[11px] text-slate-400">Pipeline de Vendas</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    +38% Conv.
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Leads Ativos no Funil</span>
                    <span className="font-bold text-white">48 empresas</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Oportunidades em Aberto</span>
                    <span className="font-bold text-purple-300">R$ 384.200</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Orbit ERP */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-purple-900/40 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Orbit ERP</h4>
                      <p className="text-[11px] text-slate-400">Gestão & Finanças</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">
                    Em Tempo Real
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Faturamento Mensal</span>
                    <span className="font-bold text-emerald-400">R$ 1.250.000</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>NFe / NFS-e Emitidas</span>
                    <span className="font-bold text-white">1.420 notas</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Orbit Apps */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-purple-900/40 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Orbit Apps</h4>
                      <p className="text-[11px] text-slate-400">Mobile iOS & Android</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-950/80 text-pink-300 border border-pink-500/30">
                    Offline-First
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Usuários em Campo</span>
                    <span className="font-bold text-white">142 motoristas / téc.</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 py-1.5 px-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Sincronização Nuvem</span>
                    <span className="font-bold text-emerald-400">Instantânea</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom notification ribbon */}
            <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-purple-950/40 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <span>Disponível para Indústria, Varejo, Serviços, Saúde, Logística e Agronegócio.</span>
              </div>
              <button 
                onClick={scrollToForm}
                className="text-purple-300 hover:text-purple-200 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Personalize o seu sistema agora →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
