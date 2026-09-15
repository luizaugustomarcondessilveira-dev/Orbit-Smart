import React from 'react';
import { Lead, LeadStatus } from '../../types';
import { useLeads } from '../../context/LeadsContext';
import { PIPELINE_STAGES } from '../../data/seedLeads';
import { 
  Building2, 
  MessageCircle, 
  Clock, 
  MoreHorizontal, 
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const { setSelectedLead, updateLeadStatus } = useLeads();

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid opening modal if user clicked on specific sub-buttons
    if ((e.target as HTMLElement).closest('.stop-propagation')) {
      return;
    }
    setSelectedLead(lead);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Olá ${lead.name.split(' ')[0]}, tudo bem? Sou consultor da Orbit Smart! Vi que você solicitou informações sobre ${lead.solution} para a empresa ${lead.company}. Podemos conversar agora?`
    );
    window.open(`https://wa.me/55${cleanPhone}?text=${text}`, '_blank');
  };

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    updateLeadStatus(lead.id, e.target.value as LeadStatus);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 60) return `${mins}m atrás`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/60 rounded-xl p-3.5 shadow-md hover:shadow-purple-950/40 transition-all duration-150 cursor-pointer group relative select-none"
    >
      {/* Top row: Priority & Time */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
            lead.priority === 'alta'
              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              : lead.priority === 'media'
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {lead.priority === 'alta' && <Flame className="w-2.5 h-2.5 text-rose-400" />}
          <span>{lead.priority.toUpperCase()}</span>
        </span>

        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
          <Clock className="w-3 h-3" />
          <span>{getTimeAgo(lead.createdAt)}</span>
        </span>
      </div>

      {/* Name and Company */}
      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
        {lead.name}
      </h4>
      
      <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5">
        <Building2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
        <span className="truncate font-medium">{lead.company}</span>
      </div>

      {/* Badges: Segment & Solution */}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 font-medium">
          {lead.segment}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/70 text-purple-300 border border-purple-800/40 truncate max-w-[170px]">
          {lead.solution.split('(')[0]}
        </span>
      </div>

      {/* Value & Actions Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Valor Estimado</span>
          <span className="text-xs font-bold text-emerald-400">
            {formatCurrency(lead.estimatedValue)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 stop-propagation">
          {/* Quick WhatsApp trigger */}
          <button
            onClick={handleWhatsAppClick}
            className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
            title={`Abrir WhatsApp para ${lead.phone}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>

          {/* Quick Move Stage Select */}
          <select
            value={lead.status}
            onChange={handleStageChange}
            className="text-[10px] py-1 px-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer"
            title="Mover estágio do funil"
          >
            {PIPELINE_STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
