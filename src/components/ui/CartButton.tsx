'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from './Button'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'

export function CartButton() {
  const { totalItems, toggleCart } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button 
      variant="primary" 
      size="sm" 
      className="relative group overflow-hidden"
      onClick={toggleCart}
    >
      <ShoppingCart className="w-4 h-4 sm:mr-2 relative z-10" />
      <span className="hidden sm:inline relative z-10">Cart</span>
      {/* Cart badge */}
      {mounted && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary-600 scale-100 transition-transform group-hover:scale-110">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
