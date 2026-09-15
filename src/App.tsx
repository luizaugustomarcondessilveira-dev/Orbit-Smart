import React, { useEffect } from 'react';
import { LeadsProvider, useLeads } from './context/LeadsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage/LandingPage';
import { CrmDashboard } from './components/CRM/CrmDashboard';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Sparkles, X, Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, toast, dismissToast } = useLeads();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Check URL route for CRM access (/crm-interno or #crm-interno or ?view=crm-interno)
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      if (path.includes('crm-interno') || hash.includes('crm-interno') || search.includes('view=crm-interno')) {
        setActiveTab('crm');
      } else if (window.location.hash === '' && (path === '/' || path === '')) {
        setActiveTab('landing');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, [setActiveTab]);

  // Discrete keyboard shortcut for team members: Alt + C or Ctrl + Shift + L to open internal CRM
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'c') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        window.location.hash = 'crm-interno';
        setActiveTab('crm');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab]);

  const handleBackToLanding = () => {
    window.location.hash = '';
    setActiveTab('landing');
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* View routing: Public Landing Page vs Protected CRM */}
      {activeTab === 'landing' ? (
        <LandingPage />
      ) : isAuthLoading ? (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
          <div className="flex items-center gap-3 text-purple-400 bg-slate-900/80 border border-purple-500/20 px-5 py-3.5 rounded-2xl shadow-xl backdrop-blur-xl">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium text-slate-300">Verificando sessão no Supabase Auth...</span>
          </div>
        </div>
      ) : !isAuthenticated ? (
        <LoginScreen onBackToLanding={handleBackToLanding} />
      ) : (
        <CrmDashboard />
      )}

      {/* Floating Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 rounded-2xl bg-slate-900/95 border border-purple-500/50 shadow-2xl shadow-purple-950 backdrop-blur-xl flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30 flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex-grow">
              <h4 className="text-xs font-bold text-white font-['Space_Grotesk']">
                {activeTab === 'crm' ? toast.title : 'Solicitação Recebida com Sucesso!'}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {activeTab === 'crm' 
                  ? toast.message 
                  : 'Nossa equipe de consultores da Orbit Smart entrará em contato em breve.'}
              </p>
            </div>

            <button
              onClick={dismissToast}
              className="text-slate-500 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LeadsProvider>
        <AppContent />
      </LeadsProvider>
    </AuthProvider>
  );
}
