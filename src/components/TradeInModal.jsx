import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, Calculator } from 'lucide-react';
import { WILAYAS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

export default function TradeInModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { language, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: 2020,
    mileage: '',
    condition: 'tres-bon',
    phone: '',
    wilaya: 'Alger (16)'
  });
  const [submitted, setSubmitted] = useState(false);

  const texts = {
    fr: {
      badge: 'Service Reprise & Estimation',
      title: 'Faire Estimer Mon Véhicule',
      successTitle: 'Demande d’Estimation Reçue',
      successDesc: 'Un expert du showroom vous contactera sous 2h avec une proposition de reprise ferme.',
      brand: 'Marque',
      model: 'Modèle',
      year: 'Année de mise en circulation',
      mileage: 'Kilométrage Actuel',
      condition: 'État Général',
      condExcellent: 'Très bon état (proche du neuf)',
      condGood: 'Bon état (entretien régulier)',
      condFair: 'État d\'usage (quelques retouches)',
      wilaya: 'Wilaya',
      phone: 'Numéro de Téléphone / WhatsApp *',
      submit: 'Demander l\'Estimation Gratuite'
    },
    en: {
      badge: 'Trade-in & Valuation Service',
      title: 'Value & Trade In My Car',
      successTitle: 'Appraisal Request Received',
      successDesc: 'A showroom appraisal specialist will contact you within 2 hours with a guaranteed offer.',
      brand: 'Make / Brand',
      model: 'Model',
      year: 'Registration Year',
      mileage: 'Current Mileage (km)',
      condition: 'Overall Condition',
      condExcellent: 'Excellent condition (like new)',
      condGood: 'Good condition (regularly serviced)',
      condFair: 'Fair condition (minor touch-ups)',
      wilaya: 'Province (Wilaya)',
      phone: 'Phone / WhatsApp Number *',
      submit: 'Get Free Valuation Offer'
    },
    ar: {
      badge: 'خدمة استبدال وتقييم السيارات',
      title: 'طلب تقييم سيارتي الحالية',
      successTitle: 'تم استلام طلب التقييم بنجاح',
      successDesc: 'سيتواصل معك خبير معتمد من المعرض خلال ساعتين بتقدير مباشر وعرض استبدال مناسب.',
      brand: 'العلامة التجارية',
      model: 'النموذج والطراز',
      year: 'سنة السير والترقيم',
      mileage: 'المسافة المقطوعة (كم)',
      condition: 'الحالة العامة للمركبة',
      condExcellent: 'حالة ممتازة (شبه جديدة تماماً)',
      condGood: 'حالة جيدة جداً (صيانة دورية منتظمة)',
      condFair: 'حالة مستعملة مقبولة (مع بعض الرتوشات)',
      wilaya: 'الولاية',
      phone: 'رقم الهاتف أو الواتساب *',
      submit: 'طلب التقييم المجاني الفوري'
    }
  };

  const t = texts[language] || texts.fr;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{ maxWidth: '540px', padding: 'clamp(14px, 3.5vw, 26px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #1E293B', paddingBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#FBBF24', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <RefreshCw size={13} />
              {t.badge}
            </div>
            <h3 style={{ fontSize: 'clamp(1.05rem, 3.4vw, 1.35rem)', color: '#FFFFFF', fontWeight: 900, margin: '2px 0 0' }}>
              {t.title}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid #1E293B', 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={52} color="#10B981" style={{ marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.3rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>
              {t.successTitle}
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
              {t.successDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t.brand}
                </label>
                <input
                  type="text"
                  placeholder="ex: Volkswagen, Audi"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px 10px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.84rem', textAlign: isRTL ? 'right' : 'left', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t.model}
                </label>
                <input
                  type="text"
                  placeholder="ex: Golf 8, A3"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.88rem', textAlign: isRTL ? 'right' : 'left' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t.year}
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.88rem', textAlign: isRTL ? 'right' : 'left' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t.mileage}
                </label>
                <input
                  type="number"
                  placeholder="ex: 45000"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.88rem', textAlign: isRTL ? 'right' : 'left' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t.condition}
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.88rem', textAlign: isRTL ? 'right' : 'left' }}
                >
                  <option value="tres-bon">{t.condExcellent}</option>
                  <option value="bon">{t.condGood}</option>
                  <option value="moyen">{t.condFair}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t.wilaya}
                </label>
                <select
                  value={formData.wilaya}
                  onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.88rem', textAlign: isRTL ? 'right' : 'left' }}
                >
                  {WILAYAS.filter(w => w !== 'Toutes les Wilayas').map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                {t.phone}
              </label>
              <input
                type="tel"
                placeholder="0550 00 00 00"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#fff', fontSize: '0.88rem', textAlign: isRTL ? 'right' : 'left' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '6px',
                fontSize: '0.95rem'
              }}
            >
              <Calculator size={18} />
              <span>{t.submit}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
