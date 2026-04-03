
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
  trip: 'https://www.google.com/s2/favicons?domain=trip.com&sz=64',
};

const platformRatings: Record<string, string> = {
  tripadvisor: '4.4',
  booking: '8.8',
  expedia: '8.9',
  google: '4.6',
  trip: '4.2',
};

export const PlatformCommentsTab: React.FC<PlatformCommentsTabProps> = ({ comments }) => {
  const [activePlatform, setActivePlatform] = React.useState<'all' | string>('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'recent' | 'rating'>('recent');
  const [minRating, setMinRating] = React.useState<number>(0);

  const platformOrder = ['booking', 'expedia', 'google', 'tripadvisor', 'trip'];
  const availablePlatforms = Array.from(new Set(comments.map(c => c.platform)));
  const sortedPlatforms = ['all', ...platformOrder.filter(p => availablePlatforms.includes(p))];

  const filteredComments = comments
    .filter(c => {
      const matchesPlatform = activePlatform === 'all' || c.platform === activePlatform;
      const matchesSearch = c.comment.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (c.guest_name?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRating = c.rating >= minRating;
      return matchesPlatform && matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.rating - a.rating;
      }
    });

  return (
    <div className="space-y-4 pb-10">
      {/* 🔍 Search & Filter */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full border border-border/30 px-4 py-2 flex items-center gap-2 shadow-sm">
          <Search size={14} className="text-text-secondary" />
          <input 
            type="text" 
            placeholder="Rechercher un avis..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none text-[11px] font-medium text-text-primary placeholder:text-text-secondary focus:ring-0 p-0"
          />
        </div>
        <button 
          onClick={() => setShowFilterModal(true)}
          className="w-9 h-9 bg-white rounded-full border border-border/30 flex items-center justify-center text-text-secondary active-tap shadow-sm"
        >
          <Filter size={14} />
        </button>
      </div>

      {/* 🏷️ Platform Chips */}
      <div className="flex items-center gap-1.5 px-1 overflow-x-auto no-scrollbar py-4">
        {sortedPlatforms.map(platform => (
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

      {/* 🎭 Filter Modal (Simple) */}
      <AnimatePresence>
        {showFilterModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-[40px] p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-text-primary uppercase tracking-tight">Filtres</h3>
                <button onClick={() => setShowFilterModal(false)} className="text-text-secondary font-bold text-xs uppercase tracking-widest">Fermer</button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3">Trier par</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setSortBy('recent')}
                      className={cn(
                        "py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all",
                        sortBy === 'recent' ? "bg-violet text-white" : "bg-gray-50 text-text-secondary border border-border/30"
                      )}
                    >
                      Plus récents
                    </button>
                    <button 
                      onClick={() => setSortBy('rating')}
                      className={cn(
                        "py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all",
                        sortBy === 'rating' ? "bg-violet text-white" : "bg-gray-50 text-text-secondary border border-border/30"
                      )}
                    >
                      Mieux notés
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3">Note minimale</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button 
                        key={n} 
                        onClick={() => setMinRating(minRating === n ? 0 : n)}
                        className={cn(
                          "flex-1 py-2 rounded-xl border transition-all flex items-center justify-center gap-1",
                          minRating >= n ? "bg-violet/10 border-violet text-violet" : "bg-gray-50 border-border/30 text-text-secondary"
                        )}
                      >
                        <span className="text-xs font-bold">{n}</span>
                        <Star size={10} className={cn(minRating >= n ? "fill-violet" : "fill-gray-300")} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowFilterModal(false)}
                className="w-full bg-violet text-white py-4 rounded-2xl font-bold active-tap shadow-lg shadow-violet/20"
              >
                Appliquer les filtres
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
