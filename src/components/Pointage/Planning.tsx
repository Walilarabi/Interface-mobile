import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWeekend } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Planning = () => {
  const { t, language } = useTranslation();
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const workingDays = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12]; // Mock data
  const locale = language === 'fr' ? fr : enUS;

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-[32px] card-shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-text-primary capitalize">{format(today, 'MMMM yyyy', { locale })}</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-violet rounded-full"></div>
              <span className="text-[10px] text-text-secondary">{t('rh.work')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-background border border-border rounded-full"></div>
              <span className="text-[10px] text-text-secondary">{t('rh.off')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {(language === 'fr' ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']).map((d, i) => (
            <div key={i} className="text-center text-[10px] font-bold text-text-secondary opacity-50 pb-2">{d}</div>
          ))}
          {days.map((day, i) => {
            const isWorking = workingDays.includes(day.getDate());
            const isToday = isSameDay(day, today);
            
            return (
              <div 
                key={i} 
                className={cn(
                  "aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                  isWorking ? "bg-violet-light text-violet" : "text-text-secondary opacity-30",
                  isToday && "ring-2 ring-violet ring-offset-2"
                )}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2">{t('common.today')}</h4>
        <div className="bg-violet text-white p-6 rounded-[24px] card-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="font-bold">{t('rh.service_of_day')}</p>
              <p className="text-xs opacity-80">09:00 — 17:00</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">{t('common.loading')}</span>
        </div>
      </div>
    </div>
  );
};
