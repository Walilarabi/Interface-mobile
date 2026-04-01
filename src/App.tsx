import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Layout/Header';
import { BottomNav } from './components/Layout/BottomNav';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Pointage } from './pages/Pointage';
import { Profile } from './pages/Profile';
import { Housekeeping } from './pages/Housekeeping';
import { Performance } from './pages/Performance';
import { Staff } from './pages/Staff';
import { Chat } from './pages/Chat';
import { Commissions } from './pages/Commissions';
import { AdminDashboard } from './pages/AdminDashboard';
import { Rewards } from './pages/Rewards';
import { Planning } from './pages/Planning';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-violet border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="h-screen w-screen flex flex-col bg-background max-w-md mx-auto shadow-2xl relative overflow-hidden">
        <main className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pointage" element={<Pointage />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/housekeeping" element={<Housekeeping />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}
