'use client'

import dynamic from 'next/dynamic'
import { useIntersectionObserver } from 'usehooks-ts'
import type { RiveCanvasProps } from './RiveCanvas'

export type { RiveInputs } from './RiveCanvas'

// Same box as the canvas, so swapping it in causes no layout shift.
const placeholder = <div className='aspect-[1/1] h-full w-full' />

// Rive runtime (~60 KB gzip JS) + WASM (~630 KB gzip) + .riv: fetched only when needed.
const RiveCanvas = dynamic(() => import('./RiveCanvas'), {
  ssr: false,
  loading: () => placeholder,
})

/** Decorative Rive animation, loaded when it gets close to the viewport. */
const RivePlayer = (props: RiveCanvasProps) => {
  const { ref, isIntersecting: isNear } = useIntersectionObserver({
    rootMargin: '400px',
    freezeOnceVisible: true,
  })

  return (
    <div ref={ref} aria-hidden className='relative mx-auto w-full'>
      {isNear ? <RiveCanvas {...props} /> : placeholder}
    </div>
  )
}

export default RivePlayer
