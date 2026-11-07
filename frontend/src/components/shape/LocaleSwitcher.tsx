'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button, Dropdown } from '@heroui/react'
import LanguageSvg from 'components/ui/svg/LanguageSvg'
import UsaSvg from 'components/ui/svg/UsaSvg'
import FranceSvg from 'components/ui/svg/FranceSvg'
import GermanySvg from 'components/ui/svg/GermanySvg'
import { setLocaleCookie } from '../../lib/actions/actions'
import { Locale } from 'types'
import { useState } from 'react'
import { useLocaleContext } from 'hooks/useLocaleContext'

const locales: Locale[] = [
  {
    key: 'fr',
    label: 'fr',
    country: 'France',
    icon: 'icons/fr.svg',
  },
  {
    key: 'en-us',
    label: 'en',
    country: 'United States',
    icon: 'icons/us.svg',
  },
  {
    key: 'de',
    label: 'de',
    country: 'Germany',
    icon: 'icons/de.svg',
  },
]

const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { dictionary } = useLocaleContext()
  const [currentLocale, setCurrentLocale] = useState(dictionary.locale)

  const path = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const handleSelectLocale = async (newLocale: string) => {
    if (newLocale === currentLocale) return
    setCurrentLocale(newLocale)
    await setLocaleCookie(newLocale)
    router.push(path(newLocale))
  }

  const getFlag = (locale: string) => {
    switch (locale) {
      case 'en-us':
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
    <Dropdown>
      <Button
        // v3 icon buttons force svg to 16px; keep the 24px icon of the v2 design.
        className='min-w-8 rounded-full px-2 text-primary [&_svg]:size-6'
        name='open-language-menu'
        variant='ghost'
        isIconOnly
        aria-label='Open language menu'>
        <LanguageSvg size={24} />
      </Button>
      <Dropdown.Popover className='min-w-min'>
        <Dropdown.Menu
          aria-label='Language menu'
          items={locales}
          selectionMode='single'
          selectedKeys={[currentLocale]}
          onAction={(key) => handleSelectLocale(String(key))}>
          {(locale) => (
            <Dropdown.Item
              id={locale.key}
              textValue={locale.key}
              aria-label={`${locale.country} language`}>
              <div className='flex items-center justify-start gap-3'>
                {getFlag(locale.key)}
                <span className='align-middle text-lg'>{locale.label}</span>
              </div>
              {/* v3 shows the selection check only when the indicator is rendered. */}
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default LocaleSwitcher
