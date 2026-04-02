import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('ocean');

  const themes = [
    { id: 'ocean', label: 'Océan', color: '#0E7490', secondary: '#22D3EE' },
    { id: 'forest', label: 'Forêt', color: '#166534', secondary: '#4ADE80' },
    { id: 'earth', label: 'Terre', color: '#9A3412', secondary: '#FB923C' },
    { id: 'lavender', label: 'Lavande', color: '#6D28D9', secondary: '#A78BFA' },
    { id: 'night', label: 'Nuit', color: '#1E293B', secondary: '#94A3B8' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={cn(
              "bg-surface p-4 rounded-[24px] card-shadow border-2 transition-all active-tap text-left flex flex-col gap-4",
              selectedTheme === theme.id ? "border-violet shadow-lg" : "border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: theme.id === 'ocean' ? '#0E7490' : theme.color }}
              >
                {selectedTheme === theme.id && <Check size={20} />}
              </div>
              <div 
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: theme.secondary }}
              />
            </div>
            <span className={cn(
              "text-sm font-bold",
              selectedTheme === theme.id ? "text-violet" : "text-text-primary"
            )}>
              {theme.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
