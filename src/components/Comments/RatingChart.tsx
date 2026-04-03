
import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface RatingChartProps {
  score: number;
  evolution: number;
  period: string;
}

export const RatingChart: React.FC<RatingChartProps> = ({ score, evolution, period }) => {
  const isPositive = evolution >= 0;

  return (
    <div className="bg-white rounded-[24px] p-5 border border-border/30 shadow-sm space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Évolution satisfaction</h3>
          <p className="text-3xl font-black text-text-primary tracking-tighter">{score}%</p>
        </div>
        <div className={cn(
          "px-2 py-1 rounded-full flex items-center gap-1 border",
          isPositive ? "bg-green/10 border-green/20 text-green" : "bg-red-50 border-red-100 text-red-500"
        )}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span className="text-[10px] font-black tracking-tight">{isPositive ? '+' : ''}{evolution}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-linear-to-r from-violet to-green rounded-full"
          />
        </div>
        <div className="flex justify-between items-center text-[9px] font-bold text-text-secondary">
          <span>{period} ▲ {evolution}% vs mois dernier</span>
          <span>Objectif 90%</span>
        </div>
      </div>
    </div>
  );
};
