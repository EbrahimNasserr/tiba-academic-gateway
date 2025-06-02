import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

// Add paths that should be protected (require authentication)
const protectedPaths = [
  '/courses',
  '/subjects',
  '/lectures',
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath) {
    // Get the token from either Authorization header or cookies
    const authHeader = request.headers.get('Authorization');
    const authToken = authHeader?.split('Bearer ')[1];
    const cookieToken = request.cookies.get('token')?.value;
    const token = authToken || cookieToken;

    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token with Firebase
      await auth.verifyIdToken(token);
      return NextResponse.next();
    } catch (error) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/courses/:path*',
    '/subjects/:path*',
    '/lectures/:path*',
  ],
};