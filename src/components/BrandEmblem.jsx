import React from 'react';

/**
 * Official Manufacturer Luxury Automotive Emblems
 * Displays the authentic manufacturer crests, shields, and badges
 * with pixel-perfect resolution, contrast, and subtle illumination.
 */
const BRAND_LOGOS = {
  'Audi': {
    src: '/brands/audi_trimmed.png',
    alt: 'Audi',
    style: { maxWidth: '76px', maxHeight: '34px' }
  },
  'Mercedes-Benz': {
    src: '/brands/mercedes_trimmed.png',
    alt: 'Mercedes-Benz',
    style: { maxWidth: '44px', maxHeight: '44px' }
  },
  'BMW': {
    src: '/brands/bmw_trimmed.png',
    alt: 'BMW',
    style: { maxWidth: '44px', maxHeight: '44px' }
  },
  'Porsche': {
    src: '/brands/porsche_trimmed.png',
    alt: 'Porsche',
    style: { maxWidth: '38px', maxHeight: '48px' }
  },
  'Volkswagen': {
    src: '/brands/volkswagen_trimmed.png',
    alt: 'Volkswagen',
    style: { maxWidth: '44px', maxHeight: '44px' }
  },
  'Range Rover': {
    src: '/brands/landrover_trimmed.png',
    alt: 'Land Rover / Range Rover',
    style: { maxWidth: '74px', maxHeight: '36px' }
  },
  'Land Rover': {
    src: '/brands/landrover_trimmed.png',
    alt: 'Land Rover',
    style: { maxWidth: '74px', maxHeight: '36px' }
  },
  'Jetour': {
    src: '/brands/jetour_trimmed.png',
    alt: 'Jetour',
    style: { maxWidth: '80px', maxHeight: '22px' }
  },
  'Ferrari': {
    src: '/brands/ferrari_trimmed.png',
    alt: 'Ferrari',
    style: { maxWidth: '36px', maxHeight: '48px' }
  }
};

export default function BrandEmblem({ name, isSelected }) {
  const brandConfig = BRAND_LOGOS[name] || BRAND_LOGOS[Object.keys(BRAND_LOGOS).find(k => k.toLowerCase() === (name || '').toLowerCase())];

  const glowFilter = isSelected 
    ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.85)) drop-shadow(0 2px 4px rgba(0,0,0,0.7))' 
    : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.65))';

  return (
    <div style={{
      width: '100%',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)'
    }}>
      {brandConfig ? (
        <img
          src={brandConfig.src}
          alt={brandConfig.alt}
          loading="lazy"
          style={{
            ...brandConfig.style,
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            filter: glowFilter,
            transition: 'filter 0.25s ease'
          }}
        />
      ) : (
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: `2px solid ${isSelected ? '#FBBF24' : '#64748B'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          color: isSelected ? '#FBBF24' : '#FFFFFF',
          fontSize: '0.95rem'
        }}>
          {name ? name.charAt(0) : '?'}
        </div>
      )}
    </div>
  );
}
