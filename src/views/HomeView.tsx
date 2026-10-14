import React, { useState } from 'react';
import { Currency, Language, Property } from '../types';
import { formatPrice, formatApproxKhr } from '../utils/formatters';
import { boreyDevelopers, properties } from '../data/mockData';

interface HomeViewProps {
  currency: Currency;
  language: Language;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onNavigateExplore: (filters?: { location?: string; type?: string; maxPrice?: number }) => void;
  onSelectProperty: (property: Property) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currency,
  language,
  favorites,
  onToggleFavorite,
  onNavigateExplore,
  onSelectProperty,
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'borey' | 'commercial'>('buy');
  const [selectedLocation, setSelectedLocation] = useState('bkk1');
  const [selectedType, setSelectedType] = useState('condo');
  const [maxBudget, setMaxBudget] = useState(850000);
  const [activeCategory, setActiveCategory] = useState<'all' | 'condos' | 'villas' | 'shophouses'>('all');

  // Featured 4 properties for home grid
  const featuredProperties = properties.filter((p) =>
    ['the-peak-luxury-residence', 'grand-villa-grand-star', 'bkk1-designer-duplex', 'modern-shophouse-toul-kork'].includes(p.id)
  );

  const filteredFeatured = featuredProperties.filter((p) => {
    if (activeCategory === 'condos') return p.propertyType === 'condo';
    if (activeCategory === 'villas') return p.propertyType === 'villa' || p.propertyType === 'twin-villa';
    if (activeCategory === 'shophouses') return p.propertyType === 'shophouse';
    return true;
  });

  const handleSearchSubmit = () => {
    onNavigateExplore({
      location: selectedLocation,
      type: selectedType,
      maxPrice: maxBudget,
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION WITH INTEGRATED SEARCH PORTAL */}
      <section className="relative w-full -mt-20 pt-28 pb-16 lg:pb-24 overflow-hidden bg-primary-container">
        {/* Atmospheric architectural background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transform"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAor4rozyARCnOzOMa0eWmkY5z--uN3GUddF6pnuIZcstlbb9bdAsHeBHlvW6-oSO-645e36jIuEYYtYIpgvlayCdwxqMl7U3Po-suxwOjtkrYVy0scdIUSmdRuECPwGg_nFLw0B7ycSGVLjmoiniSopvv-JvAIAP5vfV_mYyvSgEjSQr6uPMl26NYFGcb9rU6CWXIFkVEGoOa4N5wx7uLfN41pfUZxmHbz1JKKOPbaLVySwz9MSm0TmQ')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-container/85 via-primary-container/70 to-surface pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-space-md lg:px-margin flex flex-col items-center">
          {/* Trust Micro-Pill */}
          <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-space-md py-1.5 rounded-full mb-space-md shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">
              Kingdom of Cambodia's Official Property Exchange
            </span>
            <span className="material-symbols-outlined text-secondary-fixed text-[16px]">verified</span>
          </div>

          {/* Bilingual Primary Headline */}
          <h1 className="font-display-hero text-display-hero text-center text-surface-container-lowest max-w-4xl tracking-tight leading-tight">
            Find Your Dream Home in Cambodia
            <span className="block font-headline-lg text-headline-lg text-secondary-container mt-1 font-semibold">
              ស្វែងរកគេហដ្ឋានក្នុងក្តីសុបិនរបស់អ្នក
            </span>
          </h1>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim text-center max-w-2xl mt-space-sm mb-space-lg">
            Explore 12,000+ certified villas, high-yield luxury condos, shophouses, and masterplanned Borey projects across Phnom Penh, Siem Reap, and Sihanoukville.
          </p>

          {/* FLOATING DISCOVERY PORTAL ENGINE */}
          <div className="w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-2xl p-space-md lg:p-space-lg backdrop-blur-xl">
            {/* Segmented Tab Navigators */}
            <div className="flex flex-wrap items-center gap-space-xs pb-space-md" id="search-tabs">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`search-tab px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'buy'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
                <span>Buy (ទិញ)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`search-tab px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'rent'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">key</span>
                <span>Rent (ជួល)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('borey')}
                className={`search-tab px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'borey'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">villa</span>
                <span>New Borey (បុរី)</span>
                <span className="bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  VIP
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('commercial')}
                className={`search-tab px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'commercial'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">storefront</span>
                <span>Commercial (ពាណិជ្ជកម្ម)</span>
              </button>
            </div>

            {/* Form Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm pt-space-xs items-center">
              {/* Location Select */}
              <div className="lg:col-span-4 flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-lg hover:bg-surface-container transition-colors">
                <label className="font-caption text-caption text-on-surface-variant flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>
                  Location / ទីតាំង
                </label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent font-headline-sm text-[15px] font-semibold text-on-surface focus:outline-none cursor-pointer pr-6 appearance-none"
                  >
                    <option value="all">All Locations (Cambodia-wide)</option>
                    <optgroup label="Phnom Penh Prime Khans (ភ្នំពេញ)">
                      <option value="bkk1">Boeung Keng Kang 1 (BKK1)</option>
                      <option value="tonle-bassac">Tonle Bassac &amp; Chamkarmon</option>
                      <option value="toul-kork">Toul Kork (TK)</option>
                      <option value="chroy-changvar">Chroy Changvar Peninsula</option>
                      <option value="sen-sok">Sen Sok &amp; Aeon Mall 2</option>
                      <option value="daun-penh">Daun Penh (Riverside)</option>
                      <option value="meanchey">Mean Chey / 60m Blvd</option>
                    </optgroup>
                    <optgroup label="Key Provinces (តាមបណ្តាខេត្ត)">
                      <option value="siem-reap">Siem Reap (Wat Bo &amp; Angkor)</option>
                      <option value="sihanoukville">Sihanoukville (Otres &amp; Coastal)</option>
                      <option value="kampot">Kampot Riverfront</option>
                    </optgroup>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-0.5 text-on-surface-variant pointer-events-none text-[18px]">
                    arrow_drop_down
                  </span>
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="lg:col-span-3 flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-lg hover:bg-surface-container transition-colors">
                <label className="font-caption text-caption text-on-surface-variant flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-secondary text-[16px]">home_work</span>
                  Type / ប្រភេទអចលនទ្រព្យ
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent font-headline-sm text-[15px] font-semibold text-on-surface focus:outline-none cursor-pointer pr-6 appearance-none"
                  >
                    <option value="all">All Property Categories</option>
                    <option value="condo">Luxury Strata Condominium</option>
                    <option value="twin-villa">Twin Villa (វីឡាកូនកាត់)</option>
                    <option value="villa">Queen / King Villa (វីឡាឃ្វីន)</option>
                    <option value="shophouse">Shophouse (ផ្ទះអាជីវកម្ម)</option>
                    <option value="land">Commercial / Res. Land (ដី)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-0.5 text-on-surface-variant pointer-events-none text-[18px]">
                    arrow_drop_down
                  </span>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="lg:col-span-3 flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-lg hover:bg-surface-container transition-colors">
                <div className="flex items-center justify-between">
                  <label className="font-caption text-caption text-on-surface-variant flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-secondary text-[16px]">payments</span>
                    Budget Range (USD)
                  </label>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                    {maxBudget >= 2000000 ? '$2M+ (Estate)' : `Up to $${Math.round(maxBudget / 1000)}k`}
                  </span>
                </div>
                <div className="relative mt-1">
                  <input
                    type="range"
                    min={30000}
                    max={2000000}
                    step={10000}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between items-center text-[10px] text-on-surface-variant mt-0.5 font-caption">
                    <span>$30k (Entry)</span>
                    <span>$2M+ (Estate)</span>
                  </div>
                </div>
              </div>

              {/* Search CTA */}
              <div className="lg:col-span-2 flex h-full">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full h-full min-h-[52px] bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container rounded-lg font-headline-sm text-[16px] font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Quick Trending Discovery Chips */}
            <div className="mt-space-md pt-space-sm flex flex-wrap items-center gap-space-xs text-on-surface-variant font-caption text-caption">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-on-tertiary-container text-[16px]">trending_up</span>
                Trending:
              </span>
              <button
                type="button"
                onClick={() => onNavigateExplore({ location: 'bkk1', type: 'condo' })}
                className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[12px] transition-colors cursor-pointer"
              >
                BKK1 Luxury Condos
              </button>
              <button
                type="button"
                onClick={() => onNavigateExplore({ location: 'sen-sok' })}
                className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[12px] transition-colors cursor-pointer"
              >
                Chip Mong Land Boreys
              </button>
              <button
                type="button"
                onClick={() => onNavigateExplore({ location: 'boeung-snor' })}
                className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[12px] transition-colors cursor-pointer"
              >
                Peng Huoth Grand Star Platinum
              </button>
              <button
                type="button"
                onClick={() => onNavigateExplore({ location: 'chroy-changvar' })}
                className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[12px] transition-colors cursor-pointer"
              >
                Riverside Sea-view Condos
              </button>
              <button
                type="button"
                onClick={() => onNavigateExplore()}
                className="px-2.5 py-1 rounded-full bg-tertiary-container/10 text-on-tertiary-container font-label-sm text-[12px] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Freehold Strata Titles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET TRUST & VERIFICATION STRIP */}
      <section className="w-full bg-surface-container-low py-space-md shadow-sm border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md items-center">
            {/* Trust 1 */}
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-tertiary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">100% Title Verified</span>
                <span className="font-caption text-caption text-on-surface-variant">L-Map Hard Title legal guarantee</span>
              </div>
            </div>
            {/* Trust 2 */}
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[24px]">format_image_left</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">Zero Ghost Listings</span>
                <span className="font-caption text-caption text-on-surface-variant">Audited availability &amp; real price</span>
              </div>
            </div>
            {/* Trust 3 */}
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">translate</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">Bilingual Expertise</span>
                <span className="font-caption text-caption text-on-surface-variant">Khmer, English &amp; Chinese advisory</span>
              </div>
            </div>
            {/* Trust 4 */}
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-lg bg-surface-container-highest flex items-center justify-center text-[#229ED9] shrink-0">
                <span className="material-symbols-outlined text-[24px]">send</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">Instant Telegram Chat</span>
                <span className="font-caption text-caption text-on-surface-variant">Direct certified agent response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VERIFIED PROPERTIES GRID ("អចលនទ្រព្យលេចធ្លោ") */}
      <section className="w-full max-w-7xl mx-auto px-space-md lg:px-margin py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs mb-1">
              <span className="material-symbols-outlined text-secondary text-[20px]">stars</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                Hand-Inspected Portfolio
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Featured Verified Properties
              <span className="text-on-surface-variant font-normal text-headline-md block lg:inline-block lg:ml-2">
                | អចលនទ្រព្យលេចធ្លោ
              </span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md cursor-pointer transition-colors ${
                activeCategory === 'all'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveCategory('condos')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md cursor-pointer transition-colors ${
                activeCategory === 'condos'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Condos
            </button>
            <button
              onClick={() => setActiveCategory('villas')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md cursor-pointer transition-colors ${
                activeCategory === 'villas'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Villas
            </button>
            <button
              onClick={() => setActiveCategory('shophouses')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md cursor-pointer transition-colors ${
                activeCategory === 'shophouses'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Shophouses
            </button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {filteredFeatured.map((property) => {
            const isFav = favorites.has(property.id);
            return (
              <article
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 cursor-pointer"
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start pointer-events-none">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-[10px] px-2 py-0.5 rounded shadow-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-[12px]">verified</span>
                      {property.titleBadgeText}
                    </span>
                    {property.isForeignFreeholdStrata && (
                      <span className="bg-secondary text-on-secondary font-label-sm text-[10px] px-2 py-0.5 rounded shadow-sm font-semibold">
                        Foreigner Freehold (Strata)
                      </span>
                    )}
                  </div>
                  {/* Save Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(property.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                      isFav ? 'text-error' : 'text-on-surface-variant hover:text-error'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isFav ? 'favorite' : 'favorite'}
                    </span>
                  </button>
                  {/* Price Watermark Ribbon */}
                  <div className="absolute bottom-2 left-2.5 bg-primary-container/85 backdrop-blur-sm text-surface-container-lowest px-2 py-0.5 rounded font-caption text-[11px]">
                    ${property.pricePerSqM.toLocaleString()} / m²
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-space-md flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-caption text-caption mb-1">
                      <span className="material-symbols-outlined text-secondary text-[14px]">pin_drop</span>
                      <span className="truncate">{property.locationName}</span>
                    </div>
                    <h3 className="font-headline-sm text-[17px] font-bold text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="font-caption text-caption text-on-surface-variant mt-0.5 line-clamp-1">
                      {property.description}
                    </p>
                  </div>

                  {/* Price Metric */}
                  <div className="mt-space-sm pt-space-xs">
                    <div className="flex items-baseline gap-2">
                      <span className="font-title-price-lg text-title-price-md text-primary font-black">
                        {formatPrice(property.priceUsd, currency)}
                      </span>
                      <span className="font-caption text-[11px] text-on-surface-variant font-semibold">
                        {formatApproxKhr(property.priceUsd)}
                      </span>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-1 py-space-xs mt-space-xs bg-surface-container-low rounded-lg text-center font-caption text-caption text-on-surface">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-label-md">{property.beds} Beds</span>
                        <span className="text-on-surface-variant text-[10px]">បន្ទប់គេង</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-label-md">{property.baths} Baths</span>
                        <span className="text-on-surface-variant text-[10px]">បន្ទប់ទឹក</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-label-md">{property.netArea} m²</span>
                        <span className="text-on-surface-variant text-[10px]">ទំហំសុទ្ធ</span>
                      </div>
                    </div>
                  </div>

                  {/* Agent Strip */}
                  <div className="flex items-center justify-between pt-space-sm mt-space-sm border-t border-surface-container">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-surface-container">
                        <img
                          src={property.agent.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_4Q3nyXhPHnMTxmYP-EIxp3bZOXI12DxOEbECufszeuO9KAQTTQ6iZ-7fPvxvWL1_Ln_BIuvWHdVm5nV8QG6bkRYDYSb14PTJnjYkCaVLaQPieKBR2sOK_yJ1YomNNalxEn3vXm0Xm23-iQ6yNaJms-o037cySoxyfT2Y7_I7NY_4ih0E2DJTVCZg5L52ahb-DO5X5iHbUD6mLGh0DufOLvXwuUeH720W7IdkDNRiw39AT0Kqx8jo0w'}
                          alt={property.agent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-caption text-[12px] font-semibold text-on-surface truncate max-w-[90px]">
                        {property.agent.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={`https://t.me/${property.agent.telegram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Chat on Telegram"
                        className="w-7 h-7 rounded-lg bg-surface-container hover:bg-[#229ED9] hover:text-white text-on-surface flex items-center justify-center transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">send</span>
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(property);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary font-label-sm text-[11px] hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer font-semibold"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Catalog Button */}
        <div className="flex justify-center mt-space-xl">
          <button
            onClick={() => onNavigateExplore()}
            className="px-space-xl py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-space-xs transition-colors shadow-sm cursor-pointer font-semibold"
          >
            <span>View All 1,420+ Verified Listings</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* EXCLUSIVE BOREY & MASTERPLANNED COMMUNITIES SPOTLIGHT */}
      <section className="w-full bg-surface-container-low py-space-xl border-t border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
            <div>
              <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider font-bold">
                Cambodia's Top Masterplanners
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                Exclusive Borey Projects Spotlight
                <span className="text-on-surface-variant font-normal text-headline-md block lg:inline-block lg:ml-2">
                  | គម្រោងបុរីឆ្នើម
                </span>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Direct developer allocations with 0% interest installment plans and guaranteed land titles.
              </p>
            </div>
            <button
              onClick={() => onNavigateExplore({ type: 'villa' })}
              className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1 shrink-0 font-semibold cursor-pointer"
            >
              <span>Explore All Borey Developers</span>
              <span className="material-symbols-outlined text-[18px]">east</span>
            </button>
          </div>

          {/* Developer Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {boreyDevelopers.map((borey) => (
              <div
                key={borey.id}
                onClick={() => onNavigateExplore()}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden bg-surface-container">
                  <img
                    src={borey.image}
                    alt={borey.projectTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 font-label-sm text-[11px] font-bold px-2.5 py-1 rounded shadow-sm ${
                      borey.promoBadgeColor || 'bg-secondary text-on-secondary'
                    }`}
                  >
                    {borey.promoBadge}
                  </span>
                </div>
                <div className="p-space-md flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-caption text-caption text-secondary font-bold uppercase">
                        {borey.name}
                      </span>
                      <span className="font-caption text-[11px] text-on-surface-variant">
                        {borey.location}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-[17px] font-bold text-on-surface mt-1">
                      {borey.projectTitle}
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant mt-1">
                      {borey.tagline}
                    </p>
                  </div>
                  <div className="pt-space-sm mt-space-sm flex items-center justify-between border-t border-surface-container">
                    <div>
                      <span className="font-caption text-[11px] text-on-surface-variant block">From</span>
                      <span className="font-headline-sm text-[18px] font-black text-primary">
                        {formatPrice(borey.fromPriceUsd, currency)}
                      </span>
                    </div>
                    <span className="font-label-sm text-[11px] text-secondary font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMBODIA REAL ESTATE INVESTMENT INSIGHTS & LEGAL GUIDE */}
      <section className="w-full max-w-7xl mx-auto px-space-md lg:px-margin py-space-xl">
        <div className="flex flex-col lg:flex-row gap-space-xl items-start">
          {/* Left Column */}
          <div className="lg:w-5/12 flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
              Foreign Investor &amp; Buyer Knowledge Base
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              Navigating Cambodia Property Laws With Confidence
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
              Purchasing real estate in the Kingdom is transparent when backed by verified legal title structures. Our in-house conveyancing lawyers oversee every step of transfer.
            </p>

            {/* Dynamic Yield Donut Metric Card */}
            <div className="mt-space-lg p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-md shadow-sm">
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-headline-sm text-[16px] font-black text-on-surface">7.8%</span>
                  <span className="font-caption text-[9px] text-on-surface-variant uppercase">Avg Yield</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                  Phnom Penh Prime Rental Return
                </span>
                <p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-relaxed">
                  Condo units in BKK1 and Tonle Bassac deliver highest rental yields in Southeast Asia, with US Dollar dollarized economy protection.
                </p>
              </div>
            </div>

            {/* Bank Partners Strip */}
            <div className="mt-space-md pt-space-sm">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                Approved Mortgage Financing Partners
              </span>
              <div className="flex items-center gap-space-md text-on-surface font-headline-sm text-[14px] font-bold opacity-75">
                <span className="hover:opacity-100 transition-opacity">ABA Bank</span>
                <span>•</span>
                <span className="hover:opacity-100 transition-opacity">Canadia Bank</span>
                <span>•</span>
                <span className="hover:opacity-100 transition-opacity">Sathapana</span>
                <span>•</span>
                <span className="hover:opacity-100 transition-opacity">J Trust Royal</span>
              </div>
            </div>
          </div>

          {/* Right Explainer Pillars */}
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-space-md w-full">
            {/* Pillar 1 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Foreign Ownership Law</span>
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mt-1">Strata Title (Freehold)</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                Allows foreign nationals 100% direct freehold ownership for properties from the 1st floor and up (excluding ground floor), up to 70% of total building private area.
              </p>
              <button
                onClick={() => onNavigateExplore()}
                className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 mt-space-sm font-semibold cursor-pointer"
              >
                Read Strata Title Guide <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-tertiary-container mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">fact_check</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-tertiary-container font-bold uppercase">Land Title Security</span>
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mt-1">Hard Title vs. Soft Title</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                Hard titles (L-Map) are registered with the Ministry of Land Management with nationwide legal enforceability. Soft titles are recorded only at Sangkat or Khan district levels.
              </p>
              <button
                onClick={() => onNavigateExplore()}
                className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 mt-space-sm font-semibold cursor-pointer"
              >
                Verification Checklist <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">account_balance</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase">Bank Loans</span>
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mt-1">Mortgage Rates from 6.99%</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                Cambodian banks provide up to 70-80% loan-to-value for locals and select expatriates with local work permits, with loan tenure reaching 20 to 25 years.
              </p>
              <button
                onClick={() => onSelectProperty(properties[0])}
                className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 mt-space-sm font-semibold cursor-pointer"
              >
                Mortgage Calculator <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 4 */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-secondary-container mb-space-sm">
                <span className="material-symbols-outlined text-[22px]">gavel</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-secondary-container font-bold uppercase">Landed Property</span>
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mt-1">Trust Law (Land Holding)</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                Under Cambodia's 2019 Trust Law, foreigners can legally hold and control landed properties and villas through licensed trust companies registered with the Trust Regulator.
              </p>
              <button
                onClick={() => onNavigateExplore()}
                className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1 mt-space-sm font-semibold cursor-pointer"
              >
                Trust Advisory Info <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP & TELEGRAM NOTIFICATION BANNER */}
      <section className="w-full bg-primary-container text-surface-container-lowest py-space-xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary opacity-20 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
          <div className="flex flex-col max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-secondary-container font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              Fastest Alerts in the Kingdom
            </div>
            <h2 className="font-headline-lg text-headline-lg text-surface-container-lowest">
              Be the First to Know When Below-Market Deals Drop
            </h2>
            <p className="font-body-md text-body-md text-primary-fixed-dim mt-2 leading-relaxed">
              Join 28,000+ investors on our verified Telegram Channel for daily notifications on distressed bank assets, pre-launch Borey price releases, and urgent resale discounts across Phnom Penh.
            </p>
            {/* CTA Buttons Group */}
            <div className="flex flex-wrap items-center gap-space-sm mt-space-lg">
              <a
                className="px-space-lg py-3 rounded-lg bg-[#229ED9] hover:bg-[#1e8ec5] text-white font-label-md text-label-md font-bold flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                href="https://t.me/DYDProperty"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Join Official Telegram Channel</span>
              </a>
              <a
                className="px-space-md py-3 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface-container-lowest font-label-md text-label-md font-semibold flex items-center gap-2 backdrop-blur transition-colors cursor-pointer"
                href="https://wa.me/85512888999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Connect WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* App Download Preview Mock */}
          <div className="bg-surface-container-lowest text-on-surface p-space-md rounded-xl shadow-2xl flex flex-col items-center text-center shrink-0 w-full sm:w-80">
            <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center p-2 mb-2">
              <img
                alt="DYD App Icon"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WsbLYI_-zYFzvosRel-65khfAQRtt9XrTlophRdjCYp-ncS6CFA9JmNJ4aFtozShs9alUKzkIeH9_H3ByDPnFmZapaHImQXlFKC4klIbMSWEibwQLtTlQo7g8n6XgvF3yl-epzo-qBXZ_CQ609_lfRC_2DZ-3h4IN90dEFblH49ZWAo1j8gEHKBfODQ2iEmcpTsAxs2CvbUbssSREivjEO96jNm3K5oWA3VvWnRIE9UxKfrt4JPkHPZ5lj"
              />
            </div>
            <span className="font-headline-sm text-[16px] font-bold text-on-surface">DYD Property App</span>
            <span className="font-caption text-caption text-on-surface-variant">iOS &amp; Android Compatible</span>
            <div className="w-32 h-32 bg-surface-container-low rounded-lg p-2 my-space-sm flex items-center justify-center">
              <svg className="w-full h-full text-on-surface" fill="currentColor" viewBox="0 0 100 100">
                <path d="M10 10h30v30h-30z M16 16v18h18v-18z M22 22h6v6h-6z M60 10h30v30h-30z M66 16v18h18v-18z M72 22h6v6h-6z M10 60h30v30h-30z M16 66v18h18v-18z M22 72h6v6h-6z M55 55h10v10h-10z M75 55h15v10h-15z M55 75h10v15h-10z M75 75h15v15h-15z M50 20h5v10h-5z M20 50h10v5h-10z" />
              </svg>
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant font-medium">
              Scan to browse 10,000+ floorplans
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
