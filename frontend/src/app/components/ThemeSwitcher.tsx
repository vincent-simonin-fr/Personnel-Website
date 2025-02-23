'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon } from '@heroicons/react/24/outline'
import { MoonIcon } from '@heroicons/react/24/outline'
import { useGlobalContext } from '../hooks/useGlobalContext'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { setDarkMode } = useGlobalContext()

  useEffect(() => {
    setMounted(true)
  }, [setTheme])

  if (!mounted) return null

  return (
    <div className='flex items-center gap-2'>
      {theme === 'dark' ? (
        <SunIcon
          className='h-6 w-6 transition-colors hover:animate-spinner-ease-spin hover:brightness-[0.8]'
          onClick={() => {
            setTheme('light')
            setDarkMode(false)
          }}
        />
      ) : (
        <MoonIcon
          className='h-6 w-6 transition-colors-opacity hover:animate-spinner-ease-spin hover:opacity-[0.7]'
          onClick={() => {
            setTheme('dark')
            setDarkMode(true)
          }}
        />
      )}
    </div>
  )
}
