import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutMPassView } from '../components/CheckoutMPassView';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useApp } from '../context/AppContext';

export const PassesWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookingState, updateBooking, showToast } = useApp();

  const handlePaymentSuccess = () => {
    updateBooking({ isPaid: true });
    showToast('Payment verified! Authenticated M-Pass & Smart Boom QR active.');
  };

  const handleReturnToHome = () => {
    navigate('/');
  };

  const breadcrumbItems = [
    { label: 'My Passes & M-Pass Wallet' },
  ];

  return (
    <>
      <PageMeta 
        title="My Passes & Digital M-Pass Wallet" 
        description="Access your authenticated offline RFID pass, dynamic turnstile QR code, FASTag automated boom parking pass, and Apple/Google wallet passes."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <CheckoutMPassView
        bookingState={bookingState}
        onUpdateBooking={updateBooking}
        onPaymentSuccess={handlePaymentSuccess}
        onReturnToHome={handleReturnToHome}
      />
    </>
  );
};
