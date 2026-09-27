/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, PassTier, BookingState, UserProfile } from './types';
import { INITIAL_PASS_TIERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExploreEventsView } from './components/ExploreEventsView';
import { EventDetailView } from './components/EventDetailView';
import { SmartParkingView } from './components/SmartParkingView';
import { CheckoutMPassView } from './components/CheckoutMPassView';
import { AuthorOrganizerPortal } from './components/AuthorOrganizerPortal';
import { GarbaMotionBeatPlayer } from './components/GarbaMotionBeatPlayer';
import { Search, X, MapPin } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('explore');
  const [selectedCity, setSelectedCity] = useState('Ahmedabad');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Login-Free Guest User Profile State
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

  // Pass tiers state
  const [tiers, setTiers] = useState<PassTier[]>(INITIAL_PASS_TIERS);

  // Booking state across the flow
  const [bookingState, setBookingState] = useState<BookingState>({
    eventId: 'united-way',
    eventName: 'United Way of Baroda Navratri Mahotsav 2025',
    venueName: 'Navlakhi Ground, Rajmahal Road',
    city: 'Ahmedabad',
    eventDate: 'Oct 11 – Oct 19, 2025',
    selectedNight: 'Night 4 • Friday, Oct 6',
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
  });

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rp_user_profile', JSON.stringify(userProfile));
    } catch (_) {
      // Ignore
    }
  }, [userProfile]);

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
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
  };

  const totalPassCount = tiers.reduce((sum, t) => sum + t.quantity, 0);

  const handleUpdateTierQuantity = (tierId: string, delta: number) => {
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

  const handleUpdateBooking = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#121317] text-[#e3e2e7] flex flex-col font-sans selection:bg-[#ffa000] selection:text-black">
      {/* Top Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
        onOpenMyPasses={() => handleNavigate('checkout-mpass')}
        onOpenSearch={() => setSearchModalOpen(true)}
        totalPassesCount={totalPassCount}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'explore' && (
          <ExploreEventsView
            onSelectEvent={(eventId) => {
              handleUpdateBooking({ eventId });
              handleNavigate('event-detail');
            }}
            onGoToParking={() => handleNavigate('parking')}
            selectedCity={selectedCity}
          />
        )}

        {currentView === 'event-detail' && (
          <EventDetailView
            tiers={tiers}
            onUpdateTierQuantity={handleUpdateTierQuantity}
            bookingState={bookingState}
            onUpdateBooking={handleUpdateBooking}
            onProceedToCheckout={() => handleNavigate('checkout-mpass')}
            onNavigateToParking={() => handleNavigate('parking')}
          />
        )}

        {currentView === 'parking' && (
          <SmartParkingView
            bookingState={bookingState}
            onUpdateBooking={handleUpdateBooking}
            onProceedToCheckout={() => handleNavigate('checkout-mpass')}
            onBackToPasses={() => handleNavigate('event-detail')}
          />
        )}

        {currentView === 'checkout-mpass' && (
          <CheckoutMPassView
            bookingState={bookingState}
            onUpdateBooking={handleUpdateBooking}
            onPaymentSuccess={() => {
              handleUpdateBooking({ isPaid: true });
              alert('🎉 Payment verified! Your authenticated M-Pass & Smart Boom QR are active in your Guest session.');
            }}
            onReturnToHome={() => handleNavigate('explore')}
          />
        )}

        {currentView === 'author-portal' && (
          <AuthorOrganizerPortal
            onReturnToExplore={() => handleNavigate('explore')}
          />
        )}
      </main>

      {/* Global Real-Time Garba Beat Synthesizer & Dandiya Motion Player */}
      <GarbaMotionBeatPlayer />

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-[#17181f] border border-[#2e2f3a] rounded-2xl p-5 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252631]">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-5 h-5 text-[#ffa000]" />
                <input
                  type="text"
                  placeholder="Search Ahmedabad grounds, artists, S.G. Highway, GMDC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-sm text-white placeholder:text-stone-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Popular Ahmedabad Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'GMDC Ground Carnival',
                  'S.G. Highway Garba',
                  'Kinjal Dave Live',
                  'Mandvi Ni Pol Barefoot',
                  'Sindhu Bhavan Lawns',
                  'Sabarmati Riverfront',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchModalOpen(false);
                      handleNavigate('explore');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#22232c] hover:bg-[#2d2e3a] text-stone-200 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-[#ffa000]" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
