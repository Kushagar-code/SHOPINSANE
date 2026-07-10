'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsed = authSchema.safeParse({ email, password })
  if (!parsed.success) {
    return { error: 'Invalid email or password format.' }
  }

  // Intercept Admin credentials for mock auth scope
  if (
    (email === 'joepsycho@shopinsane.com' || email === 'rajan@shopinsane.com') &&
    password === 'AdminSecure2026!'
  ) {
    cookies().set('shopinsane_mock_session', email, { 
      path: '/', 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 24 
    })
    revalidatePath('/', 'layout')
    redirect('/')
    return
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsed = authSchema.safeParse({ email, password })
  if (!parsed.success) {
    return { error: 'Invalid email or password format.' }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  cookies().delete('shopinsane_mock_session')
  revalidatePath('/', 'layout')
  redirect('/')
}
