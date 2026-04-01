import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, User, TrendingUp, Target, Award, CheckCircle, AlertCircle, LayoutGrid, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/hooks/useAuth';
import { cn } from '@/src/lib/utils';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const kpis = [
    { label: 'Présence', value: '31%', icon: CheckCircle, color: 'text-green', bg: 'bg-green-light' },
    { label: 'Retard', value: '8%', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Chambres', value: '56%', icon: LayoutGrid, color: 'text-violet', bg: 'bg-violet-light' },
    { label: 'Productivité', value: '120%', icon: Zap, color: 'text-green', bg: 'bg-green-light' },
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
          <h2 className="text-xl font-bold text-center mb-2">Dashboard Direction</h2>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6 relative z-20">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-surface p-4 rounded-[24px] card-shadow border border-border/50 flex flex-col gap-2">
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{kpi.label}</p>
              <div className="flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", kpi.bg, kpi.color)}>
                  <kpi.icon size={18} />
                </div>
                <span className="text-xl font-bold text-text-primary">{kpi.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap / Map Placeholder */}
        <div className="bg-surface p-4 rounded-[28px] card-shadow border border-border/50 space-y-4">
          <div className="relative h-48 bg-background rounded-2xl overflow-hidden border border-border/30">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-orange-50/50">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-2xl"></div>
            </div>
            
            {/* Map Labels */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold shadow-sm border border-border/20">Spa</div>
                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold shadow-sm border border-border/20">Réception</div>
              </div>
              <div className="flex justify-center">
                <div className="bg-violet text-white px-3 py-1 rounded-lg text-[8px] font-bold shadow-lg">Entropie</div>
              </div>
              <div className="flex justify-between items-end">
                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold shadow-sm border border-border/20">2f étage</div>
                <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold shadow-sm border border-border/20">2é étage</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <MapPin size={14} className="text-violet" />
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">B. en Ylarne !</p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-violet text-white py-4 rounded-[24px] font-bold active-tap card-shadow shadow-violet/20">
          Voir les détails
        </button>
      </div>
    </div>
  );
};
