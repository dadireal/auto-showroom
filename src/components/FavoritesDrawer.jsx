import React, { useState } from 'react';
import { X, Heart, Trash2, ExternalLink, Share2, FileText, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites = [],
  onRemoveFavorite,
  onClearFavorites,
  onSelectCar,
  onRequestProforma,
  onExploreStock
}) {
  if (!isOpen) return null;

  const { t, language, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Total valuation calculation
  const totalMillions = favorites.reduce((sum, car) => sum + (car.priceMillions || 0), 0);
  const totalDZD = favorites.reduce((sum, car) => sum + (car.priceDZD || 0), 0);

  const formattedTotalMillions = totalMillions.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-FR');
  const formattedTotalDZD = totalDZD.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-FR');

  // Copy shareable link
  const handleCopyLink = () => {
    const ids = favorites.map(c => c.id).join(',');
    const url = `${window.location.origin}${window.location.pathname}?garage=${ids}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp Share Message
  const buildWhatsAppMessage = () => {
    let msg = language === 'ar'
      ? `🚗 *كراج أحلامي - تشكيلة السيارات المختارة :*\n\n`
      : language === 'en'
      ? `🚗 *My Dream Garage - Selected Luxury Vehicles:*\n\n`
      : `🚗 *Mon Garage de Rêve - Véhicules d'Excellence Sélectionnés :*\n\n`;

    favorites.forEach((car, index) => {
      const priceUnit = language === 'ar' ? 'مليون سنتيم' : 'Millions Cts';
      msg += `${index + 1}. *${car.title}* (${car.year})\n   💰 ${car.priceMillions} ${priceUnit} | 📍 ${car.showroom}\n\n`;
    });

    const valLabel = language === 'ar' ? 'القيمة التقديرية الإجمالية :' : language === 'en' ? 'Total Valuation:' : 'Valeur Totale :';
    const priceUnit = language === 'ar' ? 'مليون سنتيم' : 'Millions Centimes';
    msg += `📊 *${valLabel}* ${formattedTotalMillions} ${priceUnit} (~ ${formattedTotalDZD} DZD)\n`;
    msg += `🌐 ${window.location.origin}`;

    return encodeURIComponent(msg);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div 
        className="drawer-content" 
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={20} color="#EF4444" fill="#EF4444" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                  {t('garage.fullTitle')}
                </h3>
                <span style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  {favorites.length}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 0' }}>
                {t('garage.subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94A3B8',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {favorites.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Heart size={28} color="#64748B" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                {t('garage.emptyTitle')}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, maxWidth: '320px', marginBottom: '20px' }}>
                {t('garage.emptySubtitle')}
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onExploreStock) onExploreStock();
                }}
                className="btn-primary"
                style={{ padding: '9px 18px', fontSize: '0.84rem' }}
              >
                <span>{t('garage.exploreInventory')}</span>
                {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {favorites.map((car) => {
                const img = (car.images && car.images[0]) || '/cars/bmw_m4_competition.jpg';
                return (
                  <div
                    key={car.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', padding: '12px' }}>
                      {/* Thumbnail */}
                      <div 
                        onClick={() => { onSelectCar(car); onClose(); }}
                        style={{
                          width: '100px',
                          height: '75px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          background: '#080C14',
                          flexShrink: 0,
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={img}
                          alt={car.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          background: 'rgba(0,0,0,0.7)',
                          color: '#FBBF24',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '1px 4px',
                          borderRadius: '4px'
                        }}>
                          {car.year}
                        </span>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 
                              onClick={() => { onSelectCar(car); onClose(); }}
                              style={{
                                fontSize: '0.88rem',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer'
                              }}
                              title={car.title}
                            >
                              {car.title}
                            </h4>
                            <button
                              onClick={() => onRemoveFavorite(car.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748B',
                                cursor: 'pointer',
                                padding: '2px',
                                marginLeft: '6px'
                              }}
                              title="Retirer des favoris"
                            >
                              <X size={14} />
                            </button>
                          </div>

                          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                            📍 {car.showroom}
                          </div>
                        </div>

                        {/* Price */}
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '6px' }}>
                          <div>
                            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FBBF24' }}>
                              {car.priceMillions}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#CBD5E1', marginLeft: '3px' }}>
                              {language === 'ar' ? 'مليون سنتيم' : 'M Cts'}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                            {(car.priceMillions * 10000).toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-FR')} DZD
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Card Actions */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      background: 'rgba(255, 255, 255, 0.02)'
                    }}>
                      <button
                        onClick={() => { onSelectCar(car); onClose(); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          borderRight: isRTL ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                          borderLeft: isRTL ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                          color: '#CBD5E1',
                          padding: '8px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}
                      >
                        <ExternalLink size={12} color="#3B82F6" />
                        <span>{t('garage.details')}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onRequestProforma) {
                            onRequestProforma(car);
                            onClose();
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FF6B00',
                          padding: '8px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}
                      >
                        <FileText size={12} color="#FF6B00" />
                        <span>{t('garage.proformaBtn')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with Valuation & Share Actions */}
        {favorites.length > 0 && (
          <div style={{
            padding: '18px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 13, 22, 0.95)'
          }}>
            {/* Total Valuation Row */}
            <div style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.04em' }}>
                {t('garage.totalValuation')}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '2px' }}>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FBBF24' }}>
                  {formattedTotalMillions} <span style={{ fontSize: '0.82rem', color: '#CBD5E1', fontWeight: 700 }}>{language === 'ar' ? 'مليون سنتيم' : 'Millions Centimes'}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 700 }}>
                  ~ {formattedTotalDZD} DZD
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={`https://wa.me/?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
              >
                <Share2 size={16} />
                <span>{t('garage.shareWhatsApp')}</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                <button
                  onClick={handleCopyLink}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: copied ? '#10B981' : '#CBD5E1',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={14} color="#10B981" /> : <Share2 size={14} />}
                  <span>{copied ? t('garage.linkCopied') : t('garage.copyLink')}</span>
                </button>

                <button
                  onClick={onClearFavorites}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '8px',
                    color: '#F87171',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    cursor: 'pointer'
                  }}
                  title={t('garage.clearAll')}
                >
                  <Trash2 size={14} />
                  <span>{t('garage.clearAll')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
