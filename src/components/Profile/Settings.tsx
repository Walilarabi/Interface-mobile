import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Bell, Shield, Smartphone, ChevronRight, Check, Camera, Upload, User as UserIcon, ConciergeBell, Coffee, Wrench, Briefcase } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/hooks/useAuth';

export const Settings = () => {
  const { user, updateUser } = useAuth();
  const [language, setLanguage] = useState('fr');
  const [notifications, setNotifications] = useState(true);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['reception']);

  // Shift logic: 09:00 - 17:00
  const now = new Date();
  const currentHour = now.getHours();
  const isOnShift = currentHour >= 9 && currentHour < 17;

  React.useEffect(() => {
    if (isOnShift) {
      setNotifications(true);
    }
  }, [isOnShift]);

  const toggleChannel = (id: string) => {
    setSelectedChannels(prev => {
      if (prev.includes(id)) {
        return prev.filter(c => c !== id);
      }
      return [...prev, id];
    });
  };

  const channels = [
    { 
      id: 'reception', 
      label: 'Réception', 
      icon: ConciergeBell, 
      color: 'text-blue-500', 
      bg: 'bg-blue-50',
      disabledBy: ['breakfast', 'maintenance', 'housekeeping']
    },
    { 
      id: 'breakfast', 
      label: 'Petit Déjeuner', 
      icon: Coffee, 
      color: 'text-orange-500', 
      bg: 'bg-orange-50',
      disabledBy: ['reception', 'maintenance']
    },
    { 
      id: 'maintenance', 
      label: 'Maintenance', 
      icon: Wrench, 
      color: 'text-red-500', 
      bg: 'bg-red-50',
      disabledBy: ['reception', 'breakfast']
    },
    { 
      id: 'housekeeping', 
      label: 'Housekeeping', 
      icon: Briefcase, 
      color: 'text-green-500', 
      bg: 'bg-green-50',
      disabledBy: ['reception']
    },
  ];

  const languages = [
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'pt', label: 'Português', flag: '🇵🇹' },
  ];

  const daysOfWeek = [
    { id: 1, label: 'Lun' },
    { id: 2, label: 'Mar' },
    { id: 3, label: 'Mer' },
    { id: 4, label: 'Jeu' },
    { id: 5, label: 'Ven' },
    { id: 6, label: 'Sam' },
    { id: 0, label: 'Dim' },
  ];

  const toggleOffDay = (dayId: number) => {
    const currentOffDays = user?.off_days || [];
    if (currentOffDays.includes(dayId)) {
      updateUser({ off_days: currentOffDays.filter(d => d !== dayId) });
    } else {
      updateUser({ off_days: [...currentOffDays, dayId] });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ profile_photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Photo Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2">Photo de profil professionnelle</h3>
        <div className="bg-surface rounded-[32px] card-shadow p-6 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-[40px] bg-background border-4 border-violet-light flex items-center justify-center text-violet overflow-hidden shadow-inner">
              {user?.profile_photo ? (
                <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={64} className="opacity-20" />
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-violet text-white rounded-2xl flex items-center justify-center shadow-lg active-tap cursor-pointer">
              <Camera size={20} />
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-bold text-text-primary">Mettre à jour votre photo</p>
            <p className="text-[10px] text-text-secondary leading-relaxed max-w-[200px]">
              Veuillez utiliser une photo professionnelle (portrait). Les paysages ou avatars ne sont pas autorisés.
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <label className="flex-1 bg-background border border-border py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-text-primary active-tap cursor-pointer">
              <Upload size={16} /> Télécharger
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            <button className="flex-1 bg-violet-light text-violet py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold active-tap">
              <Camera size={16} /> Prendre
            </button>
          </div>
        </div>
      </div>

      {/* OFF Days Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2">Jours de repos (OFF)</h3>
        <div className="bg-surface rounded-[32px] card-shadow p-6 space-y-4">
          <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">Sélectionnez vos jours de repos habituels :</p>
          <div className="flex justify-between gap-2">
            {daysOfWeek.map((day) => {
              const isOff = user?.off_days?.includes(day.id);
              return (
                <button
                  key={day.id}
                  onClick={() => toggleOffDay(day.id)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all active-tap",
                    isOff 
                      ? "bg-violet text-white shadow-lg scale-110" 
                      : "bg-background text-text-secondary border border-border"
                  )}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
          <p className="text-[9px] text-text-secondary italic">
            * Ces jours seront automatiquement exclus du calcul de vos congés.
          </p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-2">Paramètres</h3>
        <div className="bg-surface rounded-[32px] card-shadow p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                notifications ? "bg-violet-light text-violet" : "bg-background text-text-secondary"
              )}>
                <Bell size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Notifications Push</p>
                <p className="text-[10px] text-text-secondary">Alertes de service, RH</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <button 
                disabled={isOnShift}
                onClick={() => setNotifications(!notifications)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  notifications ? "bg-violet" : "bg-border",
                  isOnShift && "opacity-50 cursor-not-allowed"
                )}
              >
                <motion.div 
                  animate={{ x: notifications ? 26 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>

          {isOnShift && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                <Shield size={12} />
              </div>
              <p className="text-[9px] text-orange-700 font-medium leading-relaxed">
                Les notifications sont obligatoires pendant votre service (09:00 - 17:00) pour garantir la réception des alertes critiques.
              </p>
            </motion.div>
          )}

          {/* Department Channels Selector */}
          <div className="space-y-4 pt-2">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Canaux par Département</p>
            <div className="grid grid-cols-1 gap-2">
              {channels.map((channel) => {
                const isDisabled = channel.disabledBy.some(id => selectedChannels.includes(id));
                const isSelected = selectedChannels.includes(channel.id);
                
                return (
                  <button
                    key={channel.id}
                    disabled={isDisabled || !notifications}
                    onClick={() => toggleChannel(channel.id)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl border transition-all active-tap",
                      isSelected 
                        ? "bg-surface border-violet/30 shadow-sm" 
                        : "bg-background border-transparent opacity-60",
                      isDisabled && "opacity-30 grayscale cursor-not-allowed",
                      !notifications && "opacity-20 pointer-events-none"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", channel.bg, channel.color)}>
                        <channel.icon size={16} />
                      </div>
                      <span className={cn("text-xs font-bold", isSelected ? "text-text-primary" : "text-text-secondary")}>
                        {channel.label}
                      </span>
                    </div>
                    {isSelected && <Check size={16} className="text-violet" />}
                  </button>
                );
              })}
            </div>
            {selectedChannels.length === 0 && notifications && (
              <p className="text-[9px] text-red-500 font-medium text-center">
                Veuillez sélectionner au moins un canal pour recevoir les alertes.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between opacity-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-text-secondary">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Sécurité Biométrique</p>
                <p className="text-[10px] text-text-secondary">FaceID / Empreinte</p>
              </div>
            </div>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
