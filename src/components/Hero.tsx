import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO, CATCH_OF_THE_DAY } from '../data/restaurantData';
import { ArrowDown, Star, MapPin, Clock, Compass, Phone, Calendar, Waves, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t, language } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-ocean-deep border-b border-stone-800/90 text-stone-100">
      {/* Subtle maritime ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(217,119,6,0.12),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-16 lg:pb-24">
        {/* Editorial Top Kicker & Trust Marker */}
        <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-2.5 pb-6 sm:pb-8 border-b border-stone-800/60 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-2 font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
            <span className="text-amber-400 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              {language === 'ar' ? 'صيد اليوم المباشر' : 'Arrivage du matin'}
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-[11px] sm:text-xs">{CATCH_OF_THE_DAY.length} espèces nobles</span>
            <span aria-hidden="true" className="text-stone-700 hidden min-[400px]:inline">·</span>
            <span className="hidden min-[400px]:inline text-[11px] sm:text-xs">Port de Tanger & Détroit</span>
          </div>

          <div className="flex items-center gap-2 text-stone-400 font-mono text-[10px] sm:text-[11px]">
            <span>35°46'N</span>
            <span className="text-stone-700">/</span>
            <span>5°47'W</span>
            <span className="text-stone-700">/</span>
            <span className="text-amber-400 font-sans font-bold">TANGER</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Typographic & Editorial Statement (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-7">
            {/* Bilingual Title Lockup */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-500 font-mono">
                  ÉTABLISSEMENT MARITIME DE TANGER
                </span>
                <span className="hidden min-[420px]:inline h-px flex-1 bg-stone-800 max-w-[60px]" />
                <span className="font-arabic text-amber-400/90 text-xs sm:text-sm font-bold">
                  صيد اليوم · شارع وجدة
                </span>
              </div>

              <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-serif font-bold text-stone-100 tracking-tight leading-[1.12] sm:leading-[1.08] [text-wrap:balance]">
                {t.hero.titleLine1}{' '}
                <span className="text-amber-400 font-normal italic font-serif inline-block">
                  {t.hero.titleLine2}
                </span>
              </h1>
            </div>

            {/* Subtitle with measure limits */}
            <p className="text-xs sm:text-base lg:text-lg text-stone-300 leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* Social Proof & Verified Trust Row (Anti-Slop: clean unboxed typographic row) */}
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-stone-400 pt-0.5">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 text-stone-200 hover:text-amber-400 transition-colors group"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-mono font-bold text-stone-100 text-xs sm:text-sm tabular-nums">4.1</span>
                <span className="text-stone-500">/ 5</span>
                <span className="underline underline-offset-4 decoration-stone-700 group-hover:decoration-amber-400 transition-colors">
                  (676 avis Google)
                </span>
              </a>

              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="text-stone-300 text-[11px] sm:text-xs">Banc de glace</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="text-amber-400/90 font-medium text-[11px] sm:text-xs">Chermoula & pain offerts</span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col min-[440px]:flex-row items-stretch min-[440px]:items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="#banc-de-poissons"
                className="px-5 sm:px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg shadow-lg hover:shadow-amber-500/10 active:scale-98 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.exploreCatch}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-5 sm:px-6 py-3.5 bg-ocean-surface hover:bg-ocean-card text-stone-200 hover:text-white border border-stone-700/80 font-medium rounded-lg active:scale-98 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{t.nav.bookTable}</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="hidden min-[540px]:flex p-3.5 text-stone-300 hover:text-amber-400 bg-ocean-surface hover:bg-ocean-card border border-stone-800 rounded-lg transition-colors items-center justify-center"
                title="Appel direct au restaurant"
                aria-label="Téléphone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Practical information strip (Quiet typographic metadata) */}
            <div className="pt-4 sm:pt-6 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.hero.openDaily}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Avenue Oujda, 90060 Tanger (Près de la corniche)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800/90 bg-ocean-card shadow-2xl group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]">
              {/* Fallback container with domain graphic if image fails */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 flex items-center justify-center -z-10">
                <div className="text-center p-6 text-stone-500">
                  <Compass className="w-12 h-12 mx-auto mb-2 opacity-30 text-amber-500" />
                  <p className="font-serif text-sm">Pesca Del Dia 2 · صيد اليوم</p>
                </div>
              </div>

              <img
                src="/src/assets/images/hero_tangier_seafood_1792489877320.jpg"
                alt="Grand festin de poissons et fruits de mer frais à Pesca Del Dia 2 Tanger"
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-90'
                }`}
                loading="eager"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
              />

              {/* Measured contrast scrim as required by WCAG AA guidelines */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent pointer-events-none" />

              {/* Atmospheric overlay caption with nautical touch */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-stone-100 flex items-end justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>L'Hospitalité Tangéroise</span>
                  </div>
                  <p className="text-xs sm:text-base font-serif font-medium text-stone-200 mt-0.5 sm:mt-1 line-clamp-2">
                    Pain chaud marocain, chermoula maison & pêche du jour
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] sm:text-[11px] text-stone-400 font-mono tabular-nums block">
                    Banc de Glace
                  </span>
                  <span className="text-[11px] sm:text-xs text-amber-400 font-mono font-semibold tabular-nums">
                    0°C - 2°C
                  </span>
                </div>
              </div>
            </div>

            {/* Trust banner: shown inline on mobile/tablet, floating on desktop */}
            <div className="mt-3 sm:mt-4 lg:mt-0 lg:absolute lg:-bottom-3 lg:left-4 bg-ocean-surface/95 backdrop-blur-md border border-stone-700/80 p-3 sm:p-3.5 rounded-xl shadow-xl text-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-stone-200 text-xs sm:text-sm">Arrivage Direct des Barques</p>
                <p className="text-[11px] text-stone-400">Pêche locale · Aucun surgelé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
