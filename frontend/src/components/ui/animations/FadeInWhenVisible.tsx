'use client'

import { useIntersectionObserver } from 'usehooks-ts'

type FadeInWhenVisibleProps = {
  children: React.ReactNode
  opacityStart?: number
  scaleStart?: number
  duration?: number
  delay?: number
  visualDuration?: number
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
  once = false,
}: FadeInWhenVisibleProps) => {
  // Visible in the server HTML: content above the fold shows before (and without) JS, and
  // the entrance at load is a CSS animation (`fade-in-pop`, globals.css) that needs no JS.
  // After hydration the observer hides what is off-screen, unseen, so it can pop back in.
  const { ref, isIntersecting: isVisible } = useIntersectionObserver({
    freezeOnceVisible: once,
    initialIsIntersecting: true,
  })
  // Slight overshoot, like the former spring: the site's entrance signature.
  const scaleEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

  return (
    <div
      ref={ref}
      data-fade-in
      style={{
        opacity: isVisible ? 1 : opacityStart,
        transform: `scale(${isVisible ? 1 : scaleStart})`,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${visualDuration}s ${scaleEasing} ${delay}s`,
        animationDelay: `${delay}s`,
      }}>
      {children}
    </div>
  )
}

export default FadeInWhenVisible
