import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, Star } from 'lucide-react';
import { AUTO_PRODUCTS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

export default function AutoProducts() {
  const { t, language } = useLanguage();

  const handleOrder = (productTitle) => {
    const text = encodeURIComponent(
      language === 'ar'
        ? `مرحباً، أود طلب المنتج التالي من المعرض: ${productTitle}`
        : language === 'en'
        ? `Hello, I would like to order the following showroom product: ${productTitle}`
        : `Bonjour, je souhaite commander le produit suivant en showroom : ${productTitle}`
    );
    window.open(`https://wa.me/213550123456?text=${text}`, '_blank');
  };

  return (
    <section id="products" style={{ padding: '96px 0', background: '#090D16', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
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
            <ShoppingBag size={14} />
            {t('products.badge')}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#FFFFFF', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {t('products.title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.96rem', lineHeight: 1.6 }}>
            {t('products.subtitle')}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {AUTO_PRODUCTS.map(p => (
            <div 
              key={p.id}
              style={{
                background: '#0F172A',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#1E293B';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={p.image} 
                  alt={p.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  insetInlineStart: '12px',
                  background: 'rgba(8, 12, 20, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 9px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  {p.category}
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FBBF24', marginBottom: '8px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />
                  ))}
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginInlineStart: '4px' }}>(4.9/5)</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>
                  {p.title}
                </h3>

                <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
                  {p.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #1E293B',
                  paddingTop: '16px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>
                      {language === 'ar' ? 'السعر الصافي' : language === 'en' ? 'Price Incl. VAT' : 'Prix TTC'}
                    </span>
                    <strong style={{ fontSize: '1.3rem', color: '#FBBF24', fontWeight: 900 }}>{p.price}</strong>
                  </div>

                  <button
                    onClick={() => handleOrder(p.title)}
                    className="btn-whatsapp"
                    style={{ fontSize: '0.82rem', padding: '9px 14px' }}
                  >
                    {t('products.orderWhatsApp')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Perks bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '40px',
          flexWrap: 'wrap',
          color: '#94A3B8',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} color="var(--primary)" />
            <span>{language === 'ar' ? 'توصيل لجميع الولايات خلال 24 إلى 48 ساعة' : language === 'en' ? 'Fast delivery to all 58 wilayas within 24h - 48h' : 'Livraison toutes wilayas sous 24h - 48h'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>{language === 'ar' ? 'الدفع عند الاستلام بعد المعاينة والفحص' : language === 'en' ? 'Cash on delivery after physical inspection' : 'Paiement à la livraison après vérification'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
