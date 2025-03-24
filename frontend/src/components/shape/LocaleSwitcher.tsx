'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useAppContext } from 'hooks/useAppContext'
import LanguageSvg from 'components/ui/svg/LanguageSvg'
import FranceSvg from 'components/ui/svg/FranceSvg'
import { JSX } from 'react'
import UsaSvg from 'components/ui/svg/UsaSvg'
import GermanySvg from 'components/ui/svg/GermanySvg'

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
    icon: 'icons/us.svg',
  },
  {
    key: 'fr',
    label: 'fr',
    country: 'France',
    icon: 'icons/fr.svg',
  },
  {
    key: 'de',
    label: 'de',
    country: 'Germany',
    icon: 'icons/de.svg',
  },
]

const LocaleSwitcher = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { locale, setLocale } = useAppContext()

  const path = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const handleSelectLocale = (newLocale: string) => {
    if (newLocale === locale) return

    setLocale(newLocale)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.push(path(newLocale))
  }

  const getFlag = (locale: string): JSX.Element | null => {
    switch (locale) {
      case 'en-US':
        return <UsaSvg size={16} />
      case 'fr':
        return <FranceSvg size={16} />
      case 'de':
        return <GermanySvg size={16} />
      default:
        return null
    }
  }

  return (
    <Dropdown
      aria-label='Language switcher'
      className=''
      classNames={{
        content: 'bg-primary-900 rounded-xl border-1 border-primary-500',
      }}>
      <DropdownTrigger>
        <Button
          className='min-w-8 px-2'
          name='open-language-menu'
          color='primary'
          radius='full'
          variant='light'
          aria-label='Open language menu'>
          <LanguageSvg size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Language menu'
        items={locales}
        selectionMode='single'
        selectedKeys={[locale]}>
        {(locale) => (
          <DropdownItem
            key={locale.key}
            textValue={locale.key}
            onPress={() => handleSelectLocale(locale.key)}
            aria-label={`${locale.country} language`}>
            <span className='flex items-center justify-start gap-3'>
              {getFlag(locale.key)}
              <span className='align-middle text-lg'>{locale.label}</span>
            </span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LocaleSwitcher
