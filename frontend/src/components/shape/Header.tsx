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
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useGlobalContext } from 'hooks/useGlobalContext'

type HeaderProps = object

const Header = ({}: HeaderProps) => {
  const [locale, setLocale] = useState<string>('en-US')
  const [pathname, setPathname] = useState<string>('')
  const [pathSegments, setPathSegments] = useState<string[]>([])
  const path = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const classLinkActive = 'text-rose-500'

  const context = useGlobalContext()
  const { dictionary: dict } = useGlobalContext()

  useEffect(() => {
    const segments = path.split('/')
    setPathSegments(segments)
    setLocale(segments[1])
    setPathname(segments[2] ? segments[2] : '/')
  }, [path, setIsMenuOpen, dict])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className='pr-3 sm:hidden' justify='start'>
        <NavbarBrand>
          <Link color='primary' href={`/${locale}`} passHref rel='noopener noreferrer'>
            <AppLogo />
            <p className='hidden font-bold sm:block'>Vincent.Simonin1</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='start'>
        <NavbarBrand onClick={() => console.log(context)}>
          <Link color='primary' href={`/${locale}`} passHref rel='noopener noreferrer'>
            <AppLogo />
            <p className='hidden font-bold sm:block'>Vincent.Simonin</p>
          </Link>
        </NavbarBrand>

        {dict &&
          dict.navigation
            .filter((item) => !item.items)
            .map((item) => (
              <NavbarItem key={item.to} isActive={item.to.endsWith(pathname)}>
                {/* TODO : transition duration-1000 ease-in-out hover:underline */}
                <Link
                  className={`${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                  color='primary'
                  href={`/${locale}/${item.to}`}
                  passHref
                  rel='noopener noreferrer'>
                  {item.label}
                </Link>
              </NavbarItem>
            ))}

        {dict &&
          dict.navigation
            .filter((item) => item.items)
            .map((item) => (
              <Dropdown
                key={item.to}
                classNames={{
                  content: 'bg-primary-50',
                }}>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className={`bg-transparent p-0 data-[hover=true]:bg-transparent ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                      color='primary'
                      endContent={<ChevronDownIcon className='h-4 w-4' />}
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
        <LocaleSwitcher />
        <ThemeSwitcher />
      </NavbarContent>

      <NavbarMenu className='*:text-primary'>
        {dict &&
          dict.navigation.map((item, index) => {
            return (
              <div key={index}>
                <NavbarMenuItem key={`${item.label}-${index}`}>
                  <Link
                    key={item.to}
                    color='primary'
                    className={`w-full ${item.to.endsWith(pathname) ? classLinkActive : ''}`}
                    href={`/${locale}/${item.to}`}
                    onClick={handleLinkClick}
                    passHref
                    rel='noopener noreferrer'>
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
                          passHref
                          rel='noopener noreferrer'>
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
  )
}

export default Header
