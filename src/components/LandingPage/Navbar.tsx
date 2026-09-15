import React, { useState } from 'react';
import { OrbitLogo } from '../OrbitLogo';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center group">
            <OrbitLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollToSection('solucoes')} 
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Soluções SaaS
            </button>
            <button 
              onClick={() => scrollToSection('segmentos')} 
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Segmentos
            </button>
            <button 
              onClick={() => scrollToSection('diferenciais')} 
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection('calculadora')} 
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Calculadora ROI
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')} 
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Cases de Sucesso
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              id="btn-nav-capture"
              onClick={() => scrollToSection('captura-lead')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all duration-200 cursor-pointer group"
            >
              <span>Solicitar Demonstração</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('solucoes')}
            className="block w-full text-left px-3 py-2 text-slate-300 hover:text-purple-400 font-medium"
          >
            Soluções SaaS (CRM, ERP, Apps)
          </button>
          <button
            onClick={() => scrollToSection('segmentos')}
            className="block w-full text-left px-3 py-2 text-slate-300 hover:text-purple-400 font-medium"
          >
            Segmentos Atendidos
          </button>
          <button
            onClick={() => scrollToSection('diferenciais')}
            className="block w-full text-left px-3 py-2 text-slate-300 hover:text-purple-400 font-medium"
          >
            Diferenciais Orbit Smart
          </button>
          <button
            onClick={() => scrollToSection('calculadora')}
            className="block w-full text-left px-3 py-2 text-slate-300 hover:text-purple-400 font-medium"
          >
            Calculadora de Economia ROI
          </button>
          <button
            onClick={() => scrollToSection('depoimentos')}
            className="block w-full text-left px-3 py-2 text-slate-300 hover:text-purple-400 font-medium"
          >
            Depoimentos & Cases
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left px-3 py-2 text-slate-300 hover:text-purple-400 font-medium"
          >
            Perguntas Frequentes
          </button>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => scrollToSection('captura-lead')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30"
            >
              <span>Solicitar Demonstração Gratuita</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
