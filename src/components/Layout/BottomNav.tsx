import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, Calendar, LayoutGrid } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Clock, label: 'Historique', path: '/pointage?tab=historique' },
    { icon: Calendar, label: 'Planning', path: '/planning' },
    { icon: LayoutGrid, label: 'Actions', path: '/pointage?tab=actions' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-border/30 px-8 py-4 flex justify-between items-center z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1.5 transition-all duration-300 active-tap relative group",
              isActive ? "text-violet" : "text-text-secondary opacity-40 hover:opacity-70"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "transition-all duration-300",
                isActive && "drop-shadow-[0_0_8px_rgba(109,40,217,0.3)]"
              )}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              <span className={cn(
                "text-[8px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute -top-4 w-8 h-1 bg-violet rounded-full blur-[2px] opacity-20"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
