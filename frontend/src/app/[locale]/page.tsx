'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import Loading from 'components/loading/Loading'
import ContactForm from 'components/ContactForm'
import Presentation from 'components/Presentation'
import { useGlobalContext } from 'hooks/useGlobalContext'
import { useIntersectionObserver } from 'hooks/useIntersectionObserver'
import TrueFocus from 'components/ui/Focus'
import SplitText from 'components/ui/SplitText'

const HomePage = () => {
  const { dictionary: dict, isLoading: isLoading, isError, error } = useGlobalContext()
  const { ref, entry, isIntersecting } = useIntersectionObserver({
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    rootMargin: '-10%',
  })

  useEffect(() => {
    // Use for animation rendered on Safari & Firefox
    if (!CSS.supports('animation-timeline: view()')) {
      console.log(isIntersecting)
      entry?.target.classList.toggle('visible', entry.isIntersecting)
      if (!isIntersecting) {
        entry?.target.classList.add('hiden')
      } else {
        entry?.target.classList.remove('hiden')
      }
    }
  }, [dict, isIntersecting])

  const handleAnimationComplete = () => {}

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className='flex flex-col items-center gap-6 p-8 sm:w-screen md:w-4/5'>
        <SplitText
          text={`Hello, I'm full stack developer and Azure cloud developer !`}
          className='text-center text-3xl font-semibold'
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          threshold={0.2}
          rootMargin='50px'
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <TrueFocus
          sentence='Dev Sec Ops'
          manualMode={false}
          blurAmount={5}
          borderColor='red'
          animationDuration={2}
          pauseBetweenAnimations={0.5}
        />
        <h2 className='text-left text-3xl'>
          Welcome to my presentation page, if you'd like to get my resume quickly, you can scroll
          down to the contact section.
        </h2>
        <h2 className='text-left text-3xl'>
          I work with Microsoft technologies, the Azure cloud, the .Net development platform and
          React.js. During my training, I became interested in software quality and maintainability,
          a question mark that raised hundreds of others.
        </h2>
        <Presentation />
        <div ref={ref} className='showAndHideOnView relative w-full'>
          <div className='relative h-[600px] w-full'>
            <Image
              src='/meeting.jpg'
              alt='Contact Image'
              fill
              style={{ objectFit: 'cover' }}
              sizes='80vw'
              priority
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center md:justify-end md:pr-12'>
            <div className='max-w-md rounded-large bg-primary-200/30 p-6 backdrop-blur-3xl md:w-1/2'>
              <ContactForm />
            </div>
          </div>
        </div>
        <Presentation />
      </div>
    </Loading>
  )
}

export default HomePage

{
  /* <div className='grid w-full grid-cols-1 items-center px-4 md:grid-cols-2'>
          <div className='relative h-56 w-auto md:h-full md:w-auto'>
            <Image className='w-1/5' fill={true} sizes='30vw' src='/meeting.jpg' alt='Contact Image' />
          </div>
          <div className='flex flex-col items-center'>
            <ContactForm />
          </div>
        </div> */
}
{
  /* <div className='grid min-h-[calc(100vh-60px)] grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
<main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
  <Image
    className='h-auto w-[180px] hover:invert dark:invert'
    src='/next.svg'
    alt='Next.js logo'
    width='0'
    height='0'
    sizes='100vw'
    priority
  />
  <ol className='list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left'>
    <li className='mb-2'>
      Get started by editing{' '}
      <code className='rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]'>
        src/app/page.tsx
      </code>
    </li>
    <li>Save and see your changes instantly.</li>
  </ol>

  <div className='flex flex-col items-center gap-4 sm:flex-row'>
    <a
      className='flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:px-5 sm:text-base'
      href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
      target='_blank'
      rel='noopener noreferrer'>
      <Image
        className='h-auto w-5 dark:invert'
        src='/vercel.svg'
        alt='Vercel logomark'
        width='0'
        height='0'
        sizes='100vw'
      />
      {dict?.homePage.deployButtonLabel}
    </a>
    <a
      className='flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base'
      href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
      target='_blank'
      rel='noopener noreferrer'>
      Read our docs
    </a>
  </div>
</main>
<footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
  <a
    className='flex items-center gap-2 hover:underline hover:underline-offset-4'
    href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    target='_blank'
    rel='noopener noreferrer'>
    <Image aria-hidden src='/file.svg' alt='File icon' width={16} height={16} />
    Learn
  </a>
  <a
    className='flex items-center gap-2 hover:underline hover:underline-offset-4'
    href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    target='_blank'
    rel='noopener noreferrer'>
    <Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
    Examples
  </a>
  <a
    className='flex items-center gap-2 hover:underline hover:underline-offset-4'
    href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
    target='_blank'
    rel='noopener noreferrer'>
    <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
    Go to nextjs.org →
  </a>
</footer>
</div> */
}
