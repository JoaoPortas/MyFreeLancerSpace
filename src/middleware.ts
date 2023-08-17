import { NextRequest, NextResponse } from 'next/server';
 
let locales = ['pt', 'en'];
 
// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) { return locales[0]; }
 
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  /*if (pathname.startsWith('/static/') || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }*/

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
 
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
 
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|static|favicon.ico).*)'
    // Optional: only run on root (/) URL
    // '/'
  ],
}