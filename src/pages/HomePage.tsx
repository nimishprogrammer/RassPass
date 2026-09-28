import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExploreEventsView } from '../components/ExploreEventsView';
import { PageMeta } from '../components/PageMeta';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCity, updateBooking } = useApp();

  const handleSelectEvent = (eventId: string) => {
    updateBooking({ eventId });
    navigate(`/events/${eventId}`);
  };

  const handleGoToParking = () => {
    navigate('/parking');
  };

  return (
    <>
      <PageMeta 
        title="Gujarat Navratri 2025 Passes & Fairgrounds" 
        description="Experience Gujarat's grandest Navratri 2025. Smart ticketing, authenticated contactless RFID bands, reserved parking, and interactive arena navigation across Ahmedabad, Vadodara, Surat & Rajkot."
      />
      <ExploreEventsView
        onSelectEvent={handleSelectEvent}
        onGoToParking={handleGoToParking}
        selectedCity={selectedCity}
      />
    </>
  );
};
