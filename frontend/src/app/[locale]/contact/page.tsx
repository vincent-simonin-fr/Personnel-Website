import ContactForm from 'components/contact/ContactForm'
import ContactBackdrop from 'components/contact/ContactBackdrop'

const Contact = () => {
  return (
    <div className='flex h-[calc(100vh-56px)] w-full flex-col items-center justify-center'>
      <div className='relative h-full w-full'>
        <ContactBackdrop />
      </div>
      {/* Pointer events reach the backdrop (cursor ball), except on the card. */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-4 md:justify-end md:pr-32'>
        <div className='pointer-events-auto w-full max-w-md rounded-3xl border border-primary-800 bg-background/70 p-6 text-primary-50 shadow-2xl backdrop-blur-xl md:w-1/2'>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact
