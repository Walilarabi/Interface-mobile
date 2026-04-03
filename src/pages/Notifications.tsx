import React from 'react';
import { motion } from 'motion/react';
import { Bell, ChevronLeft, Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Notifications = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      title: 'Pointage validé',
      message: 'Votre pointage du 01/04 a été validé par votre manager.',
      time: 'Il y a 2h',
      type: 'success',
      icon: CheckCircle2,
      color: 'text-green bg-green-light/30'
    },
    {
      id: 2,
      title: 'Nouveau commentaire',
      message: 'Un client a laissé un commentaire sur votre service.',
      time: 'Il y a 5h',
      type: 'info',
      icon: MessageSquare,
      color: 'text-violet bg-violet-light/30'
    },
    {
      id: 3,
      title: 'Demande de CP',
      message: 'Votre demande de congés payés est en attente de validation.',
      time: 'Hier',
      type: 'warning',
      icon: Clock,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <header className="bg-violet text-white px-6 py-6 flex items-center gap-4 sticky top-0 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center active-tap"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{t('notifications.title')}</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface p-4 rounded-[24px] card-shadow border border-border/50 flex gap-4 active-tap"
          >
            <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${notif.color}`}>
              <notif.icon size={24} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-text-primary text-sm">{notif.title}</h3>
                <span className="text-[10px] text-text-secondary opacity-60">{notif.time}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{notif.message}</p>
            </div>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center text-text-secondary/20">
              <Bell size={40} />
            </div>
            <p className="text-text-secondary font-medium">{t('notifications.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
