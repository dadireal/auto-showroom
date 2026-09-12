import React from 'react';
import { X, Award, ShieldCheck, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { language, isRTL } = useLanguage();

  const aboutData = {
    fr: {
      title: 'À Propos de Notre Réseau Showroom',
      subtitle: 'L\'excellence automobile au service des passionnés et des conducteurs exigeants',
      missionTitle: 'Notre Mission & Engagement de Confiance',
      missionDesc: 'Notre plateforme regroupe les concessionnaires et showrooms indépendants les plus réputés d\'Algérie. Nous nous engageons à offrir un catalogue transparent avec inspection exhaustive de chaque véhicule, garantie mécanique et délivrance de cartes grises conformes.',
      perk1: 'Véhicules 00 km d\'origine certifiée',
      perk2: 'Contrôle technique en 100 points',
      perk3: 'Livraison sécurisée 58 wilayas',
      teamTitle: 'Notre Équipe de Spécialistes',
      members: [
        {
          name: 'Karim Benali',
          role: 'Directeur Général & Fondateur',
          experience: '18 ans dans l\'industrie automobile de prestige',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'Sofiane Mansouri',
          role: 'Responsable Contrôle Technique & Homologation',
          experience: 'Expert certifié en diagnostic multimarques & sécurité',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'Amine Djelloul',
          role: 'Conseiller Clientèle VIP & Financement',
          experience: 'Spécialiste reprise, crédit auto & formalités',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
        }
      ]
    },
    en: {
      title: 'About Our Dealership Network',
      subtitle: 'Automotive excellence dedicated to discerning drivers and car enthusiasts',
      missionTitle: 'Our Mission & Commitment to Integrity',
      missionDesc: 'Our portal unites Algeria\'s most established dealerships and premier independent showrooms. We are dedicated to providing total transparency, rigorous multi-point mechanical inspections, genuine manufacturer paperwork, and guaranteed prompt title issuance.',
      perk1: 'Certified brand-new 00 km vehicles',
      perk2: 'Comprehensive 100-point inspection',
      perk3: 'Insured flatbed delivery across 58 wilayas',
      teamTitle: 'Our Automotive Advisory Team',
      members: [
        {
          name: 'Karim Benali',
          role: 'Managing Director & Founder',
          experience: '18 years leading luxury automotive dealerships',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'Sofiane Mansouri',
          role: 'Head of Technical Inspection & Compliance',
          experience: 'Master certified in multi-brand electronic diagnostics & safety',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'Amine Djelloul',
          role: 'VIP Client Advisor & Vehicle Finance',
          experience: 'Specialist in vehicle trade-ins, bank loans & legal paperwork',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
        }
      ]
    },
    ar: {
      title: 'عن شبكة معارضنا المعتمدة',
      subtitle: 'الريادة والتميز في عالم السيارات لخدمة السائقين والمشترين الباحثين عن الجودة',
      missionTitle: 'مهمتنا والتزامنا بالأمان والشفافية',
      missionDesc: 'تجمع منصتنا أرقى الوكلاء ومعارض السيارات المستقلة المعتمدة في الجزائر. نلتزم بتقديم مخزون حقيقي شفاف مع فحص شامل ودقيق لكل سيارة، ضمان ميكانيكي معتمد، وتسليم بطاقات رمادية نظامية فورية.',
      perk1: 'سيارات 00 كم جديدة ومصدر مضمون 100%',
      perk2: 'فحص ميكانيكي وتقني دقيق في 100 نقطة',
      perk3: 'شحن وتوصيل آمن لباب منزلك عبر 58 ولاية',
      teamTitle: 'فريق خبرائنا ومستشارينا',
      members: [
        {
          name: 'كريم بن علي',
          role: 'المدير العام والمؤسس',
          experience: '18 سنة خبرة في إدارة وتجارة السيارات الفاخرة',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'سفيان منصوري',
          role: 'مسؤول الفحص التقني والمطابقة',
          experience: 'خبير معتمد في تشخيص السيارات وفحص السلامة والمطابقة',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'أمين جلول',
          role: 'مستشار كبار العملاء والتمويل البنكي',
          experience: 'مختص في استبدال المركبات، التمويل، والإجراءات الإدارية',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
        }
      ]
    }
  };

  const content = aboutData[language] || aboutData.fr;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          maxWidth: '820px',
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
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: 'clamp(1rem, 3.4vw, 1.25rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.25 }}>
              {content.title}
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 0' }}>
              {content.subtitle}
            </p>
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
              flexShrink: 0
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: 'clamp(14px, 3.2vw, 26px)', maxHeight: '74vh', overflowY: 'auto' }}>
          {/* Mission overview */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '20px 24px',
            marginBottom: '28px'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#FF6B00" />
              <span>{content.missionTitle}</span>
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '16px' }}>
              {content.missionDesc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94A3B8' }}>
                <CheckCircle size={15} color="#10B981" />
                <span>{content.perk1}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94A3B8' }}>
                <CheckCircle size={15} color="#10B981" />
                <span>{content.perk2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94A3B8' }}>
                <CheckCircle size={15} color="#10B981" />
                <span>{content.perk3}</span>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#FF6B00" />
              <span>{content.teamTitle}</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {content.members.map((member, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(9, 13, 22, 0.75)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      margin: '0 auto 12px',
                      border: '2px solid #FF6B00'
                    }} 
                  />
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF' }}>{member.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#FF6B00', fontWeight: 700, margin: '2px 0 6px' }}>{member.role}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.4 }}>{member.experience}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
