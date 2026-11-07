import BouncingHand from 'components/ui/animations/BouncingHand'
import Link from 'next/link'
import { headers } from 'next/headers'
import FuzzyText from 'components/ui/animations/FuzzyText'
import { getDictionary } from 'i18n/getDictionary'

import Animation404 from 'components/ui/animations/Animation404'

// Rendered outside the [locale] layout: the locale comes from the proxy header.
const NotFound = async () => {
  const locale = (await headers()).get('x-locale') ?? 'fr'
  const { notFound } = await getDictionary(locale)

  return (
    <div className='flex min-h-[calc(100vh-60px)] flex-col items-center justify-start'>
      <Animation404 />
      <FuzzyText
        baseIntensity={0.2}
        fontSize='clamp(2rem, 6vw, 6rem)'
        fontWeight={700}>
        404
      </FuzzyText>
      <h1 className='text-balance text-center text-4xl'>{notFound.title}</h1>
      <p className='text-balance text-center text-2xl'>{notFound.subtitle}</p>
      <Link
        className='text mt-4 text-xl hover:underline hover:opacity-[0.7]'
        href={`/${locale}`}>
        {notFound.buttonLabel} <BouncingHand />
      </Link>
    </div>
  )
}

export default NotFound
