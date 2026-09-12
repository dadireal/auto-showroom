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
  Heart
} from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../i18n/LanguageContext';

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
  onOpenFavorites
}) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'search' | 'pages' | null

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={isScrolled ? 'header-sticky' : 'header-transparent'}
      >
        {/* Top Minimal Info Bar */}
        <div style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          fontSize: '0.78rem',
          padding: '6px 0',
          color: '#94A3B8'
        }}>
          <div className="container-wide top-info-bar-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="top-info-bar-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
                <ShieldCheck size={13} color="#10B981" />
                <span>{t('topBar.certifiedPlatform')}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneCall size={12} color="#FF6B00" />
                <span>{t('topBar.concierge')}: <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>+213 (0) 550 00 00 00</strong></span>
              </span>
            </div>

            {/* Language Selector, Currency Selector & Dealer Portal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Language Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Globe size={13} color="#FF6B00" />
                <div style={{ position: 'relative' }}>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '2px 20px 2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none'
                    }}
                  >
                    <option value="fr" style={{ background: '#0F172A', color: '#fff' }}>🇫🇷 FR</option>
                    <option value="en" style={{ background: '#0F172A', color: '#fff' }}>🇬🇧 EN</option>
                    <option value="ar" style={{ background: '#0F172A', color: '#fff' }}>🇩🇿 عربي</option>
                  </select>
                  <ChevronDown size={11} color="#94A3B8" style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Currency Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Coins size={13} color="#FBBF24" />
                <span style={{ fontWeight: 600, color: '#94A3B8', fontSize: '0.75rem' }}>{t('topBar.currency')}</span>
                <div style={{ position: 'relative' }}>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '2px 20px 2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none'
                    }}
                  >
                    <option value="M" style={{ background: '#0F172A', color: '#fff' }}>Millions Cts (M)</option>
                    <option value="DZD" style={{ background: '#0F172A', color: '#fff' }}>Dinar Algérien (DZD)</option>
                    <option value="EUR" style={{ background: '#0F172A', color: '#fff' }}>Euro (€ indicatif)</option>
                  </select>
                  <ChevronDown size={11} color="#94A3B8" style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              {isAdminLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={onOpenDashboard}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.22) 0%, rgba(251, 191, 36, 0.22) 100%)',
                      border: '1px solid rgba(255, 107, 0, 0.5)',
                      color: '#FF6B00',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <LayoutDashboard size={13} />
                    <span>{t('topBar.adminDashboard')}</span>
                    {pendingOrdersCount > 0 && (
                      <span style={{
                        background: '#FF6B00',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '1px 6px',
                        fontSize: '0.68rem',
                        fontWeight: 800
                      }}>
                        {pendingOrdersCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={onLogout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                    title={t('topBar.logout')}
                  >
                    <LogOut size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  style={{
                    background: 'none',
                    color: '#94A3B8',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  <User size={12} />
                  <span>{t('topBar.dealerPortal')}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div 
          ref={dropdownRef} 
          className="container-wide" 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px' }}
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
                    background: 'rgba(15, 23, 42, 0.97)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8)',
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
                    background: 'rgba(15, 23, 42, 0.97)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Comparateur badge button */}
            <button
              onClick={onOpenComparison}
              className="btn-outline"
              style={{
                position: 'relative',
                padding: '8px 12px',
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
              className="btn-outline"
              style={{
                position: 'relative',
                padding: '8px 12px',
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
                color: '#CBD5E1',
                fontSize: '0.84rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 10px',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
            >
              <User size={15} color="#FF6B00" />
              <span>{t('nav.login')}</span>
            </button>

            {/* High-Visibility CTA: + Ajouter un Véhicule / Annonce */}
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px',
                display: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(9, 13, 22, 0.98)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backdropFilter: 'blur(20px)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
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

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => { onOpenAddVehicle(); setMobileMenuOpen(false); }} 
                className="btn-primary" 
                style={{ width: '100%' }}
              >
                <PlusCircle size={16} /> {t('nav.addVehicle')}
              </button>
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
          color: #CBD5E1;
          font-size: 0.86rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
          padding-left: 22px;
        }
        @media (max-width: 1040px) {
          .desktop-nav { display: none !important; }
          .desktop-text { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (max-width: 640px) {
          .header-login-btn { display: none !important; }
        }
        @media (max-width: 480px) {
          .header-add-btn-text { display: none !important; }
          .header-add-btn { padding: 8px 10px !important; }
        }
      `}</style>
    </>
  );
}
