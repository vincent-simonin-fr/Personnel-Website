'use client'

import Starfield from 'components/ui/animations/Starfields'
import { useAppContext } from 'hooks/useAppContext'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const Labs = () => {
  const { dictionary } = useAppContext()
  const { theme } = useTheme()

  useEffect(() => {
    if (dictionary) {
      document.title = dictionary.navigation[2].title
    }
  }, [dictionary])

  return (
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
  )
}

export default Labs
