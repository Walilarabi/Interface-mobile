import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/src/hooks/useAuth';
import { User as UserIcon, Search, ChevronLeft, Megaphone, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/hooks/useTranslation';

export const Staff = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [notificationText, setNotificationText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const isAuthorized = user?.role === 'direction' || user?.role === 'gouvernante';

  // Mock staff list
  const staff = [
    { id: '1', first_name: 'Julien', last_name: 'B.', role: 'reception', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julien' },
    { id: '2', first_name: 'Léa', last_name: 'M.', role: 'gouvernante', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea' },
    { id: '3', first_name: 'Thomas', last_name: 'R.', role: 'maintenance', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas' },
    { id: '4', first_name: 'Sarah', last_name: 'K.', role: 'spa', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: '5', first_name: 'Kevin', last_name: 'P.', role: 'direction', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin' },
    { id: '6', first_name: 'Jeanne', last_name: 'D.', role: 'femme_chambre', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jeanne' },
  ];

  const filteredStaff = staff.filter(m => 
    `${m.first_name} ${m.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendNotification = () => {
    if (!notificationText.trim()) return;
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSelectedMember(null);
      setNotificationText('');
      // In a real app, we'd send this to the backend/firebase
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden relative">
      <div className="bg-surface px-6 py-4 flex items-center gap-4 sticky top-0 z-40 border-b border-border">
        <button onClick={() => navigate('/')} className="active-tap text-text-primary">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-text-primary">{t('dashboard.staff')}</h2>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
          <input 
            type="text" 
            placeholder={t('common.loading')}
            className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet/20 card-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredStaff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => isAuthorized && member.id !== user?.id && setSelectedMember(member)}
              className={cn(
                "bg-surface p-3 rounded-[24px] card-shadow flex flex-col items-center text-center gap-2 transition-all",
                isAuthorized && member.id !== user?.id ? "active-tap hover:border-violet/30 border border-transparent" : "opacity-80"
              )}
            >
              <div className="w-14 h-14 rounded-[16px] bg-background border-2 border-violet-light flex items-center justify-center text-violet overflow-hidden shadow-sm relative">
                {member.photo ? (
                  <img src={member.photo} alt={member.first_name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={24} className="opacity-20" />
                )}
                {isAuthorized && member.id !== user?.id && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-violet text-white flex items-center justify-center rounded-bl-lg">
                    <Megaphone size={8} />
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-xs text-text-primary leading-tight">{member.first_name} {member.last_name}</p>
                <p className="text-[8px] text-text-secondary uppercase tracking-widest font-bold mt-0.5 opacity-60">
                  {member.role.replace('_', ' ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Targeted Notification Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md z-[101]"
            >
              <div className="bg-white rounded-[32px] border border-border/50 shadow-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-text-primary leading-tight">{t('notifications.title')}</h2>
                      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{t('common.soon')} {selectedMember.first_name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedMember(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary active-tap">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-border">
                  <img src={selectedMember.photo} alt="" className="w-12 h-12 rounded-xl" />
                  <div>
                    <p className="font-bold text-sm text-text-primary">{selectedMember.first_name} {selectedMember.last_name}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">{selectedMember.role.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 block">{t('common.description')}</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-border rounded-2xl p-4 text-sm outline-none focus:border-violet transition-colors min-h-[120px]"
                      placeholder={t('common.loading')}
                      value={notificationText}
                      onChange={(e) => setNotificationText(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSendNotification}
                  disabled={isSending || !notificationText.trim()}
                  className={cn(
                    "w-full py-4 bg-violet text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active-tap",
                    (isSending || !notificationText.trim()) && "opacity-50 grayscale cursor-not-allowed"
                  )}
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      {t('common.confirm')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
