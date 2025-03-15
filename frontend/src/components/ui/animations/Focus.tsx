import { Ref, useEffect, useRef, useState } from 'react'
import * as motion from 'motion/react-client'

interface TrueFocusProps {
  sentence?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
  orientation?: 'horizontal' | 'vertical'
  fontSize?: number
}

interface FocusRect {
  x: number
  y: number
  width: number
  height: number
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  orientation = 'horizontal',
  fontSize = 48,
}) => {
  const words = sentence.split(' ')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
        },
        (animationDuration + pauseBetweenAnimations) * 1000,
      )

      return () => clearInterval(interval)
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length])

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return
    if (!wordRefs.current[currentIndex] || !containerRef.current) return

    const parentRect = containerRef.current.getBoundingClientRect()
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect()

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    })
  }, [currentIndex, words.length])

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index)
      setCurrentIndex(index)
    }
  }

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex!)
    }
  }

  const cornerSize = fontSize * 0.3 // Scale corner size relative to font size
  const cornerBorder = Math.max(2, fontSize * 0.06) // Scale border width
  const cornerOffset = fontSize * 0.18

  return (
    <div
      className={`relative flex ${
        orientation === 'vertical' ? 'flex-col' : 'flex-wrap'
      } items-center justify-center gap-4 py-3`}
      ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex
        return (
          <span
            key={index}
            ref={
              ((el: HTMLSpanElement) => (wordRefs.current[index] = el)) as unknown as
                | Ref<HTMLSpanElement>
                | undefined
            }
            className='relative cursor-pointer text-[3rem] font-black'
            style={
              {
                fontSize: `${fontSize}px`,
                filter: manualMode
                  ? isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`
                  : isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}>
            {word}
          </span>
        )
      })}

      <motion.div
        className='pointer-events-none absolute left-0 top-0 box-border border-0'
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={
          {
            '--border-color': borderColor,
            '--glow-color': glowColor,
          } as React.CSSProperties
        }>
        <span
          className='absolute'
          style={{
            top: -cornerOffset,
            left: -cornerOffset,
            width: cornerSize,
            height: cornerSize,
            borderStyle: 'solid',
            borderWidth: `${cornerBorder}px 0 0 ${cornerBorder}px`,
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
          }}
        />
        <span
          className='absolute'
          style={{
            top: -cornerOffset,
            right: -cornerOffset,
            width: cornerSize,
            height: cornerSize,
            borderStyle: 'solid',
            borderWidth: `${cornerBorder}px ${cornerBorder}px 0 0`,
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
          }}
        />
        <span
          className='absolute'
          style={{
            bottom: -cornerOffset,
            right: -cornerOffset,
            width: cornerSize,
            height: cornerSize,
            borderStyle: 'solid',
            borderWidth: `0 ${cornerBorder}px ${cornerBorder}px 0`,
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
          }}
        />
        <span
          className='absolute'
          style={{
            bottom: -cornerOffset,
            left: -cornerOffset,
            width: cornerSize,
            height: cornerSize,
            borderStyle: 'solid',
            borderWidth: `0 0 ${cornerBorder}px ${cornerBorder}px`,
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
          }}
        />
      </motion.div>
    </div>
  )
}

export default TrueFocus

{
  /* <span
          className='absolute rounded-[3px] border-b-0 border-r-0'
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
            width: cornerSize,
            height: cornerSize,
            borderWidth: cornerBorder,
            left: -cornerSize / 2,
            top: -cornerSize / 2,
          }}></span>
        <span
          className='absolute rounded-[3px] border-b-0 border-l-0'
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
            width: cornerSize,
            height: cornerSize,
            borderWidth: cornerBorder,
            right: -cornerSize / 2,
            top: -cornerSize / 2,
          }}></span>
        <span
          className='absolute rounded-[3px] border-r-0 border-t-0'
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
            width: cornerSize,
            height: cornerSize,
            borderWidth: cornerBorder,
            left: -cornerSize / 2,
            bottom: -cornerSize / 2,
          }}></span>
        <span
          className='absolute rounded-[3px] border-l-0 border-t-0'
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))',
            transform: 'translateZ(0)',
            width: cornerSize,
            height: cornerSize,
            borderWidth: cornerBorder,
            right: -cornerSize / 2,
            bottom: -cornerSize / 2,
          }}></span> */
}
