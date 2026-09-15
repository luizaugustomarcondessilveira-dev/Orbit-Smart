import React from 'react';
import { OrbitLogo } from '../OrbitLogo';
import { useLeads } from '../../context/LeadsContext';
import { useAuth } from '../../context/AuthContext';
import { SegmentType, SolutionType, LeadStatus, LeadPriority } from '../../types';
import { 
  Kanban, 
  List, 
  BarChart2, 
  Plus, 
  Download, 
  RotateCcw, 
  Search, 
  Globe, 
  SlidersHorizontal,
  X,
  Lock,
  RefreshCw,
  Zap,
  LogOut,
  UserCheck
} from 'lucide-react';

interface CrmHeaderProps {
  onLock?: () => void;
}

export const CrmHeader: React.FC<CrmHeaderProps> = ({ onLock }) => {
  const { 
    setActiveTab, 
    activeCrmView, 
    setActiveCrmView, 
    setIsNewLeadModalOpen, 
    exportLeadsToCsv, 
    resetToDemoData,
    refreshLeads,
    isLoading,
    isSupabaseActive,
    filters,
    setFilters,
    newLeadsCount
  } = useLeads();
  const { user, signOut, isAuthenticated } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'todos',
      segment: 'todos',
      solution: 'todos',
      priority: 'todas',
      sortBy: 'createdAt_desc'
    });
  };

  const hasActiveFilters = filters.search || filters.status !== 'todos' || filters.segment !== 'todos' || filters.solution !== 'todos' || filters.priority !== 'todas';

  return (
    <div className="bg-slate-900 border-b border-purple-900/40 sticky top-0 z-30 shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Branding & Subtitle */}
        <div className="flex items-center gap-4">
          <OrbitLogo size="md" />
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Grotesk'] flex items-center gap-1.5">
              <span>Painel de Vendas & Gestão de Leads</span>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500 text-white font-mono font-bold animate-pulse">
                  {newLeadsCount} novos
                </span>
              )}
            </span>
            <span className="text-[11px] text-slate-400 block">
              Gerencie oportunidades originadas da Landing Page
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* Supabase Realtime Status Pill */}
          <div 
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium border ${
              isSupabaseActive
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-950/80 border-slate-800 text-slate-400'
            }`}
            title={isSupabaseActive ? 'Conectado ao Supabase com Realtime ativo' : 'Operando em modo local (Configure VITE_SUPABASE_URL)'}
          >
            <span className="relative flex h-2 w-2">
              {isSupabaseActive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSupabaseActive ? 'bg-emerald-500' : 'bg-slate-600'}`}></span>
            </span>
            <span className="hidden sm:inline">{isSupabaseActive ? 'Supabase Realtime' : 'Cache Local'}</span>
          </div>

          {/* Refresh leads button */}
          <button
            onClick={() => refreshLeads()}
            disabled={isLoading}
            className="p-2 rounded-xl text-xs text-slate-300 bg-slate-950 border border-slate-800 hover:border-purple-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            title="Atualizar lista de leads do Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-purple-400' : ''}`} />
          </button>

          {/* Switch to Landing Page */}
          <button
            id="btn-crm-to-landing"
            onClick={() => {
              window.location.hash = '';
              setActiveTab('landing');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-700 hover:border-purple-500 hover:text-white transition-all cursor-pointer"
            title="Ir para a Landing Page pública de captação de leads"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Ver Landing Page</span>
          </button>

          {/* User Email Badge (when authenticated) */}
          {user?.email && (
            <div 
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
              title={`Operador autenticado: ${user.email}`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-[140px]">{user.email}</span>
            </div>
          )}

          {/* Sign Out Button (visible only when authenticated) */}
          {isAuthenticated && (
            <button
              id="btn-crm-signout"
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-600/30 transition-all cursor-pointer"
              title={user?.email ? `Sair da conta (${user.email})` : 'Desconectar do CRM'}
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sair</span>
            </button>
          )}

          {/* Export to CSV */}
          <button
            onClick={exportLeadsToCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            title="Baixar planilha de leads em formato CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Exportar CSV</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={resetToDemoData}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
            title="Restaurar leads demonstrativos iniciais"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Restaurar Demo</span>
          </button>

          {/* Add Manual Lead */}
          <button
            id="btn-crm-new-lead"
            onClick={() => setIsNewLeadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Lead</span>
          </button>
        </div>

      </div>

      {/* Sub-bar: View Switcher and Search/Filters */}
      <div className="bg-slate-950/60 border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* View Mode Buttons */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setActiveCrmView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCrmView === 'kanban'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Funil Kanban</span>
            </button>

            <button
              onClick={() => setActiveCrmView('tabela')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCrmView === 'tabela'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabela Detalhada</span>
            </button>

            <button
              onClick={() => setActiveCrmView('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCrmView === 'analytics'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Métricas & Gráficos</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-2 flex-grow max-w-xl">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, empresa, telefone ou e-mail..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Segment filter */}
            <select
              value={filters.segment}
              onChange={(e) => setFilters(prev => ({ ...prev, segment: e.target.value as any }))}
              className="py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500 hidden sm:block max-w-[150px] truncate"
            >
              <option value="todos">Todos Segmentos</option>
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

            {/* Solution filter */}
            <select
              value={filters.solution}
              onChange={(e) => setFilters(prev => ({ ...prev, solution: e.target.value as any }))}
              className="py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500 hidden md:block max-w-[150px] truncate"
            >
              <option value="todos">Todas Soluções</option>
              <option value="Orbit CRM (Gestão de Vendas & Clientes)">Orbit CRM</option>
              <option value="Orbit ERP (Gestão Empresarial Completa)">Orbit ERP</option>
              <option value="Orbit Apps (App Mobile Sob Medida)">Orbit Apps</option>
              <option value="Ecossistema Completo (ERP + CRM + App)">Ecossistema</option>
            </select>

            {/* Clear filters button if active */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-purple-400 hover:text-purple-300 underline whitespace-nowrap px-1"
                title="Limpar todos os filtros"
              >
                Limpar
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
