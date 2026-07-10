import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string
  price: number
  image_url: string
  inventory_count: number
  tags: string[] | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
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

  return data as Product[]
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
