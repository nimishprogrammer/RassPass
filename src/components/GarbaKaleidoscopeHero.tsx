import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Pause, Music, Flame, Zap, Shield, Heart, Disc3 } from 'lucide-react';
import { garbaAudio, GARBA_SONGS, GarbaSong } from '../utils/garbaAudio';

interface GarbaKaleidoscopeHeroProps {
  onExploreClick: () => void;
  onOpenAudio: () => void;
}

export const GarbaKaleidoscopeHero: React.FC<GarbaKaleidoscopeHeroProps> = ({
  onExploreClick,
  onOpenAudio,
}) => {
  const [clickedDandiya, setClickedDandiya] = useState(false);
  const [diyaPulse, setDiyaPulse] = useState(false);
  const [isPlaying, setIsPlaying] = useState(garbaAudio.isRunning());
  const [currentSong, setCurrentSong] = useState<GarbaSong>(garbaAudio.getCurrentSong());

  useEffect(() => {
    const unsubBeat = garbaAudio.subscribeBeat(() => {
      setIsPlaying(garbaAudio.isRunning());
    });
    const unsubSong = garbaAudio.subscribeSongChange((song) => {
      setCurrentSong(song);
    });
    return () => {
      unsubBeat();
      unsubSong();
    };
  }, []);

  const handleStickClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    garbaAudio.playDandiyaClack(1.0 + Math.random() * 0.15);
    setClickedDandiya(true);
    setTimeout(() => setClickedDandiya(false), 300);
  };

  const handleDiyaClick = () => {
    garbaAudio.playGhungroo();
    garbaAudio.playDholBass(1.1);
    setDiyaPulse(true);
    setTimeout(() => setDiyaPulse(false), 350);
  };

  const handlePlaySong = (songId: string) => {
    garbaAudio.setSong(songId);
    if (!isPlaying) {
      garbaAudio.start();
      setIsPlaying(true);
    }
    onOpenAudio();
  };

  return (
    <div className="relative overflow-hidden pt-4 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#252632] bg-gradient-to-b from-[#14151b] via-[#101116] to-[#121317]">
      {/* Background Animated Sacred Geometry / Garba Swirl */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none opacity-20">
        {/* Outer Toran Mandala */}
        <div className="w-full h-full rounded-full border-2 border-dashed border-[#ffa000]/60 animate-spin-slow" />
        {/* Counter-rotating middle ring */}
        <div 
          className="absolute inset-16 rounded-full border border-dotted border-[#00e3fd]/60"
          style={{ animation: 'spin 40s linear infinite reverse' }}
        />
        {/* Inner Dandiya circle */}
        <div 
          className="absolute inset-32 rounded-full border-2 border-[#ff4d4f]/40"
          style={{ animation: 'spin 25s linear infinite' }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Headline, Guest Mode Pitch & Garba Song Jukebox */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-5">
          {/* Gujarati Calligraphy & Festival Pill */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#291705] border border-[#ffa000]/50 text-[#ffa000] text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
              <span className="text-sm">🪔</span>
              <span>અમદાવાદ અને સમગ્ર ગુજરાત નવરાત્રી • GARBA HUB</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0d262a] border border-[#00e3fd]/40 text-[#00e3fd] text-xs font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#00e3fd]" />
              <span>100% Login-Free Guest Access</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.12]">
            Iconic Garba Songs,{' '}
            <span className="bg-gradient-to-r from-[#ffa000] via-[#ffc788] to-[#00e3fd] bg-clip-text text-transparent drop-shadow-sm">
              Swirling Raas
            </span>{' '}
            & Instant RFID Passes
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
            Listen to authentic Gujarati Garba songs—from <em>"Chogada Tara"</em> and <em>"Sanedo Sanedo"</em> to <em>"Dholida Dhol Re Vagad"</em> and <em>"Pankhida Tu Ude"</em>—while booking passes and guaranteed parking across Ahmedabad, Vadodara, Surat & Rajkot without signing in.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffa000] to-[#ffb865] hover:from-[#ffb338] hover:to-[#ffc885] text-black font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-[#ffa000]/20 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <span>Explore Grounds & Passes</span>
              <Sparkles className="w-4 h-4 fill-black" />
            </button>

            <button
              onClick={() => {
                const running = garbaAudio.togglePlay();
                setIsPlaying(running);
                onOpenAudio();
              }}
              className={`px-5 py-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                isPlaying
                  ? 'bg-[#ffa000] text-black border-[#ffa000] shadow-[#ffa000]/20'
                  : 'bg-[#1c1d25] hover:bg-[#262835] text-white border-[#343646] hover:border-[#ffa000]/50'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause "{currentSong.title}"</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-[#ffa000] fill-current" />
                  <span>Play Garba Song ("{currentSong.title}")</span>
                </>
              )}
            </button>
          </div>

          {/* Garba Songs Direct Selector Pills */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-stone-400 mb-2 flex items-center gap-1.5 justify-center lg:justify-start">
              <Music className="w-3.5 h-3.5 text-[#ffa000]" />
              <span>Click to play famous Garba song melodies:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
              {GARBA_SONGS.slice(0, 5).map((song) => {
                const isCurrent = song.id === currentSong.id && isPlaying;
                return (
                  <button
                    key={song.id}
                    onClick={() => handlePlaySong(song.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-[#ffa000] text-black border-[#ffa000] shadow-md shadow-[#ffa000]/25 scale-105'
                        : 'bg-[#181922] text-stone-300 border-[#2a2c3a] hover:bg-[#222432] hover:text-white hover:border-[#ffa000]/50'
                    }`}
                  >
                    <span>{isCurrent ? '🎶' : '▶'}</span>
                    <span>{song.title}</span>
                    <span className="text-[10px] opacity-75 hidden sm:inline">({song.artist.split(' ')[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Free & Guest Guarantee Perks */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#252632] max-w-lg mx-auto lg:mx-0">
            <div className="p-2.5 rounded-xl bg-[#171821] border border-[#262734] text-center lg:text-left">
              <div className="text-[10px] uppercase font-bold text-[#ffa000]">Zero Friction</div>
              <div className="text-xs font-bold text-white mt-0.5">Guest 1-Click Pass</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#171821] border border-[#262734] text-center lg:text-left">
              <div className="text-[10px] uppercase font-bold text-[#00e3fd]">Boom Gates</div>
              <div className="text-xs font-bold text-white mt-0.5">FASTag RFID Entry</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#171821] border border-[#262734] text-center lg:text-left">
              <div className="text-[10px] uppercase font-bold text-pink-400">Garba Songs</div>
              <div className="text-xs font-bold text-white mt-0.5">8 Real Folk Anthems</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Animated Garba Mandala & Dandiya Motion Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center select-none">
            {/* Outer Pulsing Glow Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ffa000]/20 via-[#ff4d4f]/10 to-[#00e3fd]/20 blur-2xl animate-pulse" />

            {/* Rotating SVG Mandala Ring */}
            <svg 
              className={`absolute inset-0 w-full h-full ${isPlaying ? 'animate-spin-slow' : 'opacity-70'}`}
              viewBox="0 0 200 200"
            >
              <defs>
                <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffa000" />
                  <stop offset="50%" stopColor="#ff4d4f" />
                  <stop offset="100%" stopColor="#00e3fd" />
                </linearGradient>
              </defs>
              
              {/* Traditional 16-petal Garbi starburst */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 360) / 16;
                return (
                  <g key={i} transform={`rotate(${angle} 100 100)`}>
                    <path
                      d="M 100 15 C 95 30, 92 50, 100 65 C 108 50, 105 30, 100 15 Z"
                      fill="url(#mandalaGrad)"
                      opacity="0.65"
                    />
                    <circle cx="100" cy="18" r="2.5" fill="#ffd666" />
                  </g>
                );
              })}

              {/* Inner ring */}
              <circle cx="100" cy="100" r="48" fill="none" stroke="#ffa000" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            {/* Sacred Garbi Sacred Diya Flame (Interactive - tap to sound Dhol + Bell) */}
            <div 
              onClick={handleDiyaClick}
              className={`relative z-20 cursor-pointer group flex flex-col items-center justify-center transition-transform duration-200 ${
                diyaPulse ? 'scale-125' : 'hover:scale-110 active:scale-95'
              }`}
              title="Click Garbi Diya for sacred Ghungroo & Dhol chime"
            >
              {/* Golden Brass Diya Bowl */}
              <div className="relative">
                {/* Dancing Flame */}
                <div className="w-8 h-12 -mb-2 mx-auto relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 rounded-full blur-sm animate-pulse opacity-90" />
                  <div className="w-5 h-9 bg-gradient-to-t from-orange-500 via-yellow-300 to-white rounded-full animate-bounce shadow-lg shadow-orange-500/50" />
                </div>
                {/* Diya Base */}
                <div className="w-16 h-7 rounded-b-full bg-gradient-to-r from-[#d48806] via-[#ffd666] to-[#ad6800] shadow-lg border border-[#ffa000] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black opacity-80">GARBI</span>
                </div>
              </div>
            </div>

            {/* Crossed Dandiya Sticks (Interactive - tap to strike!) */}
            <div 
              onClick={handleStickClick}
              className={`absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer transition-transform duration-200 ${
                clickedDandiya ? 'scale-115 rotate-6' : 'hover:scale-105 active:scale-90'
              }`}
              title="Click Dandiya sticks to strike clack & sparks!"
            >
              {/* Dandiya 1 (Tilted Left) */}
              <div 
                className="w-4 h-64 rounded-full bg-gradient-to-b from-[#ffa000] via-[#ff4d4f] to-[#00e3fd] shadow-md border border-white/20 transform -rotate-45 relative overflow-hidden"
              >
                {/* Traditional mirror-work grip lines */}
                <div className="absolute top-8 inset-x-0 h-1 bg-white/60" />
                <div className="absolute top-12 inset-x-0 h-1 bg-yellow-200/80" />
                <div className="absolute bottom-10 inset-x-0 h-2 bg-black/40" />
              </div>

              {/* Dandiya 2 (Tilted Right) */}
              <div 
                className="w-4 h-64 rounded-full bg-gradient-to-b from-[#00e3fd] via-[#ff4d4f] to-[#ffa000] shadow-md border border-white/20 transform rotate-45 -ml-4 relative overflow-hidden"
              >
                <div className="absolute top-8 inset-x-0 h-1 bg-white/60" />
                <div className="absolute top-12 inset-x-0 h-1 bg-yellow-200/80" />
                <div className="absolute bottom-10 inset-x-0 h-2 bg-black/40" />
              </div>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1c24] border border-[#2b2d3c] text-stone-400 text-xs shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ffa000]" />
              <span>Tap Dandiya & Diya for real acoustic sounds</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
