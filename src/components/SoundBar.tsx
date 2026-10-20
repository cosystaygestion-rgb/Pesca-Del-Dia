import React, { useState, useEffect, useRef } from 'react';
import { soundEngine, SoundMood, SOUND_TRACKS } from '../services/soundEngine';
import { useLanguage } from '../context/LanguageContext';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Radio,
  Sliders,
  ChevronDown,
  ChevronUp,
  Waves,
  Music2,
  Sparkles,
  Info,
  X
} from 'lucide-react';

export const SoundBar: React.FC = () => {
  const { language } = useLanguage();
  const [engineState, setEngineState] = useState(soundEngine.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(() => {
      setEngineState(soundEngine.getState());
    });
    return unsubscribe;
  }, []);

  // Real-time Audio Spectrum Visualization using HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      const data = soundEngine.getAnalyserData();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (data && engineState.isPlaying && !engineState.isMuted) {
        const barCount = 14;
        const barWidth = 2.5;
        const gap = 2;
        const totalW = barCount * (barWidth + gap);
        const startX = (canvas.width - totalW) / 2;

        for (let i = 0; i < barCount; i++) {
          const val = data[i * 2] || 0;
          const percent = val / 255;
          const barHeight = Math.max(2, percent * canvas.height * 0.95);
          const x = startX + i * (barWidth + gap);
          const y = canvas.height - barHeight;

          // Gradient color: golden amber to soft cyan
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, '#d97706'); // amber-600
          grad.addColorStop(1, '#38bdf8'); // sky-400

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [1]);
          ctx.fill();
        }
      } else {
        // Quiet idle wave bars
        const barCount = 10;
        const barWidth = 2;
        const gap = 2.5;
        const totalW = barCount * (barWidth + gap);
        const startX = (canvas.width - totalW) / 2;

        for (let i = 0; i < barCount; i++) {
          const x = startX + i * (barWidth + gap);
          ctx.fillStyle = '#44403c'; // stone-700
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - 3, barWidth, 3, [1]);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [engineState.isPlaying, engineState.isMuted]);

  const activeTrack = SOUND_TRACKS[engineState.currentMood];

  return (
    <>
      {/* Floating or Docked Sound Bar (Mobile & Desktop) */}
      <div className="relative inline-flex items-center">
        <div className="flex items-center bg-stone-900/90 hover:bg-stone-900 border border-amber-600/30 hover:border-amber-500/60 transition-all rounded-xl p-1 shadow-lg text-xs">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => soundEngine.togglePlay()}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              engineState.isPlaying
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
            title={engineState.isPlaying ? 'Mettre en pause l’ambiance sonore' : 'Écouter l’ambiance sonore de Tanger'}
            aria-label={engineState.isPlaying ? 'Pause' : 'Lecture'}
          >
            {engineState.isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Spectrum Analyzer Canvas (Desktop & Tablets, hidden on small mobile to avoid header overflow) */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:flex items-center gap-2 px-2 py-0.5 cursor-pointer group"
            title="Ouvrir le salon sonore de Tanger"
          >
            <canvas
              ref={canvasRef}
              width={56}
              height={18}
              className="w-12 sm:w-14 h-4.5 block"
            />

            <div className="hidden xl:flex flex-col text-left pr-1">
              <span className="text-[11px] font-semibold text-stone-200 group-hover:text-amber-400 transition-colors truncate max-w-[130px]">
                {language === 'ar' ? activeTrack.titleAr : language === 'en' ? activeTrack.titleEn : activeTrack.titleFr}
              </span>
              <span className="text-[9px] text-amber-500/90 font-mono tracking-wider">
                {engineState.isPlaying ? 'EN DIRECT · TANGER' : 'AMBIANCE SONORE'}
              </span>
            </div>

            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-400 group-hover:text-stone-200 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Quick Mute Toggle (Desktop only) */}
          {engineState.isPlaying && (
            <button
              type="button"
              onClick={() => soundEngine.toggleMute()}
              className="hidden sm:block p-1.5 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title={engineState.isMuted ? 'Activer le son' : 'Couper le son'}
              aria-label="Mute"
            >
              {engineState.isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-stone-300" />
              )}
            </button>
          )}
        </div>

        {/* Ambient listening badge callout when playing */}
        {engineState.isPlaying && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-stone-950 animate-pulse pointer-events-none" />
        )}
      </div>

      {/* Expanded Sound Salon Modal / Popover */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative w-full max-w-md bg-ocean-card border border-amber-600/40 rounded-3xl p-6 shadow-2xl space-y-6 text-stone-100 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 font-mono">
                  <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>Salon Sonore · Baie de Tanger</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-100">
                  L'Atmosphère Sonore du Restaurant
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Composition maritime originale synthétisée en temps réel pour accompagner votre découverte.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 rounded-xl transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Now Playing Card */}
            <div className="p-4 rounded-2xl bg-ocean-surface border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  {engineState.isPlaying ? 'EN DIFFUSION' : 'EN PAUSE'}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  Web Audio Synthesizer · 0% Téléchargement
                </span>
              </div>

              <div>
                <h4 className="text-lg font-serif font-bold text-stone-100">
                  {language === 'ar' ? activeTrack.titleAr : language === 'en' ? activeTrack.titleEn : activeTrack.titleFr}
                </h4>
                <p className="text-xs text-amber-500/90 font-arabic mt-0.5">
                  {language === 'ar' ? activeTrack.titleFr : activeTrack.titleAr}
                </p>
                <p className="text-xs text-stone-300 mt-2 font-light leading-relaxed">
                  {activeTrack.descriptionFr}
                </p>
              </div>

              {/* Transport Controls */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => soundEngine.togglePlay()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition-all active:scale-95"
                >
                  {engineState.isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Suspendre</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>Lancer l'Ambiance</span>
                    </>
                  )}
                </button>

                {/* Volume slider */}
                <div className="flex items-center gap-2 flex-1 max-w-[140px]">
                  <button
                    type="button"
                    onClick={() => soundEngine.toggleMute()}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {engineState.isMuted ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-stone-300" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={engineState.isMuted ? 0 : engineState.volume}
                    onChange={(e) => soundEngine.setVolume(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                    aria-label="Volume"
                  />
                </div>
              </div>
            </div>

            {/* 3 Mood Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Choisir une Ambiancement Sonore :
              </label>

              <div className="space-y-2">
                {(['andalou', 'detroit', 'soiree'] as const).map((mood) => {
                  const info = SOUND_TRACKS[mood];
                  const isCurrent = engineState.currentMood === mood;

                  return (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => {
                        soundEngine.setMood(mood);
                        if (!engineState.isPlaying) {
                          soundEngine.play(mood);
                        }
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-600/20 border-amber-500 text-stone-100 shadow-md ring-1 ring-amber-500/40'
                          : 'bg-ocean-surface border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm text-stone-100 truncate">
                            {info.titleFr}
                          </span>
                          {isCurrent && engineState.isPlaying && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-1 font-light">
                          {info.descriptionFr}
                        </p>
                      </div>

                      <span className="text-[10px] font-mono text-amber-400 font-semibold shrink-0">
                        {isCurrent ? 'Actif' : 'Sélectionner'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Maritime note */}
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 flex items-start gap-2.5 text-[11px] text-stone-400">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Sonorité générative respectueuse de la bande passante : aucun fichier externe n’est téléchargé, 100% de la musique est créée en temps réel par les oscillateurs de votre navigateur.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
