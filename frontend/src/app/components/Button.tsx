'use client'

import { Button as NextButton } from '@nextui-org/react'

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <div>
      <NextButton
        className='flex h-6 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-8 sm:px-5 sm:text-base'
        onClick={onClick}>
        {children}
      </NextButton>
    </div>
  )
}

export default Button
