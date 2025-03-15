'use client'

import { Button } from '@heroui/react'
import SocialMedia from 'components/SocialMedia'
import FadeInWhenVisible from 'components/ui/animations/FadeInWhenVisible'
import ArrowUpSvg from 'components/ui/svg/ArrowUpSvg'
import { siteConfig } from 'config/site'

type FooterProps = object

const Footer = ({}: FooterProps) => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='mt-12 flex w-full items-center justify-between px-8 py-2'>
        <SocialMedia />
        <FadeInWhenVisible delay={0.6}>
          <Button
            className='duration-900 border-2 border-primary bg-primary-900 text-primary transition-transform ease-in-out hover:scale-95 hover:shadow-sm hover:shadow-primary'
            radius='full'
            isIconOnly
            aria-label='Scroll to top'
            color='primary'
            onPress={scrollToTop}>
            <ArrowUpSvg />
          </Button>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.8}>
          <div>© 2025 {siteConfig.name}</div>
        </FadeInWhenVisible>
      </div>
      <div className='h-[3px] w-full bg-primary'></div>
    </div>
  )
}

export default Footer
