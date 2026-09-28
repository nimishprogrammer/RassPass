/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileTabBar } from './components/MobileTabBar';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { GarbaMotionBeatPlayer } from './components/GarbaMotionBeatPlayer';
import { Sparkles } from 'lucide-react';

// Code-split dynamic page imports for optimal Core Web Vitals & instantaneous navigation
const HomePage = React.lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const EventDetailPage = React.lazy(() => import('./pages/EventDetailPage').then((m) => ({ default: m.EventDetailPage })));
const SmartParkingPage = React.lazy(() => import('./pages/SmartParkingPage').then((m) => ({ default: m.SmartParkingPage })));
const PassesWalletPage = React.lazy(() => import('./pages/PassesWalletPage').then((m) => ({ default: m.PassesWalletPage })));
const LineupPage = React.lazy(() => import('./pages/LineupPage').then((m) => ({ default: m.LineupPage })));
const SchedulePage = React.lazy(() => import('./pages/SchedulePage').then((m) => ({ default: m.SchedulePage })));
const LiveArenaGatesPage = React.lazy(() => import('./pages/LiveArenaGatesPage').then((m) => ({ default: m.LiveArenaGatesPage })));
const OrganizerPage = React.lazy(() => import('./pages/OrganizerPage').then((m) => ({ default: m.OrganizerPage })));
const FaqGuidelinesPage = React.lazy(() => import('./pages/FaqGuidelinesPage').then((m) => ({ default: m.FaqGuidelinesPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function PageLoadingFallback() {
  return (
    <div className="flex-1 min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-3" role="status" aria-label="Loading page">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-stone-800 border-t-[#ffa000] animate-spin" />
        <Sparkles className="w-4 h-4 text-[#ffa000] absolute" aria-hidden="true" />
      </div>
      <p className="text-xs text-stone-400 font-medium tracking-wide">
        Connecting to Gujarat fairground...
      </p>
    </div>
  );
}

function AnimatedAppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className="flex-1 flex flex-col"
      >
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<HomePage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/parking" element={<SmartParkingPage />} />
            <Route path="/passes" element={<PassesWalletPage />} />
            <Route path="/checkout-mpass" element={<PassesWalletPage />} />
            <Route path="/lineup" element={<LineupPage />} />
            <Route path="/artists" element={<LineupPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/gates" element={<LiveArenaGatesPage />} />
            <Route path="/organizer" element={<OrganizerPage />} />
            <Route path="/author-portal" element={<OrganizerPage />} />
            <Route path="/faq" element={<FaqGuidelinesPage />} />
            <Route path="/guidelines" element={<FaqGuidelinesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-[#121317] text-[#e3e2e7] flex flex-col font-sans selection:bg-[#ffa000] selection:text-black antialiased relative">
          {/* Top Global Navigation Bar */}
          <Navbar />

          {/* Main Dynamic Multi-Page Router View */}
          <main id="main-content" className="flex-1 flex flex-col pb-16 md:pb-0 focus:outline-none">
            <AnimatedAppRoutes />
          </main>

          {/* Global Real-Time Garba Beat Synthesizer & Dandiya Motion Player */}
          <GarbaMotionBeatPlayer />

          {/* Global Quick Search Modal */}
          <SearchModal />

          {/* Global Toast Notifications */}
          <Toast />

          {/* Mobile Bottom Navigation Bar */}
          <MobileTabBar />

          {/* Global Footer */}
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
