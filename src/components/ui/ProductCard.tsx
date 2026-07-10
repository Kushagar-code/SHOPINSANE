'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'
import { Button } from './Button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/lib/api/products'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col bg-neutral-900/60 border-neutral-800/60 overflow-hidden hover:border-primary-500/50 transition-colors">
        <Link href={`/products/${product.slug}`} className="block relative w-full aspect-square overflow-hidden bg-neutral-950">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <div className="flex flex-col flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg line-clamp-1 group-hover:text-primary-400 transition-colors">
                <Link href={`/products/${product.slug}`}>
                  {product.name}
                </Link>
              </CardTitle>
              <span className="text-lg font-bold text-white shrink-0">
                ${product.price.toLocaleString()}
              </span>
            </div>
            <CardDescription className="line-clamp-2 mt-2">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1" />
          <CardFooter className="pt-4">
            <Button 
              className="w-full relative overflow-hidden group/btn" 
              variant="secondary"
              onClick={() => addItem(product)}
            >
              <span className="absolute inset-0 bg-primary-500/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
