import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './cartStore'
import type { Product } from '@/lib/api/products'

const mockProduct: Product = {
  id: 'test-1',
  category_id: 'cat-1',
  name: 'Test Asset',
  slug: 'test-asset',
  description: 'A mock premium asset',
  price: 150,
  image_url: '',
  inventory_count: 10,
  tags: null,
  created_at: new Date().toISOString()
}

describe('Cart Store (Zustand)', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
    useCartStore.getState().closeCart()
  })

  it('should add an item to the cart and calculate total', () => {
    const store = useCartStore.getState()
    
    // Add product
    store.addItem(mockProduct)
    
    const updatedStore = useCartStore.getState()
    expect(updatedStore.items).toHaveLength(1)
    expect(updatedStore.items[0].product.name).toBe('Test Asset')
    expect(updatedStore.totalItems).toBe(1)
    expect(updatedStore.totalPrice).toBe(150)
    
    // Check if adding item automatically opens drawer
    expect(updatedStore.isOpen).toBe(true)
  })

  it('should increment quantity when adding the same item', () => {
    const store = useCartStore.getState()
    
    store.addItem(mockProduct)
    store.addItem(mockProduct) // add again
    
    const updatedStore = useCartStore.getState()
    expect(updatedStore.items).toHaveLength(1)
    expect(updatedStore.items[0].quantity).toBe(2)
    expect(updatedStore.totalItems).toBe(2)
    expect(updatedStore.totalPrice).toBe(300)
  })

  it('should remove an item correctly', () => {
    const store = useCartStore.getState()
    
    store.addItem(mockProduct)
    store.removeItem(mockProduct.id)
    
    const updatedStore = useCartStore.getState()
    expect(updatedStore.items).toHaveLength(0)
    expect(updatedStore.totalItems).toBe(0)
    expect(updatedStore.totalPrice).toBe(0)
  })

  it('should update quantity of an existing item', () => {
    const store = useCartStore.getState()
    
    store.addItem(mockProduct)
    store.updateQuantity(mockProduct.id, 5)
    
    const updatedStore = useCartStore.getState()
    expect(updatedStore.items[0].quantity).toBe(5)
    expect(updatedStore.totalItems).toBe(5)
    expect(updatedStore.totalPrice).toBe(750)
  })
})
