import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const cases = [
    {
      name: 'Marcos Vinícius Prado',
      role: 'Diretor de Operações',
      company: 'LogExpress Distribuidora',
      segment: 'Logística & Transportes',
      text: 'Com o Orbit Apps integrado ao nosso ERP, zeramos o extravio de notas e canhotos. Nossos 45 motoristas fazem check-in e fotos de entrega sem precisar de sinal de internet.',
      metric: '-65% de tempo de fechamento',
      rating: 5,
    },
    {
      name: 'Camila Guimarães',
      role: 'CEO & Fundadora',
      company: 'Rede FarmaMais',
      segment: 'Comércio & Franquias',
      text: 'A Orbit Smart construiu exatamente o que nosso modelo de franquia precisava. O CRM unificou o pós-venda e nosso faturamento em produtos recorrentes aumentou 40% em 90 dias.',
      metric: '+40% vendas recorrentes',
      rating: 5,
    },
    {
      name: 'Eng. Roberto Cavenaghi',
      role: 'Gerente Industrial',
      company: 'TecnoAço Componentes',
      segment: 'Indústria & Manufatura',
      text: 'Tínhamos um sistema antigo que travava todo fechamento de mês. O Orbit ERP foi implantado em apenas 18 dias sem parar a fábrica. O controle de estoque agora é milimétrico.',
      metric: 'Zero paralisação na implantação',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/70 border border-purple-500/30 px-3 py-1 rounded-full">
            Resultados Comprovados
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white mt-3">
            Quem migrou para a Orbit Smart aprova e recomenda
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Empresas reais que modernizaram sua gestão e conquistaram previsibilidade e escala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-purple-900/30 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-purple-600/30 mb-2" />

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {item.metric}
                  </span>
                  <span className="text-[10px] text-purple-400 uppercase tracking-wider">
                    {item.segment}
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{item.name}</div>
                <div className="text-xs text-slate-400">{item.role} • {item.company}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
