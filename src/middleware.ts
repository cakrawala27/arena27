import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = 'QR?005eboox';
const COOKIE_NAME = 'arena27_admin_auth';

export function middleware(request: NextRequest) {
  // Jangan blokir halaman login
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Cek cookie auth
  const authCookie = request.cookies.get(COOKIE_NAME);

  // Kalau udah login, lanjut
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Kalau belum login, redirect ke halaman login
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  return NextResponse.redirect(url);
}

// Middleware cuma jalan di /admin (kecuali /admin/login)
export const config = {
  matcher: ['/admin/:path*'],
};
