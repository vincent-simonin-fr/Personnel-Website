'use client'

import BouncingHand from 'components/ui/animations/BouncingHand'
import Link from 'next/link'
import { useEffect } from 'react'
import Loading from 'components/loading/Loading'
import FuzzyText from 'components/ui/animations/FuzzyText'
import { useAppContext } from 'hooks/useAppContext'
import { RivePlayer } from 'components/ui/RivePlayer'

const NotFound = () => {
  const { dictionary, isLoading, isError, error, setIs404 } = useAppContext()

  useEffect(() => {
    setIs404(true)
    return () => setIs404(false)
  }, [dictionary])

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className='flex min-h-[calc(100vh-60px)] flex-col items-center justify-start'>
        <RivePlayer
          src='/animations/cute_monster.riv'
          stateMachines='StateMachine'
          autoplay
          actions={{
            onClick: (rive, inputs) => {
              if (rive && inputs.click) {
                inputs.click.value = true
              }
            },
            onMouseEnter: (rive, inputs) => {
              if (rive) {
                rive.play()
              }
            },
          }}
        />
        <FuzzyText baseIntensity={0.2} fontSize='clamp(2rem, 8vw, 6rem)' fontWeight={700}>
          404
        </FuzzyText>
        <h1 className='text-balance text-center text-4xl'>{dictionary?.notFound.title}</h1>
        <p className='text-balance text-center text-2xl'>{dictionary?.notFound.subtitle}</p>
        <Link className='text mt-4 text-xl hover:underline hover:opacity-[0.7]' href='/'>
          {dictionary?.notFound.buttonLabel} <BouncingHand />
        </Link>
      </div>
    </Loading>
  )
}

export default NotFound
