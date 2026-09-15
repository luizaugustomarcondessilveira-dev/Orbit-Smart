import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'A Orbit Smart cria sistemas apenas prontos ou desenvolve sob medida para minha empresa?',
      a: 'Nós unimos o melhor dos dois mundos! Temos uma base robusta e madura de SaaS (Orbit CRM, Orbit ERP e módulos Apps) que pode ser configurada e customizada para as regras específicas da sua empresa, sem a lentidão de um desenvolvimento do zero e sem as amarras de um sistema engessado de prateleira.'
    },
    {
      q: 'Como funciona a implantação e quanto tempo leva?',
      a: 'Nosso time de engenharia e onboarding cuida de toda a configuração, importação do seu banco de dados atual (planilhas ou outro software), parametrização fiscal e treinamento da sua equipe. A implantação média ocorre entre 7 a 20 dias úteis, dependendo do porte e dos módulos contratados.'
    },
    {
      q: 'O sistema funciona em qualquer dispositivo e na nuvem?',
      a: 'Sim! Os sistemas da Orbit Smart são 100% hospedados em nuvem com alta disponibilidade (99.9%) e certificados de segurança de nível bancário. Você e sua equipe acessam pelo computador (Web), tablet ou celular (Apps nativos iOS e Android), com suporte a modo offline para equipes de campo.'
    },
    {
      q: 'Posso integrar a Orbit Smart com outros sistemas que já uso (WhatsApp, Bancos, E-commerce)?',
      a: 'Com certeza. Dispomos de APIs abertas e integrações nativas para WhatsApp comercial, gateways de pagamento, emissão automática de boletos e PIX com conciliação bancária, além de conectores com as principais plataformas de e-commerce e logística.'
    },
    {
      q: 'Qual o valor e modelo de contratação?',
      a: 'Trabalhamos com planos SaaS por assinatura com excelente custo-benefício, sem taxas ocultas ou multas abusivas de fidelidade. Ao preencher o formulário nesta Landing Page, nosso consultor realiza um diagnóstico rápido e apresenta uma proposta exata para o porte da sua empresa.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/70 border border-purple-500/30 px-3 py-1 rounded-full">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white mt-3">
            Tudo o que você precisa saber sobre a Orbit Smart
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-base hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
