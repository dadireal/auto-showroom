import React, { useState } from 'react';
import { X, Calculator, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LoanCalculatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { language, isRTL } = useLanguage();

  // Form states in Millions Centimes
  const [carPriceM, setCarPriceM] = useState(650); // e.g. 650 Millions
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30%
  const [durationMonths, setDurationMonths] = useState(36); // 36 months
  const interestRateAnnual = 7.5; // indicative 7.5%

  const downPaymentM = (carPriceM * downPaymentPercent) / 100;
  const loanAmountM = Math.max(0, carPriceM - downPaymentM);

  // Monthly interest rate calculation
  const monthlyRate = interestRateAnnual / 100 / 12;
  const monthlyPaymentM = loanAmountM > 0
    ? (loanAmountM * monthlyRate * Math.pow(1 + monthlyRate, durationMonths)) / (Math.pow(1 + monthlyRate, durationMonths) - 1)
    : 0;

  const monthlyPaymentDZD = Math.round(monthlyPaymentM * 10000);

  const texts = {
    fr: {
      title: 'Simulateur de Financement Auto',
      subtitle: 'Estimez vos mensualités en Millions de Centimes et Dinars (DZD)',
      carPrice: 'Prix du véhicule',
      millionUnit: 'Millions Cts',
      equivalent: 'Équivalent :',
      downPayment: 'Apport personnel',
      duration: 'Durée du remboursement',
      months: 'mois',
      years: 'ans',
      estimatedMonthly: 'Mensualité Estimée',
      millionPerMonth: 'Millions / mois',
      dzdPerMonth: 'DZD / mois',
      borrowedAmount: 'Montant emprunté :',
      initialDown: 'Apport initial requis :',
      indicativeRate: 'Taux indicatif :',
      annualRate: '7.5% annuel',
      cta: 'Demander une Étude de Dossier',
      whatsappMsg: (price, dzd, down, dur) => 
        `Bonjour, je souhaite étudier un financement pour un véhicule de ${price} Millions Centimes (${dzd} DZD) avec un apport de ${down}% sur ${dur} mois.`
    },
    en: {
      title: 'Auto Financing & Loan Calculator',
      subtitle: 'Estimate your monthly installments in Millions Centimes and Dinars (DZD)',
      carPrice: 'Vehicle Price',
      millionUnit: 'M Centimes',
      equivalent: 'Equivalent:',
      downPayment: 'Down Payment',
      duration: 'Loan Term / Repayment Duration',
      months: 'months',
      years: 'years',
      estimatedMonthly: 'Estimated Monthly Payment',
      millionPerMonth: 'M / month',
      dzdPerMonth: 'DZD / month',
      borrowedAmount: 'Financed Loan Amount:',
      initialDown: 'Required Down Payment:',
      indicativeRate: 'Indicative Bank Rate:',
      annualRate: '7.5% annual',
      cta: 'Request Financing Pre-Approval',
      whatsappMsg: (price, dzd, down, dur) => 
        `Hello, I would like to inquire about financing options for a car priced at ${price} Million Centimes (${dzd} DZD) with ${down}% down payment over ${dur} months.`
    },
    ar: {
      title: 'حاسبة التمويل وتقسيط السيارات',
      subtitle: 'احسب أقساطك الشهرية التقديرية بملايين السنتيم والدينار الجزائري (DZD)',
      carPrice: 'سعر المركبة',
      millionUnit: 'مليون سنتيم',
      equivalent: 'المعادل بالدينار :',
      downPayment: 'الدفعة الأولى المقدمة',
      duration: 'مدة السداد والتقسيط',
      months: 'شهر',
      years: 'سنوات',
      estimatedMonthly: 'القسط الشهري التقديري',
      millionPerMonth: 'مليون / شهر',
      dzdPerMonth: 'دج / شهر',
      borrowedAmount: 'مبلغ التمويل المقترض :',
      initialDown: 'الدفعة الأولى المطلوبة :',
      indicativeRate: 'النسبة البنكية الإرشادية :',
      annualRate: '7.5% سنوي',
      cta: 'طلب دراسة ملف التمويل والتقسيط',
      whatsappMsg: (price, dzd, down, dur) => 
        `مرحباً، أود دراسة ملف تمويل لسيارة بقيمة ${price} مليون سنتيم (${dzd} دج) مع دفعة أولى ${down}% على مدى ${dur} شهراً.`
    }
  };

  const t = texts[language] || texts.fr;

  const formattedDzdPrice = (carPriceM * 10000).toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-FR');
  const formattedMonthlyDzd = monthlyPaymentDZD.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-FR');

  const whatsappMessage = encodeURIComponent(
    t.whatsappMsg(carPriceM, formattedDzdPrice, downPaymentPercent, durationMonths)
  );

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          maxWidth: '740px',
          background: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '18px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: 'clamp(12px, 2.5vw, 20px) clamp(14px, 3vw, 24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: 'rgba(255, 70, 5, 0.15)',
              border: '1px solid rgba(255, 70, 5, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Calculator size={18} color="#FF6B00" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: 'clamp(1rem, 3.4vw, 1.25rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.25 }}>
                {t.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 0' }}>
                {t.subtitle}
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
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255, 70, 5, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Calculator Body */}
        <div style={{ padding: 'clamp(14px, 3.2vw, 26px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {/* Controls Column */}
            <div>
              {/* Price control */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#CBD5E1' }}>
                    {t.carPrice}
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FBBF24' }}>
                    {carPriceM} {t.millionUnit}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="3000" 
                  step="25"
                  value={carPriceM}
                  onChange={(e) => setCarPriceM(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FF6B00', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                  {t.equivalent} {formattedDzdPrice} DZD
                </div>
              </div>

              {/* Down payment control */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#CBD5E1' }}>
                    {t.downPayment} ({downPaymentPercent}%)
                  </label>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {Math.round(downPaymentM)} {t.millionUnit}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[10, 20, 30, 40, 50].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setDownPaymentPercent(pct)}
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: downPaymentPercent === pct ? '#FF6B00' : 'rgba(255, 255, 255, 0.05)',
                        color: downPaymentPercent === pct ? '#FFFFFF' : '#94A3B8',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration control */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#CBD5E1' }}>
                    {t.duration}
                  </label>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {durationMonths} {t.months} ({durationMonths / 12} {t.years})
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[12, 24, 36, 48, 60].map((m) => (
                    <button
                      key={m}
                      onClick={() => setDurationMonths(m)}
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: durationMonths === m ? '#FF6B00' : 'rgba(255, 255, 255, 0.05)',
                        color: durationMonths === m ? '#FFFFFF' : '#94A3B8',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {m} {t.months[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div style={{
              background: 'rgba(9, 13, 22, 0.75)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', fontWeight: 700, marginBottom: '6px' }}>
                  {t.estimatedMonthly}
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FBBF24', lineHeight: 1.1 }}>
                  {monthlyPaymentM.toFixed(2)} <span style={{ fontSize: '1rem', fontWeight: 700 }}>{t.millionPerMonth}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 700, marginTop: '4px' }}>
                  ~ {formattedMonthlyDzd} {t.dzdPerMonth}
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '16px', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#94A3B8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.borrowedAmount}</span>
                    <strong style={{ color: '#FFFFFF' }}>{Math.round(loanAmountM)} {t.millionUnit}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.initialDown}</span>
                    <strong style={{ color: '#FFFFFF' }}>{Math.round(downPaymentM)} {t.millionUnit}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.indicativeRate}</span>
                    <strong style={{ color: '#10B981' }}>{t.annualRate}</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <a
                  href={`https://wa.me/213550123456?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <MessageCircle size={17} />
                  <span>{t.cta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
