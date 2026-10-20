import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Anchor, Compass, HeartHandshake, ShieldCheck, Waves, Fish, MapPin } from 'lucide-react';

export const TraditionSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="tradition" className="w-full py-16 sm:py-24 bg-ocean-surface border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 font-mono">
            <Anchor className="w-4 h-4 text-amber-500" />
            <span>{t.traditionSection.badge}</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span>Au Carrefour de Deux Mers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight [text-wrap:balance]">
            {t.traditionSection.title}
          </h2>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            Entre l'Atlantique tumultueux et la Méditerranée lumineuse, le Détroit de Gibraltar abrite l'une des biodiversités marines les plus riches au monde. Pesca Del Dia 2 en est le prolongement direct au cœur de Tanger.
          </p>
        </div>

        {/* 2-Column Editorial Grid: Image on Left (5 cols) / Story Pillars on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Authentic Dining Room Atmosphere Frame */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[420px] shadow-2xl group">
            <img
              src="/src/assets/images/restaurant_ambiance_1792489931084.jpg"
              alt="Salle conviviale et familiale du restaurant Pesca Del Dia 2 sur l'Avenue Oujda à Tanger"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-stone-100 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Avenue Oujda · Tanger</span>
              </div>
              <p className="text-lg font-serif font-bold">
                L'Authentique Esprit Tangérois
              </p>
              <p className="text-xs text-stone-300 font-light">
                Une salle vivante, accueillante pour les familles et les amoureux de la mer.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Anchors of Craftsmanship & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Pillar 1 */}
              <div className="p-6 rounded-2xl bg-ocean-card border border-stone-800/80 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                    <Waves className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                    {t.traditionSection.story1Title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light pl-0 sm:pl-11 pt-1 sm:pt-0">
                  {t.traditionSection.story1Body}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-ocean-card border border-stone-800/80 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                    {t.traditionSection.story2Title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light pl-0 sm:pl-11 pt-1 sm:pt-0">
                  {t.traditionSection.story2Body}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-ocean-card border border-stone-800/80 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                    {t.traditionSection.story3Title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light pl-0 sm:pl-11 pt-1 sm:pt-0">
                  {t.traditionSection.story3Body}
                </p>
              </div>
            </div>

            {/* Bottom Proof Metrics Strip (Tabular numbers, strict spatial balance) */}
            <div className="p-4 sm:p-6 rounded-2xl bg-ocean-card border border-stone-800 grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <p className="text-2xl sm:text-4xl font-bold font-mono text-amber-400 tabular-nums">
                  {RESTAURANT_INFO.googleRating}
                </p>
                <p className="text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider mt-1 font-mono">
                  Étoiles Google
                </p>
              </div>

              <div className="border-x border-stone-800">
                <p className="text-2xl sm:text-4xl font-bold font-mono text-stone-100 tabular-nums">
                  676+
                </p>
                <p className="text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider mt-1 font-mono">
                  Avis Vérifiés
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-4xl font-bold font-mono text-amber-400 tabular-nums">
                  100%
                </p>
                <p className="text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider mt-1 font-mono">
                  Pêche Locale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
