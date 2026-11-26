import Link from 'next/link'
import { buttonVariants, cn } from '@heroui/styles'

type ContactCtaProps = {
  title: string
  text: string
  button: string
  href: string
  className?: string
}

// Call to action to /contact (the form lives there only): the glass card that ends the
// home page (over the metaballs) and the projects page.
const ContactCta = ({ title, text, button, href, className }: ContactCtaProps) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-md flex-col items-start gap-4 rounded-3xl border border-primary-800 bg-background/70 p-6 text-primary-50 shadow-2xl backdrop-blur-xl',
        className,
      )}>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <p className='text-lg text-pretty'>{text}</p>
      <Link
        className={cn(
          buttonVariants(),
          'rounded-full bg-primary-50 text-primary-900',
        )}
        href={href}>
        {button}
      </Link>
    </div>
  )
}

export default ContactCta
