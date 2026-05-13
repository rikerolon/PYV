// ========================================
// PÁGINA DE CHECKOUT
// ========================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../context/CartContext';
import { formatPrice } from '../data/products';
import { useToast } from '../components/Toast';

const SHIPPING = 8000;

const PAYMENT_METHODS = [
  { id: 'card', label: 'Tarjeta de crédito/débito', icon: '💳' },
  { id: 'pse', label: 'PSE', icon: '🏦' },
  { id: 'cash', label: 'Efectivo (Efecty/Baloto)', icon: '💵' },
  { id: 'transfer', label: 'Transferencia bancaria', icon: '📲' },
];

const DEPARTMENTS = ['Bogotá D.C.', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Cundinamarca', 'Santander', 'Bolívar', 'Nariño', 'Córdoba', 'Tolima', 'Otro'];

const Checkout = () => {
  const items = useCartStore(s => s.items);
  const clearCart = useCartStore(s => s.clearCart);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: envío, 2: pago, 3: confirmación
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', department: '', zip: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const total = subtotal + SHIPPING;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nombre requerido';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
    if (!form.phone.trim()) e.phone = 'Teléfono requerido';
    if (!form.address.trim()) e.address = 'Dirección requerida';
    if (!form.city.trim()) e.city = 'Ciudad requerida';
    if (!form.department) e.department = 'Departamento requerido';
    return e;
  };

  const handleField = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  const handleContinue = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      addToast({ message: 'Por favor completa todos los campos', type: 'error' });
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      addToast({ message: 'Selecciona un método de pago', type: 'warning' });
      return;
    }
    setConfirmed(true);
    setStep(3);
    clearCart();
    window.scrollTo(0, 0);
  };

  // ===== CONFIRMACIÓN =====
  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 flex items-center justify-center mx-auto mb-6 rounded-full">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-5xl text-brand-black mb-3">¡PEDIDO CONFIRMADO!</h1>
        <p className="text-gray-500 mb-2">
          Gracias por tu compra, <strong>{form.name.split(' ')[0]}</strong>.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Recibirás la confirmación a <strong>{form.email}</strong> pronto.
        </p>
        <div className="bg-gray-50 border border-gray-100 p-6 mb-8 text-left">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500">Resumen del pedido</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Método de pago</span>
              <span>{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span>Dirección de envío</span>
              <span className="text-right max-w-[200px]">{form.address}, {form.city}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2 text-gray-800">
              <span>Total</span>
              <span className="text-brand-red">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Cabecera */}
      <div className="mb-8">
        <p className="text-brand-red text-xs tracking-[0.3em] uppercase font-semibold mb-1">Finalizar</p>
        <h1 className="section-title">CHECKOUT</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-10">
        {['Envío', 'Pago', 'Confirmación'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${step === i+1 ? 'text-brand-red' : step > i+1 ? 'text-green-600' : 'text-gray-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step > i+1 ? 'border-green-600 bg-green-600 text-white' :
                step === i+1 ? 'border-brand-red text-brand-red' : 'border-gray-300 text-gray-400'
              }`}>
                {step > i+1 ? '✓' : i+1}
              </span>
              {s}
            </div>
            {i < 2 && <div className={`flex-1 h-px w-8 ${step > i+1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Formulario */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white border border-gray-100 p-6 sm:p-8">
              <h2 className="font-display text-xl tracking-widest mb-6">DATOS DE ENVÍO</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Nombre completo *</label>
                  <input name="name" value={form.name} onChange={handleField} placeholder="Juan García" className={`input-base w-full ${errors.name ? 'border-brand-red' : ''}`} />
                  {errors.name && <p className="text-xs text-brand-red mt-1">{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleField} placeholder="juan@email.com" className={`input-base w-full ${errors.email ? 'border-brand-red' : ''}`} />
                  {errors.email && <p className="text-xs text-brand-red mt-1">{errors.email}</p>}
                </div>
                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Teléfono *</label>
                  <input name="phone" value={form.phone} onChange={handleField} placeholder="+57 300 000 0000" className={`input-base w-full ${errors.phone ? 'border-brand-red' : ''}`} />
                  {errors.phone && <p className="text-xs text-brand-red mt-1">{errors.phone}</p>}
                </div>
                {/* Dirección */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Dirección *</label>
                  <input name="address" value={form.address} onChange={handleField} placeholder="Calle 123 # 45-67" className={`input-base w-full ${errors.address ? 'border-brand-red' : ''}`} />
                  {errors.address && <p className="text-xs text-brand-red mt-1">{errors.address}</p>}
                </div>
                {/* Ciudad */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Ciudad *</label>
                  <input name="city" value={form.city} onChange={handleField} placeholder="Bogotá" className={`input-base w-full ${errors.city ? 'border-brand-red' : ''}`} />
                  {errors.city && <p className="text-xs text-brand-red mt-1">{errors.city}</p>}
                </div>
                {/* Departamento */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Departamento *</label>
                  <select name="department" value={form.department} onChange={handleField} className={`input-base w-full ${errors.department ? 'border-brand-red' : ''}`}>
                    <option value="">Seleccionar...</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.department && <p className="text-xs text-brand-red mt-1">{errors.department}</p>}
                </div>
                {/* Notas */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Notas de entrega (opcional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleField} rows={2} placeholder="Instrucciones especiales para el envío..." className="input-base w-full resize-none" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={handleContinue} className="btn-primary px-10 py-3.5">
                  Continuar al pago →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-gray-100 p-6 sm:p-8">
              <h2 className="font-display text-xl tracking-widest mb-6">MÉTODO DE PAGO</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`w-full flex items-center gap-4 p-4 border-2 transition-all text-left ${
                      paymentMethod === m.id
                        ? 'border-brand-red bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="font-medium text-gray-800">{m.label}</span>
                    {paymentMethod === m.id && (
                      <svg className="w-4 h-4 text-brand-red ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-brand-yellow/30 text-sm text-gray-600">
                <strong className="text-brand-black">Nota:</strong> Esta es una implementación de demostración. Los pagos son simulados.
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="btn-secondary px-6 py-3">
                  ← Volver
                </button>
                <button onClick={handleConfirm} className="btn-primary px-10 py-3.5">
                  Confirmar compra →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 p-6 sticky top-24">
            <h2 className="font-display text-xl tracking-widest mb-5 border-b border-gray-100 pb-4">TU PEDIDO</h2>
            <div className="space-y-3 mb-5">
              {items.map(item => (
                <div key={item.key} className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.product.name}</p>
                    {item.variant && (
                      <p className="text-xs text-gray-400">{item.variant.type === 'size' ? `Talla ${item.variant.value}` : item.variant.value}</p>
                    )}
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <span className="text-xs font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>{formatPrice(SHIPPING)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-brand-red">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
