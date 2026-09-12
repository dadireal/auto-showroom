import React, { useState } from 'react';
import { X, Printer, Send, FileText, CheckCircle2, ShieldCheck, DollarSign, Calendar, Car, QrCode } from 'lucide-react';
import { WILAYAS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

export default function ProformaModal({
  isOpen,
  onClose,
  vehicle,
  onAddOrder
}) {
  if (!isOpen || !vehicle) return null;

  const { t, language, isRTL } = useLanguage();

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('Alger (16)');
  const [paymentMode, setPaymentMode] = useState('cash'); // 'cash' | 'financing'
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [durationMonths, setDurationMonths] = useState(36);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Stable Reference Number & Date
  const [refNumber] = useState(() => `PRF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [vinNumber] = useState(() => `WAU-${vehicle.brand.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`);
  const todayDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR');

  // Pricing calculations
  const priceM = vehicle.priceMillions || 0;
  const priceDZD = vehicle.priceDZD || (priceM * 10000);

  // Financing calculation
  const downPaymentM = (priceM * downPaymentPercent) / 100;
  const loanAmountM = Math.max(0, priceM - downPaymentM);
  const monthlyRate = 7.5 / 100 / 12;
  const monthlyPaymentM = loanAmountM > 0
    ? (loanAmountM * monthlyRate * Math.pow(1 + monthlyRate, durationMonths)) / (Math.pow(1 + monthlyRate, durationMonths) - 1)
    : 0;
  const monthlyPaymentDZD = Math.round(monthlyPaymentM * 10000);

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  // Handle Submission & WhatsApp dispatch
  const handleConfirmAndSend = (e) => {
    if (e) e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert(language === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Veuillez saisir votre nom et numéro de téléphone.');
      return;
    }

    // Push into Admin Orders pipeline
    if (onAddOrder) {
      onAddOrder({
        id: Date.now(),
        clientName: clientName.trim(),
        phone: phone.trim(),
        wilaya,
        vehicleTitle: vehicle.title,
        showroom: vehicle.showroom,
        type: paymentMode === 'cash' ? 'Achat Comptant (Proforma)' : `Financement (${durationMonths}m)`,
        status: 'nouveau',
        date: todayDate,
        budget: `${priceM} Millions Cts`,
        notes: `Réf Proforma: ${refNumber}. ${notes || 'Demande de devis officiel générée en ligne.'}`
      });
    }

    setSubmitted(true);

    // Build WhatsApp message
    const formattedPriceDZD = priceDZD.toLocaleString(language === 'ar' ? 'ar-DZ' : 'fr-FR');
    let waText = language === 'ar'
      ? `📄 *طلب حجز وتأكيد فاتورة شكلية (Proforma)*\n\n` +
        `• *المرجع :* ${refNumber}\n` +
        `• *المركبة :* ${vehicle.title} (${vehicle.year})\n` +
        `• *السعر :* ${priceM} مليون سنتيم (~ ${formattedPriceDZD} دج)\n` +
        `• *المشتري :* ${clientName} (${phone})\n` +
        `• *الولاية :* ${wilaya}\n` +
        `• *طريقة الدفع :* ${paymentMode === 'cash' ? 'دفع نقدي كامل' : `تمويل بنكي (دفعة ${downPaymentPercent}% على ${durationMonths} شهر)`}\n` +
        (notes ? `• *ملاحظات :* ${notes}\n\n` : `\n`) +
        `يرجى تأكيد توفر المركبة وتجهيز الملف بالمعرض.`
      : `📄 *Demande de Réservation & Facture Proforma*\n\n` +
        `• *Réf. Dossier :* ${refNumber}\n` +
        `• *Véhicule :* ${vehicle.title} (${vehicle.year})\n` +
        `• *Montant :* ${priceM} Millions Cts (~ ${formattedPriceDZD} DZD)\n` +
        `• *Client :* ${clientName} (${phone})\n` +
        `• *Wilaya :* ${wilaya}\n` +
        `• *Acquisition :* ${paymentMode === 'cash' ? 'Comptant 100%' : `Financement (${downPaymentPercent}% apport sur ${durationMonths} mois)`}\n` +
        (notes ? `• *Notes :* ${notes}\n\n` : `\n`) +
        `Merci de confirmer la réservation en showroom.`;

    const targetPhone = vehicle.whatsapp || '213550123456';
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waText)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          maxWidth: '860px',
          background: '#0B111E',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '18px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Bar (Controls - Hidden on Print) */}
        <div className="no-print" style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255, 107, 0, 0.15)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} color="#FF6B00" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                {t('proforma.modalTitle')}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '2px 0 0' }}>
                {t('proforma.modalSubtitle')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title={t('proforma.printBtn')}
            >
              <Printer size={15} color="#FBBF24" />
              <span>{t('proforma.printBtn')}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94A3B8',
                width: '34px',
                height: '34px',
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
        </div>

        {/* Scrollable Container */}
        <div style={{ maxHeight: '78vh', overflowY: 'auto', padding: '24px' }}>
          {/* Quick Client Configurator Bar (Hidden on Print) */}
          <div className="no-print" style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FBBF24', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Car size={15} />
              <span>{t('proforma.clientSection')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t('proforma.fullName')}
                </label>
                <input
                  type="text"
                  placeholder="ex: Mohamed Brahimi"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#FFFFFF', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t('proforma.phone')}
                </label>
                <input
                  type="tel"
                  placeholder="0550 12 34 56"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#FFFFFF', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t('proforma.wilaya')}
                </label>
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#FFFFFF', fontSize: '0.84rem' }}
                >
                  {WILAYAS.filter(w => w !== 'Toutes les Wilayas').map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                  {t('proforma.paymentMode')}
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: '#080C14', border: '1px solid #1E293B', borderRadius: '6px', color: '#FFFFFF', fontSize: '0.84rem' }}
                >
                  <option value="cash">{t('proforma.cash')}</option>
                  <option value="financing">{t('proforma.financing')}</option>
                </select>
              </div>
            </div>

            {/* Financing sliders if selected */}
            {paymentMode === 'financing' && (
              <div style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    <span>{t('proforma.downPayment')} ({downPaymentPercent}%)</span>
                    <strong style={{ color: '#FBBF24' }}>{Math.round(downPaymentM)} Millions Cts</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#FF6B00' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    <span>{t('proforma.duration')}</span>
                    <strong style={{ color: '#FBBF24' }}>{durationMonths} mois ({durationMonths / 12} ans)</strong>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    step="12"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#FF6B00' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* =========================================================
              THE OFFICIAL PRINTABLE PROFORMA DOCUMENT
              ========================================================= */}
          <div 
            id="proforma-document"
            style={{
              background: '#FFFFFF',
              color: '#0F172A',
              borderRadius: '12px',
              padding: '36px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
              fontFamily: isRTL ? "'Cairo', sans-serif" : 'system-ui, -apple-system, sans-serif'
            }}
          >
            {/* Header / Letterhead */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid #0F172A',
              paddingBottom: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#FF6B00' }}>⚡</span> AUTO SHOWROOM ALGÉRIE
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
                  Réseau National de Showrooms Agréés Multi-Marques • 58 Wilayas
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                  Agrément Ministériel N° DZ-AUTO-2024 • Registre du Commerce Conforme
                </div>
              </div>

              <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.05em'
                }}>
                  FACTURE PROFORMA
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                  {refNumber}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  {t('proforma.date')} {todayDate}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>
                  {t('proforma.validity')} {t('proforma.validityDays')}
                </div>
              </div>
            </div>

            {/* Client & Showroom 2-Column Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '24px',
              background: '#F8FAFC',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #E2E8F0'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF6B00', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {t('proforma.clientSection')}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                  {clientName || 'Client Particulier / Entreprise'}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                  Téléphone : <strong>{phone || '0550 00 00 00'}</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Wilaya : <strong>{wilaya}</strong>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Showroom Vendeur Agréé
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                  {vehicle.showroom}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                  Contact Showroom : <strong>{vehicle.phone || '0550 12 34 56'}</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  Lieu d'exposition : <strong>{vehicle.wilaya}</strong>
                </div>
              </div>
            </div>

            {/* Vehicle Specifications Table */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                {t('proforma.vehicleSection')}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <tbody>
                  <tr style={{ background: '#F1F5F9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 700, width: '25%', border: '1px solid #E2E8F0' }}>Désignation :</td>
                    <td style={{ padding: '8px 12px', fontWeight: 800, color: '#0F172A', border: '1px solid #E2E8F0' }}>{vehicle.title}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, width: '20%', border: '1px solid #E2E8F0' }}>Année / Millésime :</td>
                    <td style={{ padding: '8px 12px', fontWeight: 800, border: '1px solid #E2E8F0' }}>{vehicle.year}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>N° Châssis (VIN) :</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700, border: '1px solid #E2E8F0' }}>{vinNumber}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>Kilométrage :</td>
                    <td style={{ padding: '8px 12px', fontWeight: 800, color: vehicle.mileage === 0 ? '#10B981' : '#0F172A', border: '1px solid #E2E8F0' }}>
                      {vehicle.mileage === 0 ? '00 km (Neuf)' : `${vehicle.mileage.toLocaleString()} km`}
                    </td>
                  </tr>
                  <tr style={{ background: '#F1F5F9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>Motorisation :</td>
                    <td style={{ padding: '8px 12px', border: '1px solid #E2E8F0' }}>{vehicle.engine || 'Essence Multi-soupapes'}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>Transmission :</td>
                    <td style={{ padding: '8px 12px', border: '1px solid #E2E8F0' }}>{vehicle.transmission}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>Couleur / Finition :</td>
                    <td style={{ padding: '8px 12px', border: '1px solid #E2E8F0' }}>{vehicle.color || 'Peinture d\'origine certifiée'}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>Document Admin :</td>
                    <td style={{ padding: '8px 12px', fontWeight: 800, color: '#10B981', border: '1px solid #E2E8F0' }}>{vehicle.papers || 'Carte Grise'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financial Breakdown Table */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                {t('proforma.financialSection')}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: '#0F172A', color: '#FFFFFF' }}>
                    <th style={{ padding: '8px 12px', textAlign: isRTL ? 'right' : 'left' }}>Élément de Facturation</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center' }}>Quantité</th>
                    <th style={{ padding: '8px 12px', textAlign: isRTL ? 'left' : 'right' }}>Prix en Millions Cts</th>
                    <th style={{ padding: '8px 12px', textAlign: isRTL ? 'left' : 'right' }}>Montant en Dinars (DZD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>
                      {vehicle.title} ({vehicle.year})
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 400 }}>Garantie constructeur & showroom incluse</div>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '10px 12px', textAlign: isRTL ? 'left' : 'right', fontWeight: 800 }}>{priceM} M</td>
                    <td style={{ padding: '10px 12px', textAlign: isRTL ? 'left' : 'right', fontWeight: 800 }}>{priceDZD.toLocaleString('fr-FR')} DZD</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                    <td style={{ padding: '10px 12px' }}>{t('proforma.dossierFee')}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '10px 12px', textAlign: isRTL ? 'left' : 'right', color: '#10B981', fontWeight: 700 }}>{t('proforma.included')}</td>
                    <td style={{ padding: '10px 12px', textAlign: isRTL ? 'left' : 'right', color: '#10B981', fontWeight: 700 }}>0 DZD</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 12px' }}>{t('proforma.deliveryFee')} ({wilaya})</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '10px 12px', textAlign: isRTL ? 'left' : 'right', color: '#10B981', fontWeight: 700 }}>{t('proforma.included')}</td>
                    <td style={{ padding: '10px 12px', textAlign: isRTL ? 'left' : 'right', color: '#10B981', fontWeight: 700 }}>0 DZD</td>
                  </tr>
                  <tr style={{ background: '#0F172A', color: '#FFFFFF', fontWeight: 900, fontSize: '0.98rem' }}>
                    <td colSpan="2" style={{ padding: '12px 14px' }}>{t('proforma.totalAmount')} :</td>
                    <td style={{ padding: '12px 14px', textAlign: isRTL ? 'left' : 'right', color: '#FBBF24', fontSize: '1.2rem' }}>
                      {priceM} <span style={{ fontSize: '0.78rem' }}>M Cts</span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: isRTL ? 'left' : 'right', color: '#FBBF24', fontSize: '1.1rem' }}>
                      {priceDZD.toLocaleString('fr-FR')} DZD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financing Box if applicable */}
            {paymentMode === 'financing' && (
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '14px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '6px' }}>
                  📊 {t('proforma.financingSchedule')} (Taux indicatif : 7.5% annuel)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Apport personnel ({downPaymentPercent}%) :</span>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.92rem' }}>
                      {Math.round(downPaymentM)} Millions Cts ({(Math.round(downPaymentM) * 10000).toLocaleString()} DZD)
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Montant emprunté :</span>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.92rem' }}>
                      {Math.round(loanAmountM)} Millions Cts ({(Math.round(loanAmountM) * 10000).toLocaleString()} DZD)
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>{t('proforma.monthlyPayment')} :</span>
                    <div style={{ fontWeight: 900, color: '#FF6B00', fontSize: '1rem' }}>
                      ~ {monthlyPaymentM.toFixed(2)} M / mois ({monthlyPaymentDZD.toLocaleString()} DZD)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Official Security Stamp & Signature Footer */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '24px',
              borderTop: '2px solid #0F172A',
              paddingTop: '20px',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Simulated High-Res Vector QR Code */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '2px solid #0F172A',
                  borderRadius: '6px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  flexShrink: 0
                }}>
                  <QrCode size={52} color="#0F172A" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} color="#10B981" />
                    <span>DOCUMENT OFFICIEL SÉCURISÉ</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.4, marginTop: '2px' }}>
                    {t('proforma.verifiedQr')}. Les prix indiqués sont garantis pendant la durée de validité de la présente offre.
                  </div>
                </div>
              </div>

              {/* Stamp & Signature Box */}
              <div style={{
                border: '1px dashed #64748B',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center',
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FAFAFA'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>
                  {t('proforma.authorizedStamp')}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontStyle: 'italic' }}>
                  Visa & Signature Direction Showroom
                </div>
              </div>
            </div>
          </div>

          {/* Submission Feedback (Hidden on Print) */}
          {submitted && (
            <div className="no-print" style={{
              marginTop: '18px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '10px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={24} color="#10B981" flexShrink={0} />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {t('proforma.bookingSuccess')}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  Le dossier <strong>{refNumber}</strong> a été consigné dans le système et transmis au conseiller commercial du showroom.
                </div>
              </div>
            </div>
          )}

          {/* Action Footer Buttons (Hidden on Print) */}
          <div className="no-print" style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handlePrint}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '12px 20px',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Printer size={17} color="#FBBF24" />
              <span>{t('proforma.printBtn')}</span>
            </button>

            <button
              onClick={handleConfirmAndSend}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Send size={16} />
              <span>{t('proforma.sendWhatsApp')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
