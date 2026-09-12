import React from 'react';
import { Store, MapPin, Phone, MessageCircle, Star, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { SHOWROOMS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

export default function ShowroomsSection({ vehicles = [], onSelectShowroom }) {
  const { t, isRTL, language } = useLanguage();

  return (
    <section id="showrooms" style={{ padding: '96px 0', background: '#090D16', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
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
            <Store size={14} />
            {t('showrooms.badge')}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#FFFFFF', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.02em' }}>
            {t('showrooms.title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.96rem', lineHeight: 1.6 }}>
            {t('showrooms.subtitle')}
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="showrooms-grid">
          {SHOWROOMS.map(sr => {
            const showroomCount = vehicles.filter(v => v.showroom.toLowerCase() === sr.name.toLowerCase()).length;
            const waText = encodeURIComponent(
              language === 'ar'
                ? `مرحباً، أتواصل معكم بخصوص السيارات المتاحة في معرض ${sr.name}.`
                : language === 'en'
                ? `Hello, I am contacting you regarding your inventory at ${sr.name}.`
                : `Bonjour, je vous contacte au sujet de vos véhicules disponibles chez ${sr.name}.`
            );

            return (
              <div key={sr.id} className="showroom-card">
                {/* Showroom Image */}
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={sr.image} 
                    alt={sr.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(15, 23, 42, 0.9) 100%)',
                    pointerEvents: 'none'
                  }} />

                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    insetInlineEnd: '12px',
                    background: 'rgba(9, 13, 22, 0.72)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={12} fill="#FBBF24" color="#FBBF24" />
                    {sr.rating}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    insetInlineStart: '12px',
                    background: 'rgba(16, 185, 129, 0.18)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    backdropFilter: 'blur(8px)',
                    color: '#34D399',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.04em'
                  }}>
                    {showroomCount} {t('showrooms.stockCount')}
                  </div>
                </div>

                {/* Showroom Content */}
                <div style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <ShieldCheck size={15} color="#10B981" />
                    <span style={{ fontSize: '0.76rem', color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {t('showrooms.certified')}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>
                    {sr.name}
                  </h3>

                  <p style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    color: '#94A3B8',
                    fontSize: '0.85rem',
                    marginBottom: '16px',
                    minHeight: '2.4rem'
                  }}>
                    <MapPin size={15} color="#FF6B00" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{sr.address}</span>
                  </p>

                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '18px' }}>
                    {t('showrooms.hours')} <strong style={{ color: '#CBD5E1' }}>{sr.openingHours}</strong>
                  </div>

                  {/* Direct Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <a
                      href={`tel:${sr.phone.replace(/\s+/g, '')}`}
                      className="btn-outline"
                      style={{
                        flex: 1,
                        padding: '9px 8px',
                        fontSize: '0.82rem',
                        color: '#E2E8F0',
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                        background: 'rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <Phone size={14} />
                      <span>{t('showrooms.call')}</span>
                    </a>

                    <a
                      href={`https://wa.me/${sr.whatsapp}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                      style={{ flex: 1, padding: '9px 8px', fontSize: '0.82rem' }}
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onSelectShowroom(sr.name)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#E2E8F0',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)';
                      e.currentTarget.style.color = '#FBBF24';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.color = '#E2E8F0';
                    }}
                  >
                    <span>{t('showrooms.viewInventory')} ({showroomCount})</span>
                    {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
