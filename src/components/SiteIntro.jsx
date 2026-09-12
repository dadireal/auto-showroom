import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward, Play } from 'lucide-react';

/**
 * Real Car Engine Audio Controller
 * Uses authentic recordings of actual sports car engine ignition and acceleration:
 * - sfx_engine_start.mp3: Real starter motor crank + ignition catch!
 * - sfx_sports_car_speeding.mp3: Real high-performance sports car screaming acceleration & flyby!
 */
class RealEngineAudioPlayer {
  constructor() {
    this.startAudio = null;
    this.speedAudio = null;
    this.isMuted = false;
  }

  init() {
    try {
      this.startAudio = new Audio('/sounds/sfx_engine_start.mp3');
      this.startAudio.volume = 0.95;
      this.speedAudio = new Audio('/sounds/sfx_sports_car_speeding.mp3');
      this.speedAudio.volume = 0.95;
    } catch (e) {
      console.warn('Audio init error:', e);
    }
  }

  play() {
    if (this.isMuted) return;
    if (!this.startAudio) this.init();

    // 1. Play real engine starter cranking and firing up
    try {
      this.startAudio.currentTime = 0;
      this.startAudio.play().catch(e => console.log('Autoplay deferred:', e));
    } catch (e) {}

    // 2. Play real sports car roaring acceleration as car rockets across
    setTimeout(() => {
      if (this.isMuted) return;
      try {
        if (this.speedAudio) {
          this.speedAudio.currentTime = 0;
          this.speedAudio.play().catch(e => console.log(e));
        }
      } catch (e) {}
    }, 1150);
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.startAudio) this.startAudio.muted = muted;
    if (this.speedAudio) this.speedAudio.muted = muted;
  }

  destroy() {
    if (this.startAudio) {
      try {
        this.startAudio.pause();
        this.startAudio.currentTime = 0;
      } catch (e) {}
    }
    if (this.speedAudio) {
      try {
        this.speedAudio.pause();
        this.speedAudio.currentTime = 0;
      } catch (e) {}
    }
  }
}

export default function SiteIntro({ onFinish }) {
  // Animation Stages:
  // 'standby' -> car stationary on left, starter cranking vibration
  // 'ignited' -> real engine catches, headlights brighten, exhaust flame bursts
  // 'speeding' -> supercar rockets across screen from left to right with speed trails
  // 'shockwave' -> brand sonic reveal
  // 'dissolve' -> smooth fade into showroom
  const [animStage, setAnimStage] = useState('standby');
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioPlayerRef = useRef(null);

  const startIntroSequence = () => {
    if (hasStarted) return;
    setHasStarted(true);

    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new RealEngineAudioPlayer();
      audioPlayerRef.current.init();
    }

    if (!isMuted) {
      audioPlayerRef.current.play();
    }

    // Stage 0: Standby & Cranking (0.0s)
    setAnimStage('standby');

    // Stage 1: Engine Catch & Ignition (1.1s)
    setTimeout(() => {
      setAnimStage('ignited');
    }, 1100);

    // Stage 2: Speeding Launch Across Screen (1.35s)
    setTimeout(() => {
      setAnimStage('speeding');
    }, 1350);

    // Stage 3: Sonic Shockwave Brand Reveal (2.9s)
    setTimeout(() => {
      setAnimStage('shockwave');
    }, 2900);

    // Stage 4: Dissolve into Website (3.9s)
    setTimeout(() => {
      setAnimStage('dissolve');
    }, 3900);

    // Stage 5: Handover to Showroom (4.4s)
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
      if (audioPlayerRef.current) {
        audioPlayerRef.current.destroy();
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
    if (audioPlayerRef.current) {
      audioPlayerRef.current.destroy();
    }
    if (onFinish) onFinish();
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setMuted(nextMute);
    }
  };

  const handleUserTap = () => {
    if (!hasStarted) {
      startIntroSequence();
    } else if (audioPlayerRef.current) {
      if (audioPlayerRef.current.startAudio && audioPlayerRef.current.startAudio.paused && !isMuted) {
        audioPlayerRef.current.play();
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
        cursor: 'default'
      }}
    >
      {/* 1. Cinematic Radial Lighting Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 45% 50%, rgba(255, 70, 5, 0.14) 0%, rgba(15, 23, 42, 0.6) 45%, #03050A 85%)',
        pointerEvents: 'none'
      }} />

      {/* 2. Realistic Asphalt Highway Road */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '28vh',
        background: 'linear-gradient(180deg, #070B14 0%, #030509 100%)',
        borderTop: '1px solid rgba(255, 70, 5, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Animated Dashed Center Road Line Under Wheels */}
        <div style={{
          position: 'absolute',
          bottom: '32%',
          left: 0,
          right: 0,
          height: '4px',
          background: 'repeating-linear-gradient(90deg, rgba(255, 107, 0, 0.85) 0, rgba(255, 107, 0, 0.85) 70px, transparent 70px, transparent 150px)',
          animation: animStage === 'speeding' ? 'roadRush 0.25s linear infinite' : 'none',
          boxShadow: '0 0 14px rgba(255, 70, 5, 0.7)'
        }} />

        {/* Dynamic Road Underglow Reflection */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(180deg, rgba(255, 70, 5, 0.18) 0%, transparent 100%)',
          filter: 'blur(15px)'
        }} />
      </div>

      {/* 3. Hyper-Speed Laser Ribbons (Taillight & Exhaust Streaks) */}
      {animStage === 'speeding' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12 }}>
          {/* Laser Crimson Taillight Ribbon */}
          <div style={{
            position: 'absolute',
            bottom: '22vh',
            left: 0,
            width: '100vw',
            height: '4px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.8) 35%, #FF4605 85%, #FFFFFF 100%)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 1), 0 0 40px rgba(255, 70, 5, 0.7)',
            animation: 'laserStreak 1.45s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }} />

          {/* Golden Exhaust Flame Streak */}
          <div style={{
            position: 'absolute',
            bottom: '20.5vh',
            left: 0,
            width: '100vw',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.9) 45%, #FFFFFF 100%)',
            boxShadow: '0 0 18px rgba(251, 191, 36, 0.9)',
            animation: 'laserStreak 1.45s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }} />
        </div>
      )}

      {/* 4. The Perfect Supercar (Pure Transparent Cut-Out, Zero Borders) */}
      <div
        style={{
          position: 'absolute',
          bottom: '16vh',
          // Movement trajectory:
          // 'standby' / 'ignited' -> poised on left side: left 3%
          // 'speeding' -> rockets all the way off the right side: 125vw
          left: animStage === 'standby' || animStage === 'ignited' ? '3%' : '125vw',
          transition: animStage === 'speeding' ? 'left 1.55s cubic-bezier(0.38, 0.05, 0.15, 1)' : 'left 0.2s ease',
          zIndex: 25,
          pointerEvents: 'none',
          animation: animStage === 'standby' ? 'crankVibration 0.15s ease-in-out infinite' : animStage === 'ignited' ? 'igniteBuck 0.25s ease-out' : 'none'
        }}
      >
        <div style={{ position: 'relative', width: 'clamp(440px, 48vw, 660px)' }}>
          {/* Volumetric Xenon Headlight Beam Projection */}
          <div style={{
            position: 'absolute',
            left: '94%',
            top: '46%',
            width: '420px',
            height: '110px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(147, 197, 253, 0.5) 25%, rgba(56, 189, 248, 0.1) 65%, transparent 100%)',
            clipPath: 'polygon(0 35%, 100% 0, 100% 100%, 0 65%)',
            filter: 'blur(4px)',
            opacity: animStage === 'standby' ? 0.35 : 0.95,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            zIndex: 10
          }} />

          {/* Headlight Crystal Flare Glow */}
          <div style={{
            position: 'absolute',
            left: '92%',
            top: '48%',
            width: '35px',
            height: '35px',
            background: 'radial-gradient(circle, #FFFFFF 0%, #38BDF8 60%, transparent 80%)',
            filter: 'blur(4px)',
            opacity: animStage === 'standby' ? 0.4 : 1,
            pointerEvents: 'none',
            zIndex: 15
          }} />

          {/* Exhaust Flame Burst (Flickers on Ignition & Launch) */}
          {(animStage === 'ignited' || animStage === 'speeding') && (
            <div style={{
              position: 'absolute',
              left: '-35px',
              bottom: '22%',
              width: '55px',
              height: '20px',
              background: 'radial-gradient(ellipse at right, #FFFFFF 0%, #FBBF24 30%, #FF4605 70%, transparent 95%)',
              filter: 'blur(1.5px) drop-shadow(0 0 10px #FF4605)',
              clipPath: 'polygon(100% 25%, 0% 50%, 100% 75%)',
              animation: 'flameFlicker 0.08s infinite alternate',
              zIndex: 8
            }} />
          )}

          {/* Tire Launch Smoke Particles */}
          {(animStage === 'ignited' || animStage === 'speeding') && (
            <div style={{
              position: 'absolute',
              left: '80px',
              bottom: '6%',
              width: '100px',
              height: '40px',
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.45) 0%, rgba(255, 70, 5, 0.2) 45%, transparent 75%)',
              filter: 'blur(10px)',
              animation: 'smokePuff 0.6s ease-out forwards',
              zIndex: 6
            }} />
          )}

          {/* Ground Contact Shadow / Underglow (Beneath Wheels) */}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '8%',
            right: '8%',
            height: '26px',
            background: 'radial-gradient(ellipse at center, rgba(255, 70, 5, 0.45) 0%, rgba(255, 107, 0, 0.18) 50%, transparent 75%)',
            filter: 'blur(8px)',
            pointerEvents: 'none'
          }} />

          {/* The High-End Exotic Hypercar (True Transparent PNG - No Rectangular Border!) */}
          <img
            src="/intro_supercar.png"
            alt="Showroom Exotic Hypercar"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: animStage === 'ignited' || animStage === 'speeding' 
                ? 'brightness(1.08) contrast(1.05)' 
                : 'brightness(0.95) contrast(1.02)',
              transition: 'filter 0.25s ease'
            }}
          />
        </div>
      </div>

      {/* 5. Start Engine Button (If user gesture needed) */}
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

      {/* 6. Shockwave Sonic Brand Reveal */}
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

      {/* 7. Top Right Controls (Sound & Skip) */}
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
          0% { transform: translateY(0) translate(0, 0); }
          25% { transform: translateY(0) translate(1.5px, -1px); }
          50% { transform: translateY(0) translate(-1px, 1.5px); }
          75% { transform: translateY(0) translate(1px, 0.5px); }
          100% { transform: translateY(0) translate(0, 0); }
        }
        @keyframes igniteBuck {
          0% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-4px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
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
