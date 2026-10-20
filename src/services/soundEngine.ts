/**
 * SoundEngine - Web Audio API Generative Acoustic & Maritime Soundscape for Pesca Del Dia 2 (Tangier)
 * 100% original, synthesized in real-time, zero external downloads, zero copyright liabilities.
 * Provides authentic Mediterranean & Tangier coastal atmospheres:
 * 1. "Brise du Détroit" (Coastal sea swell, gentle tidal rhythm, ocean breeze)
 * 2. "Oud & Guitare Andalouse" (Acoustic Mediterranean chord arpeggios in harmonic minor/Hijaz mode)
 * 3. "Soirée Tanger Ville" (Warm jazz/lounge Rhodes-style chord resonance & vinyl warmth)
 */

export type SoundMood = 'detroit' | 'andalou' | 'soiree';

export interface SoundTrackInfo {
  id: SoundMood;
  titleFr: string;
  titleAr: string;
  titleEn: string;
  descriptionFr: string;
  bpm: number;
  tags: string[];
}

export const SOUND_TRACKS: Record<SoundMood, SoundTrackInfo> = {
  detroit: {
    id: 'detroit',
    titleFr: 'Brise du Détroit & Marée',
    titleAr: 'نسيم المضيق وأمواج البحر',
    titleEn: 'Strait of Gibraltar Tide & Breeze',
    descriptionFr: 'Respiration lente des vagues entre Atlantique et Méditerranée, embruns marins et vent doux.',
    bpm: 50,
    tags: ['Maritime', 'Relaxant', 'Ambiance Côtière'],
  },
  andalou: {
    id: 'andalou',
    titleFr: 'Cordes Andalouses & Oud de Tanger',
    titleAr: 'أوتار أندلسية وعود طنجة',
    titleEn: 'Andalusian Strings & Tangier Oud',
    descriptionFr: 'Arpèges acoustiques chaleureux inspirés de la musique arabo-andalouse et du flamenco du Nord.',
    bpm: 68,
    tags: ['Acoustique', 'Traditionnel', 'Chaleur'],
  },
  soiree: {
    id: 'soiree',
    titleFr: 'Soirée au Restaurant sur la Baie',
    titleAr: 'أمسية على خليج طنجة',
    titleEn: 'Evening by the Bay Lounge',
    descriptionFr: 'Harmonies feutrées au crépuscule sur l’Avenue Oujda, lanternes allumées et tables réunies.',
    bpm: 60,
    tags: ['Lounge', 'Élégant', 'Convivial'],
  },
};

class TangierSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMood: SoundMood = 'andalou';
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private timerId: number | null = null;
  private volume: number = 0.65;
  private isMuted: boolean = false;
  private listeners: Set<() => void> = new Set();

  // Soundscape active generator nodes
  private waveNoiseNode: AudioNode | null = null;
  private waveGainNode: GainNode | null = null;
  private waveFilterNode: BiquadFilterNode | null = null;

  // Chord notes for Andalusian / Mediterranean arpeggio (D minor / A phrygian dominant)
  // D3, F3, A3, Bb3, C#4, D4, E4, F4, G4, A4
  private andalusianFrequencies = [
    146.83, // D3
    174.61, // F3
    220.00, // A3
    233.08, // Bb3
    277.18, // C#4
    293.66, // D4
    329.63, // E4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    554.37, // C#5
    587.33, // D5
  ];

  // Soirée Tanger chords (Dmin9, G13, Bbmaj7, A7alt)
  private soireeChords = [
    [146.83, 220.00, 261.63, 329.63, 392.00], // Dm9
    [196.00, 246.94, 293.66, 329.63, 440.00], // G13
    [116.54, 174.61, 220.00, 261.63, 329.63], // Bbmaj7
    [110.00, 164.81, 220.00, 277.18, 349.23], // A7(b13)
  ];
  private chordIndex = 0;
  private stepIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentMood: this.currentMood,
      volume: this.volume,
      isMuted: this.isMuted,
      trackInfo: SOUND_TRACKS[this.currentMood],
    };
  }

  public async togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      await this.play();
    }
  }

  public async play(mood?: SoundMood) {
    if (mood) {
      this.currentMood = mood;
    }

    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.stopGenerators();
    this.startGenerators();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    this.stopGenerators();
    this.notify();
  }

  public setMood(mood: SoundMood) {
    this.currentMood = mood;
    if (this.isPlaying) {
      this.stopGenerators();
      this.startGenerators();
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  /**
   * Generates continuous ocean swells using filtered pink/white noise with LFO modulation
   */
  private startOceanWaveGenerator() {
    if (!this.ctx || !this.masterGain) return;

    // Create pink noise buffer (5 seconds loop)
    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter for sea water depth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // Gain node for breathing wave cycle (7-second swell)
    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    // LFO for wave modulation
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8.3 seconds per tide swell

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    lfo.connect(filter.frequency);

    const lfoAmp = this.ctx.createGain();
    lfoAmp.gain.setValueAtTime(0.06, this.ctx.currentTime);
    lfo.connect(waveGain.gain);

    whiteNoise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();

    this.waveNoiseNode = whiteNoise;
    this.waveGainNode = waveGain;
    this.waveFilterNode = filter;
  }

  /**
   * Plucks a warm acoustic string note (synthesizes Mediterranean Oud/Flamenco timbre)
   */
  private playAcousticPluck(freq: number, duration: number = 2.5, volumeMul: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Triangle + soft saw for organic acoustic string pluck
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 1.002, t); // micro-detune for chorus/double strings like an Oud

    // Dynamic pluck filter: bright attack rapidly decaying to warm body
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, t);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.35);

    // Pluck envelope
    noteGain.gain.setValueAtTime(0.0001, t);
    noteGain.gain.linearRampToValueAtTime(volumeMul, t + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(volumeMul * 0.4, t + 0.25);
    noteGain.gain.exponentialRampToValueAtTime(0.00001, t + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + duration);
    osc2.stop(t + duration);
  }

  /**
   * Plays a warm Rhodes/vibraphone bell tone for evening lounge
   */
  private playLoungeChordNote(freq: number, duration: number = 3.5, volumeMul: number = 0.08) {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Subtle 2nd harmonic
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, t);

    noteGain.gain.setValueAtTime(0.0001, t);
    noteGain.gain.linearRampToValueAtTime(volumeMul, t + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(volumeMul * 0.6, t + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.00001, t + duration);

    if (panner) {
      panner.pan.setValueAtTime((Math.random() - 0.5) * 0.6, t);
      osc.connect(noteGain);
      oscHarmonic.connect(noteGain);
      noteGain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc.connect(noteGain);
      oscHarmonic.connect(noteGain);
      noteGain.connect(this.masterGain);
    }

    osc.start(t);
    oscHarmonic.start(t);
    osc.stop(t + duration);
    oscHarmonic.stop(t + duration);
  }

  private startGenerators() {
    this.startOceanWaveGenerator();

    const bpm = SOUND_TRACKS[this.currentMood].bpm;
    const intervalMs = (60 / bpm) * 1000 * 0.5; // Eighth note interval

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying) return;

      if (this.currentMood === 'andalou') {
        // Melodic Mediterranean arpeggio pattern
        const noteIdx = [0, 2, 4, 7, 5, 3, 6, 8, 5, 2, 9, 7][this.stepIndex % 12];
        const freq = this.andalusianFrequencies[noteIdx % this.andalusianFrequencies.length];

        // 75% chance of note play for natural acoustic pauses
        if (Math.random() > 0.22) {
          const accent = this.stepIndex % 4 === 0 ? 0.18 : 0.12;
          this.playAcousticPluck(freq, 2.2, accent);
        }

        // Add periodic deep bass root note every 8 steps
        if (this.stepIndex % 8 === 0) {
          const bassFreq = this.stepIndex % 16 === 0 ? 73.42 : 110.0; // D2 or A2
          this.playAcousticPluck(bassFreq, 3.5, 0.22);
        }

        this.stepIndex++;
      } else if (this.currentMood === 'soiree') {
        // Evening warm lounge chords with gentle strum
        if (this.stepIndex % 6 === 0) {
          const currentChord = this.soireeChords[this.chordIndex % this.soireeChords.length];
          currentChord.forEach((noteFreq, idx) => {
            window.setTimeout(() => {
              if (this.isPlaying && this.currentMood === 'soiree') {
                this.playLoungeChordNote(noteFreq, 4.0, 0.07);
              }
            }, idx * 75);
          });
          this.chordIndex++;
        }

        // Add soft high chime occasionally
        if (Math.random() < 0.25 && this.stepIndex % 2 === 0) {
          const chimeFreq = [587.33, 659.25, 783.99, 880.00][Math.floor(Math.random() * 4)];
          this.playLoungeChordNote(chimeFreq, 2.5, 0.04);
        }

        this.stepIndex++;
      } else if (this.currentMood === 'detroit') {
        // Pure ambient coastal seascape with occasional distant bell buoy or soft wave tone
        if (Math.random() < 0.15) {
          const harmonicFreq = [220.0, 293.66, 329.63, 440.0][Math.floor(Math.random() * 4)];
          this.playLoungeChordNote(harmonicFreq, 4.5, 0.03);
        }
        this.stepIndex++;
      }
    }, intervalMs);
  }

  private stopGenerators() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    if (this.waveNoiseNode) {
      try {
        (this.waveNoiseNode as AudioBufferSourceNode).stop();
        this.waveNoiseNode.disconnect();
      } catch {
        // ignore
      }
      this.waveNoiseNode = null;
    }
  }

  /**
   * Returns live frequency data for waveform visualizations
   */
  public getAnalyserData(): Uint8Array | null {
    if (!this.analyser) return null;
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  /**
   * Contextual subtle audio effect for user actions (e.g. adding a fish or table booking)
   */
  public playInteractionFeedback(type: 'click' | 'success' | 'water') {
    if (!this.ctx || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(240, t + 0.05);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === 'success') {
      // Warm double chime (F#5 -> A5)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, t);
      osc.frequency.setValueAtTime(880, t + 0.08);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } else if (type === 'water') {
      // Gentle drop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.08);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    }
  }
}

export const soundEngine = new TangierSoundEngine();
