'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'
import { ShoppingCart, Star, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export interface ProductCardProps {
  product: {
    id: string
    category_id: string | null
    name: string
    slug: string
    description: string
    price: number
    image_url: string
    tags?: string[] | null
    rating?: number
    review_count?: number
    stock?: number
    units_sold?: number
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const rating = product.rating || 4.7
  const reviewCount = product.review_count || 120

  const [remainingStock, setRemainingStock] = useState<number>(product.stock !== undefined ? product.stock : 50)

  useEffect(() => {
    const calculateStock = () => {
      const stockAdjustments = JSON.parse(localStorage.getItem('shopinsane_stock_adjustments') || '{}')
      const placedOrders = JSON.parse(localStorage.getItem('shopinsane_orders') || '[]')
      
      const unitsSoldInOrders = placedOrders
        .filter((o: any) => o.status !== 'Cancelled')
        .flatMap((o: any) => o.items || [])
        .filter((oi: any) => oi.product_id === product.id)
        .reduce((sum: number, oi: any) => sum + oi.quantity, 0)

      const initialStock = product.stock !== undefined ? product.stock : 50
      setRemainingStock((initialStock + (stockAdjustments[product.id] || 0)) - unitsSoldInOrders)
    }

    calculateStock()

    window.addEventListener('storage', calculateStock)
    window.addEventListener('cart-updated', calculateStock)
    window.addEventListener('order-placed', calculateStock)
    window.addEventListener('stock-changed', calculateStock)

    return () => {
      window.removeEventListener('storage', calculateStock)
      window.removeEventListener('cart-updated', calculateStock)
      window.removeEventListener('order-placed', calculateStock)
      window.removeEventListener('stock-changed', calculateStock)
    }
  }, [product.id, product.stock])

  const isOutOfStock = remainingStock <= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-pure-white rounded-cards overflow-hidden shadow-sm-2 flex flex-col h-full border border-faint-border/30 hover:shadow-lg transition-all duration-300 select-none"
    >
      {/* 1:1 Bleeding Image Panel with 20px inner radius */}
      <Link 
        href={`/products/${product.slug}`} 
        className="block relative w-full aspect-square p-3 pb-0"
      >
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-canvas-mist">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-gray text-sm">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Info Details Section */}
      <div className="flex flex-col flex-1 p-5 pt-3 justify-between gap-4">
        <div className="space-y-2">
          {/* Brand/Product Name */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-gt-standard font-semibold tracking-tight text-ink-black leading-snug group-hover:text-shop-violet transition-colors duration-200">
              <Link href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            </h3>
            <span className="text-sm font-bold text-ink-black shrink-0">
              ${product.price.toLocaleString()}
            </span>
          </div>

          {/* Rating and Review Row */}
          <div className="flex items-center gap-1 text-[9px] text-muted-gray font-gt-standard tracking-tight">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-3 h-3 fill-current",
                    i < Math.floor(rating) ? "text-amber-400" : "text-cool-stone"
                  )}
                />
              ))}
            </div>
            <span className="ml-1 font-semibold text-ink-black">{rating}</span>
            <span>({reviewCount} reviews)</span>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[10px] px-2 py-0.5 rounded-full bg-canvas-mist text-muted-gray font-gt-standard tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Scarcity Warning Badge & Add To Cart Button */}
        <div className="space-y-3 pt-1">
          {remainingStock > 0 && remainingStock < 5 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff7ed] border border-[#ffedd5] w-fit">
              <Clock className="w-3.5 h-3.5 text-[#c2410c] animate-pulse" />
              <span className="text-[11px] font-medium text-[#c2410c] font-gt-standard tracking-tight">
                Hurry! Only {remainingStock} left
              </span>
            </div>
          )}

          <Button 
            className={cn(
              "w-full h-10 rounded-pills text-sm font-gt-standard font-medium relative overflow-hidden group/btn transition-all duration-300 shadow-sm shadow-shop-violet/10 hover:shadow-lg-2 hover:shadow-shop-violet/20",
              isOutOfStock 
                ? "bg-canvas-mist text-muted-gray border-faint-border cursor-not-allowed" 
                : "bg-shop-violet text-pure-white hover:bg-shop-violet/90"
            )}
            onClick={() => {
              if (isOutOfStock) return
              addItem({
                id: product.id,
                category_id: product.category_id,
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
                image_url: product.image_url,
                inventory_count: remainingStock,
                tags: product.tags || null,
                created_at: new Date().toISOString()
              })
              // Dispatch event to recalculate stock instantly in other components
              window.dispatchEvent(new Event('cart-updated'))
            }}
            disabled={isOutOfStock}
          >
            {!isOutOfStock && (
              <span className="absolute inset-0 bg-pure-white/10 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
            )}
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
