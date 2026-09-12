import React from 'react';
import { X, GitCompare, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ComparisonModal({
  isOpen,
  onClose,
  comparedCars,
  onRemoveFromCompare,
  onClearCompare,
  currency
}) {
  const { t, language, isRTL } = useLanguage();

  if (!isOpen && comparedCars.length === 0) return null;

  const formatCarPrice = (car) => {
    if (currency === 'M') {
      const unit = language === 'ar' ? 'مليون سنتيم' : 'M';
      return `${car.priceMillions} ${unit}`;
    }
    if (currency === 'DZD') {
      const unit = language === 'ar' ? 'دج' : 'DZD';
      return `${car.priceDZD.toLocaleString('fr-FR')} ${unit}`;
    }
    const eur = Math.round(car.priceDZD / 240);
    return `~${eur.toLocaleString('fr-FR')} €`;
  };

  return (
    <>
      {/* Floating Comparison Bottom Dock */}
      {!isOpen && comparedCars.length > 0 && (
        <div className="comparison-dock">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GitCompare size={18} color="#FBBF24" />
              {t('nav.compare')} ({comparedCars.length}/3) :
            </span>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {comparedCars.map(car => (
                <div 
                  key={car.id} 
                  style={{ 
                    position: 'relative', 
                    width: '52px', 
                    height: '38px', 
                    borderRadius: '6px', 
                    overflow: 'hidden',
                    border: '1.5px solid rgba(251, 191, 36, 0.4)'
                  }}
                >
                  <img src={car.images[0]} alt={car.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    onClick={() => onRemoveFromCompare(car.id)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      insetInlineEnd: 0,
                      background: 'rgba(0,0,0,0.8)',
                      color: '#fff',
                      width: '18px',
                      height: '18px',
                      borderRadius: isRTL ? '0 0 6px 0' : '0 0 0 6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                    title={language === 'ar' ? 'حذف' : language === 'en' ? 'Remove' : 'Retirer'}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            >
              {language === 'ar' ? 'عرض المقارنة' : language === 'en' ? 'Show Comparison' : 'Afficher le Comparatif'}
            </button>
            <button
              onClick={onClearCompare}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid #1E293B',
                color: '#94A3B8',
                fontSize: '0.8rem',
                padding: '6px 12px',
                borderRadius: '6px'
              }}
            >
              {language === 'ar' ? 'تفريغ' : language === 'en' ? 'Clear' : 'Vider'}
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal Overlay */}
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '1100px', padding: '30px', background: '#0F172A', border: '1px solid #1E293B' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #1E293B',
              paddingBottom: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FBBF24', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                  <GitCompare size={18} />
                  {language === 'ar' ? 'المقارن التقني للمعرض' : language === 'en' ? 'Technical Showroom Comparison' : 'Comparateur Technique Showroom'}
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', fontWeight: 900 }}>
                  {language === 'ar' ? `مقارنة جنباً إلى جنب (${comparedCars.length} مركبات)` : language === 'en' ? `Side-by-Side Comparison (${comparedCars.length} vehicles)` : `Comparatif Côte-à-Côte (${comparedCars.length} véhicules)`}
                </h3>
              </div>

              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid #1E293B',
                  color: '#94A3B8',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {comparedCars.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#94A3B8' }}>
                  {language === 'ar' ? 'لم تقم بتحديد أي سيارة للمقارنة حتى الآن.' : language === 'en' ? 'No vehicles selected for comparison yet.' : 'Aucun véhicule sélectionné pour la comparaison.'}
                </p>
              </div>
            ) : (
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>↔</span>
                  <span>{language === 'ar' ? 'اسحب أفقياً لمقارنة باقي السيارات' : language === 'en' ? 'Swipe horizontally to view all vehicles' : 'Faites glisser horizontalement pour voir tous les véhicules'}</span>
                </div>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '10px' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: isRTL ? 'right' : 'left' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '180px', padding: '12px', color: '#94A3B8', fontSize: '0.85rem', borderBottom: '1px solid #1E293B' }}>
                        {language === 'ar' ? 'المعايير' : language === 'en' ? 'Criteria' : 'Critères'}
                      </th>
                      {comparedCars.map(car => (
                        <th key={car.id} style={{ minWidth: '240px', padding: '12px', borderBottom: '1px solid #1E293B' }}>
                          <div style={{ position: 'relative' }}>
                            <button
                              onClick={() => onRemoveFromCompare(car.id)}
                              style={{
                                position: 'absolute',
                                top: '-6px',
                                insetInlineEnd: '-6px',
                                background: '#EF4444',
                                color: '#fff',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 5
                              }}
                              title={language === 'ar' ? 'حذف' : language === 'en' ? 'Remove' : 'Retirer'}
                            >
                              <X size={12} />
                            </button>
                            <img 
                              src={car.images[0]} 
                              alt={car.title} 
                              style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px', border: '1px solid #1E293B' }} 
                            />
                            <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', lineHeight: 1.3, fontWeight: 800 }}>{car.title}</h4>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>
                    {/* Price Row */}
                    <tr style={{ background: '#0B0F19', borderBottom: '1px solid #1E293B' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 800, color: '#FFFFFF' }}>
                        {language === 'ar' ? 'السعر المعروض' : language === 'en' ? 'Listed Price' : 'Prix Affiché'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '14px 12px', fontWeight: 900, fontSize: '1.35rem', color: '#FBBF24' }}>
                          {formatCarPrice(car)}
                        </td>
                      ))}
                    </tr>

                    {/* Condition Row */}
                    <tr style={{ borderBottom: '1px solid #1E293B' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'الحالة' : language === 'en' ? 'Condition' : 'État'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px' }}>
                          <span className={`badge ${car.condition === 'neuf' ? 'badge-new' : 'badge-used'}`}>
                            {car.condition === 'neuf' ? t('card.newBadge') : t('card.usedBadge')}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Year Row */}
                    <tr style={{ borderBottom: '1px solid #1E293B', background: '#0B0F19' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'سنة الصنع' : language === 'en' ? 'Model Year' : 'Année Modèle'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px', fontWeight: 700, color: '#FFFFFF' }}>{car.year}</td>
                      ))}
                    </tr>

                    {/* Mileage Row */}
                    <tr style={{ borderBottom: '1px solid #1E293B' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {t('card.mileage')}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px' }}>
                          {car.mileage === 0 ? (language === 'ar' ? '00 كم (جديد تماماً)' : '00 km (Véhicule neuf)') : `${car.mileage.toLocaleString()} ${language === 'ar' ? 'كم' : 'km'}`}
                        </td>
                      ))}
                    </tr>

                    {/* Motorisation */}
                    <tr style={{ borderBottom: '1px solid #1E293B', background: '#0B0F19' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'المحرك والقوة' : language === 'en' ? 'Engine & Power' : 'Moteur & Puissance'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px' }}>{car.engine}</td>
                      ))}
                    </tr>

                    {/* Transmission & Drive */}
                    <tr style={{ borderBottom: '1px solid #1E293B' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'علبة السرعات والدفع' : language === 'en' ? 'Gearbox & Drivetrain' : 'Boîte & Transmission'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px' }}>{car.transmission} ({car.drivetrain})</td>
                      ))}
                    </tr>

                    {/* Papers */}
                    <tr style={{ borderBottom: '1px solid #1E293B', background: '#0B0F19' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'الوثائق الإدارية' : language === 'en' ? 'Vehicle Papers' : 'Papiers Véhicule'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px', fontWeight: 700, color: '#10B981' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ShieldCheck size={16} />
                            {car.papers}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Showroom & Wilaya */}
                    <tr style={{ borderBottom: '1px solid #1E293B' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'المعرض والولاية' : language === 'en' ? 'Showroom & Location' : 'Showroom & Wilaya'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{car.showroom}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{car.wilaya}</div>
                        </td>
                      ))}
                    </tr>

                    {/* Actions Row */}
                    <tr>
                      <td style={{ padding: '16px 12px', fontWeight: 600, color: '#94A3B8' }}>
                        {language === 'ar' ? 'التواصل مع المعرض' : language === 'en' ? 'Contact Showroom' : 'Contacter Vendeur'}
                      </td>
                      {comparedCars.map(car => (
                        <td key={car.id} style={{ padding: '16px 12px' }}>
                          <a
                            href={`https://wa.me/${car.whatsapp}?text=${encodeURIComponent(
                              language === 'ar'
                                ? `مرحباً، أود تفاصيل إضافية بخصوص سيارة ${car.title}`
                                : language === 'en'
                                ? `Hello, I would like more details about your ${car.title}`
                                : `Bonjour, je souhaite des détails sur votre ${car.title}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                            style={{ width: '100%', fontSize: '0.85rem' }}
                          >
                            <MessageCircle size={16} />
                            WhatsApp {car.phone}
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
