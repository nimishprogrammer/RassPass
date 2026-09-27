import React, { useEffect, useRef, useState, useMemo } from 'react';
import { GroundPassEvent } from '../types';
import { 
  MapPin, 
  Navigation, 
  Car, 
  ShieldCheck, 
  ExternalLink, 
  Zap, 
  Layers, 
  Compass, 
  Plus, 
  Minus, 
  RotateCcw, 
  CheckCircle2, 
  Radio,
  Clock
} from 'lucide-react';

interface AhmedabadGoogleMapProps {
  events: GroundPassEvent[];
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
  onBookPasses: (eventId: string) => void;
}

// Bounding box for Ahmedabad garba venues (Lat ~23.00 to 23.14, Lng ~72.48 to 72.62)
const AHD_BOUNDS = {
  minLat: 23.005,
  maxLat: 23.140,
  minLng: 72.485,
  maxLng: 72.615,
};

// Convert Lat/Lng to SVG percentage coordinates (0-100%)
function projectCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - AHD_BOUNDS.minLng) / (AHD_BOUNDS.maxLng - AHD_BOUNDS.minLng)) * 100;
  // Invert Y because latitude increases northward (upward)
  const y = (1 - (lat - AHD_BOUNDS.minLat) / (AHD_BOUNDS.maxLat - AHD_BOUNDS.minLat)) * 100;
  return {
    x: Math.max(5, Math.min(95, x)),
    y: Math.max(5, Math.min(95, y)),
  };
}

export const AhmedabadGoogleMap: React.FC<AhmedabadGoogleMapProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  onBookPasses,
}) => {
  const [activeVenue, setActiveVenue] = useState<GroundPassEvent | null>(null);
  const [mapLayer, setMapLayer] = useState<'blueprint' | 'satellite' | 'traffic'>('blueprint');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync selected venue with activeVenue
  useEffect(() => {
    if (selectedEventId) {
      const match = events.find((e) => e.id === selectedEventId);
      if (match) setActiveVenue(match);
    } else if (events.length > 0 && !activeVenue) {
      setActiveVenue(events[0]);
    }
  }, [selectedEventId, events, activeVenue]);

  // Pan to venue on interactive SVG map
  const handleSelectVenue = (e: GroundPassEvent) => {
    setActiveVenue(e);
    onSelectEvent(e.id);
    const coords = projectCoords(e.lat, e.lng);
    setPanOffset({
      x: (50 - coords.x) * 3,
      y: (50 - coords.y) * 3,
    });
    setZoomLevel(1.2);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    if (events.length > 0) setActiveVenue(events[0]);
  };

  // Pan and drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.5, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.75, prev - 0.25));
  };

  // Calculate distance from S.G. Highway Central Hub (23.0338, 72.5074)
  const sgDistKm = useMemo(() => {
    if (!activeVenue) return '3.2';
    const lat1 = 23.0338;
    const lon1 = 72.5074;
    const lat2 = activeVenue.lat;
    const lon2 = activeVenue.lng;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (6371 * c).toFixed(1);
  }, [activeVenue]);

  return (
    <div className="bg-[#121318] border border-[#262835] rounded-2xl overflow-hidden shadow-2xl">
      {/* Map Control Header */}
      <div className="p-4 bg-[#181921] border-b border-[#292b3a] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#271708] border border-[#ffa000]/40 flex items-center justify-center text-[#ffa000]">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Ahmedabad Garba Arena Map</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffa000]/15 text-[#ffa000] text-[10px] font-semibold border border-[#ffa000]/30">
                Live GPS Coordinates
              </span>
            </h3>
            <p className="text-[11px] text-stone-400">
              Interactive navigation, RFID boom gate positions & live turnstile telemetry
            </p>
          </div>
        </div>

        {/* Layer Switches & View Reset */}
        <div className="flex items-center gap-2">
          <div className="bg-[#101115] p-1 rounded-lg border border-[#2b2d3c] flex items-center text-xs text-stone-400">
            <button
              onClick={() => setMapLayer('blueprint')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapLayer === 'blueprint' ? 'bg-[#ffa000] text-black font-bold shadow' : 'hover:text-white'
              }`}
            >
              Blueprint Dark
            </button>
            <button
              onClick={() => setMapLayer('satellite')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapLayer === 'satellite' ? 'bg-[#ffa000] text-black font-bold shadow' : 'hover:text-white'
              }`}
            >
              Night Radar
            </button>
            <button
              onClick={() => setMapLayer('traffic')}
              className={`px-2.5 py-1 rounded transition-colors ${
                mapLayer === 'traffic' ? 'bg-[#ffa000] text-black font-bold shadow' : 'hover:text-white'
              }`}
            >
              Boom Gates
            </button>
          </div>

          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22232c] hover:bg-[#2e2f3b] text-stone-200 transition-colors border border-[#373847] text-xs font-medium"
            title="Reset Ahmedabad Map View"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00e3fd]" />
            <span>Reset View</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1b24] border border-[#2e3040] text-stone-300 text-xs font-medium">
            <Navigation className="w-3.5 h-3.5 text-[#ffa000]" />
            <span>{events.length} Venues Plotted</span>
          </div>
        </div>
      </div>

      {/* Main Map Box & Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Map Canvas (Left 8 cols) */}
        <div 
          className="lg:col-span-8 relative h-[380px] sm:h-[440px] lg:h-[520px] bg-[#0e1014] overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Satellite Layer View (Official Google Maps Satellite Embed - zero API key required) */}
          {mapLayer === 'satellite' ? (
            <div className="absolute inset-0 w-full h-full bg-[#0a0c10]">
              <iframe
                title="Google Maps Satellite View"
                className="w-full h-full border-0 filter brightness-95 contrast-110"
                src={`https://maps.google.com/maps?q=${activeVenue?.lat || 23.0338},${activeVenue?.lng || 72.5450}&t=k&z=15&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#ffa000]/40 text-[10px] text-white font-bold flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#ffa000] animate-pulse" />
                <span>Live Satellite Feed: {activeVenue?.title || 'Ahmedabad Garba Arena'}</span>
              </div>
            </div>
          ) : (
            /* Interactive Vector Arena Map Canvas */
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
            >
            {/* SVG Ahmedabad City Grid & Rivers */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                {/* Dark blueprint grid pattern */}
                <pattern id="ahdGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1f2230" strokeWidth="0.25" />
                </pattern>
                
                {/* Sabarmati River Gradient */}
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0a2a40" />
                  <stop offset="50%" stopColor="#005d7f" />
                  <stop offset="100%" stopColor="#0a2a40" />
                </linearGradient>

                {/* Radar Ring Glow */}
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffa000" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#ffa000" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ffa000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Grid */}
              <rect width="100" height="100" fill="#0d0f14" />
              <rect width="100" height="100" fill="url(#ahdGrid)" />

              {/* Major Highway Corridors */}
              {/* S.G. Highway (Sarkhej–Gandhinagar Highway) - Running SW to NE on West bank */}
              <path
                d="M 12 95 L 26 55 L 42 12"
                fill="none"
                stroke={mapLayer === 'traffic' ? '#00e3fd' : '#ffa000'}
                strokeWidth={mapLayer === 'traffic' ? '1.6' : '1.4'}
                strokeDasharray={mapLayer === 'traffic' ? '2 1' : 'none'}
                opacity="0.8"
              />
              <text x="22" y="60" fill="#ffa000" fontSize="2.2" fontWeight="bold" opacity="0.85" transform="rotate(-68 22 60)">
                S.G. HIGHWAY CORRIDOR
              </text>

              {/* S.P. Ring Road Outer Arc */}
              <path
                d="M 6 85 C 8 40, 30 10, 80 8"
                fill="none"
                stroke="#32364a"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text x="14" y="32" fill="#525875" fontSize="1.8" fontWeight="bold">
                S.P. RING ROAD
              </text>

              {/* Sindhu Bhavan Road Extension (West connecting S.G. to Ring Road) */}
              <path
                d="M 24 58 L 7 54"
                fill="none"
                stroke="#00e3fd"
                strokeWidth="1.0"
                opacity="0.75"
              />
              <text x="9" y="52" fill="#00e3fd" fontSize="1.8" fontWeight="600">
                SINDHU BHAVAN RD
              </text>

              {/* 132ft Ring Road */}
              <path
                d="M 28 88 C 32 60, 45 35, 75 32"
                fill="none"
                stroke="#222638"
                strokeWidth="0.8"
              />

              {/* Sabarmati River (Meandering spine through Ahmedabad Central) */}
              <path
                d="M 62 0 C 58 20, 52 40, 50 55 C 48 70, 53 85, 56 100"
                fill="none"
                stroke="url(#riverGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Riverfront Promenade Edge Lines */}
              <path
                d="M 60 0 C 56 20, 50 40, 48 55 C 46 70, 51 85, 54 100"
                fill="none"
                stroke="#00e3fd"
                strokeWidth="0.4"
                opacity="0.4"
              />
              <path
                d="M 64 0 C 60 20, 54 40, 52 55 C 50 70, 55 85, 58 100"
                fill="none"
                stroke="#00e3fd"
                strokeWidth="0.4"
                opacity="0.4"
              />
              <text x="52" y="42" fill="#00e3fd" fontSize="1.8" opacity="0.6" transform="rotate(78 52 42)">
                SABARMATI RIVERFRONT
              </text>

              {/* Historic UNESCO Walled City Enclave (Mandvi Ni Pol / Bhadra) */}
              <rect
                x="56"
                y="52"
                width="14"
                height="16"
                fill="#2b1c10"
                stroke="#ffa000"
                strokeWidth="0.5"
                strokeDasharray="1 1"
                rx="1"
                opacity="0.45"
              />
              <text x="58" y="60" fill="#ffa000" fontSize="1.6" opacity="0.8" fontWeight="bold">
                OLD WALLED CITY
              </text>
              <text x="58" y="63" fill="#stone-400" fontSize="1.2" opacity="0.6">
                UNESCO Mandvi Pol
              </text>

              {/* Active Radar Pulse Circles around active venue */}
              {activeVenue && (() => {
                const pos = projectCoords(activeVenue.lat, activeVenue.lng);
                return (
                  <g>
                    <circle cx={pos.x} cy={pos.y} r="14" fill="url(#radarGlow)" />
                    <circle cx={pos.x} cy={pos.y} r="8" fill="none" stroke="#ffa000" strokeWidth="0.3" opacity="0.6">
                      <animate attributeName="r" values="4;18;4" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })()}

              {/* Dynamic Connecting Route Line from S.G. Highway Hub to Active Venue */}
              {activeVenue && (() => {
                const hub = { x: 25, y: 56 }; // S.G. Highway junction
                const pos = projectCoords(activeVenue.lat, activeVenue.lng);
                return (
                  <g>
                    <line
                      x1={hub.x}
                      y1={hub.y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke="#00e3fd"
                      strokeWidth="0.8"
                      strokeDasharray="1.5 1"
                      opacity="0.9"
                    />
                    <circle cx={hub.x} cy={hub.y} r="1.2" fill="#00e3fd" />
                    <text x={hub.x - 2} y={hub.y + 4} fill="#00e3fd" fontSize="1.6" fontWeight="bold">
                      S.G. HUB
                    </text>
                  </g>
                );
              })()}
            </svg>

            {/* Interactive Venue Markers Overlaid on Ahmedabad Map */}
            {events.map((e) => {
              const pos = projectCoords(e.lat, e.lng);
              const isSelected = activeVenue?.id === e.id;

              return (
                <div
                  key={e.id}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleSelectVenue(e);
                  }}
                  className="absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    zIndex: isSelected ? 40 : 20,
                  }}
                >
                  {/* Pin Pulse Animation */}
                  {isSelected && (
                    <div className="absolute -inset-3 bg-[#ffa000]/30 rounded-full animate-ping" />
                  )}

                  {/* Marker Pin Icon */}
                  <div
                    className={`relative p-1.5 rounded-full shadow-lg transition-transform ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#ffa000] to-[#ffd666] text-black scale-125 ring-2 ring-white'
                        : 'bg-[#1b1c24] text-[#ffa000] border border-[#ffa000]/60 hover:scale-110 hover:bg-[#252632]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {/* Venue Name Tooltip Pill */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded-md whitespace-nowrap text-[10px] font-bold shadow-xl transition-all ${
                      isSelected
                        ? 'bg-[#ffa000] text-black scale-100 opacity-100 z-50'
                        : 'bg-[#15161d] text-stone-300 border border-[#2b2d3c] opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none'
                    }`}
                  >
                    <span>{e.title}</span>
                    <span className="block text-[8px] opacity-80 font-normal">
                      Cap: {e.groundCap}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          )}

          {/* Map Overlay Controls (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-1.5 bg-[#171821]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#2b2e3e] shadow-xl">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg bg-[#22232e] hover:bg-[#2f3140] text-stone-200 transition-colors"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg bg-[#22232e] hover:bg-[#2f3140] text-stone-200 transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mini Legend Overlay (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-30 bg-[#12131a]/85 backdrop-blur-md px-3 py-2 rounded-xl border border-[#262838] text-[10px] text-stone-300 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffa000]" />
              <span>Garba Arena</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 bg-[#00e3fd]" />
              <span>S.G. Highway Route</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-1.5 rounded bg-[#0a5270]" />
              <span>Sabarmati River</span>
            </div>
          </div>
        </div>

        {/* Selected Venue Details & Smart Turnstile Panel (Right 4 cols) */}
        <div className="lg:col-span-4 bg-[#14151c] p-5 border-t lg:border-t-0 lg:border-l border-[#272938] flex flex-col justify-between">
          {activeVenue ? (
            <div className="space-y-4">
              {/* Badge & Title */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffa000]/15 text-[#ffa000] text-[10px] font-bold border border-[#ffa000]/30 uppercase">
                    {activeVenue.tag}
                  </span>
                  <span className="text-[11px] font-mono text-[#00e3fd] flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse text-[#00e3fd]" />
                    <span>{sgDistKm} km from S.G. Hub</span>
                  </span>
                </div>
                <h4 className="text-base font-black text-white leading-tight font-display">
                  {activeVenue.title}
                </h4>
                <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ffa000] shrink-0" />
                  <span>{activeVenue.location}</span>
                </p>
              </div>

              {/* Arena Capacity & Live Gate Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#1a1b24] border border-[#2a2c3a]">
                  <span className="text-[10px] text-stone-400 block uppercase font-semibold">
                    Ground Capacity
                  </span>
                  <span className="text-sm font-black text-white">
                    {activeVenue.groundCap}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a1b24] border border-[#2a2c3a]">
                  <span className="text-[10px] text-stone-400 block uppercase font-semibold">
                    Pass Starting
                  </span>
                  <span className="text-sm font-black text-[#ffa000]">
                    ₹{activeVenue.price}
                    <span className="text-[10px] text-stone-400 font-normal"> /night</span>
                  </span>
                </div>
              </div>

              {/* Smart Access & Fastag Parking Status */}
              <div className="p-3 rounded-xl bg-[#1a1b24] border border-[#2c2e3f] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#00e3fd]" />
                    <span>FASTag Smart Parking</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>RFID Auto-Boom</span>
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  {activeVenue.parkingInfo}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-[#262837]">
                  <span>Gate Opens: <strong>7:30 PM</strong></span>
                  <span>Turnstiles: <strong>16 RFID Lanes</strong></span>
                </div>
              </div>

              {/* External Turn-by-Turn Routing Link */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeVenue.lat},${activeVenue.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#222430] hover:bg-[#2c2e3d] text-stone-200 hover:text-white transition-all border border-[#34374a] text-xs font-semibold group"
              >
                <Navigation className="w-3.5 h-3.5 text-[#00e3fd] group-hover:rotate-12 transition-transform" />
                <span>Open Direct Google Maps GPS Navigation</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-auto" />
              </a>

              {/* Book Passes CTA */}
              <button
                onClick={() => onBookPasses(activeVenue.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ffa000] to-[#ffb865] hover:from-[#ffb338] hover:to-[#ffc885] text-black font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-[#ffa000]/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Book M-Pass for {activeVenue.title.split(' ')[0]}</span>
                <Zap className="w-4 h-4 fill-black" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs">
              Select an Ahmedabad Garba ground on the map to inspect live gate routing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
