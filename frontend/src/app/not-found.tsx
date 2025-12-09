import BouncingHand from 'components/ui/animations/BouncingHand'
import Link from 'next/link'
import FuzzyText from 'components/ui/animations/FuzzyText'

import Animation404 from 'components/ui/animations/Animation404'

const NotFound = () => {
  return (
    <div className='flex min-h-[calc(100vh-60px)] flex-col items-center justify-start'>
      <Animation404 />
      <FuzzyText
        baseIntensity={0.2}
        fontSize='clamp(2rem, 6vw, 6rem)'
        fontWeight={700}>
        404
      </FuzzyText>
      <h1 className='text-balance text-center text-4xl'>
        {'The page you are looking for does not exist.'}
      </h1>
      <p className='text-balance text-center text-2xl'>
        {'It might have been moved or deleted.'}
      </p>
      <Link
        className='text mt-4 text-xl hover:underline hover:opacity-[0.7]'
        href='/'>
        {'Go there'} <BouncingHand />
      </Link>
    </div>
  )
}

export default NotFound
