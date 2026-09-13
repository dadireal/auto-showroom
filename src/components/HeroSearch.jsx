import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Compass, 
  SlidersHorizontal, 
  ShieldCheck, 
  Zap, 
  Award,
  Car,
  Store
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

// Curated Supercars Slideshow for Hero Background & Mobile Stage
export const HERO_CAR_SLIDES = [
  {
    id: 'porsche-gt3-rs',
    image: '/cars/porsche_911_gt3_rs.jpg',
    title: 'Porsche 911 (992) GT3 RS',
    specs: '525 ch • 0-100 en 3.2s • Pack Weissach',
    accent: '#FF4605',
    category: 'Coupé Sport • Piste & Route'
  },
  {
    id: 'bmw-m4-competition',
    image: '/cars/bmw_m4_competition.jpg',
    title: 'BMW M4 Competition Coupé',
    specs: '510 ch • Bi-turbo S58 • Pack Carbone',
    accent: '#3B82F6',
    category: 'Coupé GT Haute Performance'
  },
  {
    id: 'ferrari-f8-tributo',
    image: '/cars/ferrari_f8_tributo.jpg',
    title: 'Ferrari F8 Tributo',
    specs: '720 ch • V8 3.9L Biturbo • Maranello',
    accent: '#EF4444',
    category: 'Supercar V8 Maranello'
  },
  {
    id: 'mercedes-g63-amg',
    image: '/cars/mercedes_g63_amg.jpg',
    title: 'Mercedes-Benz Classe G 63 AMG',
    specs: '585 ch • V8 4.0L Biturbo • 4MATIC+',
    accent: '#10B981',
    category: 'SUV Tout-Terrain de Prestige'
  },
  {
    id: 'audi-rs6-avant',
    image: '/cars/audi_rs6_avant.jpg',
    title: 'Audi RS6 Avant Performance',
    specs: '630 ch • V8 4.0L TFSI Quattro • Céramique',
    accent: '#F59E0B',
    category: 'Break Ultime Haute Performance'
  },
  {
    id: 'range-rover-autobiography',
    image: '/cars/range_rover_autobiography.jpg',
    title: 'Range Rover Autobiography P530',
    specs: '530 ch • V8 Twin-Turbo • Confort Première Classe',
    accent: '#8B5CF6',
    category: 'SUV Ultra-Luxe Première Classe'
  }
];

export default function HeroSearch({ 
  onExplore,
  onOpenFilters,
  resultsCount = 22,
  totalVehicles = 22
}) {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bgRef = useRef(null);
  const rafRef = useRef(null);

  // Touch swipe gesture tracking for mobile stage with dominant-axis filtering
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  // Auto-play slideshow interval (every 6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_CAR_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % HERO_CAR_SLIDES.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + HERO_CAR_SLIDES.length) % HERO_CAR_SLIDES.length);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = (touchStartY.current || 0) - (touchEndY.current || 0);
    const threshold = 35; // px threshold for swipe
    // Only trigger if horizontal swipe is dominant over vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swiped left
        if (isRtl) handlePrevSlide();
        else handleNextSlide();
      } else {
        // Swiped right
        if (isRtl) handleNextSlide();
        else handlePrevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  // Subtle Parallax on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = window.scrollY * 0.28;
          bgRef.current.style.transform = `translateY(${offset}px)`;
        }
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeCar = HERO_CAR_SLIDES[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="hero-luxury-section"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'clamp(118px, 15vh, 140px)',
        paddingBottom: 'clamp(36px, 5vh, 60px)',
        background: isLight 
          ? 'radial-gradient(130% 90% at 50% 0%, #FFFFFF 0%, #F5F7FB 35%, #E9EDF5 70%, #DEE4EE 100%)' 
          : 'radial-gradient(130% 90% at 50% -10%, #151E32 0%, #0A101C 45%, #05070E 100%)',
        overflow: 'hidden',
        transition: 'background 0.4s ease'
      }}
    >
      {/* ==================== ARCHITECTURAL TECH GRID OVERLAY ==================== */}
      <div className="hero-luxury-grid-overlay" />

      {/* ==================== 1. DESKTOP SUPERCAR SLIDESHOW ==================== */}
      <div 
        ref={bgRef}
        className="hero-slideshow-container"
        style={{
          opacity: isLight ? 0.92 : 0.72
        }}
      >
        {HERO_CAR_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`hero-slide-item ${isActive ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            />
          );
        })}
      </div>

      {/* ==================== 2. LUXURY STUDIO GRADIENT SCRIMS ==================== */}
      {/* Top linear scrim for header clarity */}
      <div className="hero-scrim-top" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '140px',
        background: isLight
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.25) 60%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(5, 7, 14, 0.92) 0%, rgba(5, 7, 14, 0.3) 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Soft center illumination behind headline and vehicle */}
      <div className="hero-scrim-center" style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(920px, 96vw)',
        height: 'clamp(240px, 36vw, 380px)',
        background: isLight
          ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 251, 0.45) 50%, transparent 80%)'
          : 'radial-gradient(ellipse at center, rgba(10, 16, 28, 0.85) 0%, rgba(5, 7, 14, 0.4) 50%, transparent 80%)',
        pointerEvents: 'none',
        filter: 'blur(34px)',
        zIndex: 1
      }} />

      {/* Dynamic specular glow matched to active supercar accent color */}
      <div 
        className="hero-accent-glow"
        style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(640px, 94vw)',
          height: '280px',
          background: `radial-gradient(ellipse at center, ${activeCar.accent}3d 0%, ${activeCar.accent}14 45%, transparent 75%)`,
          pointerEvents: 'none',
          filter: 'blur(52px)',
          zIndex: 1,
          transition: 'background 0.8s ease'
        }} 
      />

      {/* Bottom fade into inventory */}
      <div className="hero-scrim-bottom" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: isLight
          ? 'linear-gradient(180deg, transparent 0%, rgba(248, 249, 250, 0.6) 60%, var(--bg-main) 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(7, 11, 20, 0.7) 60%, var(--bg-main) 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* ==================== 3. LUXURY HERO CONTENT ==================== */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1040px' }}>
        
        <div className="hero-clean-content">
          
          {/* Frosted Glass Badge */}
          <div className="hero-glass-pill" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} color="#FF6B00" />
            <span style={{ color: isLight ? '#0F172A' : '#FFFFFF', letterSpacing: '0.04em' }}>
              {t('hero.badge')}
            </span>
          </div>

          {/* High-Impact Luxury Headline */}
          <h1 className="hero-main-title">
            {t('hero.title')}{' '}
            <span className="hero-title-accent">
              {t('hero.titleAccent')}
            </span>
          </h1>

          {/* Luxury Subtitle */}
          <p className="hero-main-subtitle">
            {t('hero.subtitle')}
          </p>

          {/* ─── MOBILE INTERACTIVE SUPERCAR SHOWCASE STAGE (MOBILE ONLY) ─── */}
          <div 
            className="hero-mobile-stage"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ '--car-accent': activeCar.accent }}
          >
            {/* Ambient Underglow */}
            <div className="hero-stage-underglow" />

            {/* Stage Frame Container */}
            <div className="hero-stage-frame">
              {/* Subtle inner radial depth spotlight behind vehicle */}
              <div className="hero-stage-inner-glow" />

              <img 
                src={activeCar.image} 
                alt={activeCar.title} 
                className="hero-stage-car-img"
                loading="eager"
              />

              {/* Stage Bottom Caption Bar */}
              <div className="hero-stage-caption">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="hero-stage-car-name">{activeCar.title}</div>
                    <div className="hero-stage-car-specs">{activeCar.specs}</div>
                  </div>
                  {/* Micro Segmented Indicators inside card */}
                  <div className="hero-stage-mini-dots">
                    {HERO_CAR_SLIDES.map((slide, idx) => (
                      <span
                        key={slide.id}
                        className={`hero-stage-mini-dot ${idx === currentSlide ? 'active' : ''}`}
                        style={{ '--dot-accent': slide.accent }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── COMPACT LUXURY FROSTED GLASS EXPLORE TRIGGER (ICON-ONLY) ─── */}
          <div className="hero-cta-group">
            <button
              onClick={onExplore}
              className="hero-glass-explore-btn"
              title={t('hero.exploreCollection', 'Explorer la collection')}
              aria-label={t('hero.exploreCollection', 'Explorer la collection')}
            >
              <span className="hero-glass-btn-halo" />
              <ChevronDown size={22} strokeWidth={2.4} className="hero-glass-btn-icon" />
            </button>
          </div>
        </div>

        {/* ==================== 4. DESKTOP AMBIENT TELEMETRY HUD ==================== */}
        <div className="hero-telemetry-strip">
          {/* Left: Active Supercar Specs Watermark */}
          <div className="hero-car-hud-left">
            <div className="hero-hud-pill">
              <span className="hero-hud-live-dot" />
              <span className="hero-hud-index">0{currentSlide + 1} / 0{HERO_CAR_SLIDES.length}</span>
              <span className="hero-hud-divider" />
              <span className="hero-hud-title">{activeCar.title}</span>
              <span className="hero-hud-specs">• {activeCar.specs}</span>
            </div>
          </div>

          {/* Right: Modern Slideshow HUD Controls */}
          <div className="hero-car-hud-right">
            <button
              onClick={isRtl ? handleNextSlide : handlePrevSlide}
              className="hero-slide-ctrl-btn"
              title={isRtl ? 'التالي' : 'Véhicule précédent'}
              aria-label={isRtl ? 'التالي' : 'Véhicule précédent'}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Segmented Indicator Bars */}
            <div className="hero-hud-dots">
              {HERO_CAR_SLIDES.map((slide, idx) => {
                const isSelected = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`hero-hud-bar ${isSelected ? 'active' : ''}`}
                    style={{ '--car-accent': slide.accent }}
                    title={slide.title}
                    aria-label={slide.title}
                  />
                );
              })}
            </div>

            <button
              onClick={isRtl ? handlePrevSlide : handleNextSlide}
              className="hero-slide-ctrl-btn"
              title={isRtl ? 'السابق' : 'Véhicule suivant'}
              aria-label={isRtl ? 'السابق' : 'Véhicule suivant'}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
