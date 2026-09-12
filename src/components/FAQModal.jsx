import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ShieldCheck, Truck, FileText, CreditCard, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function FAQModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { language, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = {
    fr: {
      title: 'Foire Aux Questions (FAQ)',
      subtitle: 'Toutes les réponses pour l\'achat et la livraison de votre véhicule',
      otherQuestion: 'Vous avez une autre question ?',
      supportText: 'Nos conseillers showroom vous répondent 7j/7 directement sur WhatsApp.',
      contactBtn: 'Contacter le Support',
      whatsappMsg: 'Bonjour, j\'ai une question au sujet d\'un véhicule en showroom.',
      items: [
        {
          category: 'Véhicules & Garanties',
          icon: <ShieldCheck size={18} color="#10B981" />,
          question: 'Quelles sont les garanties offertes sur les véhicules 00 km et d\'occasion ?',
          answer: 'Tous les véhicules neufs 00 km bénéficient de la garantie constructeur intégrale ainsi que de la garantie showroom agréé. Pour les véhicules d\'occasion certifiés, nous effectuons un contrôle technique systématique en 100 points de sécurité avec garantie mécanique de 6 à 24 mois.'
        },
        {
          category: 'Papiers & Administratif',
          icon: <FileText size={18} color="#FF6B00" />,
          question: 'Quels documents administratifs sont fournis lors de la livraison ?',
          answer: 'Chaque véhicule est livré avec son dossier complet en règle : Carte Grise originale, certificat de contrôle technique récent, carnet d\'entretien constructeur à jour, double de clés d\'origine et facture d\'achat officielle garantissant une immatriculation immédiate.'
        },
        {
          category: 'Financement & Modalités',
          icon: <CreditCard size={18} color="#3B82F6" />,
          question: 'Quelles sont les modalités de paiement acceptées ?',
          answer: 'Nous acceptons les règlements par chèque de banque certifié, virement bancaire direct, ainsi que les facilités de paiement et dossiers de crédit automobile en partenariat avec les principales banques agréées en Algérie.'
        },
        {
          category: 'Reprise de Véhicule',
          icon: <HelpCircle size={18} color="#FBBF24" />,
          question: 'Puis-je faire reprendre mon véhicule actuel contre un nouveau modèle ?',
          answer: 'Absolument. Nous proposons un service d\'expertise et d\'estimation rapide en showroom. La valeur estimée de votre véhicule peut être directement déduite du prix d\'achat de votre prochain véhicule avec prise en charge des démarches administratives.'
        },
        {
          category: 'Livraison 58 Wilayas',
          icon: <Truck size={18} color="#10B981" />,
          question: 'Proposez-vous un service de livraison sécurisée dans toutes les wilayas ?',
          answer: 'Oui, nous disposons d\'un service logistique de transport sur plateau sécurisé assurant la livraison à domicile ou en point relais dans les 58 wilayas d\'Algérie, avec inspection contradictoire à la réception.'
        },
        {
          category: 'Réservation & Essai',
          icon: <Clock size={18} color="#FF6B00" />,
          question: 'Comment réserver un véhicule ou planifier un essai en showroom ?',
          answer: 'Vous pouvez contacter directement le conseiller commercial du showroom concerné via notre bouton WhatsApp ou par téléphone. Un rendez-vous vous sera fixé en priorité pour inspecter le véhicule et réaliser un essai sur piste.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'Clear answers on purchasing, certification, and vehicle delivery',
      otherQuestion: 'Have another question?',
      supportText: 'Our dealership concierges are available 7 days a week directly on WhatsApp.',
      contactBtn: 'Contact Support',
      whatsappMsg: 'Hello, I have an inquiry regarding a showroom vehicle.',
      items: [
        {
          category: 'Vehicles & Warranties',
          icon: <ShieldCheck size={18} color="#10B981" />,
          question: 'What warranties are provided on 00 km and pre-owned vehicles?',
          answer: 'All brand-new 00 km cars come with full manufacturer warranty plus authorized showroom warranty. For certified pre-owned vehicles, we conduct a 100-point comprehensive inspection with a mechanical guarantee ranging from 6 to 24 months.'
        },
        {
          category: 'Paperwork & Legal',
          icon: <FileText size={18} color="#FF6B00" />,
          question: 'What official vehicle documents are supplied upon delivery?',
          answer: 'Every car is delivered with complete and verified paperwork: original Algerian registration card (Carte Grise), recent technical inspection certificate, updated maintenance service logbook, duplicate factory keys, and official bill of sale.'
        },
        {
          category: 'Financing & Payment',
          icon: <CreditCard size={18} color="#3B82F6" />,
          question: 'What payment methods and financing options do you accept?',
          answer: 'We accept certified bank cashier checks, direct bank transfers, as well as vehicle financing programs through partnered accredited commercial banks in Algeria.'
        },
        {
          category: 'Vehicle Trade-in',
          icon: <HelpCircle size={18} color="#FBBF24" />,
          question: 'Can I trade in my existing car towards a new vehicle?',
          answer: 'Yes, we provide on-site appraisals and rapid market valuations. Your existing car value can be credited directly towards your new acquisition, with all administrative paperwork handled for you.'
        },
        {
          category: 'Nationwide Delivery',
          icon: <Truck size={18} color="#10B981" />,
          question: 'Do you offer secure delivery across all 58 Algerian provinces (wilayas)?',
          answer: 'Yes, our logistics fleet provides insured flatbed transport delivering directly to your doorstep or local hub across all 58 wilayas, including handover inspection.'
        },
        {
          category: 'Booking & Test Drive',
          icon: <Clock size={18} color="#FF6B00" />,
          question: 'How do I book a vehicle or schedule a showroom test drive?',
          answer: 'You can directly contact the showroom advisor using our dedicated WhatsApp button or phone. An appointment will be arranged promptly for full inspection and track testing.'
        }
      ]
    },
    ar: {
      title: 'الأسئلة الشائعة (FAQ)',
      subtitle: 'جميع الإجابات حول شراء واستلام وضمان مركبتك في الجزائر',
      otherQuestion: 'هل لديك سؤال أو استفسار آخر ؟',
      supportText: 'مستشارو المعرض متواجدون للرد على استفساراتكم 7/7 أيام مباشرة عبر واتساب.',
      contactBtn: 'تواصل مع الدعم الفني',
      whatsappMsg: 'مرحباً، لدي استفسار بخصوص سيارة متوفرة في المعرض.',
      items: [
        {
          category: 'المركبات والضمانات',
          icon: <ShieldCheck size={18} color="#10B981" />,
          question: 'ما هي الضمانات المقدمة على السيارات الجديدة 00 كم والمستعملة ؟',
          answer: 'تستفيد جميع السيارات الجديدة 00 كم من ضمان المصنع الأصلي بالإضافة إلى ضمان المعرض المعتمد. أما السيارات المستعملة المعتمدة، فتخضع لفحص تقني شامل في 100 نقطة سلامة مع ضمان ميكانيكي يتراوح بين 6 إلى 24 شهراً.'
        },
        {
          category: 'الوثائق والملف الإداري',
          icon: <FileText size={18} color="#FF6B00" />,
          question: 'ما هي الوثائق الإدارية المسلمة مع المركبة عند الشراء ؟',
          answer: 'تسلم كل سيارة بملف إداري نظامي متكامل : البطاقة الرمادية الأصلية (Carte Grise)، شهادة المراقبة التقنية حديثة، دفتر الصيانة الأصلي، المفتاح الإضافي الأصلي، وفاتورة شراء رسمية تضمن ترقيماً وتسجيلاً فورياً.'
        },
        {
          category: 'التمويل وطرق الدفع',
          icon: <CreditCard size={18} color="#3B82F6" />,
          question: 'ما هي طرق الدفع وتسهيلات التمويل المقبولة في المعرض ؟',
          answer: 'نقبل الدفع بواسطة صك بنكي معتمد (Chèque certifié)، أو التحويل البنكي المباشر، بالإضافة إلى ملفات القروض وتسهيلات التمويل بالتعاون مع البنوك المعتمدة في الجزائر.'
        },
        {
          category: 'استبدال السيارات (Reprise)',
          icon: <HelpCircle size={18} color="#FBBF24" />,
          question: 'هل يمكنني استبدال سيارتي الحالية بسيارة جديدة من المعرض ؟',
          answer: 'بالتأكيد. نوفر خدمة تقييم وخبرة سريعة في المعرض، حيث يمكن خصم القيمة التقديرية لسيارتك الحالية مباشرة من سعر شراء سيارتك الجديدة مع التكفل بجميع المعاملات الإدارية.'
        },
        {
          category: 'التوصيل لـ 58 ولاية',
          icon: <Truck size={18} color="#10B981" />,
          question: 'هل توفرون خدمة شحن وتوصيل آمن للسيارات عبر جميع الولايات ؟',
          answer: 'نعم، نمتلك أسطول نقل لوجستي آمن ومؤمن على شاحنات خاصة (Dépannage plateau) للتوصيل لباب منزلك عبر كامل الـ 58 ولاية جزائرية مع محضر معاينة عند الاستلام.'
        },
        {
          category: 'الحجز وتجربة القيادة',
          icon: <Clock size={18} color="#FF6B00" />,
          question: 'كيف يمكنني حجز سيارة أو طلب تجربة قيادة في المعرض ؟',
          answer: 'يمكنك التواصل المباشر مع المستشار التجاري للمعرض المعني عبر زر واتساب أو الهاتف، ليتم تحديد موعد ذو أولوية لمعاينة السيارة وتجربتها ميدانياً.'
        }
      ]
    }
  };

  const content = faqData[language] || faqData.fr;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          maxWidth: '780px',
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
              <HelpCircle size={18} color="#FF6B00" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: 'clamp(1rem, 3.4vw, 1.25rem)', fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.25 }}>
                {content.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 0' }}>
                {content.subtitle}
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

        {/* FAQ Accordion Body */}
        <div style={{ padding: 'clamp(14px, 3.2vw, 26px)', maxHeight: '72vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {content.items.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: isOpen ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                    border: isOpen ? '1px solid rgba(255, 70, 5, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: isRTL ? 'right' : 'left',
                      cursor: 'pointer',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ flexShrink: 0 }}>{faq.icon}</span>
                      <span style={{ fontSize: '0.96rem', fontWeight: 700, color: isOpen ? '#FFFFFF' : '#E2E8F0' }}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      color={isOpen ? '#FF6B00' : '#64748B'}
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: isRTL ? '0 50px 18px 20px' : '0 20px 18px 50px',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: '#94A3B8',
                      textAlign: isRTL ? 'right' : 'left'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need help footer box */}
          <div style={{
            marginTop: '24px',
            padding: '16px 20px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageCircle size={20} color="#10B981" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {content.otherQuestion}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  {content.supportText}
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/213550123456?text=${encodeURIComponent(content.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <span>{content.contactBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
