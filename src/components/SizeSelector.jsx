// ========================================
// SELECTOR DE TALLA
// ========================================

const SizeSelector = ({ sizes, selected, onSelect, label = 'Talla' }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {selected && (
          <span className="text-sm text-brand-red font-bold">Talla {selected}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`
              w-10 h-10 text-sm font-medium border transition-all duration-150
              ${selected === size
                ? 'bg-brand-black text-white border-brand-black'
                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-black hover:text-brand-black'
              }
              active:scale-90
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

// Versión con dos grupos de tallas (pie pequeño / pie grande)
export const DualSizeSelector = ({ sizeGroups, selected, onSelect }) => {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Talla</span>
        {selected && (
          <span className="text-sm text-brand-red font-bold">Talla {selected}</span>
        )}
      </div>
      {/* Tabs de grupo */}
      <div className="flex border border-gray-200 w-fit mb-3">
        {sizeGroups.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setActiveGroup(i)}
            className={`px-4 py-1.5 text-xs font-medium transition-colors ${
              activeGroup === i
                ? 'bg-brand-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      {/* Tallas del grupo activo */}
      <div className="flex flex-wrap gap-2">
        {sizeGroups[activeGroup].sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`
              w-10 h-10 text-sm font-medium border transition-all duration-150
              ${selected === size
                ? 'bg-brand-black text-white border-brand-black'
                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-black'
              }
              active:scale-90
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

// Importación de useState necesaria para DualSizeSelector
import { useState } from 'react';

export default SizeSelector;
