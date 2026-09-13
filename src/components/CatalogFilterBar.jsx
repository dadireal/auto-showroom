import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CarFront, 
  Check,
  ArrowUpDown
} from 'lucide-react';
import { WILAYAS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

// Precision Luxury Automotive Silhouettes (OEM Standards)
const CarSilhouettes = {
  all: (
    <CarFront size={16} strokeWidth={2.2} />
  ),
  sedan: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9H3M6.8 9H15.2M19 9H21M1.2 9L3.2 6.2C3.9 5.2 5 4.5 6.2 4.5H13.8C15 4.5 16.1 5.2 16.8 6.2L19.2 9H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6.2 5.5H10V8.2H4.8L6.2 5.5ZM10.8 5.5H13.5C14.3 5.5 15 6 15.5 6.8L16.5 8.2H10.8V5.5Z" fill="currentColor" fillOpacity="0.32" />
      <circle cx="4.8" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.8" cy="9" r="0.6" fill="currentColor" />
      <circle cx="17.2" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="9" r="0.6" fill="currentColor" />
    </svg>
  ),
  suv: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 2.2H15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1 9.5H3M6.8 9.5H15.2M19 9.5H21M1.2 9.5L2.8 6C3.3 4.8 4.4 3.8 5.8 3.8H15.8L18.5 6.8L20.8 9.5H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.8 4.6H10.5V8.5H4.2L5.8 4.6ZM11.3 4.6H15.2L17.5 8.5H11.3V4.6Z" fill="currentColor" fillOpacity="0.32" />
      <circle cx="4.8" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4.8" cy="9.5" r="0.7" fill="currentColor" />
      <circle cx="17.2" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="9.5" r="0.7" fill="currentColor" />
    </svg>
  ),
  coupe: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9H3M6.8 9H15.2M19 9H21M1.2 9L4.5 5.8C5.6 4 7.8 3.2 10.2 3.2C13.5 3.2 16.5 4.8 19.5 9H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 5C8.2 4.2 9.6 3.8 11.2 3.8C13.5 3.8 15.5 4.7 17 7.5H5.8L7 5Z" fill="currentColor" fillOpacity="0.32" />
      <path d="M19.5 7.8L21.5 7.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="4.8" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.8" cy="9" r="0.6" fill="currentColor" />
      <circle cx="17.2" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="9" r="0.6" fill="currentColor" />
    </svg>
  ),
  cabriolet: (
    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.8 4L9 7.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.8 4L9 7.8H5.2L6.8 4Z" fill="currentColor" fillOpacity="0.32" />
      <path d="M12.5 6C12.5 5.2 13.2 4.6 14 4.6C14.8 4.6 15.5 5.2 15.5 6V7.8H12.5V6Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1 9H3M6.8 9H15.2M19 9H21M1.2 9L5 7.8H19.5L21.2 9H1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="4.8" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.8" cy="9" r="0.6" fill="currentColor" />
      <circle cx="17.2" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.2" cy="9" r="0.6" fill="currentColor" />
    </svg>
  )
};

export default function CatalogFilterBar({
  searchFilters,
  setSearchFilters,
  activeCategory,
  onSelectCategory,
  onResetFilters,
  brands = [],
  allVehicles = [],
  resultsCount = 0,
  sortBy,
  setSortBy,
  isFiltersOpen,
  setIsFiltersOpen
}) {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Local state for mobile collapsible filter drawer if not controlled externally
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const showDrawer = isFiltersOpen !== undefined ? isFiltersOpen : internalIsOpen;
  const toggleDrawer = () => {
    if (setIsFiltersOpen) {
      setIsFiltersOpen(!showDrawer);
    } else {
      setInternalIsOpen(prev => !prev);
    }
  };

  const handleFilterChange = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Compute available models dynamically based on selected brand
  const availableModels = useMemo(() => {
    let pool = allVehicles && allVehicles.length > 0 ? allVehicles : [];
    if (searchFilters.brand && searchFilters.brand !== 'all') {
      pool = pool.filter(c => c.brand.toLowerCase() === searchFilters.brand.toLowerCase());
    }
    const unique = [...new Set(pool.map(c => c.model))];
    return unique.sort();
  }, [searchFilters.brand, allVehicles]);

  // Silhouette pills list
  const SILHOUETTE_PILLS = [
    { id: 'all', label: t('categories.all'), icon: CarSilhouettes.all },
    { id: 'sedan', label: t('categories.sedan'), icon: CarSilhouettes.sedan },
    { id: 'suv', label: t('categories.suv'), icon: CarSilhouettes.suv },
    { id: 'coupe', label: t('categories.coupe'), icon: CarSilhouettes.coupe },
    { id: 'cabriolet', label: t('categories.cabriolet'), icon: CarSilhouettes.cabriolet }
  ];

  // Calculate number of active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchFilters.brand && searchFilters.brand !== 'all') count++;
    if (searchFilters.model && searchFilters.model !== 'all') count++;
    if (searchFilters.maxPrice && searchFilters.maxPrice !== 'any') count++;
    if (searchFilters.wilaya && searchFilters.wilaya !== 'all' && searchFilters.wilaya !== 'Toutes les Wilayas') count++;
    if (searchFilters.condition && searchFilters.condition !== 'all') count++;
    if (searchFilters.keyword && searchFilters.keyword.trim() !== '') count++;
    if (activeCategory && activeCategory !== 'all') count++;
    return count;
  }, [searchFilters, activeCategory]);

  // Active tags to render as dismissible badges
  const activeTags = useMemo(() => {
    const tags = [];
    if (searchFilters.condition && searchFilters.condition !== 'all') {
      tags.push({
        id: 'condition',
        label: searchFilters.condition === 'neuf' ? t('nav.newCars') : t('nav.usedCars'),
        clear: () => handleFilterChange('condition', 'all')
      });
    }
    if (activeCategory && activeCategory !== 'all') {
      tags.push({
        id: 'category',
        label: t(`categories.${activeCategory}`),
        clear: () => onSelectCategory('all')
      });
    }
    if (searchFilters.brand && searchFilters.brand !== 'all') {
      tags.push({
        id: 'brand',
        label: `${t('hero.brand')}: ${searchFilters.brand}`,
        clear: () => {
          handleFilterChange('brand', 'all');
          handleFilterChange('model', 'all');
        }
      });
    }
    if (searchFilters.model && searchFilters.model !== 'all') {
      tags.push({
        id: 'model',
        label: `${t('hero.model')}: ${searchFilters.model}`,
        clear: () => handleFilterChange('model', 'all')
      });
    }
    if (searchFilters.maxPrice && searchFilters.maxPrice !== 'any') {
      tags.push({
        id: 'maxPrice',
        label: `≤ ${searchFilters.maxPrice}M`,
        clear: () => handleFilterChange('maxPrice', 'any')
      });
    }
    if (searchFilters.wilaya && searchFilters.wilaya !== 'all' && searchFilters.wilaya !== 'Toutes les Wilayas') {
      tags.push({
        id: 'wilaya',
        label: searchFilters.wilaya,
        clear: () => handleFilterChange('wilaya', 'all')
      });
    }
    if (searchFilters.keyword && searchFilters.keyword.trim() !== '') {
      tags.push({
        id: 'keyword',
        label: `"${searchFilters.keyword}"`,
        clear: () => handleFilterChange('keyword', '')
      });
    }
    return tags;
  }, [searchFilters, activeCategory, t]);

  return (
    <div className="catalog-filter-console" id="filter-hub">
      {/* ─── 1. TOP ROW: Quick Search Input & Condition Switcher ─── */}
      <div className="filter-console-top">
        {/* Instant Search Bar */}
        <div className="filter-search-input-wrap">
          <Search size={18} className="filter-search-icon" />
          <input
            type="text"
            value={searchFilters.keyword || ''}
            onChange={(e) => handleFilterChange('keyword', e.target.value)}
            placeholder={t('inventory.keywordPlaceholder')}
            className="filter-search-input"
            aria-label={t('inventory.keywordPlaceholder')}
          />
          {searchFilters.keyword && (
            <button
              onClick={() => handleFilterChange('keyword', '')}
              className="filter-search-clear-btn"
              title="Effacer"
              aria-label="Effacer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Condition Switcher Tabs (Tout / Neuf / Occasion) */}
        <div className="filter-condition-tabs">
          {[
            { id: 'all', label: t('hero.allStock') },
            { id: 'neuf', label: t('nav.newCars') },
            { id: 'occasion', label: t('nav.usedCars') }
          ].map(tab => {
            const isActive = searchFilters.condition === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleFilterChange('condition', tab.id)}
                className={`filter-cond-tab-btn ${isActive ? 'active' : ''}`}
              >
                {isActive && <Check size={12} strokeWidth={2.6} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile & Desktop "Filtres Avancés" Toggle Button */}
        <button
          onClick={toggleDrawer}
          className={`filter-expand-toggle-btn ${showDrawer ? 'open' : ''} ${activeFiltersCount > 0 ? 'has-active' : ''}`}
          aria-expanded={showDrawer}
        >
          <SlidersHorizontal size={16} />
          <span className="btn-label">{showDrawer ? t('inventory.hideFilters') : t('inventory.filterBtn')}</span>
          {activeFiltersCount > 0 && (
            <span className="filter-count-badge">{activeFiltersCount}</span>
          )}
          {showDrawer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* ─── 2. SILHOUETTE QUICK CHIPS (Smooth horizontal touch scroll) ─── */}
      <div className="filter-silhouettes-bar">
        <div className="filter-silhouettes-scroll">
          {SILHOUETTE_PILLS.map(pill => {
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => {
                  onSelectCategory(pill.id);
                  handleFilterChange('bodyType', pill.id);
                }}
                className={`filter-silhouette-chip ${isActive ? 'active' : ''}`}
                title={pill.label}
              >
                <span className="silhouette-icon">{pill.icon}</span>
                <span className="silhouette-label">{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 3. EXPANDABLE SELECTOR DRAWER / ACCORDION (Brand, Model, Budget, Wilaya) ─── */}
      <div className={`filter-collapsible-panel ${showDrawer ? 'expanded' : 'collapsed'}`}>
        <div className="filter-selectors-grid">
          {/* Marque */}
          <div className="filter-field-group">
            <label className="filter-field-label">{t('hero.brand')}</label>
            <div className="filter-select-wrapper">
              <select
                value={searchFilters.brand}
                onChange={(e) => {
                  handleFilterChange('brand', e.target.value);
                  handleFilterChange('model', 'all');
                }}
                className="filter-select"
              >
                <option value="all">{t('hero.allBrands')}</option>
                {brands.map(b => {
                  const count = allVehicles && allVehicles.length > 0
                    ? allVehicles.filter(v => v.brand.toLowerCase() === b.name.toLowerCase()).length
                    : (b.count || 0);
                  return (
                    <option key={b.name} value={b.name}>{b.name} ({count})</option>
                  );
                })}
              </select>
              <ChevronDown size={15} className="filter-select-arrow" />
            </div>
          </div>

          {/* Modèle */}
          <div className="filter-field-group">
            <label className="filter-field-label">{t('hero.model')}</label>
            <div className="filter-select-wrapper">
              <select
                value={searchFilters.model || 'all'}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                className="filter-select"
              >
                <option value="all">{t('hero.allModels')}</option>
                {availableModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={15} className="filter-select-arrow" />
            </div>
          </div>

          {/* Budget Max */}
          <div className="filter-field-group">
            <label className="filter-field-label">{t('hero.budget')}</label>
            <div className="filter-select-wrapper">
              <select
                value={searchFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="filter-select"
              >
                <option value="any">{t('hero.anyBudget')}</option>
                <option value="300">≤ 300 Millions (30 000 000 DZD)</option>
                <option value="500">≤ 500 Millions (50 000 000 DZD)</option>
                <option value="800">≤ 800 Millions (80 000 000 DZD)</option>
                <option value="1500">≤ 1 500 Millions</option>
                <option value="10000">&gt; 1 500 Millions (Prestige)</option>
              </select>
              <ChevronDown size={15} className="filter-select-arrow" />
            </div>
          </div>

          {/* Wilaya / Ville */}
          <div className="filter-field-group">
            <label className="filter-field-label">{t('inventory.city')}</label>
            <div className="filter-select-wrapper">
              <select
                value={searchFilters.wilaya}
                onChange={(e) => handleFilterChange('wilaya', e.target.value)}
                className="filter-select"
              >
                <option value="all">{t('inventory.allCities')}</option>
                {WILAYAS.filter(w => w !== 'Toutes les Wilayas').map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <ChevronDown size={15} className="filter-select-arrow" />
            </div>
          </div>
        </div>

        {/* Drawer Action Bar */}
        <div className="filter-drawer-actions">
          <button
            onClick={onResetFilters}
            className="filter-reset-action-btn"
          >
            <RotateCcw size={14} />
            <span>{t('inventory.resetAll')}</span>
          </button>

          <button
            onClick={() => {
              if (setIsFiltersOpen) setIsFiltersOpen(false);
              else setInternalIsOpen(false);
            }}
            className="filter-apply-btn"
          >
            <Check size={16} />
            <span>Afficher les {resultsCount} résultats</span>
          </button>
        </div>
      </div>

      {/* ─── 4. ACTIVE FILTER TAGS ROW ─── */}
      {activeTags.length > 0 && (
        <div className="filter-active-tags-strip">
          <span className="active-tags-label">{t('inventory.activeFiltersTitle')}</span>
          <div className="active-tags-list">
            {activeTags.map(tag => (
              <button
                key={tag.id}
                onClick={tag.clear}
                className="active-tag-chip"
                title={`Supprimer le filtre ${tag.label}`}
              >
                <span>{tag.label}</span>
                <X size={12} className="tag-x-icon" />
              </button>
            ))}
            <button
              onClick={onResetFilters}
              className="active-tags-clear-all"
            >
              {t('inventory.clearFilters')}
            </button>
          </div>
        </div>
      )}

      {/* ─── 5. META STATUS & SORT BAR ─── */}
      <div className="filter-meta-bar">
        {/* Results Counter */}
        <div className="filter-results-counter">
          <Sparkles size={15} color="#FF6B00" />
          <span>
            <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>{resultsCount}</strong>{' '}
            {resultsCount <= 1 ? 'véhicule disponible' : 'véhicules disponibles'}
          </span>
        </div>

        {/* Sort Selector */}
        <div className="filter-sort-selector-wrap">
          <ArrowUpDown size={14} color="#FF6B00" />
          <span className="sort-label">{t('inventory.sortBy')}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy && setSortBy(e.target.value)}
            className="filter-sort-select"
          >
            <option value="featured">⭐ {t('inventory.featured')}</option>
            <option value="price-asc">{t('inventory.priceAsc')}</option>
            <option value="price-desc">{t('inventory.priceDesc')}</option>
            <option value="year-desc">{t('inventory.yearDesc')}</option>
            <option value="km-asc">{t('inventory.mileageAsc')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
