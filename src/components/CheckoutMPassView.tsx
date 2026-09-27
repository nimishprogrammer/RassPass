import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Download, 
  Share2, 
  Smartphone, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  AlertTriangle, 
  ChevronRight,
  ExternalLink,
  Car,
  Ticket,
  Headphones,
  Radio,
  Lock
} from 'lucide-react';
import { BookingState } from '../types';

interface CheckoutMPassViewProps {
  bookingState: BookingState;
  onUpdateBooking: (updates: Partial<BookingState>) => void;
  onPaymentSuccess: () => void;
  onReturnToHome: () => void;
}

export const CheckoutMPassView: React.FC<CheckoutMPassViewProps> = ({
  bookingState,
  onUpdateBooking,
  onPaymentSuccess,
  onReturnToHome,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'credits'>(
    bookingState.paymentMethod || 'upi'
  );
  const [vpa, setVpa] = useState(bookingState.vpaAddress || 'priyasharma@okaxis');
  const [isVerifyingVpa, setIsVerifyingVpa] = useState(false);
  const [vpaVerified, setVpaVerified] = useState(true);
  const [countdown, setCountdown] = useState(584); // 9:44 in seconds
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showLiveChatModal, setShowLiveChatModal] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const passesSubtotal = 2398.00;
  const parkingBayFee = bookingState.withParking ? 150.00 : 0.00;
  const promoDiscount = 479.60;
  const gstAndFee = 72.00;
  const netPayable = passesSubtotal + parkingBayFee + gstAndFee - promoDiscount;

  const handleVerifyVPA = () => {
    setIsVerifyingVpa(true);
    setTimeout(() => {
      setIsVerifyingVpa(false);
      setVpaVerified(true);
    }, 700);
  };

  const handlePay = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      onPaymentSuccess();
    }, 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Stepper & Reservation Expiry Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#ffa000] text-black font-extrabold uppercase text-[10px]">
            STEP 3 OF 3
          </span>
          <h1 className="text-sm sm:text-base font-bold text-white">
            Unified Booking Verification & Instant M-Pass
          </h1>
        </div>

        {/* Live Reservation Expiry */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1c24] border border-[#2d2e3b] text-stone-300">
          <span className="w-2 h-2 rounded-full bg-[#ffa000] animate-pulse"></span>
          <span>Slot & Passes reserved for</span>
          <span className="font-mono font-bold text-[#ffa000] text-sm">
            {formatCountdown(countdown)} min
          </span>
        </div>
      </div>

      {/* Main Grid: Left Order Summary + Payment & Right Digital M-Pass Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order Summary & Payment Methods */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Summary Box */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#24252f]">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#ffa000]" />
                <h3 className="text-base font-bold text-white">
                  Order Summary (2 Items)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#00e3fd]">
                Express Fast-Track Entry
              </span>
            </div>

            {/* Item 1: Navratri Mahotsav Entry */}
            <div className="p-3.5 rounded-xl bg-[#121317] border border-[#262732] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#221c12] border border-[#ffa000]/40 flex flex-col items-center justify-center shrink-0 text-center">
                  <span className="text-[9px] uppercase font-bold text-stone-400">OCT</span>
                  <span className="text-base font-black text-[#ffa000] leading-none">06</span>
                  <span className="text-[8px] text-stone-500">Night 4</span>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">NAVRATRI MAHOTSAV 2025</div>
                  <div className="text-sm font-bold text-white leading-snug">United Way of Baroda</div>
                  <div className="text-[11px] text-stone-400">2x General Couple Passes • Gate 1 Access</div>
                  <div className="flex items-center gap-1 text-[10px] text-[#00e3fd] font-semibold mt-0.5">
                    <Radio className="w-3 h-3" />
                    <span>RFID Band Included</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-base font-black text-white font-display">₹2,398.00</div>
                <div className="text-[10px] text-stone-500">₹1,199 x 2</div>
              </div>
            </div>

            {/* Item 2: Smart Parking Pass */}
            <div className="p-3.5 rounded-xl bg-[#121317] border border-[#262732] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#10242e] border border-[#00e3fd]/40 flex flex-col items-center justify-center shrink-0 text-center">
                  <Car className="w-4 h-4 text-[#00e3fd]" />
                  <span className="text-[9px] font-bold text-[#00e3fd] mt-0.5">ZONE B</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold text-white bg-[#00e3fd]/20 px-1.5 py-0.2 rounded text-[#00e3fd]">
                      FAST-PASS BAY
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-300">
                      {bookingState.licensePlate || 'GJ-06-AB-4092'}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">Slot B-142 (Covered 4-Wheeler)</div>
                  <div className="text-[11px] text-stone-400">CCTV Security Zone • 250m Walk to Gate 1</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">ANPR Auto Barrier Sync</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-base font-black text-white font-display">₹150.00</div>
                <div className="text-[10px] text-stone-500">Flat 9hr Bay Access</div>
              </div>
            </div>

            {/* Bill Details */}
            <div className="space-y-1.5 pt-2 text-xs text-stone-400">
              <div className="flex items-center justify-between">
                <span>Passes Subtotal (2 Items)</span>
                <span>₹2,398.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vehicle Parking Bay (Zone B-142)</span>
                <span>₹150.00</span>
              </div>
              <div className="flex items-center justify-between text-[#ff4d4f]">
                <span className="flex items-center gap-1">
                  <span>🏷️</span>
                  <span>Promo 'GARBA20' (HDFC Festive Offer)</span>
                </span>
                <span className="font-bold">-₹479.60</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Convenience Fee & GST (18%)</span>
                <span>₹72.00</span>
              </div>
            </div>

            {/* Net Payable Banner */}
            <div className="p-4 rounded-xl bg-[#1d1f27] border border-[#2f3140] flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block font-medium">Net Payable Amount</span>
                <span className="text-[10px] text-[#00e3fd]">All platform levies included</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#ffa000] font-display">
                ₹2,140.40
              </div>
            </div>
          </div>

          {/* Login-Free Guest Passholder Information */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#24252f]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Guest Passholder Details</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/30">
                100% Login-Free Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#12231b] border border-emerald-500/20 text-xs text-emerald-300">
              Zero login required! Your verified M-Pass will be issued directly to your device with cryptographic QR verification and FASTag boom barrier recognition.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Attendee Name (on M-Pass)</label>
                <input
                  type="text"
                  value={bookingState.guestName}
                  onChange={(e) => onUpdateBooking({ guestName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white focus:outline-none focus:border-[#ffa000]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Mobile / WhatsApp (for Pass Delivery)</label>
                <input
                  type="text"
                  value={bookingState.driverPhone}
                  onChange={(e) => onUpdateBooking({ driverPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white focus:outline-none focus:border-[#ffa000]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-stone-300">Vehicle Plate (for Smart FASTag Boom Gate)</label>
                <input
                  type="text"
                  value={bookingState.licensePlate}
                  onChange={(e) => onUpdateBooking({ licensePlate: e.target.value.toUpperCase() })}
                  placeholder="GJ-06-AB-4092"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white font-mono uppercase focus:outline-none focus:border-[#ffa000]"
                />
              </div>
            </div>
          </div>

          {/* Secure Payment Methods Section */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#24252f]">
              <h3 className="text-base font-bold text-white">Secure Payment Method</h3>
              <div className="flex items-center gap-1 text-[11px] text-[#00e3fd]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* 4 Method Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Tile 1: Instant UPI */}
              <div
                onClick={() => setSelectedMethod('upi')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  selectedMethod === 'upi'
                    ? 'bg-[#221c12] border-[#ffa000]'
                    : 'bg-[#121317] border-[#282935] hover:border-[#383a48]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">Instant UPI</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</div>
                  <div className="text-[10px] font-bold text-[#00e3fd] mt-1.5 uppercase">ZERO GATEWAY FEE</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedMethod === 'upi' ? 'border-[#ffa000] bg-[#ffa000]' : 'border-stone-600'
                }`}>
                  {selectedMethod === 'upi' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>

              {/* Tile 2: Credit / Debit Card */}
              <div
                onClick={() => setSelectedMethod('card')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  selectedMethod === 'card'
                    ? 'bg-[#221c12] border-[#ffa000]'
                    : 'bg-[#121317] border-[#282935] hover:border-[#383a48]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">Credit / Debit Card</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Visa, Mastercard, RuPay, Amex</div>
                  <div className="text-[10px] font-bold text-[#ffa000] mt-1.5 uppercase">HDFC 10% INSTANT CASH</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedMethod === 'card' ? 'border-[#ffa000] bg-[#ffa000]' : 'border-stone-600'
                }`}>
                  {selectedMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>

              {/* Tile 3: Net Banking */}
              <div
                onClick={() => setSelectedMethod('netbanking')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  selectedMethod === 'netbanking'
                    ? 'bg-[#221c12] border-[#ffa000]'
                    : 'bg-[#121317] border-[#282935] hover:border-[#383a48]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">Net Banking</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">All 54 Indian Major Banks</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedMethod === 'netbanking' ? 'border-[#ffa000] bg-[#ffa000]' : 'border-stone-600'
                }`}>
                  {selectedMethod === 'netbanking' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>

              {/* Tile 4: RaasPass Credits */}
              <div
                onClick={() => setSelectedMethod('credits')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  selectedMethod === 'credits'
                    ? 'bg-[#221c12] border-[#ffa000]'
                    : 'bg-[#121317] border-[#282935] hover:border-[#383a48]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">RaasPass Credits</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Available Balance: ₹450.00</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedMethod === 'credits' ? 'border-[#ffa000] bg-[#ffa000]' : 'border-stone-600'
                }`}>
                  {selectedMethod === 'credits' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>
            </div>

            {/* UPI Virtual Payment Address (VPA) Input */}
            {selectedMethod === 'upi' && (
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                  Enter Virtual Payment Address (VPA)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                      placeholder="priyasharma@okaxis"
                      className="w-full bg-[#121317] border border-[#2c2d38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffa000]"
                    />
                    {vpaVerified && (
                      <CheckCircle2 className="w-4 h-4 text-[#00e3fd] absolute right-3 top-2.5" />
                    )}
                  </div>

                  <button
                    onClick={handleVerifyVPA}
                    disabled={isVerifyingVpa}
                    className="px-4 py-2 bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold rounded-lg transition-colors shrink-0"
                  >
                    {isVerifyingVpa ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            )}

            {/* Badges footer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-stone-400">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#121317] border border-[#252632]">
                <Clock className="w-3.5 h-3.5 text-[#ffa000]" />
                <span>100% Refundable up to 6 hrs prior</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#121317] border border-[#252632]">
                <Smartphone className="w-3.5 h-3.5 text-[#00e3fd]" />
                <span>Instant WhatsApp & SMS delivery</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#121317] border border-[#252632]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffa000]" />
                <span>Authorized Official Partner</span>
              </div>
            </div>

            {/* Pay & Confirm Button */}
            <button
              onClick={handlePay}
              disabled={isProcessingPayment}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ffa000] to-[#ffb865] hover:brightness-110 disabled:opacity-50 text-black font-black text-sm tracking-wide transition-all shadow-xl shadow-[#ffa000]/25 flex items-center justify-center gap-2 active:scale-98"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>
                {isProcessingPayment ? 'Securing Passes...' : 'PAY & CONFIRM PASSES • ₹2,140.40'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Digital M-Pass Live Preview matching Image 7 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 sm:p-6 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#24252f]">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Smartphone className="w-4 h-4 text-[#ffa000]" />
                <span>Digital M-Pass Live Preview</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#ff4d4f] text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                PASS ACTIVE
              </span>
            </div>

            {/* M-Pass Simulated Apple/Google Wallet Card */}
            <div className="mt-4 p-5 rounded-2xl bg-[#0f1014] border border-[#343542] relative overflow-hidden shadow-inner">
              {/* Event Header info */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    NAVRATRI 2025 ENTRY • VADODARA
                  </div>
                  <h3 className="text-xl font-black text-white font-display">
                    United Way Garba
                  </h3>
                  <div className="text-xs text-stone-400 mt-0.5">
                    Navlakhi Ground, Rajmahal Road
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-[#1f2029] border border-stone-700 text-[#ffa000]">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              {/* Reference ID & Date */}
              <div className="flex items-center justify-between py-2 text-xs border-b border-dashed border-stone-800 text-stone-400">
                <span className="font-mono text-[11px] text-[#00e3fd]">REF : #RP-2025-VAD-88492</span>
                <span className="font-semibold text-stone-300">Night 4 • Mon, Oct 06, 2025</span>
              </div>

              {/* Dynamic QR Code Box */}
              <div className="my-5 p-4 rounded-xl bg-white flex flex-col items-center justify-center text-center shadow-lg">
                {/* SVG High-Contrast QR Code */}
                <div className="w-44 h-44 bg-white flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Corner Squares */}
                    <rect x="5" y="5" width="25" height="25" fill="#000" />
                    <rect x="9" y="9" width="17" height="17" fill="#fff" />
                    <rect x="13" y="13" width="9" height="9" fill="#000" />

                    <rect x="70" y="5" width="25" height="25" fill="#000" />
                    <rect x="74" y="9" width="17" height="17" fill="#fff" />
                    <rect x="78" y="13" width="9" height="9" fill="#000" />

                    <rect x="5" y="70" width="25" height="25" fill="#000" />
                    <rect x="9" y="74" width="17" height="17" fill="#fff" />
                    <rect x="13" y="78" width="9" height="9" fill="#000" />

                    {/* QR Code Matrix Cells */}
                    <rect x="35" y="8" width="6" height="6" fill="#000" />
                    <rect x="45" y="8" width="6" height="6" fill="#000" />
                    <rect x="55" y="12" width="6" height="6" fill="#000" />
                    <rect x="8" y="35" width="6" height="6" fill="#000" />
                    <rect x="8" y="45" width="6" height="6" fill="#000" />
                    <rect x="38" y="38" width="12" height="12" fill="#000" />
                    <rect x="55" y="40" width="6" height="6" fill="#000" />
                    <rect x="65" y="35" width="6" height="6" fill="#000" />
                    <rect x="75" y="45" width="8" height="8" fill="#000" />
                    <rect x="40" y="60" width="8" height="8" fill="#000" />
                    <rect x="55" y="65" width="6" height="6" fill="#000" />
                    <rect x="70" y="70" width="8" height="8" fill="#000" />
                    <rect x="85" y="80" width="8" height="8" fill="#000" />
                    <rect x="40" y="80" width="10" height="10" fill="#000" />
                  </svg>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-black uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#ff4d4f] animate-ping"></span>
                  <span>DYNAMIC SECURITY TOKEN ACTIVE</span>
                </div>
              </div>

              {/* Guest & Tier Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#15161c] border border-stone-800">
                  <div className="text-[10px] text-stone-500 uppercase">Registered Guests</div>
                  <div className="font-bold text-white mt-0.5">Priya Sharma + 1</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#15161c] border border-stone-800">
                  <div className="text-[10px] text-stone-500 uppercase">Pass Tier</div>
                  <div className="font-bold text-[#ffc788] mt-0.5">Couple General</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#15161c] border border-stone-800">
                  <div className="text-[10px] text-stone-500 uppercase">Pedestrian Gate</div>
                  <div className="font-bold text-[#00e3fd] mt-0.5">Gate #1 (North Arena)</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#15161c] border border-stone-800">
                  <div className="text-[10px] text-stone-500 uppercase">Parking Bay & Gate</div>
                  <div className="font-bold text-[#00e3fd] mt-0.5">Gate P2 • Stall B-142</div>
                </div>
              </div>

              {/* Set Timing Footer */}
              <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00e3fd]" />
                  <span>Gates Open: <strong className="text-white">7:00 PM</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>💃</span>
                  <span>Garba Starts: <strong className="text-[#ffa000]">8:30 PM Sharp</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Wallet & Download Actions */}
            <div className="space-y-2 pt-4">
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2.5 px-3 rounded-lg bg-[#22232c] hover:bg-[#2c2d38] border border-stone-700 text-xs font-semibold text-stone-200 flex items-center justify-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5 text-[#ffa000]" />
                  <span>Download PDF</span>
                </button>

                <button className="py-2.5 px-3 rounded-lg bg-[#22232c] hover:bg-[#2c2d38] border border-stone-700 text-xs font-semibold text-stone-200 flex items-center justify-center gap-1.5 transition-colors">
                  <Smartphone className="w-3.5 h-3.5 text-[#00e3fd]" />
                  <span>Apple / Google Wallet</span>
                </button>
              </div>

              <a
                href="https://maps.google.com/?q=Navlakhi+Ground+Vadodara"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#12242d] hover:bg-[#183543] border border-[#00e3fd]/40 text-xs font-bold text-[#00e3fd] flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>GPS Directions to Parking Slot B-142</span>
              </a>

              <button className="w-full py-2.5 rounded-lg bg-[#1b1c24] hover:bg-[#242531] border border-stone-700 text-xs font-medium text-stone-300 flex items-center justify-center gap-1.5 transition-colors">
                <Share2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Send Pass via WhatsApp to Guest</span>
              </button>
            </div>
          </div>

          {/* Venue Advisory & Entry Rules Card */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-3.5 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ffa000]" />
              <span>Venue Advisory & Entry Rules</span>
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffa000] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Traditional Attire Mandatory:</strong> Chaniya Choli, Kurta Pajama, or Kedia strictly required at Gate 1 inspection.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00e3fd] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Dandiya Stick Guidelines:</strong> Traditional wooden sticks permitted. Metal, acrylic, or sharpened dandiyas are strictly confiscated at scanner security.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#ff4d4f] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Food & Beverages:</strong> Outside consumables and plastic bottles are prohibited. Free RO chilled drinking water stations available throughout Sector 1-4.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Car className="w-3.5 h-3.5 text-[#00e3fd] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Smart Bay B-142 Validity:</strong> Gate P2 opens at 6:00 PM. Vehicle exit window remains operational until 3:00 AM. RFID scans auto-expire afterwards.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* On-Site Venue Assistance Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#17181f] border border-[#282933] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#221c12] border border-[#ffa000]/40 flex items-center justify-center shrink-0">
            <Headphones className="w-6 h-6 text-[#ffa000]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Need On-Site Venue Assistance?</div>
            <div className="text-xs text-stone-400">
              Call RaasPass Vadodara Event Control Room: +91 (0265) 289-4920 (24x7 Navratri Ops)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Emergency Protocol: On-site ambulance team notified. Dispatched to Gate 1 Paramedic Desk.")}
            className="px-4 py-2 rounded-lg bg-[#241719] hover:bg-[#341d21] text-[#ff4d4f] border border-[#ff4d4f]/30 text-xs font-semibold transition-colors"
          >
            Emergency Protocol
          </button>
          <button
            onClick={() => setShowLiveChatModal(true)}
            className="px-5 py-2 rounded-lg bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold transition-all shadow"
          >
            Chat Live
          </button>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showLiveChatModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252630]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e3fd] animate-pulse"></span>
                <h3 className="text-base font-bold text-white">Navratri 2025 Venue Support</h3>
              </div>
              <button
                onClick={() => setShowLiveChatModal(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#121317] border border-[#252631] text-xs text-stone-300 space-y-2">
              <p className="font-semibold text-[#ffa000]">Navlakhi Ground Fairground Ops Desk</p>
              <p>Hi Priya! Your Couple Pass for Night 4 and Smart Parking Bay B-142 are fully synchronized with our entrance boom barriers.</p>
              <p className="text-stone-400">If you have costume change questions or need wristband kiosk directions at Gate 1, our marshals are active at all turnstiles.</p>
            </div>

            <button
              onClick={() => setShowLiveChatModal(false)}
              className="w-full py-2.5 bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold rounded-lg transition-colors"
            >
              Close Support Desk
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
