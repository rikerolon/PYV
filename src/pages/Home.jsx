// ========================================
// PÁGINA DE INICIO
// ========================================
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featured = PRODUCTS.filter(p => p.badge);
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] bg-brand-black flex items-center overflow-hidden">
        {/* Fondo con patrón */}
        <div className="absolute inset-0 opacity-10 stripe-accent" />
        {/* Acento visual amarillo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-brand-yellow/5" />
        {/* Línea decorativa */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Copy */}
          <div>
            <p className="text-brand-yellow text-sm tracking-[0.3em] uppercase font-semibold mb-4">
              Tienda especializada
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-6">
              CUIDA TU
              <span className="block text-brand-yellow">CALZADO</span>
              <span className="block text-brand-red">AL MÁXIMO</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
              Plantillas, tintes, esmaltes y protectores antideslizantes. Todo lo que tu calzado necesita.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/productos" className="btn-yellow">
                Ver productos
              </Link>
              <Link to="/productos?cat=tintes" className="btn-secondary border-gray-600 text-gray-300 hover:bg-white hover:text-brand-black">
                Ver tintes
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-800">
              {[
                { num: '500+', label: 'Clientes felices' },
                { num: '6', label: 'Productos premium' },
                { num: '24', label: 'Colores de tinte' },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-display text-2xl text-brand-yellow">{s.num}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen hero */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-4 bg-brand-yellow/10 rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80"
                alt="Calzado PYV"
                className="relative w-full h-full object-cover"
              />
              {/* Badge flotante */}
              <div className="absolute -bottom-4 -left-4 bg-brand-red text-white px-5 py-3">
                <p className="font-display text-sm tracking-widest">CALIDAD</p>
                <p className="font-display text-xl">GARANTIZADA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== CATEGORÍAS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-red text-xs tracking-[0.3em] uppercase font-semibold mb-2">Explorar</p>
            <h2 className="section-title">CATEGORÍAS</h2>
          </div>
          <Link to="/productos" className="text-sm text-gray-400 hover:text-brand-red transition-colors underline">
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const colors = [
              'bg-brand-black text-white',
              'bg-brand-yellow text-brand-black',
              'bg-brand-red text-white',
              'bg-gray-100 text-brand-black',
            ];
            return (
              <Link
                key={cat.id}
                to={`/productos?cat=${cat.id}`}
                className={`
                  ${colors[i]} p-6 flex flex-col gap-3
                  hover:scale-105 transition-transform duration-200 group
                `}
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <p className="font-display text-xl tracking-wide">{cat.label.toUpperCase()}</p>
                  <p className="text-xs opacity-60 mt-1 group-hover:opacity-100 transition-opacity">
                    {PRODUCTS.filter(p => p.category === cat.id).length} productos
                  </p>
                </div>
                <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== PRODUCTOS DESTACADOS ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-red text-xs tracking-[0.3em] uppercase font-semibold mb-2">Selección</p>
              <h2 className="section-title">MÁS VENDIDOS</h2>
            </div>
            <Link to="/productos" className="text-sm text-gray-400 hover:text-brand-red transition-colors underline">
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANNER TINTES ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-brand-black relative overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-brand-yellow/10" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow to-brand-red" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-10 md:p-16">
            <div>
              <p className="text-brand-yellow text-xs tracking-[0.3em] uppercase font-semibold mb-3">24 colores disponibles</p>
              <h2 className="font-display text-4xl sm:text-5xl text-white leading-none mb-4">
                TINTES<br />PROFESIONALES
              </h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Renueva o cambia el color de tu calzado con nuestra línea de tintes de alta calidad.
                Resistentes al agua y de larga duración.
              </p>
              <Link to="/producto/5" className="btn-yellow">
                Explorar colores →
              </Link>
            </div>
            {/* Muestra de colores */}
            <div className="flex flex-wrap gap-2 max-w-xs">
              {['#000000','#FF0000','#4169E1','#8B4513','#722F37','#008000','#FFD700','#FF69B4','#40E0D0','#800080','#C2B280','#FFFFFF','#E2725B','#C8A2C8','#696969','#FF00FF'].map(hex => (
                <div
                  key={hex}
                  className="w-8 h-8 rounded-full border-2 border-white/10 hover:scale-125 transition-transform"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300 font-bold">
                +8
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GARANTÍA ===== */}
      <section className="bg-brand-yellow/10 border-y border-brand-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: '🚚', title: 'Envío nacional', desc: 'Enviamos a todo el país con entrega rápida.' },
            { icon: '⭐', title: 'Calidad premium', desc: 'Productos seleccionados con los mejores materiales.' },
            { icon: '🔒', title: 'Compra segura', desc: 'Tu información protegida en todo momento.' },
          ].map(item => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-display text-xl tracking-wide">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
