import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/src/hooks/useAuth';
import { Clock, Briefcase, Trophy, ChevronRight, Scan, Bell, MapPin, ConciergeBell, Users, MessageSquare, WifiOff, TrendingUp, Target, Award, User, Play, Pause, Square, Star, Calendar as CalendarIcon, Eye, QrCode, Sparkles, LayoutGrid, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { OfflineMode } from '@/src/components/OfflineMode';
import { useHotel } from '@/src/hooks/useHotel';
import { NotificationCenter } from '@/src/components/Profile/NotificationCenter';

export const Dashboard = () => {
  const { user } = useAuth();
  const { activeHotel, hotels, setActiveHotel } = useHotel();
  const [showHotelSelector, setShowHotelSelector] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);
  const [showCoupDeilModal, setShowCoupDeilModal] = React.useState(false);
  const [showMaJournee, setShowMaJournee] = React.useState(true);
  
  // Live Status State
  const [isOnDuty, setIsOnDuty] = React.useState(false);
  const [startTime] = React.useState(new Date(Date.now() - 3.5 * 60 * 60 * 1000)); 
  const [elapsedTime, setElapsedTime] = React.useState('');

  React.useEffect(() => {
    if (!isOnDuty) return;
    
    const updateTimer = () => {
      const diff = Date.now() - startTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setElapsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOnDuty, startTime]);

  if (isOffline) {
    return <OfflineMode onDismiss={() => setIsOffline(false)} />;
  }

  const MaJourneeBlock = ({ compact = false }: { compact?: boolean }) => (
    <div className={cn("bg-white rounded-[24px] shadow-sm border border-border/30 p-4 space-y-3", compact && "p-3")}>
      {!compact && (
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet/5 flex flex-col items-center justify-center text-violet border border-violet/10">
              <span className="text-[6px] font-black uppercase">Avr</span>
              <span className="text-xs font-black leading-none">02</span>
            </div>
            <p className="text-[10px] font-bold text-text-primary">Progression du jour</p>
          </div>
          <p className="text-[10px] font-black text-violet">65%</p>
        </div>
      )}
      
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '65%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-linear-to-r from-violet to-green rounded-full"
        />
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-3 relative">
          <div className="absolute left-[5px] top-3 bottom-0 w-[1px] bg-gray-100" />
          <div className="w-2.5 h-2.5 rounded-full bg-violet border-2 border-white shadow-sm z-10" />
          <div className="flex-1 bg-gray-50/50 p-2 rounded-xl border border-border/30 flex items-center justify-between">
            <div>
              <p className="text-[8px] font-black text-violet uppercase tracking-widest">09:00</p>
              <p className="text-[10px] font-bold text-text-primary truncate max-w-[120px]">{activeHotel?.name}</p>
            </div>
            <span className="text-[8px] font-bold text-text-secondary">5 ch.</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-white shadow-sm z-10" />
          <div className="flex-1 bg-white p-2 rounded-xl border border-border/30 flex items-center justify-between opacity-60">
            <div>
              <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest">14:00</p>
              <p className="text-[10px] font-bold text-text-primary">Hôtel Opera</p>
            </div>
            <span className="text-[8px] font-bold text-text-secondary">10 ch.</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] overflow-hidden pb-20">
      {/* 🔝 1. Header (compact & premium) */}
      <div className="bg-linear-to-br from-violet to-violet-dark text-white px-5 pt-4 pb-6 rounded-b-[32px] relative shrink-0 z-30 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green/10 rounded-full -ml-16 -mb-16 blur-2xl opacity-30"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1.5">
            <h1 className="font-logo text-xl font-black tracking-tighter">
              FLOW<span className="text-green">TYM</span>
            </h1>
            <button 
              onClick={() => setShowHotelSelector(true)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 active-tap max-w-[160px]"
            >
              <MapPin size={9} className="text-green shrink-0" />
              <span className="text-[9px] font-bold tracking-wide truncate">{activeHotel?.name}</span>
              <ChevronRight size={9} className="shrink-0 opacity-50" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(true)}
              className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 active-tap relative"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-violet" />
            </button>
            <Link to="/profile" className="active-tap">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden border border-white/20 shadow-lg">
                {user?.profile_photo ? (
                  <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User size={16} />
                )}
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-2.5 space-y-0 relative z-10">
          <h2 className="text-base font-bold tracking-tight leading-none">Bonjour {user?.first_name},</h2>
          <p className="text-white/70 text-[9px] font-medium">Prêt pour une nouvelle journée ?</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 -mt-3 space-y-4 flex-1 overflow-y-auto no-scrollbar relative z-20 pb-4">
        
        {/* ⚡ 2. Action principale (Pointage) */}
        {!isOnDuty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Link 
              to="/pointage" 
              className="block bg-linear-to-br from-violet to-green p-4 rounded-[24px] shadow-lg relative overflow-hidden active-tap group border border-white/10"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-10 -mt-10 blur-2xl"
              />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/30 shadow-xl">
                  <QrCode size={24} className="text-white" />
                </div>
                <div className="flex-1 text-white">
                  <h3 className="text-base font-black leading-tight tracking-tight">Pointer maintenant</h3>
                  <p className="text-white/80 text-[10px] font-medium">Scanner pour démarrer votre service</p>
                </div>
                <ChevronRight size={18} className="text-white opacity-60" />
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 rounded-[24px] shadow-md border border-green/20 flex items-center justify-between relative overflow-hidden"
          >
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center text-green relative">
                <Clock size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <p className="text-[8px] font-black text-green uppercase tracking-widest">En poste</p>
                <p className="text-lg font-black text-text-primary font-mono tracking-tighter">{elapsedTime}</p>
              </div>
            </div>
            <div className="flex gap-2 relative z-10">
              <button className="w-10 h-10 rounded-xl bg-gray-50 border border-border/50 flex items-center justify-center text-text-secondary active-tap">
                <Pause size={16} />
              </button>
              <button 
                onClick={() => setIsOnDuty(false)}
                className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center active-tap"
              >
                <Square size={14} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}

        {/* 📅 3. Bloc intelligent (Ma journée) - Placé juste en bas de la carte pointer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Ma journée</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-violet/10 px-2 py-0.5 rounded-full">
                <div className="w-1 h-1 bg-violet rounded-full animate-pulse" />
                <span className="text-[8px] font-bold text-violet">Top Performer</span>
              </div>
              <button 
                onClick={() => setShowMaJournee(!showMaJournee)}
                className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary active-tap"
              >
                <motion.div animate={{ rotate: showMaJournee ? 90 : 0 }}>
                  <ChevronRight size={10} />
                </motion.div>
              </button>
            </div>
          </div>
          <AnimatePresence>
            {showMaJournee && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <MaJourneeBlock />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🧩 4. Modules métiers (grille équilibrée) */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-black text-text-secondary px-2 uppercase tracking-widest">Modules métiers</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'housekeeping', label: 'Housekeeping', sub: 'Chambres', icon: Briefcase, color: 'bg-green-50 text-green', path: '/housekeeping' },
              { id: 'conciergerie', label: 'Conciergerie', sub: 'Clients', icon: ConciergeBell, color: 'bg-blue-50 text-blue-500', soon: true },
              { id: 'performance', label: 'Performance', sub: 'Objectifs', icon: Trophy, color: 'bg-violet-50 text-violet', path: '/performance' },
              { id: 'commissions', label: 'Commissions', sub: 'Gains', icon: TrendingUp, color: 'bg-teal-50 text-teal-600', path: '/commissions' },
              { id: 'rewards', label: 'Récompenses', sub: 'Cadeaux', icon: Award, color: 'bg-orange-50 text-orange-500', path: '/rewards' },
              { id: 'admin', label: 'Admin', sub: 'Équipe', icon: Target, color: 'bg-slate-50 text-slate-600', path: '/admin-dashboard' },
            ].map((module) => (
              <Link 
                key={module.id}
                to={module.path || '#'}
                className={cn(
                  "bg-white p-3 rounded-[24px] shadow-sm border border-border/30 flex flex-col gap-2 active-tap relative group overflow-hidden",
                  module.soon && "opacity-80 grayscale-[0.5]"
                )}
              >
                {module.soon && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-violet-light text-violet text-[5px] font-black rounded-full uppercase tracking-widest">Bientôt</div>
                )}
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", module.color)}>
                  <module.icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-[11px] text-text-primary leading-none">{module.label}</h3>
                  <p className="text-[8px] text-text-secondary font-medium mt-0.5">{module.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coup d'Œil Button */}
        <button 
          onClick={() => setShowCoupDeilModal(true)}
          className="w-full bg-white border border-border/50 p-3 rounded-[20px] flex items-center justify-center gap-2 text-text-secondary active-tap hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Eye size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Voir le Coup d'Œil</span>
        </button>
      </div>

      {/* 🏨 Hotel Selector Modal */}
      <AnimatePresence>
        {showHotelSelector && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHotelSelector(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md z-[101]"
            >
              <div className="bg-white rounded-[32px] border border-border/50 shadow-2xl p-6 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-violet-light text-violet flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">Établissements</h2>
                  </div>
                  <button 
                    onClick={() => setShowHotelSelector(false)}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary active-tap"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar">
                  {hotels.map((hotel) => (
                    <button
                      key={hotel.id}
                      onClick={() => {
                        setActiveHotel(hotel.id);
                        setShowHotelSelector(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 p-3 rounded-2xl transition-all active-tap text-left",
                        activeHotel?.id === hotel.id ? "bg-violet/10 text-violet" : "hover:bg-gray-50 bg-gray-50/50"
                      )}
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: hotel.color }}
                      >
                        <Briefcase size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{hotel.name}</p>
                        <p className="text-[10px] opacity-60 truncate">{hotel.address}</p>
                      </div>
                      {activeHotel?.id === hotel.id && (
                        <div className="w-2 h-2 bg-violet rounded-full shadow-[0_0_8px_rgba(109,40,217,0.5)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔔 Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-[40px] h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-border/50">
                <h2 className="text-xl font-bold text-text-primary">Notifications</h2>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary active-tap"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <NotificationCenter />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Coup d'Œil Modal */}
      <AnimatePresence>
        {showCoupDeilModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCoupDeilModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md z-[101]"
            >
              <div className="bg-white rounded-[32px] border border-border/50 shadow-2xl p-6 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-violet/5 rounded-full -mr-24 -mt-24 blur-3xl" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-violet-light text-violet flex items-center justify-center shadow-inner">
                      <Eye size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">Coup d'Œil</h2>
                  </div>
                  <button 
                    onClick={() => setShowCoupDeilModal(false)}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary active-tap border border-border/30"
                  >
                    <ChevronRight size={20} className="rotate-90" />
                  </button>
                </div>

                {/* Ma Journée dans Coup d'œil */}
                <div className="relative z-10">
                  <h3 className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-2">Ma Journée</h3>
                  <MaJourneeBlock compact />
                </div>

                {/* Mini-KPIs */}
                <div className="grid grid-cols-2 gap-3 relative z-10">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-border/30 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-green-light text-green flex items-center justify-center">
                        <TrendingUp size={14} />
                      </div>
                      <span className="text-[8px] font-black text-green bg-green/10 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Commissions</p>
                      <p className="text-lg font-black text-text-primary">142,50 €</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-2xl border border-border/30 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-violet-light text-violet flex items-center justify-center">
                        <Star size={14} fill="currentColor" />
                      </div>
                      <span className="text-[8px] font-black text-violet bg-violet/10 px-2 py-0.5 rounded-full">Top 5</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Qualité</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-lg font-black text-text-primary">4.8</p>
                        <p className="text-[8px] text-text-secondary font-bold">/5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Shift */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-border/30 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-violet-light text-violet flex items-center justify-center">
                        <CalendarIcon size={14} />
                      </div>
                      <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Prochain Shift</h3>
                    </div>
                    <span className="text-[9px] font-black text-violet bg-violet-light px-2 py-0.5 rounded-full">Demain</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-base font-black text-text-primary">09:00 — 17:00</p>
                      <p className="text-[10px] text-text-secondary font-medium">{activeHotel?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-text-primary">Vendredi</p>
                      <p className="text-[10px] text-text-secondary">03 Avril</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowCoupDeilModal(false)}
                  className="w-full py-3 rounded-xl bg-violet text-white font-bold active-tap shadow-lg shadow-violet/20 relative z-10"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
