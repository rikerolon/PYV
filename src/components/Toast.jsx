// ========================================
// TOAST / NOTIFICACIONES
// ========================================
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  const colors = {
    success: 'bg-brand-black border-l-4 border-brand-yellow',
    error: 'bg-brand-red border-l-4 border-white',
    info: 'bg-brand-black border-l-4 border-blue-400',
    warning: 'bg-yellow-500 border-l-4 border-brand-black',
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              ${colors[toast.type]} text-white px-5 py-3.5 shadow-xl
              flex items-center gap-3 min-w-[260px] max-w-xs
              animate-slide-in cursor-pointer font-body text-sm
            `}
            onClick={() => removeToast(toast.id)}
          >
            <span className="text-lg font-bold">{icons[toast.type]}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider');
  return ctx;
};
