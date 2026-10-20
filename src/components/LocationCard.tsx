import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Clock, Phone, Navigation, Copy, Check, Car, Compass, ExternalLink, Volume2 } from 'lucide-react';

export const LocationCard: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isDriverModeOpen, setIsDriverModeOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = "شارع وجدة، مطعم صيد اليوم، بيسكا ديل ديا";
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ar-MA';
      utterance.rate = 0.9;
      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert(RESTAURANT_INFO.taxiArabic);
    }
  };

  // Determine current opening status based on 12:00 - 23:30 window
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const totalMinutes = currentHour * 60 + currentMinute;
  const isOpen = totalMinutes >= 12 * 60 && totalMinutes <= 23 * 60 + 30;

  return (
    <section id="acces" className="w-full py-16 sm:py-24 bg-ocean-surface border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 font-mono">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{t.locationSection.badge}</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span>Avenue Oujda · Tanger 90060</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight [text-wrap:balance]">
            {t.locationSection.title}
          </h2>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            {t.locationSection.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Detailed Info Cards on Left (6 cols) / Map & Taxi Phrasebook on Right (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Contacts (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Live Service Status */}
            <div className="p-4 rounded-xl bg-ocean-card border border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpen ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span className="font-semibold text-stone-200">
                  {isOpen ? 'Actuellement Ouvert au Service' : 'Service de 12h00 à 23h30'}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-stone-400">{RESTAURANT_INFO.serviceStyle}</span>
              </div>
              <span className="font-mono text-amber-400 tabular-nums font-bold">7j / 7</span>
            </div>

            {/* Address Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-ocean-card border border-stone-800 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 font-mono">
                    {t.locationSection.addressTitle}
                  </p>
                  <p className="text-lg sm:text-xl font-serif font-bold text-stone-100">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-stone-400 mt-1 font-light">
                    À proximité de la gare ferroviaire Tanger Ville et de la corniche maritime.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 sm:p-2.5 rounded-lg bg-ocean-surface border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-stone-700 transition-colors shrink-0 flex items-center gap-1.5 text-xs cursor-pointer"
                  title="Copier l'adresse"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? t.locationSection.addressCopied : t.locationSection.copyAddress}</span>
                </button>
              </div>

              {/* Navigation Action Buttons */}
              <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3.5 sm:px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer shadow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.locationSection.openGoogleMaps}</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="px-3.5 sm:px-4 py-2.5 bg-ocean-surface hover:bg-stone-800 text-stone-200 border border-stone-800 rounded-lg text-xs flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-ocean-card border border-stone-800 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 font-mono">
                <Clock className="w-4 h-4" />
                <span>{t.locationSection.hoursTitle}</span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-stone-800/60">
                  <span className="text-stone-300 font-medium">Lundi au Dimanche</span>
                  <span className="font-mono font-bold text-stone-100 tabular-nums">12:00 – 23:30</span>
                </div>
                <div className="flex items-center justify-between py-1 text-xs">
                  <span className="text-stone-400">Arrivage du poisson frais</span>
                  <span className="text-amber-400 font-medium">Tous les matins au port</span>
                </div>
                <div className="flex items-center justify-between py-1 text-xs">
                  <span className="text-stone-400">Modalités de règlement</span>
                  <span className="text-stone-300">Espèces (MAD) · Cartes bancaires</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Map Embed + Tangier Petit Taxi Guide Card (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Map Frame Card */}
            <div className="rounded-2xl overflow-hidden border border-stone-800 bg-ocean-card shadow-xl">
              <div className="p-4 border-b border-stone-800 flex items-center justify-between text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-stone-100 font-serif">Plan d'Accès · Baie de Tanger</span>
                </div>
                <span className="font-mono text-stone-400 tabular-nums">
                  35.7753° N, 5.7942° W
                </span>
              </div>

              {/* Interactive OpenStreetMap Embed centered on 35.7752668, -5.7941674 */}
              <div className="w-full h-64 sm:h-72 relative bg-stone-900">
                <iframe
                  title="Carte Pesca Del Dia 2 Tanger"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-5.8041674%2C35.7682668%2C-5.7841674%2C35.7822668&amp;layer=mapnik&amp;marker=35.7752668%2C-5.7941674"
                />
              </div>

              <div className="p-4 bg-ocean-card flex items-center justify-between text-xs">
                <span className="text-stone-400">Avenue Oujda, Tanger</span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group"
                >
                  <span className="underline underline-offset-2">Ouvrir dans Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Tangier Petit Taxi Guide Card with Working Speech / Pronunciation Feature */}
            <div className="p-4 sm:p-6 rounded-2xl bg-ocean-card border border-amber-600/30 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 font-mono">
                  <Car className="w-4 h-4 text-amber-500" />
                  <span>{t.locationSection.taxiCardTitle}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Pronunciation voice button */}
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      speaking
                        ? 'bg-amber-500 text-stone-950 animate-pulse'
                        : 'bg-ocean-surface hover:bg-stone-800 text-amber-400 border border-stone-800'
                    }`}
                    title="Écouter la prononciation en arabe marocain"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{speaking ? 'Lecture...' : 'Prononcer'}</span>
                  </button>

                  {/* Driver Mode Fullscreen Button */}
                  <button
                    type="button"
                    onClick={() => setIsDriverModeOpen(true)}
                    className="p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 border border-amber-500/40 transition-colors cursor-pointer"
                    title="Afficher en grand format pour le chauffeur de taxi"
                  >
                    <span>Grand Écran</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light">
                {t.locationSection.taxiCardSubtitle}
              </p>

              {/* High-visibility taxi driver presentation card */}
              <div
                onClick={() => setIsDriverModeOpen(true)}
                className="p-4 rounded-xl bg-ocean-surface border border-stone-800 space-y-2 cursor-pointer hover:border-amber-500/60 transition-colors group"
              >
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Cliquer pour agrandir</span>
                  <span className="text-amber-400/80 group-hover:text-amber-300 font-mono">Mode Nuit</span>
                </div>
                <p className="font-arabic text-xl sm:text-2xl text-amber-300 font-bold text-right leading-relaxed dir-rtl">
                  {RESTAURANT_INFO.taxiArabic}
                </p>
                <div className="pt-2 border-t border-stone-850 flex items-center justify-between text-xs text-stone-300 font-mono italic">
                  <span>{t.locationSection.taxiPhonetics}</span>
                  <span className="text-[11px] text-stone-500 not-italic">90060 Tanger</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                Repère à Tanger : Les petits taxis sont bleu clair avec une bande jaune sur le toit. La course depuis le boulevard Pasteur ou la gare Tanger Ville dure environ 5 à 7 minutes (10 à 20 MAD au compteur).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Mode Full-Screen Night Modal */}
      {isDriverModeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-stone-950 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
            <button
              onClick={() => setIsDriverModeOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                POUR LE CHAUFFEUR DE TAXI / للـسـائـق
              </span>
              <p className="text-xs text-stone-400">
                Montrez directement cet écran au chauffeur :
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
              <p className="font-arabic text-3xl sm:text-4xl text-amber-300 font-extrabold leading-loose text-center dir-rtl">
                عـافـاك الـشـيـفـور :<br />
                شـارع وجـدة<br />
                <span className="text-white text-2xl sm:text-3xl">مـطـعـم صـيـد الـيـوم 2</span><br />
                <span className="text-amber-400/90 text-lg sm:text-xl font-normal">(Pesca Del Dia 2)</span>
              </p>

              <div className="pt-3 border-t border-stone-800 text-xs text-stone-300 font-arabic text-center">
                قريب من محطة القطار طنجة المدينة وكورنيش البحر
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleSpeak}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>{speaking ? 'Lecture en cours...' : 'Faire écouter en Arabe'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDriverModeOpen(false)}
                className="py-3 px-5 bg-stone-900 text-stone-300 hover:text-white rounded-xl text-sm border border-stone-800 font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
