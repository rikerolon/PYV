// ========================================
// BARRA DE BÚSQUEDA con autocompletado
// ========================================
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Filtrado en tiempo real
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 5));
    setOpen(true);
  }, [query]);

  // Cierra al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (product) => {
    setQuery('');
    setOpen(false);
    navigate(`/producto/${product.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productos?q=${encodeURIComponent(query)}`);
      setQuery('');
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:border-brand-red focus-within:bg-white transition-colors duration-200">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <button type="submit" className="px-3 py-2 text-gray-400 hover:text-brand-red transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Sugerencias */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 animate-fade-in">
          {results.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors border-b border-gray-50 last:border-0"
            >
              <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-400 capitalize">{p.category}</p>
              </div>
            </button>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2.5 text-xs text-brand-red font-medium text-center hover:bg-red-50 transition-colors"
          >
            Ver todos los resultados para "{query}"
          </button>
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 px-4 py-4 text-sm text-gray-500">
          Sin resultados para "<strong>{query}</strong>"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
