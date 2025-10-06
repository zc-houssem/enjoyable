import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: number
  quantity: number
}

type CartStoreState = {
  wishlist: number[]
  cart: CartItem[]
  // Wishlist actions
  addToWishlist: (id: number) => void
  removeFromWishlist: (id: number) => void
  // Cart actions
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      wishlist: [],
      cart: [],

      // --- Wishlist ---
      addToWishlist: (id) =>
        set((state) =>
          state.wishlist.includes(id) ? state : { wishlist: [...state.wishlist, id] },
        ),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((itemId) => itemId !== id),
        })),

      // --- Cart ---
      addToCart: (id) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === id)
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          return { cart: [...state.cart, { id, price: 0, quantity: 1 }] }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    },
  ),
)
