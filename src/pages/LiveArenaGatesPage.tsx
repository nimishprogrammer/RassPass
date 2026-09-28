import React, { useState, useEffect } from 'react';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GATE_TELEMETRY_DATA } from '../data/mockData';
import { GateTelemetry } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  Radio, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Car, 
  Sparkles,
  RefreshCw,
  PhoneCall,
  MapPin
} from 'lucide-react';

export const LiveArenaGatesPage: React.FC = () => {
  const { showToast } = useApp();
  const [gates, setGates] = useState<GateTelemetry[]>(GATE_TELEMETRY_DATA);
  const [simulating, setSimulating] = useState(false);

  // Auto-simulate subtle gate traffic changes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGates((prev) =>
        prev.map((gate) => {
          const delta = Math.floor(Math.random() * 7 - 2); // -2 to +4 entries
          const nextCount = Math.max(0, Math.min(gate.capacityLimit, gate.entriesCount + delta));
          const fillRatio = nextCount / gate.capacityLimit;
          const status = fillRatio > 0.88 ? 'surging' : fillRatio > 0.55 ? 'moderate' : 'smooth';
          return {
            ...gate,
            entriesCount: nextCount,
            status,
            lastScanTimestamp: 'Just now',
          };
        })
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateScan = (gateId: string) => {
    setSimulating(true);
    setGates((prev) =>
      prev.map((g) => {
        if (g.gateId === gateId) {
          const nextCount = Math.min(g.capacityLimit, g.entriesCount + 12);
          const fillRatio = nextCount / g.capacityLimit;
          const status = fillRatio > 0.88 ? 'surging' : fillRatio > 0.55 ? 'moderate' : 'smooth';
          return {
            ...g,
            entriesCount: nextCount,
            status,
            lastScanTimestamp: '1 second ago',
          };
        }
        return g;
      })
    );
    showToast(`Scanned pass at ${gateId}`);
    setTimeout(() => setSimulating(false), 300);
  };

  const totalEntries = gates.reduce((sum, g) => sum + g.entriesCount, 0);
  const totalCapacity = gates.reduce((sum, g) => sum + g.capacityLimit, 0);
  const overallPercentage = Math.round((totalEntries / totalCapacity) * 100);

  const breadcrumbItems = [
    { label: 'Live Arena & Gate Flow Radar' },
  ];

  return (
    <>
      <PageMeta
        title="Live Arena Telemetry & Gate Flow Radar"
        description="Real-time fairground gate telemetry, turnstile queue clearance speeds, FASTag automated boom barrier status, and ground capacity monitors."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-8 pb-16">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <section aria-labelledby="page-heading" className="space-y-4 border-b border-[#252631] pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c242c] border border-[#00e3fd]/40 text-[#00e3fd] text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
            <span>REAL-TIME GATE TELEMETRY &bull; 100% OPERATIONAL</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 id="page-heading" tabIndex={-1} className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight focus:outline-none">
                Live Arena &amp; Gate Flow Radar
              </h1>
              <p className="text-sm text-stone-300 max-w-2xl mt-2 leading-relaxed">
                Direct sensor telemetry from fairground turnstiles, contactless RFID wristband kiosks, and automated FASTag vehicle boom barriers across partnering arenas.
              </p>
            </div>

            {/* Overall Ground Meter Gauge */}
            <div className="bg-[#171822] border border-[#2b2d3c] p-4 rounded-2xl flex items-center gap-5 shrink-0 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Total Arena Capacity
                </span>
                <div className="text-2xl font-black text-white font-label">
                  {totalEntries.toLocaleString()} <span className="text-sm font-normal text-stone-400">/ {totalCapacity.toLocaleString()}</span>
                </div>
                <div className="w-48 h-2 rounded-full bg-[#272836] overflow-hidden mt-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      overallPercentage > 85 ? 'bg-[#ff4d4f]' : overallPercentage > 60 ? 'bg-[#ffa000]' : 'bg-[#00e3fd]'
                    }`}
                    style={{ width: `${overallPercentage}%` }}
                  />
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-[#ffa000] font-label">{overallPercentage}%</span>
                <span className="text-[10px] text-stone-400 block">Occupancy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Gates Status Cards */}
        <section aria-label="Individual Turnstile Gate Telemetry" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gates.map((gate) => {
            const fillPct = Math.round((gate.entriesCount / gate.capacityLimit) * 100);
            const isSurging = gate.status === 'surging';
            const isModerate = gate.status === 'moderate';

            return (
              <article
                key={gate.gateId}
                className="bg-[#171822] border border-[#2c2d3a] rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden"
              >
                {/* Gate Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
                        style={{
                          backgroundColor: isSurging ? '#ff4d4f' : isModerate ? '#ffa000' : '#10b981'
                        }}
                      />
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {gate.name}
                      </h2>
                    </div>
                    <div className="text-xs text-stone-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
                      <span>Last RFID tap: {gate.lastScanTimestamp}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 font-label ${
                      isSurging
                        ? 'bg-[#2e1215] text-[#ff7875] border border-[#ff4d4f]/30'
                        : isModerate
                        ? 'bg-[#291e0a] text-[#ffa000] border border-[#ffa000]/30'
                        : 'bg-[#0f241a] text-[#52c41a] border border-[#10b981]/30'
                    }`}
                  >
                    {gate.status === 'surging' ? 'High Surge' : gate.status === 'moderate' ? 'Moderate Flow' : 'Clear & Smooth'}
                  </span>
                </div>

                {/* Meter Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Gate Flow Rate</span>
                    <span className="font-bold text-white font-label">
                      {gate.entriesCount.toLocaleString()} / {gate.capacityLimit.toLocaleString()} ({fillPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#20212d] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        fillPct > 85 ? 'bg-[#ff4d4f]' : fillPct > 60 ? 'bg-[#ffa000]' : 'bg-[#00e3fd]'
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>

                {/* Sub-features & FASTag Status */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#232431]">
                  <div className="p-2.5 rounded-xl bg-[#121318] border border-[#232430] flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#00e3fd] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] text-stone-400 block">FASTag Boom</span>
                      <strong className={gate.fastagBoomActive ? 'text-emerald-400' : 'text-stone-400'}>
                        {gate.fastagBoomActive ? 'Active 100%' : 'Turnstile Only'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#121318] border border-[#232430] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#ffa000] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] text-stone-400 block">Est. Clearance</span>
                      <strong className="text-white">
                        {isSurging ? '8 &ndash; 12 mins' : isModerate ? '3 &ndash; 5 mins' : '&lt; 1 min'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Simulator Trigger */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Live hardware webhook active
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSimulateScan(gate.gateId)}
                    disabled={simulating}
                    className="px-3 py-1.5 rounded-lg bg-[#222432] hover:bg-[#2b2d3d] text-stone-200 text-xs font-semibold border border-[#343649] transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#ffa000]"
                  >
                    <RefreshCw className={`w-3 h-3 text-[#ffa000] ${simulating ? 'animate-spin' : ''}`} aria-hidden="true" />
                    <span>Simulate Gate Tap</span>
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {/* Emergency Fairground Help & Medical Stations */}
        <section aria-labelledby="safety-heading" className="bg-[#191517] border border-[#ff4d4f]/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#36161b] text-[#ff7875] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="safety-heading" className="text-lg font-bold text-white font-display">
                  Emergency Medical &amp; Fairground Support Stations
                </h2>
                <p className="text-xs text-stone-300">
                  Cardiac mobile ICUs, dehydration recovery booths, and Women Helpline kiosks are stationed at every gate.
                </p>
              </div>
            </div>

            <a
              href="tel:18004272201"
              className="px-4 py-2.5 rounded-xl bg-[#ff4d4f] hover:bg-[#ff7875] text-white font-bold text-xs shrink-0 flex items-center gap-2 shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Call SOS Desk: 1800-GARBA-01</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#121318] border border-[#2b252a] text-stone-300">
              <strong className="text-white block mb-0.5">Gate 1 &amp; Gate 4</strong>
              108 Mobile Ambulance with defib units &amp; saline hydration stations.
            </div>
            <div className="p-3 rounded-xl bg-[#121318] border border-[#2b252a] text-stone-300">
              <strong className="text-white block mb-0.5">Central Control Room</strong>
              Lost Children &amp; Belongings assistance with public PA broadcast system.
            </div>
            <div className="p-3 rounded-xl bg-[#121318] border border-[#2b252a] text-stone-300">
              <strong className="text-white block mb-0.5">Every Gate Portal</strong>
              Gujarat Police &lsquo;SHE-Team&rsquo; personnel for 24x7 women safety escorts.
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
