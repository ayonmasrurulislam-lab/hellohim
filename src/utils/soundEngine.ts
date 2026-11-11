/**
 * Romantic Ambient Sound Engine
 * Uses Web Audio API to generate a warm, dreamy piano arpeggio progression,
 * with optional support for an external MP3 stream.
 * Guaranteed to work offline with zero external network dependencies.
 */

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();
  private audioElement: HTMLAudioElement | null = null;
  private customUrl: string | null = null;

  constructor() {
    // Initialized on first user interaction
  }

  public setCustomUrl(url?: string) {
    if (url && url.trim().length > 0) {
      this.customUrl = url.trim();
    }
  }

  private initAudio() {
    if (this.audioCtx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.audioCtx.currentTime);

      // Low pass filter to create a warm, intimate, romantic tone
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

      // Connect master gain -> filter -> destination
      this.masterGain.connect(filter);
      filter.connect(this.audioCtx.destination);
    } catch {
      // AudioContext unavailable
    }
  }

  private playNote(freq: number, time: number, duration: number, velocity = 0.5) {
    if (!this.audioCtx || !this.masterGain) return;

    // Dual oscillator for rich, warm acoustic piano-like harmonics
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time); // warm overtone

    // Soft, rounded envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.45, time + 0.08); // soft attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration); // gentle decay

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);

    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Romantic arpeggiated chord frequencies (Cmaj9, Am9, Fmaj9, Gsus4)
  private readonly chordProgressions: number[][] = [
    // Cmaj9: C3, G3, B3, D4, E4, G4
    [130.81, 196.00, 246.94, 293.66, 329.63, 392.00],
    // Am9: A2, E3, G3, C4, E4, B4
    [110.00, 164.81, 196.00, 261.63, 329.63, 493.88],
    // Fmaj9: F2, C3, A3, E4, G4, C5
    [87.31, 130.81, 220.00, 329.63, 392.00, 523.25],
    // G6/9: G2, D3, B3, E4, A4, D5
    [98.00, 146.83, 246.94, 329.63, 440.00, 587.33]
  ];

  private startSynthesizerLoop() {
    if (!this.audioCtx) return;

    let step = 0;
    const intervalMs = 450; // gentle, relaxing tempo (~66 bpm arpeggio)

    const tick = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const chordIndex = Math.floor(step / 8) % this.chordProgressions.length;
      const currentChord = this.chordProgressions[chordIndex];
      const noteIndex = step % currentChord.length;
      const freq = currentChord[noteIndex];

      const now = this.audioCtx.currentTime;
      // Play note with gentle variation
      this.playNote(freq, now, 2.2, noteIndex === 0 ? 0.7 : 0.45);

      step++;
      this.timerId = window.setTimeout(tick, intervalMs);
    };

    tick();
  }

  public async play(): Promise<void> {
    if (this.customUrl) {
      if (!this.audioElement) {
        this.audioElement = new Audio(this.customUrl);
        this.audioElement.loop = true;
      }
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch {
        // Fallback to built-in synth if custom audio fails
      }
    }

    this.initAudio();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.startSynthesizerLoop();
      this.notify();
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.audioCtx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    this.notify();
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted
    };
  }

  public subscribe(listener: (playing: boolean, muted: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying, this.isMuted));
  }
}

export const soundEngine = new SoundEngine();
