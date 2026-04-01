import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/hooks/useAuth';
import { Clock, Briefcase, Trophy, ChevronRight, QrCode, Bell, MapPin, ConciergeBell, Users, MessageSquare, WifiOff, TrendingUp, Target, Award, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { OfflineMode } from '@/src/components/OfflineMode';

import { useHotel } from '@/src/hooks/useHotel';

export const Dashboard = () => {
  const { user } = useAuth();
  const { activeHotel, hotels, setActiveHotel } = useHotel();
  const [showHotelSelector, setShowHotelSelector] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);

  if (isOffline) {
    return <OfflineMode onDismiss={() => setIsOffline(false)} />;
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Top Section with Dynamic Background */}
      <div 
        className="text-white px-4 pt-2 pb-5 rounded-b-[24px] relative overflow-hidden shrink-0 transition-colors duration-500"
        style={{ backgroundColor: activeHotel?.color || '#7C3AED' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-3xl"></div>
        
        <div className="flex justify-between items-center mb-3 relative z-10">
          <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md active-tap">
            <Bell size={18} />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="font-logo text-lg font-bold tracking-tight">
              FLOW<span className="text-green">TYM</span>
            </h1>
            <button 
              onClick={() => setShowHotelSelector(!showHotelSelector)}
              className="flex items-center gap-1 text-[10px] font-medium opacity-80 active-tap"
            >
              <MapPin size={10} />
              {activeHotel?.name}
              <ChevronRight size={10} className={cn("transition-transform", showHotelSelector && "rotate-90")} />
            </button>
          </div>
          <Link to="/profile" className="active-tap">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden border border-white/10 shadow-sm">
              {user?.profile_photo ? (
                <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User size={18} />
              )}
            </div>
          </Link>
        </div>

        {/* Hotel Selector Dropdown */}
        {showHotelSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-14 left-4 right-4 bg-white rounded-2xl shadow-xl z-50 p-2 border border-border/50 text-text-primary"
          >
            <p className="text-[10px] font-bold text-text-secondary px-2 mb-1 uppercase tracking-wider">Changer d'établissement</p>
            <div className="space-y-1">
              {hotels.map((hotel) => (
                <button
                  key={hotel.id}
                  onClick={() => {
                    setActiveHotel(hotel.id);
                    setShowHotelSelector(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-xl transition-colors active-tap",
                    activeHotel?.id === hotel.id ? "bg-violet/10 text-violet" : "hover:bg-gray-50"
                  )}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: hotel.color }}
                  >
                    <Briefcase size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">{hotel.name}</p>
                    <p className="text-[9px] opacity-60 truncate max-w-[180px]">{hotel.address}</p>
                  </div>
                  {activeHotel?.id === hotel.id && (
                    <div className="ml-auto w-1.5 h-1.5 bg-violet rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2.5 relative z-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold leading-tight">Bonjour {user?.first_name},</h2>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsOffline(true)}
                className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center active-tap"
              >
                <WifiOff size={12} />
              </button>
              <Link 
                to="/chat"
                className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center active-tap relative"
              >
                <MessageSquare size={12} />
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-green rounded-full border border-violet animate-pulse" />
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-[14px] card-shadow active-tap text-text-primary">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: activeHotel?.color }}
            >
              <Bell size={12} fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-bold">{activeHotel?.name}</p>
            </div>
            <ChevronRight size={10} className="text-text-secondary opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="px-4 mt-2 space-y-3 flex-1 overflow-hidden relative z-20 pb-2">
        {/* Main Action: Pointage */}
        <div className="space-y-1.5">
          <h3 className="text-[8px] font-bold text-text-secondary px-2 uppercase tracking-widest">Action Principale</h3>
          <Link 
            to="/pointage" 
            className="bg-linear-to-br from-violet to-violet-dark text-white p-2.5 rounded-[18px] card-shadow flex items-center gap-3 active-tap relative overflow-hidden border border-white/10"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-5 -mt-5 blur-2xl"></div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-md border border-white/20">
              <div className="relative">
                <Clock size={14} className="absolute -top-1 -left-1 text-green" />
                <QrCode size={20} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm leading-tight">Pointage</h3>
              <p className="text-white/60 text-[8px] font-medium uppercase tracking-wider mt-0.5">Scanner pour pointer</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
              <ChevronRight size={12} />
            </div>
          </Link>
        </div>

        {/* Modules Section */}
        <div className="space-y-1.5">
          <h3 className="text-[8px] font-bold text-text-secondary px-2 uppercase tracking-widest">Modules Métiers</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link 
              to="/housekeeping" 
              className="bg-surface p-2.5 rounded-[18px] card-shadow flex flex-col gap-1.5 active-tap relative overflow-hidden h-20 border border-border/20"
            >
              <div className="w-7 h-7 bg-green-light text-green rounded-lg flex items-center justify-center shadow-sm">
                <Briefcase size={14} />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-[11px] leading-tight text-text-primary">Housekeeping</h3>
                <p className="text-[7px] text-text-secondary font-medium mt-0.5">Gestion chambres</p>
              </div>
            </Link>

            <div className="bg-surface p-2.5 rounded-[18px] card-shadow flex flex-col gap-1.5 active-tap h-20 relative border border-border/20 opacity-80">
              <div className="absolute top-1.5 right-1.5 px-1 py-0.5 bg-violet-light text-violet text-[5px] font-bold rounded-full uppercase tracking-widest shadow-sm">Bientôt</div>
              <div className="w-7 h-7 bg-background text-text-secondary rounded-lg flex items-center justify-center shadow-sm">
                <ConciergeBell size={14} />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-[11px] leading-tight text-text-primary">Conciergerie</h3>
                <p className="text-[7px] text-text-secondary font-medium mt-0.5">Services clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance & Suivi Section */}
        <div className="space-y-1.5">
          <h3 className="text-[8px] font-bold text-text-secondary px-2 uppercase tracking-widest">Performance & Suivi</h3>
          <div className="grid grid-cols-2 gap-1.5">
            <Link 
              to="/performance" 
              className="bg-surface p-2 rounded-[18px] card-shadow flex flex-col gap-1.5 active-tap h-18 relative border border-border/20"
            >
              <div className="w-6 h-6 bg-violet-light rounded-lg flex items-center justify-center shadow-sm text-violet">
                <Trophy size={12} />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-[11px] leading-tight text-text-primary">Performance</h3>
              </div>
            </Link>

            <Link 
              to="/commissions" 
              className="bg-surface p-2 rounded-[18px] card-shadow flex flex-col gap-1.5 active-tap h-18 relative border border-border/20"
            >
              <div className="w-6 h-6 bg-green-light rounded-lg flex items-center justify-center shadow-sm text-green">
                <TrendingUp size={12} />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-[11px] leading-tight text-text-primary">Commissions</h3>
              </div>
            </Link>

            <Link 
              to="/admin-dashboard" 
              className="bg-surface p-2 rounded-[18px] card-shadow flex flex-col gap-1.5 active-tap h-18 relative border border-border/20"
            >
              <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center shadow-sm text-orange-500">
                <Target size={12} />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-[11px] leading-tight text-text-primary">Admin</h3>
              </div>
            </Link>

            <Link 
              to="/rewards" 
              className="bg-surface p-2 rounded-[18px] card-shadow flex flex-col gap-1.5 active-tap h-18 relative border border-border/20"
            >
              <div className="w-6 h-6 bg-violet-light rounded-lg flex items-center justify-center shadow-sm text-violet">
                <Award size={12} />
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-[11px] leading-tight text-text-primary">Récompenses</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
