'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import Loading from 'components/loading/Loading'
// import ContactForm from 'components/ContactForm'
import { useAppContext } from 'hooks/useAppContext'
// import TrueFocus from 'components/ui/animations/Focus'
// import MetaBalls from 'components/ui/animations/MetaBalls'
import { useTheme } from 'next-themes'
import KeyframeCssOnView from 'components/ui/animations/KeyframeCssOniew'
// import SocialMedia from 'components/SocialMedia'
import Link from 'next/link'
import { Button } from '@heroui/react'
import FadeInWhenVisible from 'components/ui/animations/FadeInWhenVisible'
// import LetterGlitch from 'components/ui/animations/LetterGlitch'
import { Hanken_Grotesk } from 'next/font/google'
import { lazy } from 'react'
import { RivePlayer } from 'components/ui/RivePlayer'

const TrueFocus = lazy(() => import('components/ui/animations/Focus'))
const MetaBalls = lazy(() => import('components/ui/animations/MetaBalls'))
const LetterGlitch = lazy(() => import('components/ui/animations/LetterGlitch'))
const ContactForm = lazy(() => import('components/ContactForm'))
const SocialMedia = lazy(() => import('components/SocialMedia'))

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'], weight: '600' })

const HomePage = () => {
  const { dictionary, isLoading, isError, error } = useAppContext()
  const { theme } = useTheme()

  useEffect(() => {}, [dictionary])

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className='flex w-5/6 flex-col items-center gap-4 sm:w-full'>
        <section className='h-[calc(100vh-60px)] w-full sm:px-2 md:px-16'>
          <div className='flex w-full flex-col items-start justify-center px-4 py-8 sm:px-0 sm:py-16 md:py-20'>
            <div className='text-md pb-8 lg:text-xl'>Hi everyone,</div>
            <div
              className={`${hankenGrotesk.className} text-pretty text-3xl md:text-4xl lg:text-5xl`}>
              I'm a <span className='text-fuchsia-600'>problem solver</span> &{' '}
              <span className='text-fuchsia-600'>creative developer</span>,
            </div>
            <hr className='my-4 h-[2px] w-1/2 bg-primary-500' />
            <div className='text-pretty text-3xl md:text-4xl lg:text-5xl'>
              Crafting and building modern web applications
            </div>
            <div className='text-pretty text-3xl md:text-4xl lg:text-5xl'>
              for digital communication or business system.
            </div>
            <div className='mt-8 flex w-full items-center justify-between'>
              <SocialMedia />
              <FadeInWhenVisible delay={0.6}>
                <Button
                  className='rounded-full bg-primary-50 text-primary-900'
                  as={Link}
                  href='/services'
                  variant='solid'>
                  My expertise
                </Button>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        <div
          id='presentation-first'
          className='my-16 flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-16'>
          <section className='flex w-full flex-col items-center gap-8 md:flex-row md:gap-4 md:px-16'>
            <div className='relative flex w-full items-center justify-center md:w-1/3'>
              <div className='aspect-[3/4] max-h-[360px]'>
                <MetaBalls
                  color={theme === 'dark' ? '#c026d3' : '#c026d3'}
                  cursorBallColor={theme === 'dark' ? '#c026d3' : '#c026d3'}
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
            </div>
            <div className='w-full space-y-4 md:w-2/3'>
              <div className='text-pretty text-4xl tracking-tight md:text-5xl'>
                Étude et conception logicielle
              </div>
              <div className='text-pretty text-xl leading-relaxed md:text-2xl'>
                Cruciale pour garantir le succès d'un projet, cette phase débute par un recueil des
                besoins. Une étude approfondie du domaine métier, visant à acquérir une parfaite
                compréhension des problématiques, permet de structurer le projet de manière
                efficiente. Bien menée cette étape assure de créer des solutions logicielles sur
                mesure, perfomante et fiable.
              </div>
              {/* <div className='text-pretty text-xl leading-relaxed md:text-2xl'>
                Le recueil des besoins permet d'identifier de manière précise les attentes des
                utilisateurs et les objectifs du projet. La création de maquettes facilite la
                visualisation de l'interface et des fonctionnalités. Une étude approfondie du
                domaine métier assure une compréhension complète des processus et des contraintes
                spécifiques, ce qui permet de concevoir une solution adaptée.
              </div> */}
            </div>
          </section>

          <section className='flex w-full flex-col items-center gap-8 md:flex-row-reverse md:gap-4 md:px-16'>
            <div className='flex min-h-[12rem] w-full min-w-72 items-center justify-center md:w-1/3'>
              YO
            </div>
            <div className='w-full space-y-4 md:w-2/3'>
              <div className='text-pretty text-4xl md:text-5xl'>Agilité</div>
              <div className='text-pretty text-xl leading-relaxed md:text-2xl'>
                Les méthodologies agiles favorisent une adaptation rapide aux changements et une
                livraison continue de valeur. Un suivi de projet efficace implique une communication
                transparente, des réunions régulières. La combinaison de l'agilité et d'un suivi
                rigoureux permet d'optimiser la productivité, la qualité et la qualité des
                livrables.
              </div>
            </div>
          </section>
        </div>

        <div
          id='presentation-second'
          className='my-16 flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-16'>
          <section className='flex w-full flex-col items-center gap-8 md:flex-row md:gap-4 md:px-16'>
            <div className='relative flex w-full items-center justify-center md:w-1/3'>
              <div className='aspect-[1/1]'>
                <LetterGlitch
                  glitchSpeed={100}
                  centerVignette={false}
                  outerVignette={true}
                  smooth={true}
                />
              </div>
            </div>
            <div className='w-full space-y-4 md:w-2/3'>
              <div className='text-pretty text-4xl tracking-tight md:text-5xl'>Développement</div>
              <div className='text-pretty text-xl leading-relaxed md:text-2xl'>
                La réalisation d'une application de qualité est le fruit de la créativité et d'une
                recherche permanente de l'excellence. La maîtrise technique permet de construire une
                solution performante, fiable et évolutive. Le numérique est essentiel pour les
                entreprises, mais un logiciel représente souvent un investissement important. Un
                développement de qualité, respectant les bonnes pratiques, assure une maîtrise des
                coûts tout au long du cycle de vie de l'application et une durabilité accrue. Cette
                approche garantit non seulement un retour sur investissement optimal, mais aussi une
                adaptabilité aux besoins futurs de l'entreprise.
              </div>
            </div>
          </section>

          <section className='flex w-full flex-col items-center gap-8 md:flex-row-reverse md:gap-4 md:px-16'>
            <div className='flex min-h-[12rem] w-full min-w-72 items-center justify-center md:w-1/3'>
              <RivePlayer
                src='/animations/responsive_core.riv'
                stateMachines='StateMachine'
                autoplay
                rootMargin='-25%'
                actions={{
                  onMouseEnter: (rive, inputs) => {
                    if (rive && inputs.enter && inputs.exit) {
                      inputs.exit.value = true
                      inputs.enter.value = false
                    }
                  },
                  onMouseLeave: (rive, inputs) => {
                    if (rive && inputs.enter && inputs.exit) {
                      inputs.exit.value = false
                      inputs.enter.value = true
                    }
                  },
                }}
              />
            </div>
            <div className='w-full space-y-4 md:w-2/3'>
              <div className='text-pretty text-4xl md:text-5xl'>Innovation</div>
              <div className='text-pretty text-xl leading-relaxed md:text-2xl'>
                La capacité à innover et à adopter rapidement de nouvelles technologies est un
                facteur clé de succès dans le développement logiciel. Cette agilité technologique
                permet de maintenir un avantage concurrentiel dans un marché en constante évolution.
                De plus, elle offre la possibilité de répondre de manière proactive aux attentes
                croissantes des consommateurs, en proposant des solutions toujours plus avancées et
                adaptées à leurs besoins.
              </div>
            </div>
          </section>
        </div>
        <KeyframeCssOnView cssClass='showAndHideOnView'>
          <div className='relative h-[600px] w-full'>
            <Image
              src='/images/meeting.jpg'
              alt='Contact Image'
              fill
              style={{ objectFit: 'cover' }}
              sizes='80vw'
              priority
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center md:justify-end md:pr-32'>
            <div className='max-w-md rounded-large bg-primary-900 p-6 text-primary-50 md:w-1/2'>
              {/*backdrop-blur-2xl*/}
              <ContactForm />
            </div>
          </div>
        </KeyframeCssOnView>
      </div>
    </Loading>
  )
}

export default HomePage
