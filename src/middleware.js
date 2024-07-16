import { NextResponse } from 'next/server';

export const middleware = (request) => {
  const token = request.cookies.get("refreshToken")

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// matcher
export const config = {
  matcher: ['/admin/:path*']
}