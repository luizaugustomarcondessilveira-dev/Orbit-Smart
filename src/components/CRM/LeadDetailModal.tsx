import React, { useState } from 'react';
import { useLeads } from '../../context/LeadsContext';
import { PIPELINE_STAGES } from '../../data/seedLeads';
import { LeadStatus, LeadPriority } from '../../types';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  Send, 
  Calendar, 
  Clock, 
  DollarSign, 
  Sparkles, 
  HelpCircle, 
  Tag, 
  CheckCircle2,
  Trash2,
  Share2,
  Flame
} from 'lucide-react';

export const LeadDetailModal: React.FC = () => {
  const { selectedLead, setSelectedLead, updateLeadStatus, updateLead, addLeadNote, deleteLead } = useLeads();
  const [newNoteContent, setNewNoteContent] = useState('');
  const [authorName, setAuthorName] = useState('Consultor Orbit');
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [tempFollowUp, setTempFollowUp] = useState('');
  const [isEditingFollowUp, setIsEditingFollowUp] = useState(false);

  if (!selectedLead) return null;

  const handleClose = () => {
    setSelectedLead(null);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addLeadNote(selectedLead.id, newNoteContent, authorName);
    setNewNoteContent('');
  };

  const handleSaveValue = () => {
    const num = parseFloat(tempValue);
    if (!isNaN(num)) {
      updateLead(selectedLead.id, { estimatedValue: num });
    }
    setIsEditingValue(false);
  };

  const handleSaveFollowUp = () => {
    updateLead(selectedLead.id, { nextFollowUp: tempFollowUp });
    setIsEditingFollowUp(false);
  };

  const handleWhatsApp = () => {
    const cleanPhone = selectedLead.phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Olá ${selectedLead.name.split(' ')[0]}, tudo bem? Sou especialista de soluções da Orbit Smart. Recebemos sua solicitação para a empresa ${selectedLead.company} referente a ${selectedLead.solution}. Como podemos te ajudar hoje?`
    );
    window.open(`https://wa.me/55${cleanPhone}?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Orbit Smart - Diagnóstico de Soluções para ${selectedLead.company}`);
    const body = encodeURIComponent(`Olá ${selectedLead.name},\n\nRecebemos seu interesse na plataforma Orbit Smart...`);
    window.location.href = `mailto:${selectedLead.email}?subject=${subject}&body=${body}`;
  };

  // Smart Discovery & AI Qualification suggestions based on segment
  const getSmartInsights = () => {
    const seg = selectedLead.segment;
    if (seg.includes('Indústria')) {
      return {
        score: '96% - Lead Quente B2B',
        focus: 'Módulo de Chão de Fábrica (PCP), controle de estoque de matéria-prima e perdas.',
        questions: [
          'Vocês utilizam planilhas ou um ERP antigo para calcular a ordem de produção?',
          'Qual o maior gargalo hoje: controle de estoque, apontamento de produção ou emissão fiscal?',
          'Quantos operadores necessitam de acesso ao sistema?'
        ]
      };
    }
    if (seg.includes('Saúde')) {
      return {
        score: '92% - Alto Ticket',
        focus: 'Agendamento de consultas com lembrete automático WhatsApp e Prontuário Eletrônico seguro.',
        questions: [
          'Quantos profissionais de saúde atendem simultaneamente na clínica?',
          'Qual a taxa atual de faltas (no-show) nas consultas?',
          'Vocês já utilizam telemedicina ou aplicativo para os pacientes?'
        ]
      };
    }
    if (seg.includes('Logística')) {
      return {
        score: '94% - Demanda Urgente de App',
        focus: 'App Mobile offline para os motoristas registrarem canhoto e assinatura digital.',
        questions: [
          'Quantos veículos e motoristas compõem a frota atualmente?',
          'Como vocês comprovam as entregas hoje e em quanto tempo a nota é liquidada?',
          'Há necessidade de emissão de CTe e MDFe integrados?'
        ]
      };
    }
    if (seg.includes('Comércio')) {
      return {
        score: '88% - Ciclo Rápido de Venda',
        focus: 'Orbit CRM para recuperação de clientes inativos e Frente de Caixa PDV rápido.',
        questions: [
          'Vocês vendem apenas em loja física ou também por WhatsApp e E-commerce?',
          'Como é feito o controle de comissão dos vendedores atualmente?',
          'Possuem controle unificado de múltiplos caixas ou lojas?'
        ]
      };
    }
    return {
      score: '89% - Potencial Qualificado',
      focus: 'Mapeamento de processos e customização de telas para a regra de negócio da empresa.',
      questions: [
        'Qual o principal motivo de estarem buscando um novo software de gestão neste momento?',
        'Qual o prazo ideal para vocês colocarem o novo sistema no ar?',
        'Quem serão os principais usuários e decisores do projeto?'
      ]
    };
  };

  const insights = getSmartInsights();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-950 flex flex-col relative my-8">
        
        {/* Top Header Bar */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                {selectedLead.id}
              </span>
              <span className="text-xs text-slate-400">Origem: {selectedLead.source}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">
                Cadastrado em {new Date(selectedLead.createdAt).toLocaleString('pt-BR')}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mt-1 flex items-center gap-2">
              <span>{selectedLead.name}</span>
            </h3>

            <div className="flex items-center gap-2 text-sm text-slate-300 mt-1">
              <Building2 className="w-4 h-4 text-purple-400" />
              <strong className="text-white">{selectedLead.company}</strong>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{selectedLead.segment}</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-grow">
          
          {/* Action Ribbon: Direct Contact & Stage Control */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Iniciar WhatsApp ({selectedLead.phone})</span>
              </button>

              <button
                onClick={handleEmail}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar E-mail</span>
              </button>
            </div>

            {/* Stage Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Estágio Atual:</span>
              <select
                value={selectedLead.status}
                onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/40 text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid: Financials & Lead Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Estimated Deal Value */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Valor Estimado da Proposta</span>
                <button
                  onClick={() => {
                    setTempValue(selectedLead.estimatedValue.toString());
                    setIsEditingValue(!isEditingValue);
                  }}
                  className="text-purple-400 text-[11px] hover:underline"
                >
                  {isEditingValue ? 'Cancelar' : 'Alterar'}
                </button>
              </div>

              {isEditingValue ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-900 border border-purple-500 rounded text-sm text-white"
                  />
                  <button
                    onClick={handleSaveValue}
                    className="px-2.5 py-1 bg-purple-600 text-white text-xs font-bold rounded"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="text-xl font-bold text-emerald-400 font-['Space_Grotesk'] mt-1">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    selectedLead.estimatedValue
                  )}
                </div>
              )}
              <div className="text-[11px] text-slate-500 mt-1">
                Baseado em {selectedLead.teamSize || 'Porte padrão'}
              </div>
            </div>

            {/* Box 2: Solution and Scope */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Solução Selecionada</div>
              <div className="text-sm font-bold text-purple-300 leading-snug mt-1">
                {selectedLead.solution}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Orçamento indicado: {selectedLead.estimatedBudget || 'Sob consulta'}
              </div>
            </div>

            {/* Box 3: Priority & Follow-up */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Próximo Passo / Follow-up</span>
                <button
                  onClick={() => {
                    setTempFollowUp(selectedLead.nextFollowUp || '');
                    setIsEditingFollowUp(!isEditingFollowUp);
                  }}
                  className="text-purple-400 text-[11px] hover:underline"
                >
                  {isEditingFollowUp ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              {isEditingFollowUp ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Ex: Ligar na quinta às 14h"
                    value={tempFollowUp}
                    onChange={(e) => setTempFollowUp(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-900 border border-purple-500 rounded text-xs text-white"
                  />
                  <button
                    onClick={handleSaveFollowUp}
                    className="px-2.5 py-1 bg-purple-600 text-white text-xs font-bold rounded"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="text-xs font-semibold text-white mt-1">
                  {selectedLead.nextFollowUp || 'Nenhum follow-up agendado'}
                </div>
              )}

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-slate-500">Prioridade:</span>
                <select
                  value={selectedLead.priority}
                  onChange={(e) => updateLead(selectedLead.id, { priority: e.target.value as LeadPriority })}
                  className="text-[10px] py-0.5 px-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

          </div>

          {/* Lead's Original Message / Pain Point from the Landing Page */}
          {selectedLead.message && (
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                <span>Desafio Informado pelo Cliente na Landing Page:</span>
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "{selectedLead.message}"
              </p>
            </div>
          )}

          {/* Smart Lead Qualification & Pitch Guide */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/20 to-slate-950 border border-purple-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Orbit Smart AI Qualification & Pitch Guide</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {insights.score}
              </span>
            </div>

            <div className="text-xs text-slate-300">
              <strong className="text-white">Ângulo Comercial Recomendado: </strong>
              {insights.focus}
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Perguntas-Chave para fazer na Reunião / WhatsApp:
              </div>
              <ul className="space-y-1 text-xs text-slate-300 pl-4 list-disc marker:text-purple-400">
                {insights.questions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notes & Activity History Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* Left: Notes Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center justify-between">
                <span>Notas & Observações Internas</span>
                <span className="text-xs text-slate-500">{selectedLead.notes.length} notas</span>
              </h4>

              {/* Add note form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="Escreva uma anotação sobre a conversa ou proposta..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-40 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Send className="w-3 h-3" />
                    <span>Salvar Nota</span>
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {selectedLead.notes.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-3 text-center">Nenhuma nota interna ainda.</p>
                ) : (
                  selectedLead.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <strong className="text-purple-300">{note.author}</strong>
                        <span>{new Date(note.date).toLocaleString('pt-BR')}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Activity Log Timeline */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                Histórico de Atividades
              </h4>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 border-l-2 border-slate-800 ml-2 pl-4">
                {selectedLead.activityLog.map((act) => (
                  <div key={act.id} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-slate-900"></div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {new Date(act.date).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs font-medium text-slate-200 mt-0.5">
                      {act.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm(`Deseja realmente excluir este lead de ${selectedLead.name}?`)) {
                deleteLead(selectedLead.id);
              }
            }}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Excluir Lead</span>
          </button>

          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
