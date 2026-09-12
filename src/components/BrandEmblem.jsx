import React from 'react';

/**
 * Pro-Designer Luxury Automotive Emblems
 * Specifically tuned for high-contrast visibility, crisp vector fidelity,
 * and illumination on dark showroom backgrounds (#0F172A / #090D16).
 */
export default function BrandEmblem({ name, isSelected }) {
  const glowFilter = isSelected 
    ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.6))' 
    : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7))';

  const renderBadge = () => {
    switch (name) {
      case 'Audi':
        // Polished brushed-chrome 4 interlocking rings
        return (
          <svg width="64" height="28" viewBox="0 0 100 40" fill="none" style={{ filter: glowFilter }}>
            <defs>
              <linearGradient id="audiChrome" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#F1F5F9" />
                <stop offset="55%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="15" stroke="url(#audiChrome)" strokeWidth="3.4" />
            <circle cx="40" cy="20" r="15" stroke="url(#audiChrome)" strokeWidth="3.4" />
            <circle cx="60" cy="20" r="15" stroke="url(#audiChrome)" strokeWidth="3.4" />
            <circle cx="80" cy="20" r="15" stroke="url(#audiChrome)" strokeWidth="3.4" />
          </svg>
        );

      case 'Mercedes-Benz':
        // Polished 3D Faceted Silver Star in Chrome Circle
        return (
          <svg width="42" height="42" viewBox="0 0 44 44" fill="none" style={{ filter: glowFilter }}>
            <defs>
              <linearGradient id="mbRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
              <linearGradient id="mbLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="mbDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Outer metallic ring */}
            <circle cx="22" cy="22" r="19" stroke="url(#mbRing)" strokeWidth="2.5" />
            {/* 3D Faceted Tri-Star */}
            {/* Top vertical ray */}
            <polygon points="22,4 22,22 13,27" fill="url(#mbDark)" />
            <polygon points="22,4 22,22 31,27" fill="url(#mbLight)" />
            {/* Bottom left ray */}
            <polygon points="8,29 22,22 22,39" fill="url(#mbLight)" />
            <polygon points="8,29 22,22 13,27" fill="url(#mbDark)" />
            {/* Bottom right ray */}
            <polygon points="36,29 22,22 31,27" fill="url(#mbLight)" />
            <polygon points="36,29 22,22 22,39" fill="url(#mbDark)" />
          </svg>
        );

      case 'BMW':
        // Official Bavarian Roundel with Chrome Border & Bold Letters
        return (
          <svg width="42" height="42" viewBox="0 0 44 44" fill="none" style={{ filter: glowFilter }}>
            {/* Outer Chrome Bezel */}
            <circle cx="22" cy="22" r="20" fill="#0B111E" stroke="#E2E8F0" strokeWidth="2" />
            {/* Inner Ring */}
            <circle cx="22" cy="22" r="13" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
            {/* Bavarian Quadrants */}
            <path d="M22,9 A13,13 0 0,1 35,22 L22,22 Z" fill="#0066B1" />
            <path d="M22,22 L35,22 A13,13 0 0,1 22,35 Z" fill="#FFFFFF" />
            <path d="M22,22 L22,35 A13,13 0 0,1 9,22 Z" fill="#0066B1" />
            <path d="M22,9 L22,22 L9,22 A13,13 0 0,1 22,9 Z" fill="#FFFFFF" />
            {/* Crisp B M W Typography */}
            <text x="13.5" y="7.5" fill="#FFFFFF" fontSize="4.2" fontWeight="900" fontFamily="system-ui, sans-serif">B</text>
            <text x="22" y="5.5" fill="#FFFFFF" fontSize="4.2" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle">M</text>
            <text x="30.5" y="7.5" fill="#FFFFFF" fontSize="4.2" fontWeight="900" fontFamily="system-ui, sans-serif">W</text>
          </svg>
        );

      case 'Porsche':
        // Official Stuttgart Crest: Radiant Gold, Rich Crimson, Stallion Shield
        return (
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none" style={{ filter: glowFilter }}>
            <defs>
              <linearGradient id="pGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="35%" stopColor="#EAB308" />
                <stop offset="70%" stopColor="#CA8A04" />
                <stop offset="100%" stopColor="#854D0E" />
              </linearGradient>
            </defs>
            {/* Shield Outline in Gold */}
            <path d="M17 1 L32 6 L32 25 C32 35 17 43 17 43 C17 43 2 35 2 25 L2 6 Z" fill="url(#pGold)" stroke="#FEF08A" strokeWidth="1" />
            {/* Inner Crest Field */}
            <path d="M17 3.5 L29.5 7.5 L29.5 23.5 C29.5 32 17 39 17 39 C17 39 4.5 32 4.5 23.5 L4.5 7.5 Z" fill="#0B111E" />
            {/* Wurttemberg Red & Black Quarters */}
            <path d="M4.5 7.5 L17 7.5 L17 20 L4.5 20 Z" fill="#DC2626" />
            <path d="M17 7.5 L29.5 7.5 L29.5 20 L17 20 Z" fill="#090D16" />
            <path d="M4.5 20 L17 20 L17 31 L4.5 26 Z" fill="#090D16" />
            <path d="M17 20 L29.5 20 L29.5 26 L17 31 Z" fill="#DC2626" />
            {/* Gold Antlers details */}
            <path d="M7 11 H14 M7 14 H14 M7 17 H12" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
            <path d="M20 23 H27 M20 25.5 H26 M20 28 H24" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
            {/* Center Escutcheon with Stuttgart Prancing Stallion */}
            <rect x="12" y="14" width="10" height="13" rx="2" fill="url(#pGold)" stroke="#000" strokeWidth="0.8" />
            <path d="M17 16 C18 17 18.5 18 19 19.5 C18 20 17 21 17 23.5 C16 22 15 20.5 16 18.5 C15.5 17.5 16 17 17 16 Z" fill="#000000" />
            {/* PORSCHE Header in Pure White */}
            <text x="17" y="5.8" fill="#FFFFFF" fontSize="3.3" fontWeight="900" textAnchor="middle" letterSpacing="0.8" fontFamily="system-ui, sans-serif">PORSCHE</text>
          </svg>
        );

      case 'Volkswagen':
        // Crisp Pure White 2020 VW Monogram
        return (
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" style={{ filter: glowFilter }}>
            <circle cx="21" cy="21" r="19" stroke="#FFFFFF" strokeWidth="2.4" />
            {/* Top V */}
            <path d="M14 11 L18.5 22 L21 16 L23.5 22 L28 11" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Bottom W */}
            <path d="M11 15 L17.5 32 L21 24 L24.5 32 L31 15" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'Range Rover':
        // Iconic British Racing Green Oval with Double Chrome Rim
        return (
          <svg width="68" height="34" viewBox="0 0 84 44" fill="none" style={{ filter: glowFilter }}>
            <defs>
              <linearGradient id="lrGreenBadge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B6638" />
                <stop offset="50%" stopColor="#054A27" />
                <stop offset="100%" stopColor="#023018" />
              </linearGradient>
            </defs>
            {/* Outer Oval with Metallic Rim */}
            <ellipse cx="42" cy="22" rx="40" ry="19" fill="url(#lrGreenBadge)" stroke="#E2E8F0" strokeWidth="1.8" />
            <ellipse cx="42" cy="22" rx="36.5" ry="16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none" />
            {/* LAND ROVER Typography */}
            <text x="42" y="19" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="system-ui, sans-serif">LAND</text>
            <text x="42" y="30" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="system-ui, sans-serif">ROVER</text>
            {/* Left & Right Chevron Accents */}
            <path d="M16 22 L11 19 M16 22 L11 25" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M68 22 L73 19 M68 22 L73 25" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        );

      case 'Jetour':
        // High-Contrast Red & White Jetour Badge
        return (
          <svg width="66" height="34" viewBox="0 0 78 40" fill="none" style={{ filter: glowFilter }}>
            <defs>
              <linearGradient id="jetourRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF4605" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
            {/* High-Contrast Glass Capsule */}
            <rect x="2" y="5" width="74" height="30" rx="8" fill="rgba(255, 70, 5, 0.15)" stroke="rgba(255, 70, 5, 0.5)" strokeWidth="1.5" />
            {/* Jetour Winged Chevron Motif */}
            <path d="M12 20 L18 13 L22 17 L16 24 Z" fill="url(#jetourRed)" />
            <path d="M18 20 L24 13 L28 17 L22 24 Z" fill="#FFFFFF" />
            {/* JETOUR White Typography */}
            <text x="49" y="24" fill="#FFFFFF" fontSize="9.5" fontWeight="900" letterSpacing="0.8" textAnchor="middle" fontFamily="system-ui, sans-serif">JETOUR</text>
          </svg>
        );

      case 'Ferrari':
        // Iconic Modena Yellow Shield with Tricolore & Cavallino Rampante
        return (
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none" style={{ filter: glowFilter }}>
            <defs>
              <linearGradient id="ferrariGiallo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF200" />
                <stop offset="60%" stopColor="#FFDE00" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
            </defs>
            {/* Yellow Shield */}
            <path d="M17 2 L31 6 L31 27 C31 35 17 42 17 42 C17 42 3 35 3 27 L3 6 Z" fill="url(#ferrariGiallo)" stroke="#FFFFFF" strokeWidth="1" />
            {/* Italian Tri-color bands */}
            <rect x="5" y="6" width="8" height="3.5" fill="#008C45" />
            <rect x="13" y="6" width="8" height="3.5" fill="#FFFFFF" />
            <rect x="21" y="6" width="8" height="3.5" fill="#CD212A" />
            {/* Black Prancing Horse Silhouette */}
            <path d="M17 13 C18 14.5 19 16 20 18 C18.5 18 17.5 19 16.5 21.5 C15.5 24 16 27 18 29.5 C16 28.5 14 26.5 14 23.5 C14 20.5 15.5 18.5 15 16.5 C14 15 15 13.5 17 13 Z" fill="#000000" />
            <path d="M14 25 L12 28 M18 25 L20 29 M19 18 L22 17" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
            {/* S F (Scuderia Ferrari) */}
            <text x="9" y="37" fill="#000000" fontSize="5.5" fontWeight="900" fontFamily="serif">S</text>
            <text x="25" y="37" fill="#000000" fontSize="5.5" fontWeight="900" fontFamily="serif" textAnchor="end">F</text>
          </svg>
        );

      default:
        return (
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
            {name.charAt(0)}
          </div>
        );
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isSelected ? 'scale(1.08)' : 'scale(1)'
    }}>
      {renderBadge()}
    </div>
  );
}

