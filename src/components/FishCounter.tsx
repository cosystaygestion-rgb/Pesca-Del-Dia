import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CATCH_OF_THE_DAY, FishCatchItem, RESTAURANT_INFO } from '../data/restaurantData';
import {
  Sparkles,
  Utensils,
  Check,
  Plus,
  Minus,
  Flame,
  Waves,
  Scale,
  Calendar,
  MessageCircle,
  Clock,
  Trash2,
  HelpCircle,
  FileText
} from 'lucide-react';

interface SelectedCatchItem {
  item: FishCatchItem;
  cookingMethod: 'plancha' | 'friture' | 'mqila' | 'paella';
  quantity: number;
  size: 'portion' | 'whole';
}

interface FishCounterProps {
  selectedCatches: { item: FishCatchItem; cookingMethod: 'plancha' | 'friture' | 'mqila' | 'paella'; quantity: number }[];
  onToggleCatch: (item: FishCatchItem, method: 'plancha' | 'friture' | 'mqila' | 'paella') => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onOpenBooking: () => void;
}

export const FishCounter: React.FC<FishCounterProps> = ({
  selectedCatches,
  onToggleCatch,
  onUpdateQuantity,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();
  const [activeCatchId, setActiveCatchId] = useState<string>(CATCH_OF_THE_DAY[0].id);
  const [activeCookFilter, setActiveCookFilter] = useState<'all' | 'plancha' | 'friture' | 'mqila' | 'paella'>('all');
  const [selectedCookMethod, setSelectedCookMethod] = useState<'plancha' | 'friture' | 'mqila' | 'paella'>('plancha');
  const [selectedSize, setSelectedSize] = useState<'portion' | 'whole'>('portion');

  const activeCatch = CATCH_OF_THE_DAY.find((c) => c.id === activeCatchId) || CATCH_OF_THE_DAY[0];

  // Catches filtered according to tab
  const filteredCatches = activeCookFilter === 'all'
    ? CATCH_OF_THE_DAY
    : CATCH_OF_THE_DAY.filter((c) => c.recommendedCook.includes(activeCookFilter));

  const isSelected = (itemId: string) => selectedCatches.some((sc) => sc.item.id === itemId);
  const currentSelection = selectedCatches.find((sc) => sc.item.id === activeCatch.id);

  // Price calculation based on size
  const calculatedPrice = selectedSize === 'whole'
    ? (activeCatch.pricePerKg ? Math.round(activeCatch.pricePerKg * 0.75) : (activeCatch.portionPrice || 100) * 1.8)
    : (activeCatch.portionPrice || 100);

  // Total estimate calculation
  const totalEstimate = selectedCatches.reduce((acc, curr) => {
    const price = curr.item.portionPrice || 100;
    return acc + price * curr.quantity;
  }, 0);

  // Dispatch directly to WhatsApp with pre-formatted message
  const handleDirectWhatsApp = () => {
    let msg = `Bonjour Pesca Del Dia 2, je prépare ma commande de poissons frais :\n`;
    selectedCatches.forEach((sc) => {
      msg += `🐟 ${sc.item.nameFr} (${sc.cookingMethod}) x${sc.quantity}\n`;
    });
    msg += `\n💰 Total estimé : ~${totalEstimate} MAD\nMerci de me confirmer la disponibilité pour aujourd'hui !`;
    const url = `https://wa.me/212539325212?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="banc-de-poissons" className="w-full py-16 sm:py-24 bg-ocean-surface border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with quiet unboxed metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500">
              <Waves className="w-4 h-4 text-amber-500" />
              <span>{t.fishCounterSection.badge}</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span>صيد اليوم</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span>Banc de Glace Pilée</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight [text-wrap:balance]">
              {t.fishCounterSection.title}
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              {t.fishCounterSection.subtitle}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-stone-400 bg-ocean-card px-4 py-2.5 rounded-xl border border-stone-800 shrink-0">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Pesée au banc · Préparation minute</span>
          </div>
        </div>

        {/* Atmosphere Banner & Ice Counter Visual */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 aspect-[16/9] sm:aspect-[21/9] max-h-56 sm:max-h-80 shadow-2xl">
          <img
            src="/src/assets/images/fish_counter_ice_1792489895478.jpg"
            alt="Banc de poissons frais sur glace pilée à Pesca Del Dia 2"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

          {/* Ice Counter Metadata Strip */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2 bg-stone-950/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-stone-800 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-medium text-stone-100">Banc de Glace Rafraîchi</span>
              <span className="text-stone-500">·</span>
              <span className="text-amber-400 font-mono">0°C à +2°C</span>
            </div>
            <span className="hidden min-[480px]:inline text-stone-400 font-mono text-[11px] sm:text-xs bg-stone-950/90 px-3 py-1.5 rounded-lg border border-stone-800">
              Arrivage direct du port de Tanger
            </span>
          </div>
        </div>

        {/* Cooking Method Filter Bar (Interactive Segmented Control Buttons with smooth horizontal touch scroll) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <p className="text-xs sm:text-sm text-stone-300 font-medium flex items-center gap-2">
            <span>{t.fishCounterSection.instruction}</span>
          </p>

          <div className="flex items-center gap-1.5 p-1 bg-ocean-card border border-stone-800 rounded-xl overflow-x-auto max-w-full no-scrollbar">
            <button
              onClick={() => setActiveCookFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCookFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {t.menuSection.categories.all}
            </button>
            <button
              onClick={() => setActiveCookFilter('plancha')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCookFilter === 'plancha'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {t.fishCounterSection.methods.plancha.label}
            </button>
            <button
              onClick={() => setActiveCookFilter('friture')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCookFilter === 'friture'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {t.fishCounterSection.methods.friture.label}
            </button>
            <button
              onClick={() => setActiveCookFilter('mqila')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCookFilter === 'mqila'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {t.fishCounterSection.methods.mqila.label}
            </button>
          </div>
        </div>

        {/* 2-Column Core Architecture: Left Fish Selection Tiles (7 cols) / Right Interactive Studio & Live Ticket (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Fresh Catch Selection Tiles (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredCatches.map((item) => {
              const active = item.id === activeCatchId;
              const inTable = isSelected(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveCatchId(item.id);
                    if (item.recommendedCook.length > 0) {
                      setSelectedCookMethod(item.recommendedCook[0]);
                    }
                  }}
                  className={`relative p-4 sm:p-5 rounded-2xl border transition-all text-left cursor-pointer group flex flex-col justify-between ${
                    active
                      ? 'bg-ocean-card border-amber-500 shadow-xl ring-1 ring-amber-500/80'
                      : 'bg-ocean-card/60 border-stone-800/80 hover:border-stone-700 hover:bg-ocean-card'
                  }`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5 min-w-0">
                        <h3 className="text-base font-serif font-bold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
                          {language === 'ar' ? item.nameAr : language === 'en' ? item.nameEn : item.nameFr}
                        </h3>
                        <p className="text-xs text-amber-500/90 font-arabic font-medium truncate">
                          {language === 'ar' ? item.nameFr : item.nameAr}
                        </p>
                      </div>

                      {inTable && (
                        <span className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-400 mt-2.5 line-clamp-2 leading-relaxed font-light">
                      {language === 'ar' ? item.descriptionAr : language === 'en' ? item.descriptionEn : item.descriptionFr}
                    </p>

                    {active && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById('studio-cuisson');
                          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="lg:hidden mt-3 py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 border border-amber-500/40 w-full"
                      >
                        <span>Personnaliser cuisson & format ↓</span>
                      </button>
                    )}
                  </div>

                  {/* Foot metadata */}
                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-200 font-bold tabular-nums">
                      ~{item.portionPrice} <span className="text-stone-400 font-normal">MAD</span>
                    </span>

                    <span className="text-stone-400 text-[11px] font-mono truncate max-w-[140px] text-right">
                      {item.recommendedCook.slice(0, 2).map((m) => t.fishCounterSection.methods[m].label).join(' · ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Inspection Stage & Live Customizer (5 cols) */}
          <div id="studio-cuisson" className="lg:col-span-5 sticky top-24 sm:top-28 space-y-6 scroll-mt-20 sm:scroll-mt-24">
            <div className="bg-ocean-card rounded-2xl border border-stone-800 p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-xl">
              {/* Active Catch Header */}
              <div className="border-b border-stone-800 pb-3 sm:pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.fishCounterSection.originBadge}</span>
                  <span aria-hidden="true" className="text-stone-700">·</span>
                  <span className="truncate">{activeCatch.origin}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-1.5 sm:mt-2">
                  {language === 'ar' ? activeCatch.nameAr : language === 'en' ? activeCatch.nameEn : activeCatch.nameFr}
                </h3>
                <p className="text-xs text-amber-400/90 font-arabic mt-0.5">
                  {language === 'ar' ? activeCatch.nameFr : activeCatch.nameAr}
                </p>
              </div>

              {/* Flavor & Texture Palette */}
              <div className="space-y-2.5 sm:space-y-3 text-xs">
                <div className="bg-ocean-surface p-3 sm:p-3.5 rounded-xl border border-stone-800 space-y-1">
                  <span className="font-semibold text-stone-300">{t.fishCounterSection.textureLabel} :</span>
                  <p className="text-stone-400 leading-relaxed font-light">{activeCatch.texture}</p>
                </div>

                <div className="bg-ocean-surface p-3 sm:p-3.5 rounded-xl border border-stone-800 space-y-1">
                  <span className="font-semibold text-stone-300">{t.fishCounterSection.flavorLabel} :</span>
                  <p className="text-stone-400 leading-relaxed font-light">{activeCatch.flavor}</p>
                </div>

                {/* Chef's Traditional Tangier Pairing */}
                <div className="bg-amber-950/20 p-3 sm:p-3.5 rounded-xl border border-amber-600/30 space-y-1">
                  <span className="font-semibold text-amber-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Accord & Dégustation Conseillés :</span>
                  </span>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                    {activeCatch.recommendedCook.includes('plancha')
                      ? 'Parfait avec notre salade marocaine fraîche, citron doux de terroir et un thé à la menthe vert moussé versé bien chaud.'
                      : activeCatch.recommendedCook.includes('mqila')
                      ? 'Idéal dégusté à même le plat de terre cuite en trempant le pain croustillant tout chaud dans la réduction de chermoula.'
                      : 'Accompagné d\'une touche de harissa douce maison et des olives marinées du Rif pour sublimer le croustillant doré.'}
                  </p>
                </div>
              </div>

              {/* Weight & Format Selector: 3 options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-300 uppercase tracking-wider text-[11px] sm:text-xs">Format au Banc</span>
                  <span className="text-[10px] sm:text-[11px] text-amber-400 font-mono font-semibold">
                    {selectedSize === 'portion' ? '~350g · 1 pers.' : selectedSize === 'whole' ? '~750g · 2 pers.' : '~1.2kg · 3-4 pers.'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('portion')}
                    className={`py-2 px-1.5 sm:px-2 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === 'portion'
                        ? 'bg-amber-500/25 border-amber-500 text-amber-200 ring-1 ring-amber-500/40'
                        : 'bg-ocean-surface border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="block text-[11px] sm:text-xs">Portion</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-normal block">~350g</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSize('whole')}
                    className={`py-2 px-1.5 sm:px-2 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === 'whole'
                        ? 'bg-amber-500/25 border-amber-500 text-amber-200 ring-1 ring-amber-500/40'
                        : 'bg-ocean-surface border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="block text-[11px] sm:text-xs">Entier</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-normal block">~750g</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSize('feast' as any)}
                    className={`py-2 px-1.5 sm:px-2 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      (selectedSize as any) === 'feast'
                        ? 'bg-amber-500/25 border-amber-500 text-amber-200 ring-1 ring-amber-500/40'
                        : 'bg-ocean-surface border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="block text-[11px] sm:text-xs">Grand Plat</span>
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-normal block">~1.2kg</span>
                  </button>
                </div>
              </div>

              {/* Cooking Method Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-stone-300 uppercase tracking-wider text-[11px] sm:text-xs">
                    {t.fishCounterSection.cookMethodTitle}
                  </label>
                  <span className="text-[10px] sm:text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {selectedCookMethod === 'friture' ? '~10 min' : selectedCookMethod === 'plancha' ? '~12-14 min' : selectedCookMethod === 'mqila' ? '~18 min' : '~22 min'}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(['plancha', 'friture', 'mqila', 'paella'] as const).map((method) => {
                    const isAvailable = activeCatch.recommendedCook.includes(method);
                    const isChosen = selectedCookMethod === method;

                    return (
                      <button
                        key={method}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedCookMethod(method)}
                        className={`p-2 sm:p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                          !isAvailable
                            ? 'opacity-35 border-stone-800/40 bg-ocean-surface text-stone-600 cursor-not-allowed'
                            : isChosen
                            ? 'bg-amber-600/25 border-amber-500 text-amber-200 ring-1 ring-amber-500/50'
                            : 'bg-ocean-surface border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-[11px] sm:text-xs">{t.fishCounterSection.methods[method].label}</span>
                          {isChosen && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-stone-400 mt-0.5 sm:mt-1 line-clamp-1">
                          {t.fishCounterSection.methods[method].desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Chef's Signature Seasoning Callout */}
                <div className="p-3 rounded-xl bg-ocean-surface border border-stone-800 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    <span>
                      {selectedCookMethod === 'plancha'
                        ? 'Assaisonnement Plancha du Chef'
                        : selectedCookMethod === 'friture'
                        ? 'Secret du Friturier Tangérois'
                        : selectedCookMethod === 'mqila'
                        ? 'La Chermoula Authentique de la Mqila'
                        : 'Infusion de Safran & Bouillon'}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-300 font-light leading-relaxed">
                    {selectedCookMethod === 'plancha'
                      ? 'Huile d\'olive vierge du Nord, fleur de sel marin du détroit, persil plat émincé & citron pressé minute sur la plaque chauffée à vif.'
                      : selectedCookMethod === 'friture'
                      ? 'Léger voile de semoule de blé dur et farine fine, friture flash à 180°C dans une huile propre, égouttage soigné : un croustillant aérien sans huile superflue.'
                      : selectedCookMethod === 'mqila'
                      ? 'Mijoté en plat de terre cuite avec réduction de tomates mûres, ail pilé, coriandre fraîche, cumin de l\'Atlas et lamelles de poivrons doux rôtis.'
                      : 'Riz rond infusé au bouillon de poissons de roche, pistils de safran pur de Taliouine, moules charnues et gambas flambées.'}
                  </p>
                </div>
              </div>

              {/* Price & Add Action */}
              <div className="pt-4 border-t border-stone-800 flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-baseline justify-between min-[380px]:block">
                  <p className="text-xs text-stone-500 font-medium">Prix estimé :</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-stone-100 tabular-nums">
                    {(selectedSize as any) === 'feast'
                      ? Math.round(calculatedPrice * 1.6)
                      : calculatedPrice}{' '}
                    <span className="text-xs sm:text-sm font-sans text-stone-400">MAD</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleCatch(activeCatch, selectedCookMethod)}
                  className={`px-4 sm:px-5 py-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow ${
                    currentSelection
                      ? 'bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  {currentSelection ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{t.fishCounterSection.selectedNotice}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>{t.fishCounterSection.orderThisCatch}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Artisanal Paper Ticket of the Catch (When catches are selected) */}
            {selectedCatches.length > 0 && (
              <div className="bg-ocean-card border border-amber-600/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom-2 duration-200">
                {/* Ticket Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-dashed border-stone-700 text-xs text-stone-400">
                  <div className="flex items-center gap-2 font-mono min-w-0">
                    <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-bold text-stone-200 text-[11px] sm:text-xs truncate">TICKET DE TABLE · TANGER</span>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold text-[11px] sm:text-xs shrink-0">PESCA DEL DIA 2</span>
                </div>

                {/* Items in ticket */}
                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                  {selectedCatches.map((sc) => (
                    <div
                      key={sc.item.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-ocean-surface border border-stone-800 text-xs gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-stone-200 font-serif truncate">
                          {language === 'ar' ? sc.item.nameAr : sc.item.nameFr}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-amber-400 font-mono truncate">
                          {t.fishCounterSection.methods[sc.cookingMethod].label}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="font-mono text-stone-300 tabular-nums text-xs">
                          ~{(sc.item.portionPrice || 100) * sc.quantity} MAD
                        </span>

                        <div className="flex items-center bg-stone-950 rounded border border-stone-800">
                          <button
                            onClick={() => onUpdateQuantity(sc.item.id, -1)}
                            className="p-1 hover:text-amber-400 text-stone-400 cursor-pointer"
                            title="Diminuer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1.5 sm:px-2 font-mono tabular-nums font-semibold text-stone-100 text-xs">
                            {sc.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(sc.item.id, 1)}
                            className="p-1 hover:text-amber-400 text-stone-400 cursor-pointer"
                            title="Augmenter"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Complimentary items reminder */}
                <div className="pt-2 text-[11px] text-stone-400 border-t border-dashed border-stone-700 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">Inclus :</span>
                  <span>Pain chaud marocain, olives marinées, chermoula maison et harissa offerts d'office.</span>
                </div>

                {/* Total Line */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-400 font-medium">Total estimé pour la table :</span>
                  <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                    ~{totalEstimate} <span className="text-xs font-sans text-stone-400">MAD</span>
                  </span>
                </div>

                {/* Dispatch actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="py-3 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Réserver avec cette sélection</span>
                  </button>

                  <button
                    onClick={handleDirectWhatsApp}
                    className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Commander sur WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
