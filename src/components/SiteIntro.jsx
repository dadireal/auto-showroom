import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward, Play } from 'lucide-react';

/**
 * Enhanced Web Audio Engine Starter Synthesizer (Fallback & Dynamic Audio)
 * Accurately models starter motor cranking compression strokes (chug-chug-chug),
 * ignition combustion explosion, violent V8 throttle flare, and Doppler stereo flyby.
 */
class EngineStarterSound {
  constructor() {
    this.ctx = null;
    this.panner = null;
    this.masterGain = null;
    this.audioElement = null;
  }

  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      if (this.ctx.createStereoPanner) {
        this.panner = this.ctx.createStereoPanner();
        this.panner.pan.setValueAtTime(-0.85, this.ctx.currentTime);
        this.masterGain.connect(this.panner);
        this.panner.connect(this.ctx.destination);
      } else {
        this.masterGain.connect(this.ctx.destination);
      }
      return true;
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
      return false;
    }
  }

  playRealEngineStart(onComplete) {
    // 1. Try playing high-fidelity rendered engine start sound file first
    try {
      if (!this.audioElement) {
        this.audioElement = new Audio('/sounds/engine_start.wav');
        this.audioElement.volume = 0.9;
      }
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (onComplete) {
            this.audioElement.onended = onComplete;
          }
        }).catch((err) => {
          console.log('Audio autoplay prevented, falling back to Web Audio synthesis:', err);
          this.synthesizeEngineStart();
        });
        return;
      }
    } catch (e) {
      console.log('Falling back to synthesis:', e);
    }

    // 2. Fallback to full real-time Web Audio API synthesis
    this.synthesizeEngineStart();
  }

  synthesizeEngineStart() {
    if (!this.ctx) {
      if (!this.init()) return;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const duration = 3.6;
    const endT = t + duration;

    // Pan across stereo stage
    if (this.panner) {
      this.panner.pan.setValueAtTime(-0.85, t);
      this.panner.pan.setValueAtTime(-0.85, t + 1.2);
      this.panner.pan.linearRampToValueAtTime(0, t + 2.1);
      this.panner.pan.linearRampToValueAtTime(1.0, endT);
    }

    // A. Starter Motor Whine & 5 Compression Cranks (t=0.15s to 1.1s)
    const starterOsc = this.ctx.createOscillator();
    const starterGain = this.ctx.createGain();
    starterOsc.type = 'sine';
    starterOsc.frequency.setValueAtTime(520, t + 0.15);
    starterOsc.frequency.exponentialRampToValueAtTime(460, t + 0.95);

    starterGain.gain.setValueAtTime(0.01, t);
    starterGain.gain.linearRampToValueAtTime(0.18, t + 0.25);
    starterGain.gain.linearRampToValueAtTime(0.22, t + 0.95);
    starterGain.gain.exponentialRampToValueAtTime(0.001, t + 1.15);

    starterOsc.connect(starterGain);
    starterGain.connect(this.masterGain);
    starterOsc.start(t + 0.15);
    starterOsc.stop(t + 1.15);

    // Compression Crank Thumps (chug-chug-chug at 6Hz)
    const crankTimes = [0.22, 0.38, 0.54, 0.70, 0.88];
    crankTimes.forEach(ct => {
      const crankOsc = this.ctx.createOscillator();
      const crankGain = this.ctx.createGain();
      crankOsc.type = 'triangle';
      crankOsc.frequency.setValueAtTime(80, t + ct);
      crankOsc.frequency.exponentialRampToValueAtTime(45, t + ct + 0.12);

      crankGain.gain.setValueAtTime(0.5, t + ct);
      crankGain.exponentialRampToValueAtTime(0.001, t + ct + 0.12);

      crankOsc.connect(crankGain);
      crankGain.connect(this.masterGain);
      crankOsc.start(t + ct);
      crankOsc.stop(t + ct + 0.13);
    });

    // B. Ignition Explosive Combustion Pop (t=1.05s)
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'sawtooth';
    popOsc.frequency.setValueAtTime(110, t + 1.05);
    popOsc.frequency.exponentialRampToValueAtTime(45, t + 1.35);

    popGain.gain.setValueAtTime(0.7, t + 1.05);
    popGain.gain.exponentialRampToValueAtTime(0.001, t + 1.35);

    popOsc.connect(popGain);
    popGain.connect(this.masterGain);
    popOsc.start(t + 1.05);
    popOsc.stop(t + 1.35);

    // C. V8 Supercar Throttle Flare & Roar (t=1.1s to endT)
    const v8Osc1 = this.ctx.createOscillator();
    const v8Osc2 = this.ctx.createOscillator();
    const v8Sub = this.ctx.createOscillator();
    const v8Gain = this.ctx.createGain();

    v8Osc1.type = 'sawtooth';
    v8Osc2.type = 'triangle';
    v8Sub.type = 'sine';

    // Aggressive V8 RPM rev flare:
    // 1.1s: Catches at 95Hz
    // 1.8s: Rev flares to 380Hz (initial rev blip)
    // 2.2s: Gear shifts down to 260Hz
    // 3.4s: Screams to 450Hz redline
    v8Osc1.frequency.setValueAtTime(95, t + 1.1);
    v8Osc2.frequency.setValueAtTime(190, t + 1.1);
    v8Sub.frequency.setValueAtTime(47.5, t + 1.1);

    v8Osc1.frequency.exponentialRampToValueAtTime(380, t + 1.85);
    v8Osc2.frequency.exponentialRampToValueAtTime(760, t + 1.85);
    v8Sub.frequency.exponentialRampToValueAtTime(190, t + 1.85);

    v8Osc1.frequency.setValueAtTime(260, t + 2.2);
    v8Osc2.frequency.setValueAtTime(520, t + 2.2);
    v8Sub.frequency.setValueAtTime(130, t + 2.2);

    v8Osc1.frequency.exponentialRampToValueAtTime(450, endT);
    v8Osc2.frequency.exponentialRampToValueAtTime(900, endT);
    v8Sub.frequency.exponentialRampToValueAtTime(225, endT);

    // Waveshaper distortion for throaty exhaust growl
    const dist = this.ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = Math.tanh(x * 2.5);
    }
    dist.curve = curve;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, t + 1.1);
    filter.frequency.exponentialRampToValueAtTime(2200, t + 2.2);
    filter.frequency.exponentialRampToValueAtTime(1600, endT);

    v8Gain.gain.setValueAtTime(0.01, t + 1.1);
    v8Gain.gain.linearRampToValueAtTime(0.7, t + 1.35);
    v8Gain.gain.linearRampToValueAtTime(0.85, t + 2.4);
    v8Gain.gain.exponentialRampToValueAtTime(0.001, endT);

    v8Osc1.connect(dist);
    v8Osc2.connect(dist);
    v8Sub.connect(filter);
    dist.connect(filter);
    filter.connect(v8Gain);
    v8Gain.connect(this.masterGain);

    v8Osc1.start(t + 1.1);
    v8Osc2.start(t + 1.1);
    v8Sub.start(t + 1.1);
    v8Osc1.stop(endT);
    v8Osc2.stop(endT);
    v8Sub.stop(endT);
  }

  setMuted(muted) {
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.85, this.ctx.currentTime);
    }
  }

  destroy() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (e) {}
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch (e) {}
    }
  }
}

export default function SiteIntro({ onFinish }) {
  // Animation Stages:
  // 'standby' -> stationary car on left, starter cranking chug-chug
  // 'ignited' -> combustion catch, headlight xenon flash, exhaust flame burst
  // 'speeding' -> hypercar tearing across the screen from left to right with laser trails
  // 'shockwave' -> brand sonic boom reveal
  // 'dissolve' -> smooth fade into showroom
  const [animStage, setAnimStage] = useState('standby');
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const soundEngineRef = useRef(null);

  const startIntroSequence = () => {
    if (hasStarted) return;
    setHasStarted(true);

    if (!soundEngineRef.current) {
      soundEngineRef.current = new EngineStarterSound();
    }

    if (!isMuted) {
      soundEngineRef.current.playRealEngineStart();
    }

    // Timeline:
    // 0.0s: 'standby' (car shakes with starter motor compression cranking)
    setAnimStage('standby');

    // 1.1s: 'ignited' (combustion explosion, headlight flash, exhaust flame)
    setTimeout(() => {
      setAnimStage('ignited');
    }, 1100);

    // 1.4s: 'speeding' (hypercar launches and speeds across screen to right)
    setTimeout(() => {
      setAnimStage('speeding');
    }, 1400);

    // 2.9s: 'shockwave' (brand sonic reveal)
    setTimeout(() => {
      setAnimStage('shockwave');
    }, 2900);

    // 3.9s: 'dissolve' (fade out overlay)
    setTimeout(() => {
      setAnimStage('dissolve');
    }, 3900);

    // 4.4s: Complete and hand over to catalog
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 4400);
  };

  useEffect(() => {
    // Attempt instant auto-start
    const timer = setTimeout(() => {
      startIntroSequence();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (soundEngineRef.current) {
        soundEngineRef.current.destroy();
      }
    };
  }, []);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skipIntro = () => {
    if (soundEngineRef.current) {
      soundEngineRef.current.destroy();
    }
    if (onFinish) onFinish();
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (soundEngineRef.current) {
      soundEngineRef.current.setMuted(nextMute);
    }
  };

  const handleUserTap = () => {
    if (!hasStarted) {
      startIntroSequence();
    } else if (soundEngineRef.current) {
      if (soundEngineRef.current.ctx && soundEngineRef.current.ctx.state === 'suspended') {
        soundEngineRef.current.ctx.resume();
      }
      if (soundEngineRef.current.audioElement && soundEngineRef.current.audioElement.paused) {
        soundEngineRef.current.audioElement.play().catch(() => {});
      }
    }
  };

  return (
    <div
      onClick={handleUserTap}
      onTouchStart={handleUserTap}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#04070E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: animStage === 'dissolve' ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: animStage === 'dissolve' ? 'none' : 'auto',
        userSelect: 'none',
        cursor: 'pointer'
      }}
    >
      {/* 1. Cinematic Radial Lighting Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 45% 55%, rgba(255, 70, 5, 0.12) 0%, rgba(15, 23, 42, 0.6) 45%, #03050A 85%)',
        pointerEvents: 'none'
      }} />

      {/* Grid Floor / Perspective Grid */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '45vh',
        background: 'linear-gradient(180deg, rgba(255, 70, 5, 0.05) 0%, rgba(3, 5, 10, 0.95) 100%)',
        borderTop: '1px solid rgba(255, 70, 5, 0.25)',
        perspective: '600px',
        overflow: 'hidden'
      }}>
        {/* Animated Rushing Speed Road Markings */}
        <div style={{
          position: 'absolute',
          top: '32%',
          left: 0,
          right: 0,
          height: '4px',
          background: 'repeating-linear-gradient(90deg, rgba(255, 107, 0, 0.85) 0, rgba(255, 107, 0, 0.85) 70px, transparent 70px, transparent 150px)',
          animation: animStage === 'speeding' ? 'roadRush 0.28s linear infinite' : 'none',
          boxShadow: '0 0 15px rgba(255, 70, 5, 0.8)'
        }} />

        {/* Dynamic Road Underglow Reflection */}
        <div style={{
          position: 'absolute',
          bottom: '22%',
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(180deg, rgba(255, 70, 5, 0.22) 0%, transparent 100%)',
          filter: 'blur(20px)'
        }} />
      </div>

      {/* 2. Hyper-Speed Laser Ribbons (Taillight & Exhaust Streaks) */}
      {animStage === 'speeding' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
          {/* Laser Taillight Ribbon */}
          <div style={{
            position: 'absolute',
            top: '55.5%',
            left: 0,
            width: '100vw',
            height: '5px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.8) 35%, #FF4605 85%, #FFFFFF 100%)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 1), 0 0 40px rgba(255, 70, 5, 0.7)',
            animation: 'laserStreak 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }} />

          {/* Golden Exhaust Streak */}
          <div style={{
            position: 'absolute',
            top: '60%',
            left: 0,
            width: '100vw',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.9) 45%, #FFFFFF 100%)',
            boxShadow: '0 0 18px rgba(251, 191, 36, 0.9)',
            animation: 'laserStreak 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }} />
        </div>
      )}

      {/* 3. The Perfect Supercar Container */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          // Movement trajectory:
          // 'standby' / 'ignited' -> parked at left side: left 4%
          // 'speeding' -> rockets all the way off the right side: 130vw
          left: animStage === 'standby' || animStage === 'ignited' ? '4%' : '130vw',
          transform: `translateY(-50%) ${animStage === 'standby' ? 'scale(1)' : 'scale(1)'}`,
          transition: animStage === 'speeding' ? 'left 1.55s cubic-bezier(0.38, 0.05, 0.15, 1)' : 'left 0.2s ease',
          zIndex: 25,
          pointerEvents: 'none',
          animation: animStage === 'standby' ? 'crankVibration 0.16s ease-in-out infinite' : animStage === 'ignited' ? 'igniteBuck 0.3s ease-out' : 'none'
        }}
      >
        <div style={{ position: 'relative', width: 'clamp(460px, 48vw, 680px)' }}>
          {/* Volumetric Xenon Headlight Beam Projection */}
          <div style={{
            position: 'absolute',
            right: '-380px',
            top: '36%',
            width: '440px',
            height: '140px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(147, 197, 253, 0.6) 25%, rgba(56, 189, 248, 0.15) 60%, transparent 100%)',
            clipPath: 'polygon(0 42%, 100% 0, 100% 100%, 0 62%)',
            filter: 'blur(5px)',
            opacity: animStage === 'standby' ? 0.35 : 0.95,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            zIndex: 10
          }} />

          {/* Headlight Flare Glow */}
          <div style={{
            position: 'absolute',
            right: '25px',
            top: '48%',
            width: '50px',
            height: '50px',
            background: 'radial-gradient(circle, #FFFFFF 0%, #38BDF8 50%, transparent 75%)',
            filter: 'blur(6px)',
            opacity: animStage === 'standby' ? 0.4 : 1,
            pointerEvents: 'none',
            zIndex: 15
          }} />

          {/* Exhaust Flame Tongues (Flicker on Ignition & Launch) */}
          {(animStage === 'ignited' || animStage === 'speeding') && (
            <div style={{
              position: 'absolute',
              left: '-45px',
              bottom: '26%',
              width: '65px',
              height: '24px',
              background: 'radial-gradient(ellipse at right, #FFFFFF 0%, #FBBF24 25%, #FF4605 60%, transparent 90%)',
              filter: 'blur(2px) drop-shadow(0 0 12px #FF4605)',
              clipPath: 'polygon(100% 25%, 0% 48%, 100% 75%)',
              animation: 'flameFlicker 0.08s infinite alternate',
              zIndex: 8
            }} />
          )}

          {/* Tire Launch Smoke Particles */}
          {(animStage === 'ignited' || animStage === 'speeding') && (
            <div style={{
              position: 'absolute',
              left: '60px',
              bottom: '10%',
              width: '120px',
              height: '45px',
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.45) 0%, rgba(255, 70, 5, 0.25) 45%, transparent 75%)',
              filter: 'blur(12px)',
              animation: 'smokePuff 0.6s ease-out forwards',
              zIndex: 6
            }} />
          )}

          {/* The High-End Exotic Hypercar (High-Res Render with Screen Blending) */}
          <img
            src="/intro_supercar.jpg"
            alt="Showroom Exotic Hypercar"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              mixBlendMode: 'screen',
              filter: animStage === 'ignited' || animStage === 'speeding' 
                ? 'drop-shadow(0 0 25px rgba(255, 70, 5, 0.7)) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9)) brightness(1.08)' 
                : 'drop-shadow(0 0 15px rgba(255, 70, 5, 0.35)) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9)) brightness(0.92)',
              transition: 'filter 0.25s ease'
            }}
          />
        </div>
      </div>

      {/* 4. Engine Ignition Prompt (If user interaction needed) */}
      {!hasStarted && (
        <div style={{
          position: 'absolute',
          bottom: '22%',
          zIndex: 60,
          textAlign: 'center'
        }}>
          <button
            onClick={startIntroSequence}
            style={{
              height: '52px',
              padding: '0 28px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #FF4605 0%, #FF7847 100%)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 35px rgba(255, 70, 5, 0.65), 0 8px 25px rgba(0, 0, 0, 0.6)',
              cursor: 'pointer',
              animation: 'pulseGlow 1.5s infinite',
              letterSpacing: '0.04em'
            }}
          >
            <Play size={18} fill="#FFFFFF" />
            <span>START ENGINE V8</span>
          </button>
        </div>
      )}

      {/* 5. Shockwave Sonic Brand Reveal */}
      {(animStage === 'shockwave' || animStage === 'dissolve') && (
        <div style={{
          position: 'relative',
          zIndex: 50,
          textAlign: 'center',
          animation: 'shockwaveIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Glowing Radial Halo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255, 70, 5, 0.3) 0%, rgba(251, 191, 36, 0.12) 45%, transparent 75%)',
            pointerEvents: 'none',
            filter: 'blur(35px)'
          }} />

          {/* Subtitle Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 70, 5, 0.16)',
            border: '1px solid rgba(255, 70, 5, 0.45)',
            borderRadius: '9999px',
            padding: '6px 20px',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#FF7847',
            marginBottom: '16px'
          }}>
            <span>PORTAIL AUTOMOBILE SHOWROOM</span>
          </div>

          {/* Massive Brand Heading */}
          <h1 style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 4.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: 0,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #F1F5F9 50%, #94A3B8 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 50px rgba(255, 70, 5, 0.35)'
          }}>
            SHOWROOM AUTO
          </h1>

          <p style={{
            color: '#FBBF24',
            fontSize: '1.05rem',
            fontWeight: 700,
            marginTop: '14px',
            letterSpacing: '0.05em'
          }}>
            Algérie · Véhicules 00 km & Occasions Certifiées
          </p>
        </div>
      )}

      {/* 6. Top Right Controls (Sound & Skip) */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 100
      }}>
        {/* Sound Toggle Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          style={{
            height: '38px',
            padding: '0 14px',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: isMuted ? '#94A3B8' : '#FBBF24',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
          }}
          title={isMuted ? 'Activer le son du moteur' : 'Couper le son'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? 'Muted' : 'V8 Engine'}</span>
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={(e) => { e.stopPropagation(); skipIntro(); }}
          style={{
            height: '38px',
            padding: '0 16px',
            borderRadius: '10px',
            background: 'rgba(255, 70, 5, 0.2)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 70, 5, 0.45)',
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 15px rgba(255, 70, 5, 0.25)'
          }}
        >
          <span>Passer [ESC]</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes roadRush {
          0% { background-position: 0 0; }
          100% { background-position: -300px 0; }
        }
        @keyframes crankVibration {
          0% { transform: translateY(-50%) translate(0, 0); }
          25% { transform: translateY(-50%) translate(1.5px, -1px); }
          50% { transform: translateY(-50%) translate(-1px, 1.5px); }
          75% { transform: translateY(-50%) translate(1px, 0.5px); }
          100% { transform: translateY(-50%) translate(0, 0); }
        }
        @keyframes igniteBuck {
          0% { transform: translateY(-50%) scale(1); }
          40% { transform: translateY(-52%) scale(1.03); }
          100% { transform: translateY(-50%) scale(1); }
        }
        @keyframes flameFlicker {
          0% { transform: scaleX(0.8) scaleY(0.9); opacity: 0.85; }
          100% { transform: scaleX(1.3) scaleY(1.15); opacity: 1; }
        }
        @keyframes smokePuff {
          0% { transform: scale(0.4); opacity: 0.7; }
          100% { transform: scale(1.4) translate(-40px, -15px); opacity: 0; }
        }
        @keyframes laserStreak {
          0% { transform: scaleX(0); transform-origin: left; opacity: 0; }
          40% { transform: scaleX(1); transform-origin: left; opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes shockwaveIn {
          0% { transform: scale(0.85); opacity: 0; filter: blur(12px); }
          50% { transform: scale(1.03); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(255, 70, 5, 0.6); }
          50% { transform: scale(1.04); box-shadow: 0 0 45px rgba(255, 70, 5, 0.9); }
        }
      `}</style>
    </div>
  );
}
