'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { CartItem } from '@/store/cartStore'

const checkoutSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(1, "Full name is required"),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(5, "Valid ZIP is required"),
    country: z.string().min(1, "Country is required"),
  }),
  cartItems: z.array(z.object({
    product: z.object({
      id: z.string(),
      price: z.number()
    }),
    quantity: z.number().min(1)
  })).min(1, "Cart cannot be empty")
})

export async function processCheckout(payload: unknown) {
  const supabase = createClient()
  
  // 1. Verify User
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'You must be logged in to checkout.' }
  }

  // 2. Validate Payload
  const parsed = checkoutSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: 'Invalid checkout data provided.' }
  }

  const { shippingAddress, cartItems } = parsed.data
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  // 2.5 Multi-Factor Free-Tier Access Control (Rate Limiting)
  // Prevent users from spamming the DB to respect the $0 free-tier constraints
  const oneMinuteAgo = new Date(Date.now() - 60000).toISOString()
  const { data: recentOrders, error: recentOrderError } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', user.id)
    .gte('created_at', oneMinuteAgo)

  if (recentOrders && recentOrders.length >= 3) {
    return { error: 'You are placing orders too quickly. Please wait a moment.' }
  }

  // 3. Insert Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: 'Ordered'
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order Error:', orderError)
    return { error: 'Failed to create order.' }
  }

  // 4. Insert Order Items
  const orderItemsData = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product.id,
    price_at_purchase: item.product.price,
    quantity: item.quantity
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData)

  if (itemsError) {
    console.error('Order Items Error:', itemsError)
    return { error: 'Failed to save order items.' }
  }

  return { success: true, orderId: order.id }
}
