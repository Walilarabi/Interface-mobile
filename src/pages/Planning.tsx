import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar as CalendarIcon, MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../hooks/useHotel';
import { cn } from '../lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';

interface MasterPlanningEntry {
  id: string;
  hotel_id: string;
  hotel_name: string;
  hotel_color: string;
  start_time: string;
  end_time: string;
  tasks: string[];
  type: 'shift' | 'break';
}

const MOCK_MASTER_PLANNING: Record<string, MasterPlanningEntry[]> = {
  '2026-04-01': [
    {
      id: '1',
      hotel_id: 'hotel_1',
      hotel_name: 'LuxuryForrest Paris',
      hotel_color: '#7C3AED',
      start_time: '08:00',
      end_time: '12:00',
      tasks: ['5 Chambres à blanc', '3 Recouches'],
      type: 'shift'
    },
    {
      id: '2',
      hotel_id: 'break',
      hotel_name: 'Pause Déjeuner',
      hotel_color: '#94A3B8',
      start_time: '12:00',
      end_time: '13:00',
      tasks: [],
      type: 'break'
    },
    {
      id: '3',
      hotel_id: 'hotel_2',
      hotel_name: 'ForestGarden Boutique',
      hotel_color: '#10B981',
      start_time: '13:00',
      end_time: '17:00',
      tasks: ['10 Chambres à blanc'],
      type: 'shift'
    }
  ]
};

export const Planning = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hotels } = useHotel();
  const [selectedDate, setSelectedDate] = useState('2026-04-01');
  
  const dayEntries = MOCK_MASTER_PLANNING[selectedDate] || [];

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="bg-violet text-white px-4 py-3 flex items-center gap-3 shrink-0">
        <Link to="/" className="active-tap">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-base font-bold">{t('pointage.planning')}</h1>
      </header>

      {/* Date Selector */}
      <div className="bg-white border-b border-border/50 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet/10 text-violet flex items-center justify-center">
              <CalendarIcon size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary">{t('dashboard.today')}</p>
              <p className="text-[10px] text-text-secondary">Mercredi 1 Avril</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/pointage?tab=planning')}
            className="text-[10px] font-bold text-violet bg-violet/10 px-2 py-1 rounded-lg active-tap"
          >
            {t('dashboard.view_glance')}
          </button>
        </div>

        {/* Mini Calendar Row */}
        <div className="flex justify-between">
          {[29, 30, 31, 1, 2, 3, 4].map((day, i) => {
            const isToday = day === 1;
            return (
              <div 
                key={i}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl min-w-[40px] transition-all",
                  isToday ? "bg-violet text-white shadow-lg shadow-violet/20" : "text-text-secondary"
                )}
              >
                <span className="text-[8px] font-bold uppercase opacity-60">
                  {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][(i + 0) % 7]}
                </span>
                <span className="text-xs font-bold">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[35px] top-2 bottom-2 w-0.5 bg-border/50" />

          <div className="space-y-6">
            {dayEntries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 relative"
              >
                {/* Time Column */}
                <div className="w-10 pt-1">
                  <p className="text-[10px] font-bold text-text-primary text-right">{entry.start_time}</p>
                  {index === dayEntries.length - 1 && (
                    <p className="text-[10px] font-bold text-text-secondary text-right mt-8">{entry.end_time}</p>
                  )}
                </div>

                {/* Dot */}
                <div 
                  className="w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 mt-1.5"
                  style={{ backgroundColor: entry.hotel_color }}
                />

                {/* Card */}
                <div className="flex-1">
                  <div className={cn(
                    "p-3 rounded-2xl border shadow-sm transition-all active-tap",
                    entry.type === 'break' ? "bg-gray-50 border-gray-200" : "bg-white border-border/50"
                  )}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {entry.type === 'shift' ? (
                            <MapPin size={10} style={{ color: entry.hotel_color }} />
                          ) : (
                            <Clock size={10} className="text-gray-400" />
                          )}
                          <h4 className="text-xs font-bold text-text-primary">{entry.hotel_name}</h4>
                        </div>
                        <p className="text-[10px] text-text-secondary font-medium">
                          {entry.start_time} - {entry.end_time}
                        </p>
                      </div>
                      {entry.type === 'shift' && (
                        <div 
                          className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider"
                          style={{ backgroundColor: entry.hotel_color }}
                        >
                          {t('common.online')}
                        </div>
                      )}
                    </div>

                    {entry.tasks.length > 0 && (
                      <div className="space-y-1.5 mt-2 pt-2 border-t border-border/30">
                        <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('performance.objectives')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.tasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                              <Briefcase size={8} className="text-text-secondary" />
                              <span className="text-[9px] font-medium text-text-primary">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-white border-t border-border/50 p-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div>
              <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('pointage.history')}</p>
              <p className="text-sm font-bold text-text-primary">8h 00m</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('profile.personal_info')}</p>
              <p className="text-sm font-bold text-text-primary">2 Hôtels</p>
            </div>
          </div>
          <button className="bg-violet text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-violet/20 active-tap">
            {t('dashboard.view_glance')}
          </button>
        </div>
      </div>
    </div>
  );
};
