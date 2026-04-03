import React from 'react';
import { motion } from 'motion/react';
import { PieChart, ArrowUpRight, History } from 'lucide-react';
import { useTranslation } from '@/src/hooks/useTranslation';

export const SoldeConges = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 px-5 pt-5">
      <div className="bg-surface p-5 rounded-[24px] card-shadow text-center space-y-4 border border-border/50">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" stroke="#F5F7FA" strokeWidth="10" 
            />
            <motion.circle 
              cx="50" cy="50" r="45" 
              fill="none" stroke="#5B2A8A" strokeWidth="10" 
              strokeDasharray="282.7"
              initial={{ strokeDashoffset: 282.7 }}
              animate={{ strokeDashoffset: 282.7 * (1 - 12.5 / 25) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">12.5</span>
            <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('rh.remaining_days')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div className="text-left">
            <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest mb-0.5">{t('rh.acquired')}</p>
            <p className="text-base font-bold text-text-primary">25.0</p>
          </div>
          <div className="text-left">
            <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest mb-0.5">{t('rh.taken')}</p>
            <p className="text-base font-bold text-text-primary">12.5</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-[9px] font-bold text-text-secondary uppercase tracking-widest px-2 opacity-60">{t('rh.last_requests')}</h4>
        {[
          { type: 'CP', date: '15/04 → 22/04', status: 'pending', label: t('rh.cp') },
          { type: 'OFF', date: '05/04/2026', status: 'approved', label: t('rh.off_title') },
        ].map((item, i) => (
          <div key={i} className="bg-surface p-3 rounded-[20px] card-shadow flex items-center justify-between border border-border/30">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[9px]",
                item.status === 'approved' ? "bg-green-light text-green" : "bg-orange-light text-orange"
              )}>
                {item.type}
              </div>
              <div>
                <p className="font-bold text-xs text-text-primary leading-tight">{item.label}</p>
                <p className="text-[9px] text-text-secondary">{item.date}</p>
              </div>
            </div>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-wider",
              item.status === 'approved' ? "bg-green-light text-green" : "bg-orange-light text-orange"
            )}>
              {item.status === 'approved' ? t('common.done') : t('common.loading')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
