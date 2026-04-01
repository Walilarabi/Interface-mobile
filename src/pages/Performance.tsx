import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, TrendingUp, ChevronLeft, Award, Target, Clock, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/hooks/useAuth';

export const Performance = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const ranking = [
    { name: 'Lâvia', score: 89, photo: null },
    { name: 'Jovanna B.', score: 89, photo: null },
    { name: 'Clara L.', score: 82, photo: null },
    { name: 'Thomas R.', score: 80, photo: null },
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
          <h2 className="text-xl font-bold text-center mb-2">Performance collaborateurs</h2>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6 relative z-20">
        {/* Top Performer Card */}
        <div className="bg-surface p-5 rounded-[28px] card-shadow border border-border/50 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 shadow-sm">
              <Trophy size={24} />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-[20px] bg-violet-light border-2 border-violet/20 flex items-center justify-center text-violet overflow-hidden shadow-sm">
              {user?.profile_photo ? (
                <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">{user?.first_name} {user?.last_name?.charAt(0)}.</h3>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Top performer du mois</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-violet">95</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
              <Award size={20} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
              <Star size={20} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-light flex items-center justify-center text-violet shadow-sm border border-violet/10">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        {/* Ranking List */}
        <div className="space-y-3">
          {ranking.map((item, i) => (
            <div key={i} className="bg-surface p-3 rounded-[20px] card-shadow flex items-center justify-between border border-border/30">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-text-secondary w-4">{i + 1}.</span>
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-text-secondary overflow-hidden">
                  <User size={16} className="opacity-20" />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-primary">{item.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] text-text-secondary font-bold uppercase tracking-widest opacity-40">Score:</span>
                <span className="font-bold text-sm text-text-primary">{item.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full bg-violet text-white py-4 rounded-[24px] font-bold active-tap card-shadow shadow-violet/20">
          Voir mon score
        </button>
      </div>
    </div>
  );
};
