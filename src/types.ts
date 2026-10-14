export type Currency = 'USD' | 'KHR';
export type Language = 'EN' | 'KH';

export type TitleDeedType = 'Hard Title (L-Map)' | 'Verified Strata Title' | 'Soft Title (Sangkat)' | 'Borey Approved';

export interface Agent {
  id: string;
  name: string;
  nameKhmer?: string;
  title: string;
  avatar: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  initials?: string;
}

export interface Property {
  id: string;
  mlsId?: string;
  title: string;
  titleKhmer?: string;
  description: string;
  descriptionKhmer?: string;
  priceUsd: number;
  originalPriceUsd?: number;
  pricePerSqM: number;
  locationName: string;
  khan: string;
  sangkat: string;
  beds: number;
  baths: number;
  netArea: number; // in m²
  grossArea?: number;
  propertyType: 'condo' | 'villa' | 'twin-villa' | 'shophouse' | 'land';
  transactionType: 'sale' | 'rent';
  titleType: TitleDeedType;
  titleBadgeText: string;
  isForeignFreeholdStrata: boolean;
  featuredBadge?: string;
  image: string;
  galleryImages?: string[];
  agent: Agent;
  mapCoordinates: {
    topPercent: number; // e.g. 75
    leftPercent: number; // e.g. 45
    label: string; // e.g. "$115k"
  };
  floorLevel?: string;
  handoverReady?: boolean;
}

export interface BoreyDeveloper {
  id: string;
  name: string;
  location: string;
  projectTitle: string;
  tagline: string;
  fromPriceUsd: number;
  promoBadge: string;
  promoBadgeColor?: string;
  image: string;
}

export interface LeadItem {
  id: string;
  name: string;
  buyerType: string;
  timeAgo: string;
  propertyTitle: string;
  budget: string;
  actionChannel: 'telegram' | 'whatsapp' | 'email';
  channelHandle?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientInitial: string;
  quote: string;
  propertyContext: string;
}
