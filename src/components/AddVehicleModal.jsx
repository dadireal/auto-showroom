import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Car, Image, DollarSign, Phone, MapPin } from 'lucide-react';
import { WILAYAS, BODY_TYPES } from '../data/mockData';

export default function AddVehicleModal({ isOpen, onClose, onAddVehicle }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    brand: 'Audi',
    model: '',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: '',
    fuel: 'Essence',
    transmission: 'Automatique',
    drivetrain: 'AWD / 4x4',
    engine: '2.0 Turbo 200 ch',
    papers: 'Carte Grise',
    color: 'Noir Nacré',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    phone: '0550 12 34 56',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.priceMillions) {
      alert('Veuillez remplir au moins le titre et le prix');
      return;
    }

    const priceM = parseFloat(formData.priceMillions);
    const newCar = {
      id: Date.now(),
      title: formData.title,
      brand: formData.brand,
      model: formData.model || formData.title,
      year: parseInt(formData.year),
      mileage: parseInt(formData.mileage) || 0,
      condition: formData.condition,
      bodyType: formData.bodyType,
      priceMillions: priceM,
      priceDZD: priceM * 10000,
      fuel: formData.fuel,
      transmission: formData.transmission,
      drivetrain: formData.drivetrain,
      engine: formData.engine,
      papers: formData.papers,
      color: formData.color,
      wilaya: formData.wilaya,
      showroom: formData.showroom,
      whatsapp: formData.phone.replace(/\D/g, ''),
      phone: formData.phone,
      featured: true,
      inspectionScore: 98,
      images: [
        formData.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
      ],
      features: [
        'Véhicule vérifié et inspecté',
        'Contrôle technique à jour',
        'Papiers en règle'
      ]
    };

    onAddVehicle(newCar);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '680px', padding: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>
              Espace Gestion Showroom
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>
              Ajouter un Véhicule au Catalogue
            </h3>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle size={56} color="#10B981" style={{ marginBottom: '16px' }} />
            <h4 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '8px' }}>Véhicule Ajouté avec Succès !</h4>
            <p style={{ color: '#64748b' }}>Votre annonce est désormais visible en direct dans le catalogue du showroom.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Titre de l’Annonce *
              </label>
              <input
                type="text"
                placeholder="ex: Mercedes-Benz C200 AMG Line 2024"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Marque</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Modèle</label>
                <input
                  type="text"
                  placeholder="ex: C200"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Année</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>État</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  <option value="neuf">⚡ 00 km (Neuf)</option>
                  <option value="occasion">Occasion Certifiée</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Kilométrage (km)</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Prix en Millions (Centimes) *</label>
                <input
                  type="number"
                  placeholder="ex: 650"
                  value={formData.priceMillions}
                  onChange={(e) => setFormData({ ...formData, priceMillions: e.target.value })}
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Wilaya</label>
                <select
                  value={formData.wilaya}
                  onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  {WILAYAS.filter(w => w !== 'Toutes les Wilayas').map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Nom du Showroom</label>
                <input
                  type="text"
                  value={formData.showroom}
                  onChange={(e) => setFormData({ ...formData, showroom: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Téléphone / WhatsApp</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>URL de la Photo Principale</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                <PlusCircle size={18} />
                <span>Publier le Véhicule au Catalogue</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
