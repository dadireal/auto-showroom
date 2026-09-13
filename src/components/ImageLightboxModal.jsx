import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Play, Pause, Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ImageLightboxModal({
  isOpen,
  onClose,
  vehicle,
  initialIndex = 0
}) {
  if (!isOpen || !vehicle) return null;

  const { t, language, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Gallery Perspectives Definition
  const primaryImg = (vehicle.images && vehicle.images[0]) || '/cars/bmw_m4_competition.jpg';

  // Perspectives tailored per brand/bodyType with high-res automotive photography
  const gallery = [
    {
      id: 1,
      title: t('lightbox.exteriorFront'),
      url: primaryImg,
      hotspots: [
        { x: 28, y: 68, label: 'Phares LED Matrix avec signature lumineuse dynamique' },
        { x: 50, y: 72, label: 'Calandre active avec capteurs d\'aide à la conduite radar' },
        { x: 74, y: 76, label: 'Jantes alliage allégées bicolores avec étriers sport' }
      ]
    },
    {
      id: 2,
      title: t('lightbox.exteriorSide'),
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
      hotspots: [
        { x: 35, y: 65, label: 'Pack Aérodynamique & Rétroviseurs en fibre de carbone' },
        { x: 65, y: 40, label: 'Vitrage acoustique surteinté athermique' }
      ]
    },
    {
      id: 3,
      title: t('lightbox.exteriorRear'),
      url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
      hotspots: [
        { x: 50, y: 72, label: 'Diffuseur sport avec quadruple sorties d\'échappement à clapets' },
        { x: 68, y: 52, label: 'Feux arrière OLED 3D avec clignotants à défilement' }
      ]
    },
    {
      id: 4,
      title: t('lightbox.interiorCockpit'),
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
      hotspots: [
        { x: 42, y: 48, label: 'Cockpit numérique haute définition 12.3 pouces avec affichage tête haute' },
        { x: 68, y: 62, label: 'Console centrale tactile avec sélecteur de modes de conduite' }
      ]
    },
    {
      id: 5,
      title: t('lightbox.interiorSeats'),
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
      hotspots: [
        { x: 48, y: 55, label: 'Sièges sport ergonomiques en cuir Nappa chauffants et ventilés' },
        { x: 70, y: 35, label: 'Système audio Surround Haute Fidélité premium' }
      ]
    },
    {
      id: 6,
      title: t('lightbox.engineBay'),
      url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=85',
      hotspots: [
        { x: 50, y: 55, label: vehicle.engine || 'Moteur TwinPower Turbo haute performance' }
      ]
    }
  ];

  const currentItem = gallery[currentIndex] || gallery[0];

  const handleNext = useCallback(() => {
    setActiveHotspot(null);
    setCurrentIndex(prev => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const handlePrev = useCallback(() => {
    setActiveHotspot(null);
    setCurrentIndex(prev => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') isRTL ? handlePrev() : handleNext();
      if (e.key === 'ArrowLeft') isRTL ? handleNext() : handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, isRTL]);

  // Auto 360 spin timer
  useEffect(() => {
    let interval;
    if (isAutoSpin) {
      interval = setInterval(() => {
        handleNext();
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isAutoSpin, handleNext]);

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        zIndex: 1200,
        background: 'rgba(5, 8, 15, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: 0
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Header Bar */}
        <div style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(11, 17, 30, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 30
        }}>
          {/* Vehicle Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 'clamp(0.95rem, 3vw, 1.2rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {vehicle.title}
                </h3>
                <span style={{
                  background: vehicle.condition === 'neuf' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 107, 0, 0.2)',
                  color: vehicle.condition === 'neuf' ? '#10B981' : '#FF6B00',
                  border: `1px solid ${vehicle.condition === 'neuf' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 107, 0, 0.4)'}`,
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {vehicle.year} • {vehicle.mileage === 0 ? '00 km' : `${vehicle.mileage.toLocaleString()} km`}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                📍 {vehicle.showroom} • {currentItem.title}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Auto Spin Toggle */}
            <button
              onClick={() => setIsAutoSpin(!isAutoSpin)}
              style={{
                background: isAutoSpin ? 'rgba(255, 107, 0, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${isAutoSpin ? '#FF6B00' : 'rgba(255, 255, 255, 0.12)'}`,
                color: isAutoSpin ? '#FF6B00' : '#CBD5E1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isAutoSpin ? <Pause size={14} /> : <Play size={14} />}
              <span className="desktop-text">{isAutoSpin ? t('lightbox.stopSpin') : t('lightbox.autoSpin')}</span>
            </button>

            {/* Zoom Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              style={{
                background: isZoomed ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${isZoomed ? '#FBBF24' : 'rgba(255, 255, 255, 0.12)'}`,
                color: isZoomed ? '#FBBF24' : '#CBD5E1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
              <span className="desktop-text">{isZoomed ? t('lightbox.zoomOut') : t('lightbox.zoomIn')}</span>
            </button>

            {/* Counter pill */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.76rem',
              color: '#94A3B8',
              fontWeight: 700
            }}>
              {currentIndex + 1} / {gallery.length}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '20px'
        }}>
          {/* Navigation Arrow Left */}
          <button
            onClick={isRTL ? handleNext : handlePrev}
            style={{
              position: 'absolute',
              left: isRTL ? 'auto' : '24px',
              right: isRTL ? '24px' : 'auto',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 40,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              transition: 'all 0.2s'
            }}
          >
            {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>

          {/* Image Container with Zoom & Hotspots */}
          <div 
            style={{
              position: 'relative',
              maxWidth: isZoomed ? '135%' : '88%',
              maxHeight: isZoomed ? '135%' : '82vh',
              transition: 'transform 0.3s ease, max-width 0.3s ease, max-height 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={currentItem.url}
              alt={currentItem.title}
              style={{
                maxWidth: '100%',
                maxHeight: '74vh',
                borderRadius: '14px',
                objectFit: 'contain',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Feature Hotspots Overlay */}
            {!isZoomed && currentItem.hotspots && currentItem.hotspots.map((hs, idx) => {
              const isActive = activeHotspot === idx;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `${hs.x}%`,
                    top: `${hs.y}%`
                  }}
                >
                  <div 
                    className="hotspot-beacon"
                    onClick={() => setActiveHotspot(isActive ? null : idx)}
                    onMouseEnter={() => setActiveHotspot(idx)}
                  >
                    <div className="hotspot-dot" />
                  </div>

                  {/* Tooltip Card */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid #FF6B00',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8)',
                      zIndex: 50,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      animation: 'fadeIn 0.2s ease'
                    }}>
                      <Sparkles size={13} color="#FF6B00" />
                      <span>{hs.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow Right */}
          <button
            onClick={isRTL ? handlePrev : handleNext}
            style={{
              position: 'absolute',
              right: isRTL ? 'auto' : '24px',
              left: isRTL ? '24px' : 'auto',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 40,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              transition: 'all 0.2s'
            }}
          >
            {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        {/* Bottom Filmstrip Carousel */}
        <div style={{
          padding: '12px 24px 18px',
          background: 'rgba(11, 17, 30, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          overflowX: 'auto',
          zIndex: 30
        }}>
          {gallery.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveHotspot(null);
                  setCurrentIndex(idx);
                }}
                style={{
                  background: 'none',
                  border: isSelected ? '2px solid #FF6B00' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: 0,
                  cursor: 'pointer',
                  width: '80px',
                  height: '56px',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all 0.2s'
                }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: isSelected ? '#FF6B00' : '#CBD5E1',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '2px 0',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
