// ========================================
// PÁGINA DE INICIO DE SESIÓN
// ========================================
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirige
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-gray-100 p-10 shadow-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-black flex items-center justify-center mx-auto mb-3 relative overflow-hidden">
              <span className="font-display text-white text-2xl">PYV</span>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-yellow" />
            </div>
            <h1 className="font-display text-3xl tracking-widest text-brand-black">BIENVENIDO</h1>
            <p className="text-gray-400 text-sm mt-1">Inicia sesión para continuar</p>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="h-px bg-gray-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-400">
              Iniciar sesión
            </span>
          </div>

          {/* Google Button */}
          <GoogleLoginButton fullWidth />

          {/* Beneficios */}
          <div className="mt-8 space-y-3">
            {[
              { icon: '📦', text: 'Historial de pedidos' },
              { icon: '❤️', text: 'Lista de favoritos' },
              { icon: '⚡', text: 'Checkout más rápido' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-3 text-sm text-gray-500">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-300 text-center mt-8 leading-relaxed">
            Al iniciar sesión aceptas nuestros{' '}
            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">Términos de uso</a>
            {' '}y{' '}
            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">Política de privacidad</a>.
          </p>
        </div>

        {/* Volver */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-400 hover:text-brand-red transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
