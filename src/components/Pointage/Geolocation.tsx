import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CheckCircle2, ChevronRight, Map as MapIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface GeolocationProps {
  onConfirm: () => void;
}

export const Geolocation = ({ onConfirm }: GeolocationProps) => {
  return (
    <div className="h-full flex flex-col bg-background p-6 space-y-8 overflow-y-auto no-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wider">Géolocalisation</h2>
        <p className="text-xs text-text-secondary font-medium uppercase tracking-widest opacity-70">Vérifiez la présence sur site</p>
      </motion.div>

      {/* Map Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square w-full max-w-xs mx-auto"
      >
        {/* Geofence Circle */}
        <div className="absolute inset-0 bg-violet/10 rounded-full border-2 border-violet/30 animate-pulse" />
        <div className="absolute inset-[15%] bg-violet/5 rounded-full border border-violet/20" />
        
        {/* Map Background (Simulated) */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-surface shadow-2xl">
          <div className="w-full h-full bg-surface relative">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border border-text-secondary" />
              ))}
            </div>
            {/* Simulated Buildings */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-violet/10 rounded-xl rotate-12" />
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-green/10 rounded-xl -rotate-6" />
            
            {/* Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <MapPin size={40} className="text-green drop-shadow-lg" fill="currentColor" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-full blur-sm" />
              </motion.div>
            </div>

            {/* Hotel Label */}
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 bg-surface px-4 py-1.5 rounded-full shadow-lg border border-border/50">
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Hôtel Flowtym</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface p-6 rounded-[32px] border border-border/50 card-shadow space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-light flex items-center justify-center text-green shadow-sm">
            <CheckCircle2 size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-text-primary leading-tight">Vous devez vous pointer depuis l'hôtel Flowtym</h3>
          </div>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed font-medium">
          Merci de vous positionner dans la zone de géolocalisation autorisée avant de scanner un QR code.
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onConfirm}
        className="w-full bg-violet text-white py-5 rounded-[24px] font-bold text-lg shadow-lg active-tap flex items-center justify-center gap-3"
      >
        Ok, compris
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
};
