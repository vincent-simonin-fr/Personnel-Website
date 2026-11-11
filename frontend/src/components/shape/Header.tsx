'use client'

import { Button, Dropdown } from '@heroui/react'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import AppLogo from './AppLogo'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useAppContext } from 'hooks/useAppContext'
import { siteConfig } from 'config/site'
import { useMediaQuery } from 'usehooks-ts'
import ChevronDownSvg from 'components/ui/svg/ChevronDownSvg'
import { useLocaleContext } from 'hooks/useLocaleContext'
import { stripLocale } from 'i18n/locales'

type HeaderProps = object

// text-brand: theme-aware fuchsia that passes 4.5:1 for small text (see globals.css).
const classLinkActive = 'text-brand'

// HeroUI v3 has no Navbar: hand-built with the same layout as the former v2 one
// (brand | links pushed to the center | switchers on the right; overlay menu on mobile).
const Header = ({}: HeaderProps) => {
  const [, section, subSection] = stripLocale(usePathname()).split('/')
  const pathname = section || '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

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

  // Header shrinks as the page scrolls (desktop). Passive listener + direct style write,
  // batched per frame: zero work while idle and no React re-render (react-spring's
  // useScroll used to poll every frame, even without scrolling).
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      el.style.width = isMobile ? '100vw' : `${headerWidthVw - progress * 22 * 3}vw`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [isMobile])

  const locale = dictionary.locale
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-50 h-12 w-full sm:min-w-160 md:min-w-160`}
      // Initial width (= server render, scroll 0); the effect above takes over.
      style={{ width: `${headerWidthVw}vw` }}>
      <nav
        aria-label={dictionary.a11y.mainNav}
        className={`flex h-10 w-full items-center gap-4 px-6 ${isMobile ? 'rounded-none' : 'rounded-full'} ${isMenuOpen ? '' : 'backdrop-blur-lg backdrop-saturate-150'}`}>
        <div className='flex grow basis-0 justify-start sm:hidden'>
          <button
            type='button'
            aria-label={
              isMenuOpen ? dictionary.a11y.closeMenu : dictionary.a11y.openMenu
            }
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
            {/* sr-only below sm (not `hidden`): AppLogo is empty, so this text is the
                link's only accessible name on mobile. */}
            <span className='sr-only text-xl sm:not-sr-only'>{siteConfig.name}</span>
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
                  <Dropdown.Popover className='w-85 bg-primary-900'>
                    <Dropdown.Menu aria-label={item.label}>
                      {item.items.map((subItem) => (
                        <Dropdown.Item
                          key={subItem.to}
                          id={subItem.to}
                          textValue={subItem.label}
                          href={`/${locale}${subItem.to}`}
                          className={
                            subItem.to.endsWith(subSection) ? classLinkActive : ''
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
                          className={`ml-4 block ${subItem.to.endsWith(subSection) ? classLinkActive : ''}`}
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
    </div>
  )
}

export default Header
