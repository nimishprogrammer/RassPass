import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Sparkles, MapPin, Compass, Car, Ticket, Calendar, Music, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer aria-label="Site Footer" className="bg-[#0e0f13] border-t border-[#1f2025] text-stone-400 mt-20 pt-16 pb-24 md:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1c1d23]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit focus-visible:outline-2 focus-visible:outline-[#ffa000] rounded-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ffa000] to-[#ffb865] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#2b1700]" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Raas<span className="text-[#ffa000]">Pass</span>
              </span>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Gujarat &amp; India&apos;s official festive infrastructure &amp; smart ticketing platform. Elevating Navratri, Sheri Garba heritage, Disco Dandiya, automated FASTag fairground parking, and real-time gate telemetry.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14151a] border border-[#23242c] text-stone-300 text-[11px] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00e3fd]" aria-hidden="true" />
                <span>256-Bit Encrypted Offline RFID M-Pass</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#271313] border border-[#ff4d4f]/30 text-[#ff7875] text-[11px] font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-[#ff4d4f]" aria-hidden="true" />
                <span>SOS 24x7 Navratri Fair Helpline: 1800-GARBA-01</span>
              </div>
            </div>
          </div>

          {/* Column 1: Festival Pages */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Festival Pages
            </h3>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link to="/" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Explore Grounds
                </Link>
              </li>
              <li>
                <Link to="/lineup" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Celebrity Lineup
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  9-Nights Schedule &amp; Colors
                </Link>
              </li>
              <li>
                <Link to="/parking" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Smart FASTag Parking
                </Link>
              </li>
              <li>
                <Link to="/gates" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Live Arena &amp; Gate Radar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Passes & Organizer */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Passes &amp; Operations
            </h3>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link to="/passes" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  My M-Pass Wallet
                </Link>
              </li>
              <li>
                <Link to="/organizer" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Organizer Command Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Guidelines, Dress Code &amp; FAQ
                </Link>
              </li>
              <li>
                <Link to="/events/united-way" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  United Way Baroda Pass
                </Link>
              </li>
              <li>
                <Link to="/events/shankus-dandiya" className="hover:text-[#ffa000] transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
                  Shankus Dandiya Pass
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Gujarat Hubs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Featured Hubs
            </h3>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3 h-3 text-[#ffa000]" aria-hidden="true" />
                <span>Ahmedabad (GMDC &amp; SBR)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3 h-3 text-[#ffa000]" aria-hidden="true" />
                <span>Vadodara (Navlakhi &amp; Sama)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3 h-3 text-[#ffa000]" aria-hidden="true" />
                <span>Surat (Dumas &amp; Sarsana AC)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3 h-3 text-[#ffa000]" aria-hidden="true" />
                <span>Rajkot (Race Course Ring)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3 h-3 text-[#ffa000]" aria-hidden="true" />
                <span>Gandhinagar (Helipad Vibrant)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Safety Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 text-[11px] text-stone-500">
          <div>
            &copy; 2025 RaasPass Technologies Gujarat Ltd. All rights reserved. Built for authentic Navratri celebration.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-stone-300 transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
              Fairground Safety Protocol
            </Link>
            <Link to="/faq" className="hover:text-stone-300 transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
              Barefoot Dance Etiquette
            </Link>
            <Link to="/faq" className="hover:text-stone-300 transition-colors focus-visible:outline-1 focus-visible:outline-[#ffa000]">
              Refund &amp; Pass Transfer Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
