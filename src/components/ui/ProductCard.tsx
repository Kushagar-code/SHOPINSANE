'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'

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
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  
  // Mapped rating fallbacks if DB products don't have them
  const rating = product.rating || 4.7
  const reviewCount = product.review_count || 120

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

        {/* Action Button */}
        <Button 
          className="w-full h-10 rounded-pills text-sm font-gt-standard font-medium relative overflow-hidden group/btn" 
          variant="secondary"
          onClick={() => {
            addItem({
              id: product.id,
              category_id: product.category_id,
              name: product.name,
              slug: product.slug,
              description: product.description,
              price: product.price,
              image_url: product.image_url,
              inventory_count: 50,
              tags: product.tags || null,
              created_at: new Date().toISOString()
            })
          }}
        >
          <span className="absolute inset-0 bg-shop-violet/10 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}
