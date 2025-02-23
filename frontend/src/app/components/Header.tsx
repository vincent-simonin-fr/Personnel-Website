'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import LocaleSwitcher from './LocaleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import AppLogo from './AppLogo'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type HeaderProps = object

const Header = ({}: HeaderProps) => {
  const [locale, setLocale] = useState<string>('en-US')
  const path = usePathname()

  useEffect(() => {
    const segments = path.split('/')
    setLocale(segments[1])
  }, [path])

  return (
    <Navbar>
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <Link className='text-inherit' href={`/${locale}`}>
            <AppLogo />
            <p className='hidden font-bold text-inherit sm:block'>Yuno-IT</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className='hidden gap-3 sm:flex'>
          <NavbarItem>
            <Link className='text-inherit' aria-current='page' href={`/${locale}/about`}>
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className='text-inherit' href={`/${locale}/services`}>
              Services
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='bg-transparent p-0 text-inherit data-[hover=true]:bg-transparent'
                  endContent={<ChevronDownIcon className='h-4 w-4' />}
                  radius='sm'
                  variant='light'>
                  TechLabs
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='Yuno-IT TechLabs'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4',
              }}>
              <DropdownItem key='autoscaling'>Autoscaling</DropdownItem>
              <DropdownItem key='usage_metrics'>Usage Metrics</DropdownItem>
              <DropdownItem key='production_ready'>Production Ready</DropdownItem>
              <DropdownItem key='99_uptime'>+99% Uptime</DropdownItem>
              <DropdownItem key='supreme_support'>+Supreme Support</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent as='div' className='items-center' justify='end'>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  )
}

export default Header
