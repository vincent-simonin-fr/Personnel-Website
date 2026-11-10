'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button, Dropdown } from '@heroui/react'
import LanguageSvg from 'components/ui/svg/LanguageSvg'
import UsaSvg from 'components/ui/svg/UsaSvg'
import FranceSvg from 'components/ui/svg/FranceSvg'
import GermanySvg from 'components/ui/svg/GermanySvg'
import { setLocaleCookie } from '../../lib/actions/actions'
import { useState } from 'react'
import { useLocaleContext } from 'hooks/useLocaleContext'
import { isLocale, locales } from 'i18n/locales'

const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { dictionary } = useLocaleContext()
  const [currentLocale, setCurrentLocale] = useState(dictionary.locale)

  const path = (locale: string) => {
    const segments = pathname.split('/')
    // Locale-less URL (e.g. /projects, rewritten by the proxy): keep every segment.
    const hasLocale = isLocale(segments[1])
    const rest = segments.slice(hasLocale ? 2 : 1).filter(Boolean)
    return ['', locale, ...rest].join('/')
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
        return <UsaSvg size={18} />
      case 'fr':
        return <FranceSvg size={18} />
      case 'de':
        return <GermanySvg size={18} />
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
      {/* Frosted glass like the header; the active language is fuchsia. */}
      <Dropdown.Popover className='min-w-40 rounded-2xl border border-primary-800 bg-background/80 p-1 shadow-2xl backdrop-blur-lg backdrop-saturate-150'>
        <Dropdown.Menu
          aria-label='Language menu'
          items={locales}
          selectionMode='single'
          selectedKeys={[currentLocale]}
          onAction={(key) => handleSelectLocale(String(key))}>
          {(locale) => (
            <Dropdown.Item
              id={locale.key}
              textValue={locale.label}
              className='gap-3 rounded-xl px-3 py-2 text-sm text-primary-100 data-selected:bg-fuchsia-500/10 data-selected:text-brand'>
              {getFlag(locale.key)}
              {/* Autonym: each language in its own name, so `lang` for screen readers. */}
              <span lang={locale.key}>{locale.label}</span>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default LocaleSwitcher
