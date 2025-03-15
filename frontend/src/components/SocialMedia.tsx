'use client'

import { siteConfig } from 'config/site'
import Link from 'next/link'
import EmailSvg from 'components/ui/svg/EmailSvg'
import LinkedinSvg from 'components/ui/svg/LinkedinSvg'
import GithubSvg from 'components/ui/svg/GithubSvg'
import FadeInWhenVisible from './ui/animations/FadeInWhenVisible'

type SocialMediaProps = {
  delay?: number
  noDelay?: boolean
}

// TODO: Handle loading and error states
const SocialMedia = ({ delay = 0, noDelay = false }: SocialMediaProps) => {
  const size = 30
  return (
    <div className='flex gap-3'>
      <FadeInWhenVisible delay={noDelay ? 0 : delay}>
        <div className='transition-transform duration-300 hover:scale-110'>
          <Link
            key='github'
            href={siteConfig.links.github}
            target='_blank'
            rel='noopener noreferrer'>
            <GithubSvg size={size} className='text-primary' />
          </Link>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={noDelay ? 0 : 0.2 + delay}>
        <div className='transition-transform duration-300 hover:scale-110'>
          <Link
            key='linkedin'
            href={siteConfig.links.linkedin}
            target='_blank'
            rel='noopener noreferrer'>
            <LinkedinSvg size={size} className='text-primary' />
          </Link>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={noDelay ? 0 : 0.4 + delay}>
        <div className='transition-transform duration-300 hover:scale-110'>
          <Link key='email' href={siteConfig.links.email}>
            <EmailSvg size={size} className='text-primary' />
          </Link>
        </div>
      </FadeInWhenVisible>
    </div>
  )
}

export default SocialMedia
