import { Hero } from '@/components/ui/Hero'
import { getProducts } from '@/lib/api/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { Suspense } from 'react'


export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <Hero />
      
      <main id="catalog" className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Featured Collection
            </h2>
            <p className="text-neutral-400">
              Browse our latest premium assets, carefully curated for excellence.
            </p>
          </div>
          <div className="w-full md:w-auto">
            {/* Future Feature: Category Tabs or Filter */}
          </div>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  )
}

async function ProductGrid() {
  const products = await getProducts()
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24 text-neutral-500 border border-neutral-800 border-dashed rounded-xl">
        <p className="text-xl">No products found.</p>
        <p className="text-sm mt-2">The catalog is currently empty.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[400px] rounded-xl bg-neutral-900/50 border border-neutral-800 animate-pulse" />
      ))}
    </div>
  )
}
