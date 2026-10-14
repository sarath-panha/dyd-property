import React, { useState } from 'react';
import { Property, TitleDeedType } from '../types';
import { agents } from '../data/mockData';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (property: Property) => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
}) => {
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<'condo' | 'villa' | 'twin-villa' | 'shophouse' | 'land'>('condo');
  const [titleType, setTitleType] = useState<TitleDeedType>('Verified Strata Title');
  const [khan, setKhan] = useState('chamkarmon');
  const [sangkat, setSangkat] = useState('tonle-bassac');
  const [priceUsd, setPriceUsd] = useState(150000);
  const [netArea, setNetArea] = useState(75);
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(2);
  const [description, setDescription] = useState('');
  const [isForeignQuota, setIsForeignQuota] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      mlsId: `#DYD-PP-${Math.floor(10000 + Math.random() * 90000)}`,
      title,
      description: description || 'Prime newly listed Cambodia property with legal title verification and full facilities.',
      priceUsd: Number(priceUsd),
      pricePerSqM: Math.round(Number(priceUsd) / Number(netArea || 1)),
      locationName: `${sangkat}, ${khan}, Phnom Penh`,
      khan,
      sangkat,
      beds: Number(beds),
      baths: Number(baths),
      netArea: Number(netArea),
      propertyType,
      transactionType: 'sale',
      titleType,
      titleBadgeText: titleType,
      isForeignFreeholdStrata: isForeignQuota,
      featuredBadge: 'New Listing',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4nAU4L_8Jj_D9eC7Pcyg4fpzw16JpDGyZcOIP6va8-vTwXB7EX6utXf1ZXfKkKkaGWaByFo51lm35EVmUUsouFqta9f_jUUzAgH-w9J4mmacXCxPkHObbaj9TkPMwgz50YhIbiX93QBjbB75wt8ZYC7dkJCRi1RJ9pb8RCV1wgqsYFguJ-4BI_9j3ZIhV_07zlzG6Gzxq0O30AeMOy67Q4L5shQLmf_890wnuFS55iEzBNUjuSdfepQ',
      agent: agents.sophea,
      mapCoordinates: { topPercent: 50, leftPercent: 50, label: `$${Math.round(priceUsd / 1000)}k` },
    };

    onAddProperty(newProp);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-space-md bg-primary-container text-surface-container-lowest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container text-[24px]">
              add_home_work
            </span>
            <div>
              <h3 className="font-headline-sm text-[18px] font-bold">List Property on DYD Portal</h3>
              <p className="font-caption text-caption text-primary-fixed-dim">
                Audited L-Map and Strata titles published directly to 28,000+ investors
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Form */}
        {isSuccess ? (
          <div className="p-space-xl flex flex-col items-center justify-center text-center gap-space-md py-16">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">Listing Submitted!</h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Your listing has been submitted and added to the live inventory with instant verified badging.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-space-md overflow-y-auto flex flex-col gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                Property Title / ឈ្មោះអចលនទ្រព្យ *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Diamond Island 2-Bed Sky Suite or Borey Peng Huoth Twin Villa"
                className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="condo">Condo / Apartment</option>
                  <option value="twin-villa">Twin Villa (វីឡាកូនកាត់)</option>
                  <option value="villa">Queen / King Villa</option>
                  <option value="shophouse">Commercial Shophouse</option>
                  <option value="land">Development Land (ដី)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Legal Title Deed
                </label>
                <select
                  value={titleType}
                  onChange={(e) => setTitleType(e.target.value as TitleDeedType)}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="Verified Strata Title">Verified Strata Title (Foreign Freehold)</option>
                  <option value="Hard Title (L-Map)">Hard Title (L-Map Certified)</option>
                  <option value="Borey Approved">Borey Approved Agreement</option>
                  <option value="Soft Title (Sangkat)">Soft Title (Sangkat Recorded)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Khan / District
                </label>
                <select
                  value={khan}
                  onChange={(e) => setKhan(e.target.value)}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="chamkarmon">Chamkarmon</option>
                  <option value="bkk1">Boeung Keng Kang (BKK)</option>
                  <option value="toul-kork">Toul Kork (TK)</option>
                  <option value="chroy-changvar">Chroy Changvar</option>
                  <option value="sen-sok">Sen Sok</option>
                  <option value="meanchey">Mean Chey (Hun Sen Blvd)</option>
                  <option value="daun-penh">Daun Penh (Riverside)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Price (USD $) *
                </label>
                <input
                  type="number"
                  required
                  min={10000}
                  step={1000}
                  value={priceUsd}
                  onChange={(e) => setPriceUsd(Number(e.target.value))}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-space-sm">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Net Area (m²)
                </label>
                <input
                  type="number"
                  min={15}
                  value={netArea}
                  onChange={(e) => setNetArea(Number(e.target.value))}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={baths}
                  onChange={(e) => setBaths(Number(e.target.value))}
                  className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1 font-semibold">
                Overview &amp; Features
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High floor, river views, European fittings, 24h security..."
                className="w-full px-space-sm py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="flex items-center gap-2 bg-surface-container-low p-space-sm rounded-lg">
              <input
                type="checkbox"
                id="foreignQuota"
                checked={isForeignQuota}
                onChange={(e) => setIsForeignQuota(e.target.checked)}
                className="accent-secondary w-4 h-4 cursor-pointer"
              />
              <label htmlFor="foreignQuota" className="font-label-sm text-label-sm text-on-surface cursor-pointer font-medium">
                Foreign Freehold Quota Eligible (100% individual foreigner ownership above 1st floor)
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-space-sm pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-space-md py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-space-lg py-2 bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container rounded-lg font-label-md text-label-md font-bold shadow-md cursor-pointer transition-colors"
              >
                Publish Listing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
