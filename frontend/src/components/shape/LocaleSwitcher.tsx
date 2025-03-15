'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  SharedSelection,
} from '@heroui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppContext } from 'hooks/useAppContext'
import LanguageSvg from 'components/ui/svg/LanguageSvg'

type Locale = {
  key: string
  label: string
  country: string
  icon: string
}

const locales: Locale[] = [
  {
    key: 'en-US',
    label: 'en',
    country: 'United States',
    icon: 'https://flagcdn.com/us.svg',
  },
  {
    key: 'fr',
    label: 'fr',
    country: 'France',
    icon: 'https://flagcdn.com/fr.svg',
  },
  {
    key: 'de',
    label: 'de',
    country: 'Germany',
    icon: 'https://flagcdn.com/de.svg',
  },
]

const LocaleSwitcher = () => {
  const pathname = usePathname()
  const [locale, setLocale] = useState<Locale>(locales[0])
  const router = useRouter()
  const { setLocale: setLocaleContext } = useAppContext()
  const [selectedKeys, setSelectedKeys] = useState(new Set(['en-US']))

  useEffect(() => {
    const segments = pathname.split('/')
    if (segments[1] !== locale.key) {
      setLocale(locales.find((locale) => locale.key === segments[1])!)
      setLocaleContext(segments[1])
    }
  }, [pathname])

  const redirectTo = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
  }

  const handleSelectLocale = (e: SharedSelection) => {
    if (e.currentKey && e.currentKey !== locale.key) {
      setLocale(locales.find((locale) => locale.key === e.currentKey)!)
      setLocaleContext(e.currentKey)
      redirectTo(e.currentKey)
    }
  }

  return (
    <Dropdown aria-label='Language switcher' className='min-w-min'>
      <DropdownTrigger>
        <Button className='min-w-8 px-2' color='primary' radius='full' variant='light'>
          <LanguageSvg size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Language switcher'
        items={locales}
        selectionMode='single'
        selectedKeys={[locale!.key]}
        onSelectionChange={(e) => handleSelectLocale(e)}>
        {(locale) => (
          <DropdownItem key={locale.key} textValue={locale.key}>
            <span className='flex items-center justify-start gap-3'>
              <Avatar alt={locale.country} className='h-5 w-5' src={locale.icon} />
              <span className='align-middle text-lg'>{locale.label}</span>
            </span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LocaleSwitcher
