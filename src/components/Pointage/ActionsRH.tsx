import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, LayoutGrid, FileText, User, Sparkles, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ActionsRHProps {
  onAction: (type: string) => void;
}

export const ActionsRH = ({ onAction }: ActionsRHProps) => {
  const actions = [
    { id: 'off', label: 'Poser un jour OFF', icon: Calendar, color: 'bg-blue-50 text-blue-600', sub: 'Choisissez votre jour' },
    { id: 'retard', label: 'Déclarer un retard', icon: Clock, color: 'bg-orange-50 text-orange-600', sub: 'Informez de l\'arrivée' },
    { id: 'maladie', label: 'Informer Maladie', icon: LayoutGrid, color: 'bg-red-50 text-red-600', sub: 'Téléversez certificat' },
    { id: 'cp', label: 'Demande de CP', icon: FileText, color: 'bg-green-50 text-green-600', sub: 'Planifiez vos congés' },
    { id: 'extra', label: 'Gestion des Extras', icon: Sparkles, color: 'bg-violet-light text-violet', sub: 'Proposez vos repos' },
    { id: 'exchange', label: 'Échange de Shift', icon: ArrowLeftRight, color: 'bg-teal-50 text-teal-600', sub: 'Proposez un échange' },
    { id: 'rdv', label: 'Demander un RDV', icon: User, color: 'bg-background text-text-secondary', sub: 'Voir votre manager' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, i) => (
        <motion.button 
          key={i}
          onClick={() => onAction(action.id)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "bg-surface p-4 rounded-[24px] card-shadow flex flex-col items-center text-center gap-2.5 active-tap border border-transparent hover:border-violet/10 transition-all",
            action.id === 'rdv' && "col-span-2 flex-row text-left"
          )}
        >
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shadow-sm shrink-0", action.color)}>
            <action.icon size={20} />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-text-primary leading-tight block">{action.label}</span>
            <span className="text-[9px] text-text-secondary block opacity-60 leading-tight">{action.sub}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
