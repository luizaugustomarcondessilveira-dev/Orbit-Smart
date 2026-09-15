import React, { useState } from 'react';
import { useLeads } from '../../context/LeadsContext';
import { PIPELINE_STAGES } from '../../data/seedLeads';
import { LeadCard } from './LeadCard';
import { LeadStatus } from '../../types';
import { Plus } from 'lucide-react';

export const PipelineKanban: React.FC = () => {
  const { leads, filters, updateLeadStatus, setIsNewLeadModalOpen } = useLeads();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<LeadStatus | null>(null);

  // Apply active search & dropdown filters
  const filteredLeads = leads.filter((l) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q);
      if (!match) return false;
    }
    if (filters.segment !== 'todos' && l.segment !== filters.segment) return false;
    if (filters.solution !== 'todos' && l.solution !== filters.solution) return false;
    if (filters.priority !== 'todas' && l.priority !== filters.priority) return false;
    if (filters.status !== 'todos' && l.status !== filters.status) return false;
    return true;
  });

  const handleDragStart = (leadId: string) => {
    setDraggedLeadId(leadId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: LeadStatus) => {
    e.preventDefault();
    if (dragOverStage !== stageId) {
      setDragOverStage(stageId);
    }
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (stageId: LeadStatus) => {
    if (draggedLeadId) {
      updateLeadStatus(draggedLeadId, stageId);
      setDraggedLeadId(null);
      setDragOverStage(null);
    }
  };

  const formatBRL = (val: number) => {
    if (val >= 1000) {
      return `R$ ${(val / 1000).toFixed(0)}k`;
    }
    return `R$ ${val}`;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto overflow-x-auto">
      <div className="flex gap-4 min-w-[1350px] pb-6 items-start">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.status === stage.id);
          const stageTotalValue = stageLeads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);
          const isOver = dragOverStage === stage.id;

          return (
            <div
              key={stage.id}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(stage.id)}
              className={`flex-1 min-w-[260px] max-w-[310px] rounded-2xl bg-slate-950/80 border transition-all duration-150 flex flex-col max-h-[calc(100vh-230px)] ${
                isOver
                  ? 'border-purple-400 bg-purple-950/20 ring-2 ring-purple-500/40'
                  : 'border-slate-800/80'
              }`}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-['Space_Grotesk']">
                      {stage.label}
                    </span>
                    <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-md ${stage.badgeBg}`}>
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {formatBRL(stageTotalValue)} em propostas
                  </div>
                </div>

                {stage.id === 'novo' && (
                  <button
                    onClick={() => setIsNewLeadModalOpen(true)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Adicionar lead manual"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Cards Container */}
              <div className="p-2.5 space-y-2.5 overflow-y-auto flex-grow">
                {stageLeads.length === 0 ? (
                  <div className="py-8 text-center border-2 border-dashed border-slate-800/60 rounded-xl p-4">
                    <p className="text-xs text-slate-500">Nenhum lead nesta etapa</p>
                    <p className="text-[10px] text-slate-600 mt-1">Arraste um card aqui</p>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={() => handleDragStart(lead.id)}
                      className="active:cursor-grabbing cursor-grab"
                    >
                      <LeadCard lead={lead} />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
