// ========================================
// NAVBAR — Componente principal de navegación
// ========================================
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore(s => s.items);
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const { user, signInWithGoogle, logout } = useAuth();

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos' },
    { to: '/productos?cat=plantillas', label: 'Plantillas' },
    { to: '/productos?cat=tintes', label: 'Tintes' },
  ];

  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
      {/* Top bar */}
      <div className="bg-brand-black text-white text-xs text-center py-1.5 tracking-widest uppercase">
        Envíos a todo el país · <span className="text-brand-yellow">Calidad garantizada</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1.5 group">
            <div className="w-9 h-9 bg-brand-black flex items-center justify-center relative overflow-hidden">
              <span className="font-display text-white text-lg leading-none">PYV</span>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-yellow group-hover:h-2 transition-all duration-200" />
            </div>
            <span className="font-display text-xl text-brand-black tracking-widest hidden sm:block">PYV</span>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Buscador */}
          <div className="flex-1 max-w-xs hidden sm:block">
            <SearchBar />
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            {/* Carrito */}
            <Link to="/carrito" className="relative p-2 hover:bg-gray-50 rounded-sm transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="badge-cart animate-bounce-sm">{itemCount > 9 ? '9+' : itemCount}</span>
              )}
            </Link>

            {/* Usuario */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-sm transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 bg-brand-red flex items-center justify-center rounded-full">
                      <span className="text-white text-xs font-bold">
                        {user.displayName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg w-48 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Sesión iniciada como</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-sm text-brand-red hover:bg-gray-50 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="hidden sm:flex items-center gap-2 border border-gray-200 px-3 py-1.5 text-sm font-medium hover:border-brand-red hover:text-brand-red transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Ingresar
              </button>
            )}

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-50 rounded-sm transition-colors"
              aria-label="Abrir menú"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-brand-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-brand-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-brand-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Buscador mobile */}
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>
      </nav>

      {/* Menú mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="block py-3 border-b border-gray-50 font-medium text-gray-700 hover:text-brand-red transition-colors"
              >
                {l.label}
              </Link>
            ))}
            {!user && (
              <button
                onClick={signInWithGoogle}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-200 py-3 text-sm font-medium hover:border-brand-red hover:text-brand-red transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Iniciar sesión con Google
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
