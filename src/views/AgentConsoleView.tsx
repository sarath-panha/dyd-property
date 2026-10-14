import React, { useState } from 'react';
import { Currency, Language, Property } from '../types';
import { formatPrice } from '../utils/formatters';
import { leadsList, properties, SOPHEA_AVATAR, testimonials, LOGO_URL } from '../data/mockData';

interface AgentConsoleViewProps {
  currency: Currency;
  language: Language;
  onNavigateHome: () => void;
  onOpenAddProperty: () => void;
  onSelectProperty: (property: Property) => void;
}

export const AgentConsoleView: React.FC<AgentConsoleViewProps> = ({
  currency,
  onNavigateHome,
  onOpenAddProperty,
  onSelectProperty,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'transactions' | 'reviews' | 'plans'>('listings');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeNav, setActiveNav] = useState<'dashboard' | 'listings' | 'verification' | 'leads'>('dashboard');
  const [showBakongModal, setShowBakongModal] = useState<boolean>(false);

  // Top 2 properties on agent console
  const agentProperties = properties.filter((p) =>
    ['silversea-sky-residence', 'the-peninsula-royal-queen'].includes(p.id)
  );

  return (
    <div className="flex w-full min-h-screen bg-surface">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex-col justify-between py-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container">
        <div className="flex flex-col gap-space-lg px-space-md">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-space-sm pt-space-xs text-left cursor-pointer"
          >
            <img
              alt="DYD Property Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold">
                DYD Pro
              </span>
              <span className="font-caption text-caption text-secondary uppercase font-semibold">
                Agent Console
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-space-xs">
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors cursor-pointer text-left ${
                activeNav === 'dashboard'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('listings');
                setActiveTab('listings');
              }}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors cursor-pointer text-left ${
                activeNav === 'listings'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">domain</span>
              <span>My Listings (38)</span>
            </button>

            <button
              onClick={() => setActiveNav('verification')}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors cursor-pointer text-left ${
                activeNav === 'verification'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              <span>Title Verification</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('leads');
                setActiveTab('listings');
              }}
              className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors cursor-pointer text-left ${
                activeNav === 'leads'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
              <span>Leads &amp; Inquiries</span>
              <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                3
              </span>
            </button>
          </nav>
        </div>

        {/* Profile Card Bottom */}
        <div className="px-space-md flex flex-col gap-space-sm">
          <div className="p-space-sm bg-surface-container rounded-xl flex items-center gap-space-sm">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
              src={SOPHEA_AVATAR}
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface leading-tight font-bold">
                Sophea Kem
              </span>
              <span className="font-caption text-caption text-on-tertiary-container font-bold">
                PRO Agent (Khmer/EN)
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Console Area */}
      <div className="w-full lg:pl-64 flex flex-col min-h-screen">
        {/* Top Console Sub-Header */}
        <header className="sticky top-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-md lg:px-space-lg border-b border-surface-container">
          <div className="flex items-center gap-space-sm">
            <button
              onClick={onNavigateHome}
              className="lg:hidden p-1.5 text-on-surface-variant hover:bg-surface-container rounded-lg"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Exchange: 1 USD = 4,080 KHR
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <button
              type="button"
              onClick={onOpenAddProperty}
              className="flex items-center gap-space-xs bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-semibold shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Property</span>
            </button>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-surface-container"
              src={SOPHEA_AVATAR}
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="w-full pt-4 pb-16 bg-surface px-space-md lg:px-space-lg">
          <div className="flex flex-col w-full max-w-[1540px] mx-auto">
            {/* Top Profile Hero Banner Area */}
            <section className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm mb-space-lg border border-surface-container">
              {/* Skyline Graphic Cover */}
              <div className="relative w-full h-56 bg-primary-container overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full object-cover opacity-20 text-secondary"
                  fill="currentColor"
                  preserveAspectRatio="none"
                  viewBox="0 0 1200 300"
                >
                  <path d="M0,220 L40,220 L40,160 L60,160 L60,220 L110,220 L110,120 L140,120 L140,220 L180,220 L180,90 L210,60 L240,90 L240,220 L290,220 L290,140 L330,140 L330,220 L400,220 L430,70 L460,70 L490,220 L560,220 L560,130 L610,130 L610,220 L680,220 L700,100 L730,100 L750,220 L840,220 L840,80 L880,50 L920,80 L920,220 L980,220 L980,150 L1030,150 L1030,220 L1200,220 L1200,300 L0,300 Z" />
                  <circle cx="210" cy="50" fill="#5bb8fe" r="1.5" />
                  <circle cx="445" cy="60" fill="#5bb8fe" r="2" />
                  <circle cx="880" cy="40" fill="#5bb8fe" r="1.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/60 to-transparent pointer-events-none" />

                {/* Location Chip & Authority License */}
                <div className="absolute top-4 right-6 flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-3 py-1.5 rounded-full text-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">verified</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    MoEF Lic. #E-2023-0881 | MEF / C-REG
                  </span>
                </div>
              </div>

              {/* Agent Identity Floating Grid */}
              <div className="relative px-space-lg pb-space-lg">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-space-lg -mt-20">
                  {/* Agent Avatar & Name block */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-space-md">
                    <div className="relative group">
                      <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-xl bg-surface-container ring-4 ring-surface-container-lowest">
                        <img
                          alt="Sophea Kem Real Estate Broker"
                          className="w-full h-full object-cover"
                          src={SOPHEA_AVATAR}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-on-tertiary-container text-surface-container-lowest p-1.5 rounded-xl shadow-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface">Sophea Kem</h1>
                        <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal">
                          កែម សុភា
                        </span>
                        <span className="bg-surface-container-highest text-secondary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold">
                          DYD PRO 2025
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-secondary font-semibold">
                        Executive Director &amp; Certified Broker at DYD Premier Realty
                      </p>

                      {/* Badges Pill Row */}
                      <div className="flex flex-wrap items-center gap-space-xs pt-1">
                        <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-md">
                          <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">military_tech</span>
                          Official L-Map Title Specialist
                        </span>
                        <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-md">
                          <span className="material-symbols-outlined text-[14px] text-secondary">trending_up</span>
                          Top Producer: Chamkarmon &amp; BKK1
                        </span>
                        <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-md">
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">schedule</span>
                          Avg. Response: 15 mins
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-xs w-full lg:w-auto pt-2 lg:pt-0">
                    <a
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#229ED9] text-white px-4 py-2.5 rounded-lg font-label-md text-label-md shadow-sm hover:opacity-95 transition-opacity font-semibold"
                      href="https://t.me/sophea_realty"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span> Telegram
                    </a>
                    <a
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-label-md text-label-md shadow-sm hover:opacity-95 transition-opacity font-semibold"
                      href="https://wa.me/85512998877"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span> WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => alert('Agent profile link copied to clipboard!')}
                      className="flex items-center justify-center p-2.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface transition-colors cursor-pointer"
                      title="Share Agent Profile"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Retainer contract request sent. Sophea will respond within 15 minutes.')}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors cursor-pointer font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">handshake</span> Retain Broker
                    </button>
                  </div>
                </div>

                {/* Statistics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-space-lg pt-space-md bg-surface-container-low rounded-xl p-space-md border border-surface-container">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Closed Transactions
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-title-price-lg text-title-price-lg text-on-surface">142</span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">($18.4M Vol)</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Residential &amp; Commercial</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Active Portfolios
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-title-price-lg text-title-price-lg text-on-surface">38</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Properties</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">100% Title Verified</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Client Feedback
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-title-price-lg text-title-price-lg text-on-surface">4.9</span>
                      <div className="flex text-on-tertiary-container">
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star_half</span>
                      </div>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">86 Verified Reviews</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Languages &amp; Market
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-body-sm font-body-sm bg-surface-container-lowest px-2 py-0.5 rounded text-on-surface font-medium">
                        🇰🇭 Khmer
                      </span>
                      <span className="text-body-sm font-body-sm bg-surface-container-lowest px-2 py-0.5 rounded text-on-surface font-medium">
                        🇬🇧 English
                      </span>
                      <span className="text-body-sm font-body-sm bg-surface-container-lowest px-2 py-0.5 rounded text-on-surface font-medium">
                        🇨🇳 Mandarin
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Bilingual Contracts Available
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Segmented Navigation Controls */}
            <div className="flex items-center justify-between gap-space-sm mb-space-lg overflow-x-auto pb-1">
              <div className="inline-flex p-1 bg-surface-container-low rounded-xl border border-surface-container">
                <button
                  type="button"
                  onClick={() => setActiveTab('listings')}
                  className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'listings'
                      ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">apartment</span>
                  <span>Active Listings</span>
                  <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] px-1.5 py-0.2 rounded-full font-bold">
                    38
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('transactions')}
                  className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'transactions'
                      ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">history_edu</span>
                  <span>Past Transactions</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">(104)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">reviews</span>
                  <span>Client Reviews</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">(86)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('plans')}
                  className={`px-space-md py-2 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'plans'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed font-bold shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">monetization_on</span>
                  <span>Monetization &amp; Plans Desk</span>
                </button>
              </div>

              <div className="hidden xl:flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for buyer consultations today</span>
              </div>
            </div>

            {/* Primary Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* LEFT 8 COLUMNS */}
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                {/* SECTION 1: Featured Active Listings Showcase */}
                <section className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-caption text-caption text-secondary uppercase font-bold tracking-wider">
                        Premium Selection
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Top Verified Properties</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('Opening full 38 portfolio properties')}
                      className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span>Explore all 38 listings</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {agentProperties.map((prop) => (
                      <div
                        key={prop.id}
                        onClick={() => onSelectProperty(prop)}
                        className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer border border-surface-container"
                      >
                        <div className="relative h-48 w-full bg-surface-container-high overflow-hidden">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            <span className="bg-amber-100 text-amber-900 font-label-sm text-label-sm font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px] text-amber-700">verified</span>
                              {prop.titleBadgeText}
                            </span>
                            <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold px-2 py-0.5 rounded shadow-sm">
                              {prop.featuredBadge || 'Exclusive'}
                            </span>
                          </div>
                          <div className="absolute bottom-2.5 left-3 text-surface-container-lowest">
                            <span className="font-caption text-caption uppercase text-surface-container-highest tracking-wide">
                              {prop.locationName}
                            </span>
                          </div>
                        </div>

                        <div className="p-space-md flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex items-baseline justify-between">
                              <span className="font-title-price-md text-title-price-md text-on-surface font-black">
                                {formatPrice(prop.priceUsd, currency)}
                              </span>
                              <span className="font-caption text-caption text-on-surface-variant font-medium">
                                ${prop.pricePerSqM} / m²
                              </span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 line-clamp-1 font-bold">
                              {prop.title}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between pt-space-sm mt-space-sm bg-surface-container-low rounded-lg px-3 py-2 border border-surface-container">
                            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                              <span className="material-symbols-outlined text-[16px]">bed</span> {prop.beds} Beds
                            </div>
                            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                              <span className="material-symbols-outlined text-[16px]">bathtub</span> {prop.baths} Baths
                            </div>
                            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                              <span className="material-symbols-outlined text-[16px]">square_foot</span> {prop.netArea} m² Net
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-space-sm pt-space-xs text-on-surface-variant font-caption text-caption">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">visibility</span> 1,420 views
                            </span>
                            <span className="flex items-center gap-1 text-secondary font-semibold">
                              <span className="material-symbols-outlined text-[14px]">chat_bubble</span> 18 direct leads
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 2: Agent Monetization & Growth Tiers */}
                <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-lg border border-surface-container">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                    <div>
                      <div className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold mb-1">
                        <span className="material-symbols-outlined text-[14px]">stars</span> DYD Property Cambodia Monetization Suite
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Agent Growth &amp; Pro Tiers</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Empower your real estate business with verified lead conduits, instant Telegram dispatch, and Cambodian legal title prioritizations.
                      </p>
                    </div>

                    {/* Billing Cycle switch */}
                    <div className="flex items-center bg-surface-container p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`font-label-sm text-label-sm px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          billingCycle === 'monthly'
                            ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('annual')}
                        className={`font-label-sm text-label-sm px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                          billingCycle === 'annual'
                            ? 'bg-surface-container-lowest text-on-surface shadow-sm font-bold'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        <span>Annual</span>
                        <span className="text-on-tertiary-container font-bold text-[10px] bg-tertiary-fixed px-1 rounded">
                          -17%
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Tier Cards Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-stretch">
                    {/* Tier 1 */}
                    <div className="rounded-xl p-space-md bg-surface-container-low flex flex-col justify-between border border-surface-container">
                      <div>
                        <span className="font-caption text-caption uppercase text-on-surface-variant font-bold tracking-wider">
                          Free Starter Agent
                        </span>
                        <div className="flex items-baseline gap-1 mt-2 mb-3">
                          <span className="font-title-price-lg text-title-price-lg text-on-surface font-extrabold">$0</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">/ month</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                          Essential entry package for newly licensed agents testing the DYD ecosystem.
                        </p>
                        <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Up to 5 Active Listings
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Basic Search Discovery
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Standard Web Lead Inbox
                          </li>
                          <li className="flex items-center gap-2 text-outline line-through">
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                            Telegram Lead Automation
                          </li>
                          <li className="flex items-center gap-2 text-outline line-through">
                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                            L-Map Priority Title Review
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Plan currently set to DYD Pro Agent.')}
                        className="mt-space-lg w-full py-2 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold cursor-pointer"
                      >
                        Current Plan (Downgrade)
                      </button>
                    </div>

                    {/* Tier 2: DYD PRO Agent */}
                    <div className="relative rounded-xl p-space-md bg-primary-container text-surface-container-lowest flex flex-col justify-between shadow-lg ring-2 ring-secondary">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-on-tertiary-container text-surface-container-lowest px-3 py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider shadow">
                        Most Popular Choice
                      </div>
                      <div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-caption text-caption uppercase text-secondary-fixed font-bold tracking-wider">
                            DYD PRO Agent
                          </span>
                          <span className="material-symbols-outlined text-secondary-container">shield</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-2 mb-1">
                          <span className="font-title-price-lg text-title-price-lg text-surface-container-lowest font-black">
                            {billingCycle === 'annual' ? '$390' : '$39'}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-primary-container">
                            {billingCycle === 'annual' ? '/ year' : '/ month'}
                          </span>
                        </div>
                        <span className="font-caption text-caption text-secondary-container block mb-space-md font-medium">
                          {billingCycle === 'annual' ? 'Billed annually with 17% savings' : 'or $390 / year billed annually'}
                        </span>
                        <p className="font-body-sm text-body-sm text-surface-container-highest mb-space-md">
                          Accelerated exposure with instant Cambodian buyer routing and title verification priority.
                        </p>
                        <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-surface-container-highest">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
                            <strong className="text-surface-container-lowest">Unlimited</strong> Active Property Listings
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
                            Top-of-Search Boost &amp; Badging
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
                            "Verified PRO" Gold Badge
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
                            Instant Telegram Direct Lead Routing
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
                            Priority L-Map / Title Review Queue
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
                            <strong className="text-tertiary-fixed font-bold">3x More</strong> High-Intent Buyer Leads
                          </li>
                        </ul>
                      </div>
                      <div className="mt-space-lg flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setShowBakongModal(true)}
                          className="w-full py-2.5 bg-secondary text-surface-container-lowest rounded-lg font-label-md text-label-md hover:bg-secondary/90 transition-colors font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">bolt</span> Renew / Active Plan
                        </button>
                        <span className="text-center font-caption text-caption text-on-primary-container">
                          Renews on Oct 28, 2025
                        </span>
                      </div>
                    </div>

                    {/* Tier 3: Enterprise */}
                    <div className="rounded-xl p-space-md bg-surface-container-low flex flex-col justify-between border border-surface-container">
                      <div>
                        <span className="font-caption text-caption uppercase text-on-surface-variant font-bold tracking-wider">
                          Enterprise / Developer
                        </span>
                        <div className="flex items-baseline gap-1 mt-2 mb-3">
                          <span className="font-title-price-lg text-title-price-lg text-on-surface font-extrabold">$149</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">/ month</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                          Tailored for Borey master developers and real estate brokerages with multi-agent teams.
                        </p>
                        <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Up to 15 Agent Seats Roster
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Dedicated Borey Project Microsite
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Homepage Carousel Sponsorship
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Lead API &amp; CRM Webhook Sync
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-on-surface">check_circle</span>
                            Weekly Advisory &amp; Conversion Audits
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowBakongModal(true)}
                        className="mt-space-lg w-full py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors font-semibold cursor-pointer"
                      >
                        Upgrade to Agency Suite
                      </button>
                    </div>
                  </div>

                  {/* Payment Pill Grid */}
                  <div className="bg-surface-container p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-container-high">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
                        <span className="material-symbols-outlined text-[28px]">qr_code_2</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          14-Day Free PRO Trial Available
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Instantly upgrade with zero lock-in contracts. Accepted throughout Cambodia via NBC Bakong:
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                      <div className="bg-surface-container-lowest px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">KHQR / Bakong</span>
                      </div>
                      <div className="bg-surface-container-lowest px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-700" />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">ABA PAY</span>
                      </div>
                      <div className="bg-surface-container-lowest px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">Wing Bank</span>
                      </div>
                      <div className="bg-surface-container-lowest px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">ACLEDA</span>
                      </div>
                      <div className="bg-surface-container-lowest px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Visa/Mastercard
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 3: Detailed Client Reviews */}
                <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-caption text-caption text-secondary uppercase font-bold tracking-wider">
                        Testimonials
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Recent Client Endorsements</h2>
                    </div>
                    <span className="font-label-sm text-label-sm bg-surface-container px-3 py-1 rounded-full text-on-surface font-semibold">
                      4.9 / 5.0 (86 Reviews)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between border border-surface-container">
                        <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                          {t.quote}
                        </p>
                        <div className="flex items-center gap-3 mt-space-md pt-space-xs border-t border-surface-container">
                          <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-secondary text-sm">
                            {t.clientInitial}
                          </div>
                          <div>
                            <h5 className="font-label-md text-label-md text-on-surface leading-snug font-bold">
                              {t.clientName}
                            </h5>
                            <span className="font-caption text-caption text-on-surface-variant">
                              {t.propertyContext}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* RIGHT 4 COLUMNS: Metrics & Leads */}
              <div className="lg:col-span-4 flex flex-col gap-space-lg">
                {/* WIDGET 1: Listing Metrics */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md border border-surface-container">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">insights</span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Listing Metrics</h3>
                    </div>
                    <span className="font-caption text-caption text-on-tertiary-container font-bold bg-tertiary-fixed px-2 py-0.5 rounded">
                      Last 30 Days
                    </span>
                  </div>

                  <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-2 border border-surface-container">
                    <div className="flex items-center justify-between">
                      <span className="font-caption text-caption text-on-surface-variant font-semibold">
                        PRO Impression Uplift
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">+34% vs Standard</span>
                    </div>

                    {/* SVG Sparkline Graph */}
                    <div className="h-24 w-full relative">
                      <svg className="w-full h-full text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 300 80">
                        <defs>
                          <linearGradient id="gradientPro" x1="0%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="#006398" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#006398" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,60 C40,55 70,65 100,42 C130,22 170,38 200,20 C230,8 260,18 300,5 L300,80 L0,80 Z"
                          fill="url(#gradientPro)"
                        />
                        <path
                          d="M0,60 C40,55 70,65 100,42 C130,22 170,38 200,20 C230,8 260,18 300,5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                        />
                        <circle cx="200" cy="20" fill="#006398" r="3" />
                        <circle cx="300" cy="5" fill="#ba7600" r="4" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center pt-1">
                      <div className="bg-surface-container-lowest p-2 rounded-lg border border-surface-container">
                        <span className="font-caption text-caption text-on-surface-variant block">Listing Views</span>
                        <span className="font-title-price-md text-title-price-md text-on-surface font-extrabold">24,810</span>
                      </div>
                      <div className="bg-surface-container-lowest p-2 rounded-lg border border-surface-container">
                        <span className="font-caption text-caption text-on-surface-variant block">Verified Inquiries</span>
                        <span className="font-title-price-md text-title-price-md text-secondary font-extrabold">192</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">Telegram routing speed</span>
                      <span className="font-bold text-on-surface">Instant (&lt; 2s)</span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">Title Verification Rate</span>
                      <span className="font-bold text-on-surface">100% L-Map Clean</span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant">Inquiry-to-Viewing Ratio</span>
                      <span className="font-bold text-on-tertiary-container">22.4% (Top 2%)</span>
                    </div>
                  </div>
                </div>

                {/* WIDGET 2: Incoming Leads Stream */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md border border-surface-container">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">
                        notifications_active
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Incoming Leads</h3>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    {leadsList.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5 hover:bg-surface-container transition-colors border border-surface-container"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {lead.name}
                          </span>
                          <span className="font-caption text-caption text-secondary font-bold">
                            {lead.timeAgo}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          {lead.propertyTitle}
                        </p>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-surface-container">
                          <span className="font-caption text-caption text-on-tertiary-container font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">payments</span>
                            {lead.budget}
                          </span>
                          {lead.actionChannel === 'telegram' ? (
                            <a
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#229ED9] hover:underline"
                              href="https://t.me"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Reply via Telegram <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                            </a>
                          ) : lead.actionChannel === 'whatsapp' ? (
                            <a
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366] hover:underline"
                              href="https://wa.me"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Reply WhatsApp <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => alert(`Ticket #${lead.id} opened for Chen Wei Real Estate Fund.`)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary hover:underline cursor-pointer"
                            >
                              Open Ticket <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('All 14 active inquiries retrieved.')}
                    className="w-full py-2 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors text-center font-semibold cursor-pointer"
                  >
                    View All Active Inquiries (14 Unread)
                  </button>
                </div>

                {/* WIDGET 3: Core Territory */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm border border-surface-container">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Core Territory</h3>
                    <span className="font-caption text-caption text-secondary font-semibold">Phnom Penh Core</span>
                  </div>

                  <div
                    className="w-full h-44 bg-cover bg-center rounded-xl relative overflow-hidden flex items-end p-2.5 shadow-inner"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7EHs2s7jWTIccUkJIIz34pmKFgZ8J7Ks0yv_OMYlCx8opTRHjz-NcYe55ag6KnB_RSyXi0tRHOf2KfdhiUXmYVk0iHWblYkSoo3a6Doa1Tew6rfyCjS9qwmFci5mJ-Mga-BpCeBdT-RiszoBw56n1im9wP7wAnsw1LJkhIv-Isb-O6rNBmGwQYhi880940Eg9PKVvLRW2Yt1vXiByo-4O7ZlXWWMl2ow_kjb_xiTU--g_9wVilUYH8A')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between w-full text-surface-container-lowest">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-secondary-container text-[18px]">location_on</span>
                        <span className="font-label-sm text-label-sm font-bold">Chamkarmon &amp; BKK1 Sector</span>
                      </div>
                      <span className="bg-surface-container-lowest/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                        38 Active Pins
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm flex items-center gap-2 border border-surface-container">
                    <span className="material-symbols-outlined text-secondary text-[20px]">corporate_fare</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold">Main Agency Office</span>
                      <span className="text-on-surface-variant font-caption text-caption">
                        #42 Preah Norodom Blvd, Daun Penh, Phnom Penh
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bakong KHQR Modal */}
      {showBakongModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl p-space-lg flex flex-col items-center text-center gap-space-sm border border-surface-container">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">qr_code_2</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Scan with Bakong / ABA KHQR
            </h3>
            <p className="font-caption text-caption text-on-surface-variant">
              Instant activation for DYD PRO Agent tier ({billingCycle === 'annual' ? '$390 / year' : '$39 / month'}).
            </p>

            <div className="w-48 h-48 bg-surface-container-low p-4 rounded-xl flex items-center justify-center border-2 border-dashed border-red-500 my-2">
              <svg className="w-full h-full text-red-600" fill="currentColor" viewBox="0 0 100 100">
                <path d="M10 10h30v30h-30z M16 16v18h18v-18z M22 22h6v6h-6z M60 10h30v30h-30z M66 16v18h18v-18z M72 22h6v6h-6z M10 60h30v30h-30z M16 66v18h18v-18z M22 72h6v6h-6z M55 55h10v10h-10z M75 55h15v10h-15z M55 75h10v15h-10z M75 75h15v15h-15z M50 20h5v10h-5z M20 50h10v5h-10z" />
              </svg>
            </div>

            <div className="flex items-center gap-2 text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              NBC Bakong Secure Payment Verified
            </div>

            <button
              type="button"
              onClick={() => {
                alert('Payment verified via Bakong! DYD Pro subscription is active.');
                setShowBakongModal(false);
              }}
              className="w-full mt-2 py-2 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-bold cursor-pointer"
            >
              Simulate Successful Payment
            </button>
            <button
              type="button"
              onClick={() => setShowBakongModal(false)}
              className="text-on-surface-variant hover:text-on-surface font-caption text-caption cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
