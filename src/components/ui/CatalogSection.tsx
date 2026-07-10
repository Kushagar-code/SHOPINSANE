'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, ChevronRight, Hash } from 'lucide-react'
import { SEEDED_PRODUCTS, SEEDED_CATEGORIES, Product } from '@/lib/api/mockData'
import { ProductCard } from './ProductCard'
import { cn } from '@/lib/utils'

interface CatalogSectionProps {
  initialProducts?: any[]
}

export function CatalogSection({ initialProducts = [] }: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null) // null = 'All'
  const [customProducts, setCustomProducts] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shopinsane_custom_products') || '[]')
    setCustomProducts(stored)
  }, [])

  // Merge database products with seeded products and custom products to guarantee all are present
  const allProducts = useMemo(() => {
    const dbMapped = initialProducts.map((p) => ({
      id: p.id,
      category_id: p.category_id || 'cat-1',
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      price: p.price,
      image_url: p.image_url,
      tags: p.tags || [],
      rating: p.rating || 4.7,
      review_count: p.review_count || 120,
      stock: p.stock !== undefined ? p.stock : 50,
      units_sold: p.units_sold || 0
    }))

    // Use a Map to de-duplicate by ID, prioritizing database products
    const productMap = new Map<string, any>()
    
    // Add seeded products first
    SEEDED_PRODUCTS.forEach((p) => productMap.set(p.id, p))
    // Add custom products
    customProducts.forEach((p) => productMap.set(p.id, p))
    // Overwrite/append database products
    dbMapped.forEach((p) => productMap.set(p.id, p))

    return Array.from(productMap.values())
  }, [initialProducts, customProducts])

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory ? product.category_id === activeCategory : true
      
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags?.some((t: string) => t.toLowerCase().includes(searchLower))
        : true

      return matchesCategory && matchesSearch
    })
  }, [allProducts, activeCategory, searchQuery])

  return (
    <section id="catalog" className="w-full max-w-[1200px] mx-auto px-6 py-16 space-y-12">
      {/* 2.2 Search & Discovery Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative w-full h-14 bg-pure-white rounded-search border border-faint-border shadow-sm flex items-center pr-1.5 pl-6 group transition-all focus-within:border-shop-violet/40">
          <Search className="w-5 h-5 text-muted-gray shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search premium hardware catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-base text-ink-black placeholder:text-muted-gray font-gt-standard"
          />
          <button 
            className="w-11 h-11 rounded-full bg-shop-violet flex items-center justify-center text-pure-white shadow-lg-2 hover:opacity-90 active:scale-95 transition-all shrink-0"
            aria-label="Submit search"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2.3 Category Pills Carousel */}
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {/* 'All' Toggle Button */}
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-chips font-gt-standard font-medium text-sm transition-all shadow-sm border select-none shrink-0",
              !activeCategory 
                ? "bg-ink-black text-pure-white border-ink-black"
                : "bg-pure-white text-ink-black border-faint-border hover:bg-canvas-mist/50"
            )}
          >
            <Hash className="w-4 h-4" />
            <span>All Catalog</span>
          </button>

          {SEEDED_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-chips font-gt-standard font-medium text-sm transition-all shadow-sm border select-none shrink-0",
                activeCategory === cat.id
                  ? "bg-ink-black text-pure-white border-ink-black"
                  : "bg-pure-white text-ink-black border-faint-border hover:bg-canvas-mist/50"
              )}
            >
              {/* Colored brand dot */}
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2.4 Product Grid List */}
      <div className="space-y-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl sm:text-2xl font-gt-standard font-semibold tracking-tight text-ink-black flex items-center gap-2">
            Discover
            <span className="text-xs font-medium text-muted-gray">
              {filteredProducts.length} items
            </span>
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="w-full text-center py-24 bg-pure-white rounded-cards border border-faint-border/40 shadow-sm flex flex-col items-center justify-center gap-4">
            <span className="text-4xl">🔎</span>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-ink-black">No products found</h3>
              <p className="text-sm text-muted-gray">Try adjusting your filters or query words</p>
            </div>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
              className="text-xs px-4 py-2 rounded-pills bg-canvas-mist text-ink-black font-semibold border border-faint-border hover:bg-cool-stone/20 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
