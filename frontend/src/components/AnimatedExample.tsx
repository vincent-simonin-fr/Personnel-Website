import { animated, useSpring, config } from '@react-spring/web'
import { useState } from 'react'

const AnimatedExample = () => {
  const [isVisible, setIsVisible] = useState(false)

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    config: config.molasses,
  })

  const scaleAndFade = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.5)',
    config: { tension: 300, friction: 10 },
  })

  const combined = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.8)',
    config: { mass: 1, tension: 180, friction: 12 },
  })

  const AnimatedDiv = animated('div')

  return (
    <div className='space-y-4'>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Animation</button>

      <AnimatedDiv style={fadeIn} className='bg-blue-500 p-4'>
        Fade In
      </AnimatedDiv>

      <AnimatedDiv style={scaleAndFade} className='bg-green-500 p-4'>
        Scale and Fade
      </AnimatedDiv>

      <AnimatedDiv style={combined} className='bg-purple-500 p-4'>
        Combined Animation
      </AnimatedDiv>
    </div>
  )
}

export default AnimatedExample
