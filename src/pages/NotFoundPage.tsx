import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Compass, Sparkles, Home, Ticket, Car, Calendar } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Page Not Found (404)' },
  ];

  return (
    <>
      <PageMeta
        title="404 - Fairground Not Found"
        description="The requested Navratri page could not be located. Discover all partnering Garba grounds across Gujarat on RaasPass."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 text-center space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="pt-8 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#ffa000] to-[#ffb865] text-black flex items-center justify-center shadow-2xl shadow-[#ffa000]/30 animate-bounce">
            <Sparkles className="w-10 h-10" aria-hidden="true" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#ffa000] font-label">
            ERROR 404 &bull; MISSING MANDALA
          </span>

          <h1 id="page-heading" tabIndex={-1} className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight focus:outline-none">
            This Garba Ground Isn&apos;t on the Map
          </h1>

          <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
            The page or arena URL you followed may have changed or the dance circle has rotated. Explore our official Gujarat fairgrounds below.
          </p>

          {/* Quick Destination Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/"
              className="px-5 py-3 rounded-xl bg-[#ffa000] hover:bg-[#ffb865] text-black font-extrabold text-xs shadow-lg transition-transform hover:scale-105 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-white"
            >
              <Compass className="w-4 h-4 fill-black" aria-hidden="true" />
              <span>Explore All Grounds</span>
            </Link>

            <Link
              to="/schedule"
              className="px-5 py-3 rounded-xl bg-[#1c1d27] hover:bg-[#252735] text-stone-200 border border-[#2e2f3d] font-semibold text-xs transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#ffa000]"
            >
              <Calendar className="w-4 h-4 text-[#ffa000]" aria-hidden="true" />
              <span>9-Nights Schedule</span>
            </Link>

            <Link
              to="/parking"
              className="px-5 py-3 rounded-xl bg-[#1c1d27] hover:bg-[#252735] text-stone-200 border border-[#2e2f3d] font-semibold text-xs transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#ffa000]"
            >
              <Car className="w-4 h-4 text-[#00e3fd]" aria-hidden="true" />
              <span>Smart Parking</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
