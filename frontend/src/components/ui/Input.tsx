'use client'

import { FieldError, Input as HeroInput, Label, TextField } from '@heroui/react'

type InputProps = {
  id: string
  label: string | undefined
  isDisabled: boolean
  isRequired?: boolean
  className?: string
  type?: 'text' | 'email' | 'number' | 'password'
  autoComplete?: 'home' | 'username' | 'given-name' | 'family-name' | 'email' | 'tel' | 'off'
  name: string
  errorMessage?: string
  value: string | number | readonly string[] | undefined
  handleChange: (e: any) => void
}

const Input = ({
  id,
  className,
  label,
  isDisabled,
  isRequired = false,
  type,
  autoComplete = 'off',
  name,
  value,
  errorMessage,
  handleChange,
}: InputProps) => {
  return (
    <div>
      <TextField isInvalid className='w-full max-w-64' name={name} type={type}>
        <Label>{label}</Label>
        <HeroInput
          required={isRequired}
          disabled={isDisabled}
          type={type}
          autoComplete={autoComplete}
          className={className}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {errorMessage ?? <FieldError>{errorMessage}</FieldError>}
      </TextField>
    </div>
  )
}

export default Input
