import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Langues disponibles
  const locales = ['en-US', 'fr', 'de']

  // Vérifie si le chemin inclut une langue
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`))

  if (!hasLocale) {
    const defaultLocale = 'en-US'
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url))
  }

  return NextResponse.next()
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
