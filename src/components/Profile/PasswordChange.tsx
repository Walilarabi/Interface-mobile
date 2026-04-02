import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const PasswordChange = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-surface rounded-[32px] card-shadow p-8 flex flex-col items-center text-center gap-6 border border-border/50">
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
          <ShieldCheck size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-text-primary">Mot de passe modifié</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Votre mot de passe a été mis à jour avec succès. Veuillez utiliser votre nouveau mot de passe lors de votre prochaine connexion.
          </p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="w-full bg-violet text-white py-4 rounded-2xl font-bold text-sm active-tap shadow-lg"
        >
          Continuer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-[32px] card-shadow p-6 border border-border/50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Lock size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">Sécurité du compte</h3>
            <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">Modifier votre mot de passe</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-background border border-border/50 px-5 py-4 rounded-2xl text-sm focus:outline-none focus:border-violet transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary active-tap"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-background border border-border/50 px-5 py-4 rounded-2xl text-sm focus:outline-none focus:border-violet transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary active-tap"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-background border border-border/50 px-5 py-4 rounded-2xl text-sm focus:outline-none focus:border-violet transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary active-tap"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full bg-violet text-white py-4 rounded-2xl font-bold text-sm active-tap shadow-lg flex items-center justify-center gap-3",
              loading && "opacity-70 cursor-wait"
            )}
          >
            {loading ? "Mise à jour..." : "Enregistrer les modifications"}
          </button>
        </form>
      </div>

      <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="text-orange-600 shrink-0" size={18} />
        <p className="text-[10px] text-orange-700 font-medium leading-relaxed">
          Pour des raisons de sécurité, votre mot de passe doit contenir au moins 8 caractères, dont une majuscule et un chiffre.
        </p>
      </div>
    </div>
  );
};
