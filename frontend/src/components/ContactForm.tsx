'use client'

import { Form, Input, Button, Textarea } from '@heroui/react'
import { toast, ToastContentProps } from 'react-toastify' // For notifications
import emailjs from '@emailjs/browser'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { useGlobalContext } from 'hooks/useGlobalContext'
import { soehneKraftig, soehneSemiBold } from 'config/fonts'

type ContactFormProps = {}

type UserInput = {
  firstName: string
  lastName: string
  email: string
  message: string
}

const CustomToast = ({ closeToast, toastProps, isPaused, data }: ToastContentProps<ReactNode>) => {
  return (
    <div className={`${soehneKraftig.className} flex flex-col pl-8 text-primary`}>
      {/* <div className='absolute -left-12 top-1/2 z-10 grid size-20 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'>
        smile
      </div> */}
      <p className={`${soehneSemiBold.className}`}>John Doe</p>
      <p className={`text-sm`}>{data}</p>
    </div>
  )
}

const ContactForm = ({}: ContactFormProps) => {
  // const [action, setAction] = useState<string | null>(null) // For debugging
  const [userInput, setUserInput] = useState<UserInput>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const { dictionary: dict } = useGlobalContext()

  useEffect(() => {}, [dict])

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
    setUserInput({
      ...userInput,
      [name]: value,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

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

      // TODO : Add loading
      // Disable input and add loading to button
      // Text I18n
      const res = await emailjs.send(serviceID, templateID, emailParams, userID)

      if (res.status === 200) {
        toast.success(CustomToast, {
          closeButton: true,
          autoClose: 5000,
          data: 'Message sent successfully',
          className:
            'shadow-lg text-inherit overflow-visible scale-100 ring-1 ring-black/5 rounded-xl flex items-center gap-6 bg-slate-800 highlight-white/5',
        })
        setUserInput({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        })
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.')
    }
  }

  return (
    <div className='flex w-full max-w-md flex-col items-start'>
      <h2 className='mb-4 text-2xl font-bold'>{dict?.contactForm.title}</h2>
      <Form
        className='flex w-full max-w-md flex-col gap-4'
        onReset={() => {}}
        onSubmit={(e) => {
          e.preventDefault()
          let data = Object.fromEntries(new FormData(e.currentTarget))
          console.log('submit data', data)
          // setAction(`submit ${JSON.stringify(data)}`)
          handleSubmit(e)
        }}>
        <div className='flex w-full gap-4'>
          <Input
            className='flex-1'
            color='primary'
            isRequired
            errorMessage={dict?.contactForm.firstNameError}
            label={dict?.contactForm.firstNameLabel}
            name='firstName'
            placeholder={dict?.contactForm.firstNamePlaceholder}
            type='text'
            value={userInput.firstName}
            onChange={handleChange}
          />

          <Input
            className='flex-1'
            color='primary'
            isRequired
            errorMessage={dict?.contactForm.lastNameError}
            label={dict?.contactForm.lastNameLabel}
            name='lastName'
            placeholder={dict?.contactForm.lastNamePlaceholder}
            type='text'
            value={userInput.lastName}
            onChange={handleChange}
          />
        </div>

        <Input
          className='w-full'
          color='primary'
          isRequired
          errorMessage={dict?.contactForm.emailError}
          label={dict?.contactForm.emailLabel}
          name='email'
          placeholder={dict?.contactForm.emailPlaceholder}
          type='email'
          value={userInput.email}
          onChange={handleChange}
        />
        <Textarea
          className='w-full'
          color='primary'
          isRequired
          errorMessage={dict?.contactForm.messageError}
          label={dict?.contactForm.messageLabel}
          name='message'
          placeholder={dict?.contactForm.messagePlaceholder}
          value={userInput.message}
          onChange={handleChange}
        />
        <div className='flex gap-2'>
          <Button color='primary' type='submit'>
            {dict?.contactForm.submitButton}
          </Button>
          <Button color='primary' type='reset' variant='flat'>
            {dict?.contactForm.resetButton}
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
