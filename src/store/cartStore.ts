import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../schemas/product'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5

// A small copy of the product, so the cart works without refetching.
export type CartItem = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail'> & {
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
                  : item,
              ),
            }
          }
          const { id, title, price, thumbnail } = product
          return { items: [...state.items, { id, title, price, thumbnail, quantity: 1 }] }
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) } : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, MIN_QUANTITY) } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart', // localStorage key
      partialize: (state) => ({ items: state.items }), // save data only, not functions
    },
  ),
)

// Total number of units in the cart (sum of quantities).
export const useCartCount = () =>
  useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
