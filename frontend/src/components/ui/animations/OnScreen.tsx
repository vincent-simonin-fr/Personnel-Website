'use client'

import { ReactNode, Suspense } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

type OnScreenProps = {
  children: ReactNode
  /** Must reproduce the space the child fills (it is empty while off-screen). */
  className?: string
  /** How far outside the viewport the child is already mounted. */
  rootMargin?: string
}

/**
 * Mounts a canvas/WebGL animation only while it is near the viewport. Off-screen it is
 * unmounted, which runs its cleanup (cancelAnimationFrame, WebGL context release), so
 * its render loop costs nothing; its lazy chunk is also fetched only when first needed.
 */
const OnScreen = ({
  children,
  className = 'h-full w-full',
  rootMargin = '200px',
}: OnScreenProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ rootMargin })

  return (
    <div ref={ref} className={className}>
      {/* Suspense: a lazy child mounting late must not suspend the whole page. */}
      {isIntersecting && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  )
}

export default OnScreen
