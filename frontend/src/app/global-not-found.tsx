import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import SiteShell from 'components/shape/SiteShell'
import { getDictionary } from 'i18n/getDictionary'
import { defaultLocale, isLocale } from 'i18n/locales'
import { MetadataSite, ViewportSite } from 'seo/MetadataSite'

import Animation404 from 'components/ui/animations/Animation404'

// Site defaults minus their "index, follow", which would contradict the noindex Next adds
// to 404s.
export const metadata: Metadata = { ...MetadataSite, robots: undefined }
export const viewport = ViewportSite

// Every unknown URL, in any language. Not a [locale]/not-found.tsx: with the root layout
// under [locale], Next can't server-render that one (crawlers would get an empty error
// shell). This file bypasses the root layout, hence SiteShell. Language from the proxy
// header: reading it makes only the 404 dynamic.
const GlobalNotFound = async () => {
  const header = (await headers()).get('x-locale') ?? ''
  const locale = isLocale(header) ? header : defaultLocale
  const dictionary = await getDictionary(locale)
  const { notFound } = dictionary

  return (
    <SiteShell locale={locale} dictionary={dictionary}>
      <div className='flex min-h-[calc(100vh-60px)] w-[84vw] flex-col items-center justify-center gap-4 py-12 text-center'>
        {/* The scene says it (the ball completes "404"): heading for screen readers. */}
        <h1 className='sr-only'>{notFound.tagline}</h1>
        <Animation404 graffiti={notFound.quote} />
        <Link
          className='mt-4 text-xl text-brand hover:underline'
          href={`/${locale}`}>
          {notFound.buttonLabel}
        </Link>
      </div>
    </SiteShell>
  )
}

export default GlobalNotFound
