// ========================================
// SELECTOR DE COLOR — Swatches visuales
// ========================================

const ColorSelector = ({ colors, selected, onSelect }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">Color</span>
        {selected && (
          <span className="text-sm text-brand-red font-bold">{selected.name}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => onSelect(color)}
            title={color.name}
            className={`
              relative w-8 h-8 rounded-full transition-all duration-150
              ${color.border ? 'border border-gray-300' : ''}
              ${selected?.name === color.name
                ? 'ring-2 ring-brand-red ring-offset-2 scale-110'
                : 'hover:scale-110 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
              }
              active:scale-95
            `}
            style={{ backgroundColor: color.hex }}
            aria-label={`Color ${color.name}`}
          >
            {selected?.name === color.name && (
              <span
                className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                style={{ color: isLight(color.hex) ? '#1A1A1A' : '#FFFFFF' }}
              >
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Nombre del color seleccionado */}
      {selected && (
        <div className="mt-3 flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-sm ${selected.border ? 'border border-gray-300' : ''}`}
            style={{ backgroundColor: selected.hex }}
          />
          <span className="text-sm text-gray-600">{selected.name}</span>
          <span className="text-xs text-gray-400 font-mono">{selected.hex}</span>
        </div>
      )}
    </div>
  );
};

// Helper: determina si un color es claro u oscuro
function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}

export default ColorSelector;
