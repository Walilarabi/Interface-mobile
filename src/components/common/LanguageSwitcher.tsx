
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../lib/utils';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-border/30">
      <button
        onClick={() => setLanguage('fr')}
        className={cn(
          "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all active-tap uppercase tracking-widest",
          language === 'fr' 
            ? "bg-white text-violet shadow-sm" 
            : "text-text-secondary hover:bg-white/50"
        )}
        aria-label="Français"
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all active-tap uppercase tracking-widest",
          language === 'en' 
            ? "bg-white text-violet shadow-sm" 
            : "text-text-secondary hover:bg-white/50"
        )}
        aria-label="English"
      >
        🇬🇧 EN
      </button>
    </div>
  );
};
