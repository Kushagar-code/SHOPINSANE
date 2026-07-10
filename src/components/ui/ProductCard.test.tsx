import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/api/products'

// Mock the cart store
vi.mock('@/store/cartStore', () => ({
  useCartStore: () => vi.fn(),
}))

const mockProduct: Product = {
  id: 'test-1',
  category_id: 'cat-1',
  name: 'Premium UI Kit',
  slug: 'premium-ui-kit',
  description: 'A premium UI kit for designers.',
  price: 99,
  image_url: '',
  inventory_count: 50,
  tags: null,
  created_at: new Date().toISOString()
}

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Premium UI Kit')).toBeInTheDocument()
    expect(screen.getByText('$99')).toBeInTheDocument()
    expect(screen.getByText('A premium UI kit for designers.')).toBeInTheDocument()
  })
})
