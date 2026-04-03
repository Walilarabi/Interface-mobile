
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CommentCard } from './CommentCard';
import { PlatformComment } from '@/src/services/crmApi';
import { Search, Globe, Filter, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PlatformCommentsTabProps {
  comments: PlatformComment[];
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

export const PlatformCommentsTab: React.FC<PlatformCommentsTabProps> = ({ comments }) => {
  const [activePlatform, setActivePlatform] = React.useState<'all' | string>('all');

  const platforms = ['all', ...Array.from(new Set(comments.map(c => c.platform)))];

  const filteredComments = activePlatform === 'all' 
    ? comments 
    : comments.filter(c => c.platform === activePlatform);

  return (
    <div className="space-y-4 pb-10">
      {/* 🔍 Search & Filter */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full border border-border/30 px-4 py-2 flex items-center gap-2 shadow-sm">
          <Search size={14} className="text-text-secondary" />
          <input 
            type="text" 
            placeholder="Rechercher un avis..." 
            className="flex-1 bg-transparent border-none text-[11px] font-medium text-text-primary placeholder:text-text-secondary focus:ring-0 p-0"
          />
        </div>
        <button className="w-9 h-9 bg-white rounded-full border border-border/30 flex items-center justify-center text-text-secondary active-tap shadow-sm">
          <Filter size={14} />
        </button>
      </div>

      {/* 🏷️ Platform Chips */}
      <div className="flex items-center gap-1.5 px-1 overflow-x-auto no-scrollbar py-4">
        {platforms.map(platform => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={cn(
              "px-2.5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active-tap border shrink-0 flex items-center gap-2 min-w-[40px] justify-center relative",
              activePlatform === platform 
                ? "bg-violet text-white border-violet shadow-lg shadow-violet/20" 
                : "bg-white text-text-secondary border-border/30"
            )}
          >
            {platform === 'all' ? (
              <span>Tous</span>
            ) : (
              <div className="relative">
                <img 
                  src={platformLogos[platform as string] || ''} 
                  alt={platform as string} 
                  className="w-5 h-5 rounded-sm"
                  referrerPolicy="no-referrer"
                />
                {platformRatings[platform as string] && (
                  <div className={cn(
                    "absolute -top-3 -right-4 px-1.5 py-0.5 rounded-full text-[7px] font-black border shadow-sm whitespace-nowrap z-10",
                    activePlatform === platform 
                      ? "bg-white text-violet border-white" 
                      : "bg-violet text-white border-violet"
                  )}>
                    {platformRatings[platform as string]}
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 💬 Comments List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredComments.length > 0 ? (
            filteredComments.map(comment => (
              <CommentCard 
                key={comment.id} 
                comment={comment} 
                type="platform" 
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-text-secondary border border-border/30">
                <Globe size={24} />
              </div>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Aucun avis trouvé</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
