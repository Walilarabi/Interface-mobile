import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/src/hooks/useAuth';
import { Clock, Briefcase, Trophy, ChevronRight, Bell, MapPin, ConciergeBell, MessageSquare, TrendingUp, Target, Award, User, Star, Calendar as CalendarIcon, Eye, QrCode, X, Pause, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useHotel } from '@/src/hooks/useHotel';
import { NotificationCenter } from '@/src/components/Profile/NotificationCenter';
import { useStaff } from '@/src/hooks/useStaff';
import { useComments } from '@/src/hooks/useComments';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { activeHotel, hotels, setActiveHotel } = useHotel();
  const [showHotelSelector, setShowHotelSelector] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCoupDeilModal, setShowCoupDeilModal] = useState(false);
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [showMaJournee, setShowMaJournee] = useState(true);

  // Functional logic integration
  const { getScore, getNotifications, loading: staffLoading } = useStaff(user?.id || '');
  const { score: satisfactionScore, loading: commentsLoading } = useComments();
  const [userScore, setUserScore] = useState<any>(null);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const loadDashboardData = async () => {
    try {
      const [scoreData, notificationsData] = await Promise.all([
        getScore(),
        getNotifications(true)
      ]);
      setUserScore(scoreData);
      setUnreadNotificationsCount(notificationsData?.length || 0);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isOnDuty) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const now = Date.now();
        const diff = now - startTime;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setElapsedTime(
          `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setElapsedTime('00:00:00');
    }
    return () => clearInterval(interval);
  }, [isOnDuty]);
  
  const MaJourneeBlock = ({ compact = false }: { compact?: boolean }) => (
    <div className={cn("bg-white rounded-[24px] shadow-sm border border-border/30 p-4 space-y-3", compact && "p-3")}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
          <p className="text-xs font-bold text-text-primary">08:00 — Folkestone Opera (5 rooms)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00BFA5]" />
          <p className="text-xs font-bold text-text-primary">14:00 — Central Hotel (10 rooms)</p>
        </div>
      </div>
    </div>
  );

  const isManager = ['admin', 'manager', 'director', 'responsable'].includes(user?.role || '');

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden pb-20">
      {/* 🔝 1. Header (Compact & Logo-Matched) */}
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
              <span className="text-[9px] font-bold tracking-wide truncate">{activeHotel?.name || t('common.loading')}</span>
              <ChevronRight size={9} className="shrink-0 opacity-50" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(true)}
              className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 active-tap relative"
            >
              <Bell size={16} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-violet" />
              )}
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
          <h2 className="text-base font-bold tracking-tight leading-none">{t('dashboard.welcome')} {user?.first_name},</h2>
          <p className="text-white/70 text-[9px] font-medium">{t('dashboard.ready_for_day')}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 -mt-3 space-y-3 flex-1 overflow-y-auto no-scrollbar relative z-20 pb-4">
        
        {/* ⚡ 2. Action principale (Pointage) - Ultra Compact & Single Line */}
        {!isOnDuty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Link 
              to="/pointage" 
              className="block bg-linear-to-r from-violet to-green p-2.5 rounded-[18px] shadow-lg relative overflow-hidden active-tap group border border-white/10"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-10 -mt-10 blur-2xl"
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center border border-white/30 shadow-xl">
                  <QrCode size={16} className="text-white" />
                </div>
                <div className="flex-1 text-white">
                  <h3 className="text-[11px] font-black leading-none tracking-tight whitespace-nowrap">{t('dashboard.clock_now')}</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-full border border-white/10">
                  <span className="text-[7px] font-black uppercase tracking-widest">{t('dashboard.scanner')}</span>
                  <ChevronRight size={10} className="text-white opacity-60" />
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-2 rounded-[18px] shadow-md border border-green/20 flex items-center justify-between relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-green/10 flex items-center justify-center text-green relative">
                <Clock size={14} />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-green rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <p className="text-[6px] font-black text-green uppercase tracking-widest">{t('common.online')}</p>
                <p className="text-sm font-black text-text-primary font-mono tracking-tighter">{elapsedTime}</p>
              </div>
            </div>
            <div className="flex gap-1 relative z-10">
              <button className="w-7 h-7 rounded-lg bg-gray-50 border border-border/50 flex items-center justify-center text-text-secondary active-tap">
                <Pause size={10} />
              </button>
              <button 
                onClick={() => setIsOnDuty(false)}
                className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center active-tap"
              >
                <Square size={8} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}

        {/* 📅 3. Bloc intelligent (Ma journée) - Compact */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{t('dashboard.my_day')}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-violet/10 px-2 py-0.5 rounded-full">
                <div className="w-1 h-1 bg-violet rounded-full animate-pulse" />
                <span className="text-[8px] font-bold text-violet">{t('performance.top_performer')}</span>
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
                <MaJourneeBlock compact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🧩 4. Modules métiers - Compact Grid */}
        <div className="space-y-1.5">
          <h3 className="text-[9px] font-black text-text-secondary px-2 uppercase tracking-widest">{t('dashboard.business_modules')}</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'housekeeping', label: t('navigation.housekeeping'), sub: t('dashboard.assigned_rooms'), icon: Briefcase, color: 'bg-green-50 text-green', path: '/housekeeping', soon: false },
              { id: 'chat', label: t('dashboard.chat'), sub: 'Messages', icon: MessageSquare, color: 'bg-violet-50 text-violet', path: '/chat', soon: false },
              { id: 'performance', label: t('performance.title'), sub: t('performance.objectives'), icon: Trophy, color: 'bg-violet-50 text-violet', path: '/performance', soon: false },
              { id: 'commissions', label: t('dashboard.commissions'), sub: t('performance.bonus'), icon: TrendingUp, color: 'bg-teal-50 text-teal-600', path: '/commissions', soon: false },
            ].map((module) => (
              <Link 
                key={module.id}
                to={module.path || '#'}
                className={cn(
                  "bg-white p-2.5 rounded-[20px] shadow-sm border border-border/30 flex flex-col gap-1.5 active-tap relative group overflow-hidden"
                )}
              >
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", module.color)}>
                  <module.icon size={14} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-[10px] text-text-primary leading-none">{module.label}</h3>
                  <p className="text-[8px] text-text-secondary font-medium mt-0.5">{module.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 📊 5. Performance & Suivi (Manager Only) */}
        {isManager ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{t('dashboard.performance_tracking')}</h3>
              <span className="text-[8px] font-bold text-text-secondary">{t('dashboard.manager_view')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'admin', label: 'Admin', sub: t('dashboard.staff'), icon: Target, color: 'bg-slate-50 text-slate-600', path: '/admin-dashboard' },
                { id: 'rewards', label: t('performance.bonus'), sub: t('dashboard.rewards'), icon: Award, color: 'bg-orange-50 text-orange-500', path: '/rewards' },
              ].map((module) => (
                <Link 
                  key={module.id}
                  to={module.path || '#'}
                  className="bg-white p-2.5 rounded-[20px] shadow-sm border border-border/30 flex flex-col gap-1.5 active-tap"
                >
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", module.color)}>
                    <module.icon size={14} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[10px] text-text-primary leading-none">{module.label}</h3>
                    <p className="text-[8px] text-text-secondary font-medium mt-0.5">{module.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{t('dashboard.my_objectives')}</h3>
              <span className="text-[8px] font-bold text-text-secondary">{t('dashboard.top_performer_day')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'rewards', label: t('performance.bonus'), sub: t('dashboard.rewards'), icon: Award, color: 'bg-orange-50 text-orange-500', path: '/rewards' },
                { id: 'performance_perso', label: t('performance.quality'), sub: t('performance.my_score'), icon: Star, color: 'bg-yellow-50 text-yellow-600', path: '/performance' },
              ].map((module) => (
                <Link 
                  key={module.id}
                  to={module.path || '#'}
                  className="bg-white p-2.5 rounded-[20px] shadow-sm border border-border/30 flex flex-col gap-1.5 active-tap"
                >
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", module.color)}>
                    <module.icon size={14} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[10px] text-text-primary leading-none">{module.label}</h3>
                    <p className="text-[8px] text-text-secondary font-medium mt-0.5">{module.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coup d'Œil Button */}
        <button 
          onClick={() => setShowCoupDeilModal(true)}
          className="w-full bg-white border border-border/50 p-3 rounded-[20px] flex items-center justify-center gap-2 text-text-secondary active-tap hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Eye size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{t('dashboard.view_glance')}</span>
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
                    <h2 className="text-xl font-bold text-text-primary">{t('profile.personal_info')}</h2>
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
                <h2 className="text-xl font-bold text-text-primary">{t('notifications.title')}</h2>
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
                    <h2 className="text-xl font-bold text-text-primary">{t('dashboard.glance_title')}</h2>
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
                  <h3 className="text-[8px] font-black text-text-secondary uppercase tracking-widest mb-2">{t('dashboard.my_day')}</h3>
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
                      <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{t('dashboard.commissions')}</p>
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
                      <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{t('dashboard.quality')}</p>
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
                      <h3 className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{t('dashboard.next_shift')}</h3>
                    </div>
                    <span className="text-[9px] font-black text-violet bg-violet-light px-2 py-0.5 rounded-full">{t('dashboard.tomorrow')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-base font-black text-text-primary">09:00 — 17:00</p>
                      <p className="text-[10px] text-text-secondary font-medium">{activeHotel?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-text-primary">{t('common.confirm')}</p>
                      <p className="text-[10px] text-text-secondary">03 Avril</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowCoupDeilModal(false)}
                  className="w-full py-3 rounded-xl bg-violet text-white font-bold active-tap shadow-lg shadow-violet/20 relative z-10"
                >
                  {t('dashboard.close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
