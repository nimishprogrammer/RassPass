import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Car, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  Tag, 
  Lock, 
  AlertCircle, 
  ArrowRight,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PassTier, BookingState } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { PROMO_CODES } from '../data/mockData';

interface EventDetailViewProps {
  tiers: PassTier[];
  onUpdateTierQuantity: (tierId: string, delta: number) => void;
  bookingState: BookingState;
  onUpdateBooking: (updates: Partial<BookingState>) => void;
  onProceedToCheckout: () => void;
  onNavigateToParking: () => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  tiers,
  onUpdateTierQuantity,
  bookingState,
  onUpdateBooking,
  onProceedToCheckout,
  onNavigateToParking,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  // Calculate pricing
  const passesSubtotal = tiers.reduce((sum, tier) => sum + tier.price * tier.quantity, 0);
  const totalPassCount = tiers.reduce((sum, tier) => sum + tier.quantity, 0);

  // Parking cost if enabled
  const parkingCost = bookingState.withParking ? 150 : 0;
  const convenienceFee = totalPassCount > 0 ? 149 : 0;

  // Discount calculation
  let discountAmount = 0;
  if (bookingState.appliedPromo && PROMO_CODES[bookingState.appliedPromo]) {
    const promo = PROMO_CODES[bookingState.appliedPromo];
    if (promo.isPercent) {
      discountAmount = Math.round((passesSubtotal * promo.discount) / 100);
    } else {
      discountAmount = promo.discount;
    }
  }

  const grandTotal = Math.max(0, passesSubtotal + parkingCost + convenienceFee - discountAmount);

  const handleApplyVoucher = (codeToApply?: string) => {
    const code = (codeToApply || voucherInput).trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const promo = PROMO_CODES[code];
      const discount = promo.isPercent ? Math.round((passesSubtotal * promo.discount) / 100) : promo.discount;
      onUpdateBooking({
        appliedPromo: code,
        promoDiscount: discount,
      });
      setVoucherSuccess(`Voucher ${code} applied successfully!`);
      setVoucherError('');
      setVoucherInput('');
    } else {
      setVoucherError('Invalid promo code. Try GARBA20 or NAVDUO');
      setVoucherSuccess('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumb & Official Partner Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span>Gujarat</span>
          <ChevronRight className="w-3 h-3 text-stone-600" />
          <span>Ahmedabad / Vadodara Metro Link</span>
          <ChevronRight className="w-3 h-3 text-stone-600" />
          <span className="text-stone-200 font-medium">United Way Garba 2025</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#ff4d4f] bg-[#2d1217] px-2.5 py-1 rounded-full border border-[#ff4d4f]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4f] animate-ping"></span>
            SELLING OUT RAPIDLY
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#00e3fd] bg-[#0c242c] px-2.5 py-1 rounded-full border border-[#00e3fd]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            OFFICIAL PARTNER
          </span>
        </div>
      </div>

      {/* Hero Header Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Title & Key Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271d0e] border border-[#ffa000]/40 text-[#ffa000] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authentic Traditional Garba (World's Largest Garba Circle - 40,000+ Dancers)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            United Way of Baroda Navratri Mahotsav <span className="text-[#ffa000]">2025</span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#ffa000]" />
              <span>Navlakhi Ground, Rajmahal Road, Vadodara (Express Shuttle from Nehrunagar, Ahmedabad)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#00e3fd]" />
              <span>Oct 11 – Oct 19, 2025 (All 9 Nights)</span>
            </div>
          </div>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="bg-[#17181f] border border-[#2a2b35] p-3 rounded-xl">
              <div className="text-lg sm:text-xl font-black text-[#ffa000] font-display">40,000+</div>
              <div className="text-[11px] text-stone-400">Simultaneous Revelers</div>
            </div>

            <div className="bg-[#17181f] border border-[#2a2b35] p-3 rounded-xl">
              <div className="text-lg sm:text-xl font-black text-[#00e3fd] font-display">360° Round</div>
              <div className="text-[11px] text-stone-400">Center Stage Deck</div>
            </div>

            <div className="bg-[#17181f] border border-[#2a2b35] p-3 rounded-xl">
              <div className="text-lg sm:text-xl font-black text-white font-display">RFID Pass</div>
              <div className="text-[11px] text-stone-400">NFC Quick-Tap Entry</div>
            </div>
          </div>
        </div>

        {/* Right Side: Headliner Maestro Card */}
        <div className="lg:col-span-5 bg-[#17181f] border border-[#2c2d38] rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#24252f] shrink-0 border border-[#ffa000]/40 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=300&q=80"
                alt="Atul Purohit"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#ffa000]">
                HEADLINER & LEAD MAESTRO
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">Atul Purohit</h2>
              <div className="text-xs text-stone-400 font-medium">& The United Way Orchestra</div>
              <div className="flex items-center gap-1 text-[11px] text-[#ffa000] font-semibold pt-1">
                <span>★</span>
                <span>Living Garba Legend • 32 Years at Navlakhi</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-300 mt-4 leading-relaxed line-clamp-3">
            Known for divine renditions of <strong className="text-white">"Tara Vina Shyam"</strong> and electrifying 3-tali folk compositions that set the world's most disciplined garba rhythm year after year.
          </p>

          <div className="mt-4 pt-3 border-t border-[#252631] space-y-1.5 text-xs text-stone-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-[#00e3fd]" />
                Daily Set Timings:
              </span>
              <span className="font-bold text-[#ffc788]">8:30 PM – 1:30 AM</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-400">
                <span>👘</span>
                Mandatory Dress:
              </span>
              <span className="font-semibold text-white">Chaniya Choli / Kurta Kedia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Grid: Left Tiers + Right Booking Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Left Column: Access Tiers */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffa000]">
                <span className="w-2 h-2 rounded-full bg-[#ffa000]"></span>
                BOOKMYSHOW INTEGRATED SYSTEM
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                Select Passes & Access Tiers
              </h2>
            </div>
            <div className="text-xs text-stone-400 max-w-xs text-left sm:text-right">
              Instant barcode confirmation on SMS & WhatsApp. Collect physical NFC wristbands at Navlakhi Gate 1 & 3 kiosk counters anytime before 7:00 PM.
            </div>
          </div>

          {/* Tier Cards List */}
          <div className="space-y-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-[#17181f] border rounded-2xl p-5 transition-all duration-300 ${
                  tier.quantity > 0
                    ? 'border-[#ffa000] shadow-xl shadow-[#ffa000]/10'
                    : tier.isBestValue
                    ? 'border-[#ffa000]/60'
                    : 'border-[#282933] hover:border-[#3d3f4e]'
                }`}
              >
                {/* Best Value Pill */}
                {tier.isBestValue && (
                  <div className="absolute -top-3 left-6 bg-[#ffa000] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                    BEST VALUE • SAVE 17%
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Side Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        tier.isBestValue ? 'bg-[#ff4d4f] text-white' : 'bg-[#22232c] text-[#00e3fd]'
                      }`}>
                        {tier.tag}
                      </span>
                      <span className="text-xs font-bold text-stone-300">
                        {tier.gate}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">
                      {tier.name}
                    </h3>

                    <p className="text-xs text-stone-400 leading-relaxed max-w-md">
                      {tier.description}
                    </p>

                    {/* Pricing notes */}
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#ffc788] font-display">
                        ₹{tier.price.toLocaleString('en-IN')}
                      </span>
                      {tier.originalPrice && (
                        <span className="text-xs text-stone-500 line-through">
                          ₹{tier.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {tier.pricingNote && (
                        <span className="text-xs text-[#00e3fd] font-medium">
                          {tier.pricingNote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 bg-[#111216] border border-[#2b2c37] p-1.5 rounded-xl self-start sm:self-center shrink-0">
                    <button
                      onClick={() => onUpdateTierQuantity(tier.id, -1)}
                      disabled={tier.quantity === 0}
                      className="w-8 h-8 rounded-lg bg-[#1f2027] hover:bg-[#2c2d38] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-8 text-center text-base font-extrabold text-white font-display">
                      {tier.quantity}
                    </span>

                    <button
                      onClick={() => onUpdateTierQuantity(tier.id, 1)}
                      className="w-8 h-8 rounded-lg bg-[#ffa000] hover:bg-[#ffb865] flex items-center justify-center text-black font-bold transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Booking Summary Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-[#17181f] border border-[#282933] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#252630]">
              <h3 className="text-lg font-bold text-white">Booking Summary</h3>
              <span className="px-2 py-0.5 rounded bg-[#ffa000] text-black text-[10px] font-black uppercase">
                LIVE FARE
              </span>
            </div>

            {/* Passes Breakdown */}
            <div className="space-y-2.5 text-xs">
              {tiers.filter((t) => t.quantity > 0).length === 0 ? (
                <div className="text-stone-400 py-3 text-center border border-dashed border-[#282933] rounded-xl">
                  No passes selected yet. Choose a tier to continue.
                </div>
              ) : (
                tiers
                  .filter((t) => t.quantity > 0)
                  .map((tier) => (
                    <div key={tier.id} className="flex items-center justify-between text-stone-300">
                      <span>{tier.name} x {tier.quantity}</span>
                      <span className="font-semibold text-white">
                        ₹{(tier.price * tier.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))
              )}
            </div>

            {/* Add Vehicle Parking Toggle */}
            <div className="p-3.5 rounded-xl bg-[#121317] border border-[#282933] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0e222a] border border-[#00e3fd]/40 flex items-center justify-center text-[#00e3fd] font-bold text-sm">
                  P
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Add Vehicle Parking</div>
                  <div className="text-[11px] text-stone-400">Reserved Zone B spot</div>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => onUpdateBooking({ withParking: !bookingState.withParking })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  bookingState.withParking ? 'bg-[#00e3fd]' : 'bg-[#292a34]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    bookingState.withParking ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Promotional Voucher Input */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Promotional Voucher
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try GARBA20 or NAVDUO"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="flex-1 bg-[#121317] border border-[#2b2c37] rounded-lg px-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-stone-500 focus:outline-none focus:border-[#ffa000]"
                />
                <button
                  onClick={() => handleApplyVoucher()}
                  className="px-4 py-2 bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>

              {voucherError && (
                <div className="text-[11px] text-[#ff4d4f]">{voucherError}</div>
              )}
              {voucherSuccess && (
                <div className="text-[11px] text-[#00e3fd]">{voucherSuccess}</div>
              )}

              {/* Quick voucher chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {Object.entries(PROMO_CODES).map(([code, details]) => (
                  <button
                    key={code}
                    onClick={() => handleApplyVoucher(code)}
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold transition-colors border ${
                      bookingState.appliedPromo === code
                        ? 'bg-[#ffa000]/20 border-[#ffa000] text-[#ffa000]'
                        : 'bg-[#1b1c23] border-[#292a35] text-stone-300 hover:text-white'
                    }`}
                  >
                    {details.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Items & Total */}
            <div className="space-y-2 pt-3 border-t border-[#252630] text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span>Subtotal</span>
                <span>₹{passesSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {bookingState.withParking && (
                <div className="flex items-center justify-between text-stone-400">
                  <span>Reserved Vehicle Parking (Zone B)</span>
                  <span>₹150</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-[#00e3fd]">
                  <span>Promo Discount ({bookingState.appliedPromo})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-stone-400">
                <span>Convenience Fee & Taxes</span>
                <span>₹{convenienceFee}</span>
              </div>

              {/* Total Payable */}
              <div className="flex items-baseline justify-between pt-3 border-t border-[#252630]">
                <span className="text-sm font-bold text-white">Total Payable</span>
                <span className="text-2xl font-black text-[#ffa000] font-display">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Main Action Proceed Button */}
            <button
              onClick={onProceedToCheckout}
              disabled={totalPassCount === 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ffa000] to-[#ffb865] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-[#ffa000]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Add Passes to Cart • Proceed</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
              <Lock className="w-3 h-3 text-[#00e3fd]" />
              <span>256-Bit Encrypted • 100% Verified Entry</span>
            </div>

            {/* Strict Dress Code Warning */}
            <div className="p-3 rounded-xl bg-[#231713] border border-[#ff4d4f]/30 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#ff4d4f] shrink-0 mt-0.5" />
              <div className="text-[11px] text-stone-300 leading-relaxed">
                <strong className="text-white">Strict Dress Code Advisory:</strong> Western wear is not allowed inside the dance ring by order of Baroda cultural trust. Casual footwear must be deposited at baggage lockers.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Navlakhi Interactive Arena Blueprint */}
      <InteractiveMap onReserveParkingClick={onNavigateToParking} />
    </div>
  );
};
