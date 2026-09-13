import React, { useState, useEffect, useRef } from 'react';
import CarCard from './CarCard';
import CatalogFilterBar from './CatalogFilterBar';
import { Sparkles, AlertCircle, ChevronDown, Check } from 'lucide-react';
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
  onOpenLightbox,
  searchFilters,
  setSearchFilters,
  brands = [],
  allVehicles = [],
  isFiltersOpen,
  setIsFiltersOpen
}) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [animKey, setAnimKey] = useState(0); // bump to re-trigger stagger
  const gridRef = useRef(null);

  // Progressive vehicle loading (6 initially on mobile to keep page compact & fast)
  const [visibleCount, setVisibleCount] = useState(6);

  // Show skeleton on first mount only
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  // Reset pagination when filters, categories, or sort changes
  useEffect(() => {
    setVisibleCount(6);
  }, [vehicles.length, sortBy, activeCategory, searchFilters?.brand, searchFilters?.model, searchFilters?.condition, searchFilters?.maxPrice, searchFilters?.keyword]);

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

  const displayedVehicles = sortedVehicles.slice(0, visibleCount);
  const hasMore = visibleCount < sortedVehicles.length;
  const progressPercent = Math.min(100, Math.round((displayedVehicles.length / (sortedVehicles.length || 1)) * 100));

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleShowAll = () => {
    setVisibleCount(sortedVehicles.length);
  };

  return (
    <section id="inventory" className="inventory-section" style={{ padding: 'clamp(32px, 5vw, 64px) 0', background: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="inventory-header" style={{ marginBottom: '20px' }}>
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
              marginBottom: '6px'
            }}>
              <Sparkles size={14} />
              {t('inventory.badge')}
            </div>
            <h2 style={{ fontSize: 'clamp(1.65rem, 3.8vw, 2.4rem)', color: 'var(--text-main)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {t('inventory.title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
              {sortedVehicles.length} {t('inventory.subtitle')}
            </p>
          </div>
        </div>

        {/* Unified Mobile-First Search & Filter Console */}
        {searchFilters && setSearchFilters && (
          <CatalogFilterBar
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            activeCategory={activeCategory}
            onSelectCategory={onSelectCategory}
            onResetFilters={onResetFilters}
            brands={brands}
            allVehicles={allVehicles}
            resultsCount={sortedVehicles.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        )}

        {/* Vehicle Grid — skeleton or real cards */}
        {isLoading ? (
          <div className="car-card-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedVehicles.length > 0 ? (
          <>
            <div
              key={animKey}
              ref={gridRef}
              className="car-card-grid"
            >
              {displayedVehicles.map((car) => (
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

            {/* Progressive Stock Load-More Bar */}
            <div className="inventory-load-more-bar">
              {/* Progress Count & Bar */}
              <div className="inventory-progress-info">
                <span className="inventory-progress-text">
                  {t('inventory.showingProgress', `Affichage de ${displayedVehicles.length} sur ${sortedVehicles.length} véhicules`)
                    .replace('{current}', displayedVehicles.length)
                    .replace('{total}', sortedVehicles.length)}
                </span>
                <div className="inventory-progress-track">
                  <div 
                    className="inventory-progress-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {hasMore ? (
                <div className="inventory-load-buttons">
                  <button
                    onClick={handleLoadMore}
                    className="btn-primary inventory-load-more-btn"
                  >
                    <ChevronDown size={18} />
                    <span>{t('inventory.loadMore')}</span>
                  </button>

                  {sortedVehicles.length > visibleCount + 6 && (
                    <button
                      onClick={handleShowAll}
                      className="btn-outline inventory-show-all-btn"
                    >
                      <span>{t('inventory.showAll')} ({sortedVehicles.length})</span>
                    </button>
                  )}
                </div>
              ) : (
                sortedVehicles.length > 6 && (
                  <div className="inventory-all-loaded-indicator">
                    <Check size={14} color="#10B981" />
                    <span>{t('inventory.allLoaded')}</span>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--surface-card)',
            borderRadius: '20px',
            border: '1px dashed var(--border-subtle)',
            maxWidth: '540px',
            margin: '30px auto 0',
            backdropFilter: 'blur(12px)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <AlertCircle size={44} color="#FF6B00" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: 800 }}>
              {t('inventory.emptyTitle')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
              {t('inventory.emptySubtitle')}
            </p>
            <button
              onClick={onResetFilters}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #FF4605 0%, #FF6B00 100%)',
                color: '#FFFFFF',
                border: 'none'
              }}
            >
              {t('inventory.resetAll')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
