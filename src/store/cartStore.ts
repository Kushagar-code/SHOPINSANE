import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/api/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
}

const calculateTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id)
          let newItems
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          } else {
            newItems = [...state.items, { product, quantity }]
          }
          return {
            items: newItems,
            isOpen: true,
            ...calculateTotals(newItems)
          }
        })
      },
      
      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId)
          return {
            items: newItems,
            ...calculateTotals(newItems)
          }
        })
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
          return {
            items: newItems,
            ...calculateTotals(newItems)
          }
        })
      },
      
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'shopinsane-cart',
    }
  )
)
