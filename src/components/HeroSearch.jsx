import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { Search, Sparkles, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, Gauge, CarFront } from 'lucide-react';
import { INITIAL_VEHICLES } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

// Precision Luxury Automotive Icons (Designed to OEM Showroom Standards)
const CarSilhouettes = {
  all: (
    <CarFront size={15} strokeWidth={2.2} />
  ),
  sedan: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Aerodynamic Sedan Body */}
      <path d="M1 9H3M6.8 9H15.2M19 9H21M1.2 9L3.2 6.2C3.9 5.2 5 4.5 6.2 4.5H13.8C15 4.5 16.1 5.2 16.8 6.2L19.2 9H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Tinted Dual Windows with B-Pillar */}
      <path d="M6.2 5.5H10V8.2H4.8L6.2 5.5ZM10.8 5.5H13.5C14.3 5.5 15 6 15.5 6.8L16.5 8.2H10.8V5.5Z" fill="currentColor" fillOpacity="0.32" />
      {/* Alloy Wheels */}
      <circle cx="4.8" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.8" cy="9" r="0.6" fill="currentColor" />
      <circle cx="17.2" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="9" r="0.6" fill="currentColor" />
    </svg>
  ),
  suv: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Roof Rails */}
      <path d="M6.5 2.2H15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* High-Clearance Muscular SUV Body */}
      <path d="M1 9.5H3M6.8 9.5H15.2M19 9.5H21M1.2 9.5L2.8 6C3.3 4.8 4.4 3.8 5.8 3.8H15.8L18.5 6.8L20.8 9.5H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Tinted SUV Greenhouse Windows */}
      <path d="M5.8 4.6H10.5V8.5H4.2L5.8 4.6ZM11.3 4.6H15.2L17.5 8.5H11.3V4.6Z" fill="currentColor" fillOpacity="0.32" />
      {/* Heavy-Duty All-Terrain Wheels */}
      <circle cx="4.8" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4.8" cy="9.5" r="0.7" fill="currentColor" />
      <circle cx="17.2" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="9.5" r="0.7" fill="currentColor" />
    </svg>
  ),
  coupe: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Aggressive Fastback Body (Porsche 911 / M4 style) */}
      <path d="M1 9H3M6.8 9H15.2M19 9H21M1.2 9L4.5 5.8C5.6 4 7.8 3.2 10.2 3.2C13.5 3.2 16.5 4.8 19.5 9H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Sweeping Aerodynamic Frameless Window */}
      <path d="M7 5C8.2 4.2 9.6 3.8 11.2 3.8C13.5 3.8 15.5 4.7 17 7.5H5.8L7 5Z" fill="currentColor" fillOpacity="0.32" />
      {/* Active Rear Spoiler Lip */}
      <path d="M19.5 7.8L21.5 7.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Low-Profile Performance Wheels */}
      <circle cx="4.8" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.8" cy="9" r="0.6" fill="currentColor" />
      <circle cx="17.2" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="9" r="0.6" fill="currentColor" />
    </svg>
  ),
  cabriolet: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Raked Windshield */}
      <path d="M6.8 4L9 7.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.8 4L9 7.8H5.2L6.8 4Z" fill="currentColor" fillOpacity="0.32" />
      {/* Sport Roll Hoops / Headrests */}
      <path d="M12.5 6C12.5 5.2 13.2 4.6 14 4.6C14.8 4.6 15.5 5.2 15.5 6V7.8H12.5V6Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.1" />
      {/* Roadster Body Line */}
      <path d="M1 9H3M6.8 9H15.2M19 9H21M1.2 9L5 7.8H19.5L21.2 9H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="4.8" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.8" cy="9" r="0.6" fill="currentColor" />
      <circle cx="17.2" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="9" r="0.6" fill="currentColor" />
    </svg>
  )
};

// Curated Supercars Slideshow for Background
export const HERO_CAR_SLIDES = [
  {
    id: 'porsche-gt3-rs',
    image: '/cars/porsche_911_gt3_rs.jpg',
    title: 'Porsche 911 (992) GT3 RS',
    specs: '525 ch • 0-100 en 3.2s • Pack Aéro Weissach',
    accent: '#FF4605',
    category: 'Coupé Sport • Piste & Route'
  },
  {
    id: 'bmw-m4-competition',
    image: '/cars/bmw_m4_competition.jpg',
    title: 'BMW M4 Competition Coupé M xDrive',
    specs: '510 ch • Bi-turbo S58 • Pack Carbone M',
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
  searchFilters, 
  setSearchFilters, 
  onSearch, 
  onResetFilters,
  brands, 
  resultsCount,
  allVehicles = []
}) {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bgRef = useRef(null);
  const rafRef = useRef(null);

  // Auto-play slideshow interval (every 5.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_CAR_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % HERO_CAR_SLIDES.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + HERO_CAR_SLIDES.length) % HERO_CAR_SLIDES.length);
  }, []);

  // Parallax: background scrolls at 35% of page scroll speed
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = window.scrollY * 0.35;
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

  const handleFilterChange = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Available models dynamically computed based on selected brand
  const availableModels = useMemo(() => {
    let pool = allVehicles && allVehicles.length > 0 ? allVehicles : INITIAL_VEHICLES;
    if (searchFilters.brand && searchFilters.brand !== 'all') {
      pool = pool.filter(c => c.brand.toLowerCase() === searchFilters.brand.toLowerCase());
    }
    const unique = [...new Set(pool.map(c => c.model))];
    return unique.sort();
  }, [searchFilters.brand, allVehicles]);

  // Silhouette pills list
  const SILHOUETTE_PILLS = [
    { id: 'all', label: t('categories.all'), icon: CarSilhouettes.all },
    { id: 'sedan', label: t('categories.sedan'), icon: CarSilhouettes.sedan },
    { id: 'suv', label: t('categories.suv'), icon: CarSilhouettes.suv },
    { id: 'coupe', label: t('categories.coupe'), icon: CarSilhouettes.coupe },
    { id: 'cabriolet', label: t('categories.cabriolet'), icon: CarSilhouettes.cabriolet }
  ];

  const activeCar = HERO_CAR_SLIDES[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'clamp(82px, 12vh, 125px)',
        paddingBottom: 'clamp(40px, 6vh, 75px)',
        background: isLight ? '#FFFFFF' : '#070B14',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* ==================== 1. SUPERCAR BACKGROUND SLIDESHOW ==================== */}
      <div 
        ref={bgRef}
        className="hero-slideshow-container"
        style={{
          opacity: isLight ? 0.94 : 0.74
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

      {/* ==================== 2. LUXURY STUDIO LIGHTING (DIFFUSE, ZERO BORDERS) ==================== */}
      {/* Top linear scrim for header contrast */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '130px',
        background: isLight
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.2) 60%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(7, 11, 20, 0.85) 0%, rgba(7, 11, 20, 0.25) 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Soft studio backdrop centered behind typography - Organic light diffusion, zero box borders */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(920px, 96vw)',
        height: 'clamp(200px, 32vw, 320px)',
        background: isLight
          ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 80%)'
          : 'radial-gradient(ellipse at center, rgba(7, 11, 20, 0.72) 0%, rgba(7, 11, 20, 0.25) 50%, transparent 80%)',
        pointerEvents: 'none',
        filter: 'blur(30px)',
        zIndex: 1
      }} />

      {/* Subtle warm amber specular halo */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(520px, 85vw)',
        height: '220px',
        background: isLight 
          ? 'radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 70, 5, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
        zIndex: 1
      }} />

      {/* Bottom seamless transition into inventory section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '130px',
        background: isLight
          ? 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, var(--bg-main) 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(7, 11, 20, 0.6) 50%, var(--bg-main) 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* ==================== 3. HERO MAIN CONTENT ==================== */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Open-Air Luxury Headline Block (No Box) */}
        <div className="hero-headline-free">
          
          {/* Glass Badge */}
          <div className="hero-glass-pill" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} color="#FF6B00" />
            <span style={{ color: isLight ? '#0F172A' : '#FFFFFF' }}>{t('hero.badge')}</span>
          </div>

          {/* High-Impact Headline */}
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
            lineHeight: 1.15,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: '8px',
            color: isLight ? '#0F172A' : '#FFFFFF',
            textShadow: isLight
              ? '0 2px 18px rgba(255, 255, 255, 0.95), 0 1px 3px rgba(255, 255, 255, 0.9)'
              : '0 2px 28px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9)'
          }}>
            {t('hero.title')}{' '}
            <span className="hero-title-accent">
              {t('hero.titleAccent')}
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.84rem, 1.45vw, 1.04rem)',
            color: isLight ? '#0F172A' : 'rgba(255, 255, 255, 0.95)',
            textShadow: isLight
              ? '0 1px 12px rgba(255, 255, 255, 0.95), 0 0 3px rgba(255, 255, 255, 0.9)'
              : '0 2px 16px rgba(0, 0, 0, 0.95)',
            lineHeight: 1.45,
            maxWidth: '640px',
            margin: '0 auto',
            fontWeight: 600
          }}>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* ==================== 4. MASTER FLOATING GLASS CONSOLE ==================== */}
        <div className="concierge-bar">
          {/* Top Strip Row 1: Condition Tabs (Left) + Reset (Right) */}
          <div className="concierge-top-strip-row1">
            {/* Condition Switcher */}
            <div className="concierge-condition-tabs">
              {[
                { id: 'all', label: t('hero.allStock') },
                { id: 'neuf', label: t('nav.newCars') },
                { id: 'occasion', label: t('nav.usedCars') }
              ].map(tab => {
                const isActive = searchFilters.condition === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleFilterChange('condition', tab.id)}
                    className={`concierge-tab-btn ${isActive ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      padding: '5px clamp(6px, 1.2vw, 12px)',
                      borderRadius: '7px',
                      fontSize: 'clamp(0.7rem, 1.4vw, 0.78rem)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      textAlign: 'center'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Reset Button pinned to the right of Row 1 */}
            <button
              onClick={onResetFilters}
              className="concierge-reset-btn"
              title={t('hero.reset')}
            >
              <RotateCcw size={12} />
              <span className="desktop-text">{t('hero.reset')}</span>
            </button>
          </div>

          {/* Top Strip Row 2: Silhouette Quick Chips taking full width */}
          <div className="concierge-top-strip-row2">
            <div className="silhouette-scroll-strip">
              {SILHOUETTE_PILLS.map(pill => {
                const isActive = searchFilters.bodyType === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => {
                      handleFilterChange('bodyType', pill.id);
                      onSearch();
                    }}
                    className={`silhouette-pill ${isActive ? 'active' : ''}`}
                    title={pill.label}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {pill.icon}
                    </span>
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Inputs Row Grid */}
          <div className="concierge-grid">
            {/* Filter 1: Marque */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                fontSize: '0.71rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.75)', 
                marginBottom: '4px', 
                paddingInlineStart: '4px' 
              }}>
                {t('hero.brand')}
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={searchFilters.brand}
                  onChange={(e) => {
                    handleFilterChange('brand', e.target.value);
                    handleFilterChange('model', 'all');
                  }}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '10px',
                    padding: '0 14px',
                    paddingInlineEnd: '34px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="all">{t('hero.allBrands')}</option>
                  {brands.map(b => {
                    const count = allVehicles && allVehicles.length > 0
                       ? allVehicles.filter(v => v.brand.toLowerCase() === b.name.toLowerCase()).length
                      : (b.count || 0);
                    return (
                      <option key={b.name} value={b.name}>{b.name} ({count})</option>
                    );
                  })}
                </select>
                <ChevronDown size={15} color={isLight ? '#64748B' : '#94A3B8'} style={{ position: 'absolute', insetInlineEnd: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Filter 2: Modèle */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                fontSize: '0.71rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.75)', 
                marginBottom: '4px', 
                paddingInlineStart: '4px' 
              }}>
                {t('hero.model')}
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={searchFilters.model || 'all'}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '10px',
                    padding: '0 14px',
                    paddingInlineEnd: '34px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="all">{t('hero.allModels')}</option>
                  {availableModels.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown size={15} color={isLight ? '#64748B' : '#94A3B8'} style={{ position: 'absolute', insetInlineEnd: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Filter 3: Budget */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                fontSize: '0.71rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.75)', 
                marginBottom: '4px', 
                paddingInlineStart: '4px' 
              }}>
                {t('hero.budget')}
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={searchFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    borderRadius: '10px',
                    padding: '0 14px',
                    paddingInlineEnd: '34px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="any">{t('hero.anyBudget')}</option>
                  <option value="300">≤ 300 Millions (30 000 000 DZD)</option>
                  <option value="500">≤ 500 Millions (50 000 000 DZD)</option>
                  <option value="800">≤ 800 Millions (80 000 000 DZD)</option>
                  <option value="1500">≤ 1 500 Millions</option>
                  <option value="10000">&gt; 1 500 Millions (Prestige)</option>
                </select>
                <ChevronDown size={15} color={isLight ? '#64748B' : '#94A3B8'} style={{ position: 'absolute', insetInlineEnd: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Search CTA Button */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <button
                onClick={onSearch}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0 16px',
                  height: '44px',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FF4605 0%, #FF7847 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 6px 20px rgba(255, 70, 5, 0.42)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxSizing: 'border-box',
                  color: '#FFFFFF'
                }}
              >
                <Search size={16} />
                <span>{t('hero.search')} ({resultsCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================== 5. LUXURY AMBIENT TELEMETRY STRIP ==================== */}
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

          {/* Right: Modern Slideshow HUD Controls (RTL-aware) */}
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
