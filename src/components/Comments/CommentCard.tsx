
import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, CheckCircle2, Reply, MapPin, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { InternalComment, PlatformComment } from '@/src/services/crmApi';

interface CommentCardProps {
  comment: InternalComment | PlatformComment;
  type: 'internal' | 'platform';
  onRead?: (id: string) => void;
  onRespond?: (id: string) => void;
  canRespond?: boolean;
}

const platformLogos: Record<string, string> = {
  booking: 'https://www.google.com/s2/favicons?domain=booking.com&sz=64',
  expedia: 'https://www.google.com/s2/favicons?domain=expedia.com&sz=64',
  tripadvisor: 'https://www.google.com/s2/favicons?domain=tripadvisor.com&sz=64',
  google: 'https://www.google.com/s2/favicons?domain=google.com&sz=64',
  facebook: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=64',
};

const platformRatings: Record<string, string> = {
  tripadvisor: '125/1800',
  booking: '8.8',
  expedia: '8.9',
  google: '4.6',
};

export const CommentCard: React.FC<CommentCardProps> = ({ comment, type, onRead, onRespond, canRespond }) => {
  const isInternal = type === 'internal';
  const internal = comment as InternalComment;
  const platform = comment as PlatformComment;

  const getRatingColor = (rating: number, max: number) => {
    const percentage = (rating / max) * 100;
    if (percentage >= 80) return 'text-green bg-green/10';
    if (percentage >= 60) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
  };

  const getSourceIcon = () => {
    if (isInternal) return <MapPin size={12} />;
    return <Globe size={12} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[20px] p-4 border border-border/30 shadow-sm space-y-3"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", isInternal && internal.rating < 6 ? "bg-red-500 animate-pulse" : "bg-green")} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              {!isInternal && (
                <div className="relative">
                  <img 
                    src={platformLogos[platform.platform]} 
                    alt={platform.platform} 
                    className="w-4 h-4 rounded-xs"
                    referrerPolicy="no-referrer"
                  />
                  {platformRatings[platform.platform] && (
                    <div className="absolute -top-1.5 -right-2 px-1 py-0.5 rounded-full text-[5px] font-black bg-violet text-white border border-white shadow-xs whitespace-nowrap z-10">
                      {platformRatings[platform.platform]}
                    </div>
                  )}
                </div>
              )}
              <span className="text-[10px] font-black text-text-primary uppercase tracking-tight">
                {isInternal ? `${internal.location.toUpperCase()} ${internal.room_number ? `• CH ${internal.room_number}` : ''}` : platform.platform.toUpperCase()}
              </span>
            </div>
            <span className="text-[8px] text-text-secondary font-medium">
              {new Date(isInternal ? internal.created_at : platform.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <div className={cn("px-2 py-1 rounded-lg flex items-center gap-1", getRatingColor(isInternal ? internal.rating : platform.rating, isInternal ? 10 : 5))}>
          <span className="text-[11px] font-black">{isInternal ? internal.rating : platform.rating}</span>
          <span className="text-[8px] font-bold opacity-60">/{isInternal ? 10 : 5}</span>
        </div>
      </div>

      <p className="text-xs text-text-primary font-medium leading-relaxed italic">
        "{isInternal ? internal.comment : platform.comment}"
      </p>

      {!isInternal && platform.guest_name && (
        <p className="text-[9px] text-text-secondary font-bold">— {platform.guest_name}</p>
      )}

      {isInternal && (
        <div className="flex items-center gap-2 pt-1">
          {internal.status === 'new' && onRead && (
            <button 
              onClick={() => onRead(internal.id)}
              className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-border/50 text-[9px] font-bold text-text-secondary active-tap"
            >
              <CheckCircle2 size={12} />
              <span>Marquer comme lu</span>
            </button>
          )}
          {canRespond && onRespond && (
            <button 
              onClick={() => onRespond(internal.id)}
              className="flex items-center gap-1.5 bg-violet/10 px-3 py-1.5 rounded-full border border-violet/20 text-[9px] font-bold text-violet active-tap"
            >
              <Reply size={12} />
              <span>Répondre</span>
            </button>
          )}
          {internal.status === 'responded' && (
            <div className="flex items-center gap-1.5 text-green text-[9px] font-bold">
              <CheckCircle2 size={12} />
              <span>Réponse envoyée</span>
            </div>
          )}
        </div>
      )}

      {!isInternal && platform.response && (
        <div className="bg-gray-50 p-2 rounded-xl border border-border/30">
          <p className="text-[9px] text-text-secondary font-medium">
            <span className="font-bold text-violet">Réponse de l'hôtel :</span> {platform.response}
          </p>
        </div>
      )}
    </motion.div>
  );
};
