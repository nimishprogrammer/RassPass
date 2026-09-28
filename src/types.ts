export type ViewMode = 'explore' | 'event-detail' | 'parking' | 'checkout-mpass' | 'author-portal';

export type UserRole = 'guest' | 'author' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  role: UserRole;
  isGuest: boolean;
  avatar?: string;
  fastagPlate?: string;
  savedPassesCount: number;
  lastLoginMethod: 'guest_instant' | 'organizer_pin' | 'phone_otp';
}

export interface GarbaAnnouncement {
  id: string;
  title: string;
  content: string;
  venueId: string;
  venueName: string;
  timestamp: string;
  priority: 'normal' | 'urgent' | 'highlight';
  authorName: string;
}

export interface GateTelemetry {
  gateId: string;
  name: string;
  status: 'smooth' | 'moderate' | 'surging' | 'rfid_locked';
  entriesCount: number;
  capacityLimit: number;
  fastagBoomActive: boolean;
  lastScanTimestamp: string;
}


export interface PassTier {
  id: string;
  name: string;
  tag?: string;
  gate: string;
  description: string;
  price: number;
  originalPrice?: number;
  isBestValue?: boolean;
  pricingNote?: string;
  quantity: number;
  tierType: 'single' | 'season' | 'vip' | 'couple';
}

export interface ParkingCategory {
  id: '4w' | '2w' | 'ev' | 'valet';
  name: string;
  description: string;
  pricePerNight: number;
  icon: string;
}

export interface ParkingZone {
  id: 'zone-a' | 'zone-b' | 'zone-c';
  code: string;
  name: string;
  tag?: string;
  proximity: string;
  slotsFree: number;
  fillPercentage: number;
  price: number;
  features: string;
  isRecommended?: boolean;
}

export interface Headliner {
  id: string;
  name: string;
  badge: string;
  badgeType: 'queen' | 'maestro' | 'chartbuster' | 'disco';
  subtitle: string;
  dates: string;
  location: string;
  fromPrice: number;
  priceUnit: string;
  image: string;
  rating?: string;
}

export interface GroundPassEvent {
  id: string;
  title: string;
  city?: string;
  tag: string;
  subtag?: string;
  location: string;
  area: string;
  lat: number;
  lng: number;
  groundCap: string;
  groundArea?: string;
  features: string[];
  parkingInfo: string;
  slotsLeftBadge?: string;
  price: number;
  strikePrice?: number;
  isFree?: boolean;
  priceUnit: string;
  fullSeasonPrice?: number;
  image: string;
  category: 'traditional' | 'carnival' | 'disco' | 'folk' | 'edm' | 'heritage';
}

export interface BookingState {
  eventId: string;
  eventName: string;
  venueName: string;
  city: string;
  eventDate: string;
  selectedNight: string;
  passes: { [tierId: string]: number };
  withParking: boolean;
  parkingCategory: '4w' | '2w' | 'ev' | 'valet';
  parkingZone: 'zone-a' | 'zone-b' | 'zone-c';
  parkingArrivalWindow: string;
  licensePlate: string;
  driverPhone: string;
  autoBoomEnabled: boolean;
  expressValet: boolean;
  evCharging: boolean;
  appliedPromo: string | null;
  promoDiscount: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'credits';
  vpaAddress: string;
  isPaid: boolean;
  guestName: string;
  mPassRef: string;
}

export interface FestivalScheduleNight {
  nightNumber: number;
  title: string;
  date: string;
  dayOfWeek: string;
  deity: string;
  colorName: string;
  colorHex: string;
  colorBgClass: string;
  dressGuideline: string;
  traditionalAartiTime: string;
  megaRaasRounds: string;
  highlights: string[];
  recommendedVenues: { id: string; name: string; city: string }[];
}

export interface FaqItem {
  id: string;
  category: 'passes' | 'parking' | 'etiquette' | 'safety' | 'venue';
  question: string;
  answer: string;
}

export interface ArtistProfile extends Headliner {
  bio: string;
  genre: string;
  notableTracks: string[];
  performanceNights: string;
  venueId: string;
  venueName: string;
}

