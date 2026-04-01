import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-12">
          <h1 className="font-logo text-5xl text-violet mb-2">FLOWTYM</h1>
          <p className="text-text-secondary">Pilotage opérationnel hôtelier</p>
        </div>

        <div className="bg-surface p-8 rounded-[32px] card-shadow w-full">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Connexion</h2>
          <p className="text-text-secondary text-sm mb-8">
            Saisissez votre email professionnel pour recevoir un lien de connexion.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet/20 focus:border-violet transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 active-tap hover:bg-violet-dark transition-colors"
            >
              Recevoir le lien <ArrowRight size={20} />
            </button>
          </form>
        </div>

        <p className="mt-12 text-xs text-text-secondary leading-relaxed">
          En vous connectant, vous acceptez nos <br />
          <span className="underline">Conditions d'Utilisation</span> et notre <span className="underline">Politique de Confidentialité</span>.
        </p>
      </motion.div>
    </div>
  );
};
