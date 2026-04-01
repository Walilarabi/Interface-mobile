import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/hooks/useAuth';
import { User as UserIcon, Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Staff = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock staff list
  const staff = [
    { id: '1', first_name: 'Julien', last_name: 'B.', role: 'Reception', photo: null },
    { id: '2', first_name: 'Léa', last_name: 'M.', role: 'Gouvernante', photo: null },
    { id: '3', first_name: 'Thomas', last_name: 'R.', role: 'Maintenance', photo: null },
    { id: '4', first_name: 'Sarah', last_name: 'K.', role: 'Spa', photo: null },
    { id: '5', first_name: 'Kevin', last_name: 'P.', role: 'Direction', photo: null },
    // Add current user to the list if they have a photo
    ...(user ? [{ id: user.id, first_name: user.first_name, last_name: user.last_name, role: user.role, photo: user.profile_photo }] : [])
  ];

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      <div className="bg-surface px-6 py-4 flex items-center gap-4 sticky top-0 z-40 border-b border-border">
        <button onClick={() => navigate('/')} className="active-tap text-text-primary">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-text-primary">Trombinoscope Staff</h2>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un collaborateur..."
            className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet/20 card-shadow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface p-3 rounded-[24px] card-shadow flex flex-col items-center text-center gap-2 active-tap"
            >
              <div className="w-14 h-14 rounded-[16px] bg-background border-2 border-violet-light flex items-center justify-center text-violet overflow-hidden shadow-sm">
                {member.photo ? (
                  <img src={member.photo} alt={member.first_name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={24} className="opacity-20" />
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
    </div>
  );
};
