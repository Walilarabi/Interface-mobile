import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('flowtym_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure new test hotels are available even for existing sessions
      const allHotelIds = ['hotel_1', 'hotel_2', 'hotel_3', 'hotel_4', 'hotel_5', 'hotel_6'];
      if (parsedUser.hotel_ids && parsedUser.hotel_ids.length < allHotelIds.length) {
        parsedUser.hotel_ids = allHotelIds;
        localStorage.setItem('flowtym_user', JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    try {
      // services/api.js – Client Axios unifié
      // apiClient.post('/auth/magic-link', { email })
      
      // Simulating Magic Link send
      console.log(`Magic link sent to ${email}`);
      
      // Simulating validation and JWT reception
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      localStorage.setItem('access_token', mockToken);

      const mockUser: User = {
        id: 'user_1',
        hotel_id: 'hotel_1',
        hotel_ids: ['hotel_1', 'hotel_2', 'hotel_3', 'hotel_4', 'hotel_5', 'hotel_6'],
        primary_hotel_id: 'hotel_1',
        email: email,
        role: email.includes('direction') ? 'direction' : 'femme_chambre',
        first_name: email.split('@')[0],
        last_name: 'Staff',
        is_active: true,
        off_days: [0, 6] // Default to weekends
      };
      localStorage.setItem('flowtym_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('flowtym_user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('flowtym_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
