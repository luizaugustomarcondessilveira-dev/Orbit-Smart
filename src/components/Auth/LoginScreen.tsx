import React, { useState } from 'react';
import { OrbitLogo } from '../OrbitLogo';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadsContext';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, Globe, Loader2, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onBackToLanding?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToLanding }) => {
  const { signIn } = useAuth();
  const { setActiveTab } = useLeads();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Por favor, informe seu e-mail e sua senha.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        console.warn('[LoginScreen] Falha de autenticação:', error.message);
        // Translate or present user-friendly error messages
        if (
          error.message.includes('Invalid login credentials') ||
          error.message.includes('invalid_credentials') ||
          error.message.includes('Invalid grant')
        ) {
          setErrorMessage('E-mail ou senha incorretos. Verifique os dados digitados.');
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMessage('Este e-mail ainda não foi confirmado no Supabase Auth.');
        } else {
          setErrorMessage(error.message || 'Falha ao autenticar. Tente novamente.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erro inesperado ao conectar ao servidor de autenticação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnToLanding = () => {
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      window.location.hash = '';
      setActiveTab('landing');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-950/80 backdrop-blur-xl relative z-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-800">
          <div className="flex justify-center">
            <OrbitLogo size="lg" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[11px] font-mono uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>Acesso Restrito Comercial</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
              Acesso ao Orbit CRM
            </h2>
            <p className="text-xs text-slate-400 mt-1.5">
              Entre com suas credenciais de operador cadastradas no sistema.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="login-email">
              E-mail Corporativo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="nome@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="login-password">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer transition-colors"
                title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 text-xs text-rose-300 bg-rose-950/50 border border-rose-500/40 p-3 rounded-xl animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Autenticando no Supabase...</span>
              </>
            ) : (
              <>
                <span>Entrar no CRM</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Security & Access Management Notice */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300 font-semibold">Autenticação Segura: </strong>
              Os acessos a este painel são restritos e gerenciados diretamente no painel do Supabase Auth.
            </p>
          </div>
        </form>

        {/* Back to Public Landing Page */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={handleReturnToLanding}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Voltar ao site público da Orbit Smart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
