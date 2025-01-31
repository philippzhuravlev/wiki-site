import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ERAS = ['golden', 'steel', 'coal'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split('/')[1];

  // If the first segment is an era, don't run the catch-all route
  if (ERAS.includes(firstSegment)) {
    return NextResponse.next();
  }

  // For non-era pages, let the catch-all route handle it
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
} 