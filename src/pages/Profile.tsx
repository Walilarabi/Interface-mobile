import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, FileText, ShieldCheck, LogOut, ChevronRight, Settings as SettingsIcon, Globe, Bell, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/src/hooks/useAuth';
import { CoffreFort } from '@/src/components/Profile/CoffreFort';
import { SignaturePad } from '@/src/components/Profile/SignaturePad';
import { NotificationCenter } from '@/src/components/Profile/NotificationCenter';
import { Settings } from '@/src/components/Profile/Settings';

type ProfileView = 'menu' | 'coffre' | 'signature' | 'notifications' | 'settings';

export const Profile = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState<ProfileView>('menu');

  const mainActions = [
    { id: 'coffre', icon: FileText, label: 'Coffre-fort', sub: 'Documents RH', color: 'bg-blue-50 text-blue-600', emoji: '📁' },
    { id: 'signature', icon: ShieldCheck, label: 'Signatures', sub: 'À valider', color: 'bg-green-50 text-green-600', emoji: '✍️' },
  ];

  const secondaryActions = [
    { id: 'notifications', icon: Bell, label: 'Notifications', sub: 'Centre d\'alertes', color: 'bg-orange-50 text-orange-600' },
    { id: 'settings', icon: SettingsIcon, label: 'Paramètres', sub: 'Langue & Compte', color: 'bg-violet-50 text-violet-600' },
  ];

  const renderContent = () => {
    switch (view) {
      case 'coffre': return <CoffreFort onSign={() => setView('signature')} />;
      case 'signature': return <SignaturePad onSave={() => setView('coffre')} onCancel={() => setView('coffre')} />;
      case 'notifications': return <NotificationCenter />;
      case 'settings': return <Settings />;
      default: return (
        <div className="space-y-5">
          {/* Main Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            {mainActions.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setView(item.id as ProfileView)}
                className="bg-surface p-3 rounded-[24px] card-shadow flex flex-col items-center text-center gap-2 active-tap border border-border/50"
              >
                <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center shadow-sm text-lg`}>
                  {item.emoji}
                </div>
                <div>
                  <p className="font-bold text-text-primary text-xs">{item.label}</p>
                  <p className="text-[8px] text-text-secondary font-bold uppercase tracking-wider">{item.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Secondary Actions List */}
          <div className="bg-surface rounded-[24px] card-shadow overflow-hidden divide-y divide-border">
            {secondaryActions.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setView(item.id as ProfileView)}
                className="w-full px-5 py-3 flex items-center justify-between active-tap bg-surface hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                    <item.icon size={16} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-text-primary text-xs">{item.label}</p>
                    <p className="text-[9px] text-text-secondary">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-text-secondary" />
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button 
              onClick={logout}
              className="w-full bg-red-50 text-red-600 py-4 rounded-[24px] font-bold flex items-center justify-center gap-2 active-tap border border-red-100"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="pb-24 h-full bg-background overflow-y-auto no-scrollbar">
      {/* Compact Profile Header */}
      <div className="bg-violet text-white px-6 pt-4 pb-10 rounded-b-[40px] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-4">
          {view !== 'menu' ? (
            <button 
              onClick={() => setView('menu')}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md active-tap z-30"
            >
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}
          
          <div className="flex-1" />
          
          <div className="w-10 h-10" />
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-[24px] bg-violet-light border-2 border-white/20 flex items-center justify-center text-violet overflow-hidden shadow-lg">
            {user?.profile_photo ? (
              <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={32} />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold leading-tight">{user?.first_name} {user?.last_name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-violet-light text-[10px] font-bold uppercase tracking-widest opacity-90">
                {user?.role?.replace('_', ' ')}
              </p>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span className="text-violet-light text-[10px] font-bold uppercase tracking-widest opacity-90">LuxuryForrest Paris</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 -mt-5 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {view === 'menu' && (
        <div className="mt-6 text-center">
          <p className="text-[8px] text-text-secondary uppercase tracking-[0.4em] font-bold opacity-30">Flowtym v2.4.0</p>
        </div>
      )}
    </div>
  );
};
