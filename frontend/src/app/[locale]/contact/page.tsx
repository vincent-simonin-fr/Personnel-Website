'use client'

import ContactForm from 'components/ContactForm'
import { useAppContext } from 'hooks/useAppContext'
import { useEffect } from 'react'
import Image from 'next/image'

type ContactProps = object

const Contact = ({}: ContactProps) => {
  const { dictionary } = useAppContext()

  useEffect(() => {
    if (dictionary) {
      document.title = dictionary.navigation[3].title
    }
  }, [dictionary])

  return (
    <div className='flex h-[calc(100vh-56px)] w-full flex-col items-center justify-center'>
      <div className='relative h-full w-full'>
        <Image
          src='/images/meeting.jpg'
          alt='Contact Image'
          fill
          style={{ objectFit: 'cover' }}
          sizes='80vw'
          loading='lazy'
          priority
        />
      </div>
      <div className='absolute inset-0 flex items-center justify-center md:justify-end md:pr-32'>
        <div className='max-w-md rounded-large bg-background p-6 text-primary-50 md:w-1/2'>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact
