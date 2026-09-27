import React, { useEffect, useState, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Sparkles, 
  Radio, 
  Sliders, 
  ChevronUp, 
  ChevronDown, 
  Flame,
  Music2,
  Hand,
  Disc3,
  Mic2,
  Share2,
  ListMusic,
  Check
} from 'lucide-react';
import { garbaAudio, GARBA_SONGS, GarbaSong } from '../utils/garbaAudio';

interface DandiyaParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  opacity: number;
}

export const GarbaMotionBeatPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState<GarbaSong>(garbaAudio.getCurrentSong());
  const [bpm, setBpm] = useState(garbaAudio.getBpm());
  const [leadInstrument, setLeadInstrument] = useState<'harmonium' | 'bansuri' | 'shehnai'>(garbaAudio.getLeadInstrument());
  const [activeStep, setActiveStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSongList, setShowSongList] = useState(false);
  const [lyricsLine, setLyricsLine] = useState<{ gujarati: string; english: string }>({
    gujarati: 'ચોગડા તારા છબીલો તારા રંગીલો તારા...',
    english: 'Chogada tara chhabilo tara rangeelo tara...'
  });
  const [lastNote, setLastNote] = useState<string>('G4');
  const [streamMode, setStreamMode] = useState(false);
  const [particles, setParticles] = useState<DandiyaParticle[]>([]);
  const [dandiyaHitAnim, setDandiyaHitAnim] = useState(false);
  const [taaliHitAnim, setTaaliHitAnim] = useState(false);

  // Subscribe to audio engine beat and lyrics notifications
  useEffect(() => {
    const unsubBeat = garbaAudio.subscribeBeat((step) => {
      setActiveStep(step);
      setIsPlaying(garbaAudio.isRunning());
    });

    const unsubSong = garbaAudio.subscribeSongChange((song) => {
      setCurrentSong(song);
      setBpm(garbaAudio.getBpm());
      setLeadInstrument(garbaAudio.getLeadInstrument());
      if (song.lyrics.length > 0) {
        setLyricsLine(song.lyrics[0]);
      }
    });

    const unsubLyrics = garbaAudio.subscribeLyrics((lineIdx, _, noteName) => {
      const s = garbaAudio.getCurrentSong();
      if (s.lyrics[lineIdx]) {
        setLyricsLine(s.lyrics[lineIdx]);
      }
      setLastNote(noteName);
    });

    return () => {
      unsubBeat();
      unsubSong();
      unsubLyrics();
    };
  }, []);

  // Update flying festive spark particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15, // gravity
            opacity: p.opacity - 0.04,
            rotation: p.rotation + 8,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 20);
    return () => clearInterval(interval);
  }, [particles.length]);

  const handleTogglePlay = () => {
    if (streamMode) {
      if (isPlaying) {
        garbaAudio.stopLiveStream();
        setIsPlaying(false);
      } else {
        garbaAudio.playLiveStream();
        setIsPlaying(true);
      }
    } else {
      const running = garbaAudio.togglePlay();
      setIsPlaying(running);
    }
  };

  const handleSelectSong = (songId: string) => {
    garbaAudio.setSong(songId);
    setShowSongList(false);
    if (!isPlaying) {
      garbaAudio.start();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    const next = garbaAudio.nextSong();
    setCurrentSong(next);
  };

  const handlePrevSong = () => {
    const prev = garbaAudio.prevSong();
    setCurrentSong(prev);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    garbaAudio.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBpm(val);
    garbaAudio.setBpm(val);
  };

  const handleInstrumentChange = (inst: 'harmonium' | 'bansuri' | 'shehnai') => {
    setLeadInstrument(inst);
    garbaAudio.setLeadInstrument(inst);
  };

  // Interactive Dandiya strike with physical particle burst
  const handleStrikeDandiya = (e: React.MouseEvent<HTMLButtonElement>) => {
    garbaAudio.playDandiyaClack(1.2);
    setDandiyaHitAnim(true);
    setTimeout(() => setDandiyaHitAnim(false), 200);

    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = ['#ffa000', '#00e3fd', '#ff4d4f', '#52c41a', '#ffd666'];
    const newParticles: DandiyaParticle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 6 - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4,
      rotation: Math.random() * 360,
      opacity: 1,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleStrikeTaali = () => {
    garbaAudio.playTaali();
    garbaAudio.playGhungroo();
    setTaaliHitAnim(true);
    setTimeout(() => setTaaliHitAnim(false), 200);
  };

  const handleShoutHealo = () => {
    garbaAudio.playVocalChant();
  };

  return (
    <>
      {/* Floating Spark Particles */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: `rotate(${p.rotation}deg)`,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* Floating Garba Songs Jukebox Widget */}
      <div className="fixed bottom-4 right-4 z-40 max-w-[94vw] sm:max-w-md w-full transition-all duration-300">
        <div className="bg-[#15161c]/95 backdrop-blur-xl border border-[#2f3140] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-white">
          
          {/* Header Bar: Song Title, Mini Visualizer & Collapse Toggle */}
          <div className="p-3.5 bg-gradient-to-r from-[#1c1d25] via-[#1a1b22] to-[#221a17] border-b border-[#282a36] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Rotating Garba Disc icon */}
              <div 
                className={`w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff4d4f] via-[#ffa000] to-[#ffd666] flex items-center justify-center p-0.5 shadow-md flex-shrink-0 cursor-pointer ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
                onClick={handleTogglePlay}
                title={isPlaying ? 'Pause Song' : 'Play Song'}
              >
                <div className="w-full h-full rounded-full bg-[#15161c] flex items-center justify-center">
                  <Music2 className={`w-4 h-4 ${isPlaying ? 'text-[#ffa000]' : 'text-stone-400'}`} />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white truncate max-w-[170px] sm:max-w-[210px]">
                    {currentSong.title}
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#ffa000]/20 text-[#ffa000] text-[9px] font-bold rounded uppercase tracking-wider flex-shrink-0">
                    {currentSong.rhythmStyle}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 truncate">
                  <span className="truncate">{currentSong.artist}</span>
                  <span className="text-stone-600">•</span>
                  <span className="text-[#00e3fd] font-medium">{bpm} BPM</span>
                </div>
              </div>
            </div>

            {/* Quick Play/Pause + Expand Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handlePrevSong}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#252733] transition-colors"
                title="Previous Garba Song"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className={`p-2 rounded-xl transition-all shadow-md ${
                  isPlaying
                    ? 'bg-[#ffa000] text-black hover:bg-[#ffb338]'
                    : 'bg-[#252733] text-white hover:bg-[#323444]'
                }`}
                title={isPlaying ? 'Pause' : 'Play Song'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleNextSong}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#252733] transition-colors"
                title="Next Garba Song"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#252733] transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#252733] transition-colors"
                title={isExpanded ? 'Collapse Jukebox' : 'Open Full Garba Jukebox'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 text-[#ffa000]" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Karaoke Lyrics Bar (Always visible when playing or expanded) */}
          <div className="px-3.5 py-2 bg-[#101115] border-b border-[#20212a] flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-2">
              <span className="text-base flex-shrink-0">🪔</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#ffa000] truncate tracking-wide">
                  {lyricsLine.gujarati}
                </p>
                <p className="text-[11px] text-stone-400 truncate italic">
                  "{lyricsLine.english}"
                </p>
              </div>
            </div>

            {/* Note badge */}
            <div className="flex-shrink-0 px-2 py-0.5 bg-[#1b1c24] border border-[#2d2f3c] rounded text-[10px] font-mono text-[#00e3fd]">
              {lastNote}
            </div>
          </div>

          {/* Expanded Jukebox Panel */}
          {isExpanded && (
            <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
              
              {/* Garba Songs Selector Dropdown / Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-300 flex items-center gap-1.5">
                    <ListMusic className="w-3.5 h-3.5 text-[#ffa000]" />
                    <span>Select Garba Song ({GARBA_SONGS.length} Famous Hits)</span>
                  </span>
                  <button
                    onClick={() => setShowSongList(!showSongList)}
                    className="text-[#ffa000] text-[11px] font-semibold hover:underline"
                  >
                    {showSongList ? 'Hide List' : 'Browse All Songs'}
                  </button>
                </div>

                {/* Song Cards Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {GARBA_SONGS.map((song) => {
                    const isSelected = song.id === currentSong.id;
                    return (
                      <button
                        key={song.id}
                        onClick={() => handleSelectSong(song.id)}
                        className={`p-2 rounded-xl text-left transition-all border ${
                          isSelected
                            ? 'bg-[#291705] border-[#ffa000] text-white shadow-sm'
                            : 'bg-[#181920] border-[#262835] text-stone-300 hover:bg-[#20212a] hover:border-stone-600'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-black truncate block">
                            {song.title}
                          </span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#ffa000] flex-shrink-0 animate-ping" />}
                        </div>
                        <span className="text-[10px] text-stone-400 block truncate">
                          {song.artist.split('&')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lead Instrument Selector */}
              <div className="p-3 rounded-xl bg-[#1a1b23] border border-[#272936] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-300">Lead Melody Instrument</span>
                  <span className="text-[11px] text-[#ffa000] uppercase font-semibold">{leadInstrument}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleInstrumentChange('harmonium')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                      leadInstrument === 'harmonium'
                        ? 'bg-[#ffa000] text-black'
                        : 'bg-[#21232d] text-stone-300 hover:bg-[#2a2c3a]'
                    }`}
                  >
                    🎹 Harmonium
                  </button>
                  <button
                    onClick={() => handleInstrumentChange('bansuri')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                      leadInstrument === 'bansuri'
                        ? 'bg-[#00e3fd] text-black'
                        : 'bg-[#21232d] text-stone-300 hover:bg-[#2a2c3a]'
                    }`}
                  >
                    🪈 Krishna Bansuri
                  </button>
                  <button
                    onClick={() => handleInstrumentChange('shehnai')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                      leadInstrument === 'shehnai'
                        ? 'bg-[#ff4d4f] text-white'
                        : 'bg-[#21232d] text-stone-300 hover:bg-[#2a2c3a]'
                    }`}
                  >
                    🎺 Folk Shehnai
                  </button>
                </div>
              </div>

              {/* Real-time Beat & Rhythm Pulse Strip */}
              <div className="p-3 rounded-xl bg-[#171820] border border-[#282a38] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300 font-bold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#ffa000]" />
                    <span>Live Garba Dhol Beat Matrix</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#00e3fd]">
                    Step {(activeStep % 8) + 1}/8
                  </span>
                </div>

                {/* 8-step rhythmic pulse indicator */}
                <div className="grid grid-cols-8 gap-1 py-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => {
                    const isActive = (activeStep % 8) === step;
                    return (
                      <div
                        key={step}
                        className={`h-7 rounded-md flex flex-col items-center justify-center transition-all ${
                          isActive
                            ? 'bg-gradient-to-t from-[#ffa000] to-[#ffd666] scale-105 shadow-md shadow-[#ffa000]/40'
                            : 'bg-[#22242f] text-stone-500'
                        }`}
                      >
                        <span className={`text-[10px] font-black ${isActive ? 'text-black' : 'text-stone-400'}`}>
                          {step === 0 ? 'DHUM' : step === 2 || step === 5 ? 'TA' : 'TAK'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tempo Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1 font-semibold">
                    <Sliders className="w-3.5 h-3.5 text-[#ffa000]" />
                    <span>Garba Tempo</span>
                  </span>
                  <span className="font-mono text-[#ffa000] font-bold">{bpm} BPM</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="155"
                  value={bpm}
                  onChange={handleBpmChange}
                  className="w-full accent-[#ffa000] bg-[#272935] h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span>Slow Hich (80)</span>
                  <span>Classic (112)</span>
                  <span>Fast Dodhiya / Sanedo (155)</span>
                </div>
              </div>

              {/* Interactive Garba Beat-Box Play Along */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-stone-300 block">
                  Interactive Sound FX (Tap to Play Along!)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleStrikeDandiya}
                    className={`py-2 px-3 rounded-xl border border-[#3b3d4f] font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                      dandiyaHitAnim
                        ? 'bg-[#ffa000] text-black scale-95 border-[#ffa000]'
                        : 'bg-[#1e202a] text-stone-200 hover:bg-[#282a37]'
                    }`}
                  >
                    <span>🥢 Dandiya Clack</span>
                    <span className="text-[9px] opacity-70">Physical Hit</span>
                  </button>

                  <button
                    onClick={handleStrikeTaali}
                    className={`py-2 px-3 rounded-xl border border-[#3b3d4f] font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                      taaliHitAnim
                        ? 'bg-[#00e3fd] text-black scale-95 border-[#00e3fd]'
                        : 'bg-[#1e202a] text-stone-200 hover:bg-[#282a37]'
                    }`}
                  >
                    <span>👏 Garba Taali</span>
                    <span className="text-[9px] opacity-70">Hand Clap + Bell</span>
                  </button>

                  <button
                    onClick={handleShoutHealo}
                    className="py-2 px-3 rounded-xl border border-[#3b3d4f] bg-[#1e202a] hover:bg-[#282a37] text-stone-200 font-bold text-xs flex flex-col items-center gap-1 transition-all active:scale-95"
                  >
                    <span>🗣️ "Haalo Re!"</span>
                    <span className="text-[9px] opacity-70">Vocal Cheer</span>
                  </button>
                </div>
              </div>

              {/* Live Gujarati Garba FM Stream Alternative */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#171a25] to-[#201815] border border-[#2d2f3d] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#00e3fd] flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Live 24/7 Gujarati Garba Radio
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Non-stop live folk streams from Gujarat
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const next = !streamMode;
                    setStreamMode(next);
                    if (next) {
                      garbaAudio.playLiveStream();
                      setIsPlaying(true);
                    } else {
                      garbaAudio.stopLiveStream();
                      garbaAudio.start();
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    streamMode
                      ? 'bg-[#00e3fd] text-black'
                      : 'bg-[#292b38] text-stone-300 hover:text-white'
                  }`}
                >
                  {streamMode ? 'Streaming Live' : 'Switch to Live FM'}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};
