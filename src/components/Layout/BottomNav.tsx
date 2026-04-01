import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, Calendar, LayoutGrid } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Clock, label: 'Historique', path: '/pointage?tab=historique' },
    { icon: Calendar, label: 'Planning', path: '/planning' },
    { icon: LayoutGrid, label: 'Actions', path: '/pointage?tab=actions' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-6 py-3 flex justify-between items-center z-50 shadow-2xl">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-all active-tap",
              isActive ? "text-violet scale-110" : "text-text-secondary opacity-60"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
