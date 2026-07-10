'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from './Button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, totalPrice } = useCartStore()
  
  // Prevent hydration errors by ensuring we only render on client
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-neutral-950 border-l border-neutral-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3 text-primary-500" />
                Your Cart
              </h2>
              <Button variant="ghost" size="sm" onClick={closeCart} className="px-2">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                  <Button variant="outline" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.product.id}
                    className="flex gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-950 shrink-0">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600">
                          No Img
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-white line-clamp-1">{item.product.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeItem(item.product.id)}
                          className="h-auto p-1 text-neutral-500 hover:text-semantic-error"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-primary-400 font-semibold mt-1">
                        ${item.product.price.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-950">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-neutral-950">
                <div className="flex justify-between items-center mb-6 text-lg font-semibold text-white">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <Button className="w-full text-lg h-12" asChild>
                  <Link href="/checkout" onClick={closeCart}>
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
