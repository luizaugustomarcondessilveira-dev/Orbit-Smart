import React, { useState } from 'react';
import { useLeads } from '../../context/LeadsContext';
import { SegmentType, SolutionType, TeamSizeType } from '../../types';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Clock, 
  Lock,
  Building2,
  Mail,
  Phone,
  User
} from 'lucide-react';

export const LeadCaptureForm: React.FC = () => {
  const { addLead } = useLeads();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: 'Comércio & Varejo' as SegmentType,
    solution: 'Orbit CRM (Gestão de Vendas & Clientes)' as SolutionType,
    teamSize: '6-20 colaboradores' as TeamSizeType,
    estimatedBudget: 'R$ 5.000 a R$ 15.000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Phone mask formatter for Brazilian numbers: (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    let formatted = val;
    if (val.length > 2) {
      formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    if (val.length > 7) {
      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Telefone e Empresa).');
      return;
    }

    setIsSubmitting(true);

    try {
      const newLead = await addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        segment: formData.segment,
        solution: formData.solution,
        teamSize: formData.teamSize,
        estimatedBudget: formData.estimatedBudget,
        message: formData.message,
        source: 'Landing Page',
      });

      setSubmittedLeadId(newLead.id);
    } catch (err) {
      console.error('Erro ao cadastrar lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLeadId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      segment: 'Comércio & Varejo',
      solution: 'Orbit CRM (Gestão de Vendas & Clientes)',
      teamSize: '6-20 colaboradores',
      estimatedBudget: 'R$ 5.000 a R$ 15.000',
      message: '',
    });
  };

  return (
    <section id="captura-lead" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Persuasive text & benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Consultoria & Diagnóstico Especializado</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white leading-tight">
              Diga adeus à desorganização. Solicite um diagnóstico do seu negócio.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Descubra em menos de 30 minutos como um sistema sob medida da <strong>Orbit Smart</strong> pode economizar até 40 horas semanais da sua equipe e aumentar a conversão de vendas.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 border border-purple-500/30 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Demonstração Interativa Ao Vivo</h4>
                  <p className="text-xs text-slate-400">Veja o CRM, ERP e App funcionando na prática com dados do seu setor.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 border border-purple-500/30 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Contato em Menos de 15 Minutos</h4>
                  <p className="text-xs text-slate-400">Nossa equipe comercial entra em contato via WhatsApp ou telefone rapidamente.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 border border-purple-500/30 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sigilo Absoluto & LGPD</h4>
                  <p className="text-xs text-slate-400">Seus dados estão protegidos com criptografia de ponta e nunca serão compartilhados.</p>
                </div>
              </div>
            </div>

            {/* Simulated Live counter */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-900/40 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Consultores online agora</span>
              </div>
              <span className="font-semibold text-purple-300">Atendimento Brasil</span>
            </div>
          </div>

          {/* Right Column: Lead Capture Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80 backdrop-blur-xl relative">
              
              {/* If lead was submitted, show Success Celebration state */}
              {submittedLeadId ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
                      Parabéns, {formData.name.split(' ')[0]}!
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                      Sua solicitação para a empresa <strong className="text-purple-300">{formData.company}</strong> foi registrada no sistema da <strong>Orbit Smart</strong> com sucesso.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Segmento:</span>
                      <span className="font-semibold text-white">{formData.segment}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Solução Escolhida:</span>
                      <span className="font-semibold text-purple-300">{formData.solution}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Telefone / WhatsApp:</span>
                      <span className="font-semibold text-white">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Status do Atendimento:</span>
                      <span className="font-bold text-emerald-400">Recebido • Retorno prioritário</span>
                    </div>
                  </div>

                  {/* Customer Action Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={`https://wa.me/55${formData.phone.replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(formData.name)}!%20Aqui%20é%20da%20Orbit%20Smart.%20Recebemos%20sua%20solicitação%20de%20diagnóstico%20para%20${encodeURIComponent(formData.company)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Falar com Consultor no WhatsApp Agora</span>
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer mt-4"
                  >
                    Enviar outra solicitação
                  </button>
                </div>
              ) : (
                /* Form Input Screen */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                      Solicite seu Diagnóstico & Demonstração Grátis
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Preencha o formulário abaixo para receber uma proposta personalizada para a sua empresa.
                    </p>
                  </div>

                  {/* Grid: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-purple-400" />
                        <span>Seu Nome Completo *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: João Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-purple-400" />
                        <span>E-mail Corporativo *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: joao@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Grid: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-purple-400" />
                        <span>WhatsApp / Telefone *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98765-4321"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Nome da Empresa *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Alfa Logística Ltda"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Segment & Solution Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Segmento de Atuação *
                      </label>
                      <select
                        value={formData.segment}
                        onChange={(e) => setFormData({ ...formData, segment: e.target.value as SegmentType })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="Comércio & Varejo">Comércio & Varejo</option>
                        <option value="Indústria & Manufatura">Indústria & Manufatura</option>
                        <option value="Serviços & Consultoria">Serviços & Consultoria</option>
                        <option value="Saúde & Clínicas">Saúde & Clínicas</option>
                        <option value="Logística & Transportes">Logística & Transportes</option>
                        <option value="Agronegócio">Agronegócio</option>
                        <option value="Educação & Treinamentos">Educação & Treinamentos</option>
                        <option value="Tecnologia & Startups">Tecnologia & Startups</option>
                        <option value="Outro Segmento">Outro Segmento</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Solução de Interesse Principal *
                      </label>
                      <select
                        value={formData.solution}
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value as SolutionType })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="Orbit CRM (Gestão de Vendas & Clientes)">Orbit CRM (Vendas & Clientes)</option>
                        <option value="Orbit ERP (Gestão Empresarial Completa)">Orbit ERP (Financeiro & Backoffice)</option>
                        <option value="Orbit Apps (App Mobile Sob Medida)">Orbit Apps (App iOS / Android)</option>
                        <option value="Ecossistema Completo (ERP + CRM + App)">Ecossistema Completo (ERP + CRM + App)</option>
                      </select>
                    </div>
                  </div>

                  {/* Team size selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Tamanho da Equipe / Colaboradores
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {(['1-5 colaboradores', '6-20 colaboradores', '21-50 colaboradores', '51-100 colaboradores', '100+ colaboradores'] as TeamSizeType[]).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData({ ...formData, teamSize: size })}
                          className={`py-2 px-1 rounded-lg text-xs font-medium text-center border transition-all cursor-pointer ${
                            formData.teamSize === size
                              ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {size.replace(' colaboradores', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Challenge Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Qual o principal desafio ou gargalo da sua empresa hoje? (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Precisamos automatizar o envio de orçamentos e integrar estoque com o faturamento..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="btn-submit-lead"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Enviando dados para o CRM Orbit...</span>
                    ) : (
                      <>
                        <span>Quero Meu Diagnóstico Gratuito</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Seus dados são 100% confidenciais. Sem spam.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
