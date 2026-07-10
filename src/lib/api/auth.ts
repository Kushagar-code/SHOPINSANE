import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export interface UserSession {
  id: string
  email: string
  role: string
  user_metadata?: {
    role?: string
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = cookies()
  const mockEmail = cookieStore.get('shopinsane_mock_session')?.value
  
  if (mockEmail) {
    return {
      id: mockEmail === 'joepsycho@shopinsane.com' ? 'admin-1' : 'admin-2',
      email: mockEmail,
      role: 'admin',
      user_metadata: { role: 'admin' }
    }
  }
  
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    return {
      id: user.id,
      email: user.email || '',
      role: 'authenticated'
    }
  } catch (e) {
    return null
  }
}
