// ========================================
// CARD DE PRODUCTO
// ========================================
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import useCartStore from '../context/CartContext';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
  const addItem = useCartStore(s => s.addItem);
  const { addToast } = useToast();

  // Solo permite agregar directamente si no necesita variante
  const canAddDirectly = product.variants.type === 'none';

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita navegar a detalle
    if (canAddDirectly) {
      addItem(product);
      addToast({ message: `${product.name} añadido al carrito`, type: 'success' });
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/producto/${product.id}`} className="card-product block group">
      {/* Imagen */}
      <div className="relative img-zoom aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-brand-red text-white text-xs px-2 py-0.5 font-semibold uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-brand-yellow text-brand-black text-xs px-2 py-0.5 font-bold uppercase tracking-wide">
              -{discount}%
            </span>
          )}
        </div>

        {/* Overlay rápido */}
        <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          {canAddDirectly ? (
            <button
              onClick={handleAddToCart}
              className="btn-primary text-xs px-4 py-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
            >
              + Añadir
            </button>
          ) : (
            <span className="bg-white text-brand-black text-xs px-4 py-2 font-semibold uppercase tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              Ver opciones
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-200 fill-gray-200'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        {/* Precio */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
