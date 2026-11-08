'use client'

import { useTheme } from 'next-themes'
import { useAppContext } from 'hooks/useAppContext'
import Image from 'next/image'
import meetingImage from 'assets/meeting.jpg'
import Link from 'next/link'
import { buttonVariants, cn } from '@heroui/react'
import { lazy } from 'react'
import Loading from 'components/loading/Loading'

import { useLocaleContext } from 'hooks/useLocaleContext'
import OnScreen from 'components/ui/animations/OnScreen'
import FadeInWhenVisible from 'components/ui/animations/FadeInWhenVisible'
import KeyframeCssOnView from 'components/ui/animations/KeyframeCssOnView'
import SocialMedia from 'components/SocialMedia'
import HandSvg from 'components/ui/svg/HandSvg'
import MethodSection from 'components/home/MethodSection'
import ProjectCard from 'components/ProjectCard'

// Heavy canvas/WebGL animation: loaded when OnScreen mounts it.
const Threads = lazy(() => import('components/ui/animations/Threads'))

// HeroUI v3 Button can't render as a link: style a Next Link with the button classes.
const primaryLinkButton = cn(
  buttonVariants(),
  'rounded-full bg-primary-50 text-primary-900',
)
const secondaryLinkButton = cn(
  buttonVariants({ variant: 'secondary' }),
  'rounded-full bg-primary-800 text-primary-100',
)

const kicker = 'text-sm tracking-widest text-primary-300 uppercase'
const sectionTitle = 'max-w-3xl text-3xl font-semibold text-pretty md:text-5xl'

const HomePage = () => {
  const { isLoading, isError, error } = useAppContext()
  const { dictionary } = useLocaleContext()
  const { firstScreen, references, featured, career, method } = dictionary.homePage
  const { projects, phases, locale } = dictionary
  const featuredProjects = projects.items.filter((p) => featured.ids.includes(p.id))
  const { theme } = useTheme()

  return (
    <>
      <Loading isLoading={isLoading} isError={isError} error={error}>
        <div className='flex w-full flex-col items-center gap-28'>
          <section className='flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center'>
            <div className='w-[84vw] py-8 sm:px-2'>
              <div className='flex items-center pb-8 text-xl'>
                <span className='mr-1 text-fuchsia-600'>
                  <HandSvg />
                </span>
                {firstScreen.salutation}
              </div>
              <h1 className='max-w-5xl text-4xl font-semibold tracking-tight text-pretty md:text-5xl lg:text-6xl'>
                {firstScreen.hook.before}
                <span className='text-fuchsia-600'>{firstScreen.hook.accent}</span>
                {firstScreen.hook.after}
              </h1>
              <p className='mt-6 max-w-3xl text-xl text-pretty text-primary-200 md:text-2xl'>
                {firstScreen.subline}
              </p>
              <div className='mt-10 flex w-full flex-wrap items-center justify-between gap-6'>
                <SocialMedia noDelay />
                <FadeInWhenVisible delay={0}>
                  <div className='flex flex-wrap gap-3'>
                    <Link className={primaryLinkButton} href={`/${locale}/projects`}>
                      {dictionary.homePage.labelButtonToSkills}
                    </Link>
                    <Link
                      className={secondaryLinkButton}
                      href={`/${locale}/contact`}>
                      {dictionary.homePage.contactCta.button}
                    </Link>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
            <div className='relative h-[50vh] w-full'>
              <OnScreen>
                <Threads
                  color={theme === 'dark' ? [1, 1, 1] : [0, 0, 0]}
                  amplitude={1}
                  distance={0}
                  enableMouseInteraction={false}
                />
              </OnScreen>
            </div>
          </section>

          <div className='flex w-[84vw] flex-col gap-28'>
            <section className='flex flex-col gap-6'>
              <h2 className={kicker}>{references.title}</h2>
              <ul className='flex flex-wrap items-center gap-x-12 gap-y-4 text-2xl font-extrabold tracking-tight text-primary-400 md:text-3xl'>
                {references.names.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </section>

            <MethodSection method={method} phaseLabels={phases} />

            <section className='flex flex-col gap-8'>
              <h2 className={sectionTitle}>{featured.kicker}</h2>
              <ul className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {featuredProjects.map((project) => (
                  <li key={project.id}>
                    <ProjectCard
                      project={project}
                      labels={projects}
                      phaseLabels={phases}
                      index={projects.items.indexOf(project)}
                    />
                  </li>
                ))}
              </ul>
              <Link
                className={cn(secondaryLinkButton, 'self-start')}
                href={`/${locale}/projects`}>
                {featured.allProjects} <span aria-hidden>→</span>
              </Link>
            </section>

            <section className='flex flex-col gap-6'>
              <p className={kicker}>{career.kicker}</p>
              <h2 className={sectionTitle}>{career.title}</h2>
              <p className='max-w-3xl text-lg leading-relaxed text-pretty text-primary-200'>
                {career.text}
              </p>
              <ol className='mt-6 grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:grid-cols-6'>
                {career.items.map((item, i) => {
                  const last = i === career.items.length - 1
                  return (
                    <li
                      key={`${item.year}-${item.title}`}
                      className='relative border-l-1 border-primary-700 pb-6 pl-6 md:border-t-1 md:border-l-0 md:pt-6 md:pb-0 md:pl-0'>
                      <span
                        aria-hidden
                        className={`absolute top-1 -left-[5.5px] size-2.5 rounded-full border-1 md:-top-[5.5px] md:left-0 ${last ? 'border-fuchsia-500 bg-fuchsia-500 shadow-[0_0_10px_rgb(225_42_251/0.7)]' : 'border-primary-500 bg-background'}`}
                      />
                      <p className='text-sm text-primary-300'>{item.year}</p>
                      <p className='mt-1 font-semibold'>{item.title}</p>
                      <p className='mt-1 text-sm text-pretty break-words hyphens-auto text-primary-200'>
                        {item.detail}
                      </p>
                    </li>
                  )
                })}
              </ol>
              <p className='text-sm text-primary-300'>{career.certifications}</p>
            </section>
          </div>

          {/* Contact Section */}
          <KeyframeCssOnView cssClass='showAndHideOnView px-4 md:px-16'>
            <div className='relative h-[calc(100vh-136px)] w-full'>
              <Image
                src={meetingImage}
                alt=''
                fill
                style={{ objectFit: 'cover' }}
                // Container is full width minus px-4 / md:px-16.
                sizes='(min-width: 768px) calc(100vw - 8rem), calc(100vw - 2rem)'
                loading='lazy'
                placeholder='blur'
              />
            </div>
            {/* Call to action only: the form lives on /contact (single source). */}
            <div className='absolute inset-0 flex items-center justify-center md:justify-end md:pr-32'>
              <div className='flex max-w-md flex-col items-start gap-4 rounded-large bg-background p-6 text-primary-50 md:w-1/2'>
                <h2 className='text-2xl font-semibold'>
                  {dictionary.contactForm.title}
                </h2>
                <p className='text-lg text-pretty'>
                  {dictionary.homePage.contactCta.text}
                </p>
                <Link className={primaryLinkButton} href={`/${locale}/contact`}>
                  {dictionary.homePage.contactCta.button}
                </Link>
              </div>
            </div>
          </KeyframeCssOnView>
        </div>
      </Loading>
    </>
  )
}

export default HomePage
