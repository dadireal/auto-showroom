import React, { useState } from 'react';
import { X, Lock, User, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const { language, isRTL } = useLanguage();

  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');
  const [logged, setLogged] = useState(false);

  const texts = {
    fr: {
      title: 'Espace Concessionnaire',
      subtitle: 'Connexion sécurisée au portail de gestion showroom',
      successTitle: 'Connexion Réussie !',
      successSub: 'Ouverture du tableau de bord showroom en cours...',
      error: 'Identifiants incorrects. Veuillez utiliser le compte administrateur démo.',
      userInput: 'Identifiant ou Email Showroom',
      passInput: 'Mot de Passe',
      demoTitle: 'Identifiants Démo Rapides',
      demoSub: 'Utilisateur : admin | MDP : admin',
      fillBtn: 'Remplir',
      submitBtn: 'Accéder au Tableau de Bord'
    },
    en: {
      title: 'Showroom Dealer Portal',
      subtitle: 'Secure access to dealership inventory management',
      successTitle: 'Login Successful!',
      successSub: 'Opening showroom admin dashboard...',
      error: 'Invalid credentials. Please use the demo administrator credentials.',
      userInput: 'Showroom Username or Email',
      passInput: 'Password',
      demoTitle: 'Quick Demo Credentials',
      demoSub: 'Username: admin | Password: admin',
      fillBtn: 'Auto-fill',
      submitBtn: 'Access Admin Dashboard'
    },
    ar: {
      title: 'فضاء الوكلاء وإدارة المعرض',
      subtitle: 'تسجيل دخول آمن إلى لوحة التحكم وإدارة المخزون',
      successTitle: 'تم تسجيل الدخول بنجاح !',
      successSub: 'جاري فتح لوحة التحكم والمعاملات...',
      error: 'بيانات الدخول غير صحيحة. يرجى استخدام حساب المشرف التجريبي.',
      userInput: 'اسم المستخدم أو البريد الإلكتروني',
      passInput: 'كلمة المرور',
      demoTitle: 'بيانات الدخول التجريبية السريعة',
      demoSub: 'المستخدم : admin | كلمة المرور : admin',
      fillBtn: 'تعبئة',
      submitBtn: 'الدخول إلى لوحة التحكم'
    }
  };

  const t = texts[language] || texts.fr;

  const handleQuickFill = () => {
    setEmail('admin');
    setPassword('admin');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanUser = email.trim().toLowerCase();
    const isUserValid = cleanUser === 'admin' || cleanUser === 'direction' || cleanUser.includes('admin');
    const isPassValid = password === 'admin' || password === 'admin123' || password === '123456' || password === 'showroom2024';

    if (isUserValid && isPassValid) {
      setLogged(true);
      setTimeout(() => {
        setLogged(false);
        onClose();
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 700);
    } else {
      setErrorMessage(t.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          maxWidth: '440px',
          padding: '28px',
          background: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '18px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {t.title}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '3px' }}>
              {t.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {logged ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle size={52} color="#10B981" style={{ marginBottom: '14px' }} />
            <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 800 }}>{t.successTitle}</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginTop: '6px' }}>
              {t.successSub}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Error Message */}
            {errorMessage && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '10px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F87171',
                fontSize: '0.82rem'
              }}>
                <AlertCircle size={16} flexShrink={0} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email / Username */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                {t.userInput}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: isRTL ? '11px 38px 11px 12px' : '11px 12px 11px 38px',
                    borderRadius: '8px',
                    background: '#080C14',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                />
                <User 
                  size={16} 
                  color="#FF6B00" 
                  style={{ 
                    position: 'absolute', 
                    ...(isRTL ? { right: '13px' } : { left: '13px' }), 
                    top: '14px' 
                  }} 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                {t.passInput}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: isRTL ? '11px 38px 11px 12px' : '11px 12px 11px 38px',
                    borderRadius: '8px',
                    background: '#080C14',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                />
                <Lock 
                  size={16} 
                  color="#FF6B00" 
                  style={{ 
                    position: 'absolute', 
                    ...(isRTL ? { right: '13px' } : { left: '13px' }), 
                    top: '14px' 
                  }} 
                />
              </div>
            </div>

            {/* Quick Fill Demo Helper Box */}
            <div style={{
              background: 'rgba(255, 107, 0, 0.08)',
              border: '1px dashed rgba(255, 107, 0, 0.35)',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FF6B00', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={13} />
                  <span>{t.demoTitle}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#CBD5E1', marginTop: '2px' }}>
                  {t.demoSub}
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                style={{
                  background: 'rgba(255, 107, 0, 0.2)',
                  border: '1px solid rgba(255, 107, 0, 0.4)',
                  color: '#FF6B00',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {t.fillBtn}
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '4px',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 107, 0, 0.35)',
                transition: 'all 0.2s'
              }}
            >
              {t.submitBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
