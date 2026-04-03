import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, Calendar, LayoutGrid, MessageSquare } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Commentaires', path: '/comments' },
    { icon: Clock, label: 'Historique', path: '/pointage?tab=historique' },
    { icon: Calendar, label: 'Planning', path: '/planning' },
    { icon: LayoutGrid, label: 'Actions', path: '/pointage?tab=actions' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-border/30 px-4 py-3 flex justify-between items-center z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-all duration-300 active-tap relative group",
              isActive ? "text-[#5B21B6]" : "text-[#64748B] opacity-50 hover:opacity-80"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "transition-all duration-300 p-1 rounded-xl",
                isActive && "bg-[#5B21B6]/10"
              )}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-tight transition-all duration-300",
                isActive ? "opacity-100" : "opacity-100"
              )}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
