import React, { useState, useEffect, useRef } from 'react';
import { 
  Store, 
  GitCompare, 
  RefreshCw, 
  User, 
  Menu, 
  X, 
  PhoneCall, 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  PlusCircle, 
  HelpCircle, 
  Calculator, 
  Info, 
  Mail, 
  Car, 
  ShoppingBag, 
  Users,
  LayoutDashboard,
  LogOut,
  Globe,
  Heart,
  Play,
  Sun,
  Moon
} from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

export default function Header({ 
  currency, 
  setCurrency, 
  comparisonCount, 
  onOpenComparison, 
  onOpenTradeIn, 
  onSelectCondition, 
  onScrollToSection, 
  onOpenLogin, 
  onOpenAddVehicle,
  onOpenFAQ,
  onOpenLoanCalculator,
  onOpenContact,
  onOpenAbout,
  isAdminLoggedIn = false,
  onOpenDashboard,
  pendingOrdersCount = 0,
  onLogout,
  favoritesCount = 0,
  onOpenFavorites,
  onReplayIntro
}) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'search' | 'pages' | null

  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Update sticky state
      setIsScrolled(currentY > 30);

      // Show/hide header based on scroll direction
      if (currentY < 80) {
        // Always show near the top
        setHeaderVisible(true);
      } else if (delta > 6) {
        // Scrolling DOWN — hide
        setHeaderVisible(false);
        setMobileMenuOpen(false); // close drawer when hiding
      } else if (delta < -4) {
        // Scrolling UP — reveal
        setHeaderVisible(true);
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, box-shadow 0.3s ease',
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          willChange: 'transform',
        }}
        className={isScrolled ? 'header-sticky' : 'header-transparent'}
      >
        {/* Top Minimal Info Bar — collapses on scroll */}
        <div 
          className="top-info-bar-container"
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.78rem',
            color: '#94A3B8',
            maxHeight: isScrolled ? '0px' : '60px',
            opacity: isScrolled ? 0 : 1,
            transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, padding 0.3s ease',
            padding: isScrolled ? '0' : '6px 0',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <div className="container-wide top-info-bar-wrap" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            minHeight: '28px'
          }}>
            <div className="top-info-bar-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={13} color="#10B981" />
                <span>{t('topBar.certifiedPlatform')}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <PhoneCall size={12} color="#FF6B00" />
                <span>{t('topBar.concierge')}: <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>+213 (0) 550 00 00 00</strong></span>
              </span>
            </div>

            {/* Language Selector, Currency Selector & Dealer Portal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Luxury Language Pill with 100% Full-Box Hit Area */}
              <div 
                className="top-bar-lang"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '28px',
                  borderRadius: '8px',
                  padding: '0 8px',
                  gap: '5px',
                  boxSizing: 'border-box'
                }}
              >
                <Globe size={13} color="#FF6B00" style={{ flexShrink: 0, pointerEvents: 'none' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, pointerEvents: 'none' }}>
                  {language === 'ar' ? '🇩🇿 عربي' : language === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
                </span>
                <ChevronDown 
                  size={11} 
                  color="var(--text-muted)" 
                  style={{ flexShrink: 0, pointerEvents: 'none' }} 
                />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  aria-label={t('topBar.language', 'Langue')}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                >
                  <option value="fr" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>🇫🇷 FR</option>
                  <option value="en" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>🇬🇧 EN</option>
                  <option value="ar" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>🇩🇿 عربي</option>
                </select>
              </div>

              {/* Luxury Currency Pill with 100% Full-Box Hit Area */}
              <div 
                className="top-bar-currency" 
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '28px',
                  borderRadius: '8px',
                  padding: '0 8px',
                  gap: '5px',
                  boxSizing: 'border-box'
                }}
              >
                <Coins size={13} color="#FBBF24" style={{ flexShrink: 0, pointerEvents: 'none' }} />
                <span className="desktop-text" style={{ fontWeight: 600, fontSize: '0.74rem', pointerEvents: 'none' }}>
                  {t('topBar.currency')}
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.75rem', pointerEvents: 'none' }}>
                  {currency === 'M' ? 'Millions (M)' : currency}
                </span>
                <ChevronDown 
                  size={11} 
                  color="var(--text-muted)" 
                  style={{ flexShrink: 0, pointerEvents: 'none' }} 
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  aria-label={t('topBar.currency', 'Devise')}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                >
                  <option value="M" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>Millions (M)</option>
                  <option value="DZD" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>DZD</option>
                  <option value="EUR" style={{ background: 'var(--surface-card)', color: 'var(--text-main)' }}>EUR (€)</option>
                </select>
              </div>

              {/* Theme Mode Toggle Pill (Light/Dark) */}
              <button
                onClick={toggleTheme}
                className="top-bar-theme-toggle"
                aria-label="Toggle Dark / Light Mode"
                style={{
                  height: '28px',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '0 8px',
                  color: 'var(--text-main)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                title={theme === 'dark' ? t('theme.switchLight') : t('theme.switchDark')}
              >
                {theme === 'dark' ? (
                  <Sun size={13} color="#FBBF24" style={{ flexShrink: 0 }} />
                ) : (
                  <Moon size={13} color="#FF4605" style={{ flexShrink: 0 }} />
                )}
                <span className="desktop-text" style={{ fontSize: '0.73rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                </span>
              </button>

              {/* Replay Cinematic Intro button */}
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="top-bar-intro-btn"
                  style={{
                    height: '28px',
                    background: 'rgba(255, 70, 5, 0.08)',
                    border: '1px solid rgba(255, 70, 5, 0.28)',
                    borderRadius: '8px',
                    padding: '0 8px',
                    color: '#FF7847',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255, 70, 5, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 70, 5, 0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 70, 5, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 70, 5, 0.28)';
                  }}
                  title={language === 'ar' ? 'إعادة تشغيل العرض الرياضي' : language === 'en' ? 'Replay Supercar Intro' : 'Rejouer l\'intro sportive'}
                >
                  <Play size={10} fill="#FF7847" />
                  <span className="desktop-text">Intro</span>
                </button>
              )}

              {isAdminLoggedIn ? (
                <div className="top-bar-admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={onOpenDashboard}
                    style={{
                      height: '28px',
                      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.18) 0%, rgba(251, 191, 36, 0.14) 100%)',
                      border: '1px solid rgba(255, 107, 0, 0.45)',
                      color: '#FF7847',
                      fontSize: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 700,
                      padding: '0 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(255, 107, 0, 0.15)',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.7)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 0, 0.28) 0%, rgba(251, 191, 36, 0.22) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.45)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 0, 0.18) 0%, rgba(251, 191, 36, 0.14) 100%)';
                    }}
                  >
                    <LayoutDashboard size={13} />
                    <span className="desktop-text">{t('topBar.adminDashboard')}</span>
                    {pendingOrdersCount > 0 && (
                      <span style={{
                        background: '#FF4605',
                        color: '#FFFFFF',
                        borderRadius: '9999px',
                        padding: '0 6px',
                        height: '18px',
                        minWidth: '18px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 8px rgba(255, 70, 5, 0.6)'
                      }}>
                        {pendingOrdersCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={onLogout}
                    style={{
                      width: '28px',
                      height: '28px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94A3B8';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                    title={t('topBar.logout')}
                  >
                    <LogOut size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="top-bar-dealer"
                  style={{
                    height: '28px',
                    borderRadius: '8px',
                    padding: '0 10px',
                    fontSize: '0.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                >
                  <User size={12} color="#FF6B00" />
                  <span>{t('topBar.dealerPortal')}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div 
          ref={dropdownRef} 
          className="container-wide main-nav-container" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            transition: 'padding 0.3s ease',
            paddingTop: isScrolled ? '6px' : undefined,
            paddingBottom: isScrolled ? '6px' : undefined,
          }}
        >
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="#">
              <Logo size="medium" subtitle="PORTAIL SHOWROOM" />
            </a>
          </div>

          {/* Desktop Nav Links with Rich Vehica-Style Dropdowns */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {/* 1. Accueil */}
            <a 
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {t('nav.home')}
            </a>

            {/* 2. Recherche / Véhicules Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown('search')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'search' ? null : 'search')}
                className={`nav-link ${openDropdown === 'search' ? 'active' : ''}`}
                style={{ background: 'none' }}
              >
                <span>{t('nav.vehicles')}</span>
                <ChevronDown size={14} style={{ transform: openDropdown === 'search' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {openDropdown === 'search' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  paddingTop: '8px',
                  zIndex: 999
                }}>
                  <div style={{
                    background: 'var(--surface-card)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-concierge)',
                    minWidth: '220px',
                    padding: '8px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    <button
                      onClick={() => { onSelectCondition('all'); onScrollToSection('inventory'); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <Car size={15} color="#FF6B00" />
                      <span>{t('nav.allVehicles')}</span>
                    </button>
                    <button
                      onClick={() => { onSelectCondition('neuf'); onScrollToSection('inventory'); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <Sparkles size={15} color="#10B981" />
                      <span>{t('nav.newCars')}</span>
                    </button>
                    <button
                      onClick={() => { onSelectCondition('occasion'); onScrollToSection('inventory'); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <ShieldCheck size={15} color="#3B82F6" />
                      <span>{t('nav.usedCars')}</span>
                    </button>
                    <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '6px 0' }} />
                    <button
                      onClick={() => { onScrollToSection('showrooms'); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <Store size={15} color="#FBBF24" />
                      <span>{t('nav.showroomsByCity')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Pages Dropdown (Exact match to User's image: About us, Team, Loan Calculator, FAQ) */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpenDropdown('pages')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                onClick={() => setOpenDropdown(openDropdown === 'pages' ? null : 'pages')}
                className={`nav-link ${openDropdown === 'pages' ? 'active' : ''}`}
                style={{ background: 'none' }}
              >
                <span>{t('nav.pages')}</span>
                <ChevronDown size={14} style={{ transform: openDropdown === 'pages' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {openDropdown === 'pages' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  paddingTop: '8px',
                  zIndex: 999
                }}>
                  <div style={{
                    background: 'var(--surface-card)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-concierge)',
                    minWidth: '240px',
                    padding: '8px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    <button
                      onClick={() => { onOpenAbout(); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <Info size={15} color="#FF6B00" />
                      <span>{t('nav.aboutUs')}</span>
                    </button>

                    <button
                      onClick={() => { onOpenAbout(); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <Users size={15} color="#3B82F6" />
                      <span>{t('nav.team')}</span>
                    </button>

                    <button
                      onClick={() => { onOpenLoanCalculator(); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <Calculator size={15} color="#FBBF24" />
                      <span>{t('nav.loanCalculator')}</span>
                    </button>

                    <button
                      onClick={() => { onOpenFAQ(); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <HelpCircle size={15} color="#10B981" />
                      <span>{t('nav.faq')}</span>
                    </button>

                    <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '6px 0' }} />

                    <button
                      onClick={() => { onScrollToSection('products'); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <ShoppingBag size={15} color="#A855F7" />
                      <span>{t('nav.accessories')}</span>
                    </button>

                    <button
                      onClick={() => { onScrollToSection('why-us'); setOpenDropdown(null); }}
                      className="nav-dropdown-item"
                    >
                      <ShieldCheck size={15} color="#10B981" />
                      <span>{t('nav.pledge')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Showrooms */}
            <button 
              onClick={() => onScrollToSection('showrooms')} 
              className="nav-link"
              style={{ background: 'none' }}
            >
              <Store size={14} color="#FF6B00" />
              <span>{t('nav.showrooms')}</span>
            </button>

            {/* 5. Contact (Direct Modal Trigger) */}
            <button 
              onClick={onOpenContact} 
              className="nav-link"
              style={{ background: 'none' }}
            >
              <Mail size={14} color="#10B981" />
              <span>{t('nav.contact')}</span>
            </button>
          </nav>

          {/* Right Action CTAs (Vehica-Style: Connexion + Ajouter une Annonce) */}
          <div className="header-actions-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Comparateur badge button */}
            <button
              onClick={onOpenComparison}
              className="btn-outline header-action-btn"
              style={{
                position: 'relative',
                padding: '8px 10px',
                fontSize: '0.82rem'
              }}
              title={t('nav.compare')}
            >
              <GitCompare size={15} color="#FF6B00" />
              <span className="desktop-text">{t('nav.compare')}</span>
              {comparisonCount > 0 && (
                <span style={{
                  background: '#FF4605',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '4px'
                }}>
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Mon Garage (Favorites) button */}
            <button
              onClick={onOpenFavorites}
              className="btn-outline header-action-btn"
              style={{
                position: 'relative',
                padding: '8px 10px',
                fontSize: '0.82rem'
              }}
              title={t('garage.fullTitle')}
            >
              <Heart size={15} color="#EF4444" fill={favoritesCount > 0 ? '#EF4444' : 'none'} />
              <span className="desktop-text">{t('garage.title')}</span>
              {favoritesCount > 0 && (
                <span style={{
                  background: '#EF4444',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '4px'
                }}>
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* User Connexion Link */}
            <button 
              onClick={onOpenLogin}
              className="header-login-btn"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 10px',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
            >
              <User size={15} color="#FF6B00" />
              <span>{t('nav.login')}</span>
            </button>

            {/* High-Visibility CTA: + Ajouter un Véhicule (Admin / Concessionnaire Only) */}
            {isAdminLoggedIn && (
              <button 
                onClick={onOpenAddVehicle}
                className="btn-primary header-add-btn"
                style={{ 
                  padding: '9px 16px', 
                  fontSize: '0.84rem', 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FF4605 0%, #FF6B00 100%)',
                  boxShadow: '0 4px 16px rgba(255, 70, 5, 0.35)'
                }}
              >
                <PlusCircle size={15} />
                <span className="header-add-btn-text">{t('nav.addVehicle')}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--surface-card)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backdropFilter: 'blur(20px)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            {/* Mobile Theme Toggle Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--surface-subtle)', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {theme === 'dark' ? <Moon size={16} color="#FF6B00" /> : <Sun size={16} color="#FBBF24" />}
                {theme === 'dark' ? t('theme.dark') : t('theme.light')}
              </span>
              <button
                onClick={toggleTheme}
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {theme === 'dark' ? t('theme.switchLight') : t('theme.switchDark')}
              </button>
            </div>
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => { onSelectCondition('all'); onScrollToSection('inventory'); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <Car size={16} color="#FF6B00" />
              {t('nav.allVehicles')}
            </button>
            <button 
              onClick={() => { onSelectCondition('neuf'); onScrollToSection('inventory'); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <Sparkles size={16} color="#10B981" />
              {t('nav.newCars')}
            </button>
            <button 
              onClick={() => { onSelectCondition('occasion'); onScrollToSection('inventory'); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <ShieldCheck size={16} color="#3B82F6" />
              {t('nav.usedCars')}
            </button>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }} />

            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, paddingLeft: '8px' }}>
              {t('nav.pages')}
            </div>
            <button 
              onClick={() => { onOpenAbout(); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <Info size={16} color="#FF6B00" />
              {t('nav.aboutUs')}
            </button>
            <button 
              onClick={() => { onOpenLoanCalculator(); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <Calculator size={16} color="#FBBF24" />
              {t('nav.loanCalculator')}
            </button>
            <button 
              onClick={() => { onOpenFAQ(); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <HelpCircle size={16} color="#10B981" />
              {t('nav.faq')}
            </button>
            <button 
              onClick={() => { onScrollToSection('showrooms'); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <Store size={16} color="#FF6B00" />
              {t('nav.showrooms')}
            </button>
            <button 
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start' }}
            >
              <Mail size={16} color="#10B981" />
              {t('nav.contact')}
            </button>

            <button 
              onClick={() => { onOpenFavorites && onOpenFavorites(); setMobileMenuOpen(false); }} 
              className="nav-link" 
              style={{ background: 'none', justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Heart size={16} color="#EF4444" fill={favoritesCount > 0 ? '#EF4444' : 'none'} />
              <span>{t('garage.fullTitle')} ({favoritesCount})</span>
            </button>

            {onReplayIntro && (
              <button 
                onClick={() => { onReplayIntro(); setMobileMenuOpen(false); }} 
                className="nav-link" 
                style={{ background: 'none', justifyContent: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', color: '#FF7847' }}
              >
                <Play size={15} fill="#FF7847" />
                <span>{language === 'ar' ? '🏎️ إعادة العرض الرياضي' : language === 'en' ? '🏎️ Replay Supercar Intro' : '🏎️ Rejouer l\'intro sportive'}</span>
              </button>
            )}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {isAdminLoggedIn && (
                <button 
                  onClick={() => { onOpenAddVehicle(); setMobileMenuOpen(false); }} 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                >
                  <PlusCircle size={16} /> {t('nav.addVehicle')}
                </button>
              )}
              <button 
                onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }} 
                className="btn-outline" 
                style={{ width: '100%' }}
              >
                <User size={15} /> {t('topBar.dealerPortal')}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global CSS for Nav Dropdowns and Responsive layout */}
      <style>{`
        .nav-dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 18px;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.86rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-dropdown-item:hover {
          background: var(--surface-subtle);
          color: var(--text-main);
          padding-left: 22px;
        }
        .mobile-toggle {
          display: none;
          background: var(--surface-subtle);
          color: var(--text-main);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        @media (max-width: 1040px) {
          .desktop-nav { display: none !important; }
          .desktop-text { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (max-width: 768px) {
          .top-info-bar-left { display: none !important; }
          .top-info-bar-wrap { justify-content: flex-end !important; }
        }
        @media (max-width: 640px) {
          .header-login-btn { display: none !important; }
          .header-add-btn { display: none !important; }
          .top-bar-dealer { display: none !important; }
          .top-info-bar-wrap { justify-content: space-between !important; width: 100% !important; }
          .main-nav-container { padding: 8px 12px !important; }
          .header-actions-wrap { gap: 6px !important; }
          .header-action-btn { padding: 6px 8px !important; }
          .mobile-toggle {
            display: flex !important;
            width: 36px !important;
            height: 36px !important;
            min-height: 36px !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
