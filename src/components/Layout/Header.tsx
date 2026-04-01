import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/src/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <header className="bg-violet text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <button className="active-tap opacity-80">
        <Bell size={22} />
      </button>
      <h1 className="font-logo text-2xl font-bold tracking-tight">
        FLOW<span className="text-green">TYM</span>
      </h1>
      <Link to="/profile" className="active-tap">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden border border-white/10 shadow-sm">
          {user?.profile_photo ? (
            <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <User size={20} />
          )}
        </div>
      </Link>
    </header>
  );
};
