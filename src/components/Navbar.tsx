import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  Music,
  Radio,
  Calendar,
  HelpCircle,
  Activity
} from 'lucide-react';
import { CITIES } from '../data/mockData';
import { garbaAudio } from '../utils/garbaAudio';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedCity, 
    setSelectedCity, 
    userProfile, 
    updateProfile, 
    setSearchModalOpen, 
    totalPassesCount 
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState(garbaAudio.getCurrentSong().title);
  const [editName, setEditName] = useState(userProfile.name);
  const [editPlate, setEditPlate] = useState(userProfile.fastagPlate || 'GJ-06-AB-4092');

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

  // Sync profile editing when modal opens
  useEffect(() => {
    if (profileModalOpen) {
      setEditName(userProfile.name);
      setEditPlate(userProfile.fastagPlate || 'GJ-06-AB-4092');
    }
  }, [profileModalOpen, userProfile]);

  const handleToggleAudio = () => {
    const running = garbaAudio.togglePlay();
    setIsPlayingAudio(running);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim() || 'Amdavadi Guest',
      fastagPlate: editPlate.trim().toUpperCase(),
    });
    setProfileModalOpen(false);
  };

  const handleToggleRole = () => {
    const newRole = userProfile.role === 'guest' ? 'author' : 'guest';
    updateProfile({ role: newRole, isGuest: newRole === 'guest' });
    if (newRole === 'author') {
      navigate('/organizer');
    } else {
      navigate('/');
    }
  };

  const navLinks = [
    { to: '/', label: 'Explore', exact: true },
    { to: '/lineup', label: 'Lineup' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/parking', label: 'Smart Parking' },
    { to: '/gates', label: 'Live Gates' },
    { to: '/organizer', label: 'Organizer Hub' },
    { to: '/faq', label: 'FAQ & Safety' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121317]/95 backdrop-blur-xl border-b border-[#25262c]">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#ffa000] focus:text-black focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left Zone: Brand + City Selector + Quick Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Brand Logo */}
            <Link 
              to="/"
              className="flex items-center gap-2 group text-left focus-visible:outline-2 focus-visible:outline-[#ffa000] rounded-lg p-1"
              aria-label="RaasPass Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ffa000] to-[#ffb865] flex items-center justify-center shadow-lg shadow-[#ffa000]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-[#2b1700]" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Raas<span className="text-[#ffa000]">Pass</span>
              </span>
            </Link>

            {/* City Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={cityDropdownOpen}
                aria-label={`Selected city: ${selectedCity}. Click to change.`}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1c21] hover:bg-[#25262c] border border-[#2e2f37] text-xs font-medium text-stone-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#ffa000]" aria-hidden="true" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" aria-hidden="true" />
              </button>

              {cityDropdownOpen && (
                <div 
                  role="listbox"
                  aria-label="Select Garba City"
                  className="absolute left-0 mt-2 w-48 rounded-xl bg-[#1b1c22] border border-[#2e2f37] shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 border-b border-[#292a32]">
                    Select Garba City
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      role="option"
                      aria-selected={selectedCity === city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:bg-[#292a35] ${
                        selectedCity === city
                          ? 'bg-[#ffa000]/15 text-[#ffa000] font-semibold'
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
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-[#1f2025] transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
              aria-label="Open search for grounds, artists, and venues"
              title="Search artists, venues, grounds"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Center Zone: Nav Links */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                    isActive
                      ? 'bg-[#ffa000] text-black shadow-sm font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-[#1c1d22]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Zone: Garba Audio + My Passes + Guest Profile + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Garba Songs Quick Play/Pause Trigger */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                isPlayingAudio
                  ? 'bg-[#ffa000]/20 border-[#ffa000] text-[#ffa000] shadow-sm shadow-[#ffa000]/20'
                  : 'bg-[#1b1c23] border-[#2f313d] text-stone-400 hover:text-white'
              }`}
              aria-label={isPlayingAudio ? `Pause Garba song ${currentSongTitle}` : `Play festive Garba song ${currentSongTitle}`}
              title={isPlayingAudio ? `Pause "${currentSongTitle}"` : `Play Garba Song ("${currentSongTitle}")`}
            >
              {isPlayingAudio ? (
                <div className="flex items-center gap-0.5 h-3" aria-hidden="true">
                  <span className="w-1 h-3 bg-[#ffa000] animate-pulse rounded-full" />
                  <span className="w-1 h-2 bg-[#ffa000] animate-pulse rounded-full" />
                  <span className="w-1 h-3.5 bg-[#ffa000] animate-pulse rounded-full" />
                </div>
              ) : (
                <Music className="w-3.5 h-3.5 text-[#ffa000]" aria-hidden="true" />
              )}
              <span className="hidden lg:inline text-[11px] truncate max-w-[110px]">
                {isPlayingAudio ? currentSongTitle : 'Garba Song'}
              </span>
            </button>

            {/* My Passes Link */}
            <Link
              to="/passes"
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1f25] hover:bg-[#282931] border border-[#31333d] text-xs font-semibold text-stone-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
              aria-label={`My Passes ${totalPassesCount > 0 ? `(${totalPassesCount} passes ready)` : ''}`}
            >
              <Ticket className="w-3.5 h-3.5 text-[#ffa000]" aria-hidden="true" />
              <span className="hidden sm:inline">My Passes</span>
              {totalPassesCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#ffa000] text-black text-[10px] font-bold rounded-full font-label">
                  {totalPassesCount}
                </span>
              )}
            </Link>

            {/* Login Free / Guest Mode Profile Trigger */}
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1b1c23] hover:bg-[#252733] border border-[#2d2f3d] text-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000]"
              aria-haspopup="dialog"
              aria-expanded={profileModalOpen}
              aria-label="Open Guest User Profile Settings"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ffa000] to-[#ffb338] text-black flex items-center justify-center font-bold text-[10px]">
                {userProfile.role === 'author' ? 'A' : 'G'}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span>{userProfile.name.split(' ')[0]}</span>
                  <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold uppercase">
                    {userProfile.role === 'author' ? 'Author' : 'Guest'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-stone-400" aria-hidden="true" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-400 hover:text-white rounded-lg focus-visible:outline-2 focus-visible:outline-[#ffa000]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav 
            aria-label="Mobile Navigation Menu"
            className="xl:hidden py-4 border-t border-[#25262c] flex flex-col gap-1.5 animate-in fade-in duration-150"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#ffa000] ${
                    isActive
                      ? 'bg-[#ffa000] text-black font-bold'
                      : 'text-stone-200 hover:bg-[#1d1e23]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-2 border-t border-[#23242c] flex items-center justify-between px-3 text-xs text-stone-400">
              <span>Selected City:</span>
              <button
                type="button"
                onClick={() => {
                  setCityDropdownOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-[#ffa000] font-semibold flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{selectedCity}</span>
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Guest User / Login-Free Profile Modal */}
      {profileModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-heading"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setProfileModalOpen(false)}
        >
          <div 
            className="bg-[#171821] border border-[#2e2f3d] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#262734]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ffa000] to-[#ffb865] text-black flex items-center justify-center font-bold">
                  <User className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="profile-modal-heading" className="text-base font-bold text-white font-display">
                    Login-Free Guest Profile
                  </h2>
                  <p className="text-xs text-stone-400">Zero credentials needed • 100% functional</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                aria-label="Close profile modal"
                className="text-stone-400 hover:text-white p-1 rounded-lg focus-visible:outline-2 focus-visible:outline-[#ffa000]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Login Free Guarantee Badge */}
            <div className="p-3 rounded-xl bg-[#12231b] border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-emerald-400 font-bold block">100% Login-Free Active</strong>
                You can browse, book ground passes, select FASTag smart parking, and generate verified M-Passes without creating an account or entering passwords.
              </div>
            </div>

            {/* Form details */}
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="input-attendee-name" className="font-semibold text-stone-300">
                  Attendee Name (on M-Pass)
                </label>
                <input
                  id="input-attendee-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white focus:outline-none focus:border-[#ffa000]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="input-fastag-plate" className="font-semibold text-stone-300">
                  Vehicle FASTag Plate (for Automated Boom Gates)
                </label>
                <input
                  id="input-fastag-plate"
                  type="text"
                  value={editPlate}
                  onChange={(e) => setEditPlate(e.target.value)}
                  placeholder="e.g. GJ-06-AB-4092"
                  className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#2f3140] text-white font-label uppercase focus:outline-none focus:border-[#ffa000]"
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
                  className="px-3 py-1.5 rounded-lg bg-[#222430] hover:bg-[#2c2f3e] text-xs font-semibold text-[#ffa000] border border-[#383a4c] focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                >
                  Switch to {userProfile.role === 'author' ? 'Guest Mode' : 'Author Mode'}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262734]">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#20212b] text-stone-300 text-xs font-medium hover:bg-[#272935] focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ffa000] hover:bg-[#ffb865] text-black text-xs font-bold shadow-lg focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
