import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const accessToken = request.cookies.get('access_token')?.valueOf();

    if(!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // TODO: validate the token value here too

    return response;
}


export const config = {
    matcher: [
        '/dashboard', 
        // ? '/dashboard/:path*' Middleware doesn't run on all paths with prefix
        '/tasks',
        '/calendar',
        '/settings'
    ],
  }