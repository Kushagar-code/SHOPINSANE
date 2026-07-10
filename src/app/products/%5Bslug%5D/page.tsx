'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, ArrowLeft, Send, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { SEEDED_PRODUCTS, SEEDED_CATEGORIES, Product } from '@/lib/api/mockData'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  email: string
  rating: number
  comment: string
  date: string
}

const DEFAULT_REVIEWS: Record<string, Review[]> = {
  'titanium-pro-max-15': [
    { id: 'rev-1', email: 'julian@creator.co', rating: 5, comment: 'Phenomenal build quality. The titanium chassis feels lighter than expected, and the display is breathtaking.', date: '2026-07-01' },
    { id: 'rev-2', email: 'techie_sam@gmail.com', rating: 4, comment: 'Incredible performance, although the camera module is quite massive. Battery life is stellar.', date: '2026-07-04' }
  ],
  'galaxy-ultra-24': [
    { id: 'rev-1', email: 'sally_w@outlook.com', rating: 5, comment: 'The stylus response latency is zero. AI photo editing features are mind-blowing.', date: '2026-06-28' }
  ],
  'noise-cancelling-pods-pro': [
    { id: 'rev-1', email: 'audiophile_dan@yahoo.com', rating: 5, comment: 'Active Noise Cancellation blocks out the subway noise completely. Bass is deep and punchy.', date: '2026-07-05' }
  ],
  'nano-65w-charger': [
    { id: 'rev-1', email: 'traveler_jen@gmail.com', rating: 5, comment: 'So compact! Power output is enough to charge my laptop and phone simultaneously.', date: '2026-07-08' }
  ]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const addItem = useCartStore((state) => state.addItem)

  const [mounted, setMounted] = useState(false)
  const [activeImage, setActiveImage] = useState<string>('')
  const [reviews, setReviews] = useState<Review[]>([])
  
  // Review form states
  const [userEmail, setUserEmail] = useState('')
  const [userRating, setUserRating] = useState(5)
  const [userComment, setUserComment] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Load custom products and merge to locate product
  const product = useMemo(() => {
    if (typeof window === 'undefined') {
      return SEEDED_PRODUCTS.find((p) => p.slug === slug)
    }
    const customProducts = JSON.parse(localStorage.getItem('shopinsane_custom_products') || '[]')
    const all = [...SEEDED_PRODUCTS, ...customProducts]
    return all.find((p) => p.slug === slug)
  }, [slug])

  // Related items list
  const relatedProducts = useMemo(() => {
    if (!product) return []
    const customProducts = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('shopinsane_custom_products') || '[]')
      : []
    const all = [...SEEDED_PRODUCTS, ...customProducts]
    return all
      .filter((p) => p.category_id === product.category_id && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  useEffect(() => {
    setMounted(true)
    if (product) {
      setActiveImage(product.image_url)
      
      // Load reviews
      const storedReviews = JSON.parse(localStorage.getItem(`shopinsane_reviews_${product.slug}`) || '[]')
      const initialReviews = DEFAULT_REVIEWS[product.slug] || [
        { id: 'rev-df', email: 'guest@shopinsane.com', rating: 5, comment: 'Terrific quality and extremely fast delivery. Highly recommended!', date: '2026-07-09' }
      ]
      setReviews([...storedReviews, ...initialReviews])
    }
  }, [product])

  if (!mounted) return null
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-mist gap-4 text-center">
        <span className="text-4xl">⚠️</span>
        <h1 className="text-2xl font-bold text-ink-black">Product Not Found</h1>
        <Button onClick={() => router.push('/')} variant="secondary">Return Home</Button>
      </div>
    )
  }

  // Thumbnails pool
  const thumbnailsPool = product.thumbnails && product.thumbnails.length > 0
    ? [product.image_url, ...product.thumbnails.filter((t: string) => t !== product.image_url)]
    : [product.image_url]

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    
    if (!userEmail.includes('@')) {
      setFormError('Please enter a valid email address.')
      return
    }
    if (userComment.trim().length < 5) {
      setFormError('Review comment must be at least 5 characters.')
      return
    }

    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      email: userEmail,
      rating: userRating,
      comment: userComment,
      date: new Date().toISOString().split('T')[0]
    }

    const updated = [newReview, ...reviews]
    setReviews(updated)
    
    // Persist to local storage
    const storedReviews = JSON.parse(localStorage.getItem(`shopinsane_reviews_${product.slug}`) || '[]')
    localStorage.setItem(`shopinsane_reviews_${product.slug}`, JSON.stringify([newReview, ...storedReviews]))

    setFormSubmitted(true)
    setUserEmail('')
    setUserComment('')
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="bg-canvas-mist min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-gt-standard font-medium text-muted-gray hover:text-ink-black transition-colors -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to marketplace
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Stack */}
          <div className="space-y-6">
            {/* Bleeding 1:1 Image Panel with 28px rounded boundary */}
            <div className="relative w-full aspect-square bg-pure-white rounded-cards overflow-hidden shadow-sm border border-faint-border p-4">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bottom Mini Thumbnail Strip (12px radius, 2px gap spacing) */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
              {thumbnailsPool.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(thumb)}
                  className={cn(
                    "relative w-16 h-16 rounded-[12px] overflow-hidden border transition-all shrink-0 active:scale-95",
                    activeImage === thumb 
                      ? "border-shop-violet shadow-sm" 
                      : "border-faint-border hover:border-cool-stone"
                  )}
                >
                  <Image
                    src={thumb}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Metadata Detail Info */}
          <div className="bg-pure-white rounded-cards shadow-sm border border-faint-border p-8 space-y-6">
            <div className="space-y-3">
              {/* Product tags */}
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="text-[10px] uppercase tracking-wider font-gt-standard font-semibold px-2 py-0.5 rounded bg-canvas-mist text-muted-gray"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Price */}
              <h1 className="text-3xl sm:text-4xl font-gt-standard font-semibold text-ink-black tracking-tight leading-none">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-bold text-ink-black">${product.price.toLocaleString()}</span>
                {product.original_price && (
                  <span className="text-base text-muted-gray line-through">${product.original_price.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Average Rating Banner */}
            <div className="flex items-center gap-2 text-sm text-muted-gray font-gt-standard">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-4 h-4 fill-current",
                      i < Math.floor(product.rating) ? "text-amber-400" : "text-cool-stone"
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold text-ink-black">{product.rating}</span>
              <span>({reviews.length} total reviews)</span>
            </div>

            <hr className="border-faint-border" />

            {/* Product description */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-gt-standard font-bold text-muted-gray">Description</h4>
              <p className="text-sm font-gt-standard text-ink-black leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Add to Cart button */}
            <Button
              onClick={() => {
                addItem({
                  id: product.id,
                  category_id: product.category_id,
                  name: product.name,
                  slug: product.slug,
                  description: product.description,
                  price: product.price,
                  image_url: product.image_url,
                  inventory_count: product.stock,
                  tags: product.tags,
                  created_at: new Date().toISOString()
                })
              }}
              className="w-full h-12 rounded-pills bg-shop-violet text-pure-white text-base font-gt-standard font-medium relative overflow-hidden group/btn transition-transform hover:opacity-95"
            >
              <span className="absolute inset-0 bg-pure-white/10 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Dynamic Related Items Gallery */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-gt-standard font-semibold tracking-tight text-ink-black">
              Related gear
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, idx) => (
                <ProductCard key={item.id} product={item} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews Platform */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          
          {/* Reviews List Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-gt-standard font-semibold tracking-tight text-ink-black">
              Customer Reviews
            </h2>
            
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-pure-white rounded-cards p-6 border border-faint-border shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-sm font-gt-standard font-semibold text-ink-black">{rev.email}</span>
                      <span className="text-[10px] text-muted-gray ml-2 font-gt-standard">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-3.5 h-3.5 fill-current",
                            i < rev.rating ? "text-amber-400" : "text-cool-stone"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-gt-standard text-ink-black leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Review Column */}
          <div className="bg-pure-white rounded-cards p-6 border border-faint-border shadow-sm h-fit space-y-4">
            <h3 className="text-lg font-gt-standard font-semibold text-ink-black">
              Write a review
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {formSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2 font-gt-standard animate-fade-in">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Review submitted successfully!</span>
                </div>
              ) : (
                <>
                  {formError && (
                    <div className="p-3 text-xs text-semantic-error bg-semantic-error/10 border border-semantic-error/20 rounded-md font-gt-standard">
                      {formError}
                    </div>
                  )}

                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    value={userEmail}
                    onChange={(e: any) => setUserEmail(e.target.value)}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium font-gt-standard text-ink-black">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="hover:scale-110 active:scale-95 transition-transform"
                        >
                          <Star 
                            className={cn(
                              "w-6 h-6",
                              star <= userRating ? "fill-amber-400 text-amber-400" : "text-cool-stone"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium font-gt-standard text-ink-black">Comment</label>
                    <textarea
                      placeholder="Share your experience with this premium product..."
                      value={userComment}
                      onChange={(e: any) => setUserComment(e.target.value)}
                      rows={4}
                      required
                      className="w-full rounded-lg bg-pure-white border border-faint-border text-ink-black placeholder:text-muted-gray p-3 text-sm font-gt-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shop-violet/40 focus-visible:border-shop-violet transition-all duration-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-pills bg-shop-violet text-pure-white h-10 font-gt-standard hover:opacity-95"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}
