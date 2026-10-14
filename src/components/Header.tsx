import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { LOGO_URL, SOPHEA_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentView: 'home' | 'explore' | 'detail' | 'agent';
  onNavigate: (view: 'home' | 'explore' | 'detail' | 'agent') => void;
  currency: Currency;
  onToggleCurrency: () => void;
  language: Language;
  onToggleLanguage: () => void;
  savedCount: number;
  onOpenAddProperty: () => void;
  onOpenSavedModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currency,
  onToggleCurrency,
  language,
  onToggleLanguage,
  savedCount,
  onOpenAddProperty,
  onOpenSavedModal,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-space-md lg:px-margin flex items-center justify-between gap-space-md">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-space-lg">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-space-sm text-left focus:outline-none group cursor-pointer"
          >
            <img
              alt="DYD Property Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                DYD PROPERTY
              </span>
              <span className="font-caption text-caption text-secondary uppercase tracking-widest">
                Cambodia Real Estate
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-xs">
            <button
              onClick={() => onNavigate('explore')}
              className={`px-space-sm py-space-xs font-label-md text-label-md transition-colors rounded-lg cursor-pointer ${
                currentView === 'explore'
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {language === 'KH' ? 'ទិញ (Buy)' : 'Buy (ទិញ)'}
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="px-space-sm py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg cursor-pointer"
            >
              {language === 'KH' ? 'ជួល (Rent)' : 'Rent (ជួល)'}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className={`px-space-sm py-space-xs font-label-md text-label-md transition-colors rounded-lg cursor-pointer ${
                currentView === 'home'
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {language === 'KH' ? 'បុរី & គម្រោងថ្មី (Borey)' : 'Borey & New Projects (បុរី & គម្រោងថ្មី)'}
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="px-space-sm py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg cursor-pointer"
            >
              {language === 'KH' ? 'ពាណិជ្ជកម្ម (Commercial)' : 'Commercial (ពាណិជ្ជកម្ម)'}
            </button>
            <button
              onClick={() => onNavigate('agent')}
              className={`px-space-sm py-space-xs font-label-md text-label-md transition-colors rounded-lg cursor-pointer ${
                currentView === 'agent'
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {language === 'KH' ? 'ស្វែងរកភ្នាក់ងារ (Agents)' : 'Find Agents (ស្វែងរកភ្នាក់ងារ)'}
            </button>
            <button
              onClick={onOpenAddProperty}
              className="px-space-sm py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg cursor-pointer"
            >
              {language === 'KH' ? 'ដាក់លក់ (Sell / List)' : 'Sell / List (ដាក់លក់)'}
            </button>
          </nav>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-space-sm lg:gap-space-md">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => onToggleLanguage()}
              className="hidden md:flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container px-space-sm py-space-xs rounded-lg cursor-pointer transition-colors"
              title="Switch Language: Khmer / English"
            >
              <span className="font-label-sm text-label-sm text-on-surface">
                {language === 'KH' ? '🇰🇭 ខ្មែរ' : '🇰🇭 ខ្មែរ'}
              </span>
              <span className="font-label-sm text-label-sm text-outline-variant">/</span>
              <span
                className={`font-label-sm text-label-sm ${
                  language === 'EN' ? 'text-secondary font-bold' : 'text-on-surface-variant'
                }`}
              >
                EN
              </span>
              <span className="material-symbols-outlined text-outline text-[16px]">
                cached
              </span>
            </button>
          </div>

          {/* Currency Toggle (USD / KHR) */}
          <button
            onClick={onToggleCurrency}
            className="hidden lg:flex items-center bg-surface-container-low hover:bg-surface-container px-space-sm py-space-xs rounded-lg transition-colors cursor-pointer"
            title="Toggle Currency (1 USD = 4,080 KHR)"
          >
            <span
              className={`font-label-sm text-label-sm ${
                currency === 'USD' ? 'text-secondary font-bold' : 'text-on-surface-variant'
              }`}
            >
              USD ($)
            </span>
            <span className="font-label-sm text-label-sm text-outline-variant mx-1">|</span>
            <span
              className={`font-label-sm text-label-sm ${
                currency === 'KHR' ? 'text-secondary font-bold' : 'text-on-surface-variant'
              }`}
            >
              KHR (៛)
            </span>
          </button>

          {/* Saved Properties Favorite Button */}
          <button
            onClick={onOpenSavedModal}
            className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
            title="View saved properties"
          >
            <span className="material-symbols-outlined">favorite</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary font-label-sm text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Add Property Button */}
          <button
            onClick={onOpenAddProperty}
            className="hidden sm:flex items-center gap-space-xs bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container px-space-md py-space-xs rounded-lg transition-colors font-label-md text-label-md cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Add Property</span>
          </button>

          {/* Agent Profile Button (leads to Agent Console) */}
          <button
            onClick={() => onNavigate('agent')}
            className={`flex items-center gap-space-sm pl-space-xs bg-surface-container-low hover:bg-surface-container p-space-xs rounded-full pr-space-sm cursor-pointer transition-all ${
              currentView === 'agent' ? 'ring-2 ring-secondary' : ''
            }`}
            title="Open DYD Pro Agent Console"
          >
            <div className="relative">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-sm"
                src={SOPHEA_AVATAR}
              />
              <span className="absolute -bottom-0.5 -right-0.5 bg-secondary text-on-secondary rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">
                <span className="material-symbols-outlined text-[10px]">verified</span>
              </span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface font-bold leading-tight">
                Sophea Kem
              </span>
              <span className="font-caption text-caption text-on-tertiary-container font-semibold">
                PRO Agent
              </span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] hidden xl:block">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
