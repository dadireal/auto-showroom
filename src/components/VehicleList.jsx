import React, { useState } from 'react';
import CarCard from './CarCard';
import { ArrowUpDown, Sparkles, AlertCircle } from 'lucide-react';
import { BODY_TYPES } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

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

  // Sorting logic
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceDZD - b.priceDZD;
    if (sortBy === 'price-desc') return b.priceDZD - a.priceDZD;
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'km-asc') return a.mileage - b.mileage;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="inventory" style={{ padding: '96px 0', background: '#090D16' }}>
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
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {t('inventory.title')}
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '6px' }}>
              {sortedVehicles.length} {t('inventory.subtitle')}
            </p>
          </div>

          {/* Sort selector */}
          <div className="inventory-sort-wrap">
            <span style={{ fontSize: '0.84rem', color: '#94A3B8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
              <ArrowUpDown size={14} color="#64748B" />
              <span>{t('inventory.sortBy')}</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '9px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.85)',
                fontSize: '0.86rem',
                color: '#E2E8F0',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              <option value="featured">⭐ {t('inventory.featured')}</option>
              <option value="price-asc">{t('inventory.priceAsc')}</option>
              <option value="price-desc">{t('inventory.priceDesc')}</option>
              <option value="year-desc">{t('inventory.yearDesc')}</option>
              <option value="km-asc">{t('inventory.mileageAsc')}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="category-pills-row">
          {BODY_TYPES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  background: isActive ? 'rgba(255, 70, 5, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#FF7847' : '#94A3B8',
                  border: isActive ? '1px solid rgba(255, 70, 5, 0.45)' : '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: isActive ? '0 0 16px rgba(255, 70, 5, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {t(`categories.${cat.id}`, cat.label)}
              </button>
            );
          })}
        </div>

        {/* Vehicle Grid */}
        {sortedVehicles.length > 0 ? (
          <div className="car-card-grid">
            {sortedVehicles.map(car => (
              <CarCard
                key={car.id}
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
