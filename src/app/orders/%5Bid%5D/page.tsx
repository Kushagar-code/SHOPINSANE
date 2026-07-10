'use client'

import { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { OrderTimeline, OrderStatus } from '@/components/ui/OrderTimeline'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Box, Truck, Calendar, Clipboard, Check } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const [mounted, setMounted] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    setMounted(true)
    
    async function loadOrder() {
      setLoading(true)
      
      // 1. Try to fetch from Supabase
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single()

        if (data && !error) {
          // Fetch order items
          const { data: dbItems } = await supabase
            .from('order_items')
            .select(`
              *,
              products ( name, image_url )
            `)
            .eq('order_id', orderId)

          setOrder({
            id: data.id,
            total_amount: data.total_amount,
            shipping_address: data.shipping_address,
            status: data.status,
            created_at: data.created_at,
            items: dbItems?.map(item => ({
              product_id: item.product_id,
              product_name: !Array.isArray(item.products) ? item.products?.name : 'Unknown Gear',
              price: item.price_at_purchase,
              quantity: item.quantity,
              image_url: !Array.isArray(item.products) ? item.products?.image_url : null
            })) || []
          })
          setLoading(false)
          return
        }
      } catch (err) {
        console.warn('Failed to load order from database, seeking local fallback.')
      }

      // 2. Local fallback if not in DB
      const localOrders = JSON.parse(localStorage.getItem('shopinsane_orders') || '[]')
      const localMatch = localOrders.find((o: any) => o.id === orderId)
      if (localMatch) {
        setOrder(localMatch)
      }
      setLoading(false)
    }

    loadOrder()
    
    // Poll for status updates every 5 seconds to show active stepper changes instantly
    const interval = setInterval(loadOrder, 5000)
    return () => clearInterval(interval)
  }, [orderId, supabase])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-mist p-4 text-center">
        <div className="space-y-4">
          <div className="w-10 h-10 border-4 border-shop-violet border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-gray text-sm font-gt-standard">Locating shipment files...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-mist gap-4 text-center">
        <span className="text-4xl">🔎</span>
        <h1 className="text-2xl font-bold text-ink-black font-gt-standard">Order Not Found</h1>
        <p className="text-muted-gray text-sm font-gt-standard">Verify the checkout code parameters.</p>
        <Button onClick={() => router.push('/')} className="rounded-pills bg-shop-violet text-pure-white">Return Home</Button>
      </div>
    )
  }

  // Read carrier and tracking details from the shipping address record
  const carrierName = order.shipping_address?.carrier || ''
  const trackingCode = order.shipping_address?.trackingNumber || ''
  const shippingInfo = order.shipping_address

  return (
    <div className="min-h-screen bg-canvas-mist pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl space-y-8">
        
        <Button variant="ghost" asChild className="text-muted-gray hover:text-ink-black -ml-4 font-gt-standard">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-gt-standard font-semibold tracking-tight text-ink-black mb-2">Order Confirmed</h1>
            <p className="text-muted-gray text-sm font-gt-standard">Order ID: <span className="font-semibold text-ink-black">{order.id}</span></p>
          </div>
          <div className="bg-shop-violet/10 text-shop-violet border border-shop-violet/20 px-4 py-1.5 rounded-full text-xs font-gt-standard font-semibold">
            Status: {order.status}
          </div>
        </div>

        {/* Timeline Tracking Block */}
        <Card className="border-faint-border bg-pure-white shadow-sm overflow-visible">
          <CardHeader>
            <CardTitle>Delivery Tracking</CardTitle>
            <CardDescription>Track the real-time progress of your premium assets.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-10 px-4 sm:px-12">
            <OrderTimeline status={order.status as OrderStatus} />
          </CardContent>
        </Card>

        {/* Carrier Details Card */}
        {carrierName && trackingCode && (
          <Card className="border-faint-border bg-pure-white shadow-sm p-2 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="w-5 h-5 text-shop-violet" />
                Shipping Information
              </CardTitle>
              <CardDescription>Real-time courier hand-off coordinates.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-gt-standard">
              <div>
                <span className="text-xs uppercase text-muted-gray font-bold tracking-wider">Delivery Carrier</span>
                <p className="text-base text-ink-black font-semibold mt-1">{carrierName}</p>
              </div>
              <div>
                <span className="text-xs uppercase text-muted-gray font-bold tracking-wider">Tracking Code</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base text-ink-black font-mono font-semibold">{trackingCode}</span>
                  <button 
                    onClick={() => copyToClipboard(trackingCode)}
                    className="p-1 hover:bg-canvas-mist rounded text-muted-gray hover:text-ink-black transition-colors"
                    title="Copy tracking code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-xs uppercase text-muted-gray font-bold tracking-wider">Est. Delivery</span>
                <p className="text-base text-ink-black font-semibold mt-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-muted-gray" />
                  3-5 Business Days
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Address and Items Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Order Items column */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-gt-standard font-semibold tracking-tight text-ink-black flex items-center gap-2">
              <Box className="w-5 h-5 text-shop-violet" />
              Order Items
            </h2>
            
            <div className="space-y-4">
              {order.items?.map((item: any, index: number) => (
                <Card key={index} className="border-faint-border bg-pure-white shadow-sm hover:shadow-sm-2 transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-canvas-mist rounded-lg overflow-hidden relative shrink-0">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.product_name} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-gray font-gt-standard">No Img</div>
                        )}
                      </div>
                      <div className="font-gt-standard">
                        <h3 className="text-ink-black font-semibold text-sm">
                          {item.product_name}
                        </h3>
                        <p className="text-xs text-muted-gray mt-0.5">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-ink-black font-bold font-gt-standard">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shipping Summary column */}
          <div>
            <Card className="border-faint-border bg-pure-white shadow-sm sticky top-24 p-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-gt-standard text-sm text-ink-black">
                {shippingInfo ? (
                  <div className="space-y-1">
                    <p className="font-semibold">{shippingInfo.fullName}</p>
                    <p className="text-muted-gray">{shippingInfo.street}</p>
                    <p className="text-muted-gray">{shippingInfo.city}, {shippingInfo.zipCode}</p>
                    <p className="text-muted-gray">{shippingInfo.country}</p>
                  </div>
                ) : (
                  <p className="text-muted-gray font-gt-standard">No address provided.</p>
                )}
                
                <hr className="border-faint-border" />
                
                <div className="flex justify-between text-base font-bold text-ink-black pt-2">
                  <span>Grand Total</span>
                  <span>${order.total_amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  )
}
