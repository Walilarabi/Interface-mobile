import React from 'react';
import { ChevronLeft, ExternalLink, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../hooks/useHotel';

export const Housekeeping = () => {
  const navigate = useNavigate();
  const { activeHotel } = useHotel();

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

      {/* Iframe Container */}
      <div className="flex-1 relative bg-white">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-green-light rounded-3xl flex items-center justify-center text-green">
            <ExternalLink size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-text-primary">Module Housekeeping</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Vous allez être redirigé vers l'interface de gestion des chambres existante.
            </p>
          </div>
          
          <button className="w-full bg-violet text-white py-4 rounded-2xl font-bold active-tap card-shadow max-w-xs">
            Ouvrir le module
          </button>
          
          <p className="text-[10px] text-text-secondary uppercase tracking-widest">
            Intégration sécurisée FLOWTYM
          </p>
        </div>
        
        {/* In a real app, this would be the iframe or a redirect */}
        {/* <iframe src="https://existing-housekeeping-module.com" className="w-full h-full border-none" title="Housekeeping" /> */}
      </div>
    </div>
  );
};
