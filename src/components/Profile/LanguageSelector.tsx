import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('fr');

  const languages = [
    { id: 'fr', label: 'Français', code: 'FR', active: true },
    { id: 'gb', label: 'English', code: 'GB', active: true },
    { id: 'de', label: 'Deutsch', code: 'DE', sub: 'Allemand', active: false },
    { id: 'es', label: 'Español', code: 'ES', sub: 'Espagnol', active: false },
    { id: 'it', label: 'Italiano', code: 'IT', sub: 'Italien', active: false },
    { id: 'pt', label: 'Português', code: 'PT', sub: 'Portugais', active: false },
    { id: 'sa', label: 'العربية', code: 'SA', sub: 'Arabe', active: false },
  ];

  return (
    <div className="bg-surface rounded-[32px] card-shadow overflow-hidden divide-y divide-border border border-border/50">
      {languages.map((lang) => (
        <button
          key={lang.id}
          disabled={!lang.active}
          onClick={() => lang.active && setSelectedLang(lang.id)}
          className={cn(
            "w-full px-6 py-5 flex items-center justify-between transition-colors active-tap",
            lang.active ? "bg-surface hover:bg-background" : "bg-background/50 opacity-60 cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold text-text-secondary w-8 tracking-tighter">
              {lang.code}
            </span>
            <div className="text-left">
              <p className={cn(
                "text-sm font-bold",
                selectedLang === lang.id ? "text-violet" : "text-text-primary"
              )}>
                {lang.label}
              </p>
              {lang.sub && (
                <p className="text-[10px] text-text-secondary font-medium">
                  {lang.sub}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!lang.active && (
              <span className="text-[8px] font-bold uppercase tracking-widest bg-violet-light text-violet px-2 py-1 rounded-full">
                Bientôt
              </span>
            )}
            {selectedLang === lang.id && lang.active && (
              <Check size={18} className="text-violet" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
