import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortChronicle } from './components/PortChronicle';
import { FishCounter } from './components/FishCounter';
import { MenuSection } from './components/MenuSection';
import { TraditionSection } from './components/TraditionSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationCard } from './components/LocationCard';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { FishCatchItem, MenuItem, RESTAURANT_INFO } from './data/restaurantData';
import { soundEngine } from './services/soundEngine';
import { Phone, Calendar, Waves, Sparkles, Volume2 } from 'lucide-react';

function RestaurantApp() {
  const { t, language } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [soundState, setSoundState] = useState(soundEngine.getState());
  const [selectedCatches, setSelectedCatches] = useState<
    { item: FishCatchItem; cookingMethod: 'plancha' | 'friture' | 'mqila' | 'paella'; quantity: number }[]
  >([]);

  useEffect(() => {
    const unsub = soundEngine.subscribe(() => {
      setSoundState(soundEngine.getState());
    });
    return unsub;
  }, []);

  const handleToggleCatch = (
    item: FishCatchItem,
    method: 'plancha' | 'friture' | 'mqila' | 'paella'
  ) => {
    soundEngine.playInteractionFeedback('water');
    setSelectedCatches((prev) => {
      const existingIndex = prev.findIndex((sc) => sc.item.id === item.id);
      if (existingIndex >= 0) {
        // Remove if already in selection
        return prev.filter((sc) => sc.item.id !== item.id);
      } else {
        // Add new selection
        return [...prev, { item, cookingMethod: method, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    soundEngine.playInteractionFeedback('click');
    setSelectedCatches((prev) => {
      return prev
        .map((sc) => {
          if (sc.item.id === itemId) {
            const nextQty = sc.quantity + delta;
            return { ...sc, quantity: nextQty };
          }
          return sc;
        })
        .filter((sc) => sc.quantity > 0);
    });
  };

  const handleSelectMenuItem = (item: MenuItem) => {
    soundEngine.playInteractionFeedback('success');
    // Open booking modal so the guest can easily request this item
    setIsBookingOpen(true);
  };

  const triggerHaptic = (durationMs = 12) => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(durationMs);
      } catch {
        // Safe fallback if vibration permission or API not supported
      }
    }
  };

  const handleCallClick = () => {
    triggerHaptic(10);
    soundEngine.playInteractionFeedback('click');
  };

  const openBookingWithSound = () => {
    triggerHaptic(14);
    soundEngine.playInteractionFeedback('click');
    setIsBookingOpen(true);
  };

  // Determine ambient glow color according to active sound mood
  const moodGlowClass =
    soundState.isPlaying && !soundState.isMuted
      ? soundState.currentMood === 'soiree'
        ? 'opacity-30 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.25),transparent)]'
        : soundState.currentMood === 'detroit'
        ? 'opacity-30 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(14,165,233,0.22),transparent)]'
        : 'opacity-30 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(217,119,6,0.25),transparent)]'
      : 'opacity-0';

  return (
    <div className="min-h-screen bg-ocean-deep text-stone-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200 relative overflow-x-hidden w-full max-w-full">
      {/* Dynamic Sound-Responsive Ambient Atmosphere Light */}
      <div
        className={`fixed top-0 left-0 right-0 max-w-full h-[600px] pointer-events-none transition-all duration-1000 -z-10 overflow-hidden ${moodGlowClass}`}
      />

      {/* Top Navigation */}
      <Navbar onOpenBooking={openBookingWithSound} />

      {/* Main Content Sections */}
      <main className="flex-1 pb-28 sm:pb-0 w-full max-w-full overflow-x-hidden">
        <Hero onOpenBooking={openBookingWithSound} />
        <PortChronicle />
        <FishCounter
          selectedCatches={selectedCatches}
          onToggleCatch={handleToggleCatch}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenBooking={openBookingWithSound}
        />
        <MenuSection onSelectItem={handleSelectMenuItem} />
        <TraditionSection />
        <ReviewsSection />
        <LocationCard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation & Catch Pre-order Modal */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedCatches={selectedCatches}
      />

      {/* Floating Mobile Quick Action Bar with safe area, finger-optimized tap targets, and 0.98 active tactile scaling */}
      <aside
        aria-label="Actions rapides mobiles"
        className="sm:hidden fixed bottom-safe left-3 right-3 z-30 max-w-md mx-auto bg-stone-950/92 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-2 sm:p-2.5 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] flex items-center justify-between gap-2.5"
      >
        {/* Calling Button - Optimized 48px Tap Target with 0.98 Active Compression */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          onClick={handleCallClick}
          className="group flex-1 min-h-[48px] h-12 px-3.5 bg-ocean-surface/90 hover:bg-ocean-surface text-stone-200 border border-stone-800/90 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 select-none touch-manipulation transition-all duration-150 ease-out active:scale-[0.98] active:duration-75 active:bg-stone-900 active:border-amber-500/40 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] active:text-amber-100 cursor-pointer"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-active:scale-95 transition-transform duration-100">
            <Phone className="w-3.5 h-3.5" />
          </span>
          <span className="font-semibold tracking-wide">
            {language === 'ar' ? 'اتصال' : language === 'en' ? 'Call' : 'Appeler'}
          </span>
        </a>

        {/* Reservation Button - Luminous Amber Tap Target with 0.98 Active Scaling & Catch Count */}
        <button
          onClick={openBookingWithSound}
          className="group flex-1 min-h-[48px] h-12 px-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(245,158,11,0.28)] cursor-pointer select-none touch-manipulation transition-all duration-150 ease-out active:scale-[0.98] active:duration-75 active:brightness-95 active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)] relative"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-stone-950/15 text-stone-950 group-active:scale-95 transition-transform duration-100">
            <Calendar className="w-3.5 h-3.5" />
          </span>
          <span className="font-bold tracking-wide truncate">
            {selectedCatches.length > 0
              ? language === 'ar'
                ? `حجز (${selectedCatches.reduce((a, c) => a + c.quantity, 0)})`
                : language === 'en'
                ? `Book (${selectedCatches.reduce((a, c) => a + c.quantity, 0)})`
                : `Réserver (${selectedCatches.reduce((a, c) => a + c.quantity, 0)})`
              : language === 'ar'
              ? 'حجز طاولة'
              : language === 'en'
              ? 'Book Table'
              : 'Réserver'}
          </span>
          {selectedCatches.length > 0 && (
            <span className="absolute -top-1.5 -right-1 px-1.5 min-w-[20px] h-5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-mono font-black flex items-center justify-center shadow-lg border-2 border-stone-950 pointer-events-none animate-pulse">
              {selectedCatches.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </button>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RestaurantApp />
    </LanguageProvider>
  );
}
