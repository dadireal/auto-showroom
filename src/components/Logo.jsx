import React from 'react';

export default function Logo({ size = 'medium', subtitle = 'SHOWROOM' }) {
  return (
    <div className="site-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
      {/* Sleek Automotive Emblem */}
      <div className="logo-emblem" style={{
        width: size === 'large' ? '46px' : '38px',
        height: size === 'large' ? '46px' : '38px',
        background: 'linear-gradient(135deg, #1e2536 0%, #0d111a 100%)',
        border: '1.5px solid rgba(255, 70, 5, 0.6)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(255, 70, 5, 0.25)',
        flexShrink: 0
      }}>
        <svg 
          width={size === 'large' ? '28' : '22'} 
          height={size === 'large' ? '28' : '22'} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" stroke="#ffffff" />
          <circle cx="7" cy="17" r="2" stroke="#ff4605" fill="#ff4605" />
          <path d="M9 17h6" stroke="#ffffff" />
          <circle cx="17" cy="17" r="2" stroke="#ff4605" fill="#ff4605" />
        </svg>
      </div>

      {/* Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="logo-text-main logo-text-brand" style={{
            fontSize: size === 'large' ? '1.5rem' : '1.25rem',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-heading)'
          }}>
            AUTO
          </span>
          <span className="logo-text-main" style={{
            fontSize: size === 'large' ? '1.5rem' : '1.25rem',
            fontWeight: 900,
            color: 'var(--primary)',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-heading)'
          }}>
            SHOWROOM
          </span>
        </div>
        <span className="logo-subtitle" style={{
          fontSize: '0.62rem',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginTop: '3px'
        }}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}
