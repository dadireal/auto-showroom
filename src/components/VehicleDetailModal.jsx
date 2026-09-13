import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Store, 
  Calendar, 
  Gauge, 
  Settings2, 
  Fuel, 
  ShieldCheck, 
  MessageCircle, 
  PhoneCall, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Share2,
  Heart,
  Eye,
  FileText
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function VehicleDetailModal({ 
  car, 
  isOpen, 
  onClose, 
  currency,
  isFavorite = false,
  onToggleFavorite,
  onRequestProforma,
  onOpenLightbox
}) {
  if (!isOpen || !car) return null;

  const { t, language, isRTL } = useLanguage();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const formatPrice = () => {
    if (currency === 'M') {
      const unit = language === 'ar' ? 'مليون سنتيم' : 'Millions Centimes';
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    language === 'ar'
      ? `مرحباً، أتواصل معكم بخصوص السيارة المتوفرة في صالتكم : ${car.title} (${car.year}) بسعر ${car.priceMillions} مليون (${car.priceDZD.toLocaleString('fr-FR')} دج). هل يمكن تزويدي بتفاصيل إضافية؟`
      : language === 'en'
      ? `Hello, I am contacting you regarding the vehicle available in your showroom: ${car.title} (${car.year}) at ${car.priceMillions} Million (${car.priceDZD.toLocaleString('fr-FR')} DZD). Could you provide more details?`
      : `Bonjour, je vous contacte au sujet du véhicule disponible dans votre showroom : ${car.title} (${car.year}) à ${car.priceMillions} Millions (${car.priceDZD.toLocaleString('fr-FR')} DZD). Pouvez-vous me transmettre plus de détails et les conditions de reprise ou d'achat ?`
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '980px', padding: '0', overflow: 'hidden', background: '#0F172A', border: '1px solid #1E293B' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(10px, 2vw, 16px) clamp(12px, 2.5vw, 24px)',
          borderBottom: '1px solid #1E293B',
          background: '#0B0F19',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            <span className={`badge ${car.condition === 'neuf' ? 'badge-new' : 'badge-used'}`} style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
              {car.condition === 'neuf' ? t('card.newBadge') : t('card.usedBadge')}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
              <MapPin size={13} color="#FBBF24" />
              <span>{car.wilaya}</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            {/* 360 Lightbox Button */}
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(car)}
              style={{
                background: 'rgba(251, 191, 36, 0.12)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#FBBF24',
                cursor: 'pointer'
              }}
              title={t('lightbox.viewGallery')}
            >
              <Eye size={13} />
              <span className="desktop-text">360° {t('lightbox.viewGallery')}</span>
              <span className="mobile-text">360°</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(car)}
              style={{
                background: isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.06)',
                border: isFavorite ? '1px solid #EF4444' : '1px solid #1E293B',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isFavorite ? '#EF4444' : '#CBD5E1',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0
              }}
              title={isFavorite ? 'Retirer du garage' : 'Sauvegarder dans mon garage'}
            >
              <Heart size={14} fill={isFavorite ? '#EF4444' : 'none'} color={isFavorite ? '#EF4444' : '#CBD5E1'} />
            </button>

            <button
              onClick={handleShare}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid #1E293B',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: copied ? '#10B981' : '#CBD5E1',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0
              }}
              title={copied ? (language === 'ar' ? 'تم نسخ الرابط !' : 'Lien copié !') : (language === 'ar' ? 'مشاركة' : 'Partager')}
            >
              <Share2 size={14} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid #1E293B',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div style={{ maxHeight: '84vh', overflowY: 'auto', padding: 'clamp(14px, 3vw, 24px)' }}>
          {/* Main Photo & Carousel (clickable to open 360 lightbox) */}
          <div 
            style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', background: '#080C14', marginBottom: '14px', border: '1px solid #1E293B', cursor: 'pointer' }}
            onClick={() => onOpenLightbox && onOpenLightbox(car)}
          >
            <img 
              src={car.images[activePhotoIdx] || car.images[0]} 
              alt={car.title} 
              style={{ width: '100%', maxHeight: '460px', objectFit: 'contain', display: 'block' }} 
            />

            {/* Hint pill to open lightbox */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              background: 'rgba(9, 13, 22, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '4px 10px',
              color: '#FBBF24',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(10px)'
            }}>
              <Eye size={13} />
              <span>Agrandir & Galerie 360°</span>
            </div>

            {car.images.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev - 1 + car.images.length) % car.images.length)}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev + 1) % car.images.length)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row */}
          {car.images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '6px' }}>
              {car.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Aperçu"
                  onClick={() => setActivePhotoIdx(idx)}
                  style={{
                    width: '90px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: activePhotoIdx === idx ? '2px solid #FBBF24' : '1px solid #1E293B',
                    opacity: activePhotoIdx === idx ? 1 : 0.6,
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          )}

          {/* Title & Price Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid #1E293B'
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.15rem, 3.2vw, 1.65rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px', lineHeight: 1.25 }}>
                {car.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.84rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Store size={14} color="#FBBF24" />
                  {language === 'ar' ? 'المعرض :' : language === 'en' ? 'Showroom:' : 'Showroom :'} <strong style={{ color: '#E2E8F0' }}>{car.showroom}</strong>
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: 700 }}>
                  <ShieldCheck size={14} />
                  {language === 'ar' ? 'فحص معتمد :' : language === 'en' ? 'Certified Inspection:' : 'Contrôle Certifié :'} {car.inspectionScore}/100
                </span>
              </div>
            </div>

            <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
              <div style={{ fontSize: 'clamp(1.3rem, 3.8vw, 1.85rem)', fontWeight: 900, color: '#FBBF24', lineHeight: 1.15 }}>
                {formatPrice()}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
                {language === 'ar' ? 'الوثائق :' : language === 'en' ? 'Papers:' : 'Papiers :'} <strong style={{ color: '#10B981' }}>{car.papers}</strong>
              </div>
            </div>
          </div>

          {/* Key Specs Table Grid */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 800 }}>
              {language === 'ar' ? 'البطاقة التقنية المفصلة' : language === 'en' ? 'Detailed Technical Specifications' : 'Fiche Technique Détaillée'}
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '10px',
              background: '#080C14',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid #1E293B'
            }}>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{t('hero.brand')} :</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.brand}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{t('hero.model')} :</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.model}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{language === 'ar' ? 'سنة الصنع :' : language === 'en' ? 'Year:' : 'Année :'}</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.year}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{t('card.mileage')} :</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.mileage === 0 ? (language === 'ar' ? '00 كم جديد' : '00 km Neuf') : `${car.mileage.toLocaleString()} ${language === 'ar' ? 'كم' : 'km'}`}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{t('card.gearbox')} :</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.transmission}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{language === 'ar' ? 'المحرك :' : language === 'en' ? 'Engine:' : 'Motorisation :'}</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.engine}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{t('card.fuel')} :</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.fuel}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{language === 'ar' ? 'نظام الدفع :' : language === 'en' ? 'Drivetrain:' : 'Transmission :'}</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.drivetrain}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{language === 'ar' ? 'اللون :' : language === 'en' ? 'Color:' : 'Couleur :'}</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.color}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.75rem' }}>{language === 'ar' ? 'الموقع :' : language === 'en' ? 'Location:' : 'Emplacement :'}</span> <strong style={{ display: 'block', color: '#FFFFFF', fontSize: '0.84rem' }}>{car.wilaya}</strong></div>
            </div>
          </div>

          {/* Options & Equipment */}
          {car.features && car.features.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 800 }}>
                {language === 'ar' ? 'التجهيزات والخيارات المرفقة' : language === 'en' ? 'Included Equipment & Features' : 'Équipements & Options Inclus'}
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '8px'
              }}>
                {car.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#CBD5E1' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={12} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller / Showroom Direct Contact Section */}
          <div style={{
            background: '#0B0F19',
            color: '#fff',
            borderRadius: '10px',
            padding: 'clamp(14px, 3vw, 22px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            border: '1px solid #1E293B'
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#FBBF24', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>
                {language === 'ar' ? 'معرض شريك معتمد وموثق' : language === 'en' ? 'Verified Partner Showroom' : 'Showroom Concessionnaire Vérifié'}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '4px', fontWeight: 800 }}>
                {car.showroom}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: 0 }}>
                {language === 'ar' 
                  ? 'السيارة متوفرة فوراً في المعرض مع فحص تقني كامل وإمكانية تجربة القيادة.' 
                  : language === 'en' 
                  ? 'Immediate vehicle availability on lot with complete technical inspection and road test.' 
                  : 'Disponibilité immédiate du véhicule sur parc avec contrôle technique et essai sur route.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%', marginTop: '4px' }}>
              <button
                onClick={() => onRequestProforma && onRequestProforma(car)}
                className="btn-primary"
                style={{ flex: '1 1 140px', fontSize: '0.84rem', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <FileText size={15} />
                <span>{t('proforma.btn')}</span>
              </button>

              <a
                href={`tel:${car.phone.replace(/\s+/g, '')}`}
                className="btn-outline"
                style={{ flex: '1 1 130px', fontSize: '0.84rem', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <PhoneCall size={15} />
                <span>{language === 'ar' ? `اتصال ${car.phone}` : language === 'en' ? `Call ${car.phone}` : `Appeler ${car.phone}`}</span>
              </a>

              <a
                href={`https://wa.me/${car.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ flex: '1 1 150px', fontSize: '0.84rem', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <MessageCircle size={16} />
                <span>{language === 'ar' ? 'واتساب' : language === 'en' ? 'WhatsApp' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
