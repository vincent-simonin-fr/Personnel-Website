'use client'

import { PageTitle } from 'components/shape/PageTitle'
import { useTheme } from 'next-themes'
import { lazy } from 'react'

const Starfield = lazy(() => import('components/ui/animations/Starfield'))

const Labs = () => {
  const { theme } = useTheme()

  return (
    <>
      <PageTitle pageIndex={2} />
      <div className='relative -mt-16 w-screen'>
        <div className={theme === 'dark' ? '' : 'invert'}>
          <Starfield
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor='black'
          />
        </div>
        <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
          <div className='z-50 text-6xl text-primary'>Labs is good</div>
        </div>
      </div>
    </>
  )
}

export default Labs
