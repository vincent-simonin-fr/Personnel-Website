import ContactForm from 'components/contact/ContactForm'
import ContactBackdrop from 'components/contact/ContactBackdrop'

const Contact = () => {
  return (
    // The card is in the flow (min-h, not h): on a short screen the page grows instead of
    // the card overflowing above the top, title unreachable under the header.
    <div className='relative flex min-h-[calc(100vh-56px)] w-full items-center justify-center px-4 py-8 md:justify-end md:pr-32'>
      {/* Fills this box behind the card: pointer events reach it (cursor ball) except on the card. */}
      <ContactBackdrop />
      <div className='relative w-full max-w-md rounded-3xl border border-primary-800 bg-background/70 p-6 text-primary-50 shadow-2xl backdrop-blur-xl md:w-1/2'>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
