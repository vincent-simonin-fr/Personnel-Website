'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SunSvg from 'components/ui/svg/SunSvg'
import MoonSvg from 'components/ui/svg/MoonSvg'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex items-center gap-2'>
      {theme === 'dark' ? (
        <SunSvg
          className='duration-800 h-6 w-6 ease-soft-spring hover:animate-spinner-ease-spin hover:brightness-[0.8]'
          size={24}
          onClick={() => setTheme('light')}
        />
      ) : (
        <MoonSvg
          className='duration-800 h-6 w-6 ease-soft-spring hover:animate-spinner-ease-spin hover:brightness-[1.5]'
          size={24}
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  )
}
