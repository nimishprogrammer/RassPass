import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Utensils, 
  Wrench, 
  Droplet, 
  HeartPulse, 
  Lock, 
  Bus, 
  Zap, 
  Car, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface InteractiveMapProps {
  onReserveParkingClick: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onReserveParkingClick }) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'gates' | 'parking'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className="mt-16 pt-8 border-t border-[#292a2e]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#00e3fd] text-xs font-semibold tracking-wider uppercase mb-1">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Grounds Blueprint & Facilities Navigation</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Interactive Navlakhi Arena Map
          </h2>
        </div>

        <button
          onClick={onReserveParkingClick}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1f2025] hover:bg-[#292a2e] border border-[#38393d] text-[#00e3fd] hover:text-white transition-all text-xs font-semibold tracking-wide"
        >
          <Car className="w-4 h-4 text-[#00e3fd]" />
          <span>Reserve Parking Slot</span>
        </button>
      </div>

      {/* Main Grid: Map Visual + Radar & Transit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-[#17181c] border border-[#2a2b32] rounded-2xl p-4 md:p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Top Bar inside Map */}
          <div className="flex items-center justify-between pb-4 border-b border-[#24252b] z-10">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffa000] animate-pulse"></span>
              <span className="font-medium text-stone-200">Central Dance Ring Active • 40k Capacity</span>
            </div>

            {/* Layer Filter Tabs */}
            <div className="flex items-center bg-[#101114] p-1 rounded-lg border border-[#25262c] text-xs">
              <button
                onClick={() => setActiveLayer('all')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeLayer === 'all'
                    ? 'bg-[#00e3fd] text-black font-semibold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                All Layers
              </button>
              <button
                onClick={() => setActiveLayer('gates')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeLayer === 'gates'
                    ? 'bg-[#00e3fd] text-black font-semibold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Gates Only
              </button>
              <button
                onClick={() => setActiveLayer('parking')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeLayer === 'parking'
                    ? 'bg-[#00e3fd] text-black font-semibold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Parking Zones
              </button>
            </div>
          </div>

          {/* SVG Arena Blueprint Canvas */}
          <div className="relative w-full h-[380px] md:h-[450px] my-3 rounded-xl bg-[#0f1013] border border-[#1e1f24] overflow-hidden select-none">
            {/* Ambient Background Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
              <defs>
                <pattern id="arenaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#343439" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#arenaGrid)" />
            </svg>

            {/* Roadway indicator top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase font-semibold text-stone-500 bg-[#16171b]/80 px-4 py-1 rounded-full border border-stone-800">
              Rajmahal Palace Roadway • Main Access
            </div>

            {/* SVG Content */}
            <svg viewBox="0 0 800 500" className="w-full h-full">
              {/* Perimeter Boundary */}
              <rect x="40" y="40" width="720" height="420" rx="20" fill="none" stroke="#25262c" strokeWidth="2" strokeDasharray="6 6" />

              {/* VIP Pavilion Box */}
              {(activeLayer === 'all' || activeLayer === 'gates') && (
                <g 
                  className="cursor-pointer transition-opacity" 
                  onMouseEnter={() => setHoveredPoint('VIP AC Pavilion')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <rect x="180" y="70" width="130" height="35" rx="6" fill="#00363d" stroke="#00e3fd" strokeWidth="1.2" opacity="0.8" />
                  <text x="245" y="92" textAnchor="middle" fill="#00e3fd" fontSize="10" fontWeight="bold">VIP AC PAVILION & LOUNGE</text>
                </g>
              )}

              {/* Gate 1 General */}
              {(activeLayer === 'all' || activeLayer === 'gates') && (
                <g 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Gate #1 General Access - North Entrance')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx="140" cy="70" r="10" fill="#ffa000" />
                  <circle cx="140" cy="70" r="18" fill="#ffa000" opacity="0.2" className="animate-ping" />
                  <rect x="95" y="42" width="90" height="20" rx="4" fill="#292000" stroke="#ffa000" strokeWidth="1" />
                  <text x="140" y="56" textAnchor="middle" fill="#ffc788" fontSize="10" fontWeight="bold">GATE 1 • GENERAL</text>
                </g>
              )}

              {/* Gate 2 VIP Lounge */}
              {(activeLayer === 'all' || activeLayer === 'gates') && (
                <g 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Gate #2 VIP Dedicated Turnstiles')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx="400" cy="70" r="10" fill="#00e3fd" />
                  <rect x="350" y="42" width="100" height="20" rx="4" fill="#002b30" stroke="#00e3fd" strokeWidth="1" />
                  <text x="400" y="56" textAnchor="middle" fill="#00e3fd" fontSize="10" fontWeight="bold">GATE 2 • VIP LOUNGE</text>
                </g>
              )}

              {/* Gate 3 Season Passes (West) */}
              {(activeLayer === 'all' || activeLayer === 'gates') && (
                <g 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Gate #3 Season Pass Fast-Track Turnstile')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx="55" cy="300" r="8" fill="#ff5252" />
                  <text x="55" y="340" textAnchor="middle" fill="#ff8a80" fontSize="9" fontWeight="bold" transform="rotate(-90 55 340)">GATE 3 • SEASON PASSES</text>
                </g>
              )}

              {/* Concentric Dance Rings */}
              {activeLayer !== 'parking' && (
                <g>
                  {/* Outer ring */}
                  <circle cx="310" cy="270" r="160" fill="none" stroke="#38393d" strokeWidth="1.5" strokeDasharray="5 5" />
                  {/* Middle ring */}
                  <circle cx="310" cy="270" r="120" fill="#15161c" stroke="#ffb865" strokeWidth="1.2" opacity="0.3" />
                  <circle cx="310" cy="270" r="120" fill="none" stroke="#ffa000" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                  {/* Inner ring */}
                  <circle cx="310" cy="270" r="80" fill="none" stroke="#ffa000" strokeWidth="1.5" />
                  
                  {/* Label: Main Garba Circle */}
                  <text x="310" y="165" textAnchor="middle" fill="#d9c3ad" fontSize="11" fontWeight="bold" letterSpacing="0.05em">
                    MAIN GARBA CIRCLE • 40,000 DANCERS
                  </text>
                  
                  {/* Center Stage 360 Deck */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Atul Purohit 360° Center Revolving Stage')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle cx="310" cy="270" r="48" fill="#ffa000" opacity="0.15" />
                    <circle cx="310" cy="270" r="42" fill="#ffb865" />
                    <circle cx="310" cy="270" r="38" fill="#ffa000" />
                    <text x="310" y="265" textAnchor="middle" fill="#2b1700" fontSize="11" fontWeight="800">ATUL PUROHIT</text>
                    <text x="310" y="278" textAnchor="middle" fill="#2b1700" fontSize="8" fontWeight="bold">360° STAGE DECK</text>
                  </g>
                </g>
              )}

              {/* Parking Zones (Right Side) */}
              {(activeLayer === 'all' || activeLayer === 'parking') && (
                <g>
                  {/* Zone A */}
                  <g 
                    className="cursor-pointer"
                    onClick={onReserveParkingClick}
                    onMouseEnter={() => setHoveredPoint('Parking Zone A: VIP & Valet Bay, Fast NFC Access')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <rect x="520" y="90" width="160" height="52" rx="8" fill="#13272d" stroke="#00e3fd" strokeWidth="1.2" />
                    <text x="600" y="112" textAnchor="middle" fill="#00e3fd" fontSize="11" fontWeight="bold">PARKING ZONE A</text>
                    <text x="600" y="126" textAnchor="middle" fill="#bdf4ff" fontSize="9">VIP & Valet Bay</text>
                    <text x="600" y="136" textAnchor="middle" fill="#00e3fd" fontSize="8" fontWeight="600">Fast NFC Access</text>
                  </g>

                  {/* Zone B */}
                  <g 
                    className="cursor-pointer"
                    onClick={onReserveParkingClick}
                    onMouseEnter={() => setHoveredPoint('Parking Zone B: Multi-Level Covered 4-Wheeler Car Park (₹150)')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <rect x="520" y="165" width="160" height="55" rx="8" fill="#2c220f" stroke="#ffa000" strokeWidth="1.5" />
                    <text x="600" y="188" textAnchor="middle" fill="#ffa000" fontSize="11" fontWeight="bold">PARKING ZONE B</text>
                    <text x="600" y="202" textAnchor="middle" fill="#ffc788" fontSize="9">4-Wheeler Car Park</text>
                    <text x="600" y="213" textAnchor="middle" fill="#ffb865" fontSize="8" fontWeight="bold">₹150 / slot • 80% Full</text>
                  </g>

                  {/* Zone C */}
                  <g 
                    className="cursor-pointer"
                    onClick={onReserveParkingClick}
                    onMouseEnter={() => setHoveredPoint('Parking Zone C: 2-Wheeler & Bikes Field (₹50)')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <rect x="520" y="240" width="160" height="52" rx="8" fill="#16181d" stroke="#484a54" strokeWidth="1.2" />
                    <text x="600" y="262" textAnchor="middle" fill="#e3e2e7" fontSize="11" fontWeight="bold">PARKING ZONE C</text>
                    <text x="600" y="276" textAnchor="middle" fill="#9e9ea7" fontSize="9">2-Wheeler & Bikes</text>
                    <text x="600" y="286" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">Available • ₹50</text>
                  </g>
                </g>
              )}

              {/* On-Site Facilities Dots */}
              {activeLayer === 'all' && (
                <g>
                  {/* First Aid */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Paramedic First Aid & Ambulance Post')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle cx="110" cy="190" r="14" fill="#e11d48" />
                    <text x="110" y="194" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">+</text>
                    <text x="110" y="216" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="600">First Aid</text>
                  </g>

                  {/* Free Water */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Free RO Chilled Drinking Water Station')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle cx="440" cy="215" r="12" fill="#0284c7" />
                    <circle cx="440" cy="215" r="8" fill="#38bdf8" />
                    <text x="440" y="238" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontWeight="600">Free Water</text>
                  </g>

                  {/* Dandiya Kiosk */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Dandiya Rental & Grip Taping Kiosk')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle cx="110" cy="360" r="14" fill="#d97706" />
                    <text x="110" y="364" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">✕</text>
                    <text x="110" y="386" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="600">Dandiya Kiosk</text>
                  </g>

                  {/* Lockers & Cloakroom */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Lockers & Cloakroom (Chaniya Choli & Footwear Desk)')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <rect x="140" y="405" width="130" height="28" rx="5" fill="#1c2536" stroke="#3b82f6" strokeWidth="1" />
                    <text x="205" y="420" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">LOCKERS & CLOAKROOM</text>
                    <text x="205" y="429" textAnchor="middle" fill="#bfdbfe" fontSize="7">Chaniya Choli & Footwear Desk</text>
                  </g>

                  {/* Restrooms */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Hygienic Restroom Facilities')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle cx="310" cy="415" r="12" fill="#2d3748" />
                    <text x="310" y="419" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">WC</text>
                    <text x="310" y="437" textAnchor="middle" fill="#94a3b8" fontSize="7">Restrooms</text>
                  </g>

                  {/* Food Court */}
                  <g 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint('Food Court & Chaat Street (28 Swaminarayan & Jain Stalls)')}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <rect x="395" y="405" width="140" height="28" rx="5" fill="#2a1f10" stroke="#f59e0b" strokeWidth="1" />
                    <text x="465" y="420" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">FOOD COURT & CHAAT ST.</text>
                    <text x="465" y="429" textAnchor="middle" fill="#fef3c7" fontSize="7">28 Swaminarayan & Jain Stalls</text>
                  </g>
                </g>
              )}
            </svg>

            {/* Hover Tooltip display */}
            {hoveredPoint && (
              <div className="absolute bottom-4 left-4 right-4 bg-[#1f2025]/95 border border-[#38393d] p-2.5 rounded-lg text-xs text-white shadow-xl flex items-center justify-between pointer-events-none backdrop-blur-sm">
                <span className="font-semibold text-[#ffc788]">{hoveredPoint}</span>
                <span className="text-[10px] text-stone-400">Click or tap to view details</span>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2 border-t border-[#24252b]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffa000]"></span>
              <span>Central 360° Stage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e3fd]"></span>
              <span>VIP Lounge & Gate 2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5252]"></span>
              <span>Season Holders (Gate 3)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64748b]"></span>
              <span>Facilities & Stalls</span>
            </div>
          </div>
        </div>

        {/* Right Column: Facilities Radar & Transit */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Radar Facilities Card */}
          <div className="bg-[#17181c] border border-[#2a2b32] rounded-2xl p-5 shadow-lg">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e3fd]"></span>
              On-Site Facilities Radar
            </h3>

            <div className="space-y-4">
              {/* Facility Item 1 */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#241c0f] text-[#ffa000] border border-[#3d2c14] shrink-0 mt-0.5">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Food Court & Chaat Street</div>
                  <div className="text-[11px] text-stone-400 leading-relaxed">
                    28 verified FSSAI stalls serving Kathiyawadi, Jain snacks, tea, and fresh sugarcane juice.
                  </div>
                </div>
              </div>

              {/* Facility Item 2 */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#201d18] text-[#ffc788] border border-[#363025] shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Dandiya Rental & Repair</div>
                  <div className="text-[11px] text-stone-400 leading-relaxed">
                    Instant wooden/metal stick repairs, grip taping, and emergency brass pair rentals (₹100).
                  </div>
                </div>
              </div>

              {/* Facility Item 3 */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#0c2229] text-[#00e3fd] border border-[#163a44] shrink-0 mt-0.5">
                  <Droplet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Drinking Water Stations</div>
                  <div className="text-[11px] text-stone-400 leading-relaxed">
                    6 RO filtered chilled water hubs stationed evenly along the outer dance ring.
                  </div>
                </div>
              </div>

              {/* Facility Item 4 */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#2d1217] text-[#ff6b81] border border-[#481c25] shrink-0 mt-0.5">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">First Aid & Ambulance Bay</div>
                  <div className="text-[11px] text-stone-400 leading-relaxed">
                    24/7 Paramedics, ice compression packs for ankle sprains, and dedicated emergency exit.
                  </div>
                </div>
              </div>

              {/* Facility Item 5 */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#151c28] text-[#60a5fa] border border-[#233247] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Lockers & Baggage Counter</div>
                  <div className="text-[11px] text-stone-400 leading-relaxed">
                    Secure cloakroom for handbags and mobile devices near Gate 1 & 3. Token-based retrieval.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transit & Ground Access Card */}
          <div className="bg-[#17181c] border border-[#2a2b32] rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
              Transit & Ground Access
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#24252b]">
                <div className="flex items-center gap-2 text-stone-400">
                  <Bus className="w-3.5 h-3.5 text-[#00e3fd]" />
                  <span>Nearest City Bus Stop</span>
                </div>
                <span className="font-medium text-white">Rajmahal Gate (150m)</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#24252b]">
                <div className="flex items-center gap-2 text-stone-400">
                  <Zap className="w-3.5 h-3.5 text-[#ffa000]" />
                  <span>Free Electric Shuttles</span>
                </div>
                <span className="font-medium text-white">Every 10 min from Railway Stn</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-stone-400">
                  <Car className="w-3.5 h-3.5 text-[#00e3fd]" />
                  <span>Ola / Uber Drop Bay</span>
                </div>
                <span className="font-medium text-white">Dedicated North Entrance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Parking Upsell Banner matching image 1 */}
      <div className="mt-6 p-4 md:p-5 rounded-xl bg-[#17181c] border border-[#2a2b32] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#11242d] border border-[#00e3fd]/40 flex items-center justify-center shrink-0">
            <span className="text-xl font-black text-[#00e3fd]">P</span>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#00e3fd]">Fast Lane RFID Entry</div>
            <div className="text-base font-bold text-white">Need Vehicle Parking? Add Parking Pass for ₹150</div>
            <div className="text-xs text-stone-400">Avoid 45-minute street jams on Rajmahal Road. Direct barcode tag scanned at Boom Barrier Gate B.</div>
          </div>
        </div>

        <button
          onClick={onReserveParkingClick}
          className="whitespace-nowrap px-6 py-3 rounded-lg bg-[#00e3fd] hover:bg-[#52edff] text-black font-bold text-sm tracking-wide transition-all shadow-md active:scale-95"
        >
          Add Parking (+₹150)
        </button>
      </div>
    </div>
  );
};
