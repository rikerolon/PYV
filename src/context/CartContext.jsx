// ========================================
// CONTEXTO DEL CARRITO — Zustand Store
// ========================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Añadir item al carrito
      addItem: (product, variant = null, quantity = 1) => {
        const { items } = get();
        // Clave única por producto + variante
        const key = `${product.id}-${variant ? JSON.stringify(variant) : 'default'}`;
        const existing = items.find(i => i.key === key);

        if (existing) {
          set({
            items: items.map(i =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                key,
                product,
                variant,
                quantity,
              },
            ],
          });
        }
      },

      // Eliminar item del carrito
      removeItem: (key) => {
        set({ items: get().items.filter(i => i.key !== key) });
      },

      // Actualizar cantidad
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set({
          items: get().items.map(i =>
            i.key === key ? { ...i, quantity } : i
          ),
        });
      },

      // Vaciar carrito
      clearCart: () => set({ items: [] }),

      // Total de items
      get itemCount() {
        return get().items.reduce((acc, i) => acc + i.quantity, 0);
      },

      // Subtotal
      get subtotal() {
        return get().items.reduce(
          (acc, i) => acc + i.product.price * i.quantity, 0
        );
      },
    }),
    {
      name: 'pyv-cart', // clave en localStorage
    }
  )
);

export default useCartStore;
