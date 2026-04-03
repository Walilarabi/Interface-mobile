
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CommentCard } from './CommentCard';
import { InternalComment } from '@/src/services/crmApi';
import { Search, Filter, MessageSquare, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface InternalCommentsTabProps {
  comments: InternalComment[];
  onRead: (id: string) => void;
  onRespond: (id: string) => void;
  canRespond: boolean;
}

export const InternalCommentsTab: React.FC<InternalCommentsTabProps> = ({ comments, onRead, onRespond, canRespond }) => {
  const [filter, setFilter] = React.useState<'all' | 'new' | 'critical'>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredComments = comments.filter(c => {
    const matchesFilter = filter === 'all' || (filter === 'new' && c.status === 'new') || (filter === 'critical' && c.rating < 6);
    const matchesSearch = c.comment.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (c.room_number?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-10">
      {/* 🔍 Search & Filter */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full border border-border/30 px-4 py-2 flex items-center gap-2 shadow-sm">
          <Search size={14} className="text-text-secondary" />
          <input 
            type="text" 
            placeholder="Rechercher un commentaire..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none text-[11px] font-medium text-text-primary placeholder:text-text-secondary focus:ring-0 p-0"
          />
        </div>
        <button className="w-9 h-9 bg-white rounded-full border border-border/30 flex items-center justify-center text-text-secondary active-tap shadow-sm">
          <Filter size={14} />
        </button>
      </div>

      {/* 🏷️ Filter Chips */}
      <div className="flex items-center gap-2 px-1">
        {[
          { id: 'all', label: 'Tous', count: comments.length },
          { id: 'new', label: 'Nouveaux', count: comments.filter(c => c.status === 'new').length },
          { id: 'critical', label: 'Critiques', count: comments.filter(c => c.rating < 6).length },
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setFilter(chip.id as any)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active-tap border",
              filter === chip.id 
                ? "bg-violet text-white border-violet shadow-lg shadow-violet/20" 
                : "bg-white text-text-secondary border-border/30"
            )}
          >
            {chip.label} ({chip.count})
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
                type="internal" 
                onRead={onRead}
                onRespond={onRespond}
                canRespond={canRespond}
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-text-secondary border border-border/30">
                <MessageSquare size={24} />
              </div>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Aucun commentaire trouvé</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
