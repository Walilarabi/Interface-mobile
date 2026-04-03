import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, CheckCircle2, ChevronRight, XCircle, Loader2, Navigation } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useHotel } from '@/src/hooks/useHotel';
import { useTranslation } from '@/src/hooks/useTranslation';

interface GeolocationProps {
  onConfirm: () => void;
}

export const Geolocation = ({ onConfirm }: GeolocationProps) => {
  const { activeHotel } = useHotel();
  const { t } = useTranslation();
  const [status, setStatus] = useState<'detecting' | 'success' | 'error'>('detecting');
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isOnSite, setIsOnSite] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setUserLocation(t('errors.network'));
      return;
    }

    setStatus('detecting');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (activeHotel?.latitude && activeHotel?.longitude) {
          const R = 6371e3; // meters
          const φ1 = latitude * Math.PI / 180;
          const φ2 = activeHotel.latitude * Math.PI / 180;
          const Δφ = (activeHotel.latitude - latitude) * Math.PI / 180;
          const Δλ = (activeHotel.longitude - longitude) * Math.PI / 180;
          const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;

          if (distance <= 200) {
            setIsOnSite(true);
            setUserLocation(activeHotel.address);
            setStatus('success');
          } else {
            setIsOnSite(false);
            setUserLocation(`Position détectée (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
            setStatus('error');
          }
        } else {
          setStatus('error');
          setUserLocation(t('errors.not_found'));
        }
      },
      (err) => {
        console.error(err);
        setStatus('error');
        if (err.code === 1) {
          setUserLocation(t('errors.unauthorized'));
        } else {
          setUserLocation(t('errors.network'));
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    // Try automatic request on mount
    requestLocation();
  }, [activeHotel]);

  return (
    <div className="h-full flex flex-col bg-background p-4 space-y-4 overflow-y-auto no-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1"
      >
        <h2 className="text-xl font-bold text-text-primary uppercase tracking-wider">{t('pointage.geolocation')}</h2>
        <p className="text-[10px] text-text-secondary font-medium uppercase tracking-widest opacity-70">{t('pointage.check_presence')}</p>
      </motion.div>

      {/* Map Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square w-full max-w-[180px] mx-auto"
      >
        {/* Geofence Circle */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 transition-colors duration-500",
          status === 'detecting' ? "bg-violet/10 border-violet/30 animate-pulse" :
          status === 'success' ? "bg-green/10 border-green/30" : "bg-red-500/10 border-red-500/30"
        )} />
        <div className={cn(
          "absolute inset-[15%] rounded-full border transition-colors duration-500",
          status === 'detecting' ? "bg-violet/5 border-violet/20" :
          status === 'success' ? "bg-green/5 border-green/20" : "bg-red-500/5 border-red-500/20"
        )} />
        
        {/* Map Background (Simulated) */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-surface shadow-xl">
          <div className="w-full h-full bg-surface relative">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-text-secondary" />
              ))}
            </div>
            
            {/* Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div 
                animate={status === 'detecting' ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <MapPin 
                  size={32} 
                  className={cn(
                    "drop-shadow-lg transition-colors duration-500",
                    status === 'detecting' ? "text-violet" :
                    status === 'success' ? "text-green" : "text-red-500"
                  )} 
                  fill="currentColor" 
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/20 rounded-full blur-sm" />
              </motion.div>
            </div>

            {/* Hotel Label */}
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded-full shadow-md border border-border/50">
              <p className="text-[8px] font-bold text-text-primary uppercase tracking-widest whitespace-nowrap">
                {activeHotel?.name || 'Hôtel'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Location Details */}
      <div className="space-y-2">
        {/* Hotel Address */}
        <div className="bg-surface p-3 rounded-2xl border border-border/50 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-light flex items-center justify-center text-violet shrink-0">
            <MapPin size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('profile.service')}</p>
            <p className="text-[10px] font-bold text-text-primary truncate">{activeHotel?.address}</p>
          </div>
        </div>

        {/* User Address */}
        <div className={cn(
          "p-3 rounded-2xl border flex items-start gap-3 transition-colors",
          status === 'detecting' ? "bg-surface border-border/50" :
          status === 'success' ? "bg-green-light border-green/20" : "bg-red-50 border-red-200"
        )}>
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            status === 'detecting' ? "bg-violet-light text-violet" :
            status === 'success' ? "bg-white text-green shadow-sm" : "bg-white text-red-500 shadow-sm"
          )}>
            {status === 'detecting' ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('pointage.your_position')}</p>
            <p className={cn(
              "text-[10px] font-bold truncate",
              status === 'detecting' ? "text-text-primary opacity-50 italic" : "text-text-primary"
            )}>
              {status === 'detecting' ? t('common.loading') : userLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          "p-4 rounded-[24px] border card-shadow space-y-3 transition-colors",
          status === 'detecting' ? "bg-surface border-border/50" :
          status === 'success' ? "bg-green-light border-green/20" : "bg-red-50 border-red-200"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0",
            status === 'detecting' ? "bg-violet-light text-violet" :
            status === 'success' ? "bg-white text-green" : "bg-white text-red-500"
          )}>
            {status === 'detecting' ? <Loader2 size={20} className="animate-spin" /> : 
             status === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-text-primary leading-tight">
              {status === 'detecting' ? t('common.loading') :
               status === 'success' ? t('common.done') : t('errors.unauthorized')}
            </h3>
          </div>
        </div>
        <p className="text-[10px] text-text-secondary leading-relaxed font-medium">
          {status === 'detecting' ? t('common.loading') :
           status === 'success' ? t('common.done') :
           t('errors.validation')}
        </p>
      </motion.div>

      {/* Action Button */}
      <div className="space-y-3">
        {status !== 'success' && (
          <button
            onClick={requestLocation}
            className="w-full py-3 rounded-xl border-2 border-violet text-violet font-bold text-xs uppercase tracking-widest active-tap flex items-center justify-center gap-2"
          >
            <Navigation size={14} />
            {status === 'detecting' ? t('common.retry') : t('common.retry')}
          </button>
        )}
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          disabled={status !== 'success'}
          onClick={onConfirm}
          className={cn(
            "w-full py-4 rounded-[20px] font-bold text-base shadow-lg active-tap flex items-center justify-center gap-2 transition-all",
            status === 'success' ? "bg-violet text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          {status === 'detecting' ? t('common.loading') : t('common.confirm')}
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Demo Simulation Section */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <p className="text-[9px] text-text-secondary text-center uppercase tracking-widest font-bold">Mode Démo / Test</p>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => {
              setStatus('detecting');
              setTimeout(() => {
                setIsOnSite(true);
                setUserLocation(activeHotel?.address || 'Adresse de l\'hôtel detectée');
                setStatus('success');
              }, 800);
            }}
            className="py-2 bg-green/10 text-green rounded-lg text-[9px] font-bold uppercase tracking-wider active-tap border border-green/20"
          >
            Simuler : Sur place
          </button>
          <button 
            onClick={() => {
              setStatus('detecting');
              setTimeout(() => {
                setIsOnSite(false);
                setUserLocation('15 Rue de Rivoli, 75004 Paris');
                setStatus('error');
              }, 800);
            }}
            className="py-2 bg-red-500/10 text-red-500 rounded-lg text-[9px] font-bold uppercase tracking-wider active-tap border border-red-500/20"
          >
            Simuler : Hors zone
          </button>
        </div>
      </div>
    </div>
  );
};
