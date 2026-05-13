# PYV — Tienda de Calzado

Tienda en línea para cuidado y accesorios de calzado.  
Plantillas · Tintes · Esmaltes · Antideslizantes

---

## 🚀 Instalación y configuración

### 1. Instalar dependencias

```bash
cd pyv-store
npm install
```

### 2. Configurar Firebase (autenticación Google)

Edita el archivo `src/context/AuthContext.jsx` y reemplaza los valores de `firebaseConfig`:

```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};
```

> **Sin Firebase**: La app funciona en modo demo. El login simulará un usuario de demostración.

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

### 4. Build para producción

```bash
npm run build
npm run preview
```

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx          # Barra de navegación con búsqueda y carrito
│   ├── Footer.jsx          # Pie de página
│   ├── ProductCard.jsx     # Tarjeta de producto
│   ├── SizeSelector.jsx    # Selector de talla (simple y dual)
│   ├── ColorSelector.jsx   # Selector de color con swatches
│   ├── CartItem.jsx        # Item en el carrito
│   ├── SearchBar.jsx       # Buscador con autocompletado
│   ├── FilterPanel.jsx     # Panel de filtros lateral/colapsable
│   ├── GoogleLoginButton.jsx
│   └── Toast.jsx           # Notificaciones toast
├── pages/
│   ├── Home.jsx            # Página principal con hero y featured
│   ├── Products.jsx        # Catálogo con filtros y búsqueda
│   ├── ProductDetail.jsx   # Detalle de producto con galería
│   ├── Cart.jsx            # Carrito de compras
│   ├── Checkout.jsx        # Proceso de pago en pasos
│   └── Login.jsx           # Inicio de sesión con Google
├── context/
│   ├── CartContext.jsx     # Zustand store para el carrito (persistido en localStorage)
│   └── AuthContext.jsx     # Firebase Auth context
├── data/
│   └── products.js         # Catálogo completo de productos
├── App.jsx                 # Rutas y layout
├── main.jsx
└── index.css               # Estilos globales + Tailwind
```

---

## 🎨 Colores de marca

| Color | Hex | Uso |
|-------|-----|-----|
| Amarillo | `#FFD700` | Highlights, badges, accents |
| Rojo | `#DC2626` | CTAs, acciones principales |
| Negro | `#1A1A1A` | Base, header, textos |

---

## 📦 Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 18+ | Framework UI |
| react-router-dom | 6+ | Routing |
| zustand | 4+ | Estado global del carrito |
| firebase | 10+ | Autenticación Google |
| axios | 1+ | Peticiones HTTP |
| tailwindcss | 3+ | Estilos |

---

## 🛒 Funcionalidades

- ✅ Hero section con diseño premium
- ✅ Catálogo con 6 productos en 4 categorías
- ✅ Filtros por categoría y precio
- ✅ Búsqueda en tiempo real con autocompletado
- ✅ Selector de talla (simple, dual para pie pequeño/grande)
- ✅ Selector de color con swatches visuales (24 colores para tintes)
- ✅ Galería de imágenes con zoom
- ✅ Carrito persistido en localStorage (Zustand)
- ✅ Checkout en 2 pasos + pantalla de confirmación
- ✅ Toast notifications
- ✅ Autenticación Google (Firebase)
- ✅ Diseño 100% responsive
- ✅ Menú hamburguesa en mobile

---

## 🔧 Personalización

### Agregar productos
Edita `src/data/products.js` y añade objetos al array `PRODUCTS`.

### Cambiar imágenes
Reemplaza las URLs de Unsplash en `product.images[]` con URLs reales.

### Colores de marca
Edita `tailwind.config.js` en la sección `colors.brand`.
