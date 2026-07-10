import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Pass-through middleware to ensure next-on-pages generates _worker.js correctly
  // Authentication is handled at the page level to avoid async_hooks bug in Cloudflare Edge
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
