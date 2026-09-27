import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Zap, 
  Award, 
  Radio, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Navigation, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { BookingState } from '../types';
import { PARKING_CATEGORIES, PARKING_ZONES } from '../data/mockData';

interface SmartParkingViewProps {
  bookingState: BookingState;
  onUpdateBooking: (updates: Partial<BookingState>) => void;
  onProceedToCheckout: () => void;
  onBackToPasses: () => void;
}

export const SmartParkingView: React.FC<SmartParkingViewProps> = ({
  bookingState,
  onUpdateBooking,
  onProceedToCheckout,
  onBackToPasses,
}) => {
  const [activeCategory, setActiveCategory] = useState<'4w' | '2w' | 'ev' | 'valet'>(
    bookingState.parkingCategory || '4w'
  );
  const [activeZone, setActiveZone] = useState<'zone-a' | 'zone-b' | 'zone-c'>(
    bookingState.parkingZone || 'zone-b'
  );
  const [arrivalSlot, setArrivalSlot] = useState<string>(
    bookingState.parkingArrivalWindow || '6:30 PM – 8:00 PM'
  );

  // Selected Zone details
  const selectedZoneData = PARKING_ZONES.find((z) => z.id === activeZone) || PARKING_ZONES[1];
  const selectedCategoryData = PARKING_CATEGORIES.find((c) => c.id === activeCategory) || PARKING_CATEGORIES[0];

  const categoryPrice = selectedCategoryData.pricePerNight;
  const baseParkingPrice = selectedZoneData.price;
  const convenienceFee = 20;

  // Add-ons
  const valetAddOn = bookingState.expressValet ? 150 : 0;
  const evChargeAddOn = bookingState.evCharging ? 199 : 0;

  const totalParkingPayable = baseParkingPrice + convenienceFee + valetAddOn + evChargeAddOn;

  const handleProceed = () => {
    onUpdateBooking({
      withParking: true,
      parkingCategory: activeCategory,
      parkingZone: activeZone,
      parkingArrivalWindow: arrivalSlot,
    });
    onProceedToCheckout();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Breadcrumb & Live Auto-Gate Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span>Festivals</span>
          <ChevronRight className="w-3 h-3 text-stone-600" />
          <span>Ahmedabad & Vadodara Arena</span>
          <ChevronRight className="w-3 h-3 text-stone-600" />
          <span className="text-[#ffa000] font-medium">Smart Parking Pass</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#ff4d4f] px-2.5 py-0.5 rounded shadow">
            HIGH DEMAND NIGHT
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#00e3fd] bg-[#0c242c] px-3 py-1 rounded-full border border-[#00e3fd]/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            FastTag RFID Auto-Gate
          </span>
        </div>
      </div>

      {/* Main Title & Live Bay Gauge Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-[#24252f]">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Reserve Vehicle Slot at Navlakhi Ground
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#ffa000]" />
              <span>Navlakhi Ground, Vadodara</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-[#00e3fd]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>United Way Navratri (Night 4 – Shasti Special)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Calendar className="w-4 h-4 text-[#ffc788]" />
              <span>Friday, Oct 6</span>
            </div>
          </div>
        </div>

        {/* Live Slot Counter Radial Pill */}
        <div className="bg-[#17181f] border border-[#2b2c37] p-3.5 rounded-2xl flex items-center gap-4 shrink-0 shadow-xl">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* SVG circular progress */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2a2b35"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ff4d4f"
                strokeWidth="3.5"
                strokeDasharray="77, 100"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-white">77%</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff4d4f] animate-ping"></span>
              <span className="text-sm font-bold text-white">420 Slots Left</span>
            </div>
            <div className="text-[11px] text-stone-400">1,850 Total Bays • Critical surge past 7:30 PM</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Configuration (Steps 1, 2, 3, Addons) + Right Digital Parking Stub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Select Vehicle Category */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffa000] text-black font-extrabold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-white">Select Vehicle Category</h3>
              </div>
              <span className="text-xs text-stone-400">All-night security included</span>
            </div>
            <p className="text-xs text-stone-400">Bespoke ingress ramps configured for your carriage type</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PARKING_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#201d18] border-[#ffa000] shadow-md shadow-[#ffa000]/10'
                        : 'bg-[#121317] border-[#292a35] hover:border-[#383a48]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-[#ffa000]">
                        <CheckCircle2 className="w-4 h-4 fill-[#ffa000] text-black" />
                      </div>
                    )}

                    <div className="mb-2 text-stone-300">
                      {cat.id === '4w' && <Car className="w-5 h-5 text-[#ffa000]" />}
                      {cat.id === '2w' && <Bike className="w-5 h-5 text-stone-400" />}
                      {cat.id === 'ev' && <Zap className="w-5 h-5 text-[#00e3fd]" />}
                      {cat.id === 'valet' && <Award className="w-5 h-5 text-[#ffc788]" />}
                    </div>

                    <div className="text-xs font-bold text-white leading-tight">{cat.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{cat.description}</div>

                    <div className="mt-3 pt-2 border-t border-[#252631]">
                      <span className="text-sm font-extrabold text-[#ffc788] font-display">
                        ₹{cat.pricePerNight}
                      </span>
                      <span className="text-[10px] text-stone-400"> / night</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Parking Zone & Proximity */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffa000] text-black font-extrabold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-white">Select Parking Zone & Proximity</h3>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a232b] text-[#00e3fd] text-[11px] font-semibold border border-[#00e3fd]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] animate-ping"></span>
                <span>Real-time gate sensors</span>
              </div>
            </div>
            <p className="text-xs text-stone-400">Live telemetry synchronized with fairground turnstiles</p>

            {/* Zones List */}
            <div className="space-y-3">
              {PARKING_ZONES.map((zone) => {
                const isSelected = activeZone === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(zone.id)}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1d1e26] border-[#ffa000] shadow-lg shadow-[#ffa000]/10'
                        : 'bg-[#121317] border-[#292a35] hover:border-[#383a48]'
                    }`}
                  >
                    {/* Recommended Pill */}
                    {zone.isRecommended && (
                      <div className="absolute -top-2.5 right-6 bg-[#ffa000] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        RECOMMENDED & COVERED
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isSelected ? 'bg-[#ffa000] text-black' : 'bg-[#21222c] text-stone-300'
                        }`}>
                          {zone.code}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{zone.name}</span>
                            <span className="text-[11px] text-[#00e3fd] bg-[#0c242c] px-2 py-0.2 rounded font-medium">
                              {zone.proximity}
                            </span>
                            {zone.tag && (
                              <span className="text-[10px] text-[#ff4d4f] font-semibold">
                                {zone.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-400 mt-1">{zone.features}</div>
                        </div>
                      </div>

                      {/* Right: Price & Capacity Bar */}
                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-lg font-black text-[#ffc788] font-display">
                          ₹{zone.price}
                        </div>

                        {/* Fill bar */}
                        <div className="w-24 h-1.5 rounded-full bg-[#292a35] mt-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              zone.fillPercentage > 80 ? 'bg-[#ff4d4f]' : zone.fillPercentage > 50 ? 'bg-[#ffa000]' : 'bg-[#00e3fd]'
                            }`}
                            style={{ width: `${zone.fillPercentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-stone-500 mt-0.5 block">
                          {zone.fillPercentage}% full
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Vehicle Registration & Arrival Slot */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#ffa000] text-black font-extrabold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-white">Vehicle Registration & Arrival Slot</h3>
            </div>
            <p className="text-xs text-stone-400">Pre-authorization enables contactless boom barrier opening</p>

            {/* Estimated Arrival Window Chips */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Estimated Arrival Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { time: '6:30 PM – 8:00 PM', tag: 'Recommended • Zero Delay', isBest: true },
                  { time: '8:00 PM – 9:30 PM', tag: 'Peak Traffic • 10m queue', isPeak: true },
                  { time: 'Post 9:30 PM', tag: 'Late Garba Ingress' },
                ].map((slot) => {
                  const isSelected = arrivalSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => setArrivalSlot(slot.time)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#241c0f] border-[#ffa000] shadow'
                          : 'bg-[#121317] border-[#292a35] hover:border-[#383a48]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{slot.time}</span>
                        {slot.isBest && <CheckCircle2 className="w-3.5 h-3.5 text-[#ffa000]" />}
                        {slot.isPeak && <span className="text-[#ff4d4f] text-xs">⏳</span>}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1">{slot.tag}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* License Plate & Driver Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  License Plate Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-stone-400">
                    <Car className="w-4 h-4 text-[#ffa000]" />
                  </div>
                  <input
                    type="text"
                    value={bookingState.licensePlate}
                    onChange={(e) => onUpdateBooking({ licensePlate: e.target.value.toUpperCase() })}
                    placeholder="GJ-06-AB-4092"
                    className="w-full bg-[#121317] border border-[#2e2f3b] rounded-lg pl-9 pr-3 py-2 text-xs font-bold font-mono tracking-wider text-white uppercase placeholder:text-stone-600 focus:outline-none focus:border-[#ffa000]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Driver Mobile Contact
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-stone-400">
                    <span className="text-xs text-[#00e3fd]">📱</span>
                  </div>
                  <input
                    type="tel"
                    value={bookingState.driverPhone}
                    onChange={(e) => onUpdateBooking({ driverPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#121317] border border-[#2e2f3b] rounded-lg pl-9 pr-3 py-2 text-xs font-medium text-white placeholder:text-stone-600 focus:outline-none focus:border-[#ffa000]"
                  />
                </div>
              </div>
            </div>

            {/* Auto-Boom Checkbox */}
            <div className="pt-2 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="autoBoom"
                checked={bookingState.autoBoomEnabled}
                onChange={(e) => onUpdateBooking({ autoBoomEnabled: e.target.checked })}
                className="mt-0.5 rounded border-stone-700 text-[#ffa000] focus:ring-0"
              />
              <label htmlFor="autoBoom" className="text-xs text-stone-300 leading-snug cursor-pointer">
                Enable RFID Auto-Boom entry (no window roll-down needed)
                <span className="block text-[11px] text-stone-500">Direct SMS with parking pass QR & precision pin</span>
              </label>
            </div>
          </div>

          {/* Parking Add-ons & Amenities */}
          <div className="bg-[#17181f] border border-[#282933] rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Parking Add-ons & Amenities</h3>
            <p className="text-xs text-stone-400">Enhance festival night departure velocity and battery health</p>

            <div className="space-y-3">
              {/* Addon 1: Valet */}
              <div
                onClick={() => onUpdateBooking({ expressValet: !bookingState.expressValet })}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  bookingState.expressValet
                    ? 'bg-[#201d18] border-[#ffa000]'
                    : 'bg-[#121317] border-[#292a35] hover:border-[#383a48]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={bookingState.expressValet}
                    onChange={() => {}}
                    className="rounded border-stone-700 text-[#ffa000] pointer-events-none"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Add Express Valet Retrieval</div>
                    <div className="text-[11px] text-stone-400">Car staged and delivered to Gate exit turnaround in under 5 minutes after midnight aarti.</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#ffc788] shrink-0">+₹150</span>
              </div>

              {/* Addon 2: EV Fast Charge */}
              <div
                onClick={() => onUpdateBooking({ evCharging: !bookingState.evCharging })}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  bookingState.evCharging
                    ? 'bg-[#10232a] border-[#00e3fd]'
                    : 'bg-[#121317] border-[#292a35] hover:border-[#383a48]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={bookingState.evCharging}
                    onChange={() => {}}
                    className="rounded border-stone-700 text-[#00e3fd] pointer-events-none"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">EV 60kW DC Fast Charge Session</div>
                    <div className="text-[11px] text-stone-400">Full top-up (up to 80%) supervised by certified technicians while you play garba.</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#00e3fd] shrink-0">+₹199</span>
              </div>
            </div>

            {/* Safety Protocols Footer */}
            <div className="pt-3 border-t border-[#252631]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                FACILITY SAFETY PROTOCOLS
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ffa000]" />
                  <span>24/7 Police Patrol</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>📹</span>
                  <span>CCTV Surveillance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>💡</span>
                  <span>Floodlit Ground</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00e3fd]" />
                  <span>Free Jump-Start</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Digital Parking Stub & FastTag Checkout */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-24 bg-[#17181f] border border-[#282933] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#252630]">
              <h3 className="text-base font-bold text-white">Digital Parking Stub</h3>
              <span className="px-2.5 py-0.5 rounded bg-[#ffa000] text-black text-[10px] font-black uppercase tracking-wider">
                CONFIRMED BAY
              </span>
            </div>

            {/* Yellow Bordered Stub Preview */}
            <div className="p-4 rounded-xl bg-[#121317] border border-[#3b3528] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">SELECTED ZONE</div>
                  <div className="text-xs font-bold text-[#ffa000]">
                    {selectedZoneData.name}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#271d0e] border border-[#ffa000]/40 flex items-center justify-center text-base font-black text-[#ffa000]">
                  P
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#252631]">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">VEHICLE TYPE</div>
                  <div className="font-semibold text-white">{selectedCategoryData.name}</div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">PLATE ID</div>
                  <div className="font-mono font-bold text-[#ffc788]">
                    {bookingState.licensePlate || 'GJ-06-AB-4092'}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span>Covered Car Slot (Night 4)</span>
                <span>₹{baseParkingPrice}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Convenience & RFID Gate Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              {valetAddOn > 0 && (
                <div className="flex items-center justify-between text-stone-300">
                  <span>Express Valet Retrieval</span>
                  <span>+₹{valetAddOn}</span>
                </div>
              )}
              {evChargeAddOn > 0 && (
                <div className="flex items-center justify-between text-stone-300">
                  <span>EV DC Fast Charge Session</span>
                  <span>+₹{evChargeAddOn}</span>
                </div>
              )}

              {/* Total Payable */}
              <div className="pt-3 border-t border-[#252630] flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Total Payable</span>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#ffa000] font-display">
                    ₹{totalParkingPayable}
                  </div>
                  <span className="text-[10px] text-stone-400 flex items-center justify-end gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#00e3fd]" />
                    Tax Inclusive
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleProceed}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ffa000] to-[#ffb865] hover:brightness-110 text-black font-extrabold text-xs tracking-wide transition-all shadow-lg shadow-[#ffa000]/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to FastTag Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBackToPasses}
                className="w-full py-2.5 rounded-xl bg-[#1b1c24] hover:bg-[#252631] text-stone-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#2b2c39]"
              >
                <span>🎫</span>
                <span>Link with My Event Pass</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
              <Lock className="w-3 h-3 text-stone-400" />
              <span>100% Refundable up to 2 hours before event</span>
            </div>

            {/* Navigation guidance prompt */}
            <div className="p-3.5 rounded-xl bg-[#131b24] border border-[#1e3444] flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#0e2733] text-[#00e3fd] shrink-0 mt-0.5">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Need Navigation Guidance?</div>
                <div className="text-[11px] text-stone-400 leading-relaxed mt-0.5">
                  Exclusive Police-approved corridor routes will open in Google Maps via SMS.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
