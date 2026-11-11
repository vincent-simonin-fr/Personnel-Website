'use client'

import { Button } from '@heroui/react'
import SocialMedia from 'components/SocialMedia'
import FadeInWhenVisible from 'components/ui/animations/FadeInWhenVisible'
import ArrowUpSvg from 'components/ui/svg/ArrowUpSvg'
import { siteConfig } from '../../../config/site'
import { useMediaQuery } from 'usehooks-ts'
import { useLocaleContext } from 'hooks/useLocaleContext'

type FooterProps = object

// Module scope: computed once, outside render (keeps the component pure).
const currentYear = new Date().getFullYear()

const Footer = ({}: FooterProps) => {
  const { dictionary } = useLocaleContext()
  const minWidth = '624px'
  // false on the first render (= server HTML), then the real value: no hydration mismatch.
  const isMobile = useMediaQuery(`(max-width: ${minWidth})`, {
    initializeWithValue: false,
  })

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='z-50 flex w-full flex-col'>
      <div className='flex w-full items-center justify-between px-1 py-3 md:px-8'>
        <SocialMedia />
        {!isMobile && (
          <FadeInWhenVisible delay={0.6}>
            <Button
              className='rounded-full border-2 border-primary bg-background text-primary transition-transform duration-900 ease-in-out hover:scale-95 hover:shadow-xs hover:shadow-primary'
              isIconOnly
              aria-label={dictionary.a11y.scrollToTop}
              onPress={scrollToTop}>
              <ArrowUpSvg />
            </Button>
          </FadeInWhenVisible>
        )}
        <FadeInWhenVisible delay={0.8}>
          <div>
            © {currentYear} {siteConfig.name}
          </div>
        </FadeInWhenVisible>
      </div>
      <div className='h-0.75 w-full bg-primary'></div>
    </div>
  )
}

export default Footer
