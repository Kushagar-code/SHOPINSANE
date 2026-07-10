'use server'

import { getCurrentUser } from '@/lib/api/auth'

export async function getAdminSession() {
  const user = await getCurrentUser()
  if (user && (user.role === 'admin' || user.email === 'joepsycho@shopinsane.com' || user.email === 'rajan@shopinsane.com')) {
    return { isAdmin: true, email: user.email }
  }
  return { isAdmin: false, email: '' }
}
