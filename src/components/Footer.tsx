import React from 'react';
import { ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e0f13] border-t border-[#1f2025] text-stone-400 mt-20 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1c1d23]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ffa000] to-[#ffb865] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#2b1700]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Raas<span className="text-[#ffa000]">Pass</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              India's official festive infrastructure & smart ticketing platform. Elevating Navratri, Sheri Garba heritage, Disco Dandiya, and seamless fairground parking navigation.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14151a] border border-[#23242c] text-stone-300 text-[11px] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00e3fd]" />
                <span>256-Bit Encrypted Payments</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#271313] border border-[#ff4d4f]/30 text-[#ff7875] text-[11px] font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-[#ff4d4f]" />
                <span>SOS 24x7 Navratri Helpline</span>
              </div>
            </div>
          </div>

          {/* Column 1: Garba Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Garba Cities</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#cities" className="hover:text-white transition-colors">Ahmedabad Arena Grounds</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Vadodara United Way & VNF</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Mumbai Dome & Goregaon</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Surat Indoor Stadium</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Rajkot Race Course</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Bengaluru Palace Grounds</a></li>
            </ul>
          </div>

          {/* Column 2: Experience Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Experience Tracks</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#tracks" className="hover:text-white transition-colors">Traditional Sheri Garba</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors">Disco Dandiya Arena</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors">Celebrity Performer Nights</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors">VIP Lounge & Stage Stalls</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors">Costume & Choli Cloakrooms</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors">Dandiya Repair Hubs</a></li>
            </ul>
          </div>

          {/* Column 3: Venue & Transit */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Venue & Transit</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#transit" className="hover:text-white transition-colors">Smart Parking Reservation</a></li>
              <li><a href="#transit" className="hover:text-white transition-colors">EV Charging Zones</a></li>
              <li><a href="#transit" className="hover:text-white transition-colors">Organizers Dashboard</a></li>
              <li><a href="#transit" className="hover:text-white transition-colors">Gate Security Protocol</a></li>
              <li><a href="#transit" className="hover:text-white transition-colors">Emergency & Medical Camp</a></li>
              <li><a href="#transit" className="hover:text-white transition-colors">RFID Wristband FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 text-[11px] text-stone-500">
          <div>
            © 2025 RaasPass Technologies India Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Ticketing</a>
            <a href="#safety" className="hover:text-stone-300 transition-colors">Fairground Safety Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
