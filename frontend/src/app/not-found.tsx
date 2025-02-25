'use client'

import BouncingHand from 'components/ui/BouncingHand'
import Link from 'next/link'
import { useEffect } from 'react'
import Loading from 'components/loading/Loading'
import FuzzyText from 'components/ui/FuzzyText'
import { useGlobalContext } from 'hooks/useGlobalContext'

const NotFound = () => {
  const { dictionary: dict, isLoading: isLoading, isError, error } = useGlobalContext()

  useEffect(() => {}, [dict])

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-y-4'>
        <FuzzyText baseIntensity={0.2} fontSize='15vw'>
          404
        </FuzzyText>
        <h1 className='text-balance text-center text-4xl font-bold'>{dict?.notFound.title}</h1>
        <p className='text-balance text-center text-2xl'>{dict?.notFound.subtitle}</p>
        <Link
          className='text mt-10 text-xl hover:underline hover:opacity-[0.7]'
          href='/'
          rel='noopener noreferrer'>
          {dict?.notFound.buttonLabel} <BouncingHand />
        </Link>
      </div>
    </Loading>
  )
}

export default NotFound
