import React from 'react';
import { useLeads } from '../../context/LeadsContext';
import { CrmHeader } from './CrmHeader';
import { CrmMetrics } from './CrmMetrics';
import { PipelineKanban } from './PipelineKanban';
import { LeadListView } from './LeadListView';
import { CrmAnalyticsView } from './CrmAnalyticsView';
import { LeadDetailModal } from './LeadDetailModal';
import { NewLeadModal } from './NewLeadModal';

interface CrmDashboardProps {
  onLock?: () => void;
}

export const CrmDashboard: React.FC<CrmDashboardProps> = ({ onLock }) => {
  const { activeCrmView } = useLeads();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <CrmHeader onLock={onLock} />
      <main className="flex-grow pb-12">
        <CrmMetrics />
        {activeCrmView === 'kanban' && <PipelineKanban />}
        {activeCrmView === 'tabela' && <LeadListView />}
        {activeCrmView === 'analytics' && <CrmAnalyticsView />}
      </main>

      {/* Modals */}
      <LeadDetailModal />
      <NewLeadModal />
    </div>
  );
};
