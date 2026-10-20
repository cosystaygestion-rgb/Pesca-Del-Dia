import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO, FishCatchItem } from '../data/restaurantData';
import { X, Calendar, Clock, Users, MapPin, MessageCircle, Phone, Check, Utensils } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCatches: { item: FishCatchItem; cookingMethod: string; quantity: number }[];
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedCatches,
}) => {
  const { t, language } = useLanguage();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('13:30');
  const [guests, setGuests] = useState('2');
  const [area, setArea] = useState<'main' | 'family' | 'terrace'>('main');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buildWhatsappMessage = () => {
    const areaName = t.bookingModal.areas[area];
    let msg = `Bonjour Pesca Del Dia 2, je souhaite réserver une table :\n`;
    msg += `👤 Nom : ${name || 'Client'}\n`;
    msg += `📅 Date : ${date}\n`;
    msg += `⏰ Heure : ${time}\n`;
    msg += `👥 Couverts : ${guests} personnes\n`;
    msg += `📍 Espace : ${areaName}\n`;
    if (phone) msg += `📞 Contact : ${phone}\n`;

    if (selectedCatches.length > 0) {
      msg += `\n🐟 Poissons choisis sur le banc :\n`;
      selectedCatches.forEach((sc) => {
        msg += `- ${sc.item.nameFr} (${sc.cookingMethod}) x${sc.quantity}\n`;
      });
    }

    if (notes.trim()) {
      msg += `\n📝 Précisions : ${notes}\n`;
    }

    return encodeURIComponent(msg);
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const message = buildWhatsappMessage();
    const url = `https://wa.me/212539325212?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-ocean-card border border-stone-800 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 flex items-start justify-between gap-4 bg-ocean-surface">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.bookingModal.title}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-100 mt-1">
              Pesca Del Dia 2 · صيد اليوم
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {t.bookingModal.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label={t.bookingModal.cancel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWhatsappSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          {/* Selected catch banner if any */}
          {selectedCatches.length > 0 && (
            <div className="p-3.5 rounded-xl bg-stone-950 border border-amber-600/30 text-xs space-y-1.5">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                <span>{t.bookingModal.selectedCatchLabel}</span>
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedCatches.map((sc) => (
                  <span
                    key={sc.item.id}
                    className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 font-mono text-[11px] border border-stone-800"
                  >
                    {sc.item.nameFr} ({sc.cookingMethod}) x{sc.quantity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">
                {t.bookingModal.dateLabel}
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">
                {t.bookingModal.timeLabel}
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="12:00">12:00 (Déjeuner d'ouverture)</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30 (Midi fort)</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="19:30">19:30 (Début de soirée)</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00 (Dîner)</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
              </select>
            </div>
          </div>

          {/* Number of Guests & Seating Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">
                {t.bookingModal.guestsLabel}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((num) => (
                  <option key={num} value={num}>
                    {num} {t.bookingModal.guestsCount}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">
                {t.bookingModal.areaLabel}
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="main">{t.bookingModal.areas.main}</option>
                <option value="family">{t.bookingModal.areas.family}</option>
                <option value="terrace">{t.bookingModal.areas.terrace}</option>
              </select>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">
                {t.bookingModal.nameLabel} *
              </label>
              <input
                type="text"
                required
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300">
                {t.bookingModal.phoneLabel}
              </label>
              <input
                type="tel"
                placeholder="+212 ..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-300">
              {t.bookingModal.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.bookingModal.notesPlaceholder}
              className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-lg text-base sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <p className="text-[11px] text-stone-400">
            {t.bookingModal.confirmNotice}
          </p>

          {/* Submission Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.bookingModal.submitWhatsapp}</span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="py-3 px-4 bg-stone-950 hover:bg-stone-850 text-stone-200 border border-stone-800 font-medium rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>{t.bookingModal.submitCall}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
