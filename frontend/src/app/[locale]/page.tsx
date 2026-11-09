'use client'

import { useTheme } from 'next-themes'
import { useAppContext } from 'hooks/useAppContext'
import Link from 'next/link'
import { buttonVariants, cn } from '@heroui/react'
import { lazy, type CSSProperties } from 'react'
import Loading from 'components/loading/Loading'

import { useLocaleContext } from 'hooks/useLocaleContext'
import OnScreen from 'components/ui/animations/OnScreen'
import FadeInWhenVisible from 'components/ui/animations/FadeInWhenVisible'
import KeyframeCssOnView from 'components/ui/animations/KeyframeCssOnView'
import SocialMedia from 'components/SocialMedia'
import HandSvg from 'components/ui/svg/HandSvg'
import MethodSection from 'components/home/MethodSection'
import ProjectCard from 'components/ProjectCard'
import ContactBackdrop from 'components/ui/animations/ContactBackdrop'

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
              {/* Mobile: the two buttons first, full width side by side, icons below. */}
              <div className='mt-10 flex w-full flex-col-reverse gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between'>
                <SocialMedia noDelay />
                <FadeInWhenVisible delay={0}>
                  <div className='flex flex-wrap gap-3'>
                    <Link
                      className={cn(primaryLinkButton, 'flex-1 sm:flex-none')}
                      href={`/${locale}/projects`}>
                      {dictionary.homePage.labelButtonToSkills}
                    </Link>
                    <Link
                      className={cn(secondaryLinkButton, 'flex-1 sm:flex-none')}
                      href={`/${locale}/contact`}>
                      {dictionary.homePage.contactCta.button}
                    </Link>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
            {/* The threads are drawn mid-box: a shorter box on mobile lifts them into the first screen,
                the translate a bit more (its empty top then overlaps the icons: no pointer events). */}
            <div className='pointer-events-none relative h-[40vh] w-full max-sm:-translate-y-10 sm:h-[50vh]'>
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
                  // flex: the card stretches to the row height, so both cards match.
                  <li key={project.id} className='flex'>
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
              <ol className='mt-6 grid grid-cols-1 md:grid-cols-3 md:gap-y-8 xl:grid-cols-[repeat(6,minmax(min-content,1fr))]'>
                {career.items.map((item, i) => {
                  const count = career.items.length
                  const last = i === count - 1
                  // One continuous hairline warming up to full fuchsia towards today (starting
                  // already tinted, 40%): each item draws its own stretch, from its color to
                  // the next one's. The current job is still running, so its stretch fades out.
                  const tint = (step: number) =>
                    `color-mix(in oklab, var(--color-fuchsia-500) ${Math.round(40 + (step / (count - 1)) * 60)}%, var(--color-primary-700))`
                  const lineColors = {
                    '--from': tint(i),
                    '--to': last ? 'transparent' : tint(i + 1),
                  } as CSSProperties
                  return (
                    <li
                      key={`${item.year}-${item.title}`}
                      className='relative pb-6 pl-5 md:pt-4 md:pr-4 md:pb-0 md:pl-0'>
                      <span
                        aria-hidden
                        style={lineColors}
                        className='absolute inset-y-0 left-0 w-px bg-linear-to-b from-(--from) to-(--to) md:inset-x-0 md:top-0 md:bottom-auto md:h-px md:w-auto md:bg-linear-to-r'
                      />
                      {last ? (
                        <span
                          aria-hidden
                          className='absolute top-[6px] -left-[5.5px] size-3 rounded-full bg-fuchsia-500 shadow-[0_0_12px_rgb(225_42_251/0.8)] md:-top-[5.5px] md:left-0'>
                          <span className='absolute inset-0 animate-ping rounded-full bg-fuchsia-500/60 motion-reduce:animate-none' />
                        </span>
                      ) : (
                        <span
                          aria-hidden
                          style={{ backgroundColor: tint(i) }}
                          className='absolute top-[8.5px] -left-[3px] size-[7px] rounded-full md:-top-[3px] md:left-0'
                        />
                      )}
                      <p
                        className={`tracking-wide tabular-nums ${last ? 'text-brand' : 'text-primary-300'}`}>
                        {item.year}
                      </p>
                      <p className='text-lg font-semibold'>{item.title}</p>
                      <p className='mt-0.5 leading-snug text-pretty break-words text-primary-200'>
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
              <ContactBackdrop />
            </div>
            {/* Call to action only: the form lives on /contact (single source). */}
            {/* Pointer events reach the backdrop (cursor ball), except on the card. */}
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-4 md:justify-end md:pr-32'>
              <div className='pointer-events-auto flex w-full max-w-md flex-col items-start gap-4 rounded-3xl border-1 border-primary-800 bg-background/70 p-6 text-primary-50 shadow-2xl backdrop-blur-xl md:w-1/2'>
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
