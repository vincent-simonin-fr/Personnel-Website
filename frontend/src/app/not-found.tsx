'use client'

import BouncingHand from 'components/BouncingHand'
import Link from 'next/link'
import { getDictionary } from './i18n/dictionnaries'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from 'components/client/Loading'
import FuzzyText from 'components/FuzzyText'

const NotFound = () => {
  const [locale, setLocale] = useState<string>()
  const path = usePathname()

  const {
    data: dict,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['dictionary', locale],
    queryFn: () => getDictionary(locale!),
  })

  useEffect(() => {
    const segments = path.split('/')
    setLocale(segments[1])
  }, [path])

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-y-4'>
        <FuzzyText baseIntensity={0.2} fontSize='15vw'>
          404
        </FuzzyText>
        <h1 className='text-balance text-center text-4xl font-bold'>{dict?.notFound.title}</h1>
        <p className='text-balance text-center text-2xl'>{dict?.notFound.subtitle}</p>
        <Link className='text mt-10 text-xl hover:underline hover:opacity-[0.7]' href='/'>
          {dict?.notFound.buttonLabel} <BouncingHand />
        </Link>
      </div>
    </Loading>
  )
}

export default NotFound
