import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FESTIVAL_SCHEDULE_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  MapPin, 
  Ticket, 
  Check, 
  Info,
  Flame,
  Award
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const { updateBooking } = useApp();
  const [activeNight, setActiveNight] = useState<number>(1);

  const selectedNightData = FESTIVAL_SCHEDULE_DATA.find((n) => n.nightNumber === activeNight) || FESTIVAL_SCHEDULE_DATA[0];

  const breadcrumbItems = [
    { label: '9-Nights Festival Calendar & Colors' },
  ];

  return (
    <>
      <PageMeta
        title="Navratri 2025 9-Nights Festival Schedule & Color Guidelines"
        description="Daily Navratri calendar from Ghatasthapana to Mahanavami. Discover auspicious colors, Maa Shakti deities, Aarti timings, and dress codes for each night."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-8 pb-16">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Page Hero Header */}
        <section aria-labelledby="page-heading" className="space-y-4 border-b border-[#252631] pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271d0e] border border-[#ffa000]/40 text-[#ffa000] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>9 SACRED NIGHTS OF RAAS • GUJARAT OFFICIAL CALENDAR</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 id="page-heading" tabIndex={-1} className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight focus:outline-none">
                Festival Schedule &amp; Daily Colors
              </h1>
              <p className="text-sm text-stone-300 max-w-2xl mt-2 leading-relaxed">
                Honor the 9 avatars of Navdurga with traditional auspicious colors, Sheri Garbi Aarti schedules, and peak midnight Mega Raas dance sessions.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400 bg-[#161720] border border-[#2b2c39] px-4 py-2.5 rounded-xl">
              <Calendar className="w-4 h-4 text-[#ffa000]" aria-hidden="true" />
              <span>Oct 3 &ndash; Oct 11, 2025</span>
            </div>
          </div>

          {/* Quick Night Selector Pills */}
          <div 
            role="tablist"
            aria-label="Navratri Nights"
            className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 no-scrollbar"
          >
            {FESTIVAL_SCHEDULE_DATA.map((night) => {
              const isSelected = activeNight === night.nightNumber;
              return (
                <button
                  key={night.nightNumber}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`night-panel-${night.nightNumber}`}
                  id={`night-tab-${night.nightNumber}`}
                  onClick={() => setActiveNight(night.nightNumber)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                    isSelected
                      ? 'bg-[#ffa000] text-black shadow-lg shadow-[#ffa000]/20'
                      : 'bg-[#181922] text-stone-300 hover:bg-[#252631] hover:text-white border border-[#2b2d39]'
                  }`}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: night.colorHex }}
                    aria-hidden="true"
                  />
                  <span>Night {night.nightNumber}</span>
                  <span className={`text-[10px] font-normal ${isSelected ? 'text-stone-900' : 'text-stone-400'}`}>
                    ({night.dayOfWeek.slice(0, 3)})
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Night In-Depth Feature Card */}
        <section
          id={`night-panel-${selectedNightData.nightNumber}`}
          role="tabpanel"
          aria-labelledby={`night-tab-${selectedNightData.nightNumber}`}
          className="bg-[#171822] border border-[#2d2f3d] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#252735]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#291705] border border-[#ffa000]/50 text-[#ffa000] font-label">
                  NIGHT {selectedNightData.nightNumber} OF 9
                </span>
                <span className="text-xs font-bold text-stone-400">
                  {selectedNightData.dayOfWeek} &bull; {selectedNightData.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
                {selectedNightData.title}
              </h2>

              <div className="flex items-center gap-2 text-stone-300 text-xs pt-1">
                <span className="font-semibold text-[#00e3fd]">Goddess Deity:</span>
                <strong className="text-white">{selectedNightData.deity}</strong>
              </div>
            </div>

            {/* Daily Color Badge */}
            <div className="bg-[#111218] border border-[#2c2d3a] p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-inner">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/20"
                style={{ backgroundColor: selectedNightData.colorHex }}
                aria-hidden="true"
              >
                <Sparkles className="w-5 h-5 text-black drop-shadow" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Color of the Night
                </span>
                <div className="text-base font-extrabold text-white">
                  {selectedNightData.colorName}
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines & Timing Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1: Dress Code */}
            <div className="bg-[#121319] border border-[#252633] p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#ffa000] flex items-center gap-1.5">
                <span>👘</span>
                <span>Authentic Dress Code</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedNightData.dressGuideline}
              </p>
            </div>

            {/* Column 2: Aarti & Mega Raas Rounds */}
            <div className="bg-[#121319] border border-[#252633] p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00e3fd] flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Ceremony &amp; Raas Schedule</span>
              </div>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-stone-400">Traditional Aarti: </span>
                  <strong className="text-white">{selectedNightData.traditionalAartiTime}</strong>
                </div>
                <div>
                  <span className="text-stone-400">Mega Raas Session: </span>
                  <strong className="text-white">{selectedNightData.megaRaasRounds}</strong>
                </div>
              </div>
            </div>

            {/* Column 3: Daily Highlights */}
            <div className="bg-[#121319] border border-[#252633] p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>Special Rituals &amp; Contests</span>
              </div>
              <ul className="space-y-1 text-xs text-stone-300">
                {selectedNightData.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Partner Grounds For This Night */}
          <div className="pt-4 border-t border-[#252735] space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-300 font-display">
              Recommended Fairgrounds for Night {selectedNightData.nightNumber}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedNightData.recommendedVenues.map((venue) => (
                <Link
                  key={venue.id}
                  to={`/events/${venue.id}`}
                  onClick={() => updateBooking({ eventId: venue.id })}
                  className="p-3.5 rounded-xl bg-[#1d1e27] hover:bg-[#272834] border border-[#2d2e3d] hover:border-[#ffa000]/50 transition-all flex items-center justify-between gap-3 group focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white group-hover:text-[#ffa000] transition-colors truncate">
                      {venue.name}
                    </div>
                    <div className="text-xs text-stone-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-stone-500 shrink-0" aria-hidden="true" />
                      <span>{venue.city} Arena</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#ffa000] shrink-0">
                    <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Passes</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Full 9-Nights At-a-Glance Table for Easy Reference */}
        <section aria-label="Navratri 9 Nights Table Overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-display">
              9-Nights Quick Calendar Reference
            </h2>
            <span className="text-xs text-stone-400">All dates authenticated with Gujarat Panchang</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#292a37] bg-[#15161e]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1b1c25] text-stone-400 uppercase tracking-wider text-[10px] font-bold border-b border-[#292a37]">
                <tr>
                  <th scope="col" className="p-3.5">Night</th>
                  <th scope="col" className="p-3.5">Date &amp; Day</th>
                  <th scope="col" className="p-3.5">Auspicious Color</th>
                  <th scope="col" className="p-3.5">Deity Avatar</th>
                  <th scope="col" className="p-3.5">Aarti Time</th>
                  <th scope="col" className="p-3.5 text-right">Passes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232431] text-stone-300">
                {FESTIVAL_SCHEDULE_DATA.map((night) => (
                  <tr key={night.nightNumber} className="hover:bg-[#1d1f2a] transition-colors">
                    <td className="p-3.5 font-bold text-white font-label">Night {night.nightNumber}</td>
                    <td className="p-3.5 font-medium">{night.date} ({night.dayOfWeek.slice(0, 3)})</td>
                    <td className="p-3.5">
                      <span className="flex items-center gap-1.5 font-semibold text-white">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: night.colorHex }}
                          aria-hidden="true"
                        />
                        <span>{night.colorName.split(' ')[0]}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-stone-400">{night.deity}</td>
                    <td className="p-3.5 font-mono text-[11px] text-stone-300">{night.traditionalAartiTime.split('–')[0]}</td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveNight(night.nightNumber);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#ffa000]/15 text-[#ffa000] hover:bg-[#ffa000] hover:text-black font-semibold text-[11px] transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};
