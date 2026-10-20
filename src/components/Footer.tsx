import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Compass, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-ocean-deep border-t border-stone-800 py-12 text-xs text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-850">
          {/* Brand mark */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-stone-100">
                Pesca Del Dia 2
              </span>
              <span className="text-stone-600">·</span>
              <span className="font-arabic text-amber-500 font-medium">صيد اليوم</span>
            </div>
            <p className="text-stone-400 text-xs">
              {RESTAURANT_INFO.address}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 text-stone-300 font-medium">
            <a href="#banc-de-poissons" className="hover:text-amber-400 transition-colors">
              {t.nav.fishCounter}
            </a>
            <a href="#carte" className="hover:text-amber-400 transition-colors">
              {t.nav.menu}
            </a>
            <a href="#tradition" className="hover:text-amber-400 transition-colors">
              {t.nav.tradition}
            </a>
            <a href="#avis" className="hover:text-amber-400 transition-colors">
              {t.nav.reviews}
            </a>
            <a href="#acces" className="hover:text-amber-400 transition-colors">
              {t.nav.location}
            </a>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Quiet copyright & maritime attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Pesca Del Dia 2. {t.footer.rights}</p>
          <div className="flex items-center gap-2 text-stone-400">
            <Compass className="w-3.5 h-3.5 text-amber-500/70" />
            <span>{t.footer.portNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
