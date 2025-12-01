'use client'

import { Form, Button, TextArea, Label, FieldError, TextField } from '@heroui/react'
import { toast, ToastContentProps } from 'react-toastify' // For notifications
import emailjs from '@emailjs/browser'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { useAppContext } from 'hooks/useAppContext'
import { useTheme } from 'next-themes'
import { Hanken_Grotesk } from 'next/font/google'
import Input from 'components/ui/Input'

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'] })
const hankenGrotesk600 = Hanken_Grotesk({ subsets: ['latin'], weight: '600' })

type ContactFormProps = object

type UserInput = {
  firstName: string
  lastName: string
  email: string
  message: string
}

const CustomToast = ({ closeToast, toastProps, isPaused, data }: ToastContentProps<ReactNode>) => {
  return (
    <div className={`${hankenGrotesk.className} text-primary-300 flex flex-col pl-8`}>
      {/* <div className='absolute -left-12 top-1/2 z-10 grid size-20 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'>
        smile
      </div> */}
      {/* <p className={`${soehneSemiBold.className}`}>John Doe</p> */}
      <p className={`text-sm`}>{data}</p>
    </div>
  )
}

const ContactForm = ({}: ContactFormProps) => {
  // const [action, setAction] = useState<string | null>(null) // For debugging
  const { theme } = useTheme()
  const [userInput, setUserInput] = useState<UserInput>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const { dictionary } = useAppContext()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(() => {}, [dictionary])

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault()
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsDisabled(true)

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    try {
      const emailParams = {
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        message: userInput.message,
      }

      // TODO Text I18n
      const res = await emailjs.send(serviceID, templateID, emailParams, userID)
      if (res.status === 200) {
        toast.success(CustomToast, {
          theme: theme,
          closeButton: true,
          autoClose: 4000,
          data: dictionary?.contactForm.successMessage,
          className:
            'shadow-md text-inherit rounded-lg flex items-center bg-primary-900 max-w-[96vw]',
        })
        setUserInput({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        })
      }
    } catch (error) {
      toast.error(CustomToast, {
        theme: theme,
        closeButton: true,
        autoClose: 4000,
        data: dictionary?.contactForm.errorMessage,
        className:
          'shadow-md text-inherit rounded-lg flex items-center bg-primary-900 max-w-[96vw]',
      })
    } finally {
      setIsDisabled(false)
    }
  }

  const labelClassnames = 'group-data-[filled-within=true]:text-primary-50'
  const inputWrapperClassnames = [
    'rounded-xl',
    'border-1',
    'bg-primary-900',
    'border-primary-600',
    `focus-within:ring-fuchsia-600`,
    'focus-within:ring-1',
    'focus-within:ring-offset-0',
    'focus-within:border-none',
    'group-data-[focus=true]:ring-0',
    'group-data-[focus=true]:ring-offset-0',
    'group-data-[focus-visible=true]:border-none',
    'group-data-[focus-visible=true]:ring-0',
    'group-data-[focus-visible=true]:ring-offset-0',
  ]

  const classZ =
    'rounded-xl border-1 bg-primary-900 border-primary-600 focus-within:ring-fuchsia-600 focus-within:ring-1 focus-within:ring-offset-0 focus-within:border-transparent group-data-[focus=true]:ring-fuchsia-600 group-data-[focus=true]:ring-1 group-data-[focus=true]:ring-offset-0 group-data-[focus=true]:border-transparent'

  return (
    <div className='flex w-full max-w-md flex-col items-start'>
      <h2 className={`${hankenGrotesk600.className} mb-4 text-2xl`}>
        {dictionary?.contactForm.title}
      </h2>
      <Form
        className='flex w-full max-w-md flex-col gap-4'
        onReset={() => {
          setUserInput({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
          })
        }}
        onSubmit={handleSubmit}>
        <div className='flex w-full gap-4'>
          <Input
            isRequired
            isDisabled
            type='text'
            autoComplete='given-name'
            className='flex-1 group-data-[focus-visible=true]:border-none group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0 group-data-[focus-within=true]:border-none group-data-[focus-within=true]:ring-0 group-data-[focus-within=true]:ring-offset-0'
            // classNames={{
            //   label: labelClassnames,
            //   inputWrapper: inputWrapperClassnames,
            //   innerWrapper:
            //     'group-data-[focus-visible=true]:border-none group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0 group-data-[focus-within=true]:border-none group-data-[focus-within=true]:ring-0 group-data-[focus-within=true]:ring-offset-0',
            // }}
            id='firstname'
            name='firstName'
            value={userInput.firstName}
            handleChange={(e) => handleChange(e)}
            label={dictionary?.contactForm.firstNameLabel}
            errorMessage={dictionary?.contactForm.firstNameError}
          />
          <Input
            isRequired
            isDisabled
            type='text'
            autoComplete='family-name'
            className='flex-1'
            // classNames={{
            //   label: labelClassnames,
            //   inputWrapper: inputWrapperClassnames,
            // }}
            id='lastname'
            name='lastName'
            value={userInput.lastName}
            handleChange={handleChange}
            label={dictionary?.contactForm.lastNameLabel}
            errorMessage={dictionary?.contactForm.lastNameError}
          />
        </div>
        <Input
          isRequired
          isDisabled
          type='email'
          autoComplete='email'
          className='w-full'
          // classNames={{
          //   label: labelClassnames,
          //   inputWrapper: inputWrapperClassnames,
          // }}
          id='email'
          name='email'
          value={userInput.email}
          handleChange={handleChange}
          label={dictionary?.contactForm.emailLabel}
          errorMessage={dictionary?.contactForm.emailError}
        />
        <div className='flex flex-col gap-2'>
          <Label>{dictionary?.contactForm.messageLabel}</Label>
          <TextArea
            required
            disabled={isDisabled}
            rows={4}
            className='w-full'
            // classNames={{
            //   label: labelClassnames,
            //   inputWrapper: inputWrapperClassnames,
            // }}
            id='message'
            name='message'
            value={userInput.message}
            onChange={handleChange}
          />
          <FieldError>{dictionary?.contactForm.messageError}</FieldError>
        </div>
        <div className='flex gap-2'>
          <Button
            className='bg-primary-50 text-primary-900 rounded-full px-4 py-1.5'
            isPending={isDisabled}
            isDisabled={isDisabled}
            type='submit'>
            {dictionary?.contactForm.submitButton}
          </Button>
          <Button className='rounded-full' isDisabled={isDisabled} type='reset' variant='secondary'>
            {dictionary?.contactForm.resetButton}
          </Button>
        </div>
        {/* {action && (
          <div className='text-small text-default-500'>
            Action: <code>{action}</code>
          </div>
        )} */}
      </Form>
    </div>
  )
}

export default ContactForm
