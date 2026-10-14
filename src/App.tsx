import React, { useState, useEffect } from 'react';
import { Currency, Language, Property } from './types';
import { properties as initialProperties } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContacts } from './components/FloatingContacts';
import { AddPropertyModal } from './components/AddPropertyModal';
import { SavedPropertiesModal } from './components/SavedPropertiesModal';
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { AgentConsoleView } from './views/AgentConsoleView';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'explore' | 'detail' | 'agent'>('home');
  const [propertiesList, setPropertiesList] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property>(initialProperties[0]);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('EN');
  // Initial 3 saved favorites as shown in screenshots
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(['penthouse-the-bridge', 'urban-village-phase-2', 'chip-mong-landmark-271'])
  );

  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState<boolean>(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [exploreFilters, setExploreFilters] = useState<{ location?: string; type?: string; maxPrice?: number } | undefined>();

  // Scroll to top on view transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'KHR' : 'USD'));
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'KH' : 'EN'));
  };

  const handleNavigateExplore = (filters?: { location?: string; type?: string; maxPrice?: number }) => {
    setExploreFilters(filters);
    setCurrentView('explore');
  };

  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setCurrentView('detail');
  };

  const handleAddProperty = (newProp: Property) => {
    setPropertiesList((prev) => [newProp, ...prev]);
    setSelectedProperty(newProp);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col">
      {/* Top Header shown on public pages */}
      {currentView !== 'agent' && (
        <Header
          currentView={currentView}
          onNavigate={setCurrentView}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          savedCount={favorites.size}
          onOpenAddProperty={() => setIsAddPropertyOpen(true)}
          onOpenSavedModal={() => setIsSavedModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className={`flex-1 w-full ${currentView !== 'agent' ? 'pt-20' : ''}`}>
        {currentView === 'home' && (
          <HomeView
            currency={currency}
            language={language}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateExplore={handleNavigateExplore}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            currency={currency}
            language={language}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            initialFilters={exploreFilters}
          />
        )}

        {currentView === 'detail' && (
          <PropertyDetailView
            property={selectedProperty}
            currency={currency}
            language={language}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateExplore={handleNavigateExplore}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'agent' && (
          <AgentConsoleView
            currency={currency}
            language={language}
            onNavigateHome={() => setCurrentView('home')}
            onOpenAddProperty={() => setIsAddPropertyOpen(true)}
            onSelectProperty={handleSelectProperty}
          />
        )}
      </main>

      {/* Footer shown on public pages */}
      {currentView !== 'agent' && (
        <>
          <Footer onNavigateExplore={(khan) => handleNavigateExplore({ location: khan })} />
          <FloatingContacts />
        </>
      )}

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddPropertyOpen}
        onClose={() => setIsAddPropertyOpen(false)}
        onAddProperty={handleAddProperty}
      />

      {/* Saved Properties Drawer Modal */}
      <SavedPropertiesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        favorites={favorites}
        allProperties={propertiesList}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={handleSelectProperty}
        currency={currency}
      />
    </div>
  );
}
