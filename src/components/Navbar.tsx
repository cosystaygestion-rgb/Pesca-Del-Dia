import React, { useState } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, Calendar, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { SoundBar } from './SoundBar';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-ocean-deep/95 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark (Single text element wordmark with fluid responsive scaling) */}
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-3 min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
        >
          <div className="w-8 h-8 min-[380px]:w-9 min-[380px]:h-9 sm:w-10 sm:h-10 rounded-lg bg-stone-900 border border-amber-600/30 flex items-center justify-center text-amber-500 font-serif font-bold text-base min-[380px]:text-lg sm:text-xl group-hover:border-amber-500 transition-colors shrink-0 shadow-inner">
            P
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm min-[360px]:text-base min-[400px]:text-lg sm:text-2xl font-serif font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors truncate">
              Pesca Del Dia 2
            </span>
            <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-amber-500/80 font-medium font-arabic tracking-wider truncate">
              صيد اليوم · طنجة
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-300">
          <a
            href="#banc-de-poissons"
            className="hover:text-amber-400 transition-colors whitespace-nowrap py-1"
          >
            {t.nav.fishCounter}
          </a>
          <a
            href="#carte"
            className="hover:text-amber-400 transition-colors whitespace-nowrap py-1"
          >
            {t.nav.menu}
          </a>
          <a
            href="#tradition"
            className="hover:text-amber-400 transition-colors whitespace-nowrap py-1"
          >
            {t.nav.tradition}
          </a>
          <a
            href="#avis"
            className="hover:text-amber-400 transition-colors whitespace-nowrap py-1"
          >
            {t.nav.reviews}
          </a>
          <a
            href="#acces"
            className="hover:text-amber-400 transition-colors whitespace-nowrap py-1"
          >
            {t.nav.location}
          </a>
        </nav>

        {/* Zone 3: SoundBar + Language Selector + 1 Primary Action (Desktop / Tablet) */}
        <div className="hidden sm:flex items-center gap-2.5 md:gap-3.5 shrink-0">
          {/* Tangier Sound Engine Mini-Bar */}
          <SoundBar />

          {/* Language Switcher */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5 md:p-1 text-xs font-medium">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                language === 'fr'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 rounded transition-colors font-arabic cursor-pointer ${
                language === 'ar'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="العربية"
            >
              عربي
            </button>
          </div>

          {/* Quick Call */}
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="p-2 text-stone-300 hover:text-amber-400 hover:bg-stone-900 rounded-lg transition-colors"
            title={RESTAURANT_INFO.phoneDisplay}
            aria-label="Appeler le restaurant"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-3.5 md:px-4 py-2 text-xs md:text-sm font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>{t.nav.bookTable}</span>
          </button>
        </div>

        {/* Mobile controls: sound bar + language pill + hamburger */}
        <div className="flex items-center gap-1.5 min-[380px]:gap-2 lg:hidden shrink-0">
          {/* Mobile Sound Bar */}
          <SoundBar />

          {/* Quick mobile language switcher with 3 buttons */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5 text-[11px] font-medium">
            {(['fr', 'en', 'ar'] as const).map((langCode) => (
              <button
                key={langCode}
                onClick={() => setLanguage(langCode)}
                className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
                  language === langCode
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                } ${langCode === 'ar' ? 'font-arabic' : ''}`}
              >
                {langCode === 'ar' ? 'ع' : langCode.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger button with 44px minimum touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-stone-300 hover:text-stone-100 hover:bg-stone-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Width Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 backdrop-blur-xl border-b border-stone-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-stone-200">
            <a
              href="#banc-de-poissons"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-stone-900 active:bg-stone-850 flex items-center justify-between transition-colors"
            >
              <span>{t.nav.fishCounter}</span>
              <span className="text-[10px] text-amber-400 font-mono">Banc Frais</span>
            </a>
            <a
              href="#carte"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-stone-900 active:bg-stone-850 flex items-center justify-between transition-colors"
            >
              <span>{t.nav.menu}</span>
              <span className="text-[10px] text-stone-400 font-mono">Paëlla & Plancha</span>
            </a>
            <a
              href="#tradition"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-stone-900 active:bg-stone-850 flex items-center justify-between transition-colors"
            >
              <span>{t.nav.tradition}</span>
              <span className="text-[10px] text-stone-400 font-mono">Détroit</span>
            </a>
            <a
              href="#avis"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-stone-900 active:bg-stone-850 flex items-center justify-between transition-colors"
            >
              <span>{t.nav.reviews}</span>
              <span className="text-[10px] text-amber-400 font-mono">★ 4.1</span>
            </a>
            <a
              href="#acces"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-stone-900 active:bg-stone-850 flex items-center justify-between transition-colors"
            >
              <span>{t.nav.location}</span>
              <span className="text-[10px] text-stone-400 font-mono">Av. Oujda</span>
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-850 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full min-h-[48px] py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow cursor-pointer text-sm select-none touch-manipulation transition-all duration-150 ease-out active:scale-[0.98] active:duration-75 active:brightness-95 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookTable}</span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full min-h-[48px] py-3 bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 font-medium rounded-xl flex items-center justify-center gap-2 text-xs select-none touch-manipulation transition-all duration-150 ease-out active:scale-[0.98] active:duration-75 active:bg-stone-950 active:border-amber-500/40"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
