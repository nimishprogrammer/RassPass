# 🪔 RaasPass — Navratri Smart Passes & Fairground Infrastructure

[![React](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.18-CA4245.svg?logo=react-router)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](LICENSE)

**RaasPass** is an end-to-end, high-performance web platform designed to streamline ticketing, fairground transit, and festive navigation for Gujarat and India's grandest annual festival: **Navratri Mahotsav**.

Combining **login-free instant guest ticketing**, **authenticated offline RFID M-Passes**, **automated FASTag camera boom-gate parking**, **real-time turnstile queue clearance telemetry**, and an in-browser **melodic Web Audio Garba synthesizer**, RaasPass delivers a seamless, culturally rich, and highly accessible festive experience across Ahmedabad, Vadodara, Surat, Rajkot, and Gandhinagar.

---

## 🌟 Key Capabilities & Problems Solved

1. **Zero-Friction Guest Mode**: Attendees can browse grounds, select passes, configure FASTag parking, and generate verified M-Passes without mandatory account creation or password barriers.
2. **Turnstile Congestion Radar**: Live gate clearance wait times and capacity telemetry prevent bottlenecking at fairground entrances.
3. **Automated FASTag Parking**: Link vehicle registration numbers (e.g. `GJ-06-AB-4092`) for instantaneous ANPR camera boom gate opening without cash or paper receipts.
4. **Offline Authenticated M-Pass**: Secure time-based tokens with dynamic holograms and turnstile scan simulators that function even in low-connectivity fairgrounds.
5. **Interactive Garba Audio Synthesizer**: Native Web Audio API synthesis replicating traditional Gujarati instruments (Harmonium, Bansuri flute, Shehnai, Dhol, and Dandiya clacks).

---

## 🗺️ Multi-Page Application Architecture

RaasPass is engineered as a scalable, multi-page Single-Page Application (SPA) using **React Router v7** with code-splitting (`React.lazy` + `Suspense`), browser history support, deep linking, and smooth animated view transitions (`motion/react`):

| Route | Page | Key Features |
|---|---|---|
| `/` or `/events` | **Explore Grounds** | Interactive city switcher (Ahmedabad, Vadodara, Surat, Rajkot, Gandhinagar), area filter, category pills (Traditional, Heritage, Disco EDM, Folk, Carnival), interactive arena map, and live capacity counters. |
| `/events/:eventId` | **Event & Pass Tiers** | Deep-linked per venue (`united-way`, `shankus-dandiya`, `gmdc-carnival`, `mirchi-rock-dhol`, `heritage-pol-garba`). Night date picker, tiered pass counters (`Single Night`, `9-Nights Season`, `VIP Lounge`, `Couple`), promo code engine (`GARBA20`, `NAVDUO`), and ground layout map. |
| `/parking` | **Smart FASTag Parking** | 4-Wheeler, 2-Wheeler, EV Charging Bay, and VIP Valet category selection; Zone A/B/C occupancy gauges; arrival window scheduling; and automated boom barrier simulation. |
| `/passes` | **Digital M-Pass Wallet** | Authenticated offline RFID pass, dynamic QR with security hologram, instant mock checkout, pass transfer mechanism, and Apple/Google Wallet export. |
| `/lineup` | **Celebrity Lineup** | Featured headliners (Kinjal Dave, Aditya Gadhvi, Atul Purohit, Osman Mir, Geeta Rabari, Kirtidan Gadhvi) with bios, hit tracks, performance nights, in-browser audio beat previews, and direct booking links. |
| `/schedule` | **9-Nights Schedule & Colors** | Complete Day 1 to 9 Navratri festival calendar: Maa Navdurga deities, daily auspicious color guidelines with hex palettes, traditional dress instructions, Aarti timings, and partnering grounds. |
| `/gates` | **Live Arena Telemetry** | Real-time turnstile queue clearance speeds (Gates 1–4), FASTag boom status, live ground occupancy gauges, and emergency medical camp locations. |
| `/organizer` | **Organizer Command Hub** | Turnstile RFID gate scanner simulator, live emergency announcement broadcast publisher, and capacity quota settings. |
| `/faq` | **Guidelines, Safety & FAQ** | Categorized accordion guide: traditional dress code rules, barefoot dance floor etiquette, FASTag parking instructions, refund policies, and 24x7 emergency contacts. |
| `*` | **404 Not Found** | Accessible missing-mandala screen with fast recovery links to all main destinations. |

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19**: Modern component architecture utilizing concurrent features.
- **TypeScript**: Strict static typing across all entities, state, and telemetry.
- **Vite 8**: Sub-second Hot Module Replacement (HMR) and optimized Rollup production builds.
- **Tailwind CSS v4**: Ultra-fast utility styling engine with modern CSS variable tokens.
- **React Router v7**: Declarative client-side routing, route-level code splitting, and browser history synchronization.
- **Motion (`motion/react`)**: Micro-animations and route transitions with `<AnimatePresence mode="wait">`.
- **Lucide React**: Clean, accessible iconography with standard stroke weights.
- **Web Audio API**: Real-time programmatic synthesis of Harmonium, Bansuri, Shehnai, Dholak, and Dandiya acoustic percussion.
- **Google GenAI SDK (`@google/genai`)**: Pre-configured for generative festive assistance and intelligent ground recommendations.

---

## 🎨 Design System & Accessibility (a11y) Standards

RaasPass is built following modern web guidance and WCAG AA accessibility principles:

### Typography Hierarchy
- **Display Headings (`h1`, `h2`, `h3`)**: [`Outfit`](https://fonts.google.com/specimen/Outfit) in bold/extrabold weights for festive impact.
- **Body & Controls**: [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for optimal line height and readability.
- **Telemetry, Codes & Plates**: [`Space Grotesk`](https://fonts.google.com/specimen/Space+Grotesk) for pass references, FASTag plates, countdown timers, and capacity numbers.

### Color Palette & Aesthetics
- **Canvas**: Obsidian midnight (`#121317`) and card surface overlays (`#171822`, `#1b1c24`).
- **Festive Accents**: Warm golden amber (`#ffa000`, `#ffb865`), celebratory vermillion (`#f43f5e`), emerald live status (`#10b981`), and telemetry cyan (`#06b6d4`).
- **Glassmorphism**: Backdrop blur panels (`backdrop-blur-xl border border-[#2e2f3a]`).

### Accessibility (a11y) Features
- **Skip Link**: `<a href="#main-content">Skip to main content</a>` positioned at the top of the header.
- **Heading Order**: Exactly one semantic `<h1>` per page with `id="page-heading"` and `tabIndex={-1}`.
- **Screen Reader Route Announcer**: Dynamic route updates announced via `aria-live="polite"` through `<PageMeta>`.
- **Automatic Focus Management**: Programmatic shift of focus to `#page-heading` upon route navigation.
- **Semantic Breadcrumbs**: Structured `<nav aria-label="Breadcrumb">` with `aria-current="page"`.
- **Keyboard & Touch Targets**: Visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#ffa000]`), Esc-to-close modals, and touch targets $\ge$ 44x44px.
- **Mobile Navigation Bar**: Fixed bottom tab bar (`MobileTabBar`) on small screens for ergonomic one-thumb reach.

---

## 📂 Project Structure

```text
RassPass/
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable UI & section components
│   │   ├── AhmedabadGoogleMap.tsx      # Fairground map container
│   │   ├── AuthorOrganizerPortal.tsx   # Organizer dashboard view
│   │   ├── Breadcrumbs.tsx             # Accessible breadcrumb navigation
│   │   ├── CheckoutMPassView.tsx       # M-Pass checkout & wallet view
│   │   ├── EventDetailView.tsx         # Pass tier selection & event breakdown
│   │   ├── ExploreEventsView.tsx       # Ground discovery & filters view
│   │   ├── Footer.tsx                  # Semantic footer with sitemap links
│   │   ├── GarbaKaleidoscopeHero.tsx   # Interactive kaleidoscope hero
│   │   ├── GarbaMotionBeatPlayer.tsx   # Floating beat player & lyrics widget
│   │   ├── InteractiveMap.tsx          # SVG arena layout & gate markers
│   │   ├── MobileTabBar.tsx            # Bottom thumb navigation bar
│   │   ├── Navbar.tsx                  # Global sticky glassmorphic header
│   │   ├── PageMeta.tsx                # Title, description, and focus manager
│   │   ├── SearchModal.tsx             # Accessible search modal dialog
│   │   ├── SmartParkingView.tsx        # FASTag parking reservation view
│   │   └── Toast.tsx                   # Accessible notification toast
│   ├── context/
│   │   └── AppContext.tsx              # Global state (booking, profile, favorites)
│   ├── data/
│   │   └── mockData.ts                 # Grounds, artists, schedule, gates, FAQs
│   ├── pages/                  # Route page components (code-split)
│   │   ├── EventDetailPage.tsx         # /events/:eventId
│   │   ├── FaqGuidelinesPage.tsx       # /faq
│   │   ├── HomePage.tsx                # /
│   │   ├── LineupPage.tsx              # /lineup
│   │   ├── LiveArenaGatesPage.tsx      # /gates
│   │   ├── NotFoundPage.tsx            # 404
│   │   ├── OrganizerPage.tsx           # /organizer
│   │   ├── PassesWalletPage.tsx        # /passes
│   │   ├── SchedulePage.tsx            # /schedule
│   │   └── SmartParkingPage.tsx        # /parking
│   ├── types.ts                # TypeScript interfaces and domain types
│   ├── utils/
│   │   └── garbaAudio.ts               # Web Audio API Melodic & Rhythm Engine
│   ├── App.tsx                 # Root application with React Router & Motion
│   ├── index.css               # Tailwind CSS v4 directives & custom animations
│   └── main.tsx                # Application mounting entry point
├── index.html                  # HTML5 entry with preconnected Google Fonts
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite configuration with Tailwind & React plugins
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nimishprogrammer/RassPass.git
   cd RassPass
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts the Vite development server on `port 3000` with HMR. |
| `npm run build` | Compiles TypeScript and builds production-ready code-split assets into `dist/`. |
| `npm run preview` | Locally serves the production build from `dist/` for testing. |
| `npm run lint` | Runs `tsc --noEmit` to validate all TypeScript types and exports. |
| `npm run clean` | Removes compiled `dist/` artifacts. |

---

## 🔒 Security & Privacy Notice

- **Zero Credentials Required**: Attendees can test and use the full booking and M-Pass flow in guest mode without submitting real credit card credentials or sensitive personal information.
- **No Hardcoded Secrets**: Sensitive API keys and tokens must be provided via local `.env` variables and are never committed to version control.

---

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.
