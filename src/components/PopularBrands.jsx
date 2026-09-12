import React from 'react';
import { POPULAR_BRANDS } from '../data/mockData';
import BrandEmblem from './BrandEmblem';
import { useLanguage } from '../i18n/LanguageContext';

export default function PopularBrands({ vehicles = [], onSelectBrand, activeBrand }) {
  const { t } = useLanguage();

  return (
    <section style={{ padding: '80px 0', background: '#090D16', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            {t('brands.title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.94rem' }}>
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
                    ? 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)' 
                    : 'linear-gradient(180deg, #131D31 0%, #0A0F1D 100%)',
                  border: isSelected 
                    ? '1.5px solid #FBBF24' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
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
                    ? '0 10px 25px rgba(251, 191, 36, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                    : '0 6px 16px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(251, 191, 36, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)';
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
                    color: isSelected ? '#FBBF24' : '#E2E8F0',
                    display: 'block'
                  }}>
                    {b.name}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: isSelected ? 'rgba(251, 191, 36, 0.8)' : '#64748B',
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
