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
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAppContext } from 'hooks/useAppContext'
import { siteConfig } from 'config/site'
import { useScroll, useSpring, animated } from '@react-spring/web'
import { useMediaQuery } from 'usehooks-ts'
import ChevronDownSvg from 'components/ui/svg/ChevronDownSvg'

type HeaderProps = object

const classLinkActive = 'text-fuchsia-600'

const Header = ({}: HeaderProps) => {
  const [pathname, setPathname] = useState<string>('')
  const [pathSegments, setPathSegments] = useState<string[]>([])
  const path = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const minWidth = '640px'
  // const minWidthTwClass = `md:min-w-[${minWidth}]`
  const isMobile = useMediaQuery(`(max-width: ${minWidth})`)

  const { is404 } = useAppContext()
  const { dictionary, locale } = useAppContext()

  useEffect(() => {
    // TODO handle case where fr = '/'
    const segments = path.split('/')
    setPathSegments(segments)
    setPathname(segments[2] ? segments[2] : '/')
  }, [setIsMenuOpen, path])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const AnimatedDiv = animated('div')

  const width = useSpring({
    width: scrollYProgress.to((y) => (isMobile ? '100vw' : `${80 - y * 43 * 3}vw`)),
    config: { tension: 280, friction: 50 },
  })

  return (
    <AnimatedDiv
      className={`sticky top-0 z-50 h-14 w-full sm:min-w-[640px] md:min-w-[640px]`}
      style={width}>
      {/* <Navbar
        className={`transition-transform-colors-opacity h-12 w-full bg-transparent *:max-w-full ${isMobile ? 'rounded-none' : 'rounded-full'} ${isMenuOpen ? 'backdrop-blur-none backdrop-saturate-100 data-[menu-open=true]:backdrop-blur-none' : ''}`}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}> */}

      <Navbar
        className={`transition-transform-colors-opacity h-12 w-full bg-transparent *:max-w-full ${isMobile ? 'rounded-none' : 'rounded-full'} ${isMenuOpen ? 'backdrop-blur-none backdrop-saturate-100 data-[menu-open=true]:backdrop-blur-none' : ''}`}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        <NavbarContent className='pr-3 sm:hidden' justify='center'>
          <NavbarBrand>
            <Link color='primary' href={`/${locale}`}>
              <AppLogo />
              <p className={`hidden text-xl sm:block`}>{siteConfig.name}</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden gap-4 pl-4 sm:flex' justify='center'>
          <NavbarBrand>
            <Link color='primary' href={`/${locale}`}>
              <AppLogo />
              <p className={`hidden text-xl sm:block`}>{siteConfig.name}</p>
            </Link>
          </NavbarBrand>

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
                    content: 'bg-primary-900 rounded-xl border-1 border-primary-500',
                  }}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className={`flex p-0 ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
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
                    itemClasses={{
                      base: 'gap-4',
                    }}>
                    {item.items!.map((subItem) => (
                      <DropdownItem
                        className={subItem.to.endsWith(pathSegments[3]) ? classLinkActive : ''}
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

        <NavbarContent as='div' className='items-center pr-4' justify='end'>
          {!is404 && <LocaleSwitcher />}
          <ThemeSwitcher />
        </NavbarContent>

        <NavbarMenu className='*:text-primary top-0 min-h-screen bg-transparent pt-16 backdrop-blur-lg backdrop-saturate-150'>
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
                            className={`ml-4 w-90 ${subItem.to.endsWith(pathSegments[3]) ? classLinkActive : ''}`}
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
