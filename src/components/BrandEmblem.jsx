import React, { useState } from 'react';

// Authentic manufacturer emblems and official badges
const BRAND_LOGO_MAP = {
  'Audi': {
    primary: '/brands/audi.png',
    fallback: '/brands/audi.svg',
    maxHeight: 30,
    maxWidth: 64
  },
  'Mercedes-Benz': {
    primary: '/brands/mercedes.png',
    fallback: '/brands/mercedes.svg',
    maxHeight: 38,
    maxWidth: 42
  },
  'BMW': {
    primary: '/brands/bmw.png',
    fallback: '/brands/bmw.svg',
    maxHeight: 38,
    maxWidth: 38
  },
  'Porsche': {
    primary: '/brands/porsche.png',
    fallback: '/brands/porsche.svg',
    maxHeight: 40,
    maxWidth: 34
  },
  'Volkswagen': {
    primary: '/brands/volkswagen.png',
    fallback: '/brands/volkswagen.svg',
    maxHeight: 36,
    maxWidth: 36
  },
  'Range Rover': {
    primary: '/brands/landrover.png',
    fallback: '/brands/landrover.svg',
    maxHeight: 32,
    maxWidth: 62
  },
  'Jetour': {
    primary: '/brands/jetour.png',
    fallback: '/brands/jetour.png',
    maxHeight: 28,
    maxWidth: 60
  },
  'Ferrari': {
    primary: '/brands/ferrari.png',
    fallback: '/brands/ferrari.svg',
    maxHeight: 40,
    maxWidth: 32
  }
};

export default function BrandEmblem({ name, isSelected }) {
  const [hasError, setHasError] = useState(false);
  const brand = BRAND_LOGO_MAP[name];

  if (brand) {
    const currentSrc = hasError ? brand.fallback : brand.primary;
    return (
      <div style={{
        width: '100%',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={currentSrc}
          alt={`${name} official logo`}
          onError={() => {
            if (!hasError && brand.fallback !== brand.primary) {
              setHasError(true);
            }
          }}
          style={{
            maxHeight: `${brand.maxHeight}px`,
            maxWidth: `${brand.maxWidth}px`,
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            filter: isSelected 
              ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.75)) brightness(1.15)' 
              : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isSelected ? 'scale(1.08)' : 'scale(1)'
          }}
        />
      </div>
    );
  }

  // Fallback initial badge
  return (
    <div style={{
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: `2px solid ${isSelected ? '#FBBF24' : '#64748B'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      color: isSelected ? '#FBBF24' : '#CBD5E1',
      fontSize: '0.88rem'
    }}>
      {name.charAt(0)}
    </div>
  );
}

