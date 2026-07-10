import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { OrderTimeline, OrderStatus } from '@/components/ui/OrderTimeline'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Box } from 'lucide-react'

interface OrderPageProps {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: OrderPageProps) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id) // Ensure security
    .single()

  if (orderError || !order) {
    notFound()
  }

  // Fetch Order Items
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      *,
      products ( name, image_url )
    `)
    .eq('order_id', order.id)

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" asChild className="mb-8 text-neutral-400 hover:text-white -ml-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed</h1>
            <p className="text-neutral-400">Order ID: {order.id}</p>
          </div>
          <div className="bg-primary-500/10 text-primary-400 border border-primary-500/20 px-4 py-2 rounded-full font-medium">
            Status: {order.status}
          </div>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 mb-16 overflow-visible">
          <CardHeader>
            <CardTitle>Delivery Tracking</CardTitle>
            <CardDescription>Track the real-time progress of your premium assets.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-12 px-4 sm:px-12">
            <OrderTimeline status={order.status as OrderStatus} />
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Box className="w-5 h-5 mr-3 text-primary-500" />
          Order Items
        </h2>
        
        <div className="space-y-4">
          {items?.map(item => (
            <Card key={item.id} className="border-neutral-800 bg-neutral-900/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-neutral-950 rounded-lg overflow-hidden relative shrink-0">
                    {/* Access product join correctly, handling potential arrays from Supabase type inference */}
                    {item.products && !Array.isArray(item.products) && item.products.image_url ? (
                       <img src={item.products.image_url} alt={item.products.name} className="object-cover w-full h-full" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600">No Img</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {!Array.isArray(item.products) ? item.products?.name : 'Unknown Product'}
                    </h3>
                    <p className="text-sm text-neutral-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-white font-bold">
                  ${(item.price_at_purchase * item.quantity).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
