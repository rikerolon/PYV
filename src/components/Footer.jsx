// ========================================
// FOOTER
// ========================================
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-white mt-20">
      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-yellow via-brand-red to-brand-yellow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Marca */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <span className="font-display text-brand-black text-xl">PYV</span>
            </div>
            <span className="font-display text-2xl tracking-widest text-white">PYV</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tu tienda especializada en cuidado y accesorios para calzado. Calidad garantizada en cada producto.
          </p>
          {/* Redes sociales */}
          <div className="flex gap-3 mt-5">
            {['Facebook', 'Instagram', 'WhatsApp'].map(red => (
              <a
                key={red}
                href="#"
                className="w-8 h-8 border border-gray-600 flex items-center justify-center hover:border-brand-yellow hover:text-brand-yellow transition-colors text-gray-400 text-xs font-bold"
                aria-label={red}
              >
                {red[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Productos */}
        <div>
          <h4 className="font-display text-lg text-brand-yellow tracking-widest mb-4">Categorías</h4>
          <ul className="space-y-2.5">
            {[
              { to: '/productos?cat=plantillas', label: 'Plantillas' },
              { to: '/productos?cat=antideslizante', label: 'Antideslizante' },
              { to: '/productos?cat=tintes', label: 'Tintes' },
              { to: '/productos?cat=esmaltes', label: 'Esmaltes' },
              { to: '/productos', label: 'Todos los productos' },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-gray-400 text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Información */}
        <div>
          <h4 className="font-display text-lg text-brand-yellow tracking-widest mb-4">Información</h4>
          <ul className="space-y-2.5">
            {[
              'Política de envíos',
              'Devoluciones',
              'Preguntas frecuentes',
              'Términos y condiciones',
              'Política de privacidad',
            ].map(item => (
              <li key={item}>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-display text-lg text-brand-yellow tracking-widest mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-brand-yellow mt-0.5">📍</span>
              <span>Tu ciudad, Colombia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-yellow mt-0.5">📱</span>
              <span>+57 300 000 0000</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-yellow mt-0.5">✉️</span>
              <span>info@pyv.com.co</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-yellow mt-0.5">🕐</span>
              <span>Lun–Sáb: 8am – 6pm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-500 text-xs">
          <span>© {new Date().getFullYear()} PYV — Todos los derechos reservados</span>
          <span>Hecho con ❤️ en Colombia</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
