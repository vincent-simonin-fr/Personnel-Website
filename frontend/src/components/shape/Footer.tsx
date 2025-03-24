'use client'

import { Button } from '@heroui/react'
import SocialMedia from 'components/SocialMedia'
import FadeInWhenVisible from 'components/ui/animations/FadeInWhenVisible'
import ArrowUpSvg from 'components/ui/svg/ArrowUpSvg'
import { siteConfig } from 'config/site'
import { useMediaQuery } from 'usehooks-ts'

type FooterProps = object

const Footer = ({}: FooterProps) => {
  const minWidth = '624px'
  const isMobile = useMediaQuery(`(max-width: ${minWidth})`)

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
              className='border-primary bg-background text-primary hover:shadow-primary border-2 p-1.5 transition-transform duration-700 ease-in-out hover:scale-90 hover:shadow-2xs'
              radius='full'
              isIconOnly
              aria-label='Scroll to top'
              color='primary'
              onPress={scrollToTop}>
              <ArrowUpSvg />
            </Button>
          </FadeInWhenVisible>
        )}
        <FadeInWhenVisible delay={0.8}>
          <div>© 2025 {siteConfig.name}</div>
        </FadeInWhenVisible>
      </div>
      <div className='bg-primary h-[3px] w-full'></div>
    </div>
  )
}

export default Footer
