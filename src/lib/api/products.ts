import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string
  price: number
  original_price?: number | null
  image_url: string
  images?: string[] | null
  inventory_count: number
  stock?: number
  rating?: number
  review_count?: number
  tags: string[] | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image_url?: string | null
}

export async function getProducts(categorySlug?: string, query?: string): Promise<Product[]> {
  const supabase = createClient()
  
  let dbQuery = supabase.from('products').select('*')
  
  if (categorySlug) {
    // We need to join with categories to filter by category slug
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()
      
    if (category) {
      dbQuery = dbQuery.eq('category_id', category.id)
    }
  }

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`)
  }

  const { data, error } = await dbQuery.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return (data || []).map((p: any) => ({
    ...p,
    image_url: p.image_url || (Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : ''),
    inventory_count: p.inventory_count !== undefined ? p.inventory_count : (p.stock !== undefined ? p.stock : 50)
  })) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single()

  if (error || !data) {
    return null
  }

  return {
    ...data,
    image_url: data.image_url || (Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : ''),
    inventory_count: data.inventory_count !== undefined ? data.inventory_count : (data.stock !== undefined ? data.stock : 50)
  } as Product
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data as Category[]
}
