import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Ticket, ArrowRight, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GROUND_EVENTS, ARTIST_PROFILES } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  const matchedEvents = query
    ? GROUND_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.area.toLowerCase().includes(query) ||
          (e.city && e.city.toLowerCase().includes(query)) ||
          e.features.some((f) => f.toLowerCase().includes(query))
      ).slice(0, 5)
    : [];

  const matchedArtists = query
    ? ARTIST_PROFILES.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.genre.toLowerCase().includes(query) ||
          a.notableTracks.some((t) => t.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const handleSelectEvent = (eventId: string) => {
    setSearchModalOpen(false);
    navigate(`/events/${eventId}`);
  };

  const handleSelectArtist = () => {
    setSearchModalOpen(false);
    navigate('/lineup');
  };

  const popularTags = [
    { label: 'United Way Baroda', action: () => handleSelectEvent('united-way') },
    { label: 'GMDC Ground Carnival', action: () => handleSelectEvent('gmdc-carnival') },
    { label: 'Kinjal Dave Live', action: () => navigate('/lineup') },
    { label: 'Shankus Dandiya', action: () => handleSelectEvent('shankus-dandiya') },
    { label: 'Mirchi Rock N Dhol', action: () => handleSelectEvent('mirchi-rock-dhol') },
    { label: 'Barefoot Heritage Garba', action: () => handleSelectEvent('heritage-pol-garba') },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={() => setSearchModalOpen(false)}
    >
      <div
        className="bg-[#17181f] border border-[#2e2f3a] rounded-2xl p-5 max-w-2xl w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252631]">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#ffa000] shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              id="search-modal-title"
              type="search"
              role="combobox"
              aria-expanded={query.length > 0}
              aria-controls="search-results-list"
              aria-label="Search grounds, artists, venues, and passes"
              placeholder="Search Ahmedabad, Vadodara, artists, grounds, S.G. Highway..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder:text-stone-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setSearchModalOpen(false)}
            aria-label="Close search dialog"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#252631] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dynamic Search Results */}
        {query ? (
          <div id="search-results-list" className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {matchedEvents.length === 0 && matchedArtists.length === 0 ? (
              <div className="py-8 text-center text-stone-400 text-sm">
                No grounds or artists matched &ldquo;{searchQuery}&rdquo;. Try another venue or city.
              </div>
            ) : null}

            {matchedEvents.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Grounds & Festival Venues ({matchedEvents.length})
                </div>
                <div className="space-y-1.5">
                  {matchedEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => handleSelectEvent(event.id)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#1d1e26] hover:bg-[#272833] border border-[#2a2b37] flex items-center justify-between gap-3 group transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <img
                          src={event.image}
                          alt=""
                          aria-hidden="true"
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-sm font-semibold text-white group-hover:text-[#ffa000] transition-colors truncate">
                            {event.title}
                          </div>
                          <div className="text-xs text-stone-400 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-stone-500 shrink-0" aria-hidden="true" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-[#ffa000] font-label">
                          {event.isFree ? 'Free Pass' : `₹${event.price}`}
                        </span>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedArtists.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Featured Artists ({matchedArtists.length})
                </div>
                <div className="space-y-1.5">
                  {matchedArtists.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={handleSelectArtist}
                      className="w-full text-left p-2.5 rounded-xl bg-[#1d1e26] hover:bg-[#272833] border border-[#2a2b37] flex items-center justify-between gap-3 group transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <img
                          src={artist.image}
                          alt=""
                          aria-hidden="true"
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#ffa000]/40"
                        />
                        <div className="truncate">
                          <div className="text-sm font-semibold text-white group-hover:text-[#ffa000] transition-colors truncate">
                            {artist.name}
                          </div>
                          <div className="text-xs text-stone-400 flex items-center gap-1 truncate">
                            <User className="w-3 h-3 text-stone-500 shrink-0" aria-hidden="true" />
                            <span>{artist.genre}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Popular Searches */
          <div className="space-y-2 text-xs pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Popular Searches & Fast Links
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={tag.action}
                  className="px-3 py-1.5 rounded-lg bg-[#22232c] hover:bg-[#2d2e3a] hover:text-[#ffa000] text-stone-300 transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                >
                  <MapPin className="w-3 h-3 text-[#ffa000]" aria-hidden="true" />
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
