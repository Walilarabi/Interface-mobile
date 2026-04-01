import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hotel } from '../types';
import { useAuth } from '../hooks/useAuth';

interface HotelContextType {
  activeHotel: Hotel | null;
  hotels: Hotel[];
  setActiveHotel: (hotelId: string) => void;
  loading: boolean;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

// Mock hotels
const MOCK_HOTELS: Hotel[] = [
  {
    id: 'hotel_1',
    name: 'LuxuryForrest Paris',
    address: '123 Rue de la Paix, 75001 Paris',
    color: '#7C3AED', // Violet
    logo: 'https://picsum.photos/seed/hotel1/100/100',
    qr_code: 'QR_HOTEL_1'
  },
  {
    id: 'hotel_2',
    name: 'ForestGarden Boutique',
    address: '45 Avenue des Champs-Élysées, 75008 Paris',
    color: '#10B981', // Green
    logo: 'https://picsum.photos/seed/hotel2/100/100',
    qr_code: 'QR_HOTEL_2'
  }
];

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const [activeHotel, setActiveHotelState] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const currentHotel = MOCK_HOTELS.find(h => h.id === user.hotel_id) || MOCK_HOTELS[0];
      setActiveHotelState(currentHotel);
    }
    setLoading(false);
  }, [user?.hotel_id]);

  const setActiveHotel = (hotelId: string) => {
    const hotel = MOCK_HOTELS.find(h => h.id === hotelId);
    if (hotel) {
      setActiveHotelState(hotel);
      updateUser({ hotel_id: hotelId });
    }
  };

  return (
    <HotelContext.Provider value={{ 
      activeHotel, 
      hotels: MOCK_HOTELS.filter(h => user?.hotel_ids?.includes(h.id)), 
      setActiveHotel, 
      loading 
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
