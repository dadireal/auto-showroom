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
          padding: '16px 24px',
          borderBottom: '1px solid #1E293B',
          background: '#0B0F19'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${car.condition === 'neuf' ? 'badge-new' : 'badge-used'}`}>
              {car.condition === 'neuf' ? t('card.newBadge') : t('card.usedBadge')}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="#FBBF24" />
              {car.wilaya}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* 360 Lightbox Button */}
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(car)}
              style={{
                background: 'rgba(251, 191, 36, 0.12)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#FBBF24',
                cursor: 'pointer'
              }}
              title={t('lightbox.viewGallery')}
            >
              <Eye size={14} />
              <span>360° {t('lightbox.viewGallery')}</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(car)}
              style={{
                background: isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.06)',
                border: isFavorite ? '1px solid #EF4444' : '1px solid #1E293B',
                padding: '6px 10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: isFavorite ? '#EF4444' : '#CBD5E1',
                cursor: 'pointer'
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
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#CBD5E1',
                cursor: 'pointer'
              }}
            >
              <Share2 size={14} />
              {copied ? (language === 'ar' ? 'تم نسخ الرابط !' : language === 'en' ? 'Link Copied!' : 'Lien copié !') : (language === 'ar' ? 'مشاركة' : language === 'en' ? 'Share' : 'Partager')}
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid #1E293B',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div style={{ maxHeight: '82vh', overflowY: 'auto', padding: '24px' }}>
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
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '20px',
            borderBottom: '1px solid #1E293B'
          }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '6px' }}>
                {car.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Store size={16} color="#FBBF24" />
                  {language === 'ar' ? 'المعرض :' : language === 'en' ? 'Showroom:' : 'Showroom :'} <strong style={{ color: '#E2E8F0' }}>{car.showroom}</strong>
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: 700 }}>
                  <ShieldCheck size={16} />
                  {language === 'ar' ? 'فحص معتمد :' : language === 'en' ? 'Certified Inspection:' : 'Contrôle Certifié :'} {car.inspectionScore}/100
                </span>
              </div>
            </div>

            <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FBBF24' }}>
                {formatPrice()}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                {language === 'ar' ? 'الوثائق :' : language === 'en' ? 'Papers:' : 'Papiers :'} <strong style={{ color: '#10B981' }}>{car.papers}</strong>
              </div>
            </div>
          </div>

          {/* Key Specs Table Grid */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '14px', fontWeight: 800 }}>
              {language === 'ar' ? 'البطاقة التقنية المفصلة' : language === 'en' ? 'Detailed Technical Specifications' : 'Fiche Technique Détaillée'}
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              background: '#080C14',
              padding: '18px',
              borderRadius: '8px',
              border: '1px solid #1E293B'
            }}>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{t('hero.brand')} :</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.brand}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{t('hero.model')} :</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.model}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{language === 'ar' ? 'سنة الصنع :' : language === 'en' ? 'Year:' : 'Année :'}</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.year}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{t('card.mileage')} :</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.mileage === 0 ? (language === 'ar' ? '00 كم جديد' : '00 km Neuf') : `${car.mileage.toLocaleString()} ${language === 'ar' ? 'كم' : 'km'}`}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{t('card.gearbox')} :</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.transmission}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{language === 'ar' ? 'المحرك :' : language === 'en' ? 'Engine:' : 'Motorisation :'}</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.engine}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{t('card.fuel')} :</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.fuel}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{language === 'ar' ? 'نظام الدفع :' : language === 'en' ? 'Drivetrain:' : 'Transmission :'}</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.drivetrain}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{language === 'ar' ? 'اللون :' : language === 'en' ? 'Color:' : 'Couleur :'}</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.color}</strong></div>
              <div><span style={{ color: '#64748B', fontSize: '0.8rem' }}>{language === 'ar' ? 'الموقع :' : language === 'en' ? 'Location:' : 'Emplacement :'}</span> <strong style={{ display: 'block', color: '#FFFFFF' }}>{car.wilaya}</strong></div>
            </div>
          </div>

          {/* Options & Equipment */}
          {car.features && car.features.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '14px', fontWeight: 800 }}>
                {language === 'ar' ? 'التجهيزات والخيارات المرفقة' : language === 'en' ? 'Included Equipment & Features' : 'Équipements & Options Inclus'}
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '10px'
              }}>
                {car.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#CBD5E1' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={13} />
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
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            border: '1px solid #1E293B'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#FBBF24', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                {language === 'ar' ? 'معرض شريك معتمد وموثق' : language === 'en' ? 'Verified Partner Showroom' : 'Showroom Concessionnaire Vérifié'}
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '6px', fontWeight: 800 }}>
                {car.showroom}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
                {language === 'ar' 
                  ? 'السيارة متوفرة فوراً في المعرض مع فحص تقني كامل وإمكانية تجربة القيادة.' 
                  : language === 'en' 
                  ? 'Immediate vehicle availability on lot with complete technical inspection and road test.' 
                  : 'Disponibilité immédiate du véhicule sur parc avec contrôle technique et essai sur route.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onRequestProforma && onRequestProforma(car)}
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FileText size={16} />
                <span>{t('proforma.btn')}</span>
              </button>

              <a
                href={`tel:${car.phone.replace(/\s+/g, '')}`}
                className="btn-outline"
                style={{ fontSize: '0.9rem', padding: '10px 18px' }}
              >
                <PhoneCall size={16} />
                <span>{language === 'ar' ? `اتصال ${car.phone}` : language === 'en' ? `Call ${car.phone}` : `Appeler ${car.phone}`}</span>
              </a>

              <a
                href={`https://wa.me/${car.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ fontSize: '0.9rem', padding: '10px 20px' }}
              >
                <MessageCircle size={18} />
                <span>{language === 'ar' ? 'محادثة عبر واتساب' : language === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
