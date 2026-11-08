import ContactForm from 'components/ContactForm'
import Image from 'next/image'
import meetingImage from 'assets/meeting.jpg'

const Contact = () => {
  return (
    <div className='flex h-[calc(100vh-56px)] w-full flex-col items-center justify-center'>
      <div className='relative h-full w-full'>
        {/* LCP element: preloaded with high priority. Static import = known size, blurred
            preview while loading, content-hashed URL (cached long-term). */}
        <Image
          src={meetingImage}
          alt=''
          fill
          style={{ objectFit: 'cover' }}
          sizes='100vw'
          preload
          // `preload` alone no longer sets it (Next 16): keep the LCP fetch at high priority.
          fetchPriority='high'
          placeholder='blur'
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
