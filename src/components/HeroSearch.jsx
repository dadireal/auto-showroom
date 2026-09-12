import React, { useMemo } from 'react';
import { Search, Sparkles, RotateCcw, ChevronDown } from 'lucide-react';
import { INITIAL_VEHICLES } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

// Minimalist Luxury Automotive Silhouettes (SVG)
const CarSilhouettes = {
  all: (
    <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9.5H23M3 9.5C3 9.5 4.5 4.5 9 3.5C12 2.8 15 3 17 5L20.5 9.5H3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  sedan: (
    <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 9H22.5M3 9L4.5 6.5C5.2 5.2 6.5 4.5 8 4.5H14.5C16 4.5 17.5 5.5 18.5 7L21 9H3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  suv: (
    <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 9.5H22.5M2.5 9.5L4 4.5H16L19 7.5L21.5 9.5H2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  coupe: (
    <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 9H22.5M3 9C4 7 6 3.5 11 3.5C15 3.5 18 6 21 9H3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  cabriolet: (
    <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 9H22.5M4 9L5.5 6.5C6 5.5 7 5 8 5H10.5M19 9L18 7.5H14M4 9H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
};

export default function HeroSearch({ 
  searchFilters, 
  setSearchFilters, 
  onSearch, 
  onResetFilters,
  brands, 
  resultsCount,
  allVehicles = []
}) {
  const { t } = useLanguage();

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

  return (
    <section style={{
      position: 'relative',
      minHeight: '86vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 'clamp(90px, 16vh, 160px)',
      paddingBottom: 'clamp(40px, 7vh, 90px)',
      background: '#090D16',
      overflow: 'hidden',
      color: '#fff'
    }}>
      {/* Automotive Background Visual - Deep Luxury Mood */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        opacity: 0.22,
        filter: 'contrast(1.2) saturate(1.1)',
        pointerEvents: 'none'
      }} />

      {/* Subtle Luxury Radial Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(9, 13, 22, 0.4) 0%, rgba(9, 13, 22, 0.96) 85%)',
        pointerEvents: 'none'
      }} />

      {/* Subtle Orange Glow Ambient Effect — constrained to prevent X-overflow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(600px, 90vw)',
        height: 'clamp(200px, 35vw, 350px)',
        background: 'radial-gradient(circle, rgba(255, 70, 5, 0.16) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(70px)',
        maxWidth: '100%'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Decluttered, Elegant Headline */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
          {/* Subtle Curated Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            color: '#E2E8F0',
            padding: '6px 18px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px'
          }}>
            <Sparkles size={14} color="#FF5722" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Razor-Sharp Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.2vw, 3.9rem)',
            lineHeight: 1.14,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: '14px',
            color: '#FFFFFF'
          }}>
            {t('hero.title')}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FF5722 0%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              {t('hero.titleAccent')}
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: '#94A3B8',
            lineHeight: 1.5,
            maxWidth: '620px',
            margin: '0 auto',
            fontWeight: 400
          }}>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Floating Glassmorphic Concierge Bar */}
        <div className="concierge-bar" style={{
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 0, 0, 0.5)',
          borderRadius: '20px',
          padding: '12px',
          maxWidth: '880px',
          width: '100%',
          boxSizing: 'border-box',
          margin: '0 auto'
        }}>
          {/* Top Condition Switcher & Reset */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 10px 12px 10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
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
                    style={{
                      padding: '5px 14px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: isActive ? 'rgba(255, 70, 5, 0.18)' : 'transparent',
                      color: isActive ? '#FF6B00' : '#94A3B8',
                      border: isActive ? '1px solid rgba(255, 70, 5, 0.4)' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onResetFilters}
              style={{
                background: 'none',
                color: '#64748B',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#CBD5E1'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
            >
              <RotateCcw size={13} />
              <span>{t('hero.reset')}</span>
            </button>
          </div>

          {/* Single Row Essential Filters Grid */}
          <div className="concierge-grid">
            {/* Filter 1: Marque */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: '4px', paddingLeft: '4px' }}>
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
                    background: 'rgba(9, 13, 22, 0.85)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '11px 32px 11px 14px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none'
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
                <ChevronDown size={15} color="#64748B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Filter 2: Modèle */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: '4px', paddingLeft: '4px' }}>
                {t('hero.model')}
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={searchFilters.model || 'all'}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(9, 13, 22, 0.85)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '11px 32px 11px 14px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none'
                  }}
                >
                  <option value="all">{t('hero.allModels')}</option>
                  {availableModels.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown size={15} color="#64748B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Filter 3: Budget (en Millions Centimes) */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: '4px', paddingLeft: '4px' }}>
                {t('hero.budget')}
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={searchFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(9, 13, 22, 0.85)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '11px 32px 11px 14px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none'
                  }}
                >
                  <option value="any">{t('hero.anyBudget')}</option>
                  <option value="300">≤ 300 Millions (30 000 000 DZD)</option>
                  <option value="500">≤ 500 Millions (50 000 000 DZD)</option>
                  <option value="800">≤ 800 Millions (80 000 000 DZD)</option>
                  <option value="1500">≤ 1 500 Millions</option>
                  <option value="10000">&gt; 1 500 Millions (Prestige)</option>
                </select>
                <ChevronDown size={15} color="#64748B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* High-Contrast Orange Search Button */}
            <div style={{ paddingTop: '20px' }}>
              <button
                onClick={onSearch}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  height: '46px',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FF4605 0%, #FF6B00 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(255, 70, 5, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Search size={17} />
                <span>{t('hero.search')} ({resultsCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Car Silhouette Pills — horizontally scrollable */}
        <div className="silhouette-scroll-row no-scrollbar" style={{
          marginTop: '22px',
          paddingInline: '2px'
        }}>
          <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, marginInlineEnd: '4px', flexShrink: 0 }}>
            {t('hero.bodyType', 'Carrosserie :')}
          </span>
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
    </section>
  );
}
