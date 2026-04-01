import React from 'react';
import { motion } from 'motion/react';
import { Bell, Clock, Briefcase, Trophy, CheckCircle2 } from 'lucide-react';
import { Notification } from '@/src/types';
import { cn } from '@/src/lib/utils';

export const NotificationCenter = () => {
  const notifications: Notification[] = [
    { id: '1', user_id: 'u1', title: 'Rappel de pointage', body: 'Vous n\'avez pas encore pointé ce matin.', read: false, type: 'pointage', created_at: '2026-04-01T08:30:00Z' },
    { id: '2', user_id: 'u1', title: 'Demande approuvée', body: 'Votre demande de jour OFF pour le 05/04 a été validée.', read: true, type: 'rh', created_at: '2026-03-31T14:20:00Z' },
    { id: '3', user_id: 'u1', title: 'Nouvelle mission', body: '3 nouvelles chambres VIP ont été ajoutées à votre planning.', read: true, type: 'housekeeping', created_at: '2026-03-31T09:00:00Z' },
    { id: '4', user_id: 'u1', title: 'Badge obtenu !', body: 'Félicitations, vous avez reçu le badge "Top Performer".', read: true, type: 'performance', created_at: '2026-03-30T17:00:00Z' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'pointage': return <Clock size={16} />;
      case 'rh': return <CheckCircle2 size={16} />;
      case 'housekeeping': return <Briefcase size={16} />;
      case 'performance': return <Trophy size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'pointage': return 'bg-orange-50 text-orange-600';
      case 'rh': return 'bg-green-50 text-green-600';
      case 'housekeeping': return 'bg-blue-50 text-blue-600';
      case 'performance': return 'bg-violet-light text-violet';
      default: return 'bg-background text-text-secondary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-text-primary">Récentes</h3>
        <button className="text-violet text-xs font-bold uppercase tracking-wider">Tout marquer comme lu</button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-4 rounded-2xl flex gap-4 transition-all",
              notif.read ? "bg-surface opacity-70" : "bg-surface card-shadow border-l-4 border-violet"
            )}
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", getColor(notif.type))}>
              {getIcon(notif.type)}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-text-primary leading-tight">{notif.title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{notif.body}</p>
              <p className="text-[10px] text-text-secondary opacity-50 uppercase tracking-widest pt-1">Il y a 2 heures</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
