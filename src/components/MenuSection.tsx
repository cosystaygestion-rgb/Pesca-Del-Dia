import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FULL_MENU, MenuItem } from '../data/restaurantData';
import { Utensils, Star, Gift, Flame, Plus, Check, Sparkles, ChefHat } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem?: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'starters' | 'friture' | 'grilled' | 'casseroles' | 'desserts_drinks'
  >('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredItems = activeCategory === 'all'
    ? FULL_MENU
    : FULL_MENU.filter((item) => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    if (onSelectItem) {
      onSelectItem(item);
    }
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section id="carte" className="w-full py-16 sm:py-24 bg-ocean-deep border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/70">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 font-mono">
              <ChefHat className="w-4 h-4 text-amber-500" />
              <span>{t.menuSection.badge}</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span>Cuisine Traditionnelle de la Baie</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight [text-wrap:balance]">
              {t.menuSection.title}
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              {t.menuSection.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
            <span className="text-amber-400 font-bold">100% Frais</span>
            <span className="text-stone-700">/</span>
            <span>Prix nets en Dirhams Marocains (MAD)</span>
          </div>
        </div>

        {/* Editorial Feature Spotlight: Two Signature Tangier Cornerstones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Spotlight 1: The Grand Paella of the Bay (7 cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-stone-800 bg-ocean-card p-6 sm:p-8 flex flex-col justify-between group shadow-xl">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden shrink-0 border border-stone-700 relative">
                <img
                  src="/src/assets/images/seafood_paella_pan_1792489915159.jpg"
                  alt="Grande Paëlla aux fruits de mer Pesca Del Dia 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-mono text-amber-400 font-semibold">
                  Spécialité
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Le Joyau Hispano-Marocain</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-stone-100">
                  Grande Paëlla aux Fruits de Mer de la Baie
                </h3>
                <p className="text-xs text-amber-400 font-arabic">
                  بايلا فواكه البحر الكبيرة بالزعفران الحر
                </p>

                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  Riz mijoté au safran pur, garni de gambas royales, moules fraîches, anneaux de calamars tendres, poivrons rouges rôtis et citron de terroir.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">
                    120 <span className="text-xs font-sans text-stone-400">MAD / pers.</span>
                  </span>

                  <button
                    onClick={() => handleAdd(FULL_MENU.find(m => m.id === 'paella-pesca-del-dia') || FULL_MENU[0])}
                    className="text-xs font-semibold px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Ajouter à la table
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Spotlight 2: The Complimentary Tangier Welcome Ritual (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-amber-600/30 bg-ocean-surface p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Rituel d'Accueil Offert à Chaque Table</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-100">
                L'Hospitalité Tangéroise Inconditionnelle
              </h3>
              <p className="text-xs text-stone-400 font-arabic">
                ضيافة طنجة المجانية · خبز سخون وزيتون وشرمولة
              </p>

              <ul className="space-y-2 text-xs text-stone-300 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Pain marocain croustillant tout chaud, sorti du four</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Olives locales marinées aux épices du Nord</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Chermoula fraîche pilée minute (ail, coriandre, cumin)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Harissa douce maison</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-850 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Tarif pour nos convives :</span>
              <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider">
                0 MAD · Offert avec le sourire
              </span>
            </div>
          </div>
        </div>

        {/* The 3-Step Tangier Feasting Ritual Guide */}
        <div className="p-6 sm:p-8 rounded-2xl bg-ocean-surface border border-stone-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                TRADITION DE LA TABLE TANGÉROISE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-1">
                Comment déguster le festin marin à Tanger en 3 Temps
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-arabic font-medium">
              طقوس المائدة الطنجاوية الأصيلة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">01. L'ACCUEIL & MEZZES</span>
              <h4 className="text-base font-serif font-bold text-stone-200">Pain chaud, Olives & Chermoula</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Tremper le pain croustillant tout chaud dans la chermoula parfumée et la harissa douce avec quelques olives violettes marinées.
              </p>
            </div>

            <div className="space-y-2 md:border-x md:border-stone-800 md:px-6">
              <span className="text-xs font-mono font-bold text-amber-400">02. LE PLAT NOBLE</span>
              <h4 className="text-base font-serif font-bold text-stone-200">Plancha Saisie ou Friture Royale</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Déguster le loup de mer ou la dorade grillée au sel marin, ou partager le plateau de friture croustillante sans la moindre trace d'huile.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">03. LA CLÔTURE</span>
              <h4 className="text-base font-serif font-bold text-stone-200">Thé Moussao & Flan Tangérois</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Conclure avec un thé vert infusé à la menthe fraîche du Nord versé de haut avec sa mousse onctueuse, accompagné du traditionnel flan au caramel.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Clean Segmented Buttons with smooth horizontal touch scroll) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-ocean-card border border-stone-800 rounded-xl overflow-x-auto max-w-full no-scrollbar">
          {(
            [
              'all',
              'starters',
              'friture',
              'grilled',
              'casseroles',
              'desserts_drinks',
            ] as const
          ).map((catKey) => {
            const isActive = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-ocean-surface'
                }`}
              >
                {t.menuSection.categories[catKey]}
              </button>
            );
          })}
        </div>

        {/* Menu Items: Brasserie-Style High-Legibility Two-Column Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const isAdded = addedItems[item.id];

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-ocean-card/70 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Line: Title & Price */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-serif font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                          {language === 'ar' ? item.nameAr : language === 'en' ? item.nameEn : item.nameFr}
                        </h4>
                        {item.signature && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 font-mono">
                            · Spécialité
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-500/80 font-arabic font-medium">
                        {language === 'ar' ? item.nameFr : item.nameAr}
                      </p>
                    </div>

                    {item.complimentary ? (
                      <span className="text-xs font-bold text-emerald-400 shrink-0 uppercase tracking-wider font-mono">
                        {t.menuSection.offeredTag}
                      </span>
                    ) : (
                      <span className="font-mono text-base font-bold text-stone-100 shrink-0 tabular-nums">
                        {item.priceMad}{' '}
                        <span className="text-xs font-sans text-stone-400 font-normal">
                          {t.menuSection.currency}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed font-light">
                    {language === 'ar' ? item.descriptionAr : language === 'en' ? item.descriptionEn : item.descriptionFr}
                  </p>
                </div>

                {/* Add button */}
                {!item.complimentary && (
                  <div className="mt-4 pt-3 border-t border-stone-800/70 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                          : 'text-stone-300 hover:text-amber-400 hover:bg-ocean-surface'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Noté pour la réservation</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Noter pour ma visite</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
