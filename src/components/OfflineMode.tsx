import React from 'react';
import { motion } from 'motion/react';
import { Wifi, WifiOff, Scan, LayoutGrid, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface OfflineModeProps {
  onDismiss: () => void;
}

export const OfflineMode = ({ onDismiss }: OfflineModeProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-background px-5 pt-3 pb-5 space-y-3 overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-0.5"
      >
        <h2 className="text-lg font-bold text-text-primary uppercase tracking-wider">Mode hors ligne</h2>
        <p className="text-[8px] text-text-secondary font-bold uppercase tracking-[0.1em] opacity-70">Pointe et travaille sans réseau</p>
      </motion.div>

      {/* Offline Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square w-full max-w-[110px] mx-auto flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-violet/5 rounded-full border-2 border-violet/10" />
        <div className="absolute inset-[15%] bg-violet/5 rounded-full border border-violet/10" />
        
        <div className="relative z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="relative">
              <Wifi size={40} className="text-violet opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <WifiOff size={24} className="text-violet" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 border-2 border-surface flex items-center justify-center text-white text-[7px] font-bold">
                X
              </div>
            </div>
            <div className="w-10 h-0.5 bg-violet/20 rounded-full blur-sm" />
          </motion.div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface p-3.5 rounded-[20px] border border-border/50 card-shadow space-y-1.5"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-light flex items-center justify-center text-violet shadow-sm shrink-0">
            <AlertTriangle size={16} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-text-primary leading-tight">Vous êtes hors ligne</h3>
          </div>
        </div>
        <p className="text-[9px] text-text-secondary leading-relaxed font-medium">
          Continuez à pointer et accomplir vos tâches, vos données seront synchronisées dès que vous serez reconnecté.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-2 pb-2">
        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/pointage?tab=scanner')}
          className="w-full bg-surface border border-border/50 py-3 rounded-[16px] font-bold text-xs shadow-sm active-tap flex items-center justify-center gap-2.5 text-text-primary"
        >
          <Scan size={18} className="text-violet" />
          Scanner un QR code
          <ChevronRight size={14} className="ml-auto opacity-30" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/housekeeping')}
          className="w-full bg-surface border border-border/50 py-3 rounded-[16px] font-bold text-xs shadow-sm active-tap flex items-center justify-center gap-2.5 text-text-primary"
        >
          <LayoutGrid size={18} className="text-violet" />
          Accéder aux tâches
          <ChevronRight size={14} className="ml-auto opacity-30" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onDismiss}
          className="w-full bg-violet text-white py-3.5 rounded-[16px] font-bold text-xs shadow-lg active-tap flex flex-col items-center justify-center leading-tight"
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <WifiOff size={14} />
            <span>Utiliser l'application</span>
          </div>
          <span className="text-[8px] opacity-80 font-medium">Même sans connexion internet !</span>
        </motion.button>
      </div>
    </div>
  );
};
