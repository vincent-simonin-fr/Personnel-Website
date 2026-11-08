'use client'

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from '@heroui/react'
import { toast, ToastContentProps } from 'react-toastify' // For notifications
import emailjs from '@emailjs/browser'
import { FormEvent, ReactNode, useState } from 'react'
import { useTheme } from 'next-themes'
import { useLocaleContext } from 'hooks/useLocaleContext'

type ContactFormProps = object

type UserInput = {
  firstName: string
  lastName: string
  email: string
  message: string
}

const emptyInput: UserInput = { firstName: '', lastName: '', email: '', message: '' }

// Shared field look (DESIGN.md): dark/light primary scale, fuchsia focus ring.
const labelClassName = 'text-sm text-primary-50'
const fieldClassName =
  'rounded-xl border-1 border-primary-600 bg-primary-900 text-primary-50 focus:border-transparent focus:ring-1 focus:ring-fuchsia-600'
const inputClassName = `${fieldClassName} h-8` // v2 size='sm' height
const errorClassName = 'text-sm text-danger'

const CustomToast = ({ data }: ToastContentProps<ReactNode>) => {
  return (
    <div className='flex flex-col pl-8 text-primary-300'>
      <p className={`text-sm`}>{data}</p>
    </div>
  )
}

const ContactForm = ({}: ContactFormProps) => {
  const { theme } = useTheme()
  const [userInput, setUserInput] = useState<UserInput>(emptyInput)
  const { dictionary } = useLocaleContext()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const { contactForm } = dictionary

  // v3 TextField hands the new value (not an event) to onChange.
  const setField = (name: keyof UserInput) => (value: string) =>
    setUserInput((current) => ({ ...current, [name]: value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisabled(true)

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    try {
      const res = await emailjs.send(serviceID, templateID, userInput, userID)
      if (res.status === 200) {
        toast.success(CustomToast, {
          theme: theme,
          closeButton: true,
          autoClose: 4000,
          data: contactForm.successMessage,
          className:
            'shadow-lg text-inherit rounded-lg flex items-center bg-primary-900 max-w-[96vw]',
        })
        setUserInput(emptyInput)
      }
    } catch (error) {
      toast.error(CustomToast, {
        theme: theme,
        closeButton: true,
        autoClose: 4000,
        data: contactForm.errorMessage,
        className:
          'shadow-lg text-inherit rounded-lg flex items-center bg-primary-900 max-w-[96vw]',
      })
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <div className='flex w-full max-w-md flex-col items-start'>
      {/* h1: the form is the main content of /contact (its only usage). */}
      <h1 className='mb-4 text-2xl font-semibold'>{contactForm.title}</h1>
      <Form
        id='contact-form'
        className='flex w-full max-w-md flex-col gap-4'
        onReset={() => setUserInput(emptyInput)}
        onSubmit={handleSubmit}>
        <div className='flex w-full flex-col gap-4 sm:flex-row'>
          <TextField
            isRequired
            isDisabled={isDisabled}
            className='flex flex-1 flex-col gap-1'
            name='firstName'
            autoComplete='given-name'
            value={userInput.firstName}
            onChange={setField('firstName')}>
            <Label className={labelClassName}>{contactForm.firstNameLabel}</Label>
            <Input className={inputClassName} />
            <FieldError className={errorClassName}>
              {contactForm.firstNameError}
            </FieldError>
          </TextField>
          <TextField
            isRequired
            isDisabled={isDisabled}
            className='flex flex-1 flex-col gap-1'
            name='lastName'
            autoComplete='family-name'
            value={userInput.lastName}
            onChange={setField('lastName')}>
            <Label className={labelClassName}>{contactForm.lastNameLabel}</Label>
            <Input className={inputClassName} />
            <FieldError className={errorClassName}>
              {contactForm.lastNameError}
            </FieldError>
          </TextField>
        </div>
        <TextField
          isRequired
          isDisabled={isDisabled}
          className='flex w-full flex-col gap-1'
          name='email'
          type='email'
          autoComplete='email'
          value={userInput.email}
          onChange={setField('email')}>
          <Label className={labelClassName}>{contactForm.emailLabel}</Label>
          <Input className={inputClassName} />
          <FieldError className={errorClassName}>
            {contactForm.emailError}
          </FieldError>
        </TextField>
        <TextField
          isRequired
          isDisabled={isDisabled}
          className='flex w-full flex-col gap-1'
          name='message'
          value={userInput.message}
          onChange={setField('message')}>
          <Label className={labelClassName}>{contactForm.messageLabel}</Label>
          <TextArea rows={4} className={`${fieldClassName} max-h-40 resize-y`} />
          <FieldError className={errorClassName}>
            {contactForm.messageError}
          </FieldError>
        </TextField>
        <div className='flex gap-2'>
          <Button
            className='rounded-full bg-primary-50 text-primary-900'
            isPending={isDisabled}
            isDisabled={isDisabled}
            type='submit'>
            {contactForm.submitButton}
          </Button>
          <Button
            // Neutral like the v2 flat button (secondary would use the fuchsia accent).
            className='rounded-full bg-primary-800 text-primary-100'
            isDisabled={isDisabled}
            type='reset'
            variant='secondary'>
            {contactForm.resetButton}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ContactForm
