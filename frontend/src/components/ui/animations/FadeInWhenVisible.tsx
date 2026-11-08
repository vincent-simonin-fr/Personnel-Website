'use client'

import { useIntersectionObserver } from 'usehooks-ts'

type FadeInWhenVisibleProps = {
  children: React.ReactNode
  opacityStart?: number
  scaleStart?: number
  duration?: number
  delay?: number
  visualDuration?: number
  bounce?: number
  once?: boolean
}

// CSS transitions + IntersectionObserver. Was a motion.div: it pulled the motion library
// (~130 KB, mostly unused) onto every page for a fade/scale-in. Same props and behavior
// (re-hides when leaving the viewport unless `once`); reduced motion: see globals.css.
const FadeInWhenVisible = ({
  children,
  opacityStart = 0,
  scaleStart = 0,
  duration = 0.4,
  delay = 0,
  visualDuration = 0.4,
  bounce = 0.6,
  once = false,
}: FadeInWhenVisibleProps) => {
  const { ref, isIntersecting: isVisible } = useIntersectionObserver({
    freezeOnceVisible: once,
  })
  // bounce > 0: overshooting curve approximating the former spring; otherwise ease-out.
  const scaleEasing = bounce > 0 ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out'

  return (
    <div
      ref={ref}
      data-fade-in
      style={{
        opacity: isVisible ? 1 : opacityStart,
        transform: `scale(${isVisible ? 1 : scaleStart})`,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${visualDuration}s ${scaleEasing} ${delay}s`,
      }}>
      {children}
    </div>
  )
}

export default FadeInWhenVisible
