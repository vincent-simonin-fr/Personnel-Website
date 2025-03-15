'use client'

import * as motion from 'motion/react-client'

const BouncingHand = () => {
  return (
    <motion.span
      initial={{ y: 0 }}
      animate={{ y: [-5, 0, -5] }}
      transition={{
        repeat: Infinity,
        duration: 1.2,
        ease: 'easeInOut',
      }}
      className='relative top-[0.1em] inline-block pl-1 align-middle text-4xl'>
      👈
    </motion.span>
  )
}

export default BouncingHand
