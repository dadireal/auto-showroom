import React, { useState, useEffect, useRef, useCallback } from 'react';
import CarCard from './CarCard';
import { ArrowUpDown, Sparkles, AlertCircle } from 'lucide-react';
import { BODY_TYPES } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

/* ── Skeleton placeholder card ────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" style={{ marginBottom: '16px' }} />
        <div className="skeleton-line price" />
        <div className="skeleton-line long" />
        <div className="skeleton-line long" style={{ width: '60%' }} />
        <div className="skeleton-line btn" />
      </div>
    </div>
  );
}

export default function VehicleList({ 
  vehicles, 
  currency, 
  comparedCars, 
  onToggleCompare, 
  onViewDetails,
  activeCategory,
  onSelectCategory,
  onResetFilters,
  favorites = [],
  onToggleFavorite,
  onRequestProforma,
  onOpenLightbox
}) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [animKey, setAnimKey] = useState(0); // bump to re-trigger stagger
  const gridRef = useRef(null);

  // Show skeleton on first mount only
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  // Re-trigger stagger animation whenever vehicles list changes
  useEffect(() => {
    if (!isLoading) {
      setAnimKey(k => k + 1);
    }
  }, [vehicles, sortBy, isLoading]);

  // Sorting logic
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceDZD - b.priceDZD;
    if (sortBy === 'price-desc') return b.priceDZD - a.priceDZD;
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'km-asc') return a.mileage - b.mileage;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="inventory" style={{ padding: 'clamp(48px, 8vw, 96px) 0', background: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        {/* Section Header */}
        <div className="inventory-header">
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#FF6B00',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}>
              <Sparkles size={14} />
              {t('inventory.badge')}
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text-main)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {t('inventory.title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px' }}>
              {sortedVehicles.length} {t('inventory.subtitle')}
            </p>
          </div>

          {/* Sort selector */}
          <div className="inventory-sort-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <ArrowUpDown size={14} color="#FF6B00" />
              <span>{t('inventory.sortBy')}</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--surface-card)',
                fontSize: '0.86rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <option value="featured" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>⭐ {t('inventory.featured')}</option>
              <option value="price-asc" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>{t('inventory.priceAsc')}</option>
              <option value="price-desc" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>{t('inventory.priceDesc')}</option>
              <option value="year-desc" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>{t('inventory.yearDesc')}</option>
              <option value="km-asc" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>{t('inventory.mileageAsc')}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="category-pills-row" style={{ marginTop: '16px', marginBottom: '36px' }}>
          {BODY_TYPES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  minHeight: '44px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  background: isActive ? 'linear-gradient(135deg, #FF4605 0%, #FF6B00 100%)' : 'var(--surface-card)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? '0 4px 16px rgba(255, 70, 5, 0.4)' : 'var(--shadow-card)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {t(`categories.${cat.id}`, cat.label)}
              </button>
            );
          })}
        </div>

        {/* Vehicle Grid — skeleton or real cards */}
        {isLoading ? (
          <div className="car-card-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedVehicles.length > 0 ? (
          <div
            key={animKey}
            ref={gridRef}
            className="car-card-grid"
          >
            {sortedVehicles.map((car, idx) => (
              <div
                key={car.id}
                className="car-card-animate"
              >
                <CarCard
                  car={car}
                  currency={currency}
                  isCompared={comparedCars.some(c => c.id === car.id)}
                  onToggleCompare={onToggleCompare}
                  onViewDetails={onViewDetails}
                  isFavorite={favorites.some(f => f.id === car.id)}
                  onToggleFavorite={onToggleFavorite}
                  onRequestProforma={onRequestProforma}
                  onOpenLightbox={onOpenLightbox}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '70px 24px',
            background: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '16px',
            border: '1px dashed rgba(255, 255, 255, 0.08)',
            maxWidth: '540px',
            margin: '0 auto',
            backdropFilter: 'blur(12px)'
          }}>
            <AlertCircle size={44} color="#64748B" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#FFFFFF', fontWeight: 800 }}>
              {t('inventory.emptyTitle')}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
              {t('inventory.emptySubtitle')}
            </p>
            <button
              onClick={onResetFilters}
              className="btn-primary"
              style={{ fontSize: '0.88rem' }}
            >
              {t('inventory.resetAll')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

