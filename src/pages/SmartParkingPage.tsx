import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartParkingView } from '../components/SmartParkingView';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useApp } from '../context/AppContext';

export const SmartParkingPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingState, updateBooking } = useApp();

  const handleProceedToCheckout = () => {
    navigate('/passes');
  };

  const handleBackToPasses = () => {
    navigate(`/events/${bookingState.eventId}`);
  };

  const breadcrumbItems = [
    { label: 'Smart Parking' },
  ];

  return (
    <>
      <PageMeta 
        title="Smart FASTag & RFID Parking Command" 
        description="Reserve parking slots at fairground arenas with automated FASTag camera boom gates, EV charging bays, and real-time occupancy radar across Gujarat."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <SmartParkingView
        bookingState={bookingState}
        onUpdateBooking={updateBooking}
        onProceedToCheckout={handleProceedToCheckout}
        onBackToPasses={handleBackToPasses}
      />
    </>
  );
};
