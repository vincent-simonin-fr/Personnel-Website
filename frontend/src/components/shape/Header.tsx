'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import AppLogo from './AppLogo'
import { notFound, usePathname } from 'next/navigation'
import { useState } from 'react'
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

const Header = ({}: HeaderProps) => {
  const path = usePathname()
  const segments = path.split('/')
  const pathname = segments[2] ?? '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()

  const minWidth = '640px'
  const headerWidthVw = 76

  const isMobile = useMediaQuery(`(max-width: ${minWidth})`)

  const { is404 } = useAppContext()
  const { dictionary } = useLocaleContext()

  if (!dictionary || !SUPPORTED_LOCALES.includes(dictionary.locale as Locale)) {
    notFound()
  }
  const locale = dictionary.locale

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const width = useSpring({
    width: scrollYProgress.to((y) =>
      isMobile ? '100vw' : `${headerWidthVw - y * 43 * 3}vw`,
    ),
    config: { tension: 280, friction: 50 },
  })

  return (
    <AnimatedDiv
      className={`sticky top-0 z-50 h-12 w-full sm:min-w-[640px] md:min-w-[640px]`}
      style={width}>
      <Navbar
        className={`h-10 w-full bg-transparent transition-transform-colors-opacity *:max-w-full ${isMobile ? 'rounded-none' : 'rounded-full'} ${isMenuOpen ? 'backdrop-blur-none backdrop-saturate-100 data-[menu-open=true]:backdrop-blur-none' : ''}`}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        <NavbarContent className='pr-3 sm:hidden' justify='start'>
          <NavbarItem>
            <NavbarBrand>
              <Link color='primary' href={`/${locale}`} passHref>
                <AppLogo />
                <p className='hidden sm:block'>{siteConfig.name}</p>
              </Link>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
          <NavbarItem>
            <NavbarBrand>
              <Link color='primary' href={`/${locale}`}>
                <AppLogo />
                <p className={`hidden text-xl sm:block`}>{siteConfig.name}</p>
              </Link>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className='hidden gap-4 sm:flex' justify='end'>
          {dictionary &&
            dictionary.navigation.map((item) => {
              if (!item.items) {
                return (
                  <NavbarItem key={item.to} isActive={item.to.endsWith(pathname)}>
                    {/* TODO : transition duration-1000 ease-in-out hover:underline */}
                    <Link
                      className={`${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                      color='primary'
                      href={`/${locale}${item.to}`}
                      aria-label={`${item.label} link`}>
                      {item.label}
                    </Link>
                  </NavbarItem>
                )
              }

              return (
                <Dropdown
                  key={item.to}
                  classNames={{
                    content: 'bg-primary-900',
                  }}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className={`bg-transparent p-0 data-[hover=true]:bg-transparent ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                        color='primary'
                        endContent={<ChevronDownSvg size={16} />}
                        radius='sm'
                        variant='light'>
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label='Yuno-IT TechLabs'
                    className='w-[340px]'
                    color='primary'
                    itemClasses={{
                      base: 'gap-4',
                    }}>
                    {item.items!.map((subItem) => (
                      <DropdownItem
                        color='primary'
                        className={
                          subItem.to.endsWith(segments[3]) ? classLinkActive : ''
                        }
                        key={subItem.to}
                        href={`/${locale}${subItem.to}`}
                        aria-label={`${item.label} link`}>
                        {subItem.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )
            })}
        </NavbarContent>

        <NavbarContent as='div' className='items-center' justify='end'>
          {!is404 && <LocaleSwitcher />}
          <ThemeSwitcher />
        </NavbarContent>

        <NavbarMenu className='top-0 min-h-screen bg-transparent pt-16 backdrop-blur-lg backdrop-saturate-150 *:text-primary'>
          {dictionary &&
            dictionary.navigation.map((item, index) => {
              return (
                <div key={index}>
                  <NavbarMenuItem key={`${item.label}-${index}`}>
                    <Link
                      key={item.to}
                      color='primary'
                      className={`w-full ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                      href={`/${locale}${item.to}`}
                      onClick={handleLinkClick}
                      aria-label={`${item.label} link`}
                      passHref>
                      {item.label}
                    </Link>
                  </NavbarMenuItem>
                  {item.items?.length &&
                    item.items!.map((subItem, index) => {
                      return (
                        <NavbarMenuItem key={`${subItem.label}-${index}`}>
                          <Link
                            key={subItem.to}
                            color='primary'
                            className={`w-90 ml-4 ${subItem.to.endsWith(segments[3]) ? classLinkActive : ''}`}
                            href={`/${locale}${subItem.to}`}
                            onClick={handleLinkClick}
                            aria-label={`${item.label} link`}
                            passHref>
                            {subItem.label}
                          </Link>
                        </NavbarMenuItem>
                      )
                    })}
                </div>
              )
            })}
        </NavbarMenu>
      </Navbar>
      {/* {isMenuOpen && <div className='h-4 bg-foreground'></div>} */}
    </AnimatedDiv>
  )
}

export default Header
