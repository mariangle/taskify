import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  return response
}

export const config = {
  matcher: [
    '/inbox',
    // ? '/dashboard/:path*' Middleware doesn't run on all paths with prefix
    '/tasks',
    '/settings',
  ],
}
