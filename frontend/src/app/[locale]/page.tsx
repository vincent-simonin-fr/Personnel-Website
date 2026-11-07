'use client'

import { useTheme } from 'next-themes'
import { useAppContext } from 'hooks/useAppContext'
import Image from 'next/image'
import Link from 'next/link'
import { Hanken_Grotesk } from 'next/font/google'
import { Button } from '@heroui/react'
import { lazy } from 'react'
import Loading from 'components/loading/Loading'
import { siteConfig } from 'config/site'

import { useLocaleContext } from 'hooks/useLocaleContext'
import RivePlayer from 'components/ui/animations/RivePlayer'
import PresentationSection from 'components/PresentationSection'

const FadeInWhenVisible = lazy(
  () => import('components/ui/animations/FadeInWhenVisible'),
)
const KeyframeCssOnView = lazy(
  () => import('components/ui/animations/KeyframeCssOnView'),
)
const FadeInOnAppear = lazy(() => import('components/ui/animations/FadeInOnAppear'))
const MetaBalls = lazy(() => import('components/ui/animations/MetaBalls'))
const LetterGlitch = lazy(() => import('components/ui/animations/LetterGlitch'))
const SocialMedia = lazy(() => import('components/SocialMedia'))
const Threads = lazy(() => import('components/ui/animations/Threads'))
const Waves = lazy(() => import('components/ui/animations/Waves'))
const HandSvg = lazy(() => import('components/ui/svg/HandSvg'))

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'], weight: '600' })

const HomePage = () => {
  const { isLoading, isError, error } = useAppContext()
  const { dictionary } = useLocaleContext()
  const { sections } = dictionary.homePage
  const { theme } = useTheme()

  return (
    <>
      <Loading isLoading={isLoading} isError={isError} error={error}>
        <div className='flex w-full flex-col items-center gap-4'>
          <section className='flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center'>
            <FadeInOnAppear>
              <div className='w-[84vw] py-8 sm:px-2'>
                <div className='flex items-center pb-8 text-xl'>
                  <span className={`mr-1 text-fuchsia-600`}>
                    <HandSvg />
                  </span>
                  {dictionary.homePage.firstScreen.salutation}
                </div>
                <h1
                  className={`${hankenGrotesk.className} text-pretty text-3xl md:text-4xl lg:text-5xl`}>
                  {dictionary.homePage.firstScreen.hook.one}
                  <span className={`text-fuchsia-600`}>
                    {dictionary.homePage.firstScreen.hook.two}
                  </span>{' '}
                  {dictionary.homePage.firstScreen.hook.three}
                  <span className={`text-fuchsia-600`}>
                    {dictionary.homePage.firstScreen.hook.four}
                  </span>
                  {dictionary.homePage.firstScreen.hook.five}
                </h1>
                <hr className='my-4 h-[2px] w-1/2 bg-primary-500' />
                <div className='text-pretty text-3xl md:text-4xl lg:text-5xl'>
                  {dictionary.homePage.firstScreen.firstLine}
                </div>
                <div className='text-pretty text-3xl md:text-4xl lg:text-5xl'>
                  {dictionary.homePage.firstScreen.secondLine}
                </div>
                <div className='mt-8 flex w-full items-center justify-between'>
                  <SocialMedia noDelay />
                  <FadeInWhenVisible delay={0}>
                    <Button
                      className='rounded-full bg-primary-50 text-primary-900'
                      as={Link}
                      href={`/${dictionary.locale}/projects`}
                      variant='solid'>
                      {dictionary.homePage.labelButtonToSkills}
                    </Button>
                  </FadeInWhenVisible>
                </div>
              </div>
            </FadeInOnAppear>
            <div className='relative h-[50vh] w-full'>
              <Threads
                color={theme === 'dark' ? [1, 1, 1] : [0, 0, 0]}
                amplitude={1}
                distance={0}
                enableMouseInteraction={false}
              />
            </div>
          </section>

          <div className='relative mb-6 w-[84vw] space-y-8 sm:space-y-2'>
            <div
              id='presentation'
              className='flex flex-col items-center justify-center gap-28'>
              <PresentationSection
                {...sections.design}
                visual={
                  <div className='aspect-[1/1] max-h-[240px] scale-125'>
                    <MetaBalls
                      color={siteConfig.color.hex}
                      cursorBallColor={siteConfig.color.hex}
                      cursorBallSize={2}
                      ballCount={16}
                      animationSize={30}
                      enableMouseInteraction={true}
                      enableTransparency={true}
                      hoverSmoothness={0.05}
                      clumpFactor={1}
                      speed={0.5}
                    />
                  </div>
                }
              />
              <PresentationSection
                {...sections.agility}
                reverse
                visual={
                  <Waves
                    lineColor={siteConfig.color.hex}
                    className='rounded-3xl border-1 border-fuchsia-600'
                    waveSpeedX={0.0175}
                    waveSpeedY={0.005}
                    waveAmpX={32}
                    waveAmpY={16}
                    xGap={5}
                    yGap={32}
                    friction={0.925}
                    tension={0.1}
                    maxCursorMove={100}
                  />
                }
              />
              <PresentationSection
                {...sections.development}
                visual={
                  <div className='aspect-[1/1] max-h-[280px]'>
                    <LetterGlitch
                      glitchSpeed={100}
                      centerVignette={false}
                      outerVignette={true}
                      smooth={true}
                    />
                  </div>
                }
              />
              <PresentationSection
                {...sections.innovation}
                reverse
                visualClassName='max-h-[240px]'
                visual={
                  <RivePlayer
                    src='/animations/responsive_core.riv'
                    stateMachines='StateMachine'
                    autoplay
                    rootMargin='-25%'
                    actions={{
                      onMouseEnter: (rive, inputs) => {
                        if (rive && inputs.enter && inputs.exit) {
                          inputs.exit.value = false
                          inputs.enter.value = true
                        }
                      },
                      onMouseLeave: (rive, inputs) => {
                        if (rive && inputs.enter && inputs.exit) {
                          inputs.enter.value = false
                          inputs.exit.value = true
                        }
                      },
                    }}
                  />
                }
              />
            </div>
          </div>
          {/* Contact Section */}
          <KeyframeCssOnView cssClass='showAndHideOnView px-4 md:px-16'>
            <div className='relative h-[calc(100vh-136px)] w-full'>
              <Image
                src='/images/meeting.jpg'
                alt=''
                fill
                style={{ objectFit: 'cover' }}
                sizes='80vw'
                loading='lazy'
              />
            </div>
            {/* Call to action only: the form lives on /contact (single source). */}
            <div className='absolute inset-0 flex items-center justify-center md:justify-end md:pr-32'>
              <div className='flex max-w-md flex-col items-start gap-4 rounded-large bg-background p-6 text-primary-50 md:w-1/2'>
                <h2 className={`${hankenGrotesk.className} text-2xl`}>
                  {dictionary.contactForm.title}
                </h2>
                <p className='text-pretty text-lg'>
                  {dictionary.homePage.contactCta.text}
                </p>
                <Button
                  className='rounded-full bg-primary-50 text-primary-900'
                  as={Link}
                  href={`/${dictionary.locale}/contact`}
                  variant='solid'>
                  {dictionary.homePage.contactCta.button}
                </Button>
              </div>
            </div>
          </KeyframeCssOnView>
        </div>
      </Loading>
    </>
  )
}

export default HomePage
