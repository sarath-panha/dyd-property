import React, { useState, useMemo } from 'react';
import { Currency, Language, Property } from '../types';
import { formatPrice, formatApproxKhr } from '../utils/formatters';
import { properties } from '../data/mockData';

interface PropertyDetailViewProps {
  property?: Property;
  currency: Currency;
  language: Language;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onNavigateExplore: (filters?: any) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property: propProp,
  currency,
  language,
  favorites,
  onToggleFavorite,
  onNavigateExplore,
  onSelectProperty,
}) => {
  // Default to the flagship Penthouse if not passed
  const property = propProp || properties[0];
  const isFav = favorites.has(property.id);

  // Mortgage Calculator State
  const [calcPrice, setCalcPrice] = useState<number>(property.priceUsd || 288000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(20);

  // Tour Booking State
  const [tourType, setTourType] = useState<'in-person' | 'video'>('in-person');
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [timeWindow, setTimeWindow] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [tourSubmitted, setTourSubmitted] = useState<boolean>(false);

  // Lightbox / Modal for photos
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Calculate Mortgage Values
  const mortgageCalculation = useMemo(() => {
    const downAmount = calcPrice * (downPercent / 100);
    const principal = calcPrice - downAmount;
    const annualRate = 0.075; // 7.5% ABA bank partner rate
    const monthlyRate = annualRate / 12;
    const totalMonths = loanYears * 12;
    const monthlyPI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const monthlyHoa = 120;
    const monthlyInsurance = 25;
    const monthlyTotal = monthlyPI + monthlyHoa + monthlyInsurance;

    return {
      downAmount: Math.round(downAmount),
      principal: Math.round(principal),
      monthlyPI: Math.round(monthlyPI),
      monthlyHoa,
      monthlyInsurance,
      monthlyTotal: Math.round(monthlyTotal),
    };
  }, [calcPrice, downPercent, loanYears]);

  const handleTourBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSubmitted(true);
    setTimeout(() => {
      alert(`Viewing confirmed with ${property.agent.name}! Details dispatched to your phone/Telegram.`);
      setTourSubmitted(false);
      setClientName('');
      setClientContact('');
    }, 1200);
  };

  const gallery = property.galleryImages || [
    property.image,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKroegHfADL7v10g5CdxOp4w4cZDm_wQT3fmsSDjSKwSxYYQchKEcUXuevHYbvX2xuhaaM227Av7MA-SZRPpRBWK8SlMhefk6UV5xcBRwSzkbrE8YoeSta7_U_MGxe7PS-pa2ZLmYG1Ua1j-ONOuwADfGDA-QaE8YwInZhUT7qivWrRjCDkzyY3KnnxiZz0-o0V6E-LA6PDeipbRa7ZoYehF7eoMhzjxDhzPrZCi70ly_emhancXeFyQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBm7SX-S2JYPdvWQCM4lVETvWZiG31jDyBMu3HY4x4Jym37Fiucg0dn6d8zUrN40NCpG0WPv-ObJx8fZCEH0kRCs9n8ZtPmqBoMWZo822jjzKNfTBMgbzw1yk27M_h99q2rZq4zOVtkf8qxEBaImidvmluRTywz069dI_w77mbICkzmPMjTKg2yUVuOvQLll4URY9JNLfFvL4oCdj6_HlvOTa2Xxz75dDt-RcpW0abrpifwYIr89oi7_A',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAvQe8B1BL6sUKmbLua5ZQgZjUOkRRX1t0JiEfxNvkQcMToGv1GG3aAReyah1RZMJPJ1js5AGqinIb9ykTOzbwzyxAJ5t3OB90xpS9snkeBIw5hpjbUqIakGVFM0G3cc9afDJkNvD2qh9kfucSli5j-RrrcdrD2tpqpWWn31P7XmqyXSWYXPOv6DM6O-sK9WopQGPzEkfD4sIpf2bk0-ziuYAfpAmJOI1qGlqpKm_JQr7i0yt-5mym_w',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDg5dV3etMJHwcBWhOQV5n-GA1MPhrSEnXk89Lr_Hmytu85iEmGbWyfJZHSmVVbA8uCGVrCS_FyNwJ9pCTZu0eQiK04qSuDuullvhiQF63980I8GvOemoG48c2enfh4cdF3ErVGGEJ01oZVxYPpLt6OJWYIYCKPz6knASOa5nhU6GXgA-PDigz3glX73kZq1jX6ZRbUzT0AVVXKCwbAF3wWBN60A0ZPC5CVlPBhyly_swrxXyfOpWtbrA',
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Top Utility Context Bar */}
      <section className="w-full px-space-md lg:px-margin pt-space-md pb-space-sm bg-surface-container-low border-b border-surface-container">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
            <button onClick={() => onNavigateExplore()} className="hover:text-secondary transition-colors cursor-pointer">
              Home
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
            <button onClick={() => onNavigateExplore()} className="hover:text-secondary transition-colors cursor-pointer">
              Phnom Penh
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
            <span className="text-on-surface-variant capitalize">{property.khan}</span>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
            <span className="text-on-surface-variant capitalize">{property.sangkat}</span>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
            <span className="text-on-surface font-semibold">{property.mlsId || 'PH-3802'}</span>
          </nav>

          {/* Quick Actions & Trust Tag */}
          <div className="flex items-center flex-wrap gap-space-xs md:gap-space-sm">
            <div className="flex items-center gap-space-xs bg-tertiary-fixed/30 px-space-sm py-space-xs rounded-full">
              <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                verified_user
              </span>
              <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
                Hard Title &amp; L-Map Inspected
              </span>
            </div>

            <div className="flex items-center gap-space-xs ml-auto md:ml-0">
              <button
                type="button"
                onClick={() => onToggleFavorite(property.id)}
                className={`flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-xs rounded-lg shadow-sm hover:bg-surface-container transition-all group cursor-pointer ${
                  isFav ? 'text-error' : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  {isFav ? 49 : 48}
                </span>
              </button>
              <button
                type="button"
                onClick={() => alert(`Property link copied to clipboard: ${window.location.href}`)}
                className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-xs rounded-lg shadow-sm hover:bg-surface-container transition-all text-on-surface-variant hover:text-on-surface cursor-pointer"
                title="Share property"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span className="hidden sm:inline font-label-sm text-label-sm">Share</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-xs rounded-lg shadow-sm hover:bg-surface-container transition-all text-on-surface-variant hover:text-on-surface cursor-pointer"
                title="Print full PDF dossier"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span className="hidden sm:inline font-label-sm text-label-sm">Brochure</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Feedback report ticket opened with DYD Cadastral Property Desk.')}
                className="p-space-xs bg-surface-container-lowest rounded-lg shadow-sm text-outline hover:text-error transition-colors cursor-pointer"
                title="Report inaccuracy"
              >
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Title & Key Price Banner */}
      <section className="w-full px-space-md lg:px-margin py-space-md bg-surface">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-space-sm py-0.5 rounded-full uppercase tracking-wider font-bold">
                {property.featuredBadge || 'Exclusive Penthouse'}
              </span>
              <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded-full">
                MLS: {property.mlsId || '#DYD-PP-88392'}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
              <span>{property.locationName}</span>
            </div>
          </div>

          <div className="flex flex-col lg:items-end gap-0 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
            <div className="flex items-baseline gap-space-sm">
              <span className="font-title-price-lg text-title-price-lg text-primary tracking-tight">
                {formatPrice(property.priceUsd, currency)}
              </span>
              <span className="font-label-md text-label-md text-secondary font-bold">USD</span>
              <span className="font-body-sm text-body-sm text-outline-variant">
                {formatApproxKhr(property.priceUsd)}
              </span>
            </div>
            <div className="flex items-center gap-space-xs font-caption text-caption text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">payments</span>
              <span>
                Est. <strong>${Math.round((property.priceUsd * 0.7 * 0.075) / 12 + 145)} / mo</strong> via ABA Bank (70% LTV, 20-Yr Term)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid (Zillow-Grade 5-Photo Mosaic) */}
      <section className="w-full px-space-md lg:px-margin pb-space-lg bg-surface">
        <div className="max-w-[1360px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-space-xs h-[420px] md:h-[540px] rounded-2xl overflow-hidden shadow-md">
            {/* Main Hero Photo */}
            <div
              onClick={() => setActivePhotoIndex(0)}
              className="relative md:col-span-2 md:row-span-2 overflow-hidden group cursor-pointer"
            >
              <img
                src={gallery[0]}
                alt="Main Hero"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-space-md left-space-md text-on-primary">
                <span className="font-label-sm text-label-sm bg-primary/70 backdrop-blur-md px-space-sm py-1 rounded-full uppercase tracking-wider font-semibold">
                  Panoramic River &amp; Skyline
                </span>
                <p className="font-headline-sm text-headline-sm mt-1 text-on-primary drop-shadow-sm">
                  Direct Tonle Bassac Waterfront Vistas
                </p>
              </div>
            </div>

            {/* Secondary Photo 1 */}
            <div
              onClick={() => setActivePhotoIndex(1)}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={gallery[1]}
                alt="Master Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-space-xs left-space-xs bg-primary/70 text-on-primary text-[10px] font-label-sm px-2 py-0.5 rounded backdrop-blur-sm">
                Master Suite
              </span>
            </div>

            {/* Secondary Photo 2 */}
            <div
              onClick={() => setActivePhotoIndex(2)}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={gallery[2]}
                alt="Custom Kitchen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-space-xs left-space-xs bg-primary/70 text-on-primary text-[10px] font-label-sm px-2 py-0.5 rounded backdrop-blur-sm">
                Custom Kitchen
              </span>
            </div>

            {/* Secondary Photo 3 */}
            <div
              onClick={() => setActivePhotoIndex(3)}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={gallery[3]}
                alt="Marble Spa Bath"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-space-xs left-space-xs bg-primary/70 text-on-primary text-[10px] font-label-sm px-2 py-0.5 rounded backdrop-blur-sm">
                Marble Spa Bath
              </span>
            </div>

            {/* Secondary Photo 4 */}
            <div
              onClick={() => setActivePhotoIndex(4)}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={gallery[4]}
                alt="Rooftop Pool"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-space-xs left-space-xs bg-primary/70 text-on-primary text-[10px] font-label-sm px-2 py-0.5 rounded backdrop-blur-sm">
                39th Fl Sky Lounge &amp; Pool
              </span>
            </div>
          </div>

          {/* Floating Actions */}
          <div className="absolute bottom-space-md right-space-md flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => alert('Launching Matterport 360° Virtual Tour for Unit PH-3802...')}
              className="flex items-center gap-space-xs bg-surface-container-lowest/95 backdrop-blur-md text-on-surface hover:bg-surface-container-lowest font-label-md text-label-md px-space-md py-space-xs rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">view_in_ar</span>
              <span>360° Virtual Tour</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePhotoIndex(0)}
              className="flex items-center gap-space-xs bg-primary/90 backdrop-blur-md text-on-primary hover:bg-primary font-label-md text-label-md px-space-md py-space-xs rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>View All 32 Photos &amp; Plans</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Specifications Quick-Bar */}
      <section className="w-full px-space-md lg:px-margin pb-space-lg bg-surface">
        <div className="max-w-[1360px] mx-auto bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">bed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant">Bedrooms</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">{property.beds} Beds</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">bathtub</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant">Bathrooms</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">{property.baths} Baths</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">square_foot</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant">Net Floor Area</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  {property.netArea} m²{' '}
                  <span className="text-xs text-outline font-normal">
                    ({Math.round(property.netArea * 10.764)} ft²)
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">price_change</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant">Unit Price / m²</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  ${property.pricePerSqM} / m²
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant">Elevation Level</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  {property.floorLevel || '38th Floor'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 flex items-center justify-center text-on-tertiary-container">
                <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant">Title Deed</span>
                <span className="font-headline-sm text-headline-sm text-on-tertiary-container">
                  {property.titleType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Content Structure */}
      <section className="w-full px-space-md lg:px-margin pb-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT COLUMN: 65% (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Bilingual Property Overview */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Property Narrative &amp; Highlights
                </h2>
                <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-caption text-caption text-on-surface font-semibold">
                    Ready for Handover
                  </span>
                </div>
              </div>

              {/* English Narrative */}
              <div className="font-body-lg text-body-lg text-on-surface-variant flex flex-col gap-space-sm leading-relaxed">
                <p>
                  Crowning the 38th floor of Phnom Penh's landmark high-rise destination,{' '}
                  <strong>Penthouse Horizon at The Bridge Club &amp; Residences</strong> presents an unprecedented
                  urban lifestyle. Spanning an expansive 148 square meters of impeccably curated net living space, this
                  premier residence merges sweeping 270-degree vistas across the Tonle Bassac and Mekong rivers with
                  architectural interior refinements.
                </p>
                <p>
                  Designed for discerning international investors and high-profile executives, the residence features
                  sound-dampened double-glazed curtain walls, Italian porcelain surfaces, integrated smart home
                  automation controls for temperature and motorized solar drapery, and a bespoke culinary island outfitted
                  with premium German appliances.
                </p>
              </div>

              {/* Khmer Summary Box */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs border border-surface-container">
                <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">translate</span>
                  <span>ការពិពណ៌នាសង្ខេបជាភាសាខ្មែរ (Khmer Translation)</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-loose">
                  ខុនដូភេនហោស៍ (Penthouse) ប្រណីតជាន់ទី ៣៨ នៅគម្រោង The Bridge Club &amp; Residences សង្កាត់ទន្លេបាសាក់
                  ខណ្ឌចំការមន។ ទំហំផ្ទៃក្រឡាសុទ្ធ ១៤៨ ម៉ែត្រការ៉េ បន្ទប់គេង ៣ បន្ទប់ទឹក ៣
                  រៀបចំគ្រឿងសង្ហារិមលំដាប់អន្តរជាតិពេញលេញ។ ផ្ដល់ជូនប្លង់រឹង Strata Title (កម្មសិទ្ធិអចិន្ត្រៃយ៍ស្របច្បាប់ទាំងជនជាតិខ្មែរ
                  និងបរទេស) ទេសភាពទន្លេ និងរាជធានីភ្នំពេញទាំងមូល មិនបាំងទេសភាព។
                </p>
              </div>

              {/* Quick Highlight Tags */}
              <div className="flex flex-wrap gap-space-xs pt-space-xs">
                <span className="bg-surface-container px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm text-on-surface">
                  ✨ Turnkey Designer Furnishing
                </span>
                <span className="bg-surface-container px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm text-on-surface">
                  🔇 Acoustic Double-Glazed Glass
                </span>
                <span className="bg-surface-container px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm text-on-surface">
                  📱 Smart Home Automation
                </span>
                <span className="bg-surface-container px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm text-on-surface">
                  ⚡ 100% Dual Backup Generator
                </span>
                <span className="bg-surface-container px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm text-on-surface">
                  🚗 Dedicated Underground Parking
                </span>
              </div>
            </div>

            {/* Amenities & Private Facilities */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Amenities &amp; Private Facilities
                </h2>
                <span className="font-caption text-caption text-secondary font-semibold">
                  Free Access for Residents
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-md">
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">pool</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Infinity Sky Pool</span>
                    <span className="font-caption text-caption text-on-surface-variant">39th Fl Olympic-length</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">fitness_center</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Technogym Center</span>
                    <span className="font-caption text-caption text-on-surface-variant">Cardio &amp; strength equipment</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">hot_tub</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Steam &amp; Sauna Suites</span>
                    <span className="font-caption text-caption text-on-surface-variant">Separate men &amp; women spa</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">security</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">24/7 Diplomatic Security</span>
                    <span className="font-caption text-caption text-on-surface-variant">Keycard biometric access</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">wifi</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Ultra Fiber Internet</span>
                    <span className="font-caption text-caption text-on-surface-variant">Pre-wired high throughput</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">local_parking</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Reserved Parking Slot</span>
                    <span className="font-caption text-caption text-on-surface-variant">Covered basement B2 slot</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">toys</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Kids Adventure Zone</span>
                    <span className="font-caption text-caption text-on-surface-variant">Indoor &amp; outdoor soft-play</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">store</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Retail &amp; Dining Plaza</span>
                    <span className="font-caption text-caption text-on-surface-variant">Ground floor retail arcade</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm p-space-sm bg-surface rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-[24px]">power</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Zero-Downtime Power</span>
                    <span className="font-caption text-caption text-on-surface-variant">Dedicated Caterpillar gen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Legal Verification Breakdown */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      DYD Title &amp; Legal Verification
                    </h2>
                    <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Audited and certified by DYD Cadastral Property Desk (Phnom Penh HQ)
                  </p>
                </div>
                <div className="bg-tertiary-fixed/30 px-space-md py-space-xs rounded-xl flex items-center gap-space-sm">
                  <div className="flex flex-col text-right">
                    <span className="font-caption text-caption text-on-tertiary-container font-semibold uppercase">
                      Legal Score
                    </span>
                    <span className="font-title-price-md text-title-price-md text-on-tertiary-container font-extrabold">
                      100% Cleared
                    </span>
                  </div>
                  <svg className="w-10 h-10 text-on-tertiary-container" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.8"
                    />
                    <path
                      className="text-on-tertiary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="100, 100"
                      strokeLinecap="round"
                      strokeWidth="3.8"
                    />
                  </svg>
                </div>
              </div>

              {/* Document Inspection Table */}
              <div className="bg-surface rounded-xl overflow-hidden border border-surface-container">
                <div className="p-space-sm flex items-center justify-between bg-surface-container-low font-label-sm text-label-sm font-semibold text-on-surface">
                  <span>LEGAL CRITERIA &amp; CADASTRAL CHECK</span>
                  <span>VERIFICATION STATUS</span>
                </div>
                <div className="divide-y divide-surface-container">
                  <div className="p-space-sm flex items-center justify-between bg-surface-container-lowest">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">gavel</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Title Type: Foreign Freehold Strata Title
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Eligible for 100% foreign individual freehold ownership under Cambodian Foreign Ownership Law (2010)
                        </span>
                      </div>
                    </div>
                    <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-space-sm py-1 rounded-full font-bold">
                      L-Map Registered
                    </span>
                  </div>

                  <div className="p-space-sm flex items-center justify-between bg-surface">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">tag</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Cadastral Master Registration ID
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Phnom Penh Cadastral Administration: #PP-CHAMK-TB-2018-091448
                        </span>
                      </div>
                    </div>
                    <span className="text-on-surface font-label-sm text-label-sm font-mono font-semibold">
                      Verified
                    </span>
                  </div>

                  <div className="p-space-sm flex items-center justify-between bg-surface-container-lowest">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">receipt_long</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Sangkat Property &amp; Transfer Tax Clearance
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          4% GDT Stamp Duty transfer clearance pre-calculated; current owner holds zero tax encumbrances
                        </span>
                      </div>
                    </div>
                    <span className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded-full font-bold">
                      100% Tax Compliant
                    </span>
                  </div>

                  <div className="p-space-sm flex items-center justify-between bg-surface">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Zero Outstanding Utility &amp; HOA Certificate
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          EDC electricity, PPWSA clean water, and building management fees paid through current month
                        </span>
                      </div>
                    </div>
                    <span className="bg-tertiary-fixed/30 text-on-tertiary-container font-label-sm text-label-sm px-space-sm py-1 rounded-full font-bold">
                      Certificate Issued
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Mortgage Calculator Widget */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Cambodia Mortgage Calculator</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tailored with standard Tier-1 Cambodian bank financing parameters (ABA, Canadia, Chip Mong)
                  </p>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">ABA Bank Partner Rate</span>
                  <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded font-label-sm text-label-sm font-bold">
                    7.5% p.a.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg items-center pt-space-xs">
                {/* Controls */}
                <div className="flex flex-col gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex justify-between font-label-md text-label-md text-on-surface">
                      <span>Property Price</span>
                      <span className="font-bold font-title-price-md text-title-price-md text-primary">
                        ${calcPrice.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={800000}
                      step={5000}
                      value={calcPrice}
                      onChange={(e) => setCalcPrice(Number(e.target.value))}
                      className="w-full accent-secondary cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <div className="flex justify-between font-label-md text-label-md text-on-surface">
                      <span>Down Payment ({downPercent}%)</span>
                      <span className="font-semibold text-secondary">
                        ${mortgageCalculation.downAmount.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPercent}
                      onChange={(e) => setDownPercent(Number(e.target.value))}
                      className="w-full accent-secondary cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <label className="font-label-md text-label-md text-on-surface font-semibold">
                      Loan Term Duration
                    </label>
                    <div className="grid grid-cols-3 gap-space-xs">
                      {[15, 20, 25].map((years) => (
                        <button
                          key={years}
                          type="button"
                          onClick={() => setLoanYears(years)}
                          className={`term-btn py-space-xs px-space-sm rounded-lg font-label-md text-label-md text-center transition-colors cursor-pointer ${
                            loanYears === years
                              ? 'bg-primary text-on-primary font-bold shadow-sm'
                              : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {years} Years
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculated Monthly Payment Card */}
                <div className="bg-surface-container p-space-md rounded-2xl flex flex-col gap-space-sm border border-surface-container-high">
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                    Estimated Monthly Commitment
                  </span>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-title-price-lg text-title-price-lg text-primary font-black">
                      ${mortgageCalculation.monthlyTotal.toLocaleString()}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">/ month</span>
                  </div>

                  {/* Cost breakdown */}
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" />
                        Principal &amp; Interest
                      </span>
                      <span className="font-semibold text-on-surface">
                        ${mortgageCalculation.monthlyPI.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container inline-block" />
                        Monthly Building HOA Fee
                      </span>
                      <span className="font-semibold text-on-surface">
                        ${mortgageCalculation.monthlyHoa}
                      </span>
                    </div>
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-outline-variant inline-block" />
                        Property Fire Insurance (Est.)
                      </span>
                      <span className="font-semibold text-on-surface">
                        ${mortgageCalculation.monthlyInsurance}
                      </span>
                    </div>
                  </div>

                  <div className="pt-space-xs mt-space-xs bg-surface-container-lowest/80 p-space-sm rounded-xl flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-secondary">approval</span>
                    <span className="font-caption text-caption text-on-surface">
                      Pre-qualification takes less than 24h for local and expat salary earners.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Neighborhood & Distances */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Tonle Bassac Neighborhood &amp; Distances
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Phnom Penh’s most sought-after diplomatic and lifestyle quarter
                  </p>
                </div>
                <span className="bg-surface-container-high px-space-sm py-1 rounded-lg font-label-sm text-label-sm text-on-surface font-semibold">
                  WalkScore: 92/100
                </span>
              </div>

              {/* Map Photo */}
              <div
                className="w-full h-72 bg-cover bg-center rounded-xl shadow-inner relative flex items-end p-space-md"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC_TnBRwlNBQKCnJjEnuwLw4RimeqfBfhmnYm_URSXl5iA4_d6SeteVDi9cxKKR9aG6ovuO4yDbWbi2S9wYF501A9LYsOwdOBJ2SLUjGIGkAjrKNX_M2_mjdxb8ucsuAeObpIVkREdDnbdAdsA8Q0fQblCqLySX1axCsJDRLgY5N5C9AbQyPjIbq6ZpXZf4DiDouUCtXTUnagbrn_NHpKsJGt54ubgXzFnW3PguMnthGStKteq4jzV0g')`,
                }}
              >
                <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-xl shadow-md flex items-center gap-space-sm max-w-sm border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[24px]">pin_drop</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      The Bridge Club &amp; Residences
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Village 14, Samdach Hun Sen Park, Tonle Bassac
                    </span>
                  </div>
                </div>
              </div>

              {/* POI Walking Distances */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm">
                <div className="p-space-sm bg-surface rounded-xl flex items-start gap-space-xs border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[20px]">shopping_bag</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">AEON Mall 1</span>
                    <span className="font-caption text-caption text-on-surface-variant">450m • 5 Min Walk</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface rounded-xl flex items-start gap-space-xs border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[20px]">casino</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">NagaWorld 1 &amp; 2</span>
                    <span className="font-caption text-caption text-on-surface-variant">600m • 7 Min Walk</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface rounded-xl flex items-start gap-space-xs border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[20px]">school</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Canadian Int. School (CIS)</span>
                    <span className="font-caption text-caption text-on-surface-variant">Koh Pich • 3 Min Drive</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface rounded-xl flex items-start gap-space-xs border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[20px]">flag</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Australian Embassy</span>
                    <span className="font-caption text-caption text-on-surface-variant">300m • 3 Min Walk</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface rounded-xl flex items-start gap-space-xs border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[20px]">local_cafe</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">BKK1 Lifestyle &amp; Cafes</span>
                    <span className="font-caption text-caption text-on-surface-variant">Street 302 • 4 Min Drive</span>
                  </div>
                </div>
                <div className="p-space-sm bg-surface rounded-xl flex items-start gap-space-xs border border-surface-container">
                  <span className="material-symbols-outlined text-secondary text-[20px]">local_hospital</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Royal Phnom Penh Hospital</span>
                    <span className="font-caption text-caption text-on-surface-variant">Clinic Branch • 5 Min Drive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 35% Sticky Inquire & Tour Booking Box */}
          <div className="lg:col-span-4 flex flex-col gap-space-md sticky top-24">
            {/* Certified Agent Profile Card */}
            <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-md flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="relative">
                  <img
                    alt="Sophea Kem"
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                    src={property.agent.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_4Q3nyXhPHnMTxmYP-EIxp3bZOXI12DxOEbECufszeuO9KAQTTQ6iZ-7fPvxvWL1_Ln_BIuvWHdVm5nV8QG6bkRYDYSb14PTJnjYkCaVLaQPieKBR2sOK_yJ1YomNNalxEn3vXm0Xm23-iQ6yNaJms-o037cySoxyfT2Y7_I7NY_4ih0E2DJTVCZg5L52ahb-DO5X5iHbUD6mLGh0DufOLvXwuUeH720W7IdkDNRiw39AT0Kqx8jo0w'}
                  />
                  <span className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full w-5 h-5 flex items-center justify-center text-[12px] shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {property.agent.name}
                    </h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    {property.agent.title}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-on-tertiary-container text-[15px]">star</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">
                      {property.agent.rating}
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      ({property.agent.reviewCount} verified buyer reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-space-xs rounded-xl flex items-center justify-around font-caption text-caption text-on-surface">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">language</span> Khmer
                </span>
                <span className="text-outline-variant">•</span>
                <span>English</span>
                <span className="text-outline-variant">•</span>
                <span>Mandarin (中文)</span>
              </div>

              {/* Direct Instant Messaging Conduits */}
              <div className="flex flex-col gap-space-xs">
                <a
                  className="w-full flex items-center justify-center gap-space-xs bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary py-space-xs rounded-xl font-label-md text-label-md transition-colors shadow-sm font-semibold cursor-pointer"
                  href={`https://t.me/${property.agent.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Chat on Telegram (@{property.agent.telegram})</span>
                </a>
                <a
                  className="w-full flex items-center justify-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface py-space-xs rounded-xl font-label-md text-label-md transition-colors font-medium cursor-pointer"
                  href={`https://wa.me/${property.agent.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">chat</span>
                  <span>WhatsApp: {property.agent.whatsapp}</span>
                </a>
                <a
                  className="w-full flex items-center justify-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container text-on-surface py-space-xs rounded-xl font-label-md text-label-md transition-colors font-medium cursor-pointer border border-surface-container"
                  href={`tel:${property.agent.phone}`}
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
                  <span>Direct Call: {property.agent.phone}</span>
                </a>
              </div>

              <div className="h-[1px] bg-surface-container" />

              {/* Schedule a Tour Booking Sheet */}
              <form onSubmit={handleTourBooking} className="flex flex-col gap-space-sm">
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Request a Viewing Tour</h4>

                {/* Tour Mode Selection */}
                <div className="grid grid-cols-2 gap-space-xs">
                  <button
                    type="button"
                    onClick={() => setTourType('in-person')}
                    className={`py-space-xs px-space-sm rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                      tourType === 'in-person'
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    <span>In-Person Tour</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourType('video')}
                    className={`py-space-xs px-space-sm rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                      tourType === 'video'
                        ? 'bg-primary text-on-primary font-bold shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                    <span>Live Video Tour</span>
                  </button>
                </div>

                {/* Day Picker */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-caption text-caption text-on-surface-variant font-semibold">Select Day</label>
                  <div className="grid grid-cols-4 gap-space-xs text-center">
                    {[
                      { day: 15, label: 'Sat', isToday: true },
                      { day: 16, label: 'Sun', isToday: false },
                      { day: 17, label: 'Mon', isToday: false },
                      { day: 18, label: 'Tue', isToday: false },
                    ].map((d) => (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setSelectedDay(d.day)}
                        className={`p-space-xs rounded-xl flex flex-col cursor-pointer transition-colors ${
                          selectedDay === d.day
                            ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm ring-1 ring-secondary'
                            : 'bg-surface hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <span className={`font-caption text-[10px] uppercase ${d.isToday ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
                          {d.isToday ? 'Today' : d.label}
                        </span>
                        <span className="font-label-md text-label-md font-bold">{d.day}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-caption text-caption text-on-surface-variant font-semibold">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-3 gap-space-xs">
                    {[
                      { id: 'morning', label: 'Morning (9-12)' },
                      { id: 'afternoon', label: 'Afternoon (2-5)' },
                      { id: 'evening', label: 'Evening (5-7)' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimeWindow(t.id as any)}
                        className={`py-1.5 px-2 rounded-lg font-label-sm text-label-sm text-center transition-colors cursor-pointer ${
                          timeWindow === t.id
                            ? 'bg-primary text-on-primary font-bold shadow-sm'
                            : 'bg-surface hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Input */}
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <input
                    required
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-surface px-space-sm py-2 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container"
                  />
                  <input
                    required
                    type="text"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="Phone or Telegram username"
                    className="w-full bg-surface px-space-sm py-2 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={tourSubmitted}
                  className="w-full bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container py-space-sm rounded-xl font-label-md text-label-md font-bold transition-all shadow-md mt-space-xs cursor-pointer"
                >
                  {tourSubmitted ? 'Reserving appointment...' : 'Confirm Viewing Appointment'}
                </button>
              </form>

              {/* DYD Trust Guarantee */}
              <div className="bg-surface-container-low p-space-sm rounded-xl flex items-start gap-space-xs border border-surface-container">
                <span className="material-symbols-outlined text-[20px] text-on-tertiary-container mt-0.5">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">
                    DYD SafeBuy™ Protection
                  </span>
                  <p className="font-caption text-caption text-on-surface-variant leading-relaxed">
                    Zero fee for property viewings. Direct developer and title-checked owner representation with guaranteed clear strata deed.
                  </p>
                </div>
              </div>
            </div>

            {/* Pre-Approved Financing Banner */}
            <div className="bg-gradient-to-br from-primary-container to-secondary p-space-md rounded-2xl text-on-primary shadow-sm flex items-center justify-between gap-space-sm">
              <div className="flex flex-col">
                <span className="font-caption text-caption text-primary-fixed uppercase tracking-wider font-semibold">
                  Bank Advisory
                </span>
                <span className="font-headline-sm text-headline-sm text-on-primary">
                  Need ABA Bank Mortgage?
                </span>
                <p className="font-caption text-caption text-primary-fixed-dim">
                  Instant valuation letter issued within 48h for this unit.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert('ABA Bank pre-approval form initialized. An advisor will contact you within 24 hours.')}
                className="bg-surface-container-lowest text-primary hover:bg-surface px-space-sm py-space-xs rounded-xl font-label-sm text-label-sm font-bold shadow-md shrink-0 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Nearby Penthouse Opportunities */}
      <section className="w-full px-space-md lg:px-margin py-space-xl bg-surface-container-low border-t border-surface-container">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-caption text-caption text-secondary uppercase font-bold tracking-widest">
                Recommended Portfolio
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Similar Luxury Properties in Tonle Bassac
              </h2>
            </div>
            <button
              onClick={() => onNavigateExplore({ location: 'tonle-bassac' })}
              className="flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:underline cursor-pointer font-semibold"
            >
              <span>Explore All Chamkarmon Condos</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Card 1 */}
            <div
              onClick={() => onSelectProperty(properties[7])}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer border border-surface-container"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVaGxSKz4A_LIeMWmym19ThNFSfHkqZY48IIVchjZ0NRtTPb7uoynKoztMMYYLziXOEo6WX2tFHXwtu-u4YLdSWhXMnG_h85Ur8cUfJMA1JPfUuhw76lS5My-_cxMS4PcxTdNg4ANhRvHerdw3OYEMEOM09pEJGSpQO97cpxoT5XmJvk5vmHvSwPI-u8v4EP4bp-R2qzdeYlqsPoFNLtYKF0wXTEI13_mVdvjs0BvItMOnxjwauqHFiw"
                  alt="The Peak Tower 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-space-xs left-space-xs bg-tertiary-fixed/90 text-on-tertiary-container font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold">
                  Hard Title
                </span>
                <span className="absolute bottom-space-xs right-space-xs bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm px-space-sm py-0.5 rounded">
                  The Peak Tower 1
                </span>
              </div>
              <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-title-price-md text-title-price-md text-primary font-black">
                      $315,000 USD
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      $2,100 / m²
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 line-clamp-1 font-bold">
                    Executive 3-Bed Sky Villa
                  </h3>
                  <p className="font-caption text-caption text-on-surface-variant">Tonle Bassac, Chamkarmon</p>
                </div>
                <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low p-space-xs rounded-lg mt-space-xs">
                  <span>3 Beds</span>
                  <span>•</span>
                  <span>2 Baths</span>
                  <span>•</span>
                  <span>150 m²</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onSelectProperty(properties[3])}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer border border-surface-container"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlIAgdFnOd1ni0akazhWJeg3npLsdV5dpmBjkEZWDGcKSVzjFOKrioOMdWo6Xo38flPucMNax4sMlU0GrekMwJR5-5fPvGQSNJogaV15253i-LAYnifB_CDcxG-PNwr1Wa2CUN1C0nvWZYHYgREQ0bz0Z9mkYM36HguVFZJ6QyeW6HnJrdPew92mqwQDusB2Q36SJE8G_alClXBtQX9A2BIhl5SZdmZj7fYh47e7nuuq78_gIRQ2A1hg"
                  alt="Morgan EnMaison"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-space-xs left-space-xs bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold">
                  Strata Title
                </span>
                <span className="absolute bottom-space-xs right-space-xs bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm px-space-sm py-0.5 rounded">
                  Morgan EnMaison
                </span>
              </div>
              <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-title-price-md text-title-price-md text-primary font-black">
                      $349,000 USD
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      $2,052 / m²
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 line-clamp-1 font-bold">
                    Duplex Sky Penthouse with Pool
                  </h3>
                  <p className="font-caption text-caption text-on-surface-variant">Koh Pich / Diamond Island</p>
                </div>
                <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low p-space-xs rounded-lg mt-space-xs">
                  <span>3 Beds</span>
                  <span>•</span>
                  <span>3 Baths</span>
                  <span>•</span>
                  <span>170 m²</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onSelectProperty(properties[4])}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer border border-surface-container"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAYaDLkH-0h5K9J5bE8Vp6cR0q-ZxTeZKnSgZ5fQNJVLVc8FSdrQdGmJDTFy98yJ8bVhSetEUeGKrXgjR0G6uouI4CMdUznf8JbItoU0yqhZHjCleZdEB0Uw6lhkNT8Pn93fRc2NTXJ671zG9krLGSkYbgOBYNcW_4jEHDjKVp0J1FmQsjDDDu-olKhBoQUCaNNZ57cg5D91cstijaKAxafE97fSC07XyJV9h8wH1FweRRRVvcc9X5Rw"
                  alt="Silvertown BKK1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-space-xs left-space-xs bg-tertiary-fixed/90 text-on-tertiary-container font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-bold">
                  Hard Title
                </span>
                <span className="absolute bottom-space-xs right-space-xs bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm px-space-sm py-0.5 rounded">
                  Silvertown BKK1
                </span>
              </div>
              <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-title-price-md text-title-price-md text-primary font-black">
                      $265,000 USD
                    </span>
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      $1,890 / m²
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 line-clamp-1 font-bold">
                    Corner Garden Suite in BKK1
                  </h3>
                  <p className="font-caption text-caption text-on-surface-variant">Boeung Keng Kang 1, Phnom Penh</p>
                </div>
                <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low p-space-xs rounded-lg mt-space-xs">
                  <span>2 Beds</span>
                  <span>•</span>
                  <span>2 Baths</span>
                  <span>•</span>
                  <span>140 m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
          <img
            src={gallery[activePhotoIndex]}
            alt="Expanded view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
          />
          <div className="absolute bottom-6 flex items-center gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActivePhotoIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                  activePhotoIndex === i ? 'bg-secondary' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
