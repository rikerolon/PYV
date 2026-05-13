// ========================================
// PÁGINA DE PRODUCTOS
// ========================================
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('cat') || '',
    priceRange: null,
    q: searchParams.get('q') || '',
  });
  const [sort, setSort] = useState('default');

  // Actualiza filtros si cambia la URL
  useEffect(() => {
    setFilters(f => ({
      ...f,
      category: searchParams.get('cat') || '',
      q: searchParams.get('q') || '',
    }));
  }, [searchParams]);

  // Filtrado y ordenamiento
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (filters.priceRange) {
      result = result.filter(p =>
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );
    }

    // Ordenamiento
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Cabecera */}
      <div className="mb-8">
        <p className="text-brand-red text-xs tracking-[0.3em] uppercase font-semibold mb-1">Catálogo</p>
        <h1 className="section-title">PRODUCTOS</h1>
        {filters.q && (
          <p className="text-gray-500 text-sm mt-2">
            Resultados para: <strong className="text-gray-800">"{filters.q}"</strong>
          </p>
        )}
      </div>

      {/* Filtros mobile + Ordenar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <FilterPanel filters={filters} onChange={setFilters} />
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm text-gray-500">{filteredProducts.length} productos</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-base text-sm pr-8"
          >
            <option value="default">Orden por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Panel de filtros desktop */}
        <FilterPanel filters={filters} onChange={setFilters} />

        {/* Grid de productos */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="font-display text-2xl text-gray-400 mb-2">SIN RESULTADOS</h3>
              <p className="text-gray-400 text-sm">Intenta con otros filtros o términos de búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
