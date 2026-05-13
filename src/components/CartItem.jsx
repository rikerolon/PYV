// ========================================
// ITEM EN EL CARRITO
// ========================================
import { formatPrice } from '../data/products';
import useCartStore from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, variant, quantity, key } = item;

  const variantLabel = () => {
    if (!variant) return null;
    if (variant.type === 'size') return `Talla: ${variant.value}`;
    if (variant.type === 'color') return `Color: ${variant.value}`;
    return null;
  };

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0 animate-fade-in">
      {/* Imagen */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm leading-tight">{product.name}</h4>
            {variantLabel() && (
              <p className="text-xs text-gray-400 mt-0.5">{variantLabel()}</p>
            )}
            {variant?.colorHex && (
              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className="w-3 h-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: variant.colorHex }}
                />
                <span className="text-xs text-gray-400">{variant.value}</span>
              </div>
            )}
          </div>
          {/* Eliminar */}
          <button
            onClick={() => removeItem(key)}
            className="text-gray-300 hover:text-brand-red transition-colors flex-shrink-0"
            aria-label="Eliminar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cantidad y precio */}
        <div className="flex items-center justify-between mt-3">
          {/* Controles de cantidad */}
          <div className="flex items-center border border-gray-200">
            <button
              onClick={() => updateQuantity(key, quantity - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => updateQuantity(key, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 font-bold"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="font-bold text-gray-900">{formatPrice(product.price * quantity)}</p>
            {quantity > 1 && (
              <p className="text-xs text-gray-400">{formatPrice(product.price)} c/u</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
