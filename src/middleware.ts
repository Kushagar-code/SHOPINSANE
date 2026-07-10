import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  if (url.pathname.startsWith('/admin')) {
    // 1. Check Mock Session cookie first
    const mockSession = request.cookies.get('shopinsane_mock_session')?.value
    const adminEmails = ['joepsycho@shopinsane.com', 'rajan@shopinsane.com']
    
    if (mockSession && adminEmails.includes(mockSession)) {
      return NextResponse.next()
    }
    
    // 2. Fallback to Supabase SSR Client getUser check
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      "https://vpbrguytkaelchyxmywf.supabase.co",
      "sb_publishable_IxbBo8II5_jNRn_sxlwQiA_ZnQPrS2S",
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !adminEmails.includes(user.email || '')) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch (e) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
