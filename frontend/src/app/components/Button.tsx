'use client'

import { Button as HeroButton } from '@heroui/react'

type ButtonProps = {
  children: React.ReactNode
  onPress: () => void
  className?: string
}

const Button = ({ children, onPress: onPress }: ButtonProps) => {
  return (
    <div>
      <HeroButton
        className='flex h-6 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-8 sm:px-5 sm:text-base'
        onPress={onPress}>
        {children}
      </HeroButton>
    </div>
  )
}

export default Button
