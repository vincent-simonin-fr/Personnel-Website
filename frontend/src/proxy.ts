import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale, matchLocale } from 'i18n/locales'

const PUBLIC_FILE = /\.(.*)$/

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
  // No Cross-Origin-Embedder-Policy: with this COOP the page is never cross-origin
  // isolated, so COEP would only block cross-origin images lacking a CORP header.
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
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

  const isDev = process.env.NODE_ENV === 'development'

  // No nonce: pages are prerendered once for everyone, so a per-request nonce can't be in
  // them. 'unsafe-inline' lets Next's inline scripts (RSC payload, next-themes) run; the
  // site renders no visitor input and loads no third-party script.
  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://api.emailjs.com;
    script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} ;
    frame-src 'self';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  // No CORS: the site has no API and nothing fetches its pages from another origin.
  const pathname = req.nextUrl.pathname

  // Vérifie si le chemin inclut une langue (segment exact : `/fresh` n'est pas `fr`)
  const firstSegment = pathname.split('/')[1]
  const hasLocale = isLocale(firstSegment)

  // Locale-less URL (e.g. "/"): language of the last visited page, else the
  // browser's, else the default (crawlers send no Accept-Language: they get x-default).
  const savedLocale = req.cookies.get('NEXT_LOCALE')?.value ?? ''
  const locale = hasLocale
    ? firstSegment
    : isLocale(savedLocale)
      ? savedLocale
      : (matchLocale(req.headers.get('accept-language')) ?? defaultLocale)
  // Request header (not response): only global-not-found reads it, pages get the locale
  // from the URL.
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-locale', locale)

  // Locale-less URL: rewritten, not redirected (no extra round trip). Client code reads
  // the path through stripLocale(), which handles both forms.
  const target = req.nextUrl.clone()
  target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  const response = hasLocale
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : NextResponse.rewrite(target, { request: { headers: requestHeaders } })

  // Remember the language of the last page with one in its URL (switcher, hreflang
  // link…): "/" then opens in it. Lax, not strict: a strict cookie is not sent when the
  // visitor arrives from another site (a search result), when it matters most.
  if (hasLocale && savedLocale !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      httpOnly: true,
      secure: !isDev,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
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
