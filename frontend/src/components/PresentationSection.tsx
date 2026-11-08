import { ReactNode } from 'react'

type PresentationSectionProps = {
  title: string
  description: string
  /** Decorative visual (animation) shown beside the text. */
  visual: ReactNode
  /** Visual on the right and text right-aligned (alternate every other section). */
  reverse?: boolean
  visualClassName?: string
}

// Home page "presentation" block: visual 1/3, text 2/3, stacked on mobile.
const PresentationSection = ({
  title,
  description,
  visual,
  reverse = false,
  visualClassName = '',
}: PresentationSectionProps) => (
  <section
    className={`flex w-[84vw] flex-col items-center gap-8 md:gap-4 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
    <div
      aria-hidden
      className={`relative flex min-h-[14rem] w-full items-center justify-center md:w-1/3 ${visualClassName}`}>
      {visual}
    </div>
    <div className={`w-full space-y-4 md:w-2/3 ${reverse ? 'md:text-end' : ''}`}>
      <h2 className='text-4xl tracking-tight text-pretty md:text-5xl'>{title}</h2>
      <p className='text-xl leading-relaxed text-pretty md:text-2xl'>
        {description}
      </p>
    </div>
  </section>
)

export default PresentationSection
