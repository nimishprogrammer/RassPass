import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EventDetailView } from '../components/EventDetailView';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { GROUND_EVENTS } from '../data/mockData';
import { ArrowLeft, MapPin, Compass } from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { 
    tiers, 
    updateTierQuantity, 
    bookingState, 
    updateBooking 
  } = useApp();

  const currentEvent = GROUND_EVENTS.find((e) => e.id === eventId) || GROUND_EVENTS.find((e) => e.id === bookingState.eventId) || GROUND_EVENTS[0];

  // Sync eventId to booking state if different
  useEffect(() => {
    if (eventId && eventId !== bookingState.eventId) {
      updateBooking({ eventId });
    }
  }, [eventId, bookingState.eventId, updateBooking]);

  const handleProceedToCheckout = () => {
    navigate('/passes');
  };

  const handleNavigateToParking = () => {
    navigate('/parking');
  };

  if (!currentEvent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <PageMeta title="Event Not Found" description="The requested Navratri festival ground could not be located." />
        <h1 id="page-heading" tabIndex={-1} className="text-2xl font-bold text-white font-display">
          Festival Ground Not Found
        </h1>
        <p className="text-stone-400 text-sm">
          We couldn't find the arena you were looking for. Explore our full list of Gujarat fairgrounds.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffa000] text-black font-bold text-xs hover:bg-[#ffb865] transition-colors"
        >
          <Compass className="w-4 h-4" aria-hidden="true" />
          <span>Browse All Grounds</span>
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Events & Grounds', href: '/' },
    { label: currentEvent.title },
  ];

  return (
    <>
      <PageMeta 
        title={`${currentEvent.title} Passes & Arena RFID`} 
        description={`Book passes, VIP lounge tickets, and reserved parking for ${currentEvent.title} in ${currentEvent.city || 'Gujarat'}. Contactless authenticated RFID entry.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumbs items={breadcrumbItems} />
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000] rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All Grounds</span>
          </Link>
        </div>
      </div>

      <EventDetailView
        tiers={tiers}
        onUpdateTierQuantity={updateTierQuantity}
        bookingState={bookingState}
        onUpdateBooking={updateBooking}
        onProceedToCheckout={handleProceedToCheckout}
        onNavigateToParking={handleNavigateToParking}
      />
    </>
  );
};
