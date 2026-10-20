import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VERIFIED_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MessageSquareQuote, ExternalLink, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'fraicheur' | 'friture' | 'ambiance'>('all');

  const filteredReviews = filter === 'all'
    ? VERIFIED_REVIEWS
    : VERIFIED_REVIEWS.filter((r) => {
        const text = (r.keyHighlight + ' ' + r.contentFr).toLowerCase();
        if (filter === 'fraicheur') return text.includes('fraîcheur') || text.includes('poisson') || text.includes('banc');
        if (filter === 'friture') return text.includes('friture') || text.includes('croustillante') || text.includes('pulpo');
        if (filter === 'ambiance') return text.includes('service') || text.includes('famille') || text.includes('équipe');
        return true;
      });

  return (
    <section id="avis" className="w-full py-16 sm:py-24 bg-ocean-deep border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with verified score badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/80">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-500 font-mono">
              <MessageSquareQuote className="w-4 h-4 text-amber-500" />
              <span>{t.reviewsSection.badge}</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span>Avis Publics Vérifiés</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-100 tracking-tight [text-wrap:balance]">
              {t.reviewsSection.title}
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              {t.reviewsSection.subtitle}
            </p>
          </div>

          {/* Social Proof Certificate Pill */}
          <div className="p-4 rounded-2xl bg-ocean-card border border-stone-800 flex items-center gap-3 sm:gap-4 w-full sm:w-auto shadow-lg">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-xl sm:text-2xl tabular-nums shrink-0">
              4.1
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-200 font-semibold mt-1 truncate">
                676 avis vérifiés sur Google Maps
              </p>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-0.5 group truncate"
              >
                <span className="underline underline-offset-2">Consulter la fiche Google Maps</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter controls with smooth touch scroll */}
        <div className="flex items-center gap-1.5 p-1.5 bg-ocean-card border border-stone-800 rounded-xl overflow-x-auto max-w-full no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Tous les avis
          </button>
          <button
            onClick={() => setFilter('fraicheur')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'fraicheur'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Fraîcheur & Choix au Banc
          </button>
          <button
            onClick={() => setFilter('friture')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'friture'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Friture & Cuissons
          </button>
          <button
            onClick={() => setFilter('ambiance')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'ambiance'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Ambiance & Accueil
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-ocean-card/80 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
            >
              <div className="space-y-3">
                {/* Rating + Source + Key Highlight */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-stone-400 text-[11px] font-mono">
                    {review.date} · {review.source}
                  </span>
                </div>

                {/* Key Highlight */}
                <p className="text-xs font-bold text-amber-400 font-serif tracking-wide">
                  « {review.keyHighlight} »
                </p>

                {/* Quote Content */}
                <blockquote className="text-sm text-stone-200 leading-relaxed font-light italic">
                  "{language === 'ar' ? review.contentAr : language === 'en' ? review.contentEn : review.contentFr}"
                </blockquote>
              </div>

              {/* Author and verification tag */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold text-stone-300 font-serif">{review.author}</span>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Avis vérifié Google</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
