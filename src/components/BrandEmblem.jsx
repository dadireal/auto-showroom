import React from 'react';

export default function BrandEmblem({ name, isSelected }) {
  const strokeColor = isSelected ? '#FFFFFF' : '#CBD5E1';

  switch (name) {
    case 'Audi':
      return (
        <svg width="68" height="30" viewBox="0 0 100 40" fill="none">
          <circle cx="20" cy="20" r="14" stroke={strokeColor} strokeWidth="3" />
          <circle cx="40" cy="20" r="14" stroke={strokeColor} strokeWidth="3" />
          <circle cx="60" cy="20" r="14" stroke={strokeColor} strokeWidth="3" />
          <circle cx="80" cy="20" r="14" stroke={strokeColor} strokeWidth="3" />
        </svg>
      );

    case 'Mercedes-Benz':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M20 3 L20 20 L6 27 Z" fill={strokeColor} />
          <path d="M20 3 L20 20 L34 27 Z" fill={strokeColor} />
          <path d="M6 27 L20 20 L20 37 Z" fill={strokeColor} />
          <path d="M34 27 L20 20 L20 37 Z" fill={strokeColor} />
        </svg>
      );

    case 'BMW':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill="#1E293B" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="20" cy="20" r="12" fill="#0066B1" />
          {/* Top-right & Bottom-left white quarters */}
          <path d="M20 8 A12 12 0 0 1 32 20 L20 20 Z" fill="#FFFFFF" />
          <path d="M20 32 A12 12 0 0 1 8 20 L20 20 Z" fill="#FFFFFF" />
          <circle cx="20" cy="20" r="12" stroke={strokeColor} strokeWidth="1" fill="none" />
        </svg>
      );

    case 'Porsche':
      return (
        <svg width="34" height="36" viewBox="0 0 36 40" fill="none">
          {/* Gold Shield */}
          <path d="M18 2 L32 7 L32 22 C32 31 18 38 18 38 C18 38 4 31 4 22 L4 7 Z" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
          <path d="M18 4 L30 8 L30 20 C30 27 18 34 18 34 C18 34 6 27 6 20 L6 8 Z" fill="#B45309" />
          {/* Center Prancing Stallion silhouette */}
          <rect x="15" y="10" width="6" height="12" fill="#111827" rx="2" />
          <path d="M18 9 L18 23" stroke="#FDE68A" strokeWidth="1" />
          <text x="18" y="7" fill="#FEF3C7" fontSize="4.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">PORSCHE</text>
        </svg>
      );

    case 'Ferrari':
      return (
        <svg width="32" height="38" viewBox="0 0 32 40" fill="none">
          {/* Yellow Shield with Italian Tri-color top */}
          <path d="M16 2 L29 6 L29 24 C29 32 16 38 16 38 C16 38 3 32 3 24 L3 6 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
          {/* Italian Tri-color band */}
          <rect x="5" y="6" width="7" height="3" fill="#16A34A" />
          <rect x="12" y="6" width="8" height="3" fill="#FFFFFF" />
          <rect x="20" y="6" width="7" height="3" fill="#DC2626" />
          {/* Black Prancing Horse Silhouette */}
          <path d="M16 12 C18 14 18 16 20 18 C18 18 16 19 15 22 C14 25 15 28 17 30 C15 29 13 27 13 24 C13 21 15 19 14 17 C13 15 14 13 16 12 Z" fill="#000000" />
          <text x="16" y="34" fill="#000000" fontSize="4.5" fontWeight="900" textAnchor="middle">S F</text>
        </svg>
      );

    case 'Volkswagen':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke={strokeColor} strokeWidth="2.5" fill="none" />
          <path d="M11 13 L17 31 L20 22 L23 31 L29 13" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M14 9 L17 19 L20 14 L23 19 L26 9" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'Range Rover':
      return (
        <div style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)',
          border: `1.5px solid ${isSelected ? '#34D399' : '#059669'}`,
          borderRadius: '999px',
          padding: '5px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 900,
            letterSpacing: '0.12em',
            color: '#ECFDF5',
            whiteSpace: 'nowrap'
          }}>
            LAND ROVER
          </span>
        </div>
      );

    case 'Jetour':
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 10px',
          background: 'rgba(255, 70, 5, 0.1)',
          border: '1px solid rgba(255, 70, 5, 0.35)',
          borderRadius: '6px'
        }}>
          <span style={{
            color: '#FF4605',
            fontWeight: 900,
            fontSize: '0.95rem',
            letterSpacing: '-0.02em'
          }}>
            JETOUR
          </span>
          <span style={{
            width: '6px',
            height: '6px',
            background: '#FF4605',
            borderRadius: '50%'
          }} />
        </div>
      );

    default:
      return (
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: `2px solid ${strokeColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          color: strokeColor,
          fontSize: '0.9rem'
        }}>
          {name.charAt(0)}
        </div>
      );
  }
}
