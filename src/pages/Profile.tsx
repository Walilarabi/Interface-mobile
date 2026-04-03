import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, FileText, ShieldCheck, LogOut, ChevronRight, Settings as SettingsIcon, Globe, Bell, ChevronLeft, Palette, Lock, Shield } from 'lucide-react';
import { useAuth } from '@/src/hooks/useAuth';
import { cn } from '@/src/lib/utils';
import { CoffreFort } from '@/src/components/Profile/CoffreFort';
import { SignaturePad } from '@/src/components/Profile/SignaturePad';
import { NotificationCenter } from '@/src/components/Profile/NotificationCenter';
import { Settings } from '@/src/components/Profile/Settings';
import { SecurityPolicy } from '@/src/components/Profile/SecurityPolicy';

import { ThemeSelector } from '@/src/components/Profile/ThemeSelector';
import { LanguageSelector } from '@/src/components/Profile/LanguageSelector';
import { PasswordChange } from '@/src/components/Profile/PasswordChange';
import { useTranslation } from '@/src/hooks/useTranslation';

type ProfileView = 'menu' | 'coffre' | 'signature' | 'notifications' | 'settings' | 'security' | 'mon-profil' | 'theme' | 'langue' | 'password';

export const Profile = () => {
  const { user, logout } = useAuth();
  const { t, language } = useTranslation();
  const [view, setView] = useState<ProfileView>('menu');

  const menuItems = [
    { id: 'mon-profil', icon: User, label: t('profile.personal_info'), color: 'bg-blue-50 text-blue-600', comingSoon: true },
    { id: 'theme', icon: Palette, label: t('profile.theme'), color: 'bg-teal-50 text-teal-600', rightElement: <div className="w-5 h-5 rounded-full bg-teal-600" /> },
    { id: 'langue', icon: Globe, label: t('profile.language'), color: 'bg-indigo-50 text-indigo-600', rightElement: <span className="text-[10px] font-bold text-text-secondary uppercase">{language === 'fr' ? 'FR Français' : 'EN English'}</span> },
    { id: 'password', icon: Lock, label: t('profile.password'), color: 'bg-orange-50 text-orange-600' },
    { id: 'settings', icon: SettingsIcon, label: t('profile.settings'), color: 'bg-slate-50 text-slate-600' },
    { id: 'security', icon: Shield, label: t('profile.security'), color: 'bg-green-50 text-green-600' },
  ];

  const renderContent = () => {
    switch (view) {
      case 'coffre': return <CoffreFort onSign={() => setView('signature')} />;
      case 'signature': return <SignaturePad onSave={() => setView('coffre')} onCancel={() => setView('coffre')} />;
      case 'notifications': return <NotificationCenter />;
      case 'settings': return <Settings />;
      case 'security': return <SecurityPolicy />;
      case 'theme': return <ThemeSelector />;
      case 'langue': return <LanguageSelector />;
      case 'password': return <PasswordChange />;
      default: return (
        <div className="space-y-6">
          {/* Main Actions - Coffre-fort remains as a primary entry point or we can add it to the list */}
          <div className="bg-surface rounded-[24px] card-shadow p-4 mb-4 border border-border/50">
            <button 
              onClick={() => setView('coffre')}
              className="w-full flex items-center justify-between active-tap"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-text-primary text-sm">{t('profile.documents')}</p>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{t('profile.signature')}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-text-secondary" />
            </button>
          </div>

          {/* Menu List */}
          <div className="bg-surface rounded-[24px] card-shadow overflow-hidden divide-y divide-border border border-border/50">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                disabled={item.comingSoon}
                onClick={() => setView(item.id as ProfileView)}
                className={cn(
                  "w-full px-5 py-4 flex items-center justify-between active-tap bg-surface transition-colors",
                  item.comingSoon ? "opacity-60 grayscale cursor-not-allowed" : "hover:bg-background"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center`}>
                    <item.icon size={18} />
                  </div>
                  <p className="font-bold text-text-primary text-sm">{item.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.comingSoon && (
                    <span className="text-[8px] font-bold uppercase tracking-widest bg-violet-light text-violet px-2 py-1 rounded-full">
                      {t('profile.soon')}
                    </span>
                  )}
                  {item.rightElement}
                  <ChevronRight size={16} className="text-text-secondary" />
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={logout}
              className="w-full bg-red-50 text-red-600 py-4 rounded-[24px] font-bold flex items-center justify-center gap-3 active-tap border border-red-100"
            >
              <LogOut size={20} /> 
              <span className="text-sm">{t('profile.logout')}</span>
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="pb-24 h-full bg-background overflow-y-auto no-scrollbar">
      {/* Compact Profile Header */}
      <div className="bg-white px-6 pt-8 pb-10 rounded-b-[40px] relative overflow-hidden shadow-sm border-b border-border/30">
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6">
          {view !== 'menu' ? (
            <button 
              onClick={() => setView('menu')}
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border/50 active-tap z-30"
            >
              <ChevronLeft size={20} className="text-text-primary" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}
          
          <div className="flex-1 text-center">
            {view !== 'menu' && (
              <h1 className="text-sm font-bold text-text-primary uppercase tracking-widest">
                {view === 'coffre' && t('profile.documents')}
                {view === 'signature' && t('profile.signature')}
                {view === 'notifications' && t('notifications.title')}
                {view === 'settings' && t('profile.settings')}
                {view === 'security' && t('profile.security')}
                {view === 'theme' && t('profile.theme')}
                {view === 'langue' && t('profile.language')}
                {view === 'password' && t('profile.password')}
              </h1>
            )}
          </div>
          
          <div className="w-10 h-10" />
        </div>

        <AnimatePresence mode="wait">
          {view === 'menu' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-5 relative z-10"
            >
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                {user?.profile_photo ? (
                  <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-xl font-bold text-text-primary leading-tight">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-xs text-text-secondary font-medium lowercase opacity-70">
                  {user?.email || 'julie@grandhotelparis.fr'}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full border border-orange-100 mt-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                    {user?.role?.replace('_', ' ') || 'Femme de chambre'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
