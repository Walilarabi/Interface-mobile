import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, MapPin, Briefcase, Clock } from 'lucide-react';
import { useHotel } from '@/src/hooks/useHotel';
import { useStaff } from '@/src/hooks/useStaff';
import { useAuth } from '@/src/hooks/useAuth';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Scanner = () => {
  const { hotels, setActiveHotel, activeHotel } = useHotel();
  const { user } = useAuth();
  const { t } = useTranslation();
  const { startPointage, endPointage, loading } = useStaff(user?.id || '');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanTime, setScanTime] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error('Geolocation error:', err);
          if (err.code === 1) {
            setError(t('errors.unauthorized'));
          } else {
            setError(t('errors.network'));
          }
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setError('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  };

  const handleScanSuccess = async (decodedText: string) => {
    const hotel = hotels.find(h => h.qr_code === decodedText);
    if (hotel) {
      // Check proximity
      if (location && hotel.latitude && hotel.longitude) {
        const distance = calculateDistance(
          location.lat, 
          location.lng, 
          hotel.latitude, 
          hotel.longitude
        );

        // Allow scan if within 200 meters
        if (distance <= 200) {
          try {
            // Call API for pointage
            await startPointage(decodedText, location);
            
            setActiveHotel(hotel.id);
            setScanResult(hotel.name);
            setScanTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            if (scannerRef.current) {
              scannerRef.current.clear();
            }
          } catch (err) {
            setError(t('errors.server'));
          }
        } else {
          setError(t('errors.validation'));
        }
      } else if (!location) {
        setError(t('common.loading'));
      } else {
        // If hotel has no coordinates, allow for demo but warn
        try {
          await startPointage(decodedText, location);
          setActiveHotel(hotel.id);
          setScanResult(hotel.name);
          setScanTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
        } catch (err) {
          setError(t('errors.server'));
        }
      }
    } else {
      setError(t('errors.not_found'));
    }
  };

  useEffect(() => {
    requestLocation();

    // Initialize scanner
    scannerRef.current = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scannerRef.current.render(
      (decodedText) => handleScanSuccess(decodedText),
      (errorMessage) => {
        // console.log(errorMessage);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => console.error("Failed to clear scanner", error));
      }
    };
  }, [hotels, setActiveHotel, location]);

  return (
    <div className="space-y-8 text-center px-4">
      {!scanResult ? (
        <>
          <div className="bg-surface p-4 rounded-[32px] card-shadow overflow-hidden border-2 border-dashed border-violet/20">
            <div id="reader" className="w-full"></div>
            {!location && !error && (
              <div className="py-4 flex items-center justify-center gap-2 text-text-secondary text-xs">
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 bg-violet rounded-full"
                />
                {t('common.loading')}
              </div>
            )}
            {location && (
              <div className="py-4 flex items-center justify-center gap-2 text-green text-xs font-medium">
                <MapPin size={14} /> {t('common.done')}
              </div>
            )}
            {error && (
              <div className="py-4 flex flex-col items-center justify-center gap-2 px-4">
                <div className="flex items-center gap-2 text-red-500 text-xs font-medium">
                  <AlertCircle size={14} /> {error}
                </div>
                <button
                  onClick={requestLocation}
                  className="mt-2 text-[10px] text-violet font-bold uppercase tracking-widest active-tap border border-violet/20 px-3 py-1.5 rounded-lg"
                >
                  {t('common.retry')}
                </button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-text-secondary font-medium px-8">{t('pointage.scan_to_clock')}</p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-text-secondary uppercase tracking-widest font-bold">
              <Briefcase size={10} />
              {t('profile.service')}: <span className="text-violet">{activeHotel?.name}</span>
            </div>
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px] px-2"
        >
          {/* Animated Success Ring */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="w-24 h-24 rounded-full flex items-center justify-center text-white shadow-2xl relative z-10 bg-violet"
            >
              <CheckCircle2 size={56} />
            </motion.div>
            
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-green/20"
            />
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-green/10"
            />
          </div>

          {/* Detailed Confirmation Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-surface p-8 rounded-[32px] card-shadow border border-border/50 space-y-6 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <div className="space-y-1 relative z-10">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] font-bold text-green uppercase tracking-[0.3em]"
              >
                {t('common.done')}
              </motion.p>
              <h3 className="text-2xl font-black text-text-primary leading-tight">
                Bon service !
              </h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-light flex items-center justify-center text-violet shadow-sm">
                    <Briefcase size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('profile.service')}</p>
                    <p className="text-sm font-bold text-text-primary">{activeHotel?.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-light flex items-center justify-center text-violet shadow-sm">
                    <Clock size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{t('rh.expected_arrival')}</p>
                    <p className="text-sm font-bold text-text-primary">{scanTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-[10px] text-text-secondary font-medium italic">
                {t('common.done')}
              </p>
            </motion.div>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              setScanResult(null);
              setScanTime(null);
            }}
            className="mt-8 px-8 py-3 bg-background border border-border/50 rounded-full text-violet font-bold uppercase tracking-widest text-[10px] active-tap shadow-sm"
          >
            {t('pointage.scanner')}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
