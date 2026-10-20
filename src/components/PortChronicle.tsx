import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Anchor, Compass, Clock, Waves, Fish, Wind, Thermometer, ShieldCheck, Sparkles, Navigation } from 'lucide-react';

export const PortChronicle: React.FC = () => {
  const { language } = useLanguage();
  const [tangierTime, setTangierTime] = useState('');
  const [tidePhase, setTidePhase] = useState<'rising' | 'high' | 'falling' | 'low'>('high');

  // Compute live Tangier local time (Morocco GMT+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Africa/Casablanca time zone
      const timeStr = now.toLocaleTimeString('fr-FR', {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTangierTime(timeStr);

      // Tangier semi-diurnal tides simulation (~12h25m period)
      const minutes = now.getHours() * 60 + now.getMinutes();
      const tideCycle = (minutes % 745) / 745;
      if (tideCycle < 0.25) setTidePhase('rising');
      else if (tideCycle < 0.5) setTidePhase('high');
      else if (tideCycle < 0.75) setTidePhase('falling');
      else setTidePhase('low');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-12 sm:py-16 bg-stone-950 border-b border-stone-800 text-stone-100 relative overflow-hidden">
      {/* Subtle ocean current wave background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-850">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 font-mono">
              <Anchor className="w-4 h-4 text-amber-500" />
              <span>Chronique Maritime & Marées</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="font-arabic font-normal">ميناء الصيد طنجة</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight">
              Du Port de Pêche de Tanger à Votre Table
            </h3>

            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-2xl">
              Chaque aube à Tanger, les barques traditionnelles du détroit accostent au port de pêche. Notre banc de glace est réapprovisionné directement avant l'ouverture du service de midi.
            </p>
          </div>

          {/* Live Tangier Port Metrics */}
          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:items-center sm:gap-4 bg-ocean-card/90 border border-stone-800 p-3 sm:p-4 rounded-2xl shadow-xl">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-stone-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">HEURE TANGER</span>
              </div>
              <p className="font-mono text-base sm:text-2xl font-bold text-stone-100 tabular-nums truncate">
                {tangierTime || '12:00:00'}
              </p>
            </div>

            <div className="hidden sm:block h-8 w-px bg-stone-800" />

            <div className="space-y-0.5 min-w-0 border-l border-stone-800 pl-3 sm:border-0 sm:pl-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-stone-400 font-mono">
                <Waves className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">MARÉE DÉTROIT</span>
              </div>
              <p className="font-mono text-[11px] sm:text-sm font-bold text-amber-400 uppercase truncate">
                {tidePhase === 'high' ? 'Pleine Mer' : tidePhase === 'rising' ? 'Montante' : tidePhase === 'falling' ? 'Descendante' : 'Basse Mer'}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Freshness Pipeline Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-ocean-card/70 border border-stone-800/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-500">01 · 05h30</span>
              <span className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                <Wind className="w-4 h-4 text-amber-400" />
              </span>
            </div>
            <h4 className="text-base font-serif font-bold text-stone-100">
              Retour des Barques de Nuit
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Les pêcheurs artisans rentrent du détroit de Gibraltar et de la côte atlantique avec leurs casiers de dorades, loups de mer et soles sauvages.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-ocean-card/70 border border-stone-800/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-500">02 · 07h00</span>
              <span className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                <Compass className="w-4 h-4 text-amber-400" />
              </span>
            </div>
            <h4 className="text-base font-serif font-bold text-stone-100">
              Sélection à la Criée du Port
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Notre maître écailler choisit personnellement les pièces les plus nobles : œil vif, ouïes pourpres et chair ferme garantissant une fraîcheur absolue.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-ocean-card/70 border border-stone-800/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-500">03 · 10h30</span>
              <span className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                <Thermometer className="w-4 h-4 text-cyan-400" />
              </span>
            </div>
            <h4 className="text-base font-serif font-bold text-stone-100">
              Dressage sur Banc de Glace
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Arrivée sur l'Avenue Oujda. Les poissons sont disposés entiers sur notre lit de glace pilée à 0°C, prêts pour votre inspection dès votre arrivée.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-ocean-card/70 border border-stone-800/80 space-y-3 relative group hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-500">04 · 12h00 – 23h30</span>
              <span className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </span>
            </div>
            <h4 className="text-base font-serif font-bold text-stone-100">
              Cuisson Minute à Votre Goût
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Vous désignez votre prise sur la glace. Elle est nettoyée devant vous, puis saisie à la plancha ou dorée en friture légère sans attente inutile.
            </p>
          </div>
        </div>

        {/* Port Direct Guarantee Footer Banner */}
        <div className="p-4 rounded-xl bg-ocean-card border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-stone-300">
              <strong>Engagement Qualité Pesca Del Dia 2 :</strong> Aucun intermédiaire industriel. Zéro poisson surgelé.
            </span>
          </div>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 shrink-0"
          >
            <span>Situer Avenue Oujda sur le plan</span>
            <Navigation className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
