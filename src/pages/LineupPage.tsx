import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ARTIST_PROFILES } from '../data/mockData';
import { garbaAudio } from '../utils/garbaAudio';
import { useApp } from '../context/AppContext';
import { 
  Music, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Play, 
  Pause, 
  Star, 
  Ticket, 
  Disc, 
  ArrowRight,
  Search
} from 'lucide-react';

export const LineupPage: React.FC = () => {
  const { updateBooking, showToast } = useApp();
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAudioArtistId, setActiveAudioArtistId] = useState<string | null>(null);

  const genres = [
    { id: 'all', label: 'All Headliners' },
    { id: 'traditional', label: 'Classical & Vadodara Raas' },
    { id: 'folk', label: 'Kathiyawadi & Kutchi Folk' },
    { id: 'modern', label: 'Youth Pop & Coke Studio' },
    { id: 'fusion', label: 'EDM & Disco Dandiya' },
  ];

  const filteredArtists = ARTIST_PROFILES.filter((artist) => {
    if (selectedGenre === 'traditional' && !artist.genre.toLowerCase().includes('classical') && !artist.genre.toLowerCase().includes('traditional')) {
      return false;
    }
    if (selectedGenre === 'folk' && !artist.genre.toLowerCase().includes('folk') && !artist.genre.toLowerCase().includes('dayro')) {
      return false;
    }
    if (selectedGenre === 'modern' && !artist.genre.toLowerCase().includes('modern') && !artist.genre.toLowerCase().includes('pop')) {
      return false;
    }
    if (selectedGenre === 'fusion' && !artist.genre.toLowerCase().includes('edm') && !artist.genre.toLowerCase().includes('disco')) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        artist.name.toLowerCase().includes(q) ||
        artist.venueName.toLowerCase().includes(q) ||
        artist.genre.toLowerCase().includes(q) ||
        artist.notableTracks.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleTogglePreview = (artistId: string) => {
    if (activeAudioArtistId === artistId && garbaAudio.isRunning()) {
      garbaAudio.stop();
      setActiveAudioArtistId(null);
      showToast('Audio paused');
    } else {
      garbaAudio.start();
      setActiveAudioArtistId(artistId);
      showToast(`Playing sample beat for ${artistId}`);
    }
  };

  const breadcrumbItems = [
    { label: 'Celebrity Lineup & Headliners' },
  ];

  return (
    <>
      <PageMeta
        title="Celebrity Artists & Orchestra Lineup"
        description="Explore Gujarat's finest Garba headliners for Navratri 2025: Kinjal Dave, Aditya Gadhvi, Atul Purohit, Osman Mir, Geeta Rabari, and Kirtidan Gadhvi."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-8 pb-16">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Page Header */}
        <section aria-labelledby="page-heading" className="space-y-4 border-b border-[#252631] pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271d0e] border border-[#ffa000]/40 text-[#ffa000] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>NAVRATRI 2025 HEADLINER ROSTER</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 id="page-heading" tabIndex={-1} className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight focus:outline-none">
                Celebrity Artists &amp; Orchestras
              </h1>
              <p className="text-sm text-stone-300 max-w-2xl mt-2 leading-relaxed">
                From 32-year living legend Atul Purohit at Navlakhi to Coke Studio sensation Aditya Gadhvi &amp; Kinjal Dave, discover where Gujarat’s greatest voices perform this Navratri.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[260px] sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artist or track..."
                aria-label="Filter artists or track names"
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#171820] border border-[#2b2d39] text-white placeholder:text-stone-500 focus:outline-none focus:border-[#ffa000]"
              />
            </div>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                  selectedGenre === genre.id
                    ? 'bg-[#ffa000] text-black font-bold shadow-md shadow-[#ffa000]/20'
                    : 'bg-[#1a1b22] text-stone-300 hover:bg-[#252631] hover:text-white border border-[#2c2d38]'
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </section>

        {/* Artists Grid */}
        <section aria-label="Artists and Headliners Roster" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArtists.map((artist) => {
            const isPlayingThis = activeAudioArtistId === artist.id;
            return (
              <article
                key={artist.id}
                className="bg-[#171821] border border-[#2c2d39] hover:border-[#ffa000]/50 rounded-2xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  {/* Top Zone: Avatar + Header Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#24252f] shrink-0 border border-[#ffa000]/30 shadow-lg">
                      <img
                        src={artist.image}
                        alt={`Portrait of ${artist.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={() => handleTogglePreview(artist.id)}
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                          isPlayingThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label={isPlayingThis ? `Pause audio sample for ${artist.name}` : `Play audio sample for ${artist.name}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#ffa000] text-black flex items-center justify-center shadow-lg">
                          {isPlayingThis ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                        </div>
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#ffa000]/15 text-[#ffa000] border border-[#ffa000]/30">
                          {artist.badge}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#ffc788]">
                          <Star className="w-3 h-3 fill-[#ffa000] text-[#ffa000]" aria-hidden="true" />
                          <span>{artist.rating?.split(' ')[0] || '5.0'}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-white tracking-tight truncate">
                        {artist.name}
                      </h2>
                      <div className="text-xs text-[#00e3fd] font-medium truncate">
                        {artist.genre}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-stone-400 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" aria-hidden="true" />
                        <span className="truncate">{artist.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {artist.bio}
                  </p>

                  {/* Performance Schedule & Venue */}
                  <div className="p-3 rounded-xl bg-[#121319] border border-[#252633] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#ffa000]" aria-hidden="true" />
                        <span>Performance Schedule:</span>
                      </span>
                      <span className="font-bold text-white font-label">
                        {artist.performanceNights} ({artist.dates})
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#1e1f2b] pt-1.5">
                      <span className="text-stone-400 flex items-center gap-1.5">
                        <Disc className="w-3.5 h-3.5 text-[#00e3fd]" aria-hidden="true" />
                        <span>Ground Arena:</span>
                      </span>
                      <span className="font-semibold text-stone-200 truncate max-w-[200px]">
                        {artist.venueName}
                      </span>
                    </div>
                  </div>

                  {/* Notable Tracks */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Signature Tracks &amp; Garbi Anthems
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {artist.notableTracks.map((track) => (
                        <span
                          key={track}
                          className="px-2.5 py-1 rounded-lg bg-[#20212c] border border-[#2b2c3a] text-stone-300 text-[11px] font-medium"
                        >
                          &ldquo;{track}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#252633] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Single Pass From</span>
                    <span className="text-base font-black text-[#ffa000] font-label">
                      {artist.fromPrice === 0 ? 'Free Pass' : `₹${artist.fromPrice}`}
                    </span>
                    <span className="text-[10px] text-stone-400 ml-1">{artist.priceUnit}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTogglePreview(artist.id)}
                      className="px-3 py-2 rounded-xl bg-[#222430] hover:bg-[#2b2d3d] text-stone-200 text-xs font-semibold border border-[#333544] transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                      aria-label={isPlayingThis ? `Pause audio preview for ${artist.name}` : `Preview beat for ${artist.name}`}
                    >
                      <Music className="w-3.5 h-3.5 text-[#ffa000]" aria-hidden="true" />
                      <span>{isPlayingThis ? 'Pause Beat' : 'Preview Beat'}</span>
                    </button>

                    <Link
                      to={`/events/${artist.venueId}`}
                      onClick={() => updateBooking({ eventId: artist.venueId })}
                      className="px-4 py-2 rounded-xl bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-extrabold shadow-md transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                    >
                      <Ticket className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
                      <span>Book Passes</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
};
