/**
 * Web Audio API Sound & Background Music (BGM) Synthesizer
 * for Quiz Battle: Brain Literacy Challenge.
 *
 * Pure client-side synthesis with zero external audio assets.
 * Provides relaxing, serene lofi music for both the lobby and battles.
 */

export type BgmTrack = 'lobby' | 'battle' | 'none';

class SoundEffectsAndMusic {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public musicEnabled: boolean = true;
  public musicVolume: number = 0.65; // 0.0 to 1.0

  // BGM Engine state
  private currentTrack: BgmTrack = 'none';
  private bgmMasterGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private schedulerTimer: number | null = null;
  private nextNoteTime: number = 0;
  private currentStep: number = 0;

  // Active oscillator cleanup refs
  private activeBgmNodes: AudioNode[] = [];

  constructor() {
    // Lazy initialization on first user interaction
  }

  public init() {
    this.getContext();
  }

  public setSoundEnabled(val: boolean) {
    this.soundEnabled = val;
  }

  public setMusicEnabled(val: boolean) {
    this.musicEnabled = val;
    if (!val) {
      this.pauseBgm();
    } else {
      if (this.currentTrack !== 'none') {
        this.startBgmLoop(this.currentTrack);
      }
    }
  }

  public setMusicVolume(val: number) {
    this.musicVolume = Math.max(0, Math.min(1, val));
    if (this.bgmMasterGain && this.ctx) {
      this.bgmMasterGain.gain.setValueAtTime(this.musicVolume * 0.12, this.ctx.currentTime);
    }
  }

  public getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // =========================================================================
  // RELAXING BACKGROUND MUSIC (BGM) SYNTHESIZER
  // =========================================================================

  /**
   * Switches or starts the background music track ('lobby' or 'battle').
   */
  public playBgm(track: BgmTrack) {
    if (this.currentTrack === track && this.isBgmPlaying) return;
    this.currentTrack = track;

    if (!this.musicEnabled || track === 'none') {
      this.pauseBgm();
      return;
    }

    const ctx = this.getContext();
    if (!ctx) return;

    this.startBgmLoop(track);
  }

  public pauseBgm() {
    this.isBgmPlaying = false;
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    // Fade out smoothly
    if (this.bgmMasterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.bgmMasterGain.gain.cancelScheduledValues(now);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      } catch {
        // Ignore
      }
    }
  }

  private startBgmLoop(track: BgmTrack) {
    const ctx = this.getContext();
    if (!ctx) return;

    this.pauseBgm();

    // Create or reuse master BGM gain node
    if (!this.bgmMasterGain) {
      this.bgmMasterGain = ctx.createGain();
      this.bgmMasterGain.connect(ctx.destination);
    }

    const now = ctx.currentTime;
    this.bgmMasterGain.gain.cancelScheduledValues(now);
    this.bgmMasterGain.gain.setValueAtTime(0.0001, now);
    this.bgmMasterGain.gain.linearRampToValueAtTime(this.musicVolume * 0.12, now + 0.8);

    this.isBgmPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = ctx.currentTime + 0.1;

    // Scheduler tick every 25ms (looks ahead 100ms)
    this.schedulerTimer = window.setInterval(() => {
      this.scheduleBgmNotes(track);
    }, 25);
  }

  private scheduleBgmNotes(track: BgmTrack) {
    if (!this.ctx || !this.isBgmPlaying || !this.musicEnabled) return;

    const lookAheadTime = 0.12; // Schedule ahead by 120ms
    while (this.nextNoteTime < this.ctx.currentTime + lookAheadTime) {
      if (track === 'lobby') {
        this.playLobbyStep(this.nextNoteTime, this.currentStep);
        // Lobby Tempo: 72 BPM -> 16th note = 60 / (72 * 4) = 0.2083s
        this.nextNoteTime += 0.2083;
        this.currentStep = (this.currentStep + 1) % 64; // 4 bars of 16 steps
      } else if (track === 'battle') {
        this.playBattleStep(this.nextNoteTime, this.currentStep);
        // Battle Tempo: 84 BPM -> 16th note = 60 / (84 * 4) = 0.1785s
        this.nextNoteTime += 0.1785;
        this.currentStep = (this.currentStep + 1) % 64; // 4 bars of 16 steps
      }
    }
  }

  // -------------------------------------------------------------------------
  // 1. LOBBY BGM: Serene Lofi Study Oasis (Gentle Piano, Warm Pads & Chimes)
  // -------------------------------------------------------------------------
  private playLobbyStep(time: number, step: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    // 4-Bar Chord Progression:
    // Bar 1 (0..15):  Fmaj7 (F3, A3, C4, E4)
    // Bar 2 (16..31): Em7   (E3, G3, B3, D4)
    // Bar 3 (32..47): Dm7   (D3, F3, A3, C4)
    // Bar 4 (48..63): Cmaj7 (C3, E3, G3, B3)

    const bar = Math.floor(step / 16);
    const stepInBar = step % 16;

    // Bass note on beat 1 and beat 3 (step 0 and step 8)
    if (stepInBar === 0) {
      const bassFreqs = [174.61, 164.81, 146.83, 130.81]; // F2, E2, D2, C2
      this.playWarmBass(bassFreqs[bar], time, 1.8, 0.22);
    } else if (stepInBar === 8) {
      const altBassFreqs = [261.63, 246.94, 220.0, 196.0]; // C3, B2, A2, G2
      this.playWarmBass(altBassFreqs[bar], time, 1.2, 0.15);
    }

    // Warm Chord Pad on step 0 and gentle harmonic pulse on step 6 & 10
    if (stepInBar === 0 || stepInBar === 6) {
      const chords: number[][] = [
        [349.23, 440.0, 523.25, 659.25], // F4, A4, C5, E5 (Fmaj7)
        [329.63, 392.0, 493.88, 587.33], // E4, G4, B4, D5 (Em7)
        [293.66, 349.23, 440.0, 523.25], // D4, F4, A4, C5 (Dm7)
        [261.63, 329.63, 392.0, 493.88], // C4, E4, G4, B4 (Cmaj7)
      ];
      this.playWarmRhodesChord(chords[bar], time, stepInBar === 0 ? 2.2 : 1.4, 0.11);
    }

    // Relaxing Sparkling Chime / Kalimba Arpeggio melody notes
    const chimePatterns: { [key: number]: number } = {
      2: 659.25, // E5
      4: 783.99, // G5
      7: 880.0,  // A5
      11: 1046.5, // C6
      13: 880.0,
      18: 587.33, // D5
      20: 783.99, // G5
      23: 987.77, // B5
      28: 659.25, // E5
      34: 523.25, // C5
      36: 698.46, // F5
      39: 880.0,  // A5
      44: 587.33,
      50: 493.88, // B4
      52: 659.25, // E5
      55: 783.99, // G5
      60: 1046.5, // C6
      62: 987.77, // B5
    };

    if (chimePatterns[step]) {
      this.playSoftBell(chimePatterns[step], time, 0.08);
    }

    // Ambient Vinyl / Soft brush pulse on every 4th step
    if (stepInBar === 4 || stepInBar === 12) {
      this.playSoftBrushHiHat(time, 0.025);
    }
  }

  // -------------------------------------------------------------------------
  // 2. BATTLE BGM: Strategic Focus & Calm Groove (Lofi Chill Beat & Rhodes)
  // -------------------------------------------------------------------------
  private playBattleStep(time: number, step: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    // 4-Bar Chord Progression (Strategic & Inspiring Minor / Dorian):
    // Bar 1 (0..15):  Am9  (A2, E4, G4, B4, C5)
    // Bar 2 (16..31): Fmaj7 (F2, E4, G4, A4, C5)
    // Bar 3 (32..47): Dm9  (D2, F4, A4, C5, E5)
    // Bar 4 (48..63): Em7  (E2, D4, G4, B4, D5)

    const bar = Math.floor(step / 16);
    const stepInBar = step % 16;

    // Soft Lofi Percussion (Gentle Kick & Rimshot)
    if (stepInBar === 0 || stepInBar === 10) {
      this.playLofiKick(time, 0.16);
    }
    if (stepInBar === 4 || stepInBar === 12) {
      this.playLofiSnareRim(time, 0.09);
    }
    if (stepInBar % 2 === 0) {
      this.playSoftBrushHiHat(time, stepInBar % 4 === 2 ? 0.04 : 0.025);
    }

    // Strategic Sub Bass
    if (stepInBar === 0 || stepInBar === 6 || stepInBar === 10) {
      const rootNotes = [110.0, 87.31, 73.42, 82.41]; // A1, F1, D1, E1
      const noteFreq = stepInBar === 6 ? rootNotes[bar] * 1.5 : rootNotes[bar];
      this.playWarmBass(noteFreq, time, 0.9, 0.24);
    }

    // Rhodes / Electric Piano Chords
    if (stepInBar === 0 || stepInBar === 6) {
      const chords: number[][] = [
        [329.63, 392.0, 493.88, 523.25], // E4, G4, B4, C5 (Am9)
        [329.63, 392.0, 440.0, 523.25],  // E4, G4, A4, C5 (Fmaj7)
        [349.23, 440.0, 523.25, 659.25], // F4, A4, C5, E5 (Dm9)
        [293.66, 392.0, 493.88, 587.33], // D4, G4, B4, D5 (Em7)
      ];
      this.playWarmRhodesChord(chords[bar], time, 1.3, 0.10);
    }

    // Flow-State High Arpeggios (Calm thought-inspiring focus notes)
    const arpNotes: { [key: number]: number } = {
      2: 659.25, // E5
      5: 783.99, // G5
      8: 880.0,  // A5
      11: 987.77, // B5
      14: 1046.5, // C6
      18: 698.46, // F5
      21: 880.0,
      24: 1046.5,
      27: 1318.5, // E6
      34: 587.33, // D5
      37: 698.46,
      40: 880.0,
      43: 1174.66, // D6
      50: 659.25,
      53: 783.99,
      56: 987.77,
      59: 1174.66,
      62: 987.77,
    };

    if (arpNotes[step]) {
      this.playSoftBell(arpNotes[step], time, 0.07);
    }
  }

  // =========================================================================
  // SYNTHESIS TIMBRES & INSTRUMENT HELPERS
  // =========================================================================

  private playWarmRhodesChord(frequencies: number[], time: number, duration: number, gainAmt: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    frequencies.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      // Sine wave with low-pass warm filter
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);
      filter.frequency.exponentialRampToValueAtTime(350, time + duration);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(gainAmt / frequencies.length, time + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmMasterGain!);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  private playWarmBass(freq: number, time: number, duration: number, gainAmt: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmMasterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private playSoftBell(freq: number, time: number, gainAmt: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, time);
    filter.Q.setValueAtTime(3.0, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(gainAmt, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmMasterGain);

    osc.start(time);
    osc.stop(time + 0.8);
  }

  private playLofiKick(time: number, gainAmt: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.16);

    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    osc.connect(gain);
    gain.connect(this.bgmMasterGain);

    osc.start(time);
    osc.stop(time + 0.18);
  }

  private playLofiSnareRim(time: number, gainAmt: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    // Filtered noise click for gentle rimshot
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.setValueAtTime(2.0, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmMasterGain);

    noise.start(time);
    noise.stop(time + 0.07);
  }

  private playSoftBrushHiHat(time: number, gainAmt: number) {
    if (!this.ctx || !this.bgmMasterGain) return;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.035);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainAmt, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmMasterGain);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  // =========================================================================
  // SOUND EFFECTS (SFX)
  // =========================================================================

  playButtonClick() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  playCorrectAnswer() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  playWrongAnswer() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {
      // Ignore
    }
  }

  playPlayerAttack() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.24, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Ignore
    }
  }

  playBossAttack() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  playHit() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }

  playTimerWarning() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  }

  playVictory() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [
        { f: 523.25, t: 0.0, d: 0.12 }, // C5
        { f: 523.25, t: 0.14, d: 0.12 },
        { f: 523.25, t: 0.28, d: 0.12 },
        { f: 659.25, t: 0.42, d: 0.28 }, // E5
        { f: 587.33, t: 0.72, d: 0.14 }, // D5
        { f: 659.25, t: 0.88, d: 0.14 }, // E5
        { f: 783.99, t: 1.04, d: 0.55 }, // G5
      ];
      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);

        gain.gain.setValueAtTime(0, ctx.currentTime + t);
        gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch {
      // Ignore
    }
  }

  playDefeat() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [
        { f: 440, t: 0.0, d: 0.25 }, // A4
        { f: 415.3, t: 0.26, d: 0.25 }, // G#4
        { f: 392.0, t: 0.52, d: 0.25 }, // G4
        { f: 349.23, t: 0.78, d: 0.6 }, // F4
      ];
      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch {
      // Ignore
    }
  }

  playBossDefeat() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundEffectsAndMusic();
