import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const allowedOrigins = ['https://dev.vincentsimonin.fr', 'http://localhost:3000']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const securityHeaders: { key: string; value: string }[] = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
  {
    key: 'Cache-Control',
    value: 'public, max-age=60, stale-while-revalidate=300',
  },
  {
    key: 'Vary',
    value: 'Accept-Encoding',
  },
]

// Langues supportées
const locales = ['en-US', 'fr', 'de']

export function middleware(req: NextRequest) {
  // Not considering request to api
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
  // Set nonce to headers to get it in root layout
  requestHeaders.set('x-nonce', nonce)

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

  // Vérifie si le chemin inclut une langue
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`))

  const locale = hasLocale ? pathname.split('/')[1] : 'fr'

  const response = hasLocale
    ? NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    : NextResponse.rewrite(new URL(`/${locale}${pathname}`, req.url), {
        request: {
          headers: requestHeaders,
        },
      })

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  response.headers.set('x-locale', locale)
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
  response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
  securityHeaders.forEach((item) => {
    response.headers.set(item.key, item.value)
  })
  return response
}

// Configuration pour que le middleware s'applique à toutes les routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
