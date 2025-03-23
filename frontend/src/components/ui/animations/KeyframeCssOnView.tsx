import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

type KeyframeCssOnViewProps = {
  children: React.ReactNode
  cssClass: string
  rootMargin?: string
}

const KeyframeCssOnView = ({ children, cssClass, rootMargin = '-10%' }: KeyframeCssOnViewProps) => {
  const { ref, entry, isIntersecting } = useIntersectionObserver({
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    rootMargin: rootMargin,
  })

  useEffect(() => {
    // Use for animation rendered on Safari & Firefox
    if (!CSS.supports('animation-timeline: view()')) {
      console.log(isIntersecting)
      entry?.target.classList.toggle('visible', entry.isIntersecting)
      if (!isIntersecting) {
        entry?.target.classList.add('hiden')
      } else {
        entry?.target.classList.remove('hiden')
      }
    }
  }, [isIntersecting])

  return (
    <div ref={ref} className={`relative w-full ${cssClass}`}>
      {children}
    </div>
  )
}

export default KeyframeCssOnView
