import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Historique = () => {
  const history = [
    { date: '2026-03-31', start: '08:58', end: '17:05', extra: 0.5, status: 'validated', hotel: 'LuxuryForrest Paris', color: '#7C3AED' },
    { date: '2026-03-30', start: '09:02', end: '17:00', extra: 0, status: 'validated', hotel: 'ForestGarden Boutique', color: '#10B981' },
    { date: '2026-03-29', start: '08:55', end: '17:15', extra: 1, status: 'validated', hotel: 'LuxuryForrest Paris', color: '#7C3AED' },
    { date: '2026-03-28', start: '09:00', end: '16:55', extra: 0, status: 'validated', hotel: 'ForestGarden Boutique', color: '#10B981' },
  ];

  return (
    <div className="space-y-4 px-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-text-primary">Mars 2026</h3>
        <button className="text-violet text-xs font-bold uppercase tracking-wider">Filtrer</button>
      </div>

      {history.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-surface p-4 rounded-[24px] card-shadow flex items-center justify-between border border-border/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background flex flex-col items-center justify-center text-text-primary shrink-0">
              <span className="text-[8px] font-bold uppercase opacity-50">{format(new Date(item.date), 'EEE', { locale: fr })}</span>
              <span className="text-sm font-bold leading-none">{format(new Date(item.date), 'dd')}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <p className="text-[9px] font-bold text-text-secondary truncate max-w-[100px]">{item.hotel}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                <span>{item.start}</span>
                <span className="text-text-secondary opacity-30">→</span>
                <span>{item.end}</span>
              </div>
              {item.extra > 0 && (
                <p className="text-[8px] text-green font-bold uppercase mt-0.5">+{item.extra}h supp.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-green">
              <CheckCircle2 size={12} />
              <span className="text-[8px] font-bold uppercase tracking-wider">Validé</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
