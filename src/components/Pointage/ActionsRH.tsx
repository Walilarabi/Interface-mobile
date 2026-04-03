import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, LayoutGrid, FileText, User, Sparkles, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';

interface ActionsRHProps {
  onAction: (type: string) => void;
}

export const ActionsRH = ({ onAction }: ActionsRHProps) => {
  const { t } = useTranslation();
  const actions = [
    { id: 'off', label: t('rh.off_title'), icon: Calendar, color: 'bg-blue-50 text-blue-600', sub: t('rh.off_subtitle') },
    { id: 'retard', label: t('rh.retard_title'), icon: Clock, color: 'bg-orange-50 text-orange-600', sub: t('rh.retard_subtitle') },
    { id: 'maladie', label: t('rh.maladie_title'), icon: LayoutGrid, color: 'bg-red-50 text-red-600', sub: t('rh.maladie_subtitle') },
    { id: 'cp', label: t('rh.cp_title'), icon: FileText, color: 'bg-green-50 text-green-600', sub: t('rh.cp_subtitle') },
    { id: 'extra', label: t('rh.extra_title'), icon: Sparkles, color: 'bg-violet-light text-violet', sub: t('rh.extra_subtitle') },
    { id: 'exchange', label: t('rh.exchange_title'), icon: ArrowLeftRight, color: 'bg-teal-50 text-teal-600', sub: t('rh.exchange_subtitle') },
    { id: 'rdv', label: t('rh.rdv_title'), icon: User, color: 'bg-background text-text-secondary', sub: t('rh.rdv_subtitle') },
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
