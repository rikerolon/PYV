// ========================================
// PÁGINA DE DETALLE DE PRODUCTO
// ========================================
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, getProductById, formatPrice } from '../data/products';
import SizeSelector, { DualSizeSelector } from '../components/SizeSelector';
import ColorSelector from '../components/ColorSelector';
import ProductCard from '../components/ProductCard';
import useCartStore from '../context/CartContext';
import { useToast } from '../components/Toast';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const addItem = useCartStore(s => s.addItem);
  const { addToast } = useToast();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="font-display text-4xl text-gray-300 mb-4">PRODUCTO NO ENCONTRADO</p>
        <Link to="/productos" className="btn-primary">Ver productos</Link>
      </div>
    );
  }

  // Validar variante requerida antes de añadir al carrito
  const canAdd = () => {
    if (product.variants.type === 'none') return true;
    if (product.variants.type === 'size' || product.variants.type === 'size-dual') return !!selectedSize;
    if (product.variants.type === 'color') return !!selectedColor;
    return false;
  };

  const buildVariant = () => {
    if (product.variants.type === 'none') return null;
    if (product.variants.type === 'size' || product.variants.type === 'size-dual') {
      return { type: 'size', value: selectedSize };
    }
    if (product.variants.type === 'color') {
      return { type: 'color', value: selectedColor.name, colorHex: selectedColor.hex };
    }
    return null;
  };

  const handleAddToCart = () => {
    if (!canAdd()) {
      addToast({ message: 'Por favor selecciona una opción', type: 'warning' });
      return;
    }
    addItem(product, buildVariant(), quantity);
    addToast({ message: `${product.name} añadido al carrito`, type: 'success' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Productos relacionados (misma categoría, distinto ID)
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link to="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/productos" className="hover:text-gray-700 transition-colors">Productos</Link>
        <span>/</span>
        <Link to={`/productos?cat=${product.category}`} className="hover:text-gray-700 capitalize transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ===== GALERÍA ===== */}
        <div>
          {/* Imagen principal */}
          <div
            className={`relative aspect-square bg-gray-100 cursor-zoom-in overflow-hidden mb-3 ${zoom ? 'cursor-zoom-out' : ''}`}
            onClick={() => setZoom(!zoom)}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? 'scale-150' : 'scale-100'}`}
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-brand-red text-white text-xs px-2 py-1 font-semibold uppercase tracking-wide">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-3 right-3 bg-brand-yellow text-brand-black text-xs px-2 py-1 font-bold">
                -{discount}%
              </span>
            )}
            <span className="absolute bottom-3 right-3 text-xs text-white/70 bg-black/30 px-2 py-1">
              Click para zoom
            </span>
          </div>
          {/* Miniaturas */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImage(i); setZoom(false); }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-brand-red' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Vista ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===== DETALLE ===== */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-black leading-tight mb-4">
            {product.name.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} · {product.reviews} reseñas</span>
          </div>

          {/* Precio */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-4xl text-brand-black">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-brand-yellow text-brand-black text-xs font-bold px-2 py-0.5">-{discount}%</span>
              </>
            )}
          </div>

          <div className="h-px bg-gray-100 mb-6" />

          {/* Selector de variante */}
          <div className="mb-6">
            {product.variants.type === 'size' && (
              <SizeSelector
                sizes={product.variants.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            )}
            {product.variants.type === 'size-dual' && (
              <DualSizeSelector
                sizeGroups={product.variants.sizeGroups}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            )}
            {product.variants.type === 'color' && (
              <ColorSelector
                colors={product.variants.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            )}
            {product.variants.type === 'none' && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                Talla única — disponible
              </div>
            )}
          </div>

          {/* Cantidad */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Cantidad</p>
            <div className="flex items-center border border-gray-200 w-fit">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-200 flex items-center justify-center gap-2
                ${added
                  ? 'bg-green-600 text-white'
                  : 'btn-primary'
                }`}
            >
              {added ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Añadido
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Añadir al carrito
                </>
              )}
            </button>
            <Link to="/carrito" className="btn-secondary py-4 px-5">
              Ver carrito
            </Link>
          </div>

          {/* Características */}
          <div className="border border-gray-100 p-4 mb-6">
            <h3 className="font-display text-base tracking-widest mb-3">CARACTERÍSTICAS</h3>
            <ul className="space-y-2">
              {product.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-display text-base tracking-widest mb-2">DESCRIPCIÓN</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* ===== PRODUCTOS RELACIONADOS ===== */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-title mb-8">RELACIONADOS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
