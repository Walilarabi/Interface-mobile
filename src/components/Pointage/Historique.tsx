import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, subWeeks, addWeeks, startOfWeek, endOfWeek, isWithinInterval, parseISO } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Historique = () => {
  const { t, language } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 30)); // Start with a date in late March 2026
  const [statusFilter, setStatusFilter] = useState<'all' | 'started' | 'ended' | 'validated'>('all');

  const locale = language === 'fr' ? fr : enUS;

  const history = [
    { date: '2026-04-01', start: '08:50', end: '17:10', extra: 0.2, status: 'validated', hotel: 'LuxuryForrest Paris', color: '#7C3AED' },
    { date: '2026-03-31', start: '08:58', end: '17:05', extra: 0.5, status: 'validated', hotel: 'LuxuryForrest Paris', color: '#7C3AED' },
    { date: '2026-03-30', start: '09:02', end: '17:00', extra: 0, status: 'validated', hotel: 'ForestGarden Boutique', color: '#10B981' },
    { date: '2026-03-29', start: '08:55', end: null, extra: 0, status: 'started', hotel: 'LuxuryForrest Paris', color: '#7C3AED' },
    { date: '2026-03-28', start: '09:00', end: '16:55', extra: 0, status: 'ended', hotel: 'ForestGarden Boutique', color: '#10B981' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'started':
        return {
          label: t('common.loading'),
          color: 'text-violet bg-violet-light/30',
          cardBg: 'bg-violet/[0.03]',
          borderColor: 'border-violet/20',
          accent: 'bg-violet',
          icon: <Clock size={10} />
        };
      case 'ended':
        return {
          label: t('common.loading'),
          color: 'text-orange-600 bg-orange-50',
          cardBg: 'bg-orange-500/[0.03]',
          borderColor: 'border-orange-500/20',
          accent: 'bg-orange-500',
          icon: <AlertCircle size={10} />
        };
      case 'validated':
      default:
        return {
          label: t('common.done'),
          color: 'text-green bg-green-light/30',
          cardBg: 'bg-green/[0.03]',
          borderColor: 'border-green/20',
          accent: 'bg-green',
          icon: <CheckCircle2 size={10} />
        };
    }
  };

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const itemDate = parseISO(item.date);
      const isInWeek = isWithinInterval(itemDate, { start: weekStart, end: weekEnd });
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return isInWeek && matchesStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [weekStart, weekEnd, statusFilter]);

  const handlePrevWeek = () => setSelectedDate(prev => subWeeks(prev, 1));
  const handleNextWeek = () => setSelectedDate(prev => addWeeks(prev, 1));

  const filters = [
    { id: 'all', label: t('common.all') },
    { id: 'started', label: t('common.loading') },
    { id: 'ended', label: t('common.loading') },
    { id: 'validated', label: t('common.done') },
  ];

  return (
    <div className="space-y-4 px-4">
      {/* Week Selector */}
      <div className="flex items-center justify-between bg-surface p-3 rounded-[24px] card-shadow border border-border/50 mb-4">
        <button 
          onClick={handlePrevWeek}
          className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-text-secondary active-tap border border-border/30"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Calendar size={12} className="text-violet opacity-50" />
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.2em]">{t('common.today')}</span>
          </div>
          <h3 className="font-bold text-text-primary text-sm">
            {format(weekStart, 'dd MMM', { locale })} — {format(weekEnd, 'dd MMM', { locale })}
          </h3>
        </div>

        <button 
          onClick={handleNextWeek}
          className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-text-secondary active-tap border border-border/30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id as any)}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border active-tap",
              statusFilter === f.id 
                ? "bg-violet text-white border-violet shadow-md" 
                : "bg-surface text-text-secondary border-border/50 hover:border-violet/30"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60">
          {filteredHistory.length} {t('pointage.history')}
        </h3>
        <button className="text-violet text-[10px] font-bold uppercase tracking-wider active-tap">{t('common.confirm')}</button>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((item, i) => {
              const statusConfig = getStatusConfig(item.status);
              
              return (
                <motion.div 
                  key={item.date}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "relative overflow-hidden p-4 rounded-[24px] card-shadow flex items-center justify-between border transition-colors",
                    statusConfig.cardBg,
                    statusConfig.borderColor
                  )}
                >
                  {/* Status Accent Bar */}
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1", statusConfig.accent)} />

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface flex flex-col items-center justify-center text-text-primary shrink-0 border border-border/30 shadow-sm">
                      <span className="text-[8px] font-bold uppercase opacity-50">{format(parseISO(item.date), 'EEE', { locale })}</span>
                      <span className="text-sm font-bold leading-none">{format(parseISO(item.date), 'dd')}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <p className="text-[9px] font-bold text-text-secondary truncate max-w-[120px]">{item.hotel}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                        <span>{item.start}</span>
                        <span className="text-text-secondary opacity-30">→</span>
                        <span>{item.end || '--:--'}</span>
                      </div>
                      {item.extra > 0 && (
                        <p className="text-[8px] text-green font-bold uppercase mt-0.5">+{item.extra}h {t('rh.extra_title')}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-lg shadow-sm",
                      statusConfig.color
                    )}>
                      {statusConfig.icon}
                      <span className="text-[8px] font-bold uppercase tracking-wider">{statusConfig.label}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto text-text-secondary/20">
              <Calendar size={32} />
            </div>
            <p className="text-xs font-medium text-text-secondary">{t('errors.not_found')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
