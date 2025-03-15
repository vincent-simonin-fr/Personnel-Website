import * as motion from 'motion/react-client'

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
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: once }}
      transition={{
        duration: duration,
        scale: { type: 'spring', visualDuration: visualDuration, bounce: bounce },
        delay: delay,
      }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: opacityStart, scale: scaleStart },
      }}>
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible
