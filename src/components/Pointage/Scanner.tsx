import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, MapPin, Briefcase } from 'lucide-react';
import { useHotel } from '@/src/hooks/useHotel';

export const Scanner = () => {
  const { hotels, setActiveHotel, activeHotel } = useHotel();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('La géolocalisation est requise pour pointer.');
        }
      );
    }

    // Initialize scanner
    scannerRef.current = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scannerRef.current.render(
      (decodedText) => {
        const hotel = hotels.find(h => h.qr_code === decodedText);
        if (hotel) {
          setActiveHotel(hotel.id);
          setScanResult(hotel.name);
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
        } else {
          setError("QR Code non reconnu pour cet établissement.");
        }
      },
      (errorMessage) => {
        // console.log(errorMessage);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => console.error("Failed to clear scanner", error));
      }
    };
  }, [hotels, setActiveHotel]);

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
                Récupération de la position...
              </div>
            )}
            {location && (
              <div className="py-4 flex items-center justify-center gap-2 text-green text-xs font-medium">
                <MapPin size={14} /> Position validée
              </div>
            )}
            {error && (
              <div className="py-4 flex items-center justify-center gap-2 text-red-500 text-xs font-medium">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-text-secondary font-medium px-8">Scanner le QR code de l'hôtel pour enregistrer votre début ou fin de service.</p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-text-secondary uppercase tracking-widest font-bold">
              <Briefcase size={10} />
              Établissement actif: <span className="text-violet">{activeHotel?.name}</span>
            </div>
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface p-12 rounded-[32px] card-shadow flex flex-col items-center gap-6"
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: activeHotel?.color }}
          >
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-text-primary">Pointage réussi !</h3>
            <p className="text-text-secondary font-medium">{activeHotel?.name}</p>
            <p className="text-text-secondary text-sm">Début de service enregistré à {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <button 
            onClick={() => setScanResult(null)}
            className="mt-4 text-violet font-bold uppercase tracking-widest text-xs active-tap"
          >
            Nouveau scan
          </button>
        </motion.div>
      )}
    </div>
  );
};
