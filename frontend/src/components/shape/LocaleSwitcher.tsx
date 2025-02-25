'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Select, SelectItem } from '@heroui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { LanguageIcon } from '@heroicons/react/24/outline'
import { useGlobalContext } from 'hooks/useGlobalContext'

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
  const { setLocale: setLocaleContext } = useGlobalContext()

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

  const handleSelectLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value && e.target.value !== locale.key) {
      setLocale(locales.find((locale) => locale.key === e.target.value)!)
      setLocaleContext(e.target.value)
      redirectTo(e.target.value)
    }
  }

  return (
    <Select
      className='flex w-36 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm transition-colors sm:h-5 sm:px-5 sm:text-base'
      color='primary'
      items={locales}
      aria-label='Language switcher'
      selectedKeys={[locale!.key]}
      onChange={handleSelectLocale}
      classNames={{
        popoverContent: 'bg-primary-50',
      }}
      startContent={<LanguageIcon className='h-6 w-6' />}
      size='sm'>
      {(locale) => (
        <SelectItem
          key={locale.key}
          color='primary'
          startContent={<Avatar alt={locale.country} className='h-4 w-4' src={locale.icon} />}>
          {locale.label}
        </SelectItem>
      )}
    </Select>
  )
}

export default LocaleSwitcher
