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
import UsaSvg from 'components/ui/svg/UsaSvg'
import FranceSvg from 'components/ui/svg/FranceSvg'
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

  const getFlag = (locale: string) => {
    switch (locale) {
      case 'en-US':
        return <UsaSvg size={20} />
      case 'fr':
        return <FranceSvg size={20} />
      case 'de':
        return <GermanySvg size={20} />
      default:
        return 'foo'
    }
  }

  return (
    <Dropdown aria-label='Language switcher' className='min-w-min'>
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
            <div className='flex items-center justify-start gap-3'>
              {getFlag(locale.key)}
              <span className='align-middle text-lg'>{locale.label}</span>
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LocaleSwitcher
