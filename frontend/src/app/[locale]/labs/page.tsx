'use client'

import { lazy } from 'react'

const Starfield = lazy(() => import('components/ui/animations/Starfield'))

const Labs = () => {
  return (
    <>
      <div className='relative -mt-16 w-screen'>
        <div className='invert dark:invert-0'>
          <Starfield
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor='black'
          />
        </div>
        <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
          <h1 className='z-50 text-6xl text-primary'>Labs is good</h1>
        </div>
      </div>
    </>
  )
}

export default Labs
