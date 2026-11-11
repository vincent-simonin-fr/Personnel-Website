'use client'

import { lazy } from 'react'
import { useTheme } from 'next-themes'
import OnScreen from 'components/ui/animations/OnScreen'

// Heavy canvas/WebGL animation: loaded when OnScreen mounts it.
const Threads = lazy(() => import('components/ui/animations/Threads'))

// The threads' color follows the theme: read here, not in the page (a server component).
// OnScreen mounts after hydration, so reading the theme causes no mismatch.
const HeroThreads = () => {
  const { theme } = useTheme()

  return (
    <OnScreen>
      <Threads
        color={theme === 'dark' ? [1, 1, 1] : [0, 0, 0]}
        amplitude={1}
        distance={0}
        enableMouseInteraction={false}
      />
    </OnScreen>
  )
}

export default HeroThreads
