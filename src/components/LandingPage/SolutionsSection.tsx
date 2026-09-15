import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  Smartphone, 
  Cpu, 
  Check, 
  ArrowRight, 
  BarChart, 
  FileText, 
  Truck, 
  Users, 
  DollarSign, 
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crm' | 'erp' | 'apps'>('crm');

  const scrollToForm = () => {
    const el = document.getElementById('captura-lead');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="solucoes" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Portfólio de Soluções SaaS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white tracking-tight">
            Tecnologia de ponta para cada etapa da sua operação
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Da captação de clientes à gestão financeira e chão de fábrica. Escolha o módulo ideal ou integre todo o ecossistema Orbit Smart.
          </p>

          {/* Solution Selector Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('crm')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'crm'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Orbit CRM</span>
            </button>

            <button
              onClick={() => setActiveTab('erp')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'erp'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Orbit ERP</span>
            </button>

            <button
              onClick={() => setActiveTab('apps')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'apps'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Orbit Apps</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Orbit CRM */}
        {activeTab === 'crm' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Gestão Comercial & Relacionamento</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                Multiplique suas vendas com o Orbit CRM
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Pare de perder oportunidades em planilhas ou conversas soltas no WhatsApp. O Orbit CRM organiza todo o seu funil de prospecção, automatiza lembretes e dá visibilidade total para gestores e vendedores.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Funis Personalizados</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Etapas adaptadas à jornada de compra do seu setor (B2B, B2C, Serviços).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Integração WhatsApp</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Dispare contatos com 1 clique e histórico centralizado de conversas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Previsão de Receita</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Métricas de fechamento, ticket médio e taxa de conversão por vendedor.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Alertas de Follow-up</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Notificações automáticas para sua equipe nunca esquecer um lead quente.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
                >
                  <span>Quero implantar o Orbit CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Preview Mockup Box */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/90 p-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    Funil de Prospecção Orbit CRM
                  </span>
                  <span className="text-purple-400 font-mono">14 Novos Hoje</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-indigo-500/30">
                    <div className="text-[11px] font-bold text-indigo-300 uppercase">Qualificação</div>
                    <div className="text-lg font-bold text-white mt-1">12 leads</div>
                    <div className="text-[11px] text-slate-400 mt-2 p-1.5 bg-slate-900 rounded border border-slate-800">
                      Indústria Metalúrgica
                      <span className="block font-bold text-purple-300">R$ 24.500</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/30">
                    <div className="text-[11px] font-bold text-purple-300 uppercase">Proposta</div>
                    <div className="text-lg font-bold text-white mt-1">8 propostas</div>
                    <div className="text-[11px] text-slate-400 mt-2 p-1.5 bg-slate-900 rounded border border-slate-800">
                      Rede de Clínicas Vitae
                      <span className="block font-bold text-purple-300">R$ 32.000</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30">
                    <div className="text-[11px] font-bold text-emerald-300 uppercase">Fechados</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">R$ 142k</div>
                    <div className="text-[11px] text-slate-400 mt-2 p-1.5 bg-slate-900 rounded border border-slate-800">
                      Foco Agronegócios
                      <span className="block font-bold text-emerald-400">Ganho 🚀</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
                  <span>Taxa de conversão média dos clientes Orbit:</span>
                  <strong className="text-white bg-purple-600/80 px-2 py-0.5 rounded">31.4%</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Orbit ERP */}
        {activeTab === 'erp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-purple-400 text-sm font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Gestão Empresarial & Backoffice</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                Controle total com o Orbit ERP Inteligente
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Integre contas a pagar e receber, fluxo de caixa em tempo real, emissão automática de notas fiscais (NFe, NFCe, NFSe), controle de estoque com leitor de código de barras e relatórios contábeis DRE.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    <span>Financeiro & Conciliação</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Conciliação bancária via OFX/API, boletos, PIX e controle de inadimplência.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Emissor Fiscal Ágil</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Cálculo tributário inteligente (ICMS, IPI, PIS/COFINS, ISS) para todo o Brasil.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Estoque & Compras</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Ponto de pedido automático, múltiplos armazéns e rastreabilidade por lote.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <BarChart className="w-4 h-4 text-purple-400" />
                    <span>DRE & Indicadores BI</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Visão de lucratividade por produto, unidade ou centro de custo.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
                >
                  <span>Solicitar Proposta de ERP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-purple-500/30 bg-slate-900/90 p-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Painel Financeiro & Fiscal Orbit ERP
                  </span>
                  <span className="text-emerald-400 font-semibold">100% Regular</span>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Receita Bruta Acumulada</div>
                      <div className="text-xl font-bold text-white">R$ 1.842.600,00</div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      +19.4% vs mês anterior
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-400">Contas a Receber</div>
                      <div className="text-base font-bold text-emerald-400 mt-1">R$ 214.800</div>
                      <div className="text-[10px] text-slate-500 mt-1">98.2% de adimplência</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-400">Contas a Pagar</div>
                      <div className="text-base font-bold text-rose-400 mt-1">R$ 88.350</div>
                      <div className="text-[10px] text-slate-500 mt-1">Programado p/ semana</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs text-indigo-200">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Emissão em lote de Notas Fiscais ativa</span>
                    </div>
                    <span className="font-mono text-white">SEFAZ Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Orbit Apps */}
        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-pink-400 text-sm font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Aplicativos Móveis Sob Medida</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                Sua empresa na palma da mão com Orbit Apps
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Desenvolvemos aplicativos nativos e híbridos para iOS e Android conectados diretamente ao seu banco de dados e ERP. Crie apps para clientes, motoristas, técnicos de manutenção ou equipes externas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Smartphone className="w-4 h-4 text-pink-400" />
                    <span>Modo Offline-First</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Trabalhe sem internet em áreas remotas e sincronize automaticamente ao reconectar.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-pink-400" />
                    <span>Assinatura Digital & Câmera</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Captura de comprovantes, fotos de vistorias e assinatura na tela do celular.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-pink-400" />
                    <span>Geolocalização & Rotas</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Check-in de visitas e rastreamento de equipes externas em tempo real.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 font-semibold text-white text-sm mb-1">
                    <Check className="w-4 h-4 text-pink-400" />
                    <span>Notificações Push</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Envie alertas de novos pedidos, chamados e ordens de serviço direto ao celular.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
                >
                  <span>Desenvolver App Sob Medida</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-xs rounded-3xl border-4 border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-purple-950/80 relative">
                {/* Simulated Phone Top Notch */}
                <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-4"></div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-white">Orbit Field App</span>
                    <span className="text-emerald-400 font-bold">● Online</span>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30">
                    <div className="text-[11px] text-purple-300">Ordem de Serviço #1092</div>
                    <div className="text-sm font-bold text-white mt-0.5">Entrega & Instalação MetalLux</div>
                    <div className="text-[10px] text-slate-400 mt-1">Av. Paulista, 1000 - SP</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-semibold text-slate-300 mb-1">Ações em Campo</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-950 text-center text-purple-300 border border-slate-800">
                        📷 Foto Comprovante
                      </div>
                      <div className="p-2 rounded bg-slate-950 text-center text-emerald-300 border border-slate-800">
                        ✍️ Coletar Assinatura
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={scrollToForm}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold text-center shadow"
                  >
                    Finalizar Atendimento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
