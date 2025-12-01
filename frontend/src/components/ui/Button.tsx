'use client'

import { Button as HeroButton } from '@heroui/react'

type ButtonProps = {
  children: React.ReactNode
  onPress?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | undefined
}

const Button = ({ children, onPress, type = 'button', variant }: ButtonProps) => {
  return (
    <div>
      <HeroButton
        className='flex h-6 items-center justify-center gap-2 rounded-full px-4 text-sm transition-colors sm:h-8 sm:px-5 sm:text-base'
        type={type}
        onPress={onPress}
        variant={variant}>
        {children}
      </HeroButton>
    </div>
  )
}

export default Button
