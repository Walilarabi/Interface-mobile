import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, MapPin, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../hooks/useHotel';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';

export const Housekeeping = () => {
  const navigate = useNavigate();
  const { activeHotel } = useHotel();
  const { token } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleOpenModule = () => {
    setIsRedirecting(true);
    // Simulate JWT transmission and redirection
    setTimeout(() => {
      const externalUrl = `https://housekeeping.flowtym.com?token=${token}&hotelId=${activeHotel?.id}`;
      window.open(externalUrl, '_blank');
      setIsRedirecting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between border-b border-border text-white transition-colors duration-500 bg-violet"
      >
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="active-tap">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Housekeeping</h2>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-md">
          <MapPin size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{activeHotel?.name}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 relative bg-white flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {!isRedirecting ? (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md text-center space-y-8"
            >
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-green/20 rounded-[32px] animate-pulse" />
                <div className="relative w-24 h-24 bg-green-light rounded-[32px] flex items-center justify-center text-green shadow-inner">
                  <ExternalLink size={40} />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-text-primary tracking-tight">Module Housekeeping</h3>
                <p className="text-text-secondary text-sm leading-relaxed px-4">
                  Vous allez être redirigé vers l'interface de gestion des chambres. Votre session est sécurisée par <span className="font-bold text-violet">FLOWTYM Auth</span>.
                </p>
              </div>

              <div className="bg-background rounded-3xl p-6 border border-border/50 flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-violet/10 flex items-center justify-center text-violet shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Sécurité</p>
                  <p className="text-xs font-medium text-text-primary">Transmission automatique de votre jeton d'accès (JWT)</p>
                </div>
              </div>
              
              <button 
                onClick={handleOpenModule}
                className="w-full bg-violet text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs active-tap shadow-xl shadow-violet/20 flex items-center justify-center gap-3"
              >
                Ouvrir le module <ExternalLink size={18} />
              </button>
              
              <div className="flex items-center justify-center gap-2 opacity-40">
                <Lock size={12} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Connexion chiffrée de bout en bout</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 border-4 border-violet border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                <p className="text-sm font-black text-text-primary uppercase tracking-widest">Préparation de la session...</p>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em]">Génération du jeton sécurisé</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
