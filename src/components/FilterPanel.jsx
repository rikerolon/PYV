// ========================================
// PANEL DE FILTROS — Lateral desktop / Colapsable mobile
// ========================================
import { useState } from 'react';
import { CATEGORIES } from '../data/products';

const PRICE_RANGES = [
  { label: 'Todos los precios', min: 0, max: Infinity },
  { label: 'Menos de $10.000', min: 0, max: 10000 },
  { label: '$10.000 – $15.000', min: 10000, max: 15000 },
  { label: '$15.000 – $20.000', min: 15000, max: 20000 },
  { label: 'Más de $20.000', min: 20000, max: Infinity },
];

const FilterPanel = ({ filters, onChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCategory = (catId) => {
    onChange({ ...filters, category: filters.category === catId ? '' : catId });
  };

  const handlePrice = (range) => {
    onChange({ ...filters, priceRange: range });
  };

  const clearAll = () => {
    onChange({ category: '', priceRange: null, q: filters.q || '' });
  };

  const activeCount = [
    filters.category,
    filters.priceRange && filters.priceRange.min !== 0,
  ].filter(Boolean).length;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categorías */}
      <div>
        <h3 className="font-display text-base tracking-widest text-gray-800 mb-3">Categoría</h3>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`
                flex items-center gap-2 w-full text-left text-sm py-1.5 px-2 transition-colors
                ${filters.category === cat.id
                  ? 'text-brand-red font-semibold bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {filters.category === cat.id && (
                <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h3 className="font-display text-base tracking-widest text-gray-800 mb-3">Precio</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map(range => (
            <button
              key={range.label}
              onClick={() => handlePrice(range.min === 0 && range.max === Infinity ? null : range)}
              className={`
                flex items-center gap-2 w-full text-left text-sm py-1.5 px-2 transition-colors
                ${((!filters.priceRange && range.min === 0 && range.max === Infinity) ||
                   (filters.priceRange?.label === range.label))
                  ? 'text-brand-red font-semibold bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Limpiar filtros */}
      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="text-xs text-gray-400 hover:text-brand-red transition-colors underline"
        >
          Limpiar filtros ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile: botón toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium hover:border-brand-black transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {activeCount > 0 && (
            <span className="bg-brand-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        {mobileOpen && (
          <div className="mt-3 border border-gray-100 p-4 bg-white animate-fade-in">
            <FiltersContent />
          </div>
        )}
      </div>

      {/* Desktop: panel lateral */}
      <div className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-xl tracking-widest">FILTROS</span>
            {activeCount > 0 && (
              <span className="text-xs text-brand-red font-semibold">{activeCount} activos</span>
            )}
          </div>
          <div className="border-t-2 border-brand-black pt-4">
            <FiltersContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
