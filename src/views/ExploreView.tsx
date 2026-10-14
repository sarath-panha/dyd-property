import React, { useState } from 'react';
import { Currency, Language, Property } from '../types';
import { formatPrice, formatPriceShort } from '../utils/formatters';
import { properties } from '../data/mockData';

interface ExploreViewProps {
  currency: Currency;
  language: Language;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  initialFilters?: { location?: string; type?: string; maxPrice?: number };
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  currency,
  language,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  initialFilters,
}) => {
  const [selectedSangkat, setSelectedSangkat] = useState<string>(initialFilters?.location || 'all');
  const [transactionType, setTransactionType] = useState<'sale' | 'rent'>('sale');
  const [selectedType, setSelectedType] = useState<string>(initialFilters?.type || 'all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [titleDeedFilter, setTitleDeedFilter] = useState<string>('hard-strata');
  const [mapViewMode, setMapViewMode] = useState<'split' | 'list'>('split');
  const [selectedPinId, setSelectedPinId] = useState<string | null>('chip-mong-landmark-271');
  const [isSatellite, setIsSatellite] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState<boolean>(false);
  const [activeBoundary, setActiveBoundary] = useState<string>('bkk1');

  // Filter properties
  const displayProperties = properties.filter((prop) => {
    if (selectedSangkat !== 'all') {
      if (selectedSangkat === 'bkk1' && prop.khan !== 'bkk1') return false;
      if (selectedSangkat === 'tonle-bassac' && prop.khan !== 'chamkarmon') return false;
      if (selectedSangkat === 'toul-kork' && prop.khan !== 'toul-kork') return false;
      if (selectedSangkat === 'chroy-changvar' && prop.khan !== 'chroy-changvar') return false;
      if (selectedSangkat === 'sen-sok' && prop.khan !== 'sen-sok') return false;
      if (selectedSangkat === 'meanchey' && prop.khan !== 'meanchey') return false;
    }
    if (selectedType !== 'all') {
      if (selectedType === 'condo' && prop.propertyType !== 'condo') return false;
      if (selectedType === 'villa' && prop.propertyType !== 'villa' && prop.propertyType !== 'twin-villa') return false;
      if (selectedType === 'shophouse' && prop.propertyType !== 'shophouse') return false;
    }
    return true;
  });

  const selectedPinProperty = properties.find((p) => p.id === selectedPinId) || properties[2];

  return (
    <div className="flex flex-col w-full">
      {/* Sticky Sub-Navigation & Filter Command Bar */}
      <section className="sticky top-20 z-30 bg-surface-container-lowest shadow-sm px-space-md lg:px-margin py-space-sm border-b border-surface-container">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-space-xs">
          {/* Top Row Filters */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            {/* Left Filter Group */}
            <div className="flex flex-wrap items-center gap-space-xs">
              {/* Location Pill */}
              <div
                onClick={() => setSelectedSangkat('all')}
                className="inline-flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container px-space-sm py-1.5 rounded-lg transition-colors cursor-pointer group"
              >
                <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  {selectedSangkat === 'all'
                    ? 'Phnom Penh (All Sangkats)'
                    : selectedSangkat.toUpperCase()}
                </span>
                <span className="font-caption text-caption text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded shadow-sm">
                  {displayProperties.length * 71}
                </span>
                {selectedSangkat !== 'all' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSangkat('all');
                    }}
                    className="hover:text-error text-outline transition-colors ml-1 flex items-center cursor-pointer"
                    title="Reset Location"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>

              {/* Transaction Type Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTransactionType(transactionType === 'sale' ? 'rent' : 'sale')}
                  className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>{transactionType === 'sale' ? 'For Sale (លក់)' : 'For Rent (ជួល)'}</span>
                  <span className="material-symbols-outlined text-outline text-[16px]">keyboard_arrow_down</span>
                </button>
              </div>

              {/* Price Range Filter */}
              <button
                type="button"
                onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
                className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md cursor-pointer"
              >
                <span>Price: $100k - $600k</span>
                <span className="material-symbols-outlined text-outline text-[16px]">keyboard_arrow_down</span>
              </button>

              {/* Property Type Filter */}
              <button
                type="button"
                onClick={() => {
                  if (selectedType === 'all') setSelectedType('condo');
                  else if (selectedType === 'condo') setSelectedType('villa');
                  else setSelectedType('all');
                }}
                className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md cursor-pointer"
              >
                <span>
                  Type:{' '}
                  {selectedType === 'all'
                    ? 'Condo & Villa'
                    : selectedType === 'condo'
                    ? 'Condos Only'
                    : 'Villas Only'}
                </span>
                <span className="material-symbols-outlined text-outline text-[16px]">keyboard_arrow_down</span>
              </button>

              {/* Bed/Bath Filter */}
              <button
                type="button"
                className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md cursor-pointer"
              >
                <span>Beds: 2 - 4</span>
                <span className="material-symbols-outlined text-outline text-[16px]">keyboard_arrow_down</span>
              </button>

              {/* Cambodia Specific: Title Deed Filter */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setTitleDeedFilter(
                      titleDeedFilter === 'hard-strata' ? 'all' : 'hard-strata'
                    )
                  }
                  className="flex items-center gap-space-xs bg-surface-container-high text-on-surface font-semibold px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-on-tertiary-container text-[16px]">
                    verified
                  </span>
                  <span>
                    {titleDeedFilter === 'hard-strata'
                      ? 'Hard Title / Strata Only'
                      : 'All Title Types'}
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">
                    arrow_drop_down
                  </span>
                </button>
              </div>

              {/* More Filters Trigger */}
              <button
                type="button"
                onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
                className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-outline text-[16px]">tune</span>
                <span>More Filters</span>
                <span className="bg-secondary text-on-secondary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-space-sm">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-space-xs">
                <span className="font-caption text-caption text-outline hidden sm:inline">Sort:</span>
                <div className="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded-lg cursor-pointer">
                  <span className="font-label-md text-label-md text-on-surface font-medium">
                    Recommended (Verified First)
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">unfold_more</span>
                </div>
              </div>

              {/* Save Search CTA */}
              <button
                type="button"
                onClick={() => alert('Search alert saved! You will receive instant notifications on Telegram.')}
                className="flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-space-sm py-1.5 rounded-lg transition-colors font-label-md text-label-md shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary text-[16px]">notifications_active</span>
                <span className="hidden md:inline">Save Search</span>
              </button>

              {/* Map Toggle Pill */}
              <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMapViewMode('split')}
                  className={`flex items-center gap-1 px-space-sm py-1 rounded font-label-sm text-label-sm cursor-pointer transition-colors ${
                    mapViewMode === 'split'
                      ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">map</span>
                  <span>Split</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapViewMode('list')}
                  className={`flex items-center gap-1 px-space-sm py-1 rounded font-label-sm text-label-sm cursor-pointer transition-colors ${
                    mapViewMode === 'list'
                      ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">view_agenda</span>
                  <span>List</span>
                </button>
              </div>
            </div>
          </div>

          {/* District Quick Filter Chips */}
          <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pt-1 text-on-surface-variant font-caption text-caption">
            <span className="text-outline uppercase tracking-wider font-semibold mr-1 shrink-0">
              Hot Sangkats:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSangkat('all')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'all'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              All Districts
            </button>
            <button
              type="button"
              onClick={() => setSelectedSangkat('bkk1')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'bkk1'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Boeung Keng Kang 1 (BKK1)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSangkat('tonle-bassac')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'tonle-bassac'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Tonle Bassac &amp; Koh Pich
            </button>
            <button
              type="button"
              onClick={() => setSelectedSangkat('toul-kork')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'toul-kork'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Toul Kork (TK)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSangkat('sen-sok')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'sen-sok'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Sen Sok (Aeon 2)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSangkat('chroy-changvar')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'chroy-changvar'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Chroy Changvar Waterfront
            </button>
            <button
              type="button"
              onClick={() => setSelectedSangkat('meanchey')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                selectedSangkat === 'meanchey'
                  ? 'bg-secondary text-on-secondary font-medium'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Hun Sen Blvd (Mean Chey)
            </button>
          </div>
        </div>
      </section>

      {/* Split Screen Workspace */}
      <div className="w-full max-w-[1720px] mx-auto px-space-md lg:px-margin py-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT PANEL: Stream of Properties (7 cols ~58%) */}
        <div className={`${mapViewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col gap-space-md`}>
          {/* Stream Header & Metrics Banner */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-surface-container">
            <div>
              <nav className="flex items-center gap-1 font-caption text-caption text-outline mb-1">
                <span className="hover:text-secondary cursor-pointer">Home</span>
                <span>/</span>
                <span className="hover:text-secondary cursor-pointer">Cambodia</span>
                <span>/</span>
                <span className="text-on-surface font-semibold">Phnom Penh Properties</span>
              </nav>
              <div className="flex items-baseline gap-space-xs">
                <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  428 Properties in Phnom Penh
                </h1>
                <span className="font-caption text-caption text-secondary font-bold bg-secondary-fixed px-2 py-0.5 rounded-full">
                  Active Market
                </span>
              </div>
            </div>
            {/* Metric pill */}
            <div className="flex items-center gap-space-md bg-surface-container-low px-space-sm py-space-xs rounded-lg">
              <div className="flex flex-col">
                <span className="font-caption text-caption text-outline">Median Avg</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">$1,720 / m²</span>
              </div>
              <div className="w-px h-6 bg-surface-container" />
              <div className="flex flex-col">
                <span className="font-caption text-caption text-outline">L-Map Hard Title</span>
                <span className="font-label-md text-label-md font-bold text-on-tertiary-container">94% Verified</span>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className={`grid grid-cols-1 ${mapViewMode === 'split' ? 'md:grid-cols-2' : 'md:grid-cols-3 xl:grid-cols-4'} gap-space-md`}>
            {displayProperties.slice(0, 6).map((property) => {
              const isFav = favorites.has(property.id);
              const isSelectedPin = selectedPinId === property.id;

              return (
                <div
                  key={property.id}
                  onClick={() => {
                    setSelectedPinId(property.id);
                    onSelectProperty(property);
                  }}
                  className={`group bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative cursor-pointer ${
                    isSelectedPin
                      ? 'shadow-md ring-2 ring-secondary'
                      : 'shadow-sm hover:shadow-xl'
                  }`}
                >
                  {/* Media */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20 pointer-events-none" />

                    {/* Badges Overlay Top */}
                    <div className="absolute top-space-xs left-space-xs right-space-xs flex items-center justify-between pointer-events-none">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="bg-surface-container-lowest/95 backdrop-blur-md text-on-tertiary-container font-label-sm text-label-sm font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-on-tertiary-container">
                            verified
                          </span>
                          {property.titleBadgeText}
                        </span>
                        {property.isForeignFreeholdStrata && (
                          <span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                            Foreign Quota (100% Freehold)
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(property.id);
                        }}
                        className={`pointer-events-auto w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                          isFav ? 'text-error' : 'text-on-surface hover:text-error'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </button>
                    </div>

                    {/* Price Strip Over Image Bottom */}
                    <div className="absolute bottom-space-xs left-space-xs right-space-xs flex items-baseline justify-between text-on-primary pointer-events-none">
                      <div className="flex items-baseline gap-1">
                        <span className="font-title-price-lg text-title-price-lg tracking-tight font-extrabold text-on-primary">
                          {formatPrice(property.priceUsd, currency)}
                        </span>
                        <span className="font-caption text-caption text-primary-fixed">
                          (${property.pricePerSqM}/m²)
                        </span>
                      </div>
                      {isSelectedPin ? (
                        <span className="bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold px-2 py-0.5 rounded">
                          Selected Pin
                        </span>
                      ) : (
                        <span className="bg-surface-container-lowest/30 backdrop-blur-sm text-on-primary font-caption text-caption px-2 py-0.5 rounded">
                          {property.featuredBadge || 'New Listing'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-space-sm flex flex-col flex-1 justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-1 text-secondary font-caption text-caption mb-1">
                        <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                        <span className="font-medium truncate">{property.locationName}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                        {property.description}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 py-space-xs bg-surface-container-low rounded-lg text-center font-body-sm text-body-sm text-on-surface">
                      <div className="flex flex-col items-center justify-center border-r border-surface-container">
                        <span className="font-bold">{property.beds} Beds</span>
                        <span className="font-caption text-caption text-outline">Bedrooms</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-r border-surface-container">
                        <span className="font-bold">{property.baths} Baths</span>
                        <span className="font-caption text-caption text-outline">Modern Bath</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-bold">{property.netArea} m²</span>
                        <span className="font-caption text-caption text-outline">Net Area</span>
                      </div>
                    </div>

                    {/* Agent Strip */}
                    <div className="flex items-center justify-between pt-1 border-t border-surface-container">
                      <div className="flex items-center gap-space-xs">
                        {property.agent.avatar ? (
                          <img
                            alt="Agent"
                            className="w-7 h-7 rounded-full object-cover"
                            src={property.agent.avatar}
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-caption">
                            {property.agent.initials || 'AG'}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-on-surface font-semibold leading-tight">
                            {property.agent.name}
                          </span>
                          <span className="font-caption text-caption text-outline leading-none">
                            {property.agent.title}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://t.me/${property.agent.telegram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg bg-[#229ED9]/15 hover:bg-[#229ED9] text-[#229ED9] hover:text-white flex items-center justify-center transition-colors"
                          title="Chat on Telegram"
                        >
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProperty(property);
                          }}
                          className="bg-primary-container text-on-primary px-space-xs py-1 rounded-lg font-label-sm text-label-sm hover:bg-secondary transition-colors cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination & Result Summary */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-sm border border-surface-container">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">1 - 6</span> of{' '}
              <span className="font-bold text-on-surface">428</span> properties
            </span>
            <div className="flex items-center gap-1 font-label-md text-label-md">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-9 h-9 rounded-lg bg-surface-container text-outline flex items-center justify-center disabled:opacity-40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-lg font-bold flex items-center justify-center cursor-pointer ${
                  currentPage === 1
                    ? 'bg-secondary text-on-secondary'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer ${
                  currentPage === 2
                    ? 'bg-secondary text-on-secondary font-bold'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer ${
                  currentPage === 3
                    ? 'bg-secondary text-on-secondary font-bold'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                3
              </button>
              <span className="px-1 text-outline">...</span>
              <button
                type="button"
                onClick={() => setCurrentPage(18)}
                className="w-9 h-9 rounded-lg hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              >
                18
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(Math.min(18, currentPage + 1))}
                className="w-9 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: High-Fidelity Interactive Map Explorer (5 cols ~42%) */}
        {mapViewMode === 'split' && (
          <div className="lg:col-span-5 sticky top-[138px] h-[calc(100vh-160px)] min-h-[580px] bg-surface-container-low rounded-2xl overflow-hidden shadow-lg flex flex-col relative border border-surface-container">
            {/* Vector Map Canvas */}
            <div
              className={`relative w-full h-full overflow-hidden select-none transition-colors duration-500 ${
                isSatellite ? 'bg-[#3b4856]' : 'bg-[#E5ECF6]'
              }`}
              id="map-canvas"
            >
              {/* Rivers & Water geometry (Tonle Sap, Mekong & Bassac Rivers) */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 700">
                <defs>
                  <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Mekong River Upper East */}
                <path d="M 400 0 Q 430 180, 480 340 L 500 340 L 500 0 Z" fill="url(#riverGrad)" />
                {/* Tonle Sap River */}
                <path
                  d="M 230 0 Q 250 120, 310 240 Q 340 300, 360 330 L 330 330 Q 300 280, 240 180 Q 210 110, 200 0 Z"
                  fill="url(#riverGrad)"
                />
                {/* Chroy Changvar Peninsula */}
                <path d="M 230 0 Q 280 140, 330 300 L 400 220 Q 410 100, 390 0 Z" fill="#d9e6f2" opacity="0.6" />
                {/* River Confluence (Chaktomuk junction) */}
                <path
                  d="M 310 240 Q 420 330, 500 340 L 500 480 Q 410 440, 360 380 Q 330 430, 340 700 L 290 700 Q 290 460, 310 340 Z"
                  fill="url(#riverGrad)"
                />
                {/* Koh Pich (Diamond Island) */}
                <ellipse cx="335" cy="400" rx="14" ry="32" fill="#E2E8F0" transform="rotate(-15 335 400)" />

                {/* Road Grid Network */}
                <g fill="none" opacity="0.75" stroke="#cbd5e1" strokeWidth="1.5">
                  <line x1="260" y1="200" x2="260" y2="550" stroke="#94a3b8" strokeWidth="2.5" />
                  <line x1="220" y1="180" x2="220" y2="580" stroke="#94a3b8" strokeWidth="2.5" />
                  <line x1="0" y1="280" x2="260" y2="280" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="100" y1="420" x2="310" y2="420" strokeWidth="2" />
                  <line x1="240" y1="520" x2="220" y2="700" stroke="#64748b" strokeWidth="3.5" />
                  <line x1="160" y1="180" x2="160" y2="520" />
                  <line x1="120" y1="340" x2="320" y2="340" />
                  <line x1="150" y1="470" x2="320" y2="470" />
                  <line x1="240" y1="230" x2="320" y2="230" />
                </g>

                {/* District Labels */}
                <text fill="#64748b" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1" x="235" y="270">
                  DAUN PENH
                </text>
                <text fill="#64748b" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1" x="245" y="380">
                  BKK1
                </text>
                <text fill="#64748b" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1" x="140" y="250">
                  TOUL KORK
                </text>
                <text fill="#64748b" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1" x="240" y="470">
                  CHAMKARMON
                </text>
                <text fill="#64748b" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1" x="175" y="620">
                  MEAN CHEY
                </text>
                <text fill="#64748b" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700" letterSpacing="1" x="310" y="140">
                  CHROY CHANGVAR
                </text>
              </svg>

              {/* Floating Map Controls Top Left */}
              <div className="absolute top-space-sm left-space-sm z-20 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => alert('Lasso tool active: Draw anywhere on the map to filter listings within boundaries!')}
                  className="bg-surface-container-lowest/95 backdrop-blur-md hover:bg-surface-container text-on-surface px-space-sm py-1.5 rounded-lg shadow-md font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">gesture</span>
                  <span>Draw Search Area</span>
                </button>
                <div className="flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-lg shadow-sm">
                  <span className="font-caption text-caption text-outline px-1">Boundaries:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBoundary('bkk1');
                      setSelectedSangkat('bkk1');
                    }}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                      activeBoundary === 'bkk1' ? 'bg-secondary text-on-secondary' : 'hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    BKK1
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBoundary('tk');
                      setSelectedSangkat('toul-kork');
                    }}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                      activeBoundary === 'tk' ? 'bg-secondary text-on-secondary' : 'hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    TK
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBoundary('sen-sok');
                      setSelectedSangkat('sen-sok');
                    }}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${
                      activeBoundary === 'sen-sok' ? 'bg-secondary text-on-secondary' : 'hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    Sen Sok
                  </button>
                </div>
              </div>

              {/* Floating Zoom & Location Controls Top Right */}
              <div className="absolute top-space-sm right-space-sm z-20 flex flex-col gap-1 shadow-md rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="w-8 h-8 bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <div className="w-8 h-px bg-surface-container" />
                <button
                  type="button"
                  className="w-8 h-8 bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <div className="w-8 h-px bg-surface-container" />
                <button
                  type="button"
                  onClick={() => alert('Centering view on your current Phnom Penh location')}
                  className="w-8 h-8 bg-surface-container-lowest hover:bg-surface-container text-secondary flex items-center justify-center transition-colors cursor-pointer"
                  title="Locate Current Position"
                >
                  <span className="material-symbols-outlined text-[18px]">my_location</span>
                </button>
              </div>

              {/* INTERACTIVE PRICE PINS */}
              {/* Pin 1: Urban Village ($115k) */}
              <div
                onClick={() => setSelectedPinId('urban-village-phase-2')}
                className="absolute top-[75%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span>$115k</span>
                </div>
                <div className="w-2 h-2 bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Pin 2: Active / Highlighted ($345k - Chip Mong Villa) */}
              <div
                onClick={() => setSelectedPinId('chip-mong-landmark-271')}
                className="absolute top-[58%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
              >
                <div className="relative">
                  <span className="animate-ping absolute -inset-1 rounded-full bg-secondary opacity-75" />
                  <div className="relative bg-primary text-on-primary ring-2 ring-surface-container-lowest font-label-md text-label-md font-extrabold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-container" />
                    <span>$345,000</span>
                  </div>
                  <div className="w-2.5 h-2.5 bg-primary rotate-45 mx-auto -mt-1 shadow-md" />
                </div>
              </div>

              {/* ACTIVE POPUP CARD (Over Pin 2: Chip Mong Villa) */}
              {selectedPinId && selectedPinProperty && (
                <div className="absolute top-[20%] left-[12%] right-[12%] z-40 bg-surface-container-lowest rounded-xl shadow-2xl p-space-sm flex flex-col gap-space-xs transform animate-in fade-in slide-in-from-bottom-2 duration-300 border border-surface-container">
                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-surface-container">
                    <img
                      src={
                        selectedPinProperty.galleryImages?.[0] ||
                        selectedPinProperty.image
                      }
                      alt={selectedPinProperty.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-on-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold px-2 py-0.5 rounded shadow">
                      {selectedPinProperty.titleBadgeText}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPinId(null);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-surface-container-lowest/90 text-on-surface flex items-center justify-center hover:bg-surface-container-lowest cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                    <div className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-md text-on-primary font-title-price-md text-title-price-md px-2 py-0.5 rounded font-bold">
                      {formatPrice(selectedPinProperty.priceUsd, currency)}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        {selectedPinProperty.title}
                      </span>
                      <span className="font-caption text-caption text-outline font-semibold">
                        {selectedPinProperty.beds} Bed • {selectedPinProperty.baths} Bath • {selectedPinProperty.netArea}m²
                      </span>
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant line-clamp-1 mt-0.5">
                      {selectedPinProperty.locationName}
                    </p>
                  </div>

                  <div className="flex items-center gap-space-xs pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectProperty(selectedPinProperty)}
                      className="flex-1 bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container py-1.5 rounded-lg text-center font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                    >
                      View Listing Specs
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Share link copied: ${window.location.origin}/#${selectedPinProperty.id}`)}
                      className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Pin 3: J-Tower 3 South ($260k) */}
              <div
                onClick={() => setSelectedPinId('j-tower-3-south')}
                className="absolute top-[48%] left-[64%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span>$260k</span>
                </div>
                <div className="w-2 h-2 bg-surface-container-lowest group-hover:bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Pin 4: De Castle BKK1 ($195k) */}
              <div
                onClick={() => setSelectedPinId('de-castle-royal-bkk1')}
                className="absolute top-[43%] left-[47%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span>$195k</span>
                </div>
                <div className="w-2 h-2 bg-surface-container-lowest group-hover:bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Pin 5: Chamkar Doung ($220k) */}
              <div
                onClick={() => setSelectedPinId('borey-new-world-shophouse')}
                className="absolute top-[68%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span>$220k</span>
                </div>
                <div className="w-2 h-2 bg-surface-container-lowest group-hover:bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Pin 6: Mekong View Tower ($85k) */}
              <div
                onClick={() => setSelectedPinId('mekong-view-tower')}
                className="absolute top-[22%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span>$85k</span>
                </div>
                <div className="w-2 h-2 bg-surface-container-lowest group-hover:bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Pin 7: Toul Kork ($580k) */}
              <div
                onClick={() => setSelectedPinId('modern-shophouse-toul-kork')}
                className="absolute top-[34%] left-[26%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span>$430k</span>
                </div>
                <div className="w-2 h-2 bg-surface-container-lowest group-hover:bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Pin 8: Diamond Island Penthouse ($1.2M) */}
              <div
                onClick={() => setSelectedPinId('penthouse-the-bridge')}
                className="absolute top-[52%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              >
                <div className="bg-surface-container-lowest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-md text-label-md font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200 transform group-hover:scale-110">
                  <span className="text-on-tertiary-container font-extrabold">$288k</span>
                </div>
                <div className="w-2 h-2 bg-surface-container-lowest group-hover:bg-secondary rotate-45 mx-auto -mt-1 shadow-sm" />
              </div>

              {/* Floating Bottom Toast */}
              <div className="absolute bottom-space-sm left-space-sm right-space-sm z-20 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-1 rounded-lg shadow-md flex items-center gap-space-xs text-on-surface font-caption text-caption">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>Live Inventory Updated: <strong>4 mins ago</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSatellite(!isSatellite)}
                  className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md hover:bg-surface-container text-on-surface px-space-sm py-1 rounded-lg shadow-md flex items-center gap-1 font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">layers</span>
                  <span>{isSatellite ? 'Carto View' : 'Satellite View'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
