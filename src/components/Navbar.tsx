import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  Ticket, 
  Sparkles, 
  Menu, 
  X,
  Compass,
  Car,
  Building2,
  User,
  ShieldCheck,
  Check,
  Music,
  Play,
  Pause
} from 'lucide-react';
import { ViewMode, UserProfile } from '../types';
import { CITIES } from '../data/mockData';
import { garbaAudio } from '../utils/garbaAudio';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenMyPasses: () => void;
  onOpenSearch: () => void;
  totalPassesCount: number;
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  selectedCity,
  onSelectCity,
  onOpenMyPasses,
  onOpenSearch,
  totalPassesCount,
  userProfile,
  onUpdateProfile,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState(garbaAudio.getCurrentSong().title);
  const [editName, setEditName] = useState(userProfile.name);
  const [editPlate, setEditPlate] = useState(userProfile.fastagPlate || 'GJ-01-GB-2025');

  // Keep audio state in sync
  useEffect(() => {
    const unsub = garbaAudio.subscribeBeat(() => {
      setIsPlayingAudio(garbaAudio.isRunning());
    });
    const unsubSong = garbaAudio.subscribeSongChange((song) => {
      setCurrentSongTitle(song.title);
    });
    return () => {
      unsub();
      unsubSong();
    };
  }, []);

  const handleToggleAudio = () => {
    const running = garbaAudio.togglePlay();
    setIsPlayingAudio(running);
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: editName.trim() || 'Amdavadi Guest',
      fastagPlate: editPlate.trim().toUpperCase(),
    });
    setProfileModalOpen(false);
  };

  const handleToggleRole = () => {
    const newRole = userProfile.role === 'guest' ? 'author' : 'guest';
    onUpdateProfile({ role: newRole, isGuest: newRole === 'guest' });
    if (newRole === 'author') {
      onNavigate('author-portal');
    } else {
      onNavigate('explore');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121317]/95 backdrop-blur-md border-b border-[#25262c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Left Zone: Brand + City Selector + Search */}
          <div className="flex items-center gap-3">
            {/* Brand Logo */}
            <button 
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ffa000] to-[#ffb865] flex items-center justify-center shadow-lg shadow-[#ffa000]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-[#2b1700]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Raas<span className="text-[#ffa000]">Pass</span>
              </span>
            </button>

            {/* City Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1c21] hover:bg-[#25262c] border border-[#2e2f37] text-xs font-medium text-stone-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#ffa000]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-44 rounded-xl bg-[#1b1c22] border border-[#2e2f37] shadow-2xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-[#292a32]">
                    Select Garba City
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onSelectCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                        selectedCity === city
                          ? 'bg-[#ffa000]/10 text-[#ffa000] font-semibold'
                          : 'text-stone-300 hover:bg-[#25262d] hover:text-white'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#ffa000]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-[#1f2025] transition-colors"
              title="Search artists, venues, grounds"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Center Zone: Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onNavigate('explore')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                currentView === 'explore'
                  ? 'bg-[#ffa000] text-black shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-[#1c1d22]'
              }`}
            >
              Explore Events
            </button>

            <button
              onClick={() => onNavigate('event-detail')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                currentView === 'event-detail'
                  ? 'bg-[#ffa000] text-black shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-[#1c1d22]'
              }`}
            >
              Passes & Booking
            </button>

            <button
              onClick={() => onNavigate('parking')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                currentView === 'parking'
                  ? 'bg-[#ffa000] text-black shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-[#1c1d22]'
              }`}
            >
              Smart Parking
            </button>

            {/* Author / Organizer Command Hub Link */}
            <button
              onClick={() => onNavigate('author-portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                currentView === 'author-portal'
                  ? 'bg-[#ffa000] text-black shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-[#1c1d22]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#ffa000]" />
              <span>Author & Organizers</span>
            </button>
          </nav>

          {/* Right Zone: Garba Songs Mini-Toggle + Login-Free Guest Badge + My Passes */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Garba Songs Quick Trigger */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-[#ffa000]/20 border-[#ffa000] text-[#ffa000] shadow-sm shadow-[#ffa000]/10'
                  : 'bg-[#1b1c23] border-[#2f313d] text-stone-400 hover:text-white'
              }`}
              title={isPlayingAudio ? `Pause "${currentSongTitle}"` : `Play Garba Song ("${currentSongTitle}")`}
            >
              {isPlayingAudio ? (
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-1 h-3 bg-[#ffa000] animate-pulse rounded-full" />
                  <span className="w-1 h-2 bg-[#ffa000] animate-pulse rounded-full" />
                  <span className="w-1 h-3.5 bg-[#ffa000] animate-pulse rounded-full" />
                </div>
              ) : (
                <Music className="w-3.5 h-3.5 text-[#ffa000]" />
              )}
              <span className="hidden md:inline text-[11px] truncate max-w-[110px]">
                {isPlayingAudio ? currentSongTitle : 'Garba Song'}
              </span>
            </button>

            {/* My Passes CTA */}
            <button
              onClick={onOpenMyPasses}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1f25] hover:bg-[#282931] border border-[#31333d] text-xs font-semibold text-stone-200 transition-colors"
            >
              <Ticket className="w-3.5 h-3.5 text-[#ffa000]" />
              <span className="hidden sm:inline">My Passes</span>
              {totalPassesCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#ffa000] text-black text-[10px] font-bold rounded-full">
                  {totalPassesCount}
                </span>
              )}
            </button>

            {/* Login Free / Guest Mode Profile Trigger */}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1b1c23] hover:bg-[#252733] border border-[#2d2f3d] text-xs transition-colors"
              title="Click to view Login-Free Guest Details"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ffa000] to-[#ffb338] text-black flex items-center justify-center font-bold text-[10px]">
                {userProfile.role === 'author' ? 'A' : 'G'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span>{userProfile.name.split(' ')[0]}</span>
                  <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold uppercase">
                    {userProfile.role === 'author' ? 'Author' : 'Guest'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#25262c] flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('explore');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-200 hover:bg-[#1d1e23]"
            >
              Explore Events
            </button>
            <button
              onClick={() => {
                onNavigate('event-detail');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-200 hover:bg-[#1d1e23]"
            >
              Passes & Booking
            </button>
            <button
              onClick={() => {
                onNavigate('parking');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-200 hover:bg-[#1d1e23]"
            >
              Smart Parking
            </button>
            <button
              onClick={() => {
                onNavigate('author-portal');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#ffa000] hover:bg-[#1d1e23] flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Author & Organizer Hub</span>
            </button>
            <button
              onClick={() => {
                onNavigate('checkout-mpass');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-stone-200 hover:bg-[#1d1e23]"
            >
              Unified M-Pass & Checkout
            </button>
          </div>
        )}
      </div>

      {/* Guest User / Login-Free Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#171821] border border-[#2e2f3d] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#262734]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ffa000] to-[#ffb865] text-black flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Login-Free Guest Profile</h4>
                  <p className="text-xs text-stone-400">Zero credentials needed • 100% functional</p>
                </div>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Login Free Guarantee Badge */}
            <div className="p-3 rounded-xl bg-[#12231b] border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400 font-bold block">100% Login-Free Active</strong>
                You can browse, book ground passes, select FASTag smart parking, and generate verified M-Passes without creating an account or entering passwords.
              </div>
            </div>

            {/* Form details */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Attendee Name (on M-Pass)</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white focus:outline-none focus:border-[#ffa000]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Vehicle FASTag Plate (for Boom Gates)</label>
                <input
                  type="text"
                  value={editPlate}
                  onChange={(e) => setEditPlate(e.target.value)}
                  placeholder="e.g. GJ-01-GB-2025"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white font-mono uppercase focus:outline-none focus:border-[#ffa000]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#13141c] border border-[#252735] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Current Mode</div>
                  <div className="text-[11px] text-stone-400">
                    {userProfile.role === 'author' ? 'Ground Organizer & Author' : 'Public Guest Attendee'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleRole}
                  className="px-3 py-1.5 rounded-lg bg-[#222430] hover:bg-[#2c2f3e] text-xs font-semibold text-[#ffa000] border border-[#383a4c]"
                >
                  Switch to {userProfile.role === 'author' ? 'Guest Mode' : 'Author Mode'}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#262734]">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#20212b] text-stone-300 text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-xl bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold shadow-lg"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
