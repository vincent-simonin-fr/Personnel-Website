import ContactForm from 'components/ContactForm'
import Image from 'next/image'

const Contact = () => {
  return (
    <div className='flex h-[calc(100vh-56px)] w-full flex-col items-center justify-center'>
      <div className='relative h-full w-full'>
        {/* Decorative, above the fold: it is the LCP element, so load it eagerly. */}
        <Image
          src='/images/meeting.jpg'
          alt=''
          fill
          style={{ objectFit: 'cover' }}
          sizes='100vw'
          loading='eager'
          fetchPriority='high'
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
