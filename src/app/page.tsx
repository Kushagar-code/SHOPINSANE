import { HeroHeader } from '@/components/ui/HeroHeader'
import { CatalogSection } from '@/components/ui/CatalogSection'
import { getProducts } from '@/lib/api/products'
import { Suspense } from 'react'

// export const runtime = 'edge'

export default async function Home() {
  return (
    <div className="flex flex-col bg-canvas-mist min-h-screen">
      {/* 2.1 Full-Screen Fluid Header Parallax */}
      <HeroHeader />
      
      {/* Search Bar + Categories + Grid */}
      <Suspense fallback={<CatalogGridSkeleton />}>
        <CatalogLoader />
      </Suspense>
    </div>
  )
}

async function CatalogLoader() {
  // Gracefully fetch database products to merge on the client side
  const products = await getProducts().catch((err) => {
    console.error('Database connection failed, falling back to local seeded data.', err)
    return []
  })
  
  return <CatalogSection initialProducts={products} />
}

function CatalogGridSkeleton() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-16 space-y-12">
      <div className="max-w-2xl mx-auto h-14 bg-pure-white rounded-search border border-faint-border animate-pulse" />
      <div className="w-full flex items-center justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-pure-white rounded-chips border border-faint-border animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-[380px] rounded-cards bg-pure-white shadow-sm border border-faint-border/30 animate-pulse" />
        ))}
      </div>
    </div>
  )
}
