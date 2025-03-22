import { WebVitals } from 'components/WebVitals'
import { ReactNode } from 'react'
import { getDictionary } from './dictionaries'

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = (await params).locale
  const dictionary = await getDictionary(locale)

  console.info('Loading main layout', locale, dictionary)

  return (
    <>
      {/* <WebVitals /> */}
      {children}
    </>
  )
}

export default LocaleLayout
