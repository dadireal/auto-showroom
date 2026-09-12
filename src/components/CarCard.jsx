import React, { useState } from 'react';
import { 
  Store, 
  MessageCircle, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  GitCompare,
  ShieldCheck,
  Heart,
  MapPin,
  FileText,
  Eye
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function CarCard({ 
  car, 
  currency, 
  isCompared, 
  onToggleCompare, 
  onViewDetails,
  isFavorite = false,
  onToggleFavorite,
  onRequestProforma,
  onOpenLightbox
}) {
  const { t, language, isRTL } = useLanguage();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [localFavorite, setLocalFavorite] = useState(false);
  const effectiveFavorite = onToggleFavorite ? isFavorite : localFavorite;

  // Price formatting based on selected currency
  const formatColloquialPrice = () => {
    if (currency === 'M') {
      const unit = language === 'ar' ? 'مليون سنتيم' : 'M';
      return `${car.priceMillions.toLocaleString('fr-FR')} ${unit}`;
    } else if (currency === 'DZD') {
      const unit = language === 'ar' ? 'دج' : 'DZD';
      return `${car.priceDZD.toLocaleString('fr-FR')} ${unit}`;
    } else if (currency === 'EUR') {
      const eur = Math.round(car.priceDZD / 240);
      return `~${eur.toLocaleString('fr-FR')} €`;
    }
    return `${car.priceMillions} M`;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const whatsappMessage = encodeURIComponent(
    language === 'ar'
      ? `مرحباً، أتواصل معكم بخصوص سيارة: ${car.title} (${car.year}) المعروضة بسعر ${car.priceMillions} مليون سنتيم (${car.priceDZD.toLocaleString('fr-FR')} دج). هل هي متوفرة حالياً في المعرض؟`
      : language === 'en'
      ? `Hello, I am inquiring about the vehicle: ${car.title} (${car.year}) listed at ${car.priceMillions} Million Centimes (${car.priceDZD.toLocaleString('fr-FR')} DZD). Is it still available in the showroom?`
      : `Bonjour, je vous contacte au sujet du véhicule : ${car.title} (${car.year}) affiché à ${car.priceMillions} Millions Centimes (${car.priceDZD.toLocaleString('fr-FR')} DZD). Est-il toujours disponible en showroom ?`
  );

  return (
    <div className="car-card">
      {/* Strict 16:10 Aspect Ratio Image Container with Cinematic Vignette */}
      <div 
        className="car-card-image-wrap" 
        onClick={() => onOpenLightbox ? onOpenLightbox(car) : onViewDetails(car)} 
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <img 
          src={car.images[currentImgIndex] || car.images[0]} 
          alt={car.title} 
          className="car-card-img"
          loading="lazy"
        />

        {/* Subtle Bottom Vignette Gradient to let Title & Specs breathe */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9, 13, 22, 0.02) 50%, rgba(15, 23, 42, 0.96) 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }} />

        {/* 360 Badge Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          insetInlineEnd: '10px',
          background: 'rgba(9, 13, 22, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '6px',
          padding: '2px 7px',
          color: '#FBBF24',
          fontSize: '10px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 4,
          backdropFilter: 'blur(8px)'
        }}>
          <Eye size={11} color="#FBBF24" />
          <span>360°</span>
        </div>

        {/* Top Tag: Exactly 1 Sleek Status Tag per Card */}
        <div style={{ position: 'absolute', top: '12px', insetInlineStart: '12px', zIndex: 4 }}>
          {car.condition === 'neuf' ? (
            <span style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'rgba(16, 185, 129, 0.16)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34D399',
              fontWeight: 700,
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '6px',
              letterSpacing: '0.03em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {t('card.newBadge')}
            </span>
          ) : (
            <span style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#CBD5E1',
              fontWeight: 700,
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '6px',
              letterSpacing: '0.03em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {t('card.usedBadge')}
            </span>
          )}
        </div>

        {/* Top: Wilaya Badge & Subtle Heart */}
        <div style={{
          position: 'absolute',
          top: '12px',
          insetInlineEnd: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 4
        }}>
          <span style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            background: 'rgba(9, 13, 22, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#E2E8F0',
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <MapPin size={11} color="#FF6B00" />
            {car.wilaya}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavorite) onToggleFavorite(car);
              else setLocalFavorite(!localFavorite);
            }}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: effectiveFavorite ? 'rgba(239, 68, 68, 0.9)' : 'rgba(9, 13, 22, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: effectiveFavorite ? '#ffffff' : '#e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: effectiveFavorite ? '0 0 12px rgba(239, 68, 68, 0.6)' : 'none'
            }}
            title={effectiveFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart size={13} fill={effectiveFavorite ? '#ffffff' : 'none'} color={effectiveFavorite ? '#ffffff' : '#cbd5e1'} />
          </button>
        </div>

        {/* Multi-photo Navigation Arrows */}
        {car.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 6,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Précédent"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 6,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Suivant"
            >
              <ChevronRight size={16} />
            </button>

            {/* Indicator Dots */}
            <div className="car-card-nav-dots">
              {car.images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`car-card-dot ${idx === currentImgIndex ? 'active' : ''}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body - Mathematical Precision Alignment */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Dealership & Inspection Score */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.78rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94A3B8', fontWeight: 600 }}>
            <Store size={13} color="#FF6B00" />
            <span style={{ maxWidth: '145px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {car.showroom}
            </span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#10B981', fontWeight: 700, fontSize: '0.75rem' }}>
            <ShieldCheck size={13} />
            {car.inspectionScore}/100
          </span>
        </div>

        {/* Vehicle Title with Exact 2-Line Height Clamp */}
        <h3 
          onClick={() => onViewDetails(car)}
          style={{
            fontSize: '1.02rem',
            fontWeight: 800,
            lineHeight: 1.35,
            height: '2.8rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            color: '#FFFFFF',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
          title={car.title}
        >
          {car.title}
        </h3>

        {/* Pricing Area: Bold Colloquial Millions & Tabular Legal DZD */}
        <div style={{
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div>
            {/* Bold, prominent colloquial price in bright amber/orange */}
            <div style={{
              fontSize: '1.55rem',
              fontWeight: 900,
              color: '#FBBF24',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              {formatColloquialPrice()}
            </div>
            {/* Crisp, tabular legal price in slate-300 */}
            {currency !== 'DZD' && (
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#CBD5E1',
                fontVariantNumeric: 'tabular-nums',
                marginTop: '3px'
              }}>
                {car.priceDZD.toLocaleString('fr-FR')} DZD
              </div>
            )}
          </div>

          <span style={{
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#94A3B8',
            fontWeight: 600
          }}>
            {car.papers}
          </span>
        </div>

        {/* Minimalist 3-Pillar Specs Layout (Boîte • Carburant • Kilométrage) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'center',
          background: 'rgba(9, 13, 22, 0.65)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '8px 4px',
          marginBottom: '16px'
        }}>
          {/* Pillar 1: Boîte */}
          <div style={{ textAlign: 'center', borderInlineEnd: '1px solid rgba(255, 255, 255, 0.06)', padding: '0 4px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
              {t('card.gearbox')}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={car.transmission}>
              {car.transmission}
            </div>
          </div>

          {/* Pillar 2: Carburant */}
          <div style={{ textAlign: 'center', borderInlineEnd: '1px solid rgba(255, 255, 255, 0.06)', padding: '0 4px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
              {t('card.fuel')}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={car.fuel}>
              {car.fuel}
            </div>
          </div>

          {/* Pillar 3: Kilométrage */}
          <div style={{ textAlign: 'center', padding: '0 4px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>
              {t('card.mileage')}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {car.mileage === 0 ? (language === 'ar' ? '00 كم' : '00 km') : `${car.mileage.toLocaleString('fr-FR')} ${language === 'ar' ? 'كم' : 'km'}`}
            </div>
          </div>
        </div>

        {/* CTA Alignment: Full Touch WhatsApp with Glowing Hover State */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '14px'
        }}>
          {/* Primary Touch: WhatsApp Showroom Button */}
          <a
            href={`https://wa.me/${car.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{
              flex: 1,
              padding: '11px 14px',
              fontSize: '0.84rem'
            }}
          >
            <MessageCircle size={16} />
            <span>{t('card.whatsappShowroom')}</span>
          </a>

          {/* Secondary Outline Action: Proforma / Devis */}
          <button
            onClick={() => onRequestProforma && onRequestProforma(car)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255, 107, 0, 0.12)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              color: '#FF6B00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            title={t('proforma.btn')}
          >
            <FileText size={15} />
          </button>

          {/* Secondary Outline Action: Compare */}
          <button
            onClick={() => onToggleCompare(car)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: isCompared ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: isCompared ? '1.5px solid #FBBF24' : '1px solid rgba(255, 255, 255, 0.08)',
              color: isCompared ? '#FBBF24' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            title={isCompared ? t('card.removeCompare') : t('card.compare')}
          >
            <GitCompare size={15} />
          </button>

          {/* Secondary Outline Action: View Full Specs */}
          <button
            onClick={() => onViewDetails(car)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            title={t('card.details')}
          >
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
