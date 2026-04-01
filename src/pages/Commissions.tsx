import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, User, TrendingUp, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/hooks/useAuth';

export const Commissions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const commissions = [
    { label: 'Excursion Lennos', amount: 80 },
    { label: 'Surclassement', amount: 40 },
    { label: 'Rapport champagne', amount: 25 },
    { label: 'Spa & Détente - M. Dupont', amount: 20 },
    { label: 'Recomm. Taxi', amount: 20 },
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
          <h2 className="text-xl font-bold text-center mb-2">Suivi des Primes & Commissions</h2>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6 relative z-20">
        {/* Total Card */}
        <div className="bg-surface p-5 rounded-[28px] card-shadow border border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[20px] bg-violet-light border-2 border-violet/20 flex items-center justify-center text-violet overflow-hidden shadow-sm">
              {user?.profile_photo ? (
                <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">Rémy L.</h3>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Total cumulé</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-violet">242 €</p>
            </div>
          </div>
        </div>

        {/* Commissions List */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-2 opacity-60">Commissions</h4>
          <div className="bg-surface rounded-[28px] card-shadow overflow-hidden divide-y divide-border border border-border/30">
            {commissions.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between bg-surface">
                <p className="font-bold text-sm text-text-primary">{item.label}</p>
                <span className="font-bold text-sm text-text-primary">{item.amount} €</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-violet text-white py-4 rounded-[24px] font-bold active-tap card-shadow shadow-violet/20">
          Voir mes objectifs
        </button>
      </div>
    </div>
  );
};
