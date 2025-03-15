import { useTransition, animated, useSpringRef, easings } from '@react-spring/web'
import { ReactNode, useEffect } from 'react'

type FadeInOnAppearProps = {
  children: ReactNode
}
const FadeInOnAppear = ({ children }: FadeInOnAppearProps) => {
  const transRef = useSpringRef()
  const [transitions, api] = useTransition(children, () => ({
    ref: transRef,
    from: { opacity: 0, scale: 1.1, transform: 'translateY(42px)', display: 'none' },
    enter: { opacity: 1, scale: 1, transform: 'translateY(0px)', display: 'block' },
    leave: { opacity: 1, scale: 1, transform: 'translateY(0px)', display: 'block' },
    config: {
      duration: 1000,
      easing: (t) => easings.easeInOutCubic(t),
    },
  }))

  useEffect(() => {
    transRef.start()
  }, [children])

  const AnimatedDiv = animated('div')

  return transitions((style, item) => (
    <AnimatedDiv key={'fade'} style={style}>
      {item}
    </AnimatedDiv>
  ))
}

export default FadeInOnAppear
