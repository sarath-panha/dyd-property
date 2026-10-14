import React from 'react';
import { Currency, Property } from '../types';
import { formatPrice } from '../utils/formatters';

interface SavedPropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Set<string>;
  allProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  currency: Currency;
}

export const SavedPropertiesModal: React.FC<SavedPropertiesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  allProperties,
  onRemoveFavorite,
  onSelectProperty,
  currency,
}) => {
  if (!isOpen) return null;

  const savedList = allProperties.filter((p) => favorites.has(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-surface-container">
        {/* Header */}
        <div className="p-space-md bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[24px]">favorite</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Saved Properties ({savedList.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="p-space-md overflow-y-auto flex flex-col gap-space-sm divide-y divide-surface-container">
          {savedList.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[48px] text-outline">favorite_border</span>
              <p className="font-body-md text-body-md">You haven't saved any properties yet.</p>
            </div>
          ) : (
            savedList.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  onSelectProperty(prop);
                  onClose();
                }}
                className="pt-space-sm first:pt-0 flex items-center justify-between gap-space-sm hover:bg-surface-container-low p-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-20 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface group-hover:text-secondary font-bold truncate">
                      {prop.title}
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant truncate">
                      {prop.locationName}
                    </span>
                    <span className="font-label-md text-label-md text-primary font-extrabold mt-0.5">
                      {formatPrice(prop.priceUsd, currency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(prop.id);
                    }}
                    className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-surface-container transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary text-[20px]">
                    chevron_right
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
