import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const allowedOrigins = ['https://dev.vincentsimonin.fr', 'http://localhost:3000']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    connect-src https: 'self' https://cdn.jsdelivr.net https://unpkg.com;
    script-src https: 'self' 'nonce-${nonce}' 'wasm-unsafe-eval' 'unsafe-inline' 'strict-dynamic';
    frame-src 'self';
    style-src https: 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(req.headers)

  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  // Check the origin from the request
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = req.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  const pathname = req.nextUrl.pathname

  // Langues supportées
  const locales = ['en-US', 'fr', 'de']
  // Vérifie si le chemin inclut une langue
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`))

  if (!hasLocale) {
    const defaultLocale = 'fr'
    const response = NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, req.url), {
      request: {
        headers: requestHeaders,
      },
    })

    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }

    response.headers.set('x-locale', defaultLocale)
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
    return response
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  const locale = pathname.split('/')[1]
  response.headers.set('x-locale', locale)
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}

// Configuration pour que le middleware s'applique à toutes les routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
