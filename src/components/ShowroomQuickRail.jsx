import React from 'react';
import { 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Gauge, 
  Radio, 
  MapPin, 
  Truck, 
  Award,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ShowroomQuickRail({ 
  totalVehicles = 22,
  onSelectCategory,
  onSelectCondition,
  onExplore
}) {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const QUICK_COLLECTIONS = [
    {
      id: 'supercars',
      title: t('quickRail.supercars', 'Supercars & Coupés'),
      badge: '500+ ch',
      icon: Flame,
      accent: '#FF3B30',
      action: () => onSelectCategory?.('coupe')
    },
    {
      id: 'suv',
      title: t('quickRail.suv', 'SUV Ultra-Luxe'),
      badge: 'Prestige 4x4',
      icon: ShieldCheck,
      accent: '#10B981',
      action: () => onSelectCategory?.('suv')
    },
    {
      id: 'neuf',
      title: t('quickRail.newCars', '00 km - Neuf'),
      badge: 'Garantie Showroom',
      icon: Sparkles,
      accent: '#F59E0B',
      action: () => onSelectCondition?.('neuf')
    },
    {
      id: 'sedan',
      title: t('quickRail.sedan', 'Berlines Sport & GT'),
      badge: 'V8 & Bi-Turbo',
      icon: Gauge,
      accent: '#3B82F6',
      action: () => onSelectCategory?.('sedan')
    }
  ];

  return (
    <section className="showroom-quick-rail-section" id="showroom-quick-rail">
      <div className="container">
        
        {/* ─── 1. SECTION TITLE / AMBIENT PRESTIGE OVERLINE ─── */}
        <div className="quick-rail-header">
          <div className="quick-rail-badge">
            <Radio size={12} className="quick-rail-pulse-dot" />
            <span>{t('quickRail.liveHeader', 'ACCÈS DIRECT PAR UNIVERS')}</span>
          </div>
        </div>

        {/* ─── 2. INTERACTIVE FAST-PASS CARDS (SLEEK GLASS TOUCH RAIL) ─── */}
        <div className="quick-rail-grid">
          {QUICK_COLLECTIONS.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="quick-rail-card"
                style={{ '--card-accent': item.accent }}
                title={item.title}
              >
                <div className="quick-rail-icon-box">
                  <IconComponent size={18} />
                </div>
                <div className="quick-rail-text-wrap">
                  <div className="quick-rail-card-title">{item.title}</div>
                  <div className="quick-rail-card-sub">{item.badge}</div>
                </div>
                <div className="quick-rail-arrow">
                  <ChevronRight size={15} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── 3. SLEEK LIVE TELEMETRY STATUS CAPSULE (Replaces the 4 bulky boxes) ─── */}
        <div className="quick-rail-telemetry-capsule">
          <div className="telemetry-pill-item live-pulse">
            <span className="telemetry-live-dot" />
            <span className="telemetry-strong">{totalVehicles || 22}+</span>
            <span>{t('hero.statVehicles', 'Véhicules Disponibles')}</span>
          </div>

          <span className="telemetry-separator">•</span>

          <div className="telemetry-pill-item">
            <MapPin size={13} color="#3B82F6" />
            <span className="telemetry-strong">04</span>
            <span>{t('hero.statShowrooms', 'Showrooms Agréés')}</span>
          </div>

          <span className="telemetry-separator">•</span>

          <div className="telemetry-pill-item">
            <Award size={13} color="#10B981" />
            <span className="telemetry-strong">100%</span>
            <span>{t('hero.statInspection', 'Contrôle 100 Points')}</span>
          </div>

          <span className="telemetry-separator">•</span>

          <div className="telemetry-pill-item">
            <Truck size={13} color="#F59E0B" />
            <span>{t('quickRail.delivery', 'Livraison 48h')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
