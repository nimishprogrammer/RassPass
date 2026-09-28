import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  BookingState, 
  PassTier, 
  GarbaAnnouncement 
} from '../types';
import { INITIAL_PASS_TIERS, GROUND_EVENTS } from '../data/mockData';

interface AppContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  userProfile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  bookingState: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  tiers: PassTier[];
  updateTierQuantity: (tierId: string, delta: number) => void;
  resetTiers: () => void;
  favorites: string[];
  toggleFavorite: (eventId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  announcements: GarbaAnnouncement[];
  addAnnouncement: (announcement: GarbaAnnouncement) => void;
  totalPassesCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Ahmedabad');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User profile with localStorage sync
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('rp_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (_) {
      // Fallback
    }
    return {
      id: 'guest-' + Math.random().toString(36).slice(2, 9),
      name: 'Priya Sharma (Guest)',
      role: 'guest',
      isGuest: true,
      fastagPlate: 'GJ-06-AB-4092',
      savedPassesCount: 1,
      lastLoginMethod: 'guest_instant',
    };
  });

  // Booking state across the flow
  const [bookingState, setBookingState] = useState<BookingState>(() => {
    try {
      const saved = localStorage.getItem('rp_booking_state');
      if (saved) return JSON.parse(saved);
    } catch (_) {
      // Fallback
    }
    return {
      eventId: 'united-way',
      eventName: 'United Way of Baroda Navratri Mahotsav 2025',
      venueName: 'Navlakhi Ground, Rajmahal Road',
      city: 'Ahmedabad',
      eventDate: 'Oct 3 – Oct 11, 2025',
      selectedNight: 'Night 1 • Friday, Oct 3',
      passes: { 'season-pass': 1 },
      withParking: true,
      parkingCategory: '4w',
      parkingZone: 'zone-b',
      parkingArrivalWindow: '6:30 PM – 8:00 PM',
      licensePlate: 'GJ-06-AB-4092',
      driverPhone: '+91 98765 43210',
      autoBoomEnabled: true,
      expressValet: false,
      evCharging: false,
      appliedPromo: 'GARBA20',
      promoDiscount: 479.60,
      paymentMethod: 'upi',
      vpaAddress: 'priyasharma@okaxis',
      isPaid: false,
      guestName: 'Priya Sharma',
      mPassRef: '#RP-2025-VAD-88492',
    };
  });

  const [tiers, setTiers] = useState<PassTier[]>(INITIAL_PASS_TIERS);

  // Bookmarked event IDs
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rp_favorites');
      if (saved) return JSON.parse(saved);
    } catch (_) {
      // Fallback
    }
    return ['united-way', 'shankus-dandiya'];
  });

  // Live Organizer Announcements
  const [announcements, setAnnouncements] = useState<GarbaAnnouncement[]>([
    {
      id: 'ann-1',
      title: 'Gate 2 VIP RFID Lanes Operational',
      content: 'Express contactless band scanning active. Zero wait times reported.',
      venueId: 'united-way',
      venueName: 'United Way Baroda',
      timestamp: '15 mins ago',
      priority: 'highlight',
      authorName: 'Baroda Navratri Samiti',
    },
    {
      id: 'ann-2',
      title: 'Zone B Multi-Level Parking at 65% Capacity',
      content: 'FASTag automated boom barriers open. EV chargers available in Bay 4.',
      venueId: 'gmdc-carnival',
      venueName: 'GMDC Ground Ahmedabad',
      timestamp: '35 mins ago',
      priority: 'normal',
      authorName: 'Traffic Police & AMC Hub',
    },
  ]);

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem('rp_user_profile', JSON.stringify(userProfile));
    } catch (_) {
      // Ignore
    }
  }, [userProfile]);

  // Persist Booking State
  useEffect(() => {
    try {
      localStorage.setItem('rp_booking_state', JSON.stringify(bookingState));
    } catch (_) {
      // Ignore
    }
  }, [bookingState]);

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem('rp_favorites', JSON.stringify(favorites));
    } catch (_) {
      // Ignore
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updates };
      if (updates.name) {
        setBookingState((b) => ({ ...b, guestName: updates.name! }));
      }
      if (updates.fastagPlate) {
        setBookingState((b) => ({ ...b, licensePlate: updates.fastagPlate! }));
      }
      return next;
    });
    showToast('Profile updated');
  };

  const updateBooking = (updates: Partial<BookingState>) => {
    // If event changed, also sync event title and venue
    if (updates.eventId && updates.eventId !== bookingState.eventId) {
      const matched = GROUND_EVENTS.find((e) => e.id === updates.eventId);
      if (matched) {
        updates.eventName = matched.title;
        updates.venueName = matched.location;
        updates.city = matched.city || selectedCity;
      }
    }
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const updateTierQuantity = (tierId: string, delta: number) => {
    setTiers((prev) =>
      prev.map((t) => {
        if (t.id === tierId) {
          const newQty = Math.max(0, t.quantity + delta);
          return { ...t, quantity: newQty };
        }
        return t;
      })
    );
  };

  const resetTiers = () => {
    setTiers(INITIAL_PASS_TIERS);
  };

  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(eventId);
      const next = exists ? prev.filter((id) => id !== eventId) : [...prev, eventId];
      showToast(exists ? 'Removed from saved grounds' : 'Added to saved grounds');
      return next;
    });
  };

  const addAnnouncement = (announcement: GarbaAnnouncement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
    showToast('Broadcast announcement published');
  };

  const totalPassesCount = tiers.reduce((sum, t) => sum + t.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        userProfile,
        updateProfile,
        bookingState,
        updateBooking,
        tiers,
        updateTierQuantity,
        resetTiers,
        favorites,
        toggleFavorite,
        toastMessage,
        showToast,
        searchModalOpen,
        setSearchModalOpen,
        searchQuery,
        setSearchQuery,
        announcements,
        addAnnouncement,
        totalPassesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
