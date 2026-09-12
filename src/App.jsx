import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import PopularBrands from './components/PopularBrands';
import VehicleList from './components/VehicleList';
import ShowroomsSection from './components/ShowroomsSection';
import AutoProducts from './components/AutoProducts';
import WhyChooseUs from './components/WhyChooseUs';
import ComparisonModal from './components/ComparisonModal';
import VehicleDetailModal from './components/VehicleDetailModal';
import AddVehicleModal from './components/AddVehicleModal';
import TradeInModal from './components/TradeInModal';
import LoginModal from './components/LoginModal';
import FAQModal from './components/FAQModal';
import LoanCalculatorModal from './components/LoanCalculatorModal';
import ContactModal from './components/ContactModal';
import AboutModal from './components/AboutModal';
import AdminDashboard from './components/AdminDashboard';
import FavoritesDrawer from './components/FavoritesDrawer';
import ProformaModal from './components/ProformaModal';
import ImageLightboxModal from './components/ImageLightboxModal';
import Footer from './components/Footer';
import { INITIAL_VEHICLES, POPULAR_BRANDS, INITIAL_ORDERS } from './data/mockData';

export default function App() {
  // Currency: 'M' (Millions de Centimes), 'DZD' (Dinars), 'EUR' (Euros)
  const [currency, setCurrency] = useState('M');

  // Vehicles dataset (persisted to localStorage so added/edited cars never disappear on refresh)
  const [vehicles, setVehicles] = useState(() => {
    try {
      const saved = localStorage.getItem('auto_showroom_vehicles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load vehicles from localStorage', e);
    }
    return INITIAL_VEHICLES;
  });

  // Search and filter criteria
  const [searchFilters, setSearchFilters] = useState({
    brand: 'all',
    model: 'all',
    wilaya: 'all',
    showroom: 'all',
    bodyType: 'all',
    condition: 'all', // 'all', 'neuf', 'occasion'
    maxPrice: 'any',
    keyword: ''
  });

  // Active Category pill in inventory
  const [activeCategory, setActiveCategory] = useState('all');

  // Compared vehicles (max 3)
  const [comparedCars, setComparedCars] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Selected vehicle for detail modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Proforma & Lightbox states
  const [selectedProformaCar, setSelectedProformaCar] = useState(null);
  const [selectedLightboxCar, setSelectedLightboxCar] = useState(null);

  // Favorites / My Dream Garage state (persisted with URL share support)
  const [favorites, setFavorites] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const garageParam = params.get('garage');
      if (garageParam) {
        const ids = garageParam.split(',').map(Number);
        const fromUrl = INITIAL_VEHICLES.filter(v => ids.includes(v.id));
        if (fromUrl.length > 0) return fromUrl;
      }
      const saved = localStorage.getItem('auto_showroom_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Orders & Customer inquiries dataset (persisted to localStorage)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('auto_showroom_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_ORDERS;
  });

  // Admin authentication and view state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('auto_admin_logged') === 'true';
  });
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Modals state
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isLoanCalculatorOpen, setIsLoanCalculatorOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Save vehicles to localStorage whenever catalog changes
  useEffect(() => {
    try {
      localStorage.setItem('auto_showroom_vehicles', JSON.stringify(vehicles));
    } catch (e) {
      console.warn('Failed to save vehicles to localStorage', e);
    }
  }, [vehicles]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('auto_showroom_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('auto_showroom_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  // Section reveal: IntersectionObserver adds .revealed to .reveal-section elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Filtered vehicles logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(car => {
      // Condition filter
      if (searchFilters.condition !== 'all' && car.condition !== searchFilters.condition) {
        return false;
      }

      // Brand filter
      if (searchFilters.brand !== 'all' && car.brand.toLowerCase() !== searchFilters.brand.toLowerCase()) {
        return false;
      }

      // Model filter
      if (searchFilters.model && searchFilters.model !== 'all') {
        const query = searchFilters.model.toLowerCase().trim();
        const matchesModel = car.model.toLowerCase().includes(query) || car.title.toLowerCase().includes(query);
        if (!matchesModel) return false;
      }

      // Wilaya filter
      if (searchFilters.wilaya !== 'all' && car.wilaya !== searchFilters.wilaya) {
        return false;
      }

      // Showroom filter
      if (searchFilters.showroom && searchFilters.showroom !== 'all' && car.showroom.toLowerCase() !== searchFilters.showroom.toLowerCase()) {
        return false;
      }

      // Body type / Category filter
      const effectiveCategory = activeCategory !== 'all' ? activeCategory : searchFilters.bodyType;
      if (effectiveCategory !== 'all' && car.bodyType !== effectiveCategory) {
        return false;
      }

      // Max price in Millions
      if (searchFilters.maxPrice !== 'any') {
        const maxM = parseFloat(searchFilters.maxPrice);
        if (car.priceMillions > maxM) {
          return false;
        }
      }

      return true;
    });
  }, [vehicles, searchFilters, activeCategory]);

  // Comparison Handlers
  const handleToggleCompare = (car) => {
    setComparedCars(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) {
        return prev.filter(c => c.id !== car.id);
      } else {
        if (prev.length >= 3) {
          alert('Vous pouvez comparer un maximum de 3 véhicules simultanément.');
          return prev;
        }
        return [...prev, car];
      }
    });
  };

  const handleRemoveFromCompare = (carId) => {
    setComparedCars(prev => prev.filter(c => c.id !== carId));
  };

  const handleClearCompare = () => {
    setComparedCars([]);
    setIsComparisonOpen(false);
  };

  // Favorites Handlers
  const handleToggleFavorite = (car) => {
    setFavorites(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) {
        return prev.filter(c => c.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const handleRemoveFavorite = (carId) => {
    setFavorites(prev => prev.filter(c => c.id !== carId));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  // Add vehicle to catalog
  const handleAddVehicle = (newCar) => {
    setVehicles(prev => [newCar, ...prev]);
    scrollToSection('inventory');
  };

  // Edit existing vehicle
  const handleEditVehicle = (updatedCar) => {
    setVehicles(prev => prev.map(c => c.id === updatedCar.id ? updatedCar : c));
  };

  // Delete vehicle
  const handleDeleteVehicle = (carId) => {
    setVehicles(prev => prev.filter(c => c.id !== carId));
    setComparedCars(prev => prev.filter(c => c.id !== carId));
    if (selectedCar && selectedCar.id === carId) {
      setSelectedCar(null);
    }
  };

  // Toggle featured status
  const handleToggleFeatured = (carId) => {
    setVehicles(prev => prev.map(c => c.id === carId ? { ...c, featured: !c.featured } : c));
  };

  // Order Handlers
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleAddOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  // Authentication Handlers
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('auto_admin_logged', 'true');
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('auto_admin_logged');
    setIsAdminDashboardOpen(false);
  };

  // Navigation and Filter helpers
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchFilters({
      brand: 'all',
      model: 'all',
      wilaya: 'all',
      showroom: 'all',
      bodyType: 'all',
      condition: 'all',
      maxPrice: 'any',
      keyword: ''
    });
    setActiveCategory('all');
  };

  const handleSelectBrand = (brandName) => {
    setSearchFilters({ 
      brand: brandName,
      model: 'all',
      wilaya: 'all',
      showroom: 'all',
      bodyType: 'all',
      condition: 'all',
      maxPrice: 'any',
      keyword: ''
    });
    setActiveCategory('all');
    scrollToSection('inventory');
  };

  const handleSelectShowroom = (showroomName) => {
    setSearchFilters({
      brand: 'all',
      model: 'all',
      wilaya: 'all',
      showroom: showroomName,
      bodyType: 'all',
      condition: 'all',
      maxPrice: 'any',
      keyword: ''
    });
    setActiveCategory('all');
    scrollToSection('inventory');
  };

  // If Admin Dashboard is open, render dedicated admin view
  if (isAdminDashboardOpen) {
    return (
      <AdminDashboard
        vehicles={vehicles}
        orders={orders}
        onAddVehicle={handleAddVehicle}
        onEditVehicle={handleEditVehicle}
        onDeleteVehicle={handleDeleteVehicle}
        onToggleFeatured={handleToggleFeatured}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onAddOrder={handleAddOrder}
        onLogout={handleLogout}
        onClose={() => setIsAdminDashboardOpen(false)}
      />
    );
  }

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#090D16', color: '#F8FAFC' }}>
      {/* Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        comparisonCount={comparedCars.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onSelectCondition={(cond) => setSearchFilters(prev => ({ ...prev, condition: cond }))}
        onScrollToSection={scrollToSection}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
        onOpenFAQ={() => setIsFAQOpen(true)}
        onOpenLoanCalculator={() => setIsLoanCalculatorOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        pendingOrdersCount={orders.filter(o => o.status === 'nouveau').length}
        onLogout={handleLogout}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main style={{ flexGrow: 1 }}>
        {/* Hero & Search Engine */}
        <HeroSearch
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
          onSearch={() => scrollToSection('inventory')}
          onResetFilters={handleResetFilters}
          brands={POPULAR_BRANDS}
          resultsCount={filteredVehicles.length}
          allVehicles={vehicles}
        />

        {/* Popular Brands — reveal on scroll */}
        <div className="reveal-section" style={{ transitionDelay: '0ms' }}>
          <PopularBrands
            vehicles={vehicles}
            onSelectBrand={handleSelectBrand}
            activeBrand={searchFilters.brand}
          />
        </div>

        {/* Vehicle Inventory Grid */}
        <VehicleList
          vehicles={filteredVehicles}
          currency={currency}
          comparedCars={comparedCars}
          onToggleCompare={handleToggleCompare}
          onViewDetails={(car) => setSelectedCar(car)}
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            setSearchFilters(prev => ({ ...prev, bodyType: catId }));
          }}
          onResetFilters={handleResetFilters}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onRequestProforma={(car) => setSelectedProformaCar(car)}
          onOpenLightbox={(car) => setSelectedLightboxCar(car)}
        />

        {/* Showrooms — reveal on scroll */}
        <div className="reveal-section" style={{ transitionDelay: '60ms' }}>
          <ShowroomsSection
            vehicles={vehicles}
            onSelectShowroom={handleSelectShowroom}
          />
        </div>

        {/* Auto Products — reveal on scroll */}
        <div className="reveal-section" style={{ transitionDelay: '120ms' }}>
          <AutoProducts />
        </div>

        {/* Why Choose Us — reveal on scroll */}
        <div className="reveal-section" style={{ transitionDelay: '180ms' }}>
          <WhyChooseUs totalVehicles={vehicles.length} />
        </div>
      </main>

      {/* Comparison Drawer & Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        comparedCars={comparedCars}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        currency={currency}
      />

      {/* Vehicle Full Specs Modal */}
      <VehicleDetailModal
        car={selectedCar}
        isOpen={Boolean(selectedCar)}
        onClose={() => setSelectedCar(null)}
        currency={currency}
        isFavorite={selectedCar && favorites.some(f => f.id === selectedCar.id)}
        onToggleFavorite={handleToggleFavorite}
        onRequestProforma={(car) => setSelectedProformaCar(car)}
        onOpenLightbox={(car) => setSelectedLightboxCar(car)}
      />

      {/* My Dream Garage (Favorites Drawer) */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearFavorites={handleClearFavorites}
        onSelectCar={(car) => setSelectedCar(car)}
        onRequestProforma={(car) => setSelectedProformaCar(car)}
        onExploreStock={() => scrollToSection('inventory')}
      />

      {/* Proforma Invoice & Quotation Generator Modal */}
      <ProformaModal
        isOpen={Boolean(selectedProformaCar)}
        onClose={() => setSelectedProformaCar(null)}
        vehicle={selectedProformaCar}
        onAddOrder={handleAddOrder}
      />

      {/* 360° Luxury Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={Boolean(selectedLightboxCar)}
        onClose={() => setSelectedLightboxCar(null)}
        vehicle={selectedLightboxCar}
      />

      {/* Trade-In / Appraisal Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
      />

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      {/* Dealer Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* FAQ Modal */}
      <FAQModal
        isOpen={isFAQOpen}
        onClose={() => setIsFAQOpen(false)}
      />

      {/* Loan / Credit Calculator Modal */}
      <LoanCalculatorModal
        isOpen={isLoanCalculatorOpen}
        onClose={() => setIsLoanCalculatorOpen(false)}
      />

      {/* Contact Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* About Us & Team Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onSelectWilaya={(w) => setSearchFilters(prev => ({ ...prev, wilaya: w }))}
      />
    </div>
  );
}
