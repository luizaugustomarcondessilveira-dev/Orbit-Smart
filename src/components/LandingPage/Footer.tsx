import React from 'react';
import { OrbitLogo } from '../OrbitLogo';
import { useLeads } from '../../context/LeadsContext';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useLeads();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Brand and Mission */}
          <div className="lg:col-span-2 space-y-4">
            <OrbitLogo size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-3">
              A <strong>Orbit Smart</strong> desenvolve tecnologia SaaS de alto padrão para automatizar processos de vendas (CRM), gestão empresarial completa (ERP) e aplicativos móveis para todos os tipos de segmentos.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-purple-950/60 border border-purple-500/30 px-2.5 py-1 rounded-full text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Segurança Nível Bancário (SSL 256-bit)
              </span>
            </div>
          </div>

          {/* Col 3: Soluções */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-['Space_Grotesk'] uppercase tracking-wider">
              Soluções Orbit
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollToSection('solucoes')} className="hover:text-purple-400 transition-colors">
                  Orbit CRM (Vendas & Clientes)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('solucoes')} className="hover:text-purple-400 transition-colors">
                  Orbit ERP (Financeiro & NFe)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('solucoes')} className="hover:text-purple-400 transition-colors">
                  Orbit Apps (iOS & Android)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('segmentos')} className="hover:text-purple-400 transition-colors">
                  Sistemas por Segmento
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('calculadora')} className="hover:text-purple-400 transition-colors">
                  Calculadora ROI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Segmentos */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-['Space_Grotesk'] uppercase tracking-wider">
              Segmentos
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => scrollToSection('segmentos')} className="hover:text-purple-400">Comércio & Varejo</button></li>
              <li><button onClick={() => scrollToSection('segmentos')} className="hover:text-purple-400">Indústrias & PCP</button></li>
              <li><button onClick={() => scrollToSection('segmentos')} className="hover:text-purple-400">Saúde & Clínicas</button></li>
              <li><button onClick={() => scrollToSection('segmentos')} className="hover:text-purple-400">Logística & Frotas</button></li>
              <li><button onClick={() => scrollToSection('segmentos')} className="hover:text-purple-400">Serviços & Agronegócio</button></li>
            </ul>
          </div>

          {/* Col 5: Contato & Atendimento */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-['Space_Grotesk'] uppercase tracking-wider">
              Atendimento
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>contato@orbitsmart.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>(11) 98765-4321 • Comercial</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>São Paulo, SP - Brasil</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                Atendimento de Segunda a Sexta, das 08h às 19h.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Orbit Smart Tecnologia & Sistemas SaaS. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-slate-400 cursor-pointer">Conformidade LGPD</span>
            <a 
              href="#crm-interno" 
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'crm-interno';
                setActiveTab('crm');
              }} 
              className="text-slate-700 hover:text-slate-400 transition-colors cursor-pointer text-[10px]"
              title="Acesso exclusivo para colaboradores da Orbit Smart"
            >
              Acesso Interno
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
