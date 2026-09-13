import React from 'react';
import { POPULAR_BRANDS } from '../data/mockData';
import BrandEmblem from './BrandEmblem';
import { useLanguage } from '../i18n/LanguageContext';

export default function PopularBrands({ vehicles = [], onSelectBrand, activeBrand }) {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-section-alt)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            {t('brands.title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
            {t('brands.subtitle')}
          </p>
        </div>

        <div className="popular-brands-grid">
          {POPULAR_BRANDS.map(b => {
            const isSelected = activeBrand === b.name;
            const realCount = vehicles.filter(v => v.brand.toLowerCase() === b.name.toLowerCase()).length;
            return (
              <button
                key={b.name}
                onClick={() => onSelectBrand(isSelected ? 'all' : b.name)}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(180deg, rgba(255, 70, 5, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)' 
                    : 'var(--surface-card)',
                  border: isSelected 
                    ? '1.5px solid var(--amber-gold)' 
                    : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '16px 12px 14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected 
                    ? '0 10px 25px rgba(251, 191, 36, 0.25)' 
                    : 'var(--shadow-card)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{
                  height: '52px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BrandEmblem name={b.name} isSelected={isSelected} />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    color: isSelected ? 'var(--amber-gold)' : 'var(--text-main)',
                    display: 'block'
                  }}>
                    {b.name}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: isSelected ? 'var(--amber-gold)' : 'var(--text-muted)',
                    fontWeight: 600
                  }}>
                    {realCount} {realCount > 1 ? t('brands.modelsCount') : t('brands.singleModel')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
