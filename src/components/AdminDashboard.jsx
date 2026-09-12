import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  ShoppingBag, 
  Store, 
  LogOut, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Star, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Coins, 
  Building, 
  X, 
  Image as ImageIcon, 
  ShieldCheck, 
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { POPULAR_BRANDS, SHOWROOMS, WILAYAS, BODY_TYPES, ORDER_STATUSES } from '../data/mockData';
import Logo from './Logo';

export default function AdminDashboard({
  vehicles = [],
  orders = [],
  onAddVehicle,
  onEditVehicle,
  onDeleteVehicle,
  onToggleFeatured,
  onUpdateOrderStatus,
  onDeleteOrder,
  onAddOrder,
  onLogout,
  onClose
}) {
  // Current active admin tab: 'overview' | 'vehicles' | 'orders' | 'showrooms'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & filter states for vehicles
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleBrandFilter, setVehicleBrandFilter] = useState('all');
  const [vehicleShowroomFilter, setVehicleShowroomFilter] = useState('all');
  const [vehicleConditionFilter, setVehicleConditionFilter] = useState('all');

  // Search & filter states for orders
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Modals inside dashboard
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null); // null = add, obj = edit
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Vehicle Form State
  const initialVehicleForm = {
    title: '',
    brand: 'BMW',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    condition: 'neuf',
    bodyType: 'sedan',
    priceMillions: 1200,
    priceDZD: 12000000,
    fuel: 'Essence',
    transmission: 'Automatique',
    drivetrain: 'AWD / 4x4',
    engine: '',
    papers: 'Carte Grise (00 km)',
    color: '',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: false,
    inspectionScore: 100,
    images: ['/cars/bmw_m4_competition.jpg'],
    features: ['Phares LED matriciels', 'Intérieur Cuir Nappa', 'Caméra 360°', 'Toit panoramique']
  };

  const [vehicleFormData, setVehicleFormData] = useState(initialVehicleForm);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Manual Order Form State
  const initialOrderForm = {
    clientName: '',
    phone: '',
    wilaya: 'Alger (16)',
    vehicleTitle: '',
    showroom: 'Showroom Auto Prestige',
    type: 'Réservation Immédiate',
    budget: '',
    status: 'nouveau',
    message: ''
  };
  const [orderFormData, setOrderFormData] = useState(initialOrderForm);

  // ==================== METRICS & KPIS ====================
  const totalStockCount = vehicles.length;
  const totalInventoryValuationMillions = useMemo(() => {
    return vehicles.reduce((sum, v) => sum + (Number(v.priceMillions) || 0), 0);
  }, [vehicles]);

  const totalOrdersCount = orders.length;
  const newOrdersCount = useMemo(() => {
    return orders.filter(o => o.status === 'nouveau').length;
  }, [orders]);

  // ==================== FILTERED LISTS ====================
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (vehicleBrandFilter !== 'all' && v.brand.toLowerCase() !== vehicleBrandFilter.toLowerCase()) return false;
      if (vehicleShowroomFilter !== 'all' && v.showroom.toLowerCase() !== vehicleShowroomFilter.toLowerCase()) return false;
      if (vehicleConditionFilter !== 'all' && v.condition !== vehicleConditionFilter) return false;
      if (vehicleSearch.trim()) {
        const q = vehicleSearch.toLowerCase();
        const matches = v.title.toLowerCase().includes(q) || 
                        v.brand.toLowerCase().includes(q) || 
                        v.model.toLowerCase().includes(q) ||
                        v.showroom.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [vehicles, vehicleBrandFilter, vehicleShowroomFilter, vehicleConditionFilter, vehicleSearch]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        const matches = o.clientName.toLowerCase().includes(q) || 
                        o.phone.toLowerCase().includes(q) || 
                        o.vehicleTitle.toLowerCase().includes(q) ||
                        o.wilaya.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // ==================== HANDLERS: VEHICLE CRUD ====================
  const handleOpenAddVehicle = () => {
    setEditingVehicle(null);
    setVehicleFormData(initialVehicleForm);
    setIsVehicleModalOpen(true);
  };

  const handleOpenEditVehicle = (car) => {
    setEditingVehicle(car);
    setVehicleFormData({
      ...car,
      images: car.images && car.images.length > 0 ? car.images : ['/cars/bmw_m4_competition.jpg'],
      features: car.features || []
    });
    setIsVehicleModalOpen(true);
  };

  const handlePriceMillionsChange = (val) => {
    const num = parseFloat(val) || 0;
    setVehicleFormData(prev => ({
      ...prev,
      priceMillions: num,
      priceDZD: num * 10000
    }));
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setVehicleFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeatureInput.trim()]
      }));
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setVehicleFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    if (editingVehicle) {
      onEditVehicle({
        ...editingVehicle,
        ...vehicleFormData,
        id: editingVehicle.id
      });
    } else {
      const newCar = {
        ...vehicleFormData,
        id: Date.now(),
        images: vehicleFormData.images.length > 0 ? vehicleFormData.images : ['/cars/bmw_m4_competition.jpg']
      };
      onAddVehicle(newCar);
    }
    setIsVehicleModalOpen(false);
  };

  const handleDeleteVehicleConfirm = (car) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le deal "${car.title}" du catalogue ?`)) {
      onDeleteVehicle(car.id);
    }
  };

  // ==================== HANDLERS: ORDER CRUD ====================
  const handleSaveOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      ...orderFormData,
      id: `CMD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    onAddOrder(newOrder);
    setIsOrderModalOpen(false);
    setOrderFormData(initialOrderForm);
  };

  const handleDeleteOrderConfirm = (order) => {
    if (window.confirm(`Supprimer la demande de ${order.clientName} (${order.id}) ?`)) {
      onDeleteOrder(order.id);
    }
  };

  // Available local preset images
  const PRESET_CAR_IMAGES = [
    { label: 'BMW M4 Competition (Jaune)', url: '/cars/bmw_m4_competition.jpg' },
    { label: 'BMW X6 M (Noir)', url: '/cars/bmw_x6_m.jpg' },
    { label: 'BMW Série 5 (Bleu)', url: '/cars/bmw_serie_5.jpg' },
    { label: 'Audi RS6 Avant (Gris Nardo)', url: '/cars/audi_rs6_avant.jpg' },
    { label: 'Audi A8 Limousine (Noir)', url: '/cars/audi_a8_limousine.jpg' },
    { label: 'Audi Q8 S-Line (Blanc)', url: '/cars/audi_q8_sline.jpg' },
    { label: 'Audi A4 Berline (Bleu)', url: '/cars/audi_a4_berline.jpg' },
    { label: 'Mercedes G63 AMG (Noir Mat)', url: '/cars/mercedes_g63_amg.jpg' },
    { label: 'Mercedes S-Coupé (Argent)', url: '/cars/mercedes_s_coupe.jpg' },
    { label: 'Mercedes C200 (Blanc)', url: '/cars/mercedes_c200.jpg' },
    { label: 'Porsche 911 GT3 RS (Craie)', url: '/cars/porsche_911_gt3_rs.jpg' },
    { label: 'Porsche Macan GTS (Noir)', url: '/cars/porsche_macan_gts.jpg' },
    { label: 'Porsche Cayenne Turbo GT', url: '/cars/porsche_cayenne_turbo_gt.jpg' },
    { label: 'VW Golf 8 R (Bleu)', url: '/cars/volkswagen_golf_8_r.jpg' },
    { label: 'VW Touareg R-Line (Noir)', url: '/cars/volkswagen_touareg_rline.jpg' },
    { label: 'Range Rover Autobiography', url: '/cars/range_rover_autobiography.jpg' },
    { label: 'Range Rover Sport', url: '/cars/range_rover_sport.jpg' },
    { label: 'Jetour T2 Traveler (Gris)', url: '/cars/jetour_t2.jpg' },
    { label: 'Jetour Dashing (Bleu)', url: '/cars/jetour_dashing.jpg' },
    { label: 'Ferrari F8 Tributo (Rouge)', url: '/cars/ferrari_f8_tributo.jpg' },
    { label: 'Ferrari Roma (Gris)', url: '/cars/ferrari_roma.jpg' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080C14',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* ==================== TOP NAVIGATION BAR ==================== */}
      <header style={{
        background: '#0B0F19',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand & Mode Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Logo size="small" subtitle="ESPACE GESTION CONCESSIONNAIRE" />
          <div style={{
            background: 'rgba(255, 107, 0, 0.15)',
            border: '1px solid rgba(255, 107, 0, 0.4)',
            color: '#FF6B00',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: '6px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            Administration Active
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#CBD5E1',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
          >
            <Eye size={15} color="#FBBF24" />
            <span>Voir le site public</span>
          </button>

          <button
            onClick={onLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#F87171',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
          >
            <LogOut size={15} />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      {/* ==================== DASHBOARD BODY & TABS ==================== */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '240px',
          background: '#0B0F19',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flexShrink: 0
        }}>
          {[
            { id: 'overview', label: "Vue d'ensemble", icon: <LayoutDashboard size={18} /> },
            { id: 'vehicles', label: 'Stock & Deals', icon: <Car size={18} />, count: totalStockCount },
            { id: 'orders', label: 'Commandes & Leads', icon: <ShoppingBag size={18} />, count: newOrdersCount, highlightCount: true },
            { id: 'showrooms', label: 'Réseau Showrooms', icon: <Store size={18} />, count: SHOWROOMS.length }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'linear-gradient(90deg, rgba(255, 107, 0, 0.22) 0%, rgba(255, 107, 0, 0.05) 100%)' : 'transparent',
                  color: isActive ? '#FF6B00' : '#94A3B8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  borderLeft: isActive ? '3px solid #FF6B00' : '3px solid transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: tab.highlightCount && tab.count > 0 ? '#FF6B00' : 'rgba(255, 255, 255, 0.08)',
                    color: tab.highlightCount && tab.count > 0 ? '#FFFFFF' : '#94A3B8'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ marginTop: 'auto', padding: '16px 12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '4px' }}>Connecté en tant que :</div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>Directeur Général</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              Serveur Actif
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main style={{ flexGrow: 1, padding: '32px', overflowY: 'auto' }}>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: '6px' }}>
                  Tableau de Bord & Métriques Showroom
                </h1>
                <p style={{ color: '#94A3B8', fontSize: '0.94rem' }}>
                  Surveillez les performances de votre stock, les nouveaux leads clients et l'activité commerciale en temps réel.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '36px'
              }}>
                {/* KPI 1: Total Stock */}
                <div style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', marginBottom: '6px' }}>
                      Véhicules en Stock
                    </div>
                    <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF' }}>
                      {totalStockCount}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#10B981', marginTop: '4px' }}>
                      100% Papiers & Cartes Grises Vérifiés
                    </div>
                  </div>
                  <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '14px', borderRadius: '14px', color: '#3B82F6' }}>
                    <Car size={26} />
                  </div>
                </div>

                {/* KPI 2: Total Valuation */}
                <div style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', marginBottom: '6px' }}>
                      Valorisation du Parc
                    </div>
                    <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#FBBF24' }}>
                      {totalInventoryValuationMillions.toLocaleString('fr-FR')} M
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      ~ {(totalInventoryValuationMillions * 10000).toLocaleString('fr-FR')} DZD
                    </div>
                  </div>
                  <div style={{ background: 'rgba(251, 191, 36, 0.15)', padding: '14px', borderRadius: '14px', color: '#FBBF24' }}>
                    <Coins size={26} />
                  </div>
                </div>

                {/* KPI 3: Orders / Leads */}
                <div style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', marginBottom: '6px' }}>
                      Demandes & Commandes
                    </div>
                    <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF' }}>
                      {totalOrdersCount}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#FF6B00', fontWeight: 700, marginTop: '4px' }}>
                      {newOrdersCount} nouveau(x) lead(s) à traiter
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 107, 0, 0.15)', padding: '14px', borderRadius: '14px', color: '#FF6B00' }}>
                    <ShoppingBag size={26} />
                  </div>
                </div>

                {/* KPI 4: Partner Showrooms */}
                <div style={{
                  background: '#0F172A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', marginBottom: '6px' }}>
                      Showrooms Partenaires
                    </div>
                    <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF' }}>
                      {SHOWROOMS.length}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#10B981', marginTop: '4px' }}>
                      Alger, Oran, Annaba, Blida
                    </div>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '14px', borderRadius: '14px', color: '#10B981' }}>
                    <Building size={26} />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
                {/* Recent Orders Box */}
                <div style={{ background: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                      Dernières Demandes Clients
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      style={{ background: 'none', border: 'none', color: '#FF6B00', fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Voir tout ({totalOrdersCount}) →
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {orders.slice(0, 4).map(o => (
                      <div key={o.id} style={{
                        padding: '14px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.92rem' }}>{o.clientName}</span>
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>• {o.wilaya}</span>
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#FBBF24', fontWeight: 600 }}>{o.vehicleTitle}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>{o.type} ({o.date})</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: o.status === 'nouveau' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            color: o.status === 'nouveau' ? '#60A5FA' : '#34D399'
                          }}>
                            {o.status.toUpperCase()}
                          </span>
                          <a
                            href={`https://wa.me/213${o.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: '#10B981',
                              color: '#fff',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Management Shortcuts */}
                <div style={{ background: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                      Actions Rapides du Showroom
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '20px' }}>
                      Ajoutez un nouveau deal disponible en parc ou enregistrez un lead reçu directement au showroom.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button
                        onClick={handleOpenAddVehicle}
                        style={{
                          background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)',
                          border: 'none',
                          color: '#FFFFFF',
                          padding: '14px',
                          borderRadius: '12px',
                          fontSize: '0.94rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 8px 20px rgba(255, 107, 0, 0.3)'
                        }}
                      >
                        <Plus size={18} />
                        <span>Publier un Nouveau Deal Véhicule</span>
                      </button>

                      <button
                        onClick={() => setIsOrderModalOpen(true)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '14px',
                          borderRadius: '12px',
                          fontSize: '0.94rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <ShoppingBag size={18} color="#FBBF24" />
                        <span>Enregistrer un Lead Client Manuel (Visite / Appel)</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 700, fontSize: '0.88rem' }}>
                      <ShieldCheck size={18} />
                      <span>Intégrité des Données Garantie</span>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '4px' }}>
                      Toute modification ou suppression effectuée ici se répercute instantanément sur le site client et les compteurs de marques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: STOCK & DEALS (CRUD) ==================== */}
          {activeTab === 'vehicles' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                    Gestion du Stock & Deals Showroom ({filteredVehicles.length})
                  </h1>
                  <p style={{ color: '#94A3B8', fontSize: '0.92rem' }}>
                    Créez, modifiez, ajustez les prix ou supprimez des véhicules en temps réel.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddVehicle}
                  style={{
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(255, 107, 0, 0.3)'
                  }}
                >
                  <Plus size={18} />
                  <span>Nouveau Deal Véhicule</span>
                </button>
              </div>

              {/* Filter Controls Bar */}
              <div style={{
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Rechercher modèle, titre..."
                    value={vehicleSearch}
                    onChange={(e) => setVehicleSearch(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(9, 13, 22, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '9px 12px 9px 36px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Marque Filter */}
                <select
                  value={vehicleBrandFilter}
                  onChange={(e) => setVehicleBrandFilter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(9, 13, 22, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">Toutes Marques</option>
                  {POPULAR_BRANDS.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>

                {/* Showroom Filter */}
                <select
                  value={vehicleShowroomFilter}
                  onChange={(e) => setVehicleShowroomFilter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(9, 13, 22, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">Tous les Showrooms</option>
                  {SHOWROOMS.map(sr => (
                    <option key={sr.id} value={sr.name}>{sr.name}</option>
                  ))}
                </select>

                {/* Condition Filter */}
                <select
                  value={vehicleConditionFilter}
                  onChange={(e) => setVehicleConditionFilter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(9, 13, 22, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">Tous États</option>
                  <option value="neuf">00 km - Neuf</option>
                  <option value="occasion">Occasions Récentes</option>
                </select>
              </div>

              {/* Vehicles Table */}
              <div style={{
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94A3B8' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Véhicule / Photo</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Marque & Modèle</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Prix (M & DZD)</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Année & Km</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Papiers</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Showroom</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'center' }}>En vedette</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicles.map(car => (
                      <tr 
                        key={car.id} 
                        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        {/* Image & Title */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={car.images && car.images[0] ? car.images[0] : '/cars/bmw_m4_competition.jpg'}
                              alt={car.title}
                              style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: '#FFFFFF', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {car.title}
                              </div>
                              <div style={{ fontSize: '0.74rem', color: car.condition === 'neuf' ? '#10B981' : '#38BDF8', fontWeight: 600 }}>
                                {car.condition === 'neuf' ? '⚡ 00 km Neuf' : 'Occasion Récente'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Brand & Model */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{car.brand}</div>
                          <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{car.model}</div>
                        </td>

                        {/* Price */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 800, color: '#FBBF24', fontSize: '0.94rem' }}>
                            {car.priceMillions.toLocaleString('fr-FR')} M
                          </div>
                          <div style={{ color: '#64748B', fontSize: '0.75rem' }}>
                            {car.priceDZD.toLocaleString('fr-FR')} DZD
                          </div>
                        </td>

                        {/* Year & Mileage */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{car.year}</div>
                          <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
                            {car.mileage === 0 ? '0 km (Neuf)' : `${car.mileage.toLocaleString('fr-FR')} km`}
                          </div>
                        </td>

                        {/* Papers */}
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            padding: '3px 8px',
                            background: 'rgba(16, 185, 129, 0.12)',
                            color: '#10B981',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}>
                            {car.papers}
                          </span>
                        </td>

                        {/* Showroom */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ color: '#CBD5E1', fontSize: '0.82rem' }}>{car.showroom}</div>
                          <div style={{ color: '#64748B', fontSize: '0.74rem' }}>{car.wilaya}</div>
                        </td>

                        {/* Featured Toggle */}
                        <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                          <button
                            onClick={() => onToggleFeatured(car.id)}
                            style={{
                              background: car.featured ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                              border: car.featured ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              padding: '6px 8px',
                              cursor: 'pointer',
                              color: car.featured ? '#FBBF24' : '#64748B'
                            }}
                            title={car.featured ? "Retirer des coups de cœur" : "Mettre en coup de cœur"}
                          >
                            <Star size={16} fill={car.featured ? '#FBBF24' : 'none'} />
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEditVehicle(car)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#38BDF8',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.78rem',
                                fontWeight: 600
                              }}
                            >
                              <Edit size={14} />
                              <span>Modifier</span>
                            </button>

                            <button
                              onClick={() => handleDeleteVehicleConfirm(car)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                color: '#F87171',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.78rem',
                                fontWeight: 600
                              }}
                            >
                              <Trash2 size={14} />
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: ORDERS & LEADS ==================== */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                    Commandes & Demandes Clients ({filteredOrders.length})
                  </h1>
                  <p style={{ color: '#94A3B8', fontSize: '0.92rem' }}>
                    Gérez les réservations de véhicules, demandes d'essais et offres de reprise.
                  </p>
                </div>

                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(255, 107, 0, 0.3)'
                  }}
                >
                  <Plus size={18} />
                  <span>Enregistrer un Lead Manuel</span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {ORDER_STATUSES.map(st => {
                  const isActive = orderStatusFilter === st.id;
                  const count = st.id === 'all' 
                    ? orders.length 
                    : orders.filter(o => o.status === st.id).length;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setOrderStatusFilter(st.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: isActive ? '#1E293B' : '#0F172A',
                        border: isActive ? `1.5px solid ${st.color || '#FF6B00'}` : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        fontSize: '0.84rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{st.label}</span>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Orders Grid Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
                {filteredOrders.map(order => {
                  const statusObj = ORDER_STATUSES.find(s => s.id === order.status) || ORDER_STATUSES[1];
                  const whatsappMsg = encodeURIComponent(
                    `Bonjour ${order.clientName}, nous avons bien reçu votre demande (${order.type}) pour le véhicule : ${order.vehicleTitle}. Le véhicule est disponible au ${order.showroom}. Souhaitez-vous convenir d'un rendez-vous pour un essai ?`
                  );

                  return (
                    <div key={order.id} style={{
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}>
                      <div>
                        {/* Header: ID, Date & Status */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#FF6B00', background: 'rgba(255, 107, 0, 0.12)', padding: '3px 8px', borderRadius: '6px' }}>
                            {order.id}
                          </span>
                          <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                            {order.date}
                          </span>
                        </div>

                        {/* Client Info */}
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
                            {order.clientName}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                            📍 {order.wilaya} • 📞 <strong style={{ color: '#FFFFFF' }}>{order.phone}</strong>
                          </div>
                        </div>

                        {/* Vehicle & Request Type */}
                        <div style={{
                          padding: '10px 12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          marginBottom: '10px'
                        }}>
                          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                            {order.type}
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FBBF24', marginTop: '2px' }}>
                            {order.vehicleTitle}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '2px' }}>
                            Budget / Offre : <strong>{order.budget || 'Non spécifié'}</strong>
                          </div>
                        </div>

                        {/* Client Message */}
                        {order.message && (
                          <div style={{ fontSize: '0.82rem', color: '#94A3B8', fontStyle: 'italic', background: 'rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #3B82F6' }}>
                            "{order.message}"
                          </div>
                        )}
                      </div>

                      {/* Footer Actions & Status Selector */}
                      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Status Select */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Statut :</span>
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                            style={{
                              background: statusObj.bg || '#1E293B',
                              color: statusObj.color || '#FFFFFF',
                              border: `1px solid ${statusObj.color || 'rgba(255, 255, 255, 0.2)'}`,
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="nouveau" style={{ background: '#0F172A', color: '#60A5FA' }}>Nouveau</option>
                            <option value="en_cours" style={{ background: '#0F172A', color: '#FBBF24' }}>En Traitement</option>
                            <option value="contacte" style={{ background: '#0F172A', color: '#C084FC' }}>Contacté</option>
                            <option value="valide" style={{ background: '#0F172A', color: '#34D399' }}>Validé / Conclu</option>
                            <option value="annule" style={{ background: '#0F172A', color: '#F87171' }}>Annulé</option>
                          </select>
                        </div>

                        {/* Contact Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <a
                            href={`https://wa.me/213${order.phone.replace(/\D/g, '')}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: '#10B981',
                              color: '#FFFFFF',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${order.phone}`}
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              color: '#CBD5E1',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center'
                            }}
                            title="Appeler"
                          >
                            <Phone size={14} />
                          </a>

                          <button
                            onClick={() => handleDeleteOrderConfirm(order)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: 'none',
                              color: '#F87171',
                              padding: '6px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                            title="Supprimer la demande"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== TAB 4: SHOWROOMS ==================== */}
          {activeTab === 'showrooms' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                  Réseau des Showrooms Agréés ({SHOWROOMS.length})
                </h1>
                <p style={{ color: '#94A3B8', fontSize: '0.92rem' }}>
                  Visualisez les concessions partenaires, leurs contacts directs et le stock réel affecté.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {SHOWROOMS.map(sr => {
                  const stockInShowroom = vehicles.filter(v => v.showroom.toLowerCase() === sr.name.toLowerCase());
                  return (
                    <div key={sr.id} style={{
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ height: '160px', position: 'relative' }}>
                        <img src={sr.image} alt={sr.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#FBBF24'
                        }}>
                          ⭐ {sr.rating} / 5
                        </div>
                      </div>

                      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                            {sr.name}
                          </div>
                          <div style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '12px' }}>
                            📍 {sr.address} ({sr.city})
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '16px' }}>
                            <div>📞 Téléphone : <strong>{sr.phone}</strong></div>
                            <div>🕒 Horaires : <strong>{sr.openingHours}</strong></div>
                          </div>
                        </div>

                        <div style={{
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Stock de véhicules :</span>
                          <span style={{ fontSize: '0.94rem', fontWeight: 800, color: '#10B981' }}>
                            {stockInShowroom.length} véhicule(s) en parc
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==================== MODAL: ADD / EDIT VEHICLE ==================== */}
      {isVehicleModalOpen && (
        <div className="modal-overlay" onClick={() => setIsVehicleModalOpen(false)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '850px', padding: '0', background: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.12)', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '18px 24px',
              background: '#0B0F19',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {editingVehicle ? 'Modifier le Deal Véhicule' : 'Ajouter un Nouveau Deal en Showroom'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Les données renseignées seront publiées instantanément sur le catalogue.
                </p>
              </div>
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveVehicle} style={{ overflowY: 'auto', padding: '24px', flexGrow: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {/* Title */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Titre Complet de l'Annonce *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: BMW M4 Competition Coupé M xDrive 510ch"
                    value={vehicleFormData.title}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Marque */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Marque *
                  </label>
                  <select
                    value={vehicleFormData.brand}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, brand: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  >
                    {POPULAR_BRANDS.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Modèle */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Modèle Spécifique *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: M4 Competition"
                    value={vehicleFormData.model}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, model: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Année */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Année de Mise en Circulation *
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max="2026"
                    value={vehicleFormData.year}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, year: parseInt(e.target.value) || 2024 })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                {/* État */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    État / Kilométrage *
                  </label>
                  <select
                    value={vehicleFormData.condition}
                    onChange={(e) => {
                      const cond = e.target.value;
                      setVehicleFormData(prev => ({
                        ...prev,
                        condition: cond,
                        mileage: cond === 'neuf' ? 0 : prev.mileage || 15000,
                        papers: cond === 'neuf' ? 'Carte Grise (00 km)' : 'Carte Grise'
                      }));
                    }}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  >
                    <option value="neuf">00 km - Neuf d'Importation</option>
                    <option value="occasion">Occasion Certifiée</option>
                  </select>
                </div>

                {/* Kilométrage (si occasion) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Kilométrage (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={vehicleFormData.mileage}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, mileage: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Carrosserie */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Carrosserie *
                  </label>
                  <select
                    value={vehicleFormData.bodyType}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, bodyType: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  >
                    <option value="sedan">Berline (Sedan)</option>
                    <option value="suv">SUV & 4x4</option>
                    <option value="coupe">Coupé</option>
                    <option value="cabriolet">Cabriolet</option>
                    <option value="hatchback">Compacte</option>
                  </select>
                </div>

                {/* Prix en Millions Centimes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#FBBF24', marginBottom: '6px' }}>
                    Prix en Millions Centimes (M) *
                  </label>
                  <input
                    type="number"
                    step="10"
                    required
                    value={vehicleFormData.priceMillions}
                    onChange={(e) => handlePriceMillionsChange(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(251, 191, 36, 0.4)', borderRadius: '8px', color: '#FBBF24', fontWeight: 800, fontSize: '0.95rem' }}
                  />
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>
                    = {vehicleFormData.priceDZD ? vehicleFormData.priceDZD.toLocaleString('fr-FR') : 0} DZD
                  </div>
                </div>

                {/* Papiers */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Documents & Papiers Administratifs *
                  </label>
                  <select
                    value={vehicleFormData.papers}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, papers: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  >
                    <option value="Carte Grise">Carte Grise</option>
                    <option value="Carte Grise (00 km)">Carte Grise (00 km)</option>
                    <option value="Licence Moudjahid">Licence Moudjahid</option>
                    <option value="Dédouané">Dédouané avec certificat</option>
                  </select>
                </div>

                {/* Showroom */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Showroom d'Exposition *
                  </label>
                  <select
                    value={vehicleFormData.showroom}
                    onChange={(e) => {
                      const srName = e.target.value;
                      const srObj = SHOWROOMS.find(s => s.name === srName);
                      setVehicleFormData(prev => ({
                        ...prev,
                        showroom: srName,
                        wilaya: srObj ? `${srObj.city} (${srObj.city === 'Alger' ? '16' : srObj.city === 'Oran' ? '31' : srObj.city === 'Annaba' ? '23' : '09'})` : prev.wilaya,
                        phone: srObj ? srObj.phone : prev.phone,
                        whatsapp: srObj ? srObj.whatsapp : prev.whatsapp
                      }));
                    }}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  >
                    {SHOWROOMS.map(sr => (
                      <option key={sr.id} value={sr.name}>{sr.name} ({sr.city})</option>
                    ))}
                  </select>
                </div>

                {/* Motorisation */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Motorisation
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 3.0L V6 Turbo 340 ch"
                    value={vehicleFormData.engine}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, engine: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Boîte & Énergie */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Carburant & Boîte
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={vehicleFormData.fuel}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, fuel: e.target.value })}
                      style={{ flex: 1, padding: '10px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                    >
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                      <option value="Électrique">Électrique</option>
                    </select>

                    <select
                      value={vehicleFormData.transmission}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, transmission: e.target.value })}
                      style={{ flex: 1, padding: '10px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                    >
                      <option value="Automatique">Automatique</option>
                      <option value="Manuelle">Manuelle</option>
                    </select>
                  </div>
                </div>

                {/* Couleur */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Couleur Extérieure
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Blanc Glacier Nacré"
                    value={vehicleFormData.color}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, color: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* ==================== PHOTO MANAGEMENT ==================== */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#FFFFFF', fontWeight: 700 }}>
                  <ImageIcon size={18} color="#FF6B00" />
                  <span>Gestion des Photos Réelles du Véhicule</span>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '14px' }}>
                  Sélectionnez parmi nos visuels locaux certifiés en haute résolution ou saisissez une URL directe d'image.
                </p>

                {/* Preset selector */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                    Modèles disponibles certifiés en local :
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setVehicleFormData(prev => ({ ...prev, images: [e.target.value] }));
                      }
                    }}
                    style={{ width: '100%', padding: '10px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                  >
                    <option value="">-- Choisir une photo certifiée locale --</option>
                    {PRESET_CAR_IMAGES.map(p => (
                      <option key={p.url} value={p.url}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Custom URL Input */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                  <input
                    type="url"
                    placeholder="Ou collez une URL directe d'image (https://...)"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customImageUrl.trim()) {
                        setVehicleFormData(prev => ({ ...prev, images: [customImageUrl.trim()] }));
                        setCustomImageUrl('');
                      }
                    }}
                    style={{ background: '#FF6B00', border: 'none', color: '#fff', padding: '0 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer' }}
                  >
                    Appliquer
                  </button>
                </div>

                {/* Preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Aperçu actuel :</span>
                  <img
                    src={vehicleFormData.images[0] || '/cars/bmw_m4_competition.jpg'}
                    alt="Aperçu"
                    style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid #FF6B00' }}
                  />
                </div>
              </div>

              {/* ==================== OPTIONS / FEATURES TAGS ==================== */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '24px'
              }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '8px' }}>
                  Équipements & Options Clés
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Ex: Système Audio Bowers & Wilkins"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '0 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Ajouter
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {vehicleFormData.features.map((feat, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#E2E8F0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', padding: 0 }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  style={{ padding: '10px 18px', background: 'rgba(255, 255, 255, 0.06)', border: 'none', borderRadius: '8px', color: '#CBD5E1', fontWeight: 600, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingVehicle ? 'Enregistrer les Modifications' : 'Publier le Véhicule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD MANUAL ORDER ==================== */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={() => setIsOrderModalOpen(false)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '560px', padding: '24px', background: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>Enregistrer un Lead Client Manuel</h3>
                <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Enregistrez une visite en showroom ou un appel téléphonique.</p>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', width: '30px', height: '30px', borderRadius: '50%', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Nom du Client *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mohamed Kaci"
                  value={orderFormData.clientName}
                  onChange={(e) => setOrderFormData({ ...orderFormData, clientName: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Téléphone *</label>
                  <input
                    type="text"
                    required
                    placeholder="0550 12 34 56"
                    value={orderFormData.phone}
                    onChange={(e) => setOrderFormData({ ...orderFormData, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Wilaya *</label>
                  <select
                    value={orderFormData.wilaya}
                    onChange={(e) => setOrderFormData({ ...orderFormData, wilaya: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                  >
                    {WILAYAS.slice(1).map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Véhicule Concerné *</label>
                <select
                  value={orderFormData.vehicleTitle}
                  onChange={(e) => {
                    const title = e.target.value;
                    const car = vehicles.find(v => v.title === title);
                    setOrderFormData(prev => ({
                      ...prev,
                      vehicleTitle: title,
                      showroom: car ? car.showroom : prev.showroom,
                      budget: car ? `${car.priceMillions} M` : prev.budget
                    }));
                  }}
                  required
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                >
                  <option value="">-- Sélectionner un véhicule du stock --</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.title}>{v.title} ({v.priceMillions} M)</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Type de Demande</label>
                  <select
                    value={orderFormData.type}
                    onChange={(e) => setOrderFormData({ ...orderFormData, type: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                  >
                    <option value="Réservation Immédiate">Réservation Immédiate</option>
                    <option value="Demande d'Achat Comptant">Demande d'Achat Comptant</option>
                    <option value="Demande d'Essai Showroom">Demande d'Essai Showroom</option>
                    <option value="Offre de Reprise">Offre de Reprise</option>
                    <option value="Demande d'Informations">Demande d'Informations</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Budget / Offre</label>
                  <input
                    type="text"
                    placeholder="Ex: 1600 M"
                    value={orderFormData.budget}
                    onChange={(e) => setOrderFormData({ ...orderFormData, budget: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>Note / Message du Client</label>
                <textarea
                  rows="3"
                  placeholder="Détails de la demande, préférences ou historique d'échange..."
                  value={orderFormData.message}
                  onChange={(e) => setOrderFormData({ ...orderFormData, message: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#080C14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#FFF', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  style={{ padding: '9px 16px', background: 'rgba(255, 255, 255, 0.06)', border: 'none', borderRadius: '8px', color: '#CBD5E1', fontWeight: 600, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', background: '#FF6B00', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}
                >
                  Enregistrer le Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
