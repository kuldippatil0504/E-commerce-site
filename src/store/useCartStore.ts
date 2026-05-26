import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  get cartTotal() : number;
  get itemCount() : number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === newItem.id && item.size === newItem.size
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              )
            };
          }
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      clearCart: () => set({ items: [] }),
      get cartTotal() {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      get itemCount() {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'luxe-cart-storage',
    }
  )
);
