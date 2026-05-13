// ========================================
// PÁGINA DEL CARRITO
// ========================================
import { Link } from 'react-router-dom';
import useCartStore from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../data/products';

const SHIPPING = 8000;

const Cart = () => {
  const items = useCartStore(s => s.items);
  const clearCart = useCartStore(s => s.clearCart);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = items.length > 0 ? SHIPPING : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-display text-5xl text-gray-300 mb-4">CARRITO VACÍO</h1>
        <p className="text-gray-400 mb-8">Todavía no has añadido productos a tu carrito.</p>
        <Link to="/productos" className="btn-primary">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-brand-red text-xs tracking-[0.3em] uppercase font-semibold mb-1">Tu selección</p>
          <h1 className="section-title">CARRITO</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-brand-red transition-colors underline"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Lista de items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 p-4 sm:p-6">
            {items.map(item => (
              <CartItem key={item.key} item={item} />
            ))}
          </div>

          {/* Continuar comprando */}
          <div className="mt-4">
            <Link to="/productos" className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-red transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continuar comprando
            </Link>
          </div>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 p-6 sticky top-24">
            <h2 className="font-display text-xl tracking-widest mb-5 border-b border-gray-100 pb-4">RESUMEN</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío estimado</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-brand-red">{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link to="/checkout" className="btn-primary w-full py-4 flex items-center justify-center text-center">
              Proceder al pago →
            </Link>

            {/* Garantías */}
            <div className="mt-5 space-y-2">
              {[
                '🔒 Compra 100% segura',
                '🚚 Envío a todo el país',
                '↩️ Devoluciones disponibles',
              ].map(g => (
                <p key={g} className="text-xs text-gray-400 flex items-center gap-1">{g}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
