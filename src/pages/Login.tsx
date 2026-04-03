import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';

export const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(email);
      setIsSent(true);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface p-10 rounded-[40px] card-shadow w-full max-w-md text-center space-y-6 border border-violet/10"
        >
          <div className="w-20 h-20 bg-violet-light rounded-3xl flex items-center justify-center text-violet mx-auto shadow-inner">
            <Mail size={40} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-text-primary tracking-tight">{t('auth.magic_link_sent')}</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('auth.check_your_email')} <span className="font-bold text-violet">{email}</span> pour vous connecter.
            </p>
          </div>
          <div className="pt-4">
            <button 
              onClick={() => setIsSent(false)}
              className="text-xs font-bold text-violet uppercase tracking-widest active-tap px-6 py-3 rounded-xl hover:bg-violet-light transition-colors"
            >
              Modifier l'email
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <LanguageSwitcher />
          </div>
          <h1 className="font-logo text-5xl text-violet mb-2 tracking-tighter">FLOWTYM</h1>
          <p className="text-text-secondary font-medium tracking-wide uppercase text-[10px]">Pilotage opérationnel hôtelier</p>
        </div>

        <div className="bg-surface p-8 rounded-[32px] card-shadow w-full border border-border/50">
          <h2 className="text-2xl font-black text-text-primary mb-6 tracking-tight">{t('auth.login')}</h2>
          <p className="text-text-secondary text-sm mb-8 leading-relaxed">
            {t('auth.send_link')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-violet transition-colors" size={20} />
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-violet/10 focus:border-violet transition-all font-medium"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-violet text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active-tap hover:bg-violet-dark transition-all shadow-lg shadow-violet/20",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>{t('auth.send_link')} <ArrowRight size={20} /></>
              )}
            </button>
          </form>
        </div>

        <p className="mt-12 text-[10px] text-text-secondary leading-relaxed font-bold uppercase tracking-widest opacity-60">
          {t('auth.terms')} <br />
          <span className="underline decoration-violet/30 underline-offset-4">{t('auth.conditions')}</span> et notre <span className="underline decoration-violet/30 underline-offset-4">{t('auth.privacy')}</span>.
        </p>
      </motion.div>
    </div>
  );
};
