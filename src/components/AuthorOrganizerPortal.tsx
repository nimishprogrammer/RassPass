import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Radio, 
  ShieldCheck, 
  Users, 
  Car, 
  MapPin, 
  Zap, 
  Bell, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Key, 
  ExternalLink,
  Flame,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { GroundPassEvent, GateTelemetry, GarbaAnnouncement } from '../types';
import { GROUND_EVENTS } from '../data/mockData';

interface AuthorOrganizerPortalProps {
  onPublishNewEvent?: (event: GroundPassEvent) => void;
  onReturnToExplore: () => void;
}

const INITIAL_GATES: GateTelemetry[] = [
  {
    gateId: 'gate-1',
    name: 'Gate 1 (General Amdavadi Entry)',
    status: 'moderate',
    entriesCount: 14280,
    capacityLimit: 22000,
    fastagBoomActive: true,
    lastScanTimestamp: '10 seconds ago',
  },
  {
    gateId: 'gate-2',
    name: 'Gate 2 (Couples & Traditional Garba Mandli)',
    status: 'smooth',
    entriesCount: 8450,
    capacityLimit: 15000,
    fastagBoomActive: true,
    lastScanTimestamp: '4 seconds ago',
  },
  {
    gateId: 'gate-3-vip',
    name: 'Gate 3 (VIP & Artists FASTag Boom Barrier)',
    status: 'smooth',
    entriesCount: 2150,
    capacityLimit: 4000,
    fastagBoomActive: true,
    lastScanTimestamp: 'Just now',
  },
];

const INITIAL_ANNOUNCEMENTS: GarbaAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Kinjal Dave Live Set Commencing',
    content: 'Main arena performance starting at 10:15 PM sharp. General gates running at smooth 12-second clearance.',
    venueId: 'gmdc-ground',
    venueName: 'GMDC Ground Garba Carnival',
    timestamp: '9:45 PM',
    priority: 'highlight',
    authorName: 'Amdavadi Cultural Committee',
  },
  {
    id: 'ann-2',
    title: 'S.G. Highway Parking Zone B Advisory',
    content: 'Zone B has reached 88% capacity. Guest vehicles redirected to Zone C with automated valet shuttles.',
    venueId: 'shankus-farm',
    venueName: 'Shankus Dandiya Dham',
    timestamp: '9:20 PM',
    priority: 'urgent',
    authorName: 'Ahmedabad Traffic Police & FASTag Desk',
  },
];

export const AuthorOrganizerPortal: React.FC<AuthorOrganizerPortalProps> = ({
  onReturnToExplore,
}) => {
  const [activeTab, setActiveTab] = useState<'turnstiles' | 'publish' | 'announcements' | 'firebase'>('turnstiles');
  const [gates, setGates] = useState<GateTelemetry[]>(INITIAL_GATES);
  const [announcements, setAnnouncements] = useState<GarbaAnnouncement[]>(INITIAL_ANNOUNCEMENTS);

  // New Ground Event Form State
  const [newEvent, setNewEvent] = useState<Partial<GroundPassEvent>>({
    title: '',
    area: 'S.G. Highway',
    location: '',
    groundCap: '35,000 dancers',
    price: 699,
    priceUnit: '₹699 / night',
    tag: 'ORGANIZER VERIFIED',
    category: 'traditional',
    features: ['FASTag RFID Boom Barrier', 'Wooden Spring Dance Floor', 'Medical & Water Kiosks'],
  });

  // Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'normal' | 'urgent' | 'highlight'>('normal');

  const handleSimulateScan = (gateId: string) => {
    setGates((prev) =>
      prev.map((g) => {
        if (g.gateId === gateId) {
          const nextCount = Math.min(g.capacityLimit, g.entriesCount + Math.floor(Math.random() * 5 + 1));
          const fillRatio = nextCount / g.capacityLimit;
          const status = fillRatio > 0.85 ? 'surging' : fillRatio > 0.5 ? 'moderate' : 'smooth';
          return {
            ...g,
            entriesCount: nextCount,
            status,
            lastScanTimestamp: 'Just now',
          };
        }
        return g;
      })
    );
  };

  const handleToggleBoom = (gateId: string) => {
    setGates((prev) =>
      prev.map((g) => {
        if (g.gateId === gateId) {
          return { ...g, fastagBoomActive: !g.fastagBoomActive };
        }
        return g;
      })
    );
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;

    const created: GarbaAnnouncement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      content: newAnnContent,
      venueId: 'gmdc-ground',
      venueName: 'Ahmedabad Central Garba Authority',
      timestamp: 'Just now',
      priority: newAnnPriority,
      authorName: 'Official Ground Author Desk',
    };

    setAnnouncements([created, ...announcements]);
    setNewAnnTitle('');
    setNewAnnContent('');
  };

  const handlePublishGround = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🎉 Success! Garba Ground "${newEvent.title}" published with authenticated RFID boom gate routing.`);
    onReturnToExplore();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Author Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1c1810] via-[#16171f] to-[#121317] border border-[#ffa000]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa000] to-[#ffb338] text-black flex items-center justify-center font-bold text-xl shadow-lg shadow-[#ffa000]/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ffa000]/20 text-[#ffa000] border border-[#ffa000]/40">
                Ground Author & Organizer Command
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Turnstiles Live
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display mt-0.5">
              Ahmedabad Garba Management Portal
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReturnToExplore}
            className="px-4 py-2 rounded-xl bg-[#22232c] hover:bg-[#2d2e3a] text-stone-200 text-xs font-semibold border border-[#333544] transition-colors"
          >
            ← Back to Guest View
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#252631] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'turnstiles', label: 'Live Gate Turnstiles & FASTag', icon: Radio },
          { id: 'publish', label: 'Publish New Garba Arena', icon: Plus },
          { id: 'announcements', label: 'Broadcast Stage Bulletins', icon: Bell },
          { id: 'firebase', label: 'Firebase Architecture & Cloud Sync', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#ffa000] text-black shadow-lg shadow-[#ffa000]/15'
                  : 'bg-[#181921] text-stone-300 hover:text-white hover:bg-[#22242e] border border-[#2b2c37]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Live Gate Turnstiles & FASTag Boom Control */}
      {activeTab === 'turnstiles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#171820] border border-[#282937]">
              <div className="text-[10px] uppercase font-bold text-stone-400">Total Check-Ins Tonight</div>
              <div className="text-2xl font-black text-white font-display mt-1">24,880</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero gate congestion</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#171820] border border-[#282937]">
              <div className="text-[10px] uppercase font-bold text-stone-400">Guest Pass Access Ratio</div>
              <div className="text-2xl font-black text-[#00e3fd] font-display mt-1">68.4%</div>
              <div className="text-[11px] text-stone-400 mt-1">Login-free instant entries active</div>
            </div>

            <div className="p-4 rounded-xl bg-[#171820] border border-[#282937]">
              <div className="text-[10px] uppercase font-bold text-stone-400">RFID FASTag Clearance Avg</div>
              <div className="text-2xl font-black text-[#ffa000] font-display mt-1">2.8 sec</div>
              <div className="text-[11px] text-stone-400 mt-1">Automated boom arm recognition</div>
            </div>
          </div>

          {/* Gate Telemetry Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#ffa000]" />
                <span>Live Entrance Gates & Automated Boom Barriers</span>
              </h3>
              <span className="text-xs text-stone-400">Tap "Simulate Scan" to test turnstile throughput</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gates.map((gate) => {
                const fillPercent = Math.round((gate.entriesCount / gate.capacityLimit) * 100);
                return (
                  <div
                    key={gate.gateId}
                    className="p-5 rounded-2xl bg-[#15161e] border border-[#272836] shadow-xl space-y-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{gate.name}</h4>
                        <div className="text-[10px] text-stone-400 mt-0.5">Last scan: {gate.lastScanTimestamp}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        gate.status === 'smooth'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : gate.status === 'moderate'
                          ? 'bg-[#ffa000]/20 text-[#ffa000] border border-[#ffa000]/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {gate.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-stone-300">Throughput Capacity</span>
                        <span className="text-white font-mono">{gate.entriesCount.toLocaleString()} / {gate.capacityLimit.toLocaleString()} ({fillPercent}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#232431] overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            fillPercent > 85 ? 'bg-red-500' : fillPercent > 50 ? 'bg-[#ffa000]' : 'bg-[#00e3fd]'
                          }`}
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="pt-2 border-t border-[#232431] flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleBoom(gate.gateId)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          gate.fastagBoomActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        FASTag: {gate.fastagBoomActive ? 'ARMED' : 'MANUAL'}
                      </button>

                      <button
                        onClick={() => handleSimulateScan(gate.gateId)}
                        className="px-3 py-1.5 rounded-lg bg-[#ffa000] hover:bg-[#ffb338] text-black text-xs font-bold transition-all active:scale-95 shadow"
                      >
                        + Simulate Scan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Publish New Garba Arena */}
      {activeTab === 'publish' && (
        <form onSubmit={handlePublishGround} className="p-6 rounded-2xl bg-[#15161e] border border-[#272836] shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#252632]">
            <div>
              <h3 className="text-lg font-bold text-white">Publish New Ahmedabad Garba Arena</h3>
              <p className="text-xs text-stone-400">Ground will appear in live radar with Google Maps navigation coordinates</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#ffa000]/15 text-[#ffa000] text-xs font-bold border border-[#ffa000]/30">
              Instant Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Arena / Ground Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sindhu Bhavan Open Air Dandiya Arena"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Ahmedabad Locality / Corridor</label>
              <select
                value={newEvent.area}
                onChange={(e) => setNewEvent({ ...newEvent, area: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              >
                <option value="S.G. Highway">S.G. Highway Corridor</option>
                <option value="Sindhu Bhavan">Sindhu Bhavan Road</option>
                <option value="GMDC Ground">GMDC Ground Area</option>
                <option value="Riverfront">Sabarmati Riverfront</option>
                <option value="Old City / Heritage">Old City / UNESCO Mandvi Pol</option>
                <option value="Bopal - Ambli">Bopal - Ambli Road</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Full Venue Address</label>
              <input
                type="text"
                required
                placeholder="e.g. Near Taj Skyline, Sindhu Bhavan Road, Bodakdev"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Maximum Ground Capacity</label>
              <input
                type="text"
                value={newEvent.groundCap}
                onChange={(e) => setNewEvent({ ...newEvent, groundCap: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Base Pass Price (₹ / night)</label>
              <input
                type="number"
                value={newEvent.price}
                onChange={(e) => setNewEvent({ ...newEvent, price: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Event Tag</label>
              <input
                type="text"
                value={newEvent.tag}
                onChange={(e) => setNewEvent({ ...newEvent, tag: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#252632]">
            <button
              type="button"
              onClick={onReturnToExplore}
              className="px-5 py-2.5 rounded-xl bg-[#22242e] hover:bg-[#2c2f3d] text-stone-300 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#ffa000] hover:bg-[#ffb338] text-black font-extrabold text-xs shadow-lg shadow-[#ffa000]/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Publish Arena Instantly</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Broadcast Stage Bulletins */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handlePostAnnouncement} className="lg:col-span-5 p-5 rounded-2xl bg-[#15161e] border border-[#272836] shadow-xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#ffa000]" />
              <span>Broadcast Live Navratri Announcement</span>
            </h3>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Round 2 Starting at 10:45 PM"
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Announcement Details</label>
              <textarea
                required
                rows={3}
                placeholder="Describe stage schedule, artist entry, or parking directions for attendees..."
                value={newAnnContent}
                onChange={(e) => setNewAnnContent(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0f1015] border border-[#303240] text-white focus:outline-none focus:border-[#ffa000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Priority Level</label>
              <div className="flex gap-2">
                {(['normal', 'highlight', 'urgent'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNewAnnPriority(p)}
                    className={`flex-1 py-1.5 rounded-lg font-bold capitalize transition-all ${
                      newAnnPriority === p
                        ? p === 'urgent'
                          ? 'bg-red-500 text-white'
                          : 'bg-[#ffa000] text-black'
                        : 'bg-[#21232e] text-stone-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#ffa000] hover:bg-[#ffb338] text-black font-extrabold text-xs shadow-lg shadow-[#ffa000]/20 flex items-center justify-center gap-1.5"
            >
              <Bell className="w-4 h-4 fill-black" />
              <span>Broadcast Bulletin to Attendees</span>
            </button>
          </form>

          {/* Live Bulletin Feed */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Active Stage Bulletins ({announcements.length})
            </h4>

            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-xl bg-[#15161e] border border-[#272836] space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    ann.priority === 'urgent'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : ann.priority === 'highlight'
                      ? 'bg-[#ffa000]/20 text-[#ffa000] border border-[#ffa000]/40'
                      : 'bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/40'
                  }`}>
                    {ann.priority}
                  </span>
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{ann.timestamp}</span>
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white">{ann.title}</h5>
                <p className="text-xs text-stone-300 leading-relaxed">{ann.content}</p>
                <div className="text-[10px] text-stone-500 font-medium pt-1">
                  Issued by: {ann.authorName} • {ann.venueName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Firebase Architecture & Cloud Sync */}
      {activeTab === 'firebase' && (
        <div className="p-6 rounded-2xl bg-[#15161e] border border-[#272836] shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#252632]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a1b0b] border border-[#ffa000]/40 text-[#ffa000] flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Firebase Firestore Cloud Architecture</h3>
                <p className="text-xs text-stone-400">Persistent database, real-time turnstiles & author synchronization</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              IR Blueprint Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#0f1015] border border-[#252733] space-y-2">
              <div className="text-[#ffa000] font-bold text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Guest & Passholder Persistence</span>
              </div>
              <p className="text-stone-300">
                Firestore collections (<code className="text-[#00e3fd]">bookings</code> & <code className="text-[#00e3fd]">passes</code>) store guest passes generated without an account, tied to encrypted device tokens and FASTag vehicle numbers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1015] border border-[#252733] space-y-2">
              <div className="text-[#ffa000] font-bold text-sm flex items-center gap-1.5">
                <Radio className="w-4 h-4" />
                <span>Real-Time Turnstile Broadcasts</span>
              </div>
              <p className="text-stone-300">
                Using Firestore <code className="text-[#00e3fd]">onSnapshot</code> listeners, gate throughput counters, boom arm status, and stage announcements update simultaneously across all attendees' mobile devices.
              </p>
            </div>
          </div>

          {/* Blueprint Code Preview */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Schema Intermediate Representation (IR: firebase-blueprint.json)
            </div>
            <pre className="p-4 rounded-xl bg-[#0c0d12] border border-[#20222d] text-[11px] font-mono text-[#00e3fd] overflow-x-auto">
{`{
  "entities": {
    "venues": { "fields": { "title": "string", "area": "string", "capacity": "number", "lat": "number", "lng": "number" } },
    "passes": { "fields": { "mPassRef": "string", "guestName": "string", "night": "string", "isPaid": "boolean" } },
    "gateTelemetry": { "fields": { "gateId": "string", "entriesCount": "number", "boomActive": "boolean" } },
    "announcements": { "fields": { "title": "string", "priority": "string", "timestamp": "string" } }
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
