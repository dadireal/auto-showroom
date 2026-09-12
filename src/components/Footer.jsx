import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer({ onScrollToSection, onSelectWilaya }) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer style={{ background: '#090D16', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '80px', paddingBottom: '36px' }}>
      <div className="container">
        {/* Top 4-Column Grid */}
        <div className="footer-grid" style={{ marginBottom: '50px' }}>
          {/* Column 1: Brand */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <Logo size="medium" subtitle={language === 'ar' ? 'بوابة المعارض المعتمدة' : 'PORTAIL AUTOMOBILE'} />
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '20px' }}>
              {t('footer.description')}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.82rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>{language === 'ar' ? 'مركبات معتمدة ومضمونة 100%' : language === 'en' ? 'Certified & Guaranteed Vehicles' : 'Véhicules Certifiés & Garantis'}</span>
            </div>
          </div>

          {/* Column 2: Navigation Rapide */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('footer.quickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#" style={{ color: '#94a3b8' }} onMouseEnter={e => e.target.style.color='#ff4605'} onMouseLeave={e => e.target.style.color='#94a3b8'}>{t('nav.home')}</a></li>
              <li><button onClick={() => onScrollToSection('inventory')} style={{ background: 'none', color: '#94a3b8', fontSize: '0.88rem', padding: 0 }} onMouseEnter={e => e.target.style.color='#ff4605'} onMouseLeave={e => e.target.style.color='#94a3b8'}>{t('nav.allVehicles')}</button></li>
              <li><button onClick={() => onScrollToSection('showrooms')} style={{ background: 'none', color: '#94a3b8', fontSize: '0.88rem', padding: 0 }} onMouseEnter={e => e.target.style.color='#ff4605'} onMouseLeave={e => e.target.style.color='#94a3b8'}>{t('nav.showrooms')}</button></li>
              <li><button onClick={() => onScrollToSection('products')} style={{ background: 'none', color: '#94a3b8', fontSize: '0.88rem', padding: 0 }} onMouseEnter={e => e.target.style.color='#ff4605'} onMouseLeave={e => e.target.style.color='#94a3b8'}>{t('nav.accessories')}</button></li>
              <li><button onClick={() => onScrollToSection('why-us')} style={{ background: 'none', color: '#94a3b8', fontSize: '0.88rem', padding: 0 }} onMouseEnter={e => e.target.style.color='#ff4605'} onMouseLeave={e => e.target.style.color='#94a3b8'}>{t('nav.pledge')}</button></li>
            </ul>
          </div>

          {/* Column 3: Showrooms par Wilaya */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {language === 'ar' ? 'معارض حسب الولاية' : language === 'en' ? 'Showrooms by Region' : 'Showrooms par Région'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              {['Alger (16)', 'Oran (31)', 'Annaba (23)', 'Blida (09)', 'Sétif (19)', 'Constantine (25)'].map(w => (
                <li key={w}>
                  <button
                    onClick={() => { onSelectWilaya(w); onScrollToSection('inventory'); }}
                    style={{ background: 'none', color: '#94a3b8', fontSize: '0.88rem', padding: 0, cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.color='#ff4605'}
                    onMouseLeave={e => e.target.style.color='#94a3b8'}
                  >
                    {language === 'ar' ? `معارض في ${w}` : language === 'en' ? `Showrooms in ${w}` : `Showrooms à ${w}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {language === 'ar' ? 'النشرة البريدية للمعرض' : language === 'en' ? 'Showroom Newsletter' : 'Newsletter Showroom'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '14px', lineHeight: 1.5 }}>
              {language === 'ar' 
                ? 'اشترك ليصلك إشعار فوري عند وصول سيارات جديدة 00 كم وفرص حصرية.'
                : language === 'en'
                ? 'Be notified in priority when new 00 km arrivals and exclusive opportunities drop.'
                : 'Soyez notifié en priorité dès l’arrivée de nouveaux véhicules 00 km et d\'opportunités sélectionnées.'}
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
              <input
                type="email"
                placeholder={language === 'ar' ? 'بريدك الإلكتروني...' : language === 'en' ? 'Your email address...' : 'Votre adresse email...'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  width: '100%',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '9px 14px' }}
                title="S'abonner"
              >
                <Send size={16} />
              </button>
            </form>

            {subscribed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.82rem', marginBottom: '12px' }}>
                <CheckCircle size={15} />
                <span>{language === 'ar' ? 'شكراً لك! تم تسجيل اشتراكك بنجاح.' : language === 'en' ? 'Thank you! You are subscribed.' : 'Merci ! Vous êtes bien inscrit(e).'}</span>
              </div>
            )}

            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--primary)" />
                <span>+213 (0) 550 00 00 00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--primary)" />
                <span>contact@autoshowroom.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.5)'
        }}>
          <div>
            © {new Date().getFullYear()} Auto Showroom — {t('footer.rights')}
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <a href="#" style={{ color: 'inherit' }}>{language === 'ar' ? 'إشعار قانوني' : language === 'en' ? 'Legal Notice' : 'Mentions Légales'}</a>
            <a href="#" style={{ color: 'inherit' }}>{language === 'ar' ? 'سياسة الخصوصية' : language === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}</a>
            <a href="#" style={{ color: 'inherit' }}>{language === 'ar' ? 'الشروط والأحكام' : language === 'en' ? 'Terms & Conditions' : 'Conditions Générales de Vente'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
