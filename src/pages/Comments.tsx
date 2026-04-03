
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/src/hooks/useAuth';
import { useComments } from '@/src/hooks/useComments';
import { SummaryTab } from '@/src/components/Comments/SummaryTab';
import { InternalCommentsTab } from '@/src/components/Comments/InternalCommentsTab';
import { PlatformCommentsTab } from '@/src/components/Comments/PlatformCommentsTab';
import { MessageSquare, BarChart3, Globe, ChevronLeft, RefreshCw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Comments = () => {
  const { user } = useAuth();
  const { 
    internalComments, 
    platformComments, 
    score: satisfactionScore, 
    teamScores, 
    loading, 
    loadInternalComments: refresh,
    markAsRead,
    respondToComment
  } = useComments();
  
  const [activeTab, setActiveTab] = React.useState<'summary' | 'internal' | 'platform'>('summary');

  const canRespond = ['admin', 'manager', 'director', 'responsable', 'reception'].includes(user?.role || '');

  const tabs = [
    { id: 'summary', label: 'Synthèse', icon: BarChart3 },
    { id: 'internal', label: 'Internes', icon: MessageSquare },
    { id: 'platform', label: 'Plateformes', icon: Globe },
  ];

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* 🔝 Header */}
      <div className="bg-linear-to-br from-violet to-violet-dark text-white px-5 pt-6 pb-8 rounded-b-[32px] relative shrink-0 z-30 shadow-xl">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 active-tap"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-black tracking-tight">Commentaires Clients</h1>
          </div>
          <button 
            onClick={refresh}
            disabled={loading}
            className={cn(
              "w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 active-tap",
              loading && "animate-spin"
            )}
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Mise à jour en temps réel</p>
        </div>
      </div>

      {/* 📑 Tabs Navigation */}
      <div className="px-5 -mt-4 relative z-40">
        <div className="bg-white p-1.5 rounded-[24px] shadow-xl border border-border/30 flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[18px] transition-all active-tap",
                activeTab === tab.id 
                  ? "bg-violet text-white shadow-lg shadow-violet/20" 
                  : "text-text-secondary hover:bg-gray-50"
              )}
            >
              <tab.icon size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 📜 Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-6 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-violet border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Chargement des avis...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'summary' && (
              <SummaryTab key="summary" score={satisfactionScore} teams={teamScores} />
            )}
            {activeTab === 'internal' && (
              <InternalCommentsTab 
                key="internal" 
                comments={internalComments} 
                onRead={(id) => markAsRead(id, user?.id || '')}
                onRespond={(id) => respondToComment(id, 'Merci pour votre retour !', user?.id || '')}
                canRespond={canRespond}
              />
            )}
            {activeTab === 'platform' && (
              <PlatformCommentsTab key="platform" comments={platformComments} />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
