'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Plus, 
  Minus, 
  TrendingUp, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Lock, 
  ArrowLeft, 
  Check, 
  Truck, 
  CheckCircle,
  FilePlus2
} from 'lucide-react'
import Link from 'next/link'
import { SEEDED_PRODUCTS, SEEDED_CATEGORIES } from '@/lib/api/mockData'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function AdminPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminEmail, setAdminEmail] = useState('')
  const [loading, setLoading] = useState(true)

  // Local Storage Data States
  const [customProducts, setCustomProducts] = useState<any[]>([])
  const [stockAdjustments, setStockAdjustments] = useState<Record<string, number>>({})
  const [orders, setOrders] = useState<any[]>([])

  // Add Product Form States
  const [newProdName, setNewProdName] = useState('')
  const [newProdCategory, setNewProdCategory] = useState('cat-1')
  const [newProdPrice, setNewProdPrice] = useState('')
  const [newProdStock, setNewProdStock] = useState('50')
  const [newProdDesc, setNewProdDesc] = useState('')
  const [newProdImage, setNewProdImage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Carrier form input states for each order
  const [orderCarrierInput, setOrderCarrierInput] = useState<Record<string, string>>({})
  const [orderTrackingInput, setOrderTrackingInput] = useState<Record<string, string>>({})

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    setMounted(true)

    async function checkAuth() {
      // 1. Check mock session cookie first
      const cookies = document.cookie.split('; ')
      const mockSession = cookies.find(row => row.startsWith('shopinsane_mock_session='))
      const mockEmail = mockSession ? decodeURIComponent(mockSession.split('=')[1]) : ''

      if (mockEmail === 'joepsycho@shopinsane.com' || mockEmail === 'rajan@shopinsane.com') {
        setIsAdmin(true)
        setAdminEmail(mockEmail)
        setLoading(false)
        return
      }

      // 2. Check Supabase user fallback
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user && (user.email === 'joepsycho@shopinsane.com' || user.email === 'rajan@shopinsane.com')) {
          setIsAdmin(true)
          setAdminEmail(user.email)
          setLoading(false)
          return
        }
      } catch (err) {
        // Ignored
      }

      setIsAdmin(false)
      setLoading(false)
    }

    checkAuth()

    // Load Local Storage Sync States
    const storedCustom = JSON.parse(localStorage.getItem('shopinsane_custom_products') || '[]')
    const storedAdjustments = JSON.parse(localStorage.getItem('shopinsane_stock_adjustments') || '{}')
    const storedOrders = JSON.parse(localStorage.getItem('shopinsane_orders') || '[]')

    setCustomProducts(storedCustom)
    setStockAdjustments(storedAdjustments)
    setOrders(storedOrders)
  }, [supabase])

  // Catalog products (seeded + custom additions)
  const allProducts = useMemo(() => {
    return [...SEEDED_PRODUCTS, ...customProducts]
  }, [customProducts])

  // Calculate order items sales quantities
  const localUnitsSoldMap = useMemo(() => {
    const map: Record<string, number> = {}
    orders.forEach((ord) => {
      if (ord.status !== 'Cancelled') {
        ord.items?.forEach((item: any) => {
          map[item.product_id] = (map[item.product_id] || 0) + item.quantity
        })
      }
    })
    return map
  }, [orders])

  // Computed Analytics
  const metrics = useMemo(() => {
    const totalSales = orders.reduce((sum, ord) => sum + ord.total_amount, 0)
    const totalUnits = orders.flatMap(o => o.items || []).reduce((sum, item) => sum + item.quantity, 0)
    
    // Most popular product calculation
    let maxSold = -1
    let popularProduct = 'N/A'
    
    allProducts.forEach((p) => {
      const dbSold = p.units_sold || 0
      const activeSold = localUnitsSoldMap[p.id] || 0
      const totalSold = dbSold + activeSold
      if (totalSold > maxSold) {
        maxSold = totalSold
        popularProduct = p.name
      }
    })

    return {
      totalSales,
      totalUnits,
      totalOrders: orders.length,
      popularProduct
    }
  }, [orders, allProducts, localUnitsSoldMap])

  // Adjust stock levels
  const handleStockAdjust = (productId: string, increment: boolean) => {
    const currentAdjust = stockAdjustments[productId] || 0
    const newAdjust = currentAdjust + (increment ? 1 : -1)
    
    const updated = { ...stockAdjustments, [productId]: newAdjust }
    setStockAdjustments(updated)
    localStorage.setItem('shopinsane_stock_adjustments', JSON.stringify(updated))
  }

  // Add custom product to local storage catalog
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    
    const parsedPrice = parseFloat(newProdPrice)
    const parsedStock = parseInt(newProdStock)

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError('Please enter a valid price.')
      return
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      setFormError('Please enter a valid stock level.')
      return
    }
    if (!newProdName.trim()) {
      setFormError('Product Name is required.')
      return
    }

    const defaultImg = newProdImage.trim() || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60'

    const newProduct = {
      id: `prod-cust-${Date.now()}`,
      category_id: newProdCategory,
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: parsedPrice,
      image_url: defaultImg,
      thumbnails: [defaultImg],
      tags: ['new', 'custom'],
      rating: 5.0,
      review_count: 0,
      description: newProdDesc || 'Custom asset added via admin console.',
      stock: parsedStock,
      units_sold: 0
    }

    const updated = [newProduct, ...customProducts]
    setCustomProducts(updated)
    localStorage.setItem('shopinsane_custom_products', JSON.stringify(updated))

    setFormSubmitted(true)
    setNewProdName('')
    setNewProdPrice('')
    setNewProdStock('50')
    setNewProdDesc('')
    setNewProdImage('')
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  // Update order tracking status and details
  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          shipping_address: {
            ...ord.shipping_address,
            carrier: orderCarrierInput[orderId] || ord.shipping_address?.carrier || '',
            trackingNumber: orderTrackingInput[orderId] || ord.shipping_address?.trackingNumber || ''
          }
        }
      }
      return ord
    })

    setOrders(updated)
    localStorage.setItem('shopinsane_orders', JSON.stringify(updated))
  }

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-mist text-center">
        <div className="space-y-4">
          <div className="w-10 h-10 border-4 border-shop-violet border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-gray font-gt-standard">Authenticating dashboard credentials...</p>
        </div>
      </div>
    )
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-mist gap-4 text-center px-6">
        <span className="text-4xl">🔒</span>
        <h1 className="text-2xl font-bold text-ink-black font-gt-standard">Access Restricted</h1>
        <p className="text-muted-gray text-sm font-gt-standard max-w-sm">This dashboard console is restricted to administrative staff only.</p>
        <Button onClick={() => router.push('/login')} className="rounded-pills bg-shop-violet text-pure-white px-6">Sign in as Admin</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-mist pt-24 pb-16 px-6 font-gt-standard">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-ink-black flex items-center gap-2">
              <Lock className="w-8 h-8 text-shop-violet" />
              Admin Board
            </h1>
            <p className="text-sm text-muted-gray">Logged in as: <span className="font-semibold text-ink-black">{adminEmail}</span></p>
          </div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-gray hover:text-ink-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to marketplace
          </Link>
        </div>

        {/* 1. Sales Analytics Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 border-faint-border bg-pure-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-shop-violet/10 flex items-center justify-center text-shop-violet">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-gray font-bold uppercase tracking-wider">Total Sales</span>
              <h2 className="text-xl font-bold text-ink-black">${metrics.totalSales.toLocaleString()}</h2>
            </div>
          </Card>

          <Card className="p-6 border-faint-border bg-pure-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-shop-violet/10 flex items-center justify-center text-shop-violet">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-gray font-bold uppercase tracking-wider">Units Sold</span>
              <h2 className="text-xl font-bold text-ink-black">{metrics.totalUnits} items</h2>
            </div>
          </Card>

          <Card className="p-6 border-faint-border bg-pure-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-shop-violet/10 flex items-center justify-center text-shop-violet">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-gray font-bold uppercase tracking-wider">Active Orders</span>
              <h2 className="text-xl font-bold text-ink-black">{metrics.totalOrders} orders</h2>
            </div>
          </Card>

          <Card className="p-6 border-faint-border bg-pure-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-shop-violet/10 flex items-center justify-center text-shop-violet">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-gray font-bold uppercase tracking-wider">Most Popular</span>
              <h2 className="text-sm font-semibold text-ink-black mt-1 line-clamp-1">{metrics.popularProduct}</h2>
            </div>
          </Card>
        </div>

        {/* 2. Main Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Product Form Column */}
          <div className="lg:col-span-1">
            <Card className="border-faint-border bg-pure-white shadow-sm p-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FilePlus2 className="w-5 h-5 text-shop-violet" />
                  Add New Product
                </CardTitle>
                <CardDescription>Insert a new listing directly into the catalog.</CardDescription>
              </CardHeader>
              <form onSubmit={handleAddProduct}>
                <CardContent className="space-y-4">
                  {formSubmitted && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Product added successfully!</span>
                    </div>
                  )}
                  {formError && (
                    <div className="p-3 text-xs text-semantic-error bg-semantic-error/10 border border-semantic-error/20 rounded-md">
                      {formError}
                    </div>
                  )}

                  <Input
                    label="Product Name"
                    placeholder="e.g. Pixel Watch 3"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-ink-black">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full h-10 rounded-lg bg-pure-white border border-faint-border text-ink-black px-3 focus:outline-none focus:ring-2 focus:ring-shop-violet/40 focus:border-shop-violet"
                    >
                      {SEEDED_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Price ($)"
                      placeholder="e.g. 299.99"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      required
                    />
                    <Input
                      label="Initial Stock"
                      placeholder="e.g. 50"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-ink-black">Description</label>
                    <textarea
                      placeholder="Add detailed specs..."
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg bg-pure-white border border-faint-border text-ink-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-shop-violet/40 focus:border-shop-violet"
                    />
                  </div>

                  <Input
                    label="Image URL"
                    placeholder="https://images.unsplash.com/..."
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                  />

                  <Button type="submit" className="w-full rounded-pills bg-shop-violet text-pure-white">
                    Publish Product
                  </Button>
                </CardContent>
              </form>
            </Card>
          </div>

          {/* Real-time Inventory & Popular list Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Inventory Levels */}
            <Card className="border-faint-border bg-pure-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Inventory Metrics</CardTitle>
                <CardDescription>Track real-time stock levels of active items.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[50vh] overflow-y-auto divide-y divide-faint-border px-6">
                  {allProducts.map((p) => {
                    const dbSold = p.units_sold || 0
                    const activeSold = localUnitsSoldMap[p.id] || 0
                    const soldCount = dbSold + activeSold

                    const initialStock = p.stock !== undefined ? p.stock : 50
                    const currentStock = (initialStock + (stockAdjustments[p.id] || 0)) - activeSold

                    return (
                      <div key={p.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-ink-black truncate">{p.name}</h4>
                          <p className="text-xs text-muted-gray mt-0.5">Sold: <span className="font-semibold text-ink-black">{soldCount} units</span></p>
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0">
                          {/* Stock status indicator */}
                          <span className={cn(
                            "text-xs px-2.5 py-1 rounded-full font-semibold",
                            currentStock <= 5 
                              ? "bg-red-50 text-red-600 border border-red-200" 
                              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          )}>
                            {currentStock} in stock
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleStockAdjust(p.id, false)}
                              className="p-1 border border-faint-border rounded-full hover:bg-canvas-mist transition-colors active:scale-95"
                              title="Decrement stock"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleStockAdjust(p.id, true)}
                              className="p-1 border border-faint-border rounded-full hover:bg-canvas-mist transition-colors active:scale-95"
                              title="Increment stock"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* 3. Order Tracking Pipeline Console */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-black">Order Status Pipelines</h2>
          
          {orders.length === 0 ? (
            <Card className="p-12 text-center border-faint-border bg-pure-white shadow-sm">
              <span className="text-3xl">📦</span>
              <h3 className="text-lg font-semibold text-ink-black mt-2">No active orders placed</h3>
              <p className="text-sm text-muted-gray">Orders created during checkout will show up here.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((ord) => (
                <Card key={ord.id} className="border-faint-border bg-pure-white shadow-sm p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-faint-border pb-4">
                    <div>
                      <h3 className="font-semibold text-ink-black">Order ID: {ord.id}</h3>
                      <p className="text-xs text-muted-gray mt-0.5">Placed: {new Date(ord.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-gray">Current Status:</span>
                      <span className="bg-shop-violet/10 text-shop-violet px-3 py-1 rounded-full text-xs font-semibold">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  {/* Address and Items lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-muted-gray uppercase text-[10px] tracking-wider mb-2">Shipping Information</h4>
                      <p className="font-semibold">{ord.shipping_address?.fullName}</p>
                      <p className="text-muted-gray">{ord.shipping_address?.street}, {ord.shipping_address?.city}</p>
                      <p className="text-muted-gray">{ord.shipping_address?.zipCode}, {ord.shipping_address?.country}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-gray uppercase text-[10px] tracking-wider mb-2">Items Purchased</h4>
                      <div className="space-y-1">
                        {ord.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-xs font-medium">
                            <span className="text-muted-gray">{item.quantity}x {item.product_name}</span>
                            <span className="text-ink-black font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status update, carrier details inputs */}
                  <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-faint-border items-end justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                      <Input
                        label="Courier Carrier"
                        placeholder="e.g. FedEx / DHL"
                        value={orderCarrierInput[ord.id] !== undefined ? orderCarrierInput[ord.id] : ord.shipping_address?.carrier || ''}
                        onChange={(e) => setOrderCarrierInput({ ...orderCarrierInput, [ord.id]: e.target.value })}
                        className="h-9 text-sm"
                      />
                      <Input
                        label="Tracking Code"
                        placeholder="e.g. TRK12345678"
                        value={orderTrackingInput[ord.id] !== undefined ? orderTrackingInput[ord.id] : ord.shipping_address?.trackingNumber || ''}
                        onChange={(e) => setOrderTrackingInput({ ...orderTrackingInput, [ord.id]: e.target.value })}
                        className="h-9 text-sm"
                      />
                    </div>

                    {/* Status shifting actions buttons */}
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() => handleUpdateOrderStatus(ord.id, 'Shipped')}
                        className="px-4 py-2 bg-pure-white border border-faint-border rounded-pills hover:bg-canvas-mist text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Mark as Shipped"
                      >
                        <Truck className="w-3.5 h-3.5 text-shop-violet" />
                        Ship
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(ord.id, 'Out for Delivery')}
                        className="px-4 py-2 bg-pure-white border border-faint-border rounded-pills hover:bg-canvas-mist text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Mark as Out for Delivery"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-500" />
                        Out for Delivery
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                        className="px-4 py-2 bg-pure-white border border-faint-border rounded-pills hover:bg-canvas-mist text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Mark as Delivered"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Deliver
                      </button>
                    </div>
                  </div>

                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
