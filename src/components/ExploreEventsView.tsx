import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Ticket, 
  Mic2, 
  Car, 
  Radio, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Check,
  Zap,
  Clock,
  Compass
} from 'lucide-react';
import { FESTIVAL_DATES, HEADLINERS, GROUND_EVENTS, AHMEDABAD_AREAS, CITY_AREAS } from '../data/mockData';
import { GroundPassEvent, Headliner } from '../types';
import { AhmedabadGoogleMap } from './AhmedabadGoogleMap';
import { GarbaKaleidoscopeHero } from './GarbaKaleidoscopeHero';

interface ExploreEventsViewProps {
  onSelectEvent: (eventId: string) => void;
  onGoToParking: () => void;
  selectedCity: string;
}

export const ExploreEventsView: React.FC<ExploreEventsViewProps> = ({
  onSelectEvent,
  onGoToParking,
  selectedCity,
}) => {
  const [selectedDateId, setSelectedDateId] = useState('all-9');
  const currentAreas = CITY_AREAS[selectedCity] || AHMEDABAD_AREAS;
  const [selectedArea, setSelectedArea] = useState(currentAreas[0] || 'All Gujarat');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [activeFacility, setActiveFacility] = useState<string | null>(null);
  const [headlinerIndex, setHeadlinerIndex] = useState(0);
  const [selectedMapEventId, setSelectedMapEventId] = useState<string | null>(GROUND_EVENTS[0].id);

  // Sync selected area when city changes
  React.useEffect(() => {
    const areas = CITY_AREAS[selectedCity] || AHMEDABAD_AREAS;
    setSelectedArea(areas[0] || 'All');
  }, [selectedCity]);

  // Filter events based on criteria + Gujarat statewide or city focus
  const filteredEvents = GROUND_EVENTS.filter((event) => {
    if (selectedCity !== 'All Gujarat' && event.city && event.city !== selectedCity) {
      return false;
    }
    if (!selectedArea.startsWith('All') && event.area !== selectedArea && event.city !== selectedArea) {
      return false;
    }
    if (selectedStyle !== 'all') {
      if (selectedStyle === 'traditional' && event.category !== 'traditional') return false;
      if (selectedStyle === 'heritage' && event.category !== 'heritage') return false;
      if (selectedStyle === 'disco' && event.category !== 'disco' && event.category !== 'edm') return false;
    }
    if (selectedTier === 'free' && !event.isFree) return false;
    if (selectedTier === 'vip' && !event.features.some(f => f.toLowerCase().includes('vip'))) return false;
    return true;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Garba Kaleidoscope Motion Hero with Web Audio Beats */}
      <GarbaKaleidoscopeHero
        onExploreClick={() => {
          const el = document.getElementById('ahmedabad-radar-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAudio={() => {
          // Audio triggered inside hero
        }}
      />

      {/* Hero Sub-section & Locality Selector */}
      <section id="ahmedabad-radar-section" className="relative pt-2 pb-6 overflow-hidden">

        {/* Subtle Decorative Garba Circles Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-10">
          <div className="w-full h-full rounded-full border border-[#ffa000] border-dashed animate-spin-slow"></div>
          <div className="absolute inset-12 rounded-full border border-[#00e3fd] border-dotted"></div>
          <div className="absolute inset-28 rounded-full border border-[#ffa000]/60"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          {/* Official Verification Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1307] border border-[#ffa000]/40 text-[#ffa000] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#ffa000] animate-pulse"></span>
              {selectedCity === 'All Gujarat' ? 'GUJARAT STATEWIDE NAVRATRI 2025' : `${selectedCity.toUpperCase()} NAVRATRI 2025`}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a232b] border border-[#00e3fd]/40 text-[#00e3fd] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Baroda, Ahmedabad, Surat, Rajkot & Gandhinagar RFID Entry
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display max-w-4xl mx-auto leading-tight">
            Experience {selectedCity === 'All Gujarat' ? "Gujarat's" : `${selectedCity}'s`}{' '}
            <span className="text-[#ffa000] drop-shadow-sm">Grandest Navratri 2025</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {selectedCity === 'All Gujarat'
              ? "From Vadodara's 55,000-strong United Way concentric circles to Ahmedabad's GMDC & S.G. Highway spectacles, Surat's luxury AC domes, and Rajkot's authentic Kathiyawadi folk rings. Reserve authenticated contactless RFID bands and guaranteed smart parking."
              : `Explore top verified Navratri arenas, pass tiers, and live gate radar across ${selectedCity}. Instant login-free guest passes with live parking coordinates.`}
          </p>

          {/* Locality Filter Pills */}
          <div className="mt-7">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#00e3fd] mb-2.5 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>EXPLORE BY {selectedCity.toUpperCase()} LOCALITY</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto">
              {currentAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    selectedArea === area
                      ? 'bg-[#00e3fd] text-black shadow-lg shadow-[#00e3fd]/20 scale-105'
                      : 'bg-[#1b1c22] hover:bg-[#25262e] text-stone-300 border border-[#2b2c36]'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Festival Date Selector Tabs */}
          <div className="mt-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2.5">
              SELECT FESTIVAL NIGHT
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {FESTIVAL_DATES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedDateId(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    selectedDateId === item.id
                      ? 'bg-[#ffa000] text-black shadow-lg shadow-[#ffa000]/25 scale-105'
                      : 'bg-[#1b1c22] hover:bg-[#25262e] text-stone-300 border border-[#2b2c36]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Stat Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-4xl mx-auto text-left">
            <div className="bg-[#191a20] border border-[#292a34] rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#271d0e] text-[#ffa000] border border-[#3f2f18]">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-display">85+</div>
                <div className="text-[11px] text-stone-400 font-medium">Ahmedabad Venues</div>
              </div>
            </div>

            <div className="bg-[#191a20] border border-[#292a34] rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#0b242e] text-[#00e3fd] border border-[#163c4a]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#00e3fd] font-display">28,000+</div>
                <div className="text-[11px] text-stone-400 font-medium">Ahmedabad Parking Bays</div>
              </div>
            </div>

            <div className="bg-[#191a20] border border-[#292a34] rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#2b1f14] text-[#ffc788] border border-[#443021]">
                <Mic2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-display">40+</div>
                <div className="text-[11px] text-stone-400 font-medium">Gujarat Maestros</div>
              </div>
            </div>

            <div className="bg-[#191a20] border border-[#292a34] rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#0d2a2d] text-[#00e3fd] border border-[#194b50]">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-display">100%</div>
                <div className="text-[11px] text-stone-400 font-medium">Contactless RFID Entry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Maps Ahmedabad Live Fairgrounds Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AhmedabadGoogleMap
          events={filteredEvents}
          selectedEventId={selectedMapEventId}
          onSelectEvent={(eventId) => setSelectedMapEventId(eventId)}
          onBookPasses={(eventId) => onSelectEvent(eventId)}
        />
      </section>

      {/* Filter Bar Panel */}
      <section className="bg-[#16171d] border border-[#282933] rounded-2xl p-5 max-w-7xl mx-auto shadow-xl space-y-4">
        {/* Row 1: Garba Style */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 w-28 shrink-0">
            Garba Style
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedStyle('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedStyle === 'all'
                  ? 'bg-[#ffa000] text-black'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              All Styles
            </button>
            <button
              onClick={() => setSelectedStyle('traditional')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedStyle === 'traditional'
                  ? 'bg-[#ffa000] text-black font-semibold'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              • Traditional Ahmedabad Sheri Garba
            </button>
            <button
              onClick={() => setSelectedStyle('heritage')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedStyle === 'heritage'
                  ? 'bg-[#ffa000] text-black font-semibold'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              • GMDC & S.G. Highway Mega Grounds
            </button>
            <button
              onClick={() => setSelectedStyle('disco')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedStyle === 'disco'
                  ? 'bg-[#ffa000] text-black font-semibold'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              • Modern Disco Dandiya & EDM Fusion
            </button>
          </div>
        </div>

        {/* Row 2: Pass Tiers */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-[#23242e]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 w-28 shrink-0">
            Pass Tiers
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTier === 'all'
                  ? 'bg-[#ffa000] text-black'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              All Passes
            </button>
            <button
              onClick={() => setSelectedTier('free')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTier === 'free'
                  ? 'bg-[#ffa000] text-black font-semibold'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              Free Entry / Reg. Only
            </button>
            <button
              onClick={() => setSelectedTier('earlybird')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTier === 'earlybird'
                  ? 'bg-[#ffa000] text-black font-semibold'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              Early Bird from ₹399
            </button>
            <button
              onClick={() => setSelectedTier('vip')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTier === 'vip'
                  ? 'bg-[#ffa000] text-black font-semibold'
                  : 'bg-[#21222a] text-stone-300 hover:text-white border border-[#2f303a]'
              }`}
            >
              👑 VIP Stage Lounge
            </button>
          </div>
        </div>

        {/* Row 3: Facilities */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#23242e]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 w-28 shrink-0">
              Facilities
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setActiveFacility(activeFacility === '4w' ? null : '4w')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                  activeFacility === '4w'
                    ? 'bg-[#00e3fd]/15 border-[#00e3fd] text-[#00e3fd] font-semibold'
                    : 'bg-[#21222a] border-[#2f303a] text-stone-300 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#00e3fd]" />
                <span>Ahmedabad 4W Smart Parking</span>
              </button>
              <button
                onClick={() => setActiveFacility(activeFacility === 'ev' ? null : 'ev')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                  activeFacility === 'ev'
                    ? 'bg-[#ffa000]/15 border-[#ffa000] text-[#ffa000] font-semibold'
                    : 'bg-[#21222a] border-[#2f303a] text-stone-300 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#ffa000]" />
                <span>Valet & FastTag Hub</span>
              </button>
              <button
                onClick={() => setActiveFacility(activeFacility === 'food' ? null : 'food')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                  activeFacility === 'food'
                    ? 'bg-[#ffa000]/15 border-[#ffa000] text-[#ffa000] font-semibold'
                    : 'bg-[#21222a] border-[#2f303a] text-stone-300 hover:text-white'
                }`}
              >
                <span>🍱</span>
                <span>Swaminarayan & Jain Chaat Stalls</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-stone-400 text-xs shrink-0 self-end sm:self-auto">
            <span className="font-semibold text-stone-200">Viewing {filteredEvents.length} Ahmedabad Venues</span>
            <SlidersHorizontal className="w-4 h-4 text-stone-400" />
          </div>
        </div>
      </section>

      {/* Section 1: Celebrity Artists & Maestro Lineups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffa000] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HEADLINERS PERFORMING IN AHMEDABAD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Celebrity Artists & Maestro Lineups
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setHeadlinerIndex((prev) => Math.max(0, prev - 1))}
              disabled={headlinerIndex === 0}
              className="p-2 rounded-full bg-[#1b1c22] border border-[#2b2c36] text-stone-300 hover:text-white hover:bg-[#25262e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setHeadlinerIndex((prev) => Math.min(HEADLINERS.length - 2, prev + 1))}
              disabled={headlinerIndex >= HEADLINERS.length - 2}
              className="p-2 rounded-full bg-[#1b1c22] border border-[#2b2c36] text-stone-300 hover:text-white hover:bg-[#25262e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Headliner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEADLINERS.map((artist) => (
            <div
              key={artist.id}
              className="group bg-[#17181f] border border-[#282933] rounded-2xl overflow-hidden hover:border-[#ffa000]/60 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#24252e]">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17181f] via-black/40 to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow ${
                    artist.badgeType === 'queen' ? 'bg-[#ff4d4f] text-white' :
                    artist.badgeType === 'maestro' ? 'bg-[#ffa000] text-black' :
                    artist.badgeType === 'chartbuster' ? 'bg-[#fa8c16] text-white' :
                    'bg-[#13c2c2] text-black'
                  }`}>
                    {artist.badge}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] font-bold bg-black/60 backdrop-blur-sm text-stone-200 px-2 py-0.5 rounded border border-white/10">
                    <Clock className="w-3 h-3 text-[#ffa000]" />
                    {artist.dates}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#00e3fd] font-medium mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{artist.location}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#ffa000] transition-colors leading-snug">
                    {artist.name}
                  </h3>

                  <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                    {artist.subtitle}
                  </p>
                </div>

                {/* Pricing & CTA Button */}
                <div className="mt-4 pt-3 border-t border-[#24252e] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">
                      {artist.priceUnit === 'free' ? 'Entry' : artist.priceUnit === 'season' ? 'Season Pass' : 'From'}
                    </span>
                    <span className="text-base font-extrabold text-[#ffc788] font-display">
                      {artist.priceUnit === 'free' ? 'FREE' : `₹${artist.fromPrice.toLocaleString('en-IN')}`}
                      {artist.priceUnit === '/day' && <span className="text-xs font-normal text-stone-400">/day</span>}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (artist.id === 'osman-mir') {
                        onSelectEvent('gmdc-carnival');
                      } else if (artist.id === 'kinjal-aditya') {
                        onSelectEvent('shankus-dandiya');
                      } else {
                        onSelectEvent('united-way');
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold tracking-wide transition-all shadow active:scale-95"
                  >
                    Book Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Festival Arena & Ground Passes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00e3fd] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00e3fd] animate-ping"></span>
              <span>{selectedCity === 'All Gujarat' ? 'GUJARAT STATEWIDE' : selectedCity.toUpperCase()} LIVE INVENTORY & TRANSIT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {selectedCity === 'All Gujarat' ? 'Gujarat Statewide' : selectedCity} Festival Arena & Ground Passes
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Digital ticket barcodes instantly sync with Apple & Google Wallet + Google Maps Smart Nav
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-stone-400">Sort by:</span>
            <select className="bg-[#1b1c22] border border-[#2e2f38] text-stone-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#ffa000]">
              <option>{selectedCity} Most Popular</option>
              <option>Price: Low to High</option>
              <option>Capacity: Largest Grounds</option>
              <option>Metro / Transit Connected</option>
            </select>
          </div>
        </div>

        {/* Ground Passes Grid (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ground) => (
            <div
              key={ground.id}
              className="bg-[#17181f] border border-[#282933] rounded-2xl overflow-hidden hover:border-[#ffa000]/60 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Media banner */}
              <div className="relative h-44 w-full bg-[#202129] overflow-hidden">
                <img
                  src={ground.image}
                  alt={ground.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17181f] via-black/40 to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow ${
                    ground.category === 'traditional' ? 'bg-[#ffa000] text-black' :
                    ground.category === 'carnival' ? 'bg-[#00e3fd] text-black' :
                    ground.category === 'disco' ? 'bg-[#ff4d4f] text-white' :
                    ground.category === 'folk' ? 'bg-[#eab308] text-black' :
                    ground.category === 'edm' ? 'bg-[#ec4899] text-white' :
                    'bg-[#10b981] text-black'
                  }`}>
                    {ground.tag}
                  </span>

                  {ground.subtag && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-[#ffa000] border border-[#ffa000]/30 backdrop-blur-sm">
                      {ground.subtag}
                    </span>
                  )}
                </div>

                {/* Feature chips inside hero image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="text-[#ffa000]">★</span> {ground.features[0]}
                  </span>
                  <span className="bg-[#101115]/80 px-2 py-0.5 rounded text-[10px] font-medium border border-white/10">
                    {ground.features[1]}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#ffa000]" />
                      <span className="line-clamp-1">{ground.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    {ground.city && (
                      <span className="px-2 py-0.5 rounded bg-[#1f202b] text-[#ffa000] text-[10px] font-extrabold border border-[#ffa000]/30">
                        {ground.city}
                      </span>
                    )}
                    <span className="text-[10px] text-stone-400 font-semibold">{ground.area}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#ffa000] transition-colors">
                    {ground.title}
                  </h3>
                  <div className="text-[11px] text-[#00e3fd] font-medium">{ground.groundCap}</div>
                </div>

                {/* Parking & Capacity Info */}
                <div className="p-2.5 rounded-xl bg-[#121317] border border-[#23242c] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <Car className="w-3.5 h-3.5 text-[#00e3fd]" />
                    <span className="text-[11px]">{ground.parkingInfo}</span>
                  </div>
                  {ground.slotsLeftBadge && (
                    <span className="text-[10px] font-bold text-[#00e3fd] bg-[#0c242c] px-2 py-0.5 rounded">
                      {ground.slotsLeftBadge}
                    </span>
                  )}
                </div>

                {/* Pricing & Double CTA Buttons */}
                <div className="pt-2 border-t border-[#23242c]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-stone-400 block">
                        {ground.isFree ? 'Entry Tier' : 'Passes from'}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-[#ffc788] font-display">
                          {ground.isFree ? 'FREE' : `₹${ground.price.toLocaleString('en-IN')}`}
                        </span>
                        {ground.strikePrice && (
                          <span className="text-xs text-stone-500 line-through">
                            ₹{ground.strikePrice}
                          </span>
                        )}
                        <span className="text-[10px] text-stone-400">
                          {ground.isFree ? '(Digital pass)' : ground.priceUnit}
                        </span>
                      </div>
                    </div>

                    {ground.fullSeasonPrice !== undefined && ground.fullSeasonPrice > 0 && (
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block">Full Season 9 Nights</span>
                        <span className="text-sm font-bold text-white">
                          ₹{ground.fullSeasonPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedMapEventId(ground.id);
                        window.scrollTo({ top: 480, behavior: 'smooth' });
                      }}
                      className="w-full py-2 rounded-lg bg-[#1f2026] hover:bg-[#282932] border border-[#31333e] text-xs font-semibold text-stone-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#ffa000]" />
                      <span>View On Map</span>
                    </button>

                    <button
                      onClick={() => onSelectEvent(ground.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold tracking-wide transition-all shadow ${
                        ground.isFree
                          ? 'bg-[#00e3fd] hover:bg-[#4be6fb] text-black'
                          : 'bg-[#ffa000] hover:bg-[#ffb865] text-black'
                      }`}
                    >
                      {ground.isFree ? 'Claim Free Pass' : 'Book Passes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
