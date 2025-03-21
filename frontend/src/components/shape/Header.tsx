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

const Header = ({}: HeaderProps) => {
  const [locale, setLocale] = useState<string>('en-US')
  const [pathname, setPathname] = useState<string>('')
  const [pathSegments, setPathSegments] = useState<string[]>([])
  const path = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const classLinkActive = 'text-fuchsia-600'
  const { scrollYProgress } = useScroll()
  const minWidth = '624px'
  // const minWidthTwClass = `md:min-w-[${minWidth}]`
  const isMobile = useMediaQuery(`(max-width: ${minWidth})`)

  const context = useAppContext()
  const { dictionary } = useAppContext()

  useEffect(() => {
    const segments = path.split('/')
    setPathSegments(segments)
    setLocale(segments[1])
    setPathname(segments[2] ? segments[2] : '/')
  }, [path, setIsMenuOpen, dictionary])

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
      className={`sticky top-0 z-50 min-w-full border-b-red-600 md:min-w-[624px]`}
      style={width}>
      <Navbar
        className={`w-full *:max-w-full ${isMenuOpen ? 'mt-0 h-16 rounded-none bg-black' : 'mt-2 h-12 rounded-full'}`}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        <NavbarContent className='pr-3 sm:hidden' justify='start'>
          <NavbarBrand>
            <Link color='primary' href={`/${locale}`} passHref>
              <AppLogo />
              <p className='hidden sm:block'>{siteConfig.name}</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden gap-4 sm:flex' justify='start'>
          <NavbarBrand onClick={() => console.log(context)}>
            <Link color='primary' href={`/${locale}`} passHref>
              <AppLogo />
              <p className={`hidden text-xl sm:block`}>{siteConfig.name}</p>
            </Link>
          </NavbarBrand>

          {dictionary &&
            dictionary.navigation
              .filter((item) => !item.items)
              .map((item) => (
                <NavbarItem key={item.to} isActive={item.to.endsWith(pathname)}>
                  {/* TODO : transition duration-1000 ease-in-out hover:underline */}
                  <Link
                    className={`${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                    color='primary'
                    href={`/${locale}/${item.to}`}
                    passHref>
                    {item.label}
                  </Link>
                </NavbarItem>
              ))}

          {dictionary &&
            dictionary.navigation
              .filter((item) => item.items)
              .map((item) => (
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
                        className={subItem.to.endsWith(pathSegments[3]) ? classLinkActive : ''}
                        key={subItem.to}
                        href={`/${locale}/${subItem.to}`}>
                        {subItem.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ))}
        </NavbarContent>

        <NavbarContent as='div' className='items-center' justify='end'>
          {!context.is404 && <LocaleSwitcher />}
          <ThemeSwitcher />
        </NavbarContent>

        <NavbarMenu className='*:text-primary'>
          {dictionary &&
            dictionary.navigation.map((item, index) => {
              return (
                <div key={index}>
                  <NavbarMenuItem key={`${item.label}-${index}`}>
                    <Link
                      key={item.to}
                      color='primary'
                      className={`w-full ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                      href={`/${locale}/${item.to}`}
                      onClick={handleLinkClick}
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
                            className={`w-90 ml-4 ${subItem.to.endsWith(pathSegments[3]) ? classLinkActive : ''}`}
                            href={`/${locale}/${subItem.to}`}
                            onClick={handleLinkClick}
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
    </AnimatedDiv>
  )
}

export default Header
