import BouncingHand from 'components/ui/animations/BouncingHand'
import Link from 'next/link'
import { headers } from 'next/headers'
import { getDictionary } from 'i18n/getDictionary'
import { defaultLocale, isLocale } from 'i18n/locales'

import Animation404 from 'components/ui/animations/Animation404'

// Rendered outside the [locale] layout: the locale comes from the proxy header.
const NotFound = async () => {
  const header = (await headers()).get('x-locale') ?? ''
  const locale = isLocale(header) ? header : defaultLocale
  const { notFound } = await getDictionary(locale)

  return (
    <div className='flex min-h-[calc(100vh-60px)] w-[84vw] flex-col items-center justify-center gap-4 py-12 text-center'>
      <Animation404 />
      <h1 className='text-2xl font-semibold text-balance text-primary-50 italic md:text-3xl'>
        {notFound.tagline}
      </h1>
      <Link
        className='group mt-4 inline-flex items-center gap-2 text-xl text-brand'
        href={`/${locale}`}>
        {/* Only the label is underlined on hover, not the hand. */}
        <span className='group-hover:underline'>{notFound.buttonLabel}</span>
        <BouncingHand />
      </Link>
    </div>
  )
}

export default NotFound
