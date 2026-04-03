import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, TrendingUp, ChevronLeft, Award, Target, Clock, User, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/hooks/useAuth';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Rewards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  const ranking = [
    { name: 'Clara L.', score: 95, photo: null },
    { name: 'Thomas R.', score: 80, photo: null },
    { name: 'Jovanna B.', score: 89, photo: null },
    { name: 'Kevin P.', score: 50, photo: null },
  ];

  return (
    <div className="pb-24 min-h-screen bg-background overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="bg-violet text-white px-6 pt-4 pb-10 rounded-b-[40px] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md active-tap"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1" />
          <div className="w-10" />
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold text-center mb-2">{t('dashboard.rewards')}</h2>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6 relative z-20">
        {/* Main Reward Card */}
        <div className="bg-surface p-6 rounded-[28px] card-shadow border border-border/50 text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-violet/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-full h-full bg-violet-light rounded-full flex items-center justify-center text-violet shadow-lg border-4 border-white">
              <Sparkles size={64} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
              <Award size={24} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-text-primary">{user?.first_name} {user?.last_name}</h3>
            <p className="text-xs font-bold text-violet uppercase tracking-widest mt-1">{t('common.soon')}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <Trophy size={14} className="text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{t('common.soon')}</span>
            <ChevronRight size={14} className="opacity-30" />
          </div>
        </div>

        {/* Ranking List */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-2 opacity-60">{t('performance.ranking')}</h4>
          <div className="bg-surface rounded-[28px] card-shadow overflow-hidden divide-y divide-border border border-border/30">
            {ranking.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between bg-surface">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-text-secondary w-4">{i + 1}.</span>
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-text-secondary overflow-hidden">
                    <User size={16} className="opacity-20" />
                  </div>
                  <p className="font-bold text-sm text-text-primary">{item.name}</p>
                </div>
                <span className="font-bold text-sm text-text-primary">{item.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-violet text-white py-4 rounded-[24px] font-bold active-tap card-shadow shadow-violet/20 flex items-center justify-center gap-2">
          <TrendingUp size={20} />
          {t('common.soon')}
        </button>
      </div>
    </div>
  );
};
