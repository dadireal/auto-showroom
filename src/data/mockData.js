// White-label Demo dataset for Auto Showroom
export const SHOWROOMS = [
  {
    id: 'prestige-alger',
    name: 'Showroom Auto Prestige',
    city: 'Alger',
    address: 'Zone Showrooms Automobile, Chéraga, Alger',
    phone: '0550 12 34 56',
    whatsapp: '213550123456',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    verified: true,
    openingHours: '08:30 - 18:30'
  },
  {
    id: 'elite-oran',
    name: 'Showroom Elite Motors',
    city: 'Oran',
    address: 'Boulevard Commercial Ouest, Akid Lotfi, Oran',
    phone: '0555 98 76 54',
    whatsapp: '213555987654',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    verified: true,
    openingHours: '09:00 - 19:00'
  },
  {
    id: 'apex-annaba',
    name: 'Showroom Apex Automobile',
    city: 'Annaba',
    address: 'Avenue Principale des Concessionnaires, Annaba',
    phone: '0560 11 22 33',
    whatsapp: '213560112233',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    verified: true,
    openingHours: '09:00 - 19:00'
  },
  {
    id: 'royal-blida',
    name: 'Showroom Royal Auto',
    city: 'Blida',
    address: 'Pôle Automobile Centre, Blida',
    phone: '0540 44 55 66',
    whatsapp: '213540445566',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    verified: true,
    openingHours: '08:30 - 18:00'
  }
];

export const POPULAR_BRANDS = [
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo-2016.png' },
  { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png' },
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo-2020.png' },
  { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo-2014.png' },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo-2019.png' },
  { name: 'Range Rover', logo: 'https://www.carlogos.org/car-logos/land-rover-logo-2020.png' },
  { name: 'Jetour', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Jetour_wordmark.svg/1200px-Jetour_wordmark.svg.png' },
  { name: 'Ferrari', logo: 'https://www.carlogos.org/car-logos/ferrari-logo-2002.png' }
];

export const WILAYAS = [
  'Toutes les Wilayas',
  'Alger (16)',
  'Oran (31)',
  'Annaba (23)',
  'Blida (09)',
  'Sétif (19)',
  'Constantine (25)'
];

export const BODY_TYPES = [
  { id: 'all', label: 'Tous les Véhicules' },
  { id: 'sedan', label: 'Berline (Sedan)' },
  { id: 'suv', label: 'SUV & 4x4' },
  { id: 'coupe', label: 'Coupé' },
  { id: 'cabriolet', label: 'Cabriolet' },
  { id: 'hatchback', label: 'Compacte' }
];

export const INITIAL_VEHICLES = [
  // ==================== BMW ====================
  {
    id: 101,
    title: 'BMW M4 Competition Coupé M xDrive 510ch',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    mileage: 8500,
    condition: 'occasion',
    bodyType: 'coupe',
    priceMillions: 1650,
    priceDZD: 16500000,
    fuel: 'Essence',
    transmission: 'Automatique M Steptronic',
    drivetrain: 'M xDrive AWD',
    engine: '3.0L Bi-Turbo 6 cylindres 510 ch',
    papers: 'Carte Grise',
    color: 'Jaune Sao Paulo Métallisé',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 99,
    images: [
      '/cars/bmw_m4_competition.jpg'
    ],
    features: [
      'Différentiel Actif M et transmission M xDrive',
      'Sièges baquets M Carbon enveloppants',
      'Freins M Compound céramique étriers or',
      'BMW Live Cockpit Navigation Pro avec Head-Up Display',
      'Échappement sport 4 sorties à clapets actifs'
    ]
  },
  {
    id: 102,
    title: 'BMW X6 M Competition 625ch V8 M xDrive',
    brand: 'BMW',
    model: 'X6 M',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 2400,
    priceDZD: 24000000,
    fuel: 'Essence',
    transmission: 'Automatique M Steptronic 8',
    drivetrain: 'M xDrive 4x4',
    engine: '4.4L V8 M TwinPower Turbo 625 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Noir Carbone Métallisé',
    wilaya: 'Oran (31)',
    showroom: 'Showroom Elite Motors',
    whatsapp: '213555987654',
    phone: '0555 98 76 54',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/bmw_x6_m.jpg'
    ],
    features: [
      'Pack Competition avec jantes forgées 22 pouces',
      'Suspension SelectDrive M Pro active',
      'Système audio Bowers & Wilkins Diamond Surround',
      'Calandre Iconic Glow rétroéclairée',
      'Toit panoramique Sky Lounge à LED'
    ]
  },
  {
    id: 103,
    title: 'BMW Série 5 530d M Sport Berline',
    brand: 'BMW',
    model: 'Série 5',
    year: 2022,
    mileage: 38000,
    condition: 'occasion',
    bodyType: 'sedan',
    priceMillions: 890,
    priceDZD: 8900000,
    fuel: 'Diesel',
    transmission: 'Automatique 8 rapports',
    drivetrain: 'Propulsion RWD',
    engine: '3.0L 6 cylindres TwinPower Turbo 286 ch',
    papers: 'Carte Grise',
    color: 'Bleu Phytonic Métallisé',
    wilaya: 'Annaba (23)',
    showroom: 'Showroom Apex Automobile',
    whatsapp: '213560112233',
    phone: '0560 11 22 33',
    featured: false,
    inspectionScore: 97,
    images: [
      '/cars/bmw_serie_5.jpg'
    ],
    features: [
      'Pack M Sport complet intérieur/extérieur',
      'Phares Laser BMW intelligents haute portée',
      'Climatisation automatique 4 zones',
      'Caméra 360° Surround View avec aide active au stationnement',
      'Sellerie cuir Dakota perforé avec surpiqûres M'
    ]
  },

  // ==================== AUDI ====================
  {
    id: 201,
    title: 'Audi RS6 Avant Performance 4.0 V8 630ch',
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'sedan',
    priceMillions: 3200,
    priceDZD: 32000000,
    fuel: 'Essence',
    transmission: 'Automatique Tiptronic 8',
    drivetrain: 'Quattro AWD',
    engine: '4.0L V8 TFSI Biturbo 630 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Gris Nardo Nacré',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/audi_rs6_avant.jpg'
    ],
    features: [
      'Transmission Quattro permanente avec différentiel sport',
      'Pack dynamique RS plus avec vitesse maxi 305 km/h',
      'Freins céramiques RS avec étriers rouges',
      'Système d\'échappement Sport RS',
      'Affichage tête haute et Bang & Olufsen 3D'
    ]
  },
  {
    id: 202,
    title: 'Audi A8 Limousine 50 TDI Quattro S-Line',
    brand: 'Audi',
    model: 'A8 Limousine',
    year: 2021,
    mileage: 14500,
    condition: 'occasion',
    bodyType: 'sedan',
    priceMillions: 700,
    priceDZD: 7000000,
    fuel: 'Diesel',
    transmission: 'Automatique Tiptronic',
    drivetrain: 'AWD Quattro',
    engine: '3.0 V6 TDI Mild-Hybrid 286 ch',
    papers: 'Carte Grise',
    color: 'Noir Mythic Métallisé',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 97,
    images: [
      '/cars/audi_a8_limousine.jpg'
    ],
    features: [
      'Phares Matrix LED HD avec feux laser',
      'Virtual Cockpit Plus & MMI dual touch',
      'Fermeture assistée des portes Soft-Close',
      'Pack assistance au stationnement 360°',
      'Double vitrage acoustique et isolant'
    ]
  },
  {
    id: 203,
    title: 'Audi Q8 55 TFSI Quattro S-Line 340ch',
    brand: 'Audi',
    model: 'Q8 S-Line',
    year: 2023,
    mileage: 18000,
    condition: 'occasion',
    bodyType: 'suv',
    priceMillions: 1450,
    priceDZD: 14500000,
    fuel: 'Essence',
    transmission: 'Automatique Tiptronic 8',
    drivetrain: 'Quattro 4x4',
    engine: '3.0L V6 Turbo 340 ch',
    papers: 'Carte Grise',
    color: 'Blanc Glacier Métallisé',
    wilaya: 'Oran (31)',
    showroom: 'Showroom Elite Motors',
    whatsapp: '213555987654',
    phone: '0555 98 76 54',
    featured: false,
    inspectionScore: 98,
    images: [
      '/cars/audi_q8_sline.jpg'
    ],
    features: [
      'Pack S-Line Black Edition avec calandre noire',
      'Suspension pneumatique adaptative sport',
      'Jantes Audi Sport 22 pouces forgées',
      'Toit ouvrant panoramique en verre',
      'Sonorisation Bang & Olufsen Premium'
    ]
  },
  {
    id: 204,
    title: 'Audi A4 Berline 35 TDI Design Luxe',
    brand: 'Audi',
    model: 'A4 Berline',
    year: 2020,
    mileage: 72000,
    condition: 'occasion',
    bodyType: 'sedan',
    priceMillions: 230,
    priceDZD: 2300000,
    fuel: 'Diesel',
    transmission: 'Manuelle 6 rapports',
    drivetrain: 'FWD Traction',
    engine: '2.0 TDI Clean Diesel 150 ch',
    papers: 'Carte Grise',
    color: 'Bleu Navarre Métallisé',
    wilaya: 'Blida (09)',
    showroom: 'Showroom Royal Auto',
    whatsapp: '213540445566',
    phone: '0540 44 55 66',
    featured: false,
    inspectionScore: 94,
    images: [
      '/cars/audi_a4_berline.jpg'
    ],
    features: [
      'Régulateur de vitesse adaptatif ACC',
      'Radars avant et arrière avec caméra de recul',
      'Sellerie cuir Milano noir de haute qualité',
      'Accès et démarrage mains libres Keyless-Go',
      'Consommation ultra-économique 4.5L/100km'
    ]
  },

  // ==================== MERCEDES-BENZ ====================
  {
    id: 301,
    title: 'Mercedes-Benz Classe G 63 AMG V8 Biturbo',
    brand: 'Mercedes-Benz',
    model: 'Classe G 63 AMG',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 4600,
    priceDZD: 46000000,
    fuel: 'Essence',
    transmission: 'Automatique AMG SPEEDSHIFT 9G',
    drivetrain: '4MATIC AWD / 3 Blocages',
    engine: '4.0L V8 Biturbo 585 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Noir Mat Magno Designo',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/mercedes_g63_amg.jpg'
    ],
    features: [
      'Échappement latéral Sport AMG à clapets',
      'Pack Nuit AMG II avec optiques teintées',
      'Intérieur cuir Nappa bicolore avec inserts carbone',
      'Châssis AMG Ride Control avec suspension pilotée',
      'Système audio Surround Burmester haut de gamme'
    ]
  },
  {
    id: 302,
    title: 'Mercedes-Benz S-Class Coupé 4MATIC AMG Line',
    brand: 'Mercedes-Benz',
    model: 'S-Class Coupé',
    year: 2021,
    mileage: 18000,
    condition: 'occasion',
    bodyType: 'coupe',
    priceMillions: 760,
    priceDZD: 7600000,
    fuel: 'Diesel',
    transmission: 'Automatique 9G-Tronic',
    drivetrain: '4MATIC AWD',
    engine: '3.0L Inline-6 Turbo 330 ch',
    papers: 'Carte Grise',
    color: 'Argent Iridium Métallisé',
    wilaya: 'Oran (31)',
    showroom: 'Showroom Elite Motors',
    whatsapp: '213555987654',
    phone: '0555 98 76 54',
    featured: true,
    inspectionScore: 98,
    images: [
      '/cars/mercedes_s_coupe.jpg'
    ],
    features: [
      'Pack Sport AMG Line Extérieur & Intérieur',
      'Projecteurs MULTIBEAM LED intelligents',
      'Système audio Burmester High-End 3D',
      'Affichage tête haute couleur Head-Up',
      'Suspension pneumatique AIRMATIC'
    ]
  },
  {
    id: 303,
    title: 'Mercedes-Benz Classe C 200 AMG Line 2023',
    brand: 'Mercedes-Benz',
    model: 'Classe C 200',
    year: 2023,
    mileage: 16000,
    condition: 'occasion',
    bodyType: 'sedan',
    priceMillions: 790,
    priceDZD: 7900000,
    fuel: 'Essence',
    transmission: 'Automatique 9G-Tronic',
    drivetrain: 'Propulsion RWD',
    engine: '1.5L Turbo EQ Boost 204 ch',
    papers: 'Carte Grise',
    color: 'Blanc Polaire',
    wilaya: 'Blida (09)',
    showroom: 'Showroom Royal Auto',
    whatsapp: '213540445566',
    phone: '0540 44 55 66',
    featured: false,
    inspectionScore: 97,
    images: [
      '/cars/mercedes_c200.jpg'
    ],
    features: [
      'Pack AMG Line avec volant cuir méplat',
      'Écran central MBUX 11.9 pouces vertical',
      'Digital Light avec projection d\'animations',
      'Toit ouvrant panoramique électrique',
      'Recharge smartphone à induction sans fil'
    ]
  },

  // ==================== PORSCHE ====================
  {
    id: 401,
    title: 'Porsche 911 (992) GT3 RS PDK 525ch',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'coupe',
    priceMillions: 6200,
    priceDZD: 62000000,
    fuel: 'Essence',
    transmission: 'Automatique PDK 7',
    drivetrain: 'Propulsion RWD',
    engine: '4.0L Boxer 6 cylindres atmosphérique 525 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Blanc Craie avec Pack Weissach',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/porsche_911_gt3_rs.jpg'
    ],
    features: [
      'Aérodynamisme actif DRS avec aileron arrière géant',
      'Pack Weissach avec éléments en fibre de carbone apparente',
      'Arceau de sécurité en titane léger',
      'Système de freinage carbone-céramique PCCB',
      'Roues arrière directrices actives'
    ]
  },
  {
    id: 402,
    title: 'Porsche Macan GTS 2.9 Biturbo 440ch',
    brand: 'Porsche',
    model: 'Macan GTS',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 1350,
    priceDZD: 13500000,
    fuel: 'Essence',
    transmission: 'Automatique PDK 7',
    drivetrain: 'AWD Intégrale',
    engine: '2.9L V6 Biturbo 440 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Noir Vulcain Métallisé',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/porsche_macan_gts.jpg'
    ],
    features: [
      'Pack Chrono Sport Plus avec sélecteur de mode au volant',
      'Suspension pneumatique PASM rabaissée 10 mm',
      'Échappement sport GTS à doubles sorties noires',
      'Pack intérieur GTS avec coutures contrastées Rouge Carmin',
      'Porsche Communication Management (PCM) 10.9 pouces'
    ]
  },
  {
    id: 403,
    title: 'Porsche Cayenne Turbo GT V8 Coupé 640ch',
    brand: 'Porsche',
    model: 'Cayenne Turbo GT',
    year: 2023,
    mileage: 8200,
    condition: 'occasion',
    bodyType: 'suv',
    priceMillions: 3400,
    priceDZD: 34000000,
    fuel: 'Essence',
    transmission: 'Automatique Tiptronic 8',
    drivetrain: 'AWD 4x4',
    engine: '4.0L V8 Biturbo 640 ch',
    papers: 'Carte Grise',
    color: 'Gris Arctique',
    wilaya: 'Oran (31)',
    showroom: 'Showroom Elite Motors',
    whatsapp: '213555987654',
    phone: '0555 98 76 54',
    featured: false,
    inspectionScore: 99,
    images: [
      '/cars/porsche_cayenne_turbo_gt.jpg'
    ],
    features: [
      'Toit en carbone profilé allégé',
      'Système d\'échappement en titane centré sport',
      'Jantes GT Design 22 pouces dorées Neodyme',
      'Intérieur Alcantara étendu avec surpiqûres or',
      'Barres antiroulis actives PDCC électromécaniques'
    ]
  },

  // ==================== VOLKSWAGEN ====================
  {
    id: 501,
    title: 'Volkswagen Golf 8 R 20 Years 4Motion 333ch',
    brand: 'Volkswagen',
    model: 'Golf 8 R',
    year: 2023,
    mileage: 12000,
    condition: 'occasion',
    bodyType: 'hatchback',
    priceMillions: 750,
    priceDZD: 7500000,
    fuel: 'Essence',
    transmission: 'Automatique DSG 7',
    drivetrain: '4Motion AWD avec R-Performance Torque Vectoring',
    engine: '2.0L TSI 333 ch',
    papers: 'Carte Grise',
    color: 'Bleu Lapiz Métallisé',
    wilaya: 'Blida (09)',
    showroom: 'Showroom Royal Auto',
    whatsapp: '213540445566',
    phone: '0540 44 55 66',
    featured: true,
    inspectionScore: 98,
    images: [
      '/cars/volkswagen_golf_8_r.jpg'
    ],
    features: [
      'Pack R-Performance avec modes Drift et Nürburgring',
      'Échappement titane Akrapovic d\'origine',
      'Inserts en véritable carbone sur la planche de bord',
      'Digital Cockpit Pro spécifique R',
      'Vitesse débridée 270 km/h constructeur'
    ]
  },
  {
    id: 502,
    title: 'Volkswagen Touareg R-Line 3.0 V6 TDI 286ch',
    brand: 'Volkswagen',
    model: 'Touareg R-Line',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 1480,
    priceDZD: 14800000,
    fuel: 'Diesel',
    transmission: 'Automatique Tiptronic 8',
    drivetrain: '4Motion 4x4',
    engine: '3.0L V6 TDI 286 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Noir Intense Nacré',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: false,
    inspectionScore: 100,
    images: [
      '/cars/volkswagen_touareg_rline.jpg'
    ],
    features: [
      'Innovision Cockpit avec écran incurvé 15 pouces',
      'Suspension pneumatique 4 roues directrices',
      'Vision nocturne Night Vision avec détection thermique',
      'Phares IQ.Light HD Matrix LED nouvelle génération',
      'Pack R-Line Black Style avec jantes 21 pouces'
    ]
  },
  {
    id: 503,
    title: 'Volkswagen Tiguan R-Line 2.0 TDI 200ch 4Motion',
    brand: 'Volkswagen',
    model: 'Tiguan R-Line',
    year: 2023,
    mileage: 22000,
    condition: 'occasion',
    bodyType: 'suv',
    priceMillions: 620,
    priceDZD: 6200000,
    fuel: 'Diesel',
    transmission: 'Automatique DSG 7',
    drivetrain: '4Motion AWD',
    engine: '2.0L TDI 200 ch',
    papers: 'Carte Grise',
    color: 'Gris Dauphin Métallisé',
    wilaya: 'Oran (31)',
    showroom: 'Showroom Elite Motors',
    whatsapp: '213555987654',
    phone: '0555 98 76 54',
    featured: false,
    inspectionScore: 97,
    images: [
      '/cars/volkswagen_tiguan_rline.jpg'
    ],
    features: [
      'Pack R-Line intérieur avec sièges sport Top-Comfort',
      'Toit ouvrant panoramique coulissant',
      'Éclairage d\'ambiance 30 couleurs personnalisables',
      'Travel Assist avec maintien dans la voie semi-autonome',
      'Hayon électrique Easy Open & Close'
    ]
  },

  // ==================== RANGE ROVER ====================
  {
    id: 601,
    title: 'Range Rover Autobiography LWB P530 V8 2024',
    brand: 'Range Rover',
    model: 'Autobiography LWB',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 3800,
    priceDZD: 38000000,
    fuel: 'Essence',
    transmission: 'Automatique 8 rapports',
    drivetrain: 'Intégrale 4x4 AWD',
    engine: '4.4L V8 Twin Turbo 530 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Vert Belgravia Métallisé',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/range_rover_autobiography.jpg'
    ],
    features: [
      'Empattement long LWB avec sièges Executive Class',
      'Suspension pneumatique électronique prédictive',
      'Portes à fermeture assistée Soft-Close avec ouverture motorisée',
      'Système audio Meridian Signature 1600W à 35 haut-parleurs',
      'Système de filtration d\'air d\'habitacle nanoe X'
    ]
  },
  {
    id: 602,
    title: 'Range Rover Sport Dynamic SE D300 AWD',
    brand: 'Range Rover',
    model: 'Sport Dynamic',
    year: 2023,
    mileage: 14500,
    condition: 'occasion',
    bodyType: 'suv',
    priceMillions: 2150,
    priceDZD: 21500000,
    fuel: 'Diesel',
    transmission: 'Automatique 8 rapports',
    drivetrain: 'Intégrale 4x4',
    engine: '3.0L 6 cylindres Diesel MHEV 300 ch',
    papers: 'Carte Grise',
    color: 'Gris Carpathes Métallisé',
    wilaya: 'Oran (31)',
    showroom: 'Showroom Elite Motors',
    whatsapp: '213555987654',
    phone: '0555 98 76 54',
    featured: false,
    inspectionScore: 98,
    images: [
      '/cars/range_rover_sport.jpg'
    ],
    features: [
      'Pack Dynamic extérieur avec étriers de frein rouges',
      'Écran tactile Pivi Pro 13.1 pouces incurvé',
      'Terrain Response 2 automatique',
      'Toit panoramique ouvrant avec rideau électrique',
      'Rétroviseur intérieur ClearSight à caméra HD'
    ]
  },

  // ==================== JETOUR ====================
  {
    id: 701,
    title: 'Jetour T2 Traveler 2025 Luxury 4x4',
    brand: 'Jetour',
    model: 'T2 Traveler',
    year: 2025,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 720,
    priceDZD: 7200000,
    fuel: 'Essence',
    transmission: 'Automatique',
    drivetrain: '4x4 / AWD X-WD',
    engine: '2.0L Turbo TGDI 254 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Gris Aventure Métallisé',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 100,
    images: [
      '/cars/jetour_t2.jpg'
    ],
    features: [
      'Toit ouvrant panoramique électrique',
      'Caméra 360° vue aérienne 3D transparente',
      'Écran tactile multimédia 15.6 pouces Qualcomm Snapdragon',
      'Modes de conduite tout-terrain X-WD BorgWarner',
      'Sièges en cuir ventilés et chauffants'
    ]
  },
  {
    id: 702,
    title: 'Jetour Dashing 1.6 Turbo Luxury 2024',
    brand: 'Jetour',
    model: 'Dashing',
    year: 2024,
    mileage: 0,
    condition: 'neuf',
    bodyType: 'suv',
    priceMillions: 480,
    priceDZD: 4800000,
    fuel: 'Essence',
    transmission: 'Automatique 7DCT',
    drivetrain: 'Traction FWD',
    engine: '1.6L Turbo TGDI 197 ch',
    papers: 'Carte Grise (00 km)',
    color: 'Bleu Ciel Nacré',
    wilaya: 'Blida (09)',
    showroom: 'Showroom Royal Auto',
    whatsapp: '213540445566',
    phone: '0540 44 55 66',
    featured: false,
    inspectionScore: 100,
    images: [
      '/cars/jetour_dashing.jpg'
    ],
    features: [
      'Design futuriste avec poignées affleurantes rétractables',
      'Cockpit numérique épuré avec écran 12.8 pouces',
      'Chargeur sans fil rapide pour smartphone',
      'Climatisation automatique avec purificateur CN95',
      'Régulateur de vitesse adaptatif ACC'
    ]
  },

  // ==================== FERRARI ====================
  {
    id: 801,
    title: 'Ferrari F8 Tributo V8 Biturbo Rouge Corsa',
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2022,
    mileage: 4500,
    condition: 'occasion',
    bodyType: 'coupe',
    priceMillions: 5200,
    priceDZD: 52000000,
    fuel: 'Essence',
    transmission: 'Automatique F1 Dual-Clutch',
    drivetrain: 'RWD Propulsion',
    engine: '3.9L V8 Biturbo 720 ch',
    papers: 'Carte Grise',
    color: 'Rouge Corsa',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: true,
    inspectionScore: 99,
    images: [
      '/cars/ferrari_f8_tributo.jpg'
    ],
    features: [
      'Châssis monocoque allégé haute performance',
      'Freins carbone céramique Brembo Rosso',
      'Système d’échappement Sport Titane',
      'Suspension adaptative magnétorhéologique SCM-E',
      'Volant Carbone LED F1'
    ]
  },
  {
    id: 802,
    title: 'Ferrari Roma 3.9 V8 Turbo 620ch 2023',
    brand: 'Ferrari',
    model: 'Roma',
    year: 2023,
    mileage: 2900,
    condition: 'occasion',
    bodyType: 'coupe',
    priceMillions: 4800,
    priceDZD: 48000000,
    fuel: 'Essence',
    transmission: 'Automatique F1 Dual-Clutch 8',
    drivetrain: 'RWD Propulsion',
    engine: '3.9L V8 Turbo 620 ch',
    papers: 'Carte Grise',
    color: 'Grigio Silverstone Métallisé',
    wilaya: 'Alger (16)',
    showroom: 'Showroom Auto Prestige',
    whatsapp: '213550123456',
    phone: '0550 12 34 56',
    featured: false,
    inspectionScore: 100,
    images: [
      '/cars/ferrari_roma.jpg'
    ],
    features: [
      'Écran tactile vertical 8.4 pouces & cockpit passager dédié',
      'Manettino à 5 positions au volant',
      'Sellerie cuir Cuoio intégrale avec écussons gaufrés',
      'Caméra 360° et régulateur adaptatif avec Stop&Go',
      'Système d\'échappement Sport actif'
    ]
  }
];

export const AUTO_PRODUCTS = [
  {
    id: 1,
    title: 'Kit Traitement Céramique 9H Pro',
    category: 'Protection Carrosserie',
    price: '18 500 DZD',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80',
    description: 'Protection céramique longue durée anti-rayures et effet déperlant hydrophobe garanti 3 ans.'
  },
  {
    id: 2,
    title: 'Dashcam 4K Dual Av/Ar avec GPS',
    category: 'Sécurité & Électronique',
    price: '24 000 DZD',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    description: 'Enregistrement haute définition vision nocturne, mode parking 24h/24 et connexion WiFi smartphone.'
  },
  {
    id: 3,
    title: 'Pack Tapis 5D Sur Mesure Imperméables',
    category: 'Accessoires Intérieur',
    price: '14 000 DZD',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    description: 'Découpe laser ajustée à votre modèle de véhicule, matière cuir écologique renforcé facile à nettoyer.'
  }
];

export const ORDER_STATUSES = [
  { id: 'all', label: 'Toutes les Demandes', color: '#94A3B8' },
  { id: 'nouveau', label: 'Nouveau', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.18)' },
  { id: 'en_cours', label: 'En Traitement', color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.18)' },
  { id: 'contacte', label: 'Contacté', color: '#A855F7', bg: 'rgba(168, 85, 247, 0.18)' },
  { id: 'valide', label: 'Validé / Conclu', color: '#10B981', bg: 'rgba(16, 185, 129, 0.18)' },
  { id: 'annule', label: 'Annulé', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.18)' }
];

export const INITIAL_ORDERS = [
  {
    id: 'CMD-1048',
    clientName: 'Karim Meziane',
    phone: '0550 44 88 12',
    wilaya: 'Alger (16)',
    vehicleId: 101,
    vehicleTitle: 'BMW M4 Competition Coupé M xDrive 510ch',
    showroom: 'Showroom Auto Prestige',
    type: 'Réservation Immédiate',
    budget: '1650 M',
    status: 'nouveau',
    date: '2026-09-12 09:30',
    message: 'Bonjour, je souhaite réserver le véhicule pour un essai cet après-midi à Chéraga avec chèque de banque certifié.'
  },
  {
    id: 'CMD-1047',
    clientName: 'Amine Benali',
    phone: '0661 23 45 67',
    wilaya: 'Oran (31)',
    vehicleId: 401,
    vehicleTitle: 'Porsche 911 (992) GT3 RS PDK 525ch',
    showroom: 'Showroom Auto Prestige',
    type: 'Demande d\'Achat Comptant',
    budget: '6200 M',
    status: 'en_cours',
    date: '2026-09-11 16:15',
    message: 'Intéressé par la GT3 RS Pack Weissach 00 km. Merci de me contacter sur WhatsApp pour la procédure de livraison sur Oran.'
  },
  {
    id: 'CMD-1046',
    clientName: 'Dr. Sofiane Brahimi',
    phone: '0770 99 11 22',
    wilaya: 'Annaba (23)',
    vehicleId: 201,
    vehicleTitle: 'Audi RS6 Avant Performance 4.0 V8 630ch',
    showroom: 'Showroom Auto Prestige',
    type: 'Offre de Reprise + Soulte',
    budget: '3200 M',
    status: 'contacte',
    date: '2026-09-11 11:40',
    message: 'Proposition de reprise de mon Audi RS4 2021 (45 000 km, carte grise) + paiement du différentiel par virement.'
  },
  {
    id: 'CMD-1045',
    clientName: 'Yacine Belkacem',
    phone: '0541 33 55 77',
    wilaya: 'Blida (09)',
    vehicleId: 501,
    vehicleTitle: 'Volkswagen Golf 8 R 20 Years 4Motion 333ch',
    showroom: 'Showroom Royal Auto',
    type: 'Simulation Financement',
    budget: '750 M',
    status: 'valide',
    date: '2026-09-10 14:20',
    message: 'Dossier de crédit pré-validé. Visite du showroom de Blida effectuée, transaction en cours de finalisation.'
  },
  {
    id: 'CMD-1044',
    clientName: 'Nabil Mansouri',
    phone: '0560 88 77 66',
    wilaya: 'Sétif (19)',
    vehicleId: 701,
    vehicleTitle: 'Jetour T2 Traveler 2025 Luxury 4x4',
    showroom: 'Showroom Auto Prestige',
    type: 'Demande d\'Informations',
    budget: '720 M',
    status: 'nouveau',
    date: '2026-09-10 10:05',
    message: 'Disponibilité des couleurs en stock réel (Gris ou Vert) et délais de remise de la carte grise définitive.'
  }
];

