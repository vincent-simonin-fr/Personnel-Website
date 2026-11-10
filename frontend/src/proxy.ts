import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale } from 'i18n/locales'

const PUBLIC_FILE = /\.(.*)$/
const allowedOrigins = [
  'https://vincentsimonin.fr',
  'https://dev.vincentsimonin.fr', // preprod
  'http://localhost:3000',
]

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
    // HTML carries a per-request CSP nonce: never let a shared cache (CDN) reuse it.
    // no-cache (revalidate), not no-store, so the browser's back/forward cache still works.
    // On Vercel, Next overrides this for dynamic pages (no-store): not actionable there.
    key: 'Cache-Control',
    value: 'private, no-cache',
  },
  {
    key: 'Vary',
    value: 'Accept-Encoding',
  },
]

export function proxy(req: NextRequest) {
  // Not considering request to api
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://api.emailjs.com;
    script-src 'self' 'nonce-${nonce}' 'wasm-unsafe-eval' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : 'strict-dynamic'} ;
    frame-src 'self';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    block-all-mixed-content;`
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

  // Vérifie si le chemin inclut une langue (segment exact : `/fresh` n'est pas `fr`)
  const firstSegment = pathname.split('/')[1]
  const hasLocale = isLocale(firstSegment)

  // Locale-less URL (e.g. "/"): last language picked in LocaleSwitcher, else the default.
  const savedLocale = req.cookies.get('NEXT_LOCALE')?.value ?? ''
  const locale = hasLocale
    ? firstSegment
    : isLocale(savedLocale)
      ? savedLocale
      : defaultLocale
  // Request header (not response): read by the root layout and not-found via headers()
  requestHeaders.set('x-locale', locale)

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
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
  securityHeaders.forEach((item) => {
    response.headers.set(item.key, item.value)
  })
  return response
}

// Configuration pour que le middleware s'applique à toutes les routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
