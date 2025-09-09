import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')
  const pathname = request.nextUrl.pathname
  
  // Public pages that don't require authentication
  const publicPages = [
    '/landing',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/history'
  ]
  
  const isPublicPage = publicPages.includes(pathname)
  const isAuthPage = ['/login', '/register'].includes(pathname)

  // If no token and not a public page, redirect to login
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If has token and trying to access auth pages, redirect to dashboard (root)
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If no token and accessing root, redirect to landing
  if (!token && pathname === '/') {
    return NextResponse.redirect(new URL('/landing', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-.*\\.svg).*)',
  ],
}