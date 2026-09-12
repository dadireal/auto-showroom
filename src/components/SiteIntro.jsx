import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward, Play } from 'lucide-react';

/**
 * Web Audio API Engine Sound Synthesizer
 * Generates an authentic high-revving sports car V8 engine sound with Doppler effect,
 * stereo panning from left to right, gear shift drop, and exhaust turbo blow-off.
 */
class EngineSound {
  constructor() {
    this.ctx = null;
    this.panner = null;
    this.masterGain = null;
    this.isRunning = false;
  }

  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      if (this.ctx.createStereoPanner) {
        this.panner = this.ctx.createStereoPanner();
        this.panner.pan.setValueAtTime(-0.95, this.ctx.currentTime);
        this.masterGain.connect(this.panner);
        this.panner.connect(this.ctx.destination);
      } else {
        this.masterGain.connect(this.ctx.destination);
      }
      return true;
    } catch (e) {
      console.warn('Web Audio not supported:', e);
      return false;
    }
  }

  playRoar(duration = 2.8) {
    if (!this.ctx) {
      if (!this.init()) return;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const endT = t + duration;

    // 1. Stereo Panning from Left (-1) to Right (+1) as car speeds past
    if (this.panner) {
      this.panner.pan.setValueAtTime(-1, t);
      this.panner.pan.linearRampToValueAtTime(0, t + duration * 0.48);
      this.panner.pan.linearRampToValueAtTime(1, endT);
    }

    // 2. Primary V8 Cylinder Oscillators (Sawtooth & Square for mechanical rasp)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc3.type = 'sawtooth';

    // Distortion / WaveShaper for growling exhaust bite
    const distortion = this.ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = ((3 + 20) * x * 20 * (Math.PI / 180)) / (Math.PI + 20 * Math.abs(x));
    }
    distortion.curve = curve;
    distortion.oversample = '2x';

    // Lowpass filter for deep throaty rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.exponentialRampToValueAtTime(1600, t + duration * 0.5);
    filter.frequency.exponentialRampToValueAtTime(2200, endT);

    // RPM Acceleration curve (Idle -> Launch -> 1st Gear -> Shift -> 2nd Gear Redline)
    // t=0: Idle revs at 90Hz
    osc1.frequency.setValueAtTime(85, t);
    osc2.frequency.setValueAtTime(170, t);
    osc3.frequency.setValueAtTime(42.5, t);

    // Launch & Rapid Accelerate
    osc1.frequency.exponentialRampToValueAtTime(320, t + duration * 0.38);
    osc2.frequency.exponentialRampToValueAtTime(640, t + duration * 0.38);
    osc3.frequency.exponentialRampToValueAtTime(160, t + duration * 0.38);

    // Gear shift drop (t + duration * 0.42)
    osc1.frequency.setValueAtTime(210, t + duration * 0.43);
    osc2.frequency.setValueAtTime(420, t + duration * 0.43);
    osc3.frequency.setValueAtTime(105, t + duration * 0.43);

    // 2nd Gear screaming climb to redline
    osc1.frequency.exponentialRampToValueAtTime(460, endT);
    osc2.frequency.exponentialRampToValueAtTime(920, endT);
    osc3.frequency.exponentialRampToValueAtTime(230, endT);

    // Engine Volume envelope
    const engineGain = this.ctx.createGain();
    engineGain.gain.setValueAtTime(0.01, t);
    engineGain.gain.linearRampToValueAtTime(0.55, t + 0.25);
    engineGain.gain.linearRampToValueAtTime(0.75, t + duration * 0.5);
    engineGain.gain.exponentialRampToValueAtTime(0.001, endT);

    // Connect Engine
    osc1.connect(distortion);
    osc2.connect(distortion);
    osc3.connect(distortion);
    distortion.connect(filter);
    filter.connect(engineGain);
    engineGain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc3.start(t);
    osc1.stop(endT);
    osc2.stop(endT);
    osc3.stop(endT);

    // 3. Airflow, Doppler Whoosh & Turbo Spool (White Noise Buffer)
    const bufferSize = this.ctx.sampleRate * duration;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(300, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(1800, t + duration * 0.5);
    noiseFilter.frequency.exponentialRampToValueAtTime(600, endT);
    noiseFilter.Q.setValueAtTime(2.5, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, t);
    noiseGain.gain.linearRampToValueAtTime(0.4, t + duration * 0.48);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, endT);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoise.start(t);
    whiteNoise.stop(endT);
  }

  setMuted(muted) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  destroy() {
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch (e) {}
    }
  }
}

export default function SiteIntro({ onFinish }) {
  const [animStage, setAnimStage] = useState('ready'); // 'ready' | 'speeding' | 'shockwave' | 'dissolve'
  const [isMuted, setIsMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const engineRef = useRef(null);

  const startAnimation = (withSound = true) => {
    setNeedsGesture(false);
    setAnimStage('speeding');

    if (!engineRef.current) {
      engineRef.current = new EngineSound();
    }

    if (withSound && !isMuted) {
      try {
        engineRef.current.playRoar(2.8);
      } catch (e) {
        console.log('Audio requires interaction:', e);
      }
    }

    // Timeline:
    // 0.0s: Car launches from Left
    // 1.8s: Car zooms past Screen Right with exhaust trails
    // 2.0s: Shockwave & Luxury Brand Reveal
    // 3.2s: Dissolve into Website
    setTimeout(() => {
      setAnimStage('shockwave');
    }, 1850);

    setTimeout(() => {
      setAnimStage('dissolve');
    }, 2850);

    setTimeout(() => {
      if (onFinish) onFinish();
    }, 3350);
  };

  useEffect(() => {
    // Attempt auto-start
    const timer = setTimeout(() => {
      startAnimation(true);
    }, 350);

    return () => {
      clearTimeout(timer);
      if (engineRef.current) {
        engineRef.current.destroy();
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
    if (engineRef.current) {
      engineRef.current.destroy();
    }
    if (onFinish) onFinish();
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (engineRef.current) {
      if (engineRef.current.ctx && engineRef.current.ctx.state === 'suspended') {
        engineRef.current.ctx.resume();
      }
      engineRef.current.setMuted(nextMute);
    }
  };

  const handleUserTap = () => {
    if (engineRef.current && engineRef.current.ctx && engineRef.current.ctx.state === 'suspended') {
      engineRef.current.ctx.resume().catch(e => console.log(e));
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
        background: '#05070E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: animStage === 'dissolve' ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: animStage === 'dissolve' ? 'none' : 'auto',
        userSelect: 'none',
        cursor: 'default'
      }}
    >
      {/* 1. Cinematic Background Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 70, 5, 0.08) 0%, rgba(5, 7, 14, 0.98) 75%)',
        pointerEvents: 'none'
      }} />

      {/* 2. Speed Perspective Asphalt Road with rushing neon markers */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '42vh',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, #030509 100%)',
        borderTop: '1px solid rgba(255, 70, 5, 0.2)',
        overflow: 'hidden'
      }}>
        {/* Road Center Line rushing backwards */}
        <div style={{
          position: 'absolute',
          top: '35%',
          left: 0,
          right: 0,
          height: '3px',
          background: 'repeating-linear-gradient(90deg, rgba(255, 107, 0, 0.8) 0, rgba(255, 107, 0, 0.8) 60px, transparent 60px, transparent 130px)',
          animation: animStage === 'speeding' ? 'roadRush 0.35s linear infinite' : 'none',
          boxShadow: '0 0 12px rgba(255, 70, 5, 0.7)'
        }} />

        {/* Reflection glow under car */}
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(180deg, rgba(255, 70, 5, 0.12) 0%, transparent 100%)',
          filter: 'blur(10px)'
        }} />
      </div>

      {/* 3. Horizontal Light Laser Speed Trails (Taillights & Xenon streaks) */}
      {animStage === 'speeding' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10
        }}>
          {/* Crimson Red Taillight Ribbon Trail */}
          <div style={{
            position: 'absolute',
            top: '59%',
            left: 0,
            width: '100vw',
            height: '4px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.9) 30%, rgba(255, 70, 5, 1) 85%, #FFFFFF 100%)',
            boxShadow: '0 0 18px rgba(239, 68, 68, 0.9), 0 0 35px rgba(255, 70, 5, 0.6)',
            animation: 'laserStreak 1.8s cubic-bezier(0.4, 0, 0.1, 1) forwards'
          }} />

          {/* Golden Exhaust Flame Glow Trail */}
          <div style={{
            position: 'absolute',
            top: '63%',
            left: 0,
            width: '100vw',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.8) 40%, #FFF 100%)',
            boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
            animation: 'laserStreak 1.8s cubic-bezier(0.4, 0, 0.1, 1) forwards'
          }} />
        </div>
      )}

      {/* 4. The High-Speed Supercar Object */}
      <div 
        style={{
          position: 'absolute',
          top: '46%',
          left: animStage === 'ready' ? '-450px' : animStage === 'speeding' ? '125vw' : '125vw',
          transform: 'translateY(-50%)',
          transition: animStage === 'speeding' ? 'left 1.95s cubic-bezier(0.32, 0.05, 0.15, 1)' : 'none',
          zIndex: 20,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.9))'
        }}
      >
        <div style={{ position: 'relative', width: '380px', height: '140px' }}>
          {/* Volumetric Xenon Headlight Beam cone cutting into darkness */}
          <div style={{
            position: 'absolute',
            right: '-360px',
            top: '40px',
            width: '380px',
            height: '110px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.85) 0%, rgba(147, 197, 253, 0.4) 30%, transparent 100%)',
            clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 65%)',
            filter: 'blur(3px)',
            opacity: 0.9,
            pointerEvents: 'none'
          }} />

          {/* Sports Car Vector Silhouette */}
          <svg viewBox="0 0 500 180" width="380" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="35%" stopColor="#334155" />
                <stop offset="70%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#090D16" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <linearGradient id="wheelRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Aerodynamic GT Rear Wing */}
            <path d="M 25 65 L 75 60 L 78 72 L 35 74 Z" fill="#0B0F19" stroke="#FF4605" strokeWidth="1.2" />
            <path d="M 45 74 L 52 95 L 60 95 L 56 74 Z" fill="#1E293B" />

            {/* Supercar Main Body Aerodynamic Shell */}
            <path 
              d="M 35 110 C 40 85 70 82 110 80 C 160 78 210 52 260 50 C 330 48 375 75 420 95 C 460 102 485 112 490 120 C 495 128 480 135 440 136 C 430 136 410 115 375 115 C 340 115 320 136 300 136 C 240 136 210 136 170 136 C 150 136 135 115 100 115 C 65 115 50 136 38 136 C 30 136 22 130 25 120 Z" 
              fill="url(#bodyGrad)" 
              stroke="rgba(255, 255, 255, 0.4)" 
              strokeWidth="1.5"
            />

            {/* Cockpit Canopy & Windshield Tint */}
            <path 
              d="M 180 78 C 220 54 260 52 320 52 C 355 52 385 75 405 85 L 290 85 C 240 85 200 80 180 78 Z" 
              fill="url(#roofGrad)" 
              stroke="#64748B" 
              strokeWidth="1"
            />

            {/* Side Intake Vent & Character Line */}
            <path d="M 180 98 L 260 98 L 245 116 L 175 116 Z" fill="#030712" stroke="#FF6B00" strokeWidth="1" />

            {/* LED Headlight (Pure White Diamond Beam) */}
            <polygon points="460,110 485,115 470,122" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />
            <circle cx="478" cy="116" r="3" fill="#FFFFFF" filter="drop-shadow(0 0 10px #FFFFFF)" />

            {/* LED Taillight Strip (Crimson Red Laser) */}
            <path d="M 28 108 L 65 106" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 8px #EF4444)" />

            {/* Twin Exhaust Pipes Spitting Nitro Flames */}
            <circle cx="24" cy="126" r="5" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
            <ellipse cx="12" cy="126" rx="14" ry="4" fill="#FF4605" filter="drop-shadow(0 0 10px #FF4605)" />
            <ellipse cx="6" cy="126" rx="8" ry="2.5" fill="#FDE047" />

            {/* Front Wheel with Spinning Rim */}
            <g transform="translate(375, 126)">
              <circle cx="0" cy="0" r="26" fill="#0B0F19" stroke="#334155" strokeWidth="3" />
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="url(#wheelRim)" strokeWidth="2.5" />
              {/* Brake Caliper (Brembo Gold) */}
              <path d="M -12 -8 A 15 15 0 0 1 -4 -15" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              {/* Spinning Spokes */}
              <circle cx="0" cy="0" r="7" fill="#F8FAFC" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 2" />
            </g>

            {/* Rear Wheel with Spinning Rim */}
            <g transform="translate(100, 126)">
              <circle cx="0" cy="0" r="26" fill="#0B0F19" stroke="#334155" strokeWidth="3" />
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="url(#wheelRim)" strokeWidth="2.5" />
              {/* Brake Caliper (Brembo Gold) */}
              <path d="M -12 -8 A 15 15 0 0 1 -4 -15" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              {/* Spinning Spokes */}
              <circle cx="0" cy="0" r="7" fill="#F8FAFC" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 2" />
            </g>
          </svg>
        </div>
      </div>

      {/* 5. Shockwave & Center Brand Reveal */}
      {(animStage === 'shockwave' || animStage === 'dissolve') && (
        <div style={{
          position: 'relative',
          zIndex: 50,
          textAlign: 'center',
          animation: 'shockwaveIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Glowing Radial Halo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(255, 70, 5, 0.25) 0%, rgba(251, 191, 36, 0.1) 40%, transparent 75%)',
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }} />

          {/* Subtitle Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 70, 5, 0.15)',
            border: '1px solid rgba(255, 70, 5, 0.45)',
            borderRadius: '9999px',
            padding: '5px 16px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#FF7847',
            marginBottom: '16px'
          }}>
            <span>PORTAIL AUTOMOBILE SHOWROOM</span>
          </div>

          {/* Massive Luxury Brand Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: 0,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #E2E8F0 50%, #94A3B8 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
          }}>
            SHOWROOM AUTO
          </h1>

          <p style={{
            color: '#FBBF24',
            fontSize: '1rem',
            fontWeight: 700,
            marginTop: '12px',
            letterSpacing: '0.05em'
          }}>
            Algérie · Véhicules 00 km & Occasions Certifiées
          </p>
        </div>
      )}

      {/* 6. Top Right Controls (Mute & Skip) */}
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
          onClick={toggleMute}
          style={{
            height: '38px',
            padding: '0 14px',
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.8)',
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
          title={isMuted ? 'Activer le son' : 'Couper le son'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? 'Muted' : 'V8 Sound'}</span>
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={skipIntro}
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

      {/* CSS Keyframes for Intro Animation */}
      <style>{`
        @keyframes roadRush {
          0% { background-position: 0 0; }
          100% { background-position: -260px 0; }
        }
        @keyframes laserStreak {
          0% { transform: scaleX(0); transform-origin: left; opacity: 0; }
          40% { transform: scaleX(1); transform-origin: left; opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes shockwaveIn {
          0% { transform: scale(0.85); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1.03); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
      `}</style>
    </div>
  );
}
