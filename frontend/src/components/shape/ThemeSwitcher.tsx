'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SunSvg from 'components/ui/svg/SunSvg'
import MoonSvg from 'components/ui/svg/MoonSvg'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Same-size placeholder until the theme is known: rendering nothing made the icon pop in
  // and shift the header (layout shift).
  if (!mounted) return <div aria-hidden className='h-6 w-6' />

  return (
    <div className='flex items-center gap-2'>
      {theme === 'dark' ? (
        <SunSvg
          className='h-6 w-6 duration-800 ease-soft-spring hover:animate-spinner-ease-spin hover:brightness-[0.8]'
          size={24}
          onClick={() => setTheme('light')}
        />
      ) : (
        <MoonSvg
          className='h-6 w-6 duration-800 ease-soft-spring hover:animate-spinner-ease-spin hover:brightness-[1.5]'
          size={24}
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  )
}
