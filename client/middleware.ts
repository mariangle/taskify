import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const accessToken = request.cookies.get('access_token')?.valueOf();

    if(!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return response;
}


export const config = {
    matcher: '/schedule',
  }