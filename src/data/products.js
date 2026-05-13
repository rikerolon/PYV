// ========================================
// CATÁLOGO DE PRODUCTOS PYV
// ========================================

export const CATEGORIES = [
  { id: 'plantillas', label: 'Plantillas', icon: '👟' },
  { id: 'antideslizante', label: 'Antideslizante', icon: '🛡️' },
  { id: 'tintes', label: 'Tintes', icon: '🎨' },
  { id: 'esmaltes', label: 'Esmaltes', icon: '✨' },
];

// Tallas para calzado adulto
export const ADULT_SIZES = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
// Tallas para pie pequeño (niños)
export const KIDS_SIZES = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

// Colores para tintes
export const TINT_COLORS = [
  { name: 'Negro', hex: '#000000' },
  { name: 'Blanco', hex: '#FFFFFF', border: true },
  { name: 'Café', hex: '#8B4513' },
  { name: 'Terracota', hex: '#E2725B' },
  { name: 'Vaqueta', hex: '#C4A882' },
  { name: 'Beige', hex: '#F5F5DC', border: true },
  { name: 'Arena', hex: '#C2B280' },
  { name: 'Cordovan', hex: '#814141' },
  { name: 'Vino', hex: '#722F37' },
  { name: 'Rojo', hex: '#FF0000' },
  { name: 'Gris Claro', hex: '#D3D3D3' },
  { name: 'Gris Oscuro', hex: '#696969' },
  { name: 'Azul Rey', hex: '#4169E1' },
  { name: 'Azul Oscuro', hex: '#00008B' },
  { name: 'Turquesa', hex: '#40E0D0' },
  { name: 'Celeste', hex: '#87CEEB' },
  { name: 'Lila', hex: '#C8A2C8' },
  { name: 'Morado', hex: '#800080' },
  { name: 'Amarillo', hex: '#FFFF00', border: true },
  { name: 'Verde Musgo', hex: '#8A9A5B' },
  { name: 'Verde', hex: '#008000' },
  { name: 'Rosado Claro', hex: '#FFB6C1' },
  { name: 'Rosado Fuerte', hex: '#FF69B4' },
  { name: 'Fucsia', hex: '#FF00FF' },
];

// Colores para esmaltes
export const ENAMEL_COLORS = [
  { name: 'Negro', hex: '#000000' },
  { name: 'Café', hex: '#8B4513' },
];

// ========================================
// PRODUCTOS
// ========================================
export const PRODUCTS = [
  // --- PLANTILLAS ---
  {
    id: 1,
    slug: 'plantilla-perforada',
    name: 'Plantilla para Calzado Perforada',
    category: 'plantillas',
    price: 8500,
    originalPrice: 12000,
    description: 'Plantilla ortopédica perforada de alta calidad. Diseñada para máxima ventilación y confort durante todo el día. Fabricada con materiales premium que absorben el impacto y reducen la fatiga.',
    features: ['Alta ventilación', 'Absorción de impacto', 'Antibacterial', 'Lavable'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    ],
    variants: {
      type: 'size',
      sizes: ADULT_SIZES,
    },
    badge: 'Más vendido',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    slug: 'plantilla-tenis',
    name: 'Plantilla de Tenis',
    category: 'plantillas',
    price: 9500,
    originalPrice: null,
    description: 'Plantilla especializada para calzado deportivo y de tenis. Proporciona soporte de arco superior y amortiguación para actividad física intensa. Tecnología de espuma de memoria que se adapta a tu pie.',
    features: ['Soporte de arco', 'Memoria de forma', 'Anti-fatiga', 'Para uso deportivo'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    ],
    variants: {
      type: 'size',
      sizes: ADULT_SIZES,
    },
    badge: null,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    slug: 'plantilla-negra',
    name: 'Plantilla Negra',
    category: 'plantillas',
    price: 6500,
    originalPrice: 8000,
    description: 'Plantilla negra versátil disponible en tallas para pie pequeño y pie grande. Material de alta densidad que se mantiene firme y proporciona soporte constante. Ideal para uso diario.',
    features: ['Doble rango de tallas', 'Alta densidad', 'Uso diario', 'Color negro elegante'],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    ],
    variants: {
      type: 'size-dual',
      sizeGroups: [
        { label: 'Pie Pequeño', sizes: KIDS_SIZES },
        { label: 'Pie Grande', sizes: ADULT_SIZES },
      ],
    },
    badge: 'Oferta',
    rating: 4.5,
    reviews: 67,
  },

  // --- ANTIDESLIZANTE ---
  {
    id: 4,
    slug: 'antideslizante',
    name: 'Antideslizante para Calzado',
    category: 'antideslizante',
    price: 7000,
    originalPrice: null,
    description: 'Protector antideslizante de alta resistencia para la suela de tu calzado. Aumenta la tracción en superficies lisas y húmedas. Fácil aplicación y larga durabilidad.',
    features: ['Alta tracción', 'Resistente al agua', 'Fácil aplicación', 'Talla única'],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    ],
    variants: {
      type: 'none',
    },
    badge: 'Nuevo',
    rating: 4.7,
    reviews: 43,
  },

  // --- TINTES ---
  {
    id: 5,
    slug: 'tinte-calzado',
    name: 'Tinte para Calzado',
    category: 'tintes',
    price: 15000,
    originalPrice: 18000,
    description: 'Tinte profesional para calzado de cuero y materiales sintéticos. Fórmula de larga duración que penetra profundamente en el material para un acabado uniforme y brillante. Resistente al agua y al desgaste.',
    features: ['24 colores disponibles', 'Larga duración', 'Resistente al agua', 'Para cuero y sintético'],
    images: [
      'https://images.unsplash.com/photo-1558171813-0776d2589d1f?w=600&q=80',
      'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&q=80',
    ],
    variants: {
      type: 'color',
      colors: TINT_COLORS,
    },
    badge: '24 colores',
    rating: 4.9,
    reviews: 201,
  },

  // --- ESMALTES ---
  {
    id: 6,
    slug: 'esmalte-calzado',
    name: 'Esmalte para Calzado',
    category: 'esmaltes',
    price: 12000,
    originalPrice: null,
    description: 'Esmalte de alta calidad para restaurar y proteger el calzado. Proporciona un acabado brillante y uniforme que protege contra la humedad y el desgaste diario. Fórmula de secado rápido.',
    features: ['Acabado brillante', 'Secado rápido', 'Protección UV', 'Aplicación fácil'],
    images: [
      'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&q=80',
      'https://images.unsplash.com/photo-1558171813-0776d2589d1f?w=600&q=80',
    ],
    variants: {
      type: 'color',
      colors: ENAMEL_COLORS,
    },
    badge: null,
    rating: 4.4,
    reviews: 58,
  },
];

// Formatea precio en COP
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Obtiene productos por categoría
export const getProductsByCategory = (categoryId) => {
  return PRODUCTS.filter(p => p.category === categoryId);
};

// Obtiene producto por ID
export const getProductById = (id) => {
  return PRODUCTS.find(p => p.id === Number(id));
};

// Obtiene producto por slug
export const getProductBySlug = (slug) => {
  return PRODUCTS.find(p => p.slug === slug);
};
