import { usePathname, useRouter } from 'next/navigation'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import LanguageSvg from 'components/ui/svg/LanguageSvg'
import UsaSvg from 'components/ui/svg/UsaSvg'
import FranceSvg from 'components/ui/svg/FranceSvg'
import GermanySvg from 'components/ui/svg/GermanySvg'
import { setLocaleCookie } from 'actions'
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
        selectedKeys={[currentLocale]}
        onAction={(key) => handleSelectLocale(String(key))}>
        {(locale) => (
          <DropdownItem
            key={locale.key}
            textValue={locale.key}
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
