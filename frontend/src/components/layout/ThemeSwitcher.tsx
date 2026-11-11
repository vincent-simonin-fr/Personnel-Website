'use client'

import { Button } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SunSvg from 'components/ui/svg/SunSvg'
import MoonSvg from 'components/ui/svg/MoonSvg'
import { useLocaleContext } from 'providers/LocaleContextProvider'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { a11y } = useLocaleContext().dictionary

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // The theme is only known after mount (localStorage); until then assume the default
  // (dark) for the label, and keep the button in place with an empty icon slot, so it
  // doesn't pop in and shift the header.
  const isDark = !mounted || theme === 'dark'

  return (
    <Button
      // Same look as the language button next to it (24px icon).
      className='min-w-8 rounded-full px-2 text-primary [&_svg]:size-6'
      variant='ghost'
      isIconOnly
      aria-label={isDark ? a11y.lightTheme : a11y.darkTheme}
      onPress={() => setTheme(isDark ? 'light' : 'dark')}>
      {!mounted ? (
        <span aria-hidden className='size-6' />
      ) : isDark ? (
        <SunSvg
          className='duration-800 ease-soft-spring hover:animate-spinner-ease-spin hover:brightness-[0.8]'
          size={24}
        />
      ) : (
        <MoonSvg
          className='duration-800 ease-soft-spring hover:animate-spinner-ease-spin hover:brightness-[1.5]'
          size={24}
        />
      )}
    </Button>
  )
}
