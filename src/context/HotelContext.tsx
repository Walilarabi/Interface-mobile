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
    qr_code: 'QR_HOTEL_1',
    latitude: 48.8694,
    longitude: 2.3302
  },
  {
    id: 'hotel_2',
    name: 'ForestGarden Boutique',
    address: '45 Avenue des Champs-Élysées, 75008 Paris',
    color: '#10B981', // Green
    logo: 'https://picsum.photos/seed/hotel2/100/100',
    qr_code: 'QR_HOTEL_2',
    latitude: 48.8704,
    longitude: 2.3056
  },
  {
    id: 'hotel_3',
    name: 'Washington Opera',
    address: '50 Rue de Richelieu, 75001 Paris',
    color: '#3B82F6', // Blue
    logo: 'https://picsum.photos/seed/hotel3/100/100',
    qr_code: 'QR_HOTEL_3',
    latitude: 48.8665,
    longitude: 2.3374
  },
  {
    id: 'hotel_4',
    name: 'Vendome Opera',
    address: '8 Rue du Helder, 75009 Paris',
    color: '#F59E0B', // Amber
    logo: 'https://picsum.photos/seed/hotel4/100/100',
    qr_code: 'QR_HOTEL_4',
    latitude: 48.8723,
    longitude: 2.3358
  },
  {
    id: 'hotel_5',
    name: 'Folkestone Opera',
    address: '9 Rue de Castellane, 75008 Paris',
    color: '#EC4899', // Pink
    logo: 'https://picsum.photos/seed/hotel5/100/100',
    qr_code: 'QR_HOTEL_5',
    latitude: 48.8735,
    longitude: 2.3248
  },
  {
    id: 'hotel_6',
    name: 'Grand hotel du Havre',
    address: '18 Rue d\'Amsterdam, 75009 Paris',
    color: '#6366F1', // Indigo
    logo: 'https://picsum.photos/seed/hotel6/100/100',
    qr_code: 'QR_HOTEL_6',
    latitude: 48.8768,
    longitude: 2.3275
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
