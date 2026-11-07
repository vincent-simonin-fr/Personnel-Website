'use client'

import { Button, Dropdown } from '@heroui/react'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import AppLogo from './AppLogo'
import { notFound, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAppContext } from 'hooks/useAppContext'
import { siteConfig } from 'config/site'
import { useScroll, useSpring, animated } from '@react-spring/web'
import { useMediaQuery } from 'usehooks-ts'
import ChevronDownSvg from 'components/ui/svg/ChevronDownSvg'
import { useLocaleContext } from 'hooks/useLocaleContext'

type HeaderProps = object

const classLinkActive = 'text-fuchsia-600'
const AnimatedDiv = animated('div')
const SUPPORTED_LOCALES = ['fr', 'en-us', 'de'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

// HeroUI v3 has no Navbar: hand-built with the same layout as the former v2 one
// (brand | links pushed to the center | switchers on the right; overlay menu on mobile).
const Header = ({}: HeaderProps) => {
  const path = usePathname()
  const segments = path.split('/')
  const pathname = segments[2] ?? '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()

  const minWidth = '640px'
  const headerWidthVw = 76

  // false on the first render (= server HTML), then the real value: no hydration mismatch.
  const isMobile = useMediaQuery(`(max-width: ${minWidth})`, {
    initializeWithValue: false,
  })

  const { is404 } = useAppContext()
  const { dictionary } = useLocaleContext()

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) =>
      e.key === 'Escape' && setIsMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const width = useSpring({
    width: scrollYProgress.to((y) =>
      isMobile ? '100vw' : `${headerWidthVw - y * 43 * 3}vw`,
    ),
    config: { tension: 280, friction: 50 },
  })

  if (!dictionary || !SUPPORTED_LOCALES.includes(dictionary.locale as Locale)) {
    notFound()
  }
  const locale = dictionary.locale
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <AnimatedDiv
      className={`sticky top-0 z-50 h-12 w-full sm:min-w-[640px] md:min-w-[640px]`}
      style={width}>
      <nav
        aria-label='Main'
        className={`flex h-10 w-full items-center gap-4 px-6 ${isMobile ? 'rounded-none' : 'rounded-full'} ${isMenuOpen ? '' : 'backdrop-blur-lg backdrop-saturate-150'}`}>
        <div className='flex grow basis-0 justify-start sm:hidden'>
          <button
            type='button'
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
            onClick={() => setIsMenuOpen((open) => !open)}
            className='relative block h-6 w-6 cursor-pointer'>
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-200 ${isMenuOpen ? 'top-3 rotate-45' : 'top-2'}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-200 ${isMenuOpen ? 'top-3 -rotate-45' : 'top-4'}`}
            />
          </button>
        </div>

        <div className='flex grow basis-0 justify-start sm:grow-0 sm:basis-auto'>
          <Link href={`/${locale}`} className='flex items-center gap-2'>
            <AppLogo />
            <span className='hidden text-xl sm:block'>{siteConfig.name}</span>
          </Link>
        </div>

        <ul className='hidden grow basis-0 items-center justify-end gap-4 sm:flex'>
          {dictionary.navigation.map((item) => {
            const isActive = item.to.endsWith(pathname)

            if (!item.items) {
              return (
                <li key={item.to}>
                  <Link
                    className={isActive ? classLinkActive : ''}
                    aria-current={isActive ? 'page' : undefined}
                    href={`/${locale}${item.to}`}>
                    {item.label}
                  </Link>
                </li>
              )
            }

            return (
              <li key={item.to}>
                <Dropdown>
                  <Button
                    variant='ghost'
                    className={`h-auto bg-transparent p-0 text-primary ${isActive ? classLinkActive : ''}`}>
                    {item.label}
                    <ChevronDownSvg size={16} />
                  </Button>
                  <Dropdown.Popover className='w-[340px] bg-primary-900'>
                    <Dropdown.Menu aria-label={item.label}>
                      {item.items.map((subItem) => (
                        <Dropdown.Item
                          key={subItem.to}
                          id={subItem.to}
                          textValue={subItem.label}
                          href={`/${locale}${subItem.to}`}
                          className={
                            subItem.to.endsWith(segments[3]) ? classLinkActive : ''
                          }>
                          {subItem.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </li>
            )
          })}
        </ul>

        <div className='flex grow basis-0 items-center justify-end gap-2'>
          {!is404 && <LocaleSwitcher />}
          <ThemeSwitcher />
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id='mobile-menu'
          className='fixed inset-0 top-0 -z-10 min-h-screen px-6 pt-16 backdrop-blur-lg backdrop-saturate-150 sm:hidden'>
          <ul className='flex flex-col gap-2 text-lg *:text-primary'>
            {dictionary.navigation.map((item) => (
              <li key={item.to}>
                <Link
                  className={`block w-full ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                  href={`/${locale}${item.to}`}
                  onClick={closeMenu}>
                  {item.label}
                </Link>
                {item.items && item.items.length > 0 && (
                  <ul className='mt-2 flex flex-col gap-2'>
                    {item.items.map((subItem) => (
                      <li key={subItem.to}>
                        <Link
                          className={`ml-4 block ${subItem.to.endsWith(segments[3]) ? classLinkActive : ''}`}
                          href={`/${locale}${subItem.to}`}
                          onClick={closeMenu}>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </AnimatedDiv>
  )
}

export default Header
