import React from 'react';
import { motion } from 'motion/react';
import { Wifi, WifiOff, QrCode, LayoutGrid, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface OfflineModeProps {
  onDismiss: () => void;
}

export const OfflineMode = ({ onDismiss }: OfflineModeProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-background p-6 space-y-8 overflow-y-auto no-scrollbar">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wider">Mode hors ligne</h2>
        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em] opacity-70">Pointe et travaille sans réseau</p>
      </motion.div>

      {/* Offline Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square w-full max-w-xs mx-auto flex items-center justify-center"
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
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <Wifi size={80} className="text-violet opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <WifiOff size={48} className="text-violet" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 border-4 border-surface flex items-center justify-center text-white text-xs font-bold">
                X
              </div>
            </div>
            <div className="w-24 h-1.5 bg-violet/20 rounded-full blur-sm" />
          </motion.div>
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
          <div className="w-12 h-12 rounded-2xl bg-violet-light flex items-center justify-center text-violet shadow-sm">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-text-primary leading-tight">Vous êtes hors ligne</h3>
          </div>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed font-medium">
          Continuez à pointer et accomplir vos tâches, vos données seront synchronisées dès que vous serez reconnecté.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/pointage?tab=scanner')}
          className="w-full bg-surface border border-border/50 py-5 rounded-[24px] font-bold text-lg shadow-sm active-tap flex items-center justify-center gap-3 text-text-primary"
        >
          <QrCode size={24} className="text-violet" />
          Scanner un QR code
          <ChevronRight size={20} className="ml-auto opacity-30" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/housekeeping')}
          className="w-full bg-surface border border-border/50 py-5 rounded-[24px] font-bold text-lg shadow-sm active-tap flex items-center justify-center gap-3 text-text-primary"
        >
          <LayoutGrid size={24} className="text-violet" />
          Accéder aux tâches
          <ChevronRight size={20} className="ml-auto opacity-30" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onDismiss}
          className="w-full bg-violet text-white py-5 rounded-[24px] font-bold text-lg shadow-lg active-tap flex items-center justify-center gap-3"
        >
          <WifiOff size={20} />
          Utiliser l'application même sans connexion internet !
        </motion.button>
      </div>
    </div>
  );
};
