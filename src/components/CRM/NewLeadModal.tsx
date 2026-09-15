import React, { useState } from 'react';
import { useLeads } from '../../context/LeadsContext';
import { SegmentType, SolutionType, TeamSizeType } from '../../types';
import { X, Plus, Building2, User, Mail, Phone, Sparkles } from 'lucide-react';

export const NewLeadModal: React.FC = () => {
  const { isNewLeadModalOpen, setIsNewLeadModalOpen, addLead } = useLeads();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: 'Comércio & Varejo' as SegmentType,
    solution: 'Orbit CRM (Gestão de Vendas & Clientes)' as SolutionType,
    teamSize: '6-20 colaboradores' as TeamSizeType,
    estimatedBudget: 'Sob consulta',
    source: 'Inbound Manual' as any,
    message: '',
  });

  if (!isNewLeadModalOpen) return null;

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
    if (!formData.name || !formData.company || !formData.phone) {
      alert('Preencha os campos obrigatórios (Nome, Empresa e Telefone).');
      return;
    }

    await addLead({
      name: formData.name,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@${formData.company.toLowerCase().replace(/\s+/g, '')}.com.br`,
      phone: formData.phone,
      company: formData.company,
      segment: formData.segment,
      solution: formData.solution,
      teamSize: formData.teamSize,
      estimatedBudget: formData.estimatedBudget,
      message: formData.message,
      source: formData.source,
    });

    setIsNewLeadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Cadastrar Novo Lead Manual
            </h3>
            <p className="text-xs text-slate-400">
              Para oportunidades que chegam por telefone, indicação ou eventos
            </p>
          </div>
          <button
            onClick={() => setIsNewLeadModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Contato *</label>
            <input
              type="text"
              required
              placeholder="Ex: Carlos Santana"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Empresa *</label>
              <input
                type="text"
                required
                placeholder="Ex: Santana Transportes"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Tel *</label>
              <input
                type="tel"
                required
                placeholder="(11) 98888-7777"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">E-mail</label>
            <input
              type="email"
              placeholder="carlos@santana.com.br"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Segmento</label>
              <select
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value as SegmentType })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
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
              <label className="block text-slate-300 font-semibold mb-1">Origem do Lead</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="WhatsApp Direto">WhatsApp Direto</option>
                <option value="Indicação">Indicação de Cliente</option>
                <option value="Inbound Manual">Ligação / Inbound</option>
                <option value="Campanha Ads">Campanha Tráfego Pago</option>
                <option value="Landing Page">Landing Page</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Solução Pretendida</label>
            <select
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value as SolutionType })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Orbit CRM (Gestão de Vendas & Clientes)">Orbit CRM (Vendas)</option>
              <option value="Orbit ERP (Gestão Empresarial Completa)">Orbit ERP (Gestão & Fiscal)</option>
              <option value="Orbit Apps (App Mobile Sob Medida)">Orbit Apps (Mobile)</option>
              <option value="Ecossistema Completo (ERP + CRM + App)">Ecossistema Completo</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Necessidade / Observações Iniciais</label>
            <textarea
              rows={2}
              placeholder="Detalhes sobre a conversa inicial..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewLeadModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md shadow-purple-900/40"
            >
              Adicionar ao CRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
