import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContactModal({ isOpen, onClose }) {
  const { language, isRTL } = useLanguage();
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    wilaya: 'Alger (16)',
    subject: 'Renseignement sur un véhicule',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      language === 'ar'
        ? `مرحباً، أتواصل معكم عبر بوابة المعرض :\nالاسم : ${form.name}\nالهاتف : ${form.phone}\nالولاية : ${form.wilaya}\nالموضوع : ${form.subject}\nالرسالة : ${form.message}`
        : `Bonjour, je vous contacte via le portail showroom :\nNom : ${form.name}\nTél : ${form.phone}\nWilaya : ${form.wilaya}\nSujet : ${form.subject}\nMessage : ${form.message}`
    );
    window.open(`https://wa.me/213550123456?text=${encoded}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          background: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '18px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden',
          textAlign: isRTL ? 'right' : 'left'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {language === 'ar' ? 'اتصل بنا وخدمة الكونسيرج' : language === 'en' ? 'Contact & Showroom Concierge' : 'Contact & Service Concierge Showroom'}
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', margin: '2px 0 0' }}>
              {language === 'ar' ? 'مستشارونا في خدمتكم 7 أيام في الأسبوع لمرافقتكم في اختيار سيارتكم المثالية' : language === 'en' ? 'Our concierge advisors are available 7 days a week to assist your automotive project' : 'Nos conseillers vous accueillent 7j/7 pour vous assister dans votre projet automobile'}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94A3B8',
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

        {/* Content Body */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {/* Direct Contact Details */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
                {language === 'ar' ? 'معلومات الاتصال المباشر' : language === 'en' ? 'Direct Contact Information' : 'Coordonnées Directes'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <a 
                  href="tel:0550000000"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <Phone size={18} color="#FF6B00" />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                      {language === 'ar' ? 'الهاتف الرئيسي' : language === 'en' ? 'Phone Center' : 'Standard Téléphonique'}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>+213 (0) 550 00 00 00</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/213550123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    borderRadius: '10px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <MessageCircle size={18} color="#10B981" />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#10B981', textTransform: 'uppercase', fontWeight: 700 }}>
                      {language === 'ar' ? 'واتساب المبيعات المباشر' : language === 'en' ? 'Direct Sales WhatsApp' : 'WhatsApp Vendeurs & Direct'}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>+213 550 12 34 56</div>
                  </div>
                </a>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <MapPin size={18} color="#FBBF24" />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                      {language === 'ar' ? 'فروع المعارض' : language === 'en' ? 'Showroom Hubs' : 'Pôles Showroom'}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
                      {language === 'ar' ? 'الجزائر • وهران • عنابة • البليدة • سطيف' : 'Alger • Oran • Annaba • Blida • Sétif'}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <Clock size={18} color="#94A3B8" />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                      {language === 'ar' ? 'ساعات العمل' : language === 'en' ? 'Opening Hours' : 'Horaires d\'Ouverture'}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>
                      {language === 'ar' ? '08:30 - 19:00 (السبت إلى الخميس)' : language === 'en' ? '08:30 - 19:00 (Saturday to Thursday)' : '08:30 - 19:00 (Samedi au Jeudi)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Callback Request Form */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
                {language === 'ar' ? 'إرسال رسالة سريعة' : language === 'en' ? 'Send a Message' : 'Envoyer un Message'}
              </h4>

              {submitted ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: '30px 20px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 12px' }} />
                  <h5 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '6px' }}>
                    {language === 'ar' ? 'تم إرسال الطلب بنجاح' : language === 'en' ? 'Request Submitted' : 'Demande Transmise'}
                  </h5>
                  <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    {language === 'ar' ? 'تم إرسال رسالتكم مباشرة إلى المعرض.' : language === 'en' ? 'Your message has been sent directly to the showroom.' : 'Votre message a été transmis directement au showroom.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <input 
                      type="text" 
                      placeholder={language === 'ar' ? 'الاسم الكامل *' : language === 'en' ? 'Your Full Name *' : 'Votre Nom & Prénom *'}
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(9, 13, 22, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#fff',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <input 
                      type="tel" 
                      placeholder={language === 'ar' ? 'رقم الهاتف (مثال: ...0550) *' : language === 'en' ? 'Phone Number (e.g. 0550...) *' : 'Numéro de Téléphone (ex: 0550...) *'}
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(9, 13, 22, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#fff',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(9, 13, 22, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#fff',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="Renseignement sur un véhicule">
                        {language === 'ar' ? 'استفسار عن سيارة' : language === 'en' ? 'Inquiry about a vehicle' : 'Renseignement sur un véhicule'}
                      </option>
                      <option value="Demande d'essai routier">
                        {language === 'ar' ? 'طلب تجربة قيادة' : language === 'en' ? 'Request a test drive' : 'Demande d\'essai routier'}
                      </option>
                      <option value="Simulation de crédit / reprise">
                        {language === 'ar' ? 'محاكاة تمويل / استبدال' : language === 'en' ? 'Financing / Trade-in simulation' : 'Simulation de crédit / reprise'}
                      </option>
                      <option value="Devenir showroom partenaire">
                        {language === 'ar' ? 'الانضمام كمعرض شريك' : language === 'en' ? 'Become a partner showroom' : 'Devenir showroom partenaire'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <textarea 
                      placeholder={language === 'ar' ? 'اكتب رسالتك أو الموديل المطلوب...' : language === 'en' ? 'Your message or vehicle reference...' : 'Votre message ou référence du modèle...'}
                      rows={3}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(9, 13, 22, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ width: '100%', padding: '11px', marginTop: '4px' }}
                  >
                    <Send size={15} />
                    <span>{language === 'ar' ? 'إرسال عبر واتساب المعرض' : language === 'en' ? 'Send via Showroom WhatsApp' : 'Envoyer via WhatsApp Showroom'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
