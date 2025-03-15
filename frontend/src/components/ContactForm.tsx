'use client'

import { Form, Input, Button, Textarea } from '@heroui/react'
import { toast, ToastContentProps } from 'react-toastify' // For notifications
import emailjs from '@emailjs/browser'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { useAppContext } from 'hooks/useAppContext'
import { useTheme } from 'next-themes'
import { Hanken_Grotesk } from 'next/font/google'

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
    <div className={`${hankenGrotesk.className} flex flex-col pl-8 text-primary-300`}>
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
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! + 1

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
            'shadow-lg text-inherit rounded-lg flex items-center bg-primary-900 max-w-[96vw]',
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
          'shadow-lg text-inherit rounded-lg flex items-center bg-primary-900 max-w-[96vw]',
      })
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <div className='flex w-full max-w-md flex-col items-start'>
      <h2 className={`${hankenGrotesk600.className} mb-4 text-2xl`}>
        {dictionary?.contactForm.title}
      </h2>
      <Form
        className='flex w-full max-w-md flex-col gap-4'
        onReset={() => {}}
        onSubmit={handleSubmit}>
        <div className='flex w-full gap-4'>
          <Input
            required
            isDisabled={isDisabled}
            type='text'
            className='flex-1'
            classNames={{
              label: 'group-data-[filled-within=true]:text-primary-50',
              inputWrapper: 'rounded-xl border-1 bg-primary-900 border-primary-50',
            }}
            labelPlacement='outside'
            name='firstName'
            placeholder={' '}
            value={userInput.firstName}
            onChange={(e) => handleChange(e)}
            label={dictionary?.contactForm.firstNameLabel}
            errorMessage={dictionary?.contactForm.firstNameError}
          />
          <Input
            required
            isDisabled={isDisabled}
            type='text'
            className='flex-1'
            classNames={{
              label: 'group-data-[filled-within=true]:text-primary-50',
              inputWrapper: 'rounded-xl border-1 bg-primary-900 border-primary-50',
            }}
            labelPlacement='outside'
            name='lastName'
            placeholder={' '}
            value={userInput.lastName}
            onChange={handleChange}
            label={dictionary?.contactForm.lastNameLabel}
            errorMessage={dictionary?.contactForm.lastNameError}
          />
        </div>
        <Input
          required
          isDisabled={isDisabled}
          type='email'
          className='w-full'
          classNames={{
            label: 'group-data-[filled-within=true]:text-primary-50',
            inputWrapper: 'rounded-xl border-1 bg-primary-900 border-primary-50',
          }}
          labelPlacement='outside'
          name='email'
          placeholder={' '}
          value={userInput.email}
          onChange={handleChange}
          label={dictionary?.contactForm.emailLabel}
          errorMessage={dictionary?.contactForm.emailError}
        />
        <Textarea
          required
          isDisabled={isDisabled}
          type='text'
          minRows={3}
          maxRows={5}
          className='w-full'
          classNames={{
            label: 'group-data-[filled-within=true]:text-primary-50',
            inputWrapper: 'rounded-xl border-1 bg-primary-900 border-primary-50',
          }}
          labelPlacement='outside'
          name='message'
          placeholder={' '}
          value={userInput.message}
          onChange={handleChange}
          label={dictionary?.contactForm.messageLabel}
          errorMessage={dictionary?.contactForm.messageError}
        />
        <div className='flex gap-2'>
          <Button
            className='rounded-2xl border-1 border-primary-50 bg-primary-900'
            isLoading={isDisabled}
            isDisabled={isDisabled}
            type='submit'>
            {dictionary?.contactForm.submitButton}
          </Button>
          {/* <Button isDisabled={isDisabled} color='primary' type='reset' variant='flat'>
            {dictionary?.contactForm.resetButton}
          </Button> */}
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
