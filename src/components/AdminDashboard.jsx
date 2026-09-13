import React, { useState, useMemo, useRef } from 'react';
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
  ChevronDown,
  UploadCloud,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { POPULAR_BRANDS, SHOWROOMS, WILAYAS, BODY_TYPES, ORDER_STATUSES } from '../data/mockData';
import Logo from './Logo';
import { useTheme } from '../theme/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
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
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  // Compress and resize large camera photos for high-performance in-browser handling
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (filesList) => {
    const files = Array.from(filesList).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;

    setIsProcessingImages(true);
    const compressedList = [];
    for (const file of files) {
      const dataUrl = await compressImage(file);
      if (dataUrl) compressedList.push(dataUrl);
    }

    if (compressedList.length > 0) {
      setVehicleFormData(prev => {
        const current = (prev.images || []).filter(img => img !== '/cars/bmw_m4_competition.jpg');
        return {
          ...prev,
          images: [...current, ...compressedList]
        };
      });
    }
    setIsProcessingImages(false);
  };

  const handleDeviceFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setVehicleFormData(prev => {
      const updated = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated.length > 0 ? updated : ['/cars/bmw_m4_competition.jpg']
      };
    });
  };

  const handleSetMainImage = (indexToMain) => {
    setVehicleFormData(prev => {
      const current = prev.images || [];
      const selected = current[indexToMain];
      const others = current.filter((_, idx) => idx !== indexToMain);
      return {
        ...prev,
        images: [selected, ...others]
      };
    });
  };

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
    <div className="dash-container" style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      color: 'var(--text-main)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* ===== RESPONSIVE CSS & THEME STYLING ===== */}
      <style>{`
        .dash-container {
          background: var(--bg-base);
          color: var(--text-main);
          transition: background-color 0.25s ease, color 0.25s ease;
        }
        .dash-header {
          padding: 14px 28px;
          background: var(--surface-card) !important;
          border-bottom: 1px solid var(--border-subtle) !important;
        }
        .dash-header-subtitle { display: inline-flex; }
        .dash-header-btn-text { display: inline; }
        .dash-sidebar {
          width: 240px;
          display: flex;
          flex-direction: column;
          background: var(--surface-card) !important;
          border-right: 1px solid var(--border-subtle) !important;
        }
        .dash-main { padding: 32px; }
        .dash-body { display: flex; min-height: calc(100vh - 65px); }
        .dash-bottom-nav { display: none; background: var(--surface-card) !important; border-top: 1px solid var(--border-subtle) !important; }
        .dash-kpi-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .dash-quick-grid { grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); }
        .dash-vehicle-header { flex-direction: row; align-items: center; gap: 16px; }
        .dash-vehicle-filters { flex-direction: row; flex-wrap: wrap; }
        .dash-orders-header { flex-direction: row; align-items: center; }

        /* Unified Card Architecture */
        .dash-kpi-card,
        .dash-card,
        .dash-order-card,
        .dash-showroom-card,
        .dash-table-wrap {
          background: var(--surface-card) !important;
          border: 1px solid var(--border-subtle) !important;
          border-radius: 16px;
          box-shadow: var(--shadow-card);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        /* Typography & Headings */
        .dash-title,
        .dash-card-title,
        .dash-client-name,
        .dash-showroom-name {
          color: var(--text-main) !important;
        }

        .dash-sub,
        .dash-card-sub,
        .dash-lead-meta {
          color: var(--text-secondary) !important;
        }

        .dash-lead-phone {
          color: var(--text-main) !important;
        }

        /* KPI Values */
        .dash-kpi-value {
          font-size: 2.1rem;
          font-weight: 900;
          color: var(--text-main) !important;
          line-height: 1.15;
          margin-top: 4px;
        }

        .dash-kpi-gold {
          color: var(--amber-gold) !important;
        }

        .dash-kpi-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-secondary) !important;
          letter-spacing: 0.04em;
        }

        /* Vehicle Titles in Lead items and cards */
        .dash-lead-vehicle {
          color: #FF7847 !important;
          font-weight: 700;
        }
        :root[data-theme="light"] .dash-lead-vehicle {
          color: #D97706 !important;
          font-weight: 800;
        }

        /* Lead Item Row */
        .dash-lead-item {
          padding: 14px;
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }
        .dash-lead-item:hover {
          background: var(--surface-card-hover);
          border-color: var(--border-card-hover);
        }

        /* Lead Message Box */
        .dash-lead-msg {
          font-size: 0.82rem;
          font-style: italic;
          padding: 10px 12px;
          border-radius: 8px;
          border-left: 3px solid #3B82F6;
          background: var(--surface-subtle);
          color: var(--text-secondary);
        }
        :root[data-theme="light"] .dash-lead-msg {
          background: #F1F5F9;
          color: #334155;
          border-left: 3px solid #2563EB;
        }

        /* Lead Box info */
        .dash-lead-box {
          padding: 10px 12px;
          border-radius: 8px;
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
        }
        :root[data-theme="light"] .dash-lead-box {
          background: #F8FAFC;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        /* Secondary Action Button in Quick Actions */
        .dash-btn-secondary {
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
          color: var(--text-main) !important;
          padding: 14px;
          border-radius: 12px;
          font-size: 0.94rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .dash-btn-secondary:hover {
          background: var(--surface-card-hover);
          border-color: var(--primary);
          color: var(--primary) !important;
        }
        :root[data-theme="light"] .dash-btn-secondary {
          background: #FFFFFF;
          border: 1.5px solid rgba(15, 23, 42, 0.12);
          color: #0F172A !important;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }
        :root[data-theme="light"] .dash-btn-secondary:hover {
          border-color: var(--primary);
          background: #F8FAFC;
          color: var(--primary) !important;
        }

        /* Sidebar Footer */
        .dash-sidebar-footer {
          margin-top: auto;
          padding: 16px 14px;
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
        }

        /* Status Tabs in Orders */
        .dash-status-tab {
          padding: 8px 16px;
          border-radius: 8px;
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .dash-status-tab:hover {
          background: var(--surface-card-hover);
          color: var(--text-main);
        }
        .dash-status-tab.active {
          background: var(--surface-card);
          color: var(--primary) !important;
          border-color: var(--primary) !important;
          box-shadow: 0 2px 8px rgba(255, 70, 5, 0.2);
          font-weight: 700;
        }
        :root[data-theme="light"] .dash-status-tab {
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.1);
          color: #475569;
        }
        :root[data-theme="light"] .dash-status-tab.active {
          background: #0F172A;
          color: #FFFFFF !important;
          border-color: #0F172A !important;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        /* Phone Button */
        .dash-phone-btn {
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }
        .dash-phone-btn:hover {
          background: var(--primary);
          color: #FFFFFF !important;
          border-color: var(--primary);
        }
        :root[data-theme="light"] .dash-phone-btn {
          background: #F1F5F9;
          border: 1px solid rgba(15, 23, 42, 0.1);
          color: #334155;
        }
        :root[data-theme="light"] .dash-phone-btn:hover {
          background: var(--primary);
          color: #FFFFFF !important;
        }

        /* Table Styling */
        .dash-table-wrap table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }
        .dash-table-wrap thead tr {
          background: var(--surface-subtle);
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .dash-table-wrap tbody tr {
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.15s ease;
        }
        .dash-table-wrap tbody tr:hover {
          background: var(--surface-subtle) !important;
        }
        .dash-car-title {
          font-weight: 700;
          color: var(--text-main) !important;
          max-width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dash-car-brand {
          font-weight: 700;
          color: var(--text-main) !important;
        }
        .dash-car-model {
          color: var(--text-secondary) !important;
          font-size: 0.8rem;
        }
        .dash-car-price {
          font-weight: 800;
          color: var(--amber-gold) !important;
          font-size: 0.94rem;
        }
        .dash-car-dzd {
          color: var(--text-muted) !important;
          font-size: 0.75rem;
        }
        .dash-car-year {
          color: var(--text-main) !important;
          font-weight: 600;
        }
        .dash-car-km {
          color: var(--text-secondary) !important;
          font-size: 0.78rem;
        }
        .dash-car-showroom {
          color: var(--text-main) !important;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .dash-car-wilaya {
          color: var(--text-muted) !important;
          font-size: 0.74rem;
        }

        /* Action buttons in table */
        .dash-btn-edit {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38BDF8;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .dash-btn-edit:hover {
          background: rgba(56, 189, 248, 0.25);
          border-color: #38BDF8;
        }
        :root[data-theme="light"] .dash-btn-edit {
          background: rgba(2, 132, 199, 0.08);
          border-color: rgba(2, 132, 199, 0.25);
          color: #0284C7;
        }
        :root[data-theme="light"] .dash-btn-edit:hover {
          background: rgba(2, 132, 199, 0.16);
          border-color: #0284C7;
        }

        .dash-btn-delete {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #F87171;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .dash-btn-delete:hover {
          background: rgba(239, 68, 68, 0.25);
          border-color: #EF4444;
        }
        :root[data-theme="light"] .dash-btn-delete {
          background: rgba(220, 38, 38, 0.08);
          border-color: rgba(220, 38, 38, 0.25);
          color: #DC2626;
        }
        :root[data-theme="light"] .dash-btn-delete:hover {
          background: rgba(220, 38, 38, 0.16);
          border-color: #DC2626;
        }

        /* Inputs, Selects & Modals */
        .dash-main input,
        .dash-main select,
        .dash-main textarea,
        .modal-content input,
        .modal-content select,
        .modal-content textarea {
          background: var(--surface-input) !important;
          border: 1px solid var(--border-subtle) !important;
          color: var(--text-main) !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .dash-main input:focus,
        .dash-main select:focus,
        .dash-main textarea:focus,
        .modal-content input:focus,
        .modal-content select:focus,
        .modal-content textarea:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 3px rgba(255, 70, 5, 0.15) !important;
        }
        .dash-main input::placeholder,
        .modal-content input::placeholder,
        .modal-content textarea::placeholder {
          color: var(--text-muted) !important;
        }
        select option {
          background: #0F172A;
          color: #F8FAFC;
        }
        :root[data-theme="light"] select option {
          background: #FFFFFF;
          color: #0F172A;
        }

        .modal-content {
          background: var(--surface-card) !important;
          border: 1px solid var(--border-subtle) !important;
          color: var(--text-main) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4) !important;
        }
        :root[data-theme="light"] .modal-content {
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25) !important;
        }
        .modal-header-wrap {
          background: var(--surface-subtle) !important;
          border-bottom: 1px solid var(--border-subtle) !important;
        }
        .modal-content label {
          color: var(--text-secondary) !important;
        }
        :root[data-theme="light"] .modal-content label {
          color: #334155 !important;
        }

        @media (max-width: 900px) {
          .dash-header { padding: 12px 16px; }
          .dash-header-subtitle { display: none !important; }
          .dash-header-btn-text { display: none !important; }
          .dash-sidebar { display: none !important; }
          .dash-bottom-nav { display: flex !important; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
            background: var(--surface-card); border-top: 1px solid var(--border-subtle);
            padding: 8px 4px; gap: 2px; padding-bottom: env(safe-area-inset-bottom, 8px); }
          .dash-body { min-height: calc(100vh - 57px); }
          .dash-main { padding: 16px 12px 80px 12px; }
          .dash-kpi-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .dash-quick-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .dash-vehicle-header { flex-direction: column; align-items: flex-start; gap: 10px; }
          .dash-vehicle-filters { flex-direction: column; width: 100%; }
          .dash-vehicle-filters select, .dash-vehicle-filters input { width: 100% !important; box-sizing: border-box; }
          .dash-orders-header { flex-direction: column; align-items: flex-start; gap: 10px; }
          .dash-orders-header input { width: 100% !important; box-sizing: border-box; }
        }
        @media (max-width: 480px) {
          .dash-kpi-grid { grid-template-columns: 1fr !important; }
          .dash-main { padding: 12px 10px 90px 10px; }
        }
        .dash-bottom-nav-btn {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; padding: 8px 4px; background: none; border: none; cursor: pointer;
          border-radius: 10px; transition: background 0.2s; font-size: 0.65rem; font-weight: 600;
        }
      `}</style>

      {/* ==================== TOP NAVIGATION BAR ==================== */}
      <header className="dash-header" style={{
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand & Mode Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <Logo size="small" subtitle="" />
          <div className="dash-header-subtitle" style={{
            background: 'rgba(255, 107, 0, 0.15)',
            border: '1px solid rgba(255, 107, 0, 0.4)',
            color: '#FF6B00',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: '6px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            Administration Active
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Theme Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#FF4605" />}
            <span className="dash-header-btn-text">{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Eye size={15} color="#FBBF24" />
            <span className="dash-header-btn-text">Voir le site</span>
          </button>

          <button
            onClick={onLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#F87171',
              padding: '8px 12px',
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
            <span className="dash-header-btn-text">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* ==================== DASHBOARD BODY & TABS ==================== */}
      <div className="dash-body">
        {/* Desktop Sidebar */}
        <aside className="dash-sidebar" style={{
          background: '#0B0F19',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 14px',
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
                  borderLeft: isActive ? '3px solid #FF6B00' : '3px solid transparent',
                  width: '100%'
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

          <div className="dash-sidebar-footer">
            <div className="dash-card-sub" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Connecté en tant que :</div>
            <div className="dash-card-title" style={{ fontSize: '0.88rem', fontWeight: 800 }}>Directeur Général</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              Serveur Actif
            </div>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="dash-bottom-nav">
          {[
            { id: 'overview', label: 'Aperçu', icon: <LayoutDashboard size={20} /> },
            { id: 'vehicles', label: 'Stock', icon: <Car size={20} />, count: totalStockCount },
            { id: 'orders', label: 'Leads', icon: <ShoppingBag size={20} />, count: newOrdersCount, highlight: true },
            { id: 'showrooms', label: 'Showrooms', icon: <Store size={20} />, count: SHOWROOMS.length }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className="dash-bottom-nav-btn"
                onClick={() => setActiveTab(tab.id)}
                style={{ color: isActive ? '#FF6B00' : '#64748B', position: 'relative' }}
              >
                <div style={{ position: 'relative' }}>
                  {tab.icon}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span style={{
                      position: 'absolute', top: '-5px', right: '-8px',
                      background: tab.highlight ? '#FF6B00' : 'rgba(255,255,255,0.15)',
                      color: '#fff', borderRadius: '9999px',
                      fontSize: '0.6rem', fontWeight: 800,
                      width: '16px', height: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{tab.count}</span>
                  )}
                </div>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Workspace */}
        <main className="dash-main" style={{ flexGrow: 1, overflowY: 'auto' }}>

          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h1 className="dash-title" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  Tableau de Bord & Métriques Showroom
                </h1>
                <p className="dash-sub" style={{ fontSize: '0.94rem' }}>
                  Surveillez les performances de votre stock, les nouveaux leads clients et l'activité commerciale en temps réel.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="dash-kpi-grid" style={{
                display: 'grid',
                gap: '20px',
                marginBottom: '36px'
              }}>
                {/* KPI 1: Total Stock */}
                <div className="dash-kpi-card" style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div className="dash-kpi-label" style={{ marginBottom: '6px' }}>
                      Véhicules en Stock
                    </div>
                    <div className="dash-kpi-value">
                      {totalStockCount}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#10B981', marginTop: '6px', fontWeight: 700 }}>
                      ✓ 100% Papiers & Cartes Grises Vérifiés
                    </div>
                  </div>
                  <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '14px', borderRadius: '14px', color: '#3B82F6' }}>
                    <Car size={26} />
                  </div>
                </div>

                {/* KPI 2: Total Valuation */}
                <div className="dash-kpi-card" style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div className="dash-kpi-label" style={{ marginBottom: '6px' }}>
                      Valorisation du Parc
                    </div>
                    <div className="dash-kpi-value dash-kpi-gold">
                      {totalInventoryValuationMillions.toLocaleString('fr-FR')} M
                    </div>
                    <div className="dash-sub" style={{ fontSize: '0.78rem', marginTop: '6px', fontWeight: 600 }}>
                      ~ {(totalInventoryValuationMillions * 10000).toLocaleString('fr-FR')} DZD
                    </div>
                  </div>
                  <div style={{ background: 'rgba(251, 191, 36, 0.15)', padding: '14px', borderRadius: '14px', color: '#FBBF24' }}>
                    <Coins size={26} />
                  </div>
                </div>

                {/* KPI 3: Orders / Leads */}
                <div className="dash-kpi-card" style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div className="dash-kpi-label" style={{ marginBottom: '6px' }}>
                      Demandes & Commandes
                    </div>
                    <div className="dash-kpi-value">
                      {totalOrdersCount}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#FF6B00', fontWeight: 700, marginTop: '6px' }}>
                      ⚡ {newOrdersCount} nouveau(x) lead(s) à traiter
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 107, 0, 0.15)', padding: '14px', borderRadius: '14px', color: '#FF6B00' }}>
                    <ShoppingBag size={26} />
                  </div>
                </div>

                {/* KPI 4: Partner Showrooms */}
                <div className="dash-kpi-card" style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div className="dash-kpi-label" style={{ marginBottom: '6px' }}>
                      Showrooms Partenaires
                    </div>
                    <div className="dash-kpi-value">
                      {SHOWROOMS.length}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#10B981', marginTop: '6px', fontWeight: 700 }}>
                      Alger, Oran, Annaba, Blida
                    </div>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '14px', borderRadius: '14px', color: '#10B981' }}>
                    <Building size={26} />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Preview */}
              <div className="dash-quick-grid" style={{ display: 'grid', gap: '24px' }}>
                {/* Recent Orders Box */}
                <div className="dash-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <h3 className="dash-card-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>
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
                      <div key={o.id} className="dash-lead-item">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="dash-client-name" style={{ fontSize: '0.92rem' }}>{o.clientName}</span>
                            <span className="dash-lead-meta" style={{ fontSize: '0.75rem' }}>• {o.wilaya}</span>
                          </div>
                          <div className="dash-lead-vehicle" style={{ fontSize: '0.84rem' }}>{o.vehicleTitle}</div>
                          <div className="dash-lead-meta" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{o.type} ({o.date})</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: o.status === 'nouveau' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: o.status === 'nouveau' ? '#3B82F6' : '#10B981'
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
                <div className="dash-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 className="dash-card-title" style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>
                      Actions Rapides du Showroom
                    </h3>
                    <p className="dash-card-sub" style={{ fontSize: '0.88rem', marginBottom: '20px' }}>
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
                        className="dash-btn-secondary"
                      >
                        <ShoppingBag size={18} color="#FF6B00" />
                        <span>Enregistrer un Lead Client Manuel (Visite / Appel)</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 700, fontSize: '0.88rem' }}>
                      <ShieldCheck size={18} />
                      <span>Intégrité des Données Garantie</span>
                    </div>
                    <p className="dash-card-sub" style={{ fontSize: '0.8rem', marginTop: '4px' }}>
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
              <div className="dash-vehicle-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div>
                  <h1 className="dash-title" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                    Gestion du Stock & Deals Showroom ({filteredVehicles.length})
                  </h1>
                  <p className="dash-sub" style={{ fontSize: '0.92rem' }}>
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
              <div className="dash-card" style={{
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Rechercher modèle, titre..."
                    value={vehicleSearch}
                    onChange={(e) => setVehicleSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Marque Filter */}
                <select
                  value={vehicleBrandFilter}
                  onChange={(e) => setVehicleBrandFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
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
                    padding: '9px 12px',
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
                    padding: '9px 12px',
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

              {/* Vehicles Table - horizontal scroll on mobile */}
              <div className="dash-table-wrap" style={{
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table>
                  <thead>
                    <tr>
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
                      <tr key={car.id}>
                        {/* Image & Title */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={car.images && car.images[0] ? car.images[0] : '/cars/bmw_m4_competition.jpg'}
                              alt={car.title}
                              style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                            />
                            <div>
                              <div className="dash-car-title">
                                {car.title}
                              </div>
                              <div style={{ fontSize: '0.74rem', color: car.condition === 'neuf' ? '#10B981' : 'var(--primary)', fontWeight: 600 }}>
                                {car.condition === 'neuf' ? '⚡ 00 km Neuf' : 'Occasion Récente'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Brand & Model */}
                        <td style={{ padding: '14px 18px' }}>
                          <div className="dash-car-brand">{car.brand}</div>
                          <div className="dash-car-model">{car.model}</div>
                        </td>

                        {/* Price */}
                        <td style={{ padding: '14px 18px' }}>
                          <div className="dash-car-price">
                            {car.priceMillions.toLocaleString('fr-FR')} M
                          </div>
                          <div className="dash-car-dzd">
                            {car.priceDZD.toLocaleString('fr-FR')} DZD
                          </div>
                        </td>

                        {/* Year & Mileage */}
                        <td style={{ padding: '14px 18px' }}>
                          <div className="dash-car-year">{car.year}</div>
                          <div className="dash-car-km">
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
                          <div className="dash-car-showroom">{car.showroom}</div>
                          <div className="dash-car-wilaya">{car.wilaya}</div>
                        </td>

                        {/* Featured Toggle */}
                        <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                          <button
                            onClick={() => onToggleFeatured(car.id)}
                            style={{
                              background: car.featured ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                              border: car.featured ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
                              borderRadius: '8px',
                              padding: '6px 8px',
                              cursor: 'pointer',
                              color: car.featured ? '#F59E0B' : 'var(--text-muted)',
                              transition: 'all 0.2s ease'
                            }}
                            title={car.featured ? "Retirer des coups de cœur" : "Mettre en coup de cœur"}
                          >
                            <Star size={16} fill={car.featured ? '#F59E0B' : 'none'} />
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleOpenEditVehicle(car)}
                              className="dash-btn-edit"
                            >
                              <Edit size={14} />
                              <span>Modifier</span>
                            </button>

                            <button
                              onClick={() => handleDeleteVehicleConfirm(car)}
                              className="dash-btn-delete"
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
            </div>
          )}

          {/* ==================== TAB 3: ORDERS & LEADS ==================== */}
          {activeTab === 'orders' && (
            <div>
              <div className="dash-vehicle-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div>
                  <h1 className="dash-title" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                    Commandes & Demandes Clients ({filteredOrders.length})
                  </h1>
                  <p className="dash-sub" style={{ fontSize: '0.92rem' }}>
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
                      className={`dash-status-tab ${isActive ? 'active' : ''}`}
                    >
                      <span>{st.label}</span>
                      <span style={{
                        padding: '2px 7px',
                        borderRadius: '10px',
                        background: isActive ? 'rgba(255, 70, 5, 0.15)' : 'var(--surface-input)',
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
              <div className="dash-orders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
                {filteredOrders.map(order => {
                  const statusObj = ORDER_STATUSES.find(s => s.id === order.status) || ORDER_STATUSES[1];
                  const whatsappMsg = encodeURIComponent(
                    `Bonjour ${order.clientName}, nous avons bien reçu votre demande (${order.type}) pour le véhicule : ${order.vehicleTitle}. Le véhicule est disponible au ${order.showroom}. Souhaitez-vous convenir d'un rendez-vous pour un essai ?`
                  );

                  return (
                    <div key={order.id} className="dash-order-card" style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}>
                      <div>
                        {/* Header: ID, Date & Status */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', background: 'rgba(255, 70, 5, 0.12)', padding: '3px 8px', borderRadius: '6px' }}>
                            {order.id}
                          </span>
                          <span className="dash-lead-meta" style={{ fontSize: '0.76rem' }}>
                            {order.date}
                          </span>
                        </div>

                        {/* Client Info */}
                        <div style={{ marginBottom: '10px' }}>
                          <div className="dash-client-name" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                            {order.clientName}
                          </div>
                          <div className="dash-lead-meta" style={{ fontSize: '0.82rem' }}>
                            📍 {order.wilaya} • 📞 <strong className="dash-lead-phone">{order.phone}</strong>
                          </div>
                        </div>

                        {/* Vehicle & Request Type */}
                        <div className="dash-lead-box" style={{ marginBottom: '10px' }}>
                          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
                            {order.type}
                          </div>
                          <div className="dash-lead-vehicle" style={{ fontSize: '0.9rem', marginTop: '2px' }}>
                            {order.vehicleTitle}
                          </div>
                          <div className="dash-card-sub" style={{ fontSize: '0.78rem', marginTop: '2px' }}>
                            Budget / Offre : <strong className="dash-lead-phone">{order.budget || 'Non spécifié'}</strong>
                          </div>
                        </div>

                        {/* Client Message */}
                        {order.message && (
                          <div className="dash-lead-msg">
                            "{order.message}"
                          </div>
                        )}
                      </div>

                      {/* Footer Actions & Status Selector */}
                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Status Select */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="dash-lead-meta" style={{ fontSize: '0.75rem' }}>Statut :</span>
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                            style={{
                              borderRadius: '6px',
                              padding: '5px 8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="nouveau">Nouveau</option>
                            <option value="en_cours">En Traitement</option>
                            <option value="contacte">Contacté</option>
                            <option value="valide">Validé / Conclu</option>
                            <option value="annule">Annulé</option>
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
                              gap: '4px',
                              boxShadow: '0 2px 6px rgba(16, 185, 129, 0.25)'
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${order.phone}`}
                            className="dash-phone-btn"
                            title="Appeler"
                          >
                            <Phone size={14} />
                          </a>

                          <button
                            onClick={() => handleDeleteOrderConfirm(order)}
                            className="dash-btn-delete"
                            title="Supprimer la demande"
                            style={{ padding: '6px 8px' }}
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
                <h1 className="dash-title" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                  Réseau des Showrooms Agréés ({SHOWROOMS.length})
                </h1>
                <p className="dash-sub" style={{ fontSize: '0.92rem' }}>
                  Visualisez les concessions partenaires, leurs contacts directs et le stock réel affecté.
                </p>
              </div>

              <div className="dash-showrooms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {SHOWROOMS.map(sr => {
                  const stockInShowroom = vehicles.filter(v => v.showroom.toLowerCase() === sr.name.toLowerCase());
                  return (
                    <div key={sr.id} className="dash-showroom-card" style={{
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
                          <div className="dash-showroom-name" style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>
                            {sr.name}
                          </div>
                          <div className="dash-card-sub" style={{ fontSize: '0.84rem', marginBottom: '12px' }}>
                            📍 {sr.address} ({sr.city})
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', marginBottom: '16px' }}>
                            <div className="dash-card-sub">📞 Téléphone : <strong className="dash-lead-phone">{sr.phone}</strong></div>
                            <div className="dash-card-sub">🕒 Horaires : <strong className="dash-lead-phone">{sr.openingHours}</strong></div>
                          </div>
                        </div>

                        <div className="dash-lead-box" style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <span className="dash-lead-meta" style={{ fontSize: '0.82rem' }}>Stock de véhicules :</span>
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
            style={{ maxWidth: '850px', padding: '0', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header-wrap" style={{
              padding: '18px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 className="dash-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {editingVehicle ? 'Modifier le Deal Véhicule' : 'Ajouter un Nouveau Deal en Showroom'}
                </h3>
                <p className="dash-sub" style={{ fontSize: '0.82rem' }}>
                  Les données renseignées seront publiées instantanément sur le catalogue.
                </p>
              </div>
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', width: '32px', height: '32px', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveVehicle} style={{ overflowY: 'auto', padding: '24px', flexGrow: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {/* Title */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Titre Complet de l'Annonce *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: BMW M4 Competition Coupé M xDrive 510ch"
                    value={vehicleFormData.title}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Marque */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Marque *
                  </label>
                  <select
                    value={vehicleFormData.brand}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, brand: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                  >
                    {POPULAR_BRANDS.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Modèle */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Modèle Spécifique *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: M4 Competition"
                    value={vehicleFormData.model}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, model: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Année */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Année de Mise en Circulation *
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max="2026"
                    value={vehicleFormData.year}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, year: parseInt(e.target.value) || 2024 })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* État */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
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
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="neuf">00 km - Neuf d'Importation</option>
                    <option value="occasion">Occasion Certifiée</option>
                  </select>
                </div>

                {/* Kilométrage (si occasion) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Kilométrage (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={vehicleFormData.mileage}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, mileage: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Carrosserie */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Carrosserie *
                  </label>
                  <select
                    value={vehicleFormData.bodyType}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, bodyType: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
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
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-gold)', marginBottom: '6px' }}>
                    Prix en Millions Centimes (M) *
                  </label>
                  <input
                    type="number"
                    step="10"
                    required
                    value={vehicleFormData.priceMillions}
                    onChange={(e) => handlePriceMillionsChange(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', color: 'var(--amber-gold)', fontWeight: 800, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <div className="dash-lead-meta" style={{ fontSize: '0.74rem', marginTop: '4px' }}>
                    = {vehicleFormData.priceDZD ? vehicleFormData.priceDZD.toLocaleString('fr-FR') : 0} DZD
                  </div>
                </div>

                {/* Papiers */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Documents & Papiers Administratifs *
                  </label>
                  <select
                    value={vehicleFormData.papers}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, papers: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="Carte Grise">Carte Grise</option>
                    <option value="Carte Grise (00 km)">Carte Grise (00 km)</option>
                    <option value="Licence Moudjahid">Licence Moudjahid</option>
                    <option value="Dédouané">Dédouané avec certificat</option>
                  </select>
                </div>

                {/* Showroom */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
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
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                  >
                    {SHOWROOMS.map(sr => (
                      <option key={sr.id} value={sr.name}>{sr.name} ({sr.city})</option>
                    ))}
                  </select>
                </div>

                {/* Motorisation */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Motorisation
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 3.0L V6 Turbo 340 ch"
                    value={vehicleFormData.engine}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, engine: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Boîte & Énergie */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Carburant & Boîte
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={vehicleFormData.fuel}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, fuel: e.target.value })}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                      <option value="Électrique">Électrique</option>
                    </select>

                    <select
                      value={vehicleFormData.transmission}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, transmission: e.target.value })}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="Automatique">Automatique</option>
                      <option value="Manuelle">Manuelle</option>
                    </select>
                  </div>
                </div>

                {/* Couleur */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    Couleur Extérieure
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Blanc Glacier Nacré"
                    value={vehicleFormData.color}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, color: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* ==================== PHOTO MANAGEMENT ==================== */}
              <div className="dash-card" style={{
                padding: '18px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div className="dash-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                    <ImageIcon size={18} color="var(--primary)" />
                    <span>Gestion des Photos Réelles du Véhicule</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--amber-gold)', fontWeight: 600 }}>
                    {(vehicleFormData.images || []).length} photo{(vehicleFormData.images || []).length > 1 ? 's' : ''}
                  </span>
                </div>

                <p className="dash-sub" style={{ fontSize: '0.82rem', marginBottom: '14px' }}>
                  Importez des photos réelles depuis votre ordinateur (PC/Laptop) ou smartphone, ou utilisez nos visuels certifiés.
                </p>

                {/* 1. DEVICE UPLOAD DROPZONE */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleDeviceFileUpload}
                />
                
                <div
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragOver(false);
                    if (e.dataTransfer && e.dataTransfer.files) {
                      processFiles(e.dataTransfer.files);
                    }
                  }}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    border: isDragOver ? '2px dashed var(--primary)' : '2px dashed var(--border-subtle)',
                    background: isDragOver ? 'rgba(255, 70, 5, 0.1)' : 'var(--surface-subtle)',
                    borderRadius: '10px',
                    padding: '22px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(255, 70, 5, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px auto'
                  }}>
                    <UploadCloud size={22} color="var(--primary)" />
                  </div>
                  
                  <div className="dash-card-title" style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>
                    {isProcessingImages ? 'Optimisation et chargement des photos...' : 'Importer des photos depuis votre appareil'}
                  </div>
                  
                  <div className="dash-sub" style={{ fontSize: '0.78rem', marginBottom: '12px' }}>
                    Glissez-déposez vos photos ici ou <span style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>cliquez pour parcourir</span>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--primary)',
                    color: '#FFF',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(255, 70, 5, 0.3)'
                  }}>
                    <UploadCloud size={16} />
                    <span>Parcourir mon appareil (PC, Laptop, Mobile)</span>
                  </div>
                </div>

                {/* 2. ATTACHED PHOTOS GALLERY (PREVIEWS & COVER MANAGEMENT) */}
                {vehicleFormData.images && vehicleFormData.images.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <span className="dash-lead-meta">Galerie photos actuelle :</span>
                      <span className="dash-lead-meta" style={{ fontSize: '0.72rem' }}>La 1ère photo sera l'affiche principale</span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                      gap: '10px'
                    }}>
                      {vehicleFormData.images.map((imgUrl, idx) => {
                        const isMain = idx === 0;
                        return (
                          <div
                            key={idx}
                            style={{
                              position: 'relative',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: isMain ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                              background: 'var(--surface-input)',
                              aspectRatio: '16/10'
                            }}
                          >
                            <img
                              src={imgUrl}
                              alt={`Photo ${idx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />

                            {/* Main Cover Badge */}
                            {isMain ? (
                              <div style={{
                                position: 'absolute',
                                top: '4px',
                                left: '4px',
                                background: 'var(--primary)',
                                color: '#FFF',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                              }}>
                                <Check size={10} />
                                Couverture
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetMainImage(idx);
                                }}
                                title="Définir comme photo principale"
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  left: '4px',
                                  background: 'var(--surface-subtle)',
                                  color: 'var(--amber-gold)',
                                  border: '1px solid var(--border-subtle)',
                                  fontSize: '0.62rem',
                                  fontWeight: 700,
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                ★ Définir Principale
                              </button>
                            )}

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(idx);
                              }}
                              title="Supprimer cette photo"
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'rgba(239, 68, 68, 0.9)',
                                border: 'none',
                                color: '#FFF',
                                width: '22px',
                                height: '22px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                              }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. SECONDARY OPTIONS: PRESETS & DIRECT URL */}
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <div className="dash-lead-meta" style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px' }}>
                    Ou choisir parmi les visuels certifiés / URL :
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {/* Preset selector */}
                    <div style={{ flex: '1 1 200px' }}>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            setVehicleFormData(prev => ({
                              ...prev,
                              images: [...(prev.images || []).filter(img => img !== '/cars/bmw_m4_competition.jpg'), e.target.value]
                            }));
                            e.target.value = '';
                          }
                        }}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
                      >
                        <option value="">+ Ajouter un visuel local certifié</option>
                        {PRESET_CAR_IMAGES.map(p => (
                          <option key={p.url} value={p.url}>{p.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Custom URL Input */}
                    <div style={{ flex: '1 1 240px', display: 'flex', gap: '6px' }}>
                      <input
                        type="url"
                        placeholder="Coller une URL directe (https://...)"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        style={{ flex: 1, padding: '7px 10px', borderRadius: '8px', fontSize: '0.8rem', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customImageUrl.trim()) {
                            setVehicleFormData(prev => ({
                              ...prev,
                              images: [...(prev.images || []).filter(img => img !== '/cars/bmw_m4_competition.jpg'), customImageUrl.trim()]
                            }));
                            setCustomImageUrl('');
                          }
                        }}
                        style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================== OPTIONS / FEATURES TAGS ==================== */}
              <div className="dash-card" style={{
                padding: '18px',
                marginBottom: '24px'
              }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                  Équipements & Options Clés
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Ex: Système Audio Bowers & Wilkins"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
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
                    style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Ajouter
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {vehicleFormData.features.map((feat, idx) => (
                    <span key={idx} style={{
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  style={{ padding: '10px 18px', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255, 107, 0, 0.3)' }}
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
            style={{ maxWidth: '560px', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 className="dash-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>Enregistrer un Lead Client Manuel</h3>
                <p className="dash-sub" style={{ fontSize: '0.8rem' }}>Enregistrez une visite en showroom ou un appel téléphonique.</p>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', width: '30px', height: '30px', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Nom du Client *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mohamed Kaci"
                  value={orderFormData.clientName}
                  onChange={(e) => setOrderFormData({ ...orderFormData, clientName: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Téléphone *</label>
                  <input
                    type="text"
                    required
                    placeholder="0550 12 34 56"
                    value={orderFormData.phone}
                    onChange={(e) => setOrderFormData({ ...orderFormData, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Wilaya *</label>
                  <select
                    value={orderFormData.wilaya}
                    onChange={(e) => setOrderFormData({ ...orderFormData, wilaya: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}
                  >
                    {WILAYAS.slice(1).map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Véhicule Concerné *</label>
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
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">-- Sélectionner un véhicule du stock --</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.title}>{v.title} ({v.priceMillions} M)</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Type de Demande</label>
                  <select
                    value={orderFormData.type}
                    onChange={(e) => setOrderFormData({ ...orderFormData, type: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="Réservation Immédiate">Réservation Immédiate</option>
                    <option value="Demande d'Achat Comptant">Demande d'Achat Comptant</option>
                    <option value="Demande d'Essai Showroom">Demande d'Essai Showroom</option>
                    <option value="Offre de Reprise">Offre de Reprise</option>
                    <option value="Demande d'Informations">Demande d'Informations</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Budget / Offre</label>
                  <input
                    type="text"
                    placeholder="Ex: 1600 M"
                    value={orderFormData.budget}
                    onChange={(e) => setOrderFormData({ ...orderFormData, budget: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Note / Message du Client</label>
                <textarea
                  rows="3"
                  placeholder="Détails de la demande, préférences ou historique d'échange..."
                  value={orderFormData.message}
                  onChange={(e) => setOrderFormData({ ...orderFormData, message: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  style={{ padding: '9px 16px', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255, 107, 0, 0.3)' }}
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
