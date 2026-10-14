import React from 'react';
import { LOGO_URL } from '../data/mockData';

interface FooterProps {
  onNavigateExplore?: (khan?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateExplore }) => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-space-xl pb-space-lg border-t border-surface-container">
      <div className="w-full max-w-[1720px] mx-auto px-space-md lg:px-margin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
        {/* Column 1: Brand & Contact Info */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <img
              alt="DYD Property Logo"
              className="h-7 w-auto object-contain"
              src={LOGO_URL}
            />
            <span className="font-headline-sm text-headline-sm text-on-surface">
              DYD Property
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            The leading digital property gateway across the Kingdom of Cambodia. Certified listings, verified land titles, and premier Borey developments.
          </p>
          <div className="flex flex-col gap-space-xs mt-space-sm">
            <div className="flex items-center gap-space-sm text-on-surface">
              <span className="material-symbols-outlined text-secondary text-[20px]">call</span>
              <span className="font-label-md text-label-md">Hotline: +855 23 888 999</span>
            </div>
            <a
              href="https://t.me/DYDProperty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-space-sm text-on-surface hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">send</span>
              <span className="font-label-md text-label-md">Telegram: @DYDProperty</span>
            </a>
            <a
              href="https://wa.me/85512888999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-space-sm text-on-surface hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">chat</span>
              <span className="font-label-md text-label-md">WhatsApp: +855 12 888 999</span>
            </a>
          </div>
        </div>

        {/* Column 2: Popular Locations */}
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline-sm text-headline-sm text-on-surface">Popular Locations</h4>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
            <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
              Phnom Penh
            </span>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('bkk1')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Boeung Keng Kang 1 (BKK1)
            </button>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('tonle-bassac')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Chamkarmon &amp; Tonle Bassac
            </button>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('toul-kork')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Toul Kork (TK)
            </button>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('chroy-changvar')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Chroy Changvar Peninsula
            </button>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('sen-sok')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Sen Sok &amp; Aeon 2 Area
            </button>
            <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider mt-space-xs">
              Provinces
            </span>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('siem-reap')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Siem Reap (Wat Bo, Svay Dangkum)
            </button>
            <button
              onClick={() => onNavigateExplore && onNavigateExplore('sihanoukville')}
              className="text-left hover:text-secondary transition-colors cursor-pointer"
            >
              Sihanoukville Coastal &amp; Otres
            </button>
          </div>
        </div>

        {/* Column 3: Property & Title Types */}
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline-sm text-headline-sm text-on-surface">Property &amp; Title Types</h4>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
            <a className="hover:text-secondary transition-colors" href="#">Modern Condominiums</a>
            <a className="hover:text-secondary transition-colors" href="#">Luxury Villas &amp; Twin Villas</a>
            <a className="hover:text-secondary transition-colors" href="#">Link Villas &amp; Shophouses</a>
            <a className="hover:text-secondary transition-colors" href="#">Development Land (ដីធ្លី)</a>
            <a className="hover:text-secondary transition-colors" href="#">Grade A/B Office Space</a>
            <div className="pt-space-xs flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                Title Deed Verification
              </span>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">verified_user</span>
                <span className="font-label-sm text-label-sm">Hard Title (L-Map Certified)</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-outline">description</span>
                <span className="font-label-sm text-label-sm">Soft Title (Sangkat Recorded)</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
                <span className="font-label-sm text-label-sm">Strata Title (Foreign Freehold)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Bilingual Advisory */}
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline-sm text-headline-sm text-on-surface">Bilingual Advisory</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Receive direct market consultations from licensed RGC valuation specialists and legal title transfer advisors.
          </p>
          <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-secondary font-bold">Official Telegram Channel</span>
            <p className="font-caption text-caption text-on-surface-variant">
              Get daily notifications for distressed assets and VIP pre-launches in Phnom Penh.
            </p>
            <a
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container font-label-md text-label-md py-space-xs rounded-lg transition-colors mt-space-xs font-semibold"
              href="https://t.me/DYDProperty"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Channel
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-space-md lg:px-margin mt-space-xl pt-space-md bg-surface-container flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-caption text-caption rounded-lg">
        <p>© 2025 DYD Property Cambodia Co., Ltd. All rights reserved. Registered Real Estate Brokerage in Kingdom of Cambodia.</p>
        <div className="flex items-center gap-space-md">
          <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-on-surface transition-colors" href="#">Title Transfer Guide</a>
          <a className="hover:text-on-surface transition-colors" href="#">Borey Regulations</a>
        </div>
      </div>
    </footer>
  );
};
