'use client'

import { useState, useEffect } from 'react'
export const runtime = 'edge';
import { useCartStore } from '@/store/cartStore'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { processCheckout } from './actions'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { SEEDED_PRODUCTS } from '@/lib/api/mockData'

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  country: z.string().min(2, "Country is required"),
})

type ShippingFormValues = z.infer<typeof shippingSchema>

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
  })

  const onSubmit = async (data: ShippingFormValues) => {
    setServerError(null)
    
    if (items.length === 0) {
      setServerError("Your cart is empty.")
      return
    }

    // Client-side Stock Inventory Checks
    const customProducts = JSON.parse(localStorage.getItem('shopinsane_custom_products') || '[]')
    const stockAdjustments = JSON.parse(localStorage.getItem('shopinsane_stock_adjustments') || '{}')
    const allCatalog = [...SEEDED_PRODUCTS, ...customProducts]

    const placedOrders = JSON.parse(localStorage.getItem('shopinsane_orders') || '[]')

    for (const item of items) {
      const prod = allCatalog.find(p => p.id === item.product.id)
      if (prod) {
        // Calculate units sold in local storage orders
        const unitsSoldInOrders = placedOrders
          .filter((o: any) => o.status !== 'Cancelled')
          .flatMap((o: any) => o.items || [])
          .filter((oi: any) => oi.product_id === item.product.id)
          .reduce((sum: number, oi: any) => sum + oi.quantity, 0)

        const initialStock = prod.stock !== undefined ? prod.stock : 50
        const currentStock = (initialStock + (stockAdjustments[prod.id] || 0)) - unitsSoldInOrders

        if (currentStock < item.quantity) {
          setServerError(`Insufficient stock for ${prod.name}. Only ${currentStock} remaining in inventory.`)
          return
        }
      }
    }

    const payload = {
      shippingAddress: data,
      cartItems: items.map(item => ({
        product: { id: item.product.id, price: item.product.price },
        quantity: item.quantity
      }))
    }

    const result = await processCheckout(payload)
    
    if (result?.error) {
      setServerError(result.error)
    } else if (result?.success && result.orderId) {
      // Deduct stock locally by logging the order details locally
      const newOrder = {
        id: result.orderId,
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image_url: item.product.image_url
        })),
        total_amount: totalPrice,
        shipping_address: {
          fullName: data.fullName,
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
          country: data.country,
          carrier: '',
          trackingNumber: ''
        },
        status: 'Ordered',
        created_at: new Date().toISOString()
      }
      
      localStorage.setItem('shopinsane_orders', JSON.stringify([newOrder, ...placedOrders]))
      clearCart()
      router.push(`/orders/${result.orderId}`)
    }
  }

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-mist p-4 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-ink-black font-gt-standard">Your Cart is Empty</h1>
          <Button onClick={() => router.push('/')} className="rounded-pills bg-shop-violet text-pure-white">Return to Shop</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-mist pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl space-y-8">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-gt-standard font-medium text-muted-gray hover:text-ink-black transition-colors -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl sm:text-4xl font-gt-standard font-semibold tracking-tight text-ink-black">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-faint-border bg-pure-white shadow-sm p-2">
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
                <CardDescription>Enter your delivery information.</CardDescription>
              </CardHeader>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  {serverError && (
                    <div className="p-3 text-sm text-semantic-error bg-semantic-error/10 border border-semantic-error/20 rounded-md font-gt-standard">
                      {serverError}
                    </div>
                  )}
                  
                  <Input label="Full Name" placeholder="John Doe" error={errors.fullName?.message} {...register('fullName')} />
                  <Input label="Street Address" placeholder="123 Main St" error={errors.street?.message} {...register('street')} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="City" placeholder="New York" error={errors.city?.message} {...register('city')} />
                    <Input label="ZIP / Postal Code" placeholder="10001" error={errors.zipCode?.message} {...register('zipCode')} />
                  </div>
                  <Input label="Country" placeholder="United States" error={errors.country?.message} {...register('country')} />
                </CardContent>
              </form>
            </Card>

            {/* Mock Payment Panel */}
            <Card className="border-faint-border bg-pure-white shadow-sm p-2 opacity-75 grayscale pointer-events-none">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-shop-violet" />
                  Payment Information
                </CardTitle>
                <CardDescription>This is a mock checkout. No payment details required.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Card Number" value="•••• •••• •••• 4242" readOnly />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry" value="12/28" readOnly />
                  <Input label="CVC" value="•••" readOnly />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-faint-border bg-pure-white shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="divide-y divide-faint-border max-h-[40vh] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.product.id} className="py-3 flex justify-between text-sm font-gt-standard">
                      <div className="text-muted-gray">
                        {item.quantity}x {item.product.name}
                      </div>
                      <div className="text-ink-black font-semibold">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-faint-border">
                  <div className="flex justify-between text-lg font-bold text-ink-black font-gt-standard">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  form="checkout-form" 
                  className="w-full rounded-pills bg-shop-violet text-pure-white hover:opacity-95" 
                  size="lg"
                  isLoading={isSubmitting}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Complete Mock Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
