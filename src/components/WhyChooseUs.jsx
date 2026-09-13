import React from 'react';
import { Eye, Shield, Users, GitCompare, Award, PhoneCall } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function WhyChooseUs({ totalVehicles = 24 }) {
  const { t, language } = useLanguage();

  const reasons = language === 'ar' ? [
    {
      icon: <Eye size={28} color="var(--primary)" />,
      title: 'شفافية وتتبع كامل',
      description: 'تخضع كل سيارة معروضة في صالاتنا لفحص صارم لسجلها، عداد الكيلومترات، وحالتها الميكانيكية والتقنية العامة.'
    },
    {
      icon: <Shield size={28} color="#10B981" />,
      title: 'سيارات مفحوصة 100% ومضمونة',
      description: 'بطاقات رمادية مدققة، مطابقة إدارية تامة مع إمكانية الحصول على ضمان ميكانيكي ممتد يصل حتى 24 شهراً.'
    },
    {
      icon: <PhoneCall size={28} color="var(--primary)" />,
      title: 'تواصل مباشر مع مستشارينا',
      description: 'تواصل مباشرة مع فريق الاستشارات عبر الهاتف أو واتساب لحجز تجربة قيادة أو الاستفسار عن تفاصيل الصفقة.'
    },
    {
      icon: <GitCompare size={28} color="#3b82f6" />,
      title: 'مقارنة تقنية متقدمة',
      description: 'قارن بين ما يصل إلى 3 سيارات جنباً إلى جنب: المحرك، استهلاك الوقود، الأبعاد، التجهيزات والأسعار الحقيقية.'
    }
  ] : language === 'en' ? [
    {
      icon: <Eye size={28} color="var(--primary)" />,
      title: 'Total Transparency & History',
      description: 'Every vehicle showcased in our inventory undergoes a rigorous inspection of its history, verified mileage, and overall condition.'
    },
    {
      icon: <Shield size={28} color="#10B981" />,
      title: '100% Inspected & Guaranteed',
      description: 'Checked registration papers, administrative compliance, and optional extended mechanical warranties up to 24 months.'
    },
    {
      icon: <PhoneCall size={28} color="var(--primary)" />,
      title: 'Direct Concierge Contact',
      description: 'Connect directly with our automotive advisors via phone or WhatsApp to schedule a private viewing or test drive.'
    },
    {
      icon: <GitCompare size={28} color="#3b82f6" />,
      title: 'Advanced Vehicle Comparison',
      description: 'Compare up to 3 models side-by-side: powertrain, fuel consumption, exact dimensions, equipment list, and live pricing.'
    }
  ] : [
    {
      icon: <Eye size={28} color="var(--primary)" />,
      title: 'Transparence & Traçabilité Totale',
      description: 'Chaque véhicule exposé en showroom fait l’objet d’une vérification rigoureuse de son historique, de son kilométrage et de son état général.'
    },
    {
      icon: <Shield size={28} color="#10B981" />,
      title: 'Véhicules 100% Vérifiés & Garantis',
      description: 'Cartes grises contrôlées, conformité administrative vérifiée et possibilité de garantie mécanique étendue jusqu’à 24 mois.'
    },
    {
      icon: <PhoneCall size={28} color="var(--primary)" />,
      title: 'Contact Direct avec nos Conseillers',
      description: 'Échangez directement avec un conseiller commercial par téléphone ou par WhatsApp pour réserver un essai routier.'
    },
    {
      icon: <GitCompare size={28} color="#3b82f6" />,
      title: 'Comparateur Technique Avancé',
      description: 'Comparez jusqu’à 3 véhicules côte à côte : motorisation, consommation, dimensions, équipements et tarifs réels.'
    }
  ];

  const stats = language === 'ar' ? [
    { value: `${totalVehicles}`, label: 'سيارة متوفرة في المخزون الحقيقي' },
    { value: '100%', label: 'وثائق وبطاقات رمادية مفحوصة' },
    { value: '58', label: 'ولاية مغطاة بخدمة التوصيل السريع' },
    { value: '0 دج', label: 'بدون أي رسوم ملف أو عمولات خفية' }
  ] : language === 'en' ? [
    { value: `${totalVehicles}`, label: 'Vehicles Ready in Real Stock' },
    { value: '100%', label: 'Verified Registration & Papers' },
    { value: '58', label: 'Wilayas Covered by Delivery' },
    { value: '0 DZD', label: 'No Hidden Application Fees' }
  ] : [
    { value: `${totalVehicles}`, label: 'Véhicules Disponibles en Stock Réel' },
    { value: '100%', label: 'Papiers et Cartes Grises Contrôlés' },
    { value: '58', label: 'Wilayas Couvertes par le Service Livraison' },
    { value: '0 DA', label: 'Frais de Dossier ou Commission Cachée' }
  ];

  return (
    <section id="why-us" style={{ padding: 'clamp(36px, 6vw, 80px) 0', background: 'var(--bg-base)', color: 'var(--text-main)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto clamp(20px, 4vw, 44px)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--primary)',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}>
            <Award size={14} />
            {t('whyUs.badge')}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--text-main)', marginBottom: '14px', fontWeight: 900, letterSpacing: '-0.02em' }}>
            {t('whyUs.title')} <span style={{ color: 'var(--primary)' }}>{t('whyUs.titleAccent')}</span> ?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="why-us-pillars-grid" style={{ marginBottom: '56px' }}>
          {reasons.map((r, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '32px 24px',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-card)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                width: '56px',
                height: '56px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                {r.icon}
              </div>

              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
                {r.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {r.description}
              </p>
            </div>
          ))}
        </div>

        {/* Live Counters */}
        <div className="why-us-stats-grid" style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '40px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-concierge)'
        }}>
          {stats.map((s, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--primary)',
                lineHeight: 1.1,
                marginBottom: '6px',
                letterSpacing: '-0.02em'
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
