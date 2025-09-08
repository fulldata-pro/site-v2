import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')
  const pathname = request.nextUrl.pathname
  
  const publicPages = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
  ]
  
  const isPublicPage = publicPages.includes(pathname)
  const isLoginPage = pathname === '/login'

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && (isLoginPage || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-.*\\.svg).*)',
  ],
}