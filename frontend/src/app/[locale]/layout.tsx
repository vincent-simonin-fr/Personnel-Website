import type { Metadata } from 'next'
import { WebVitals } from 'components/WebVitals'
import { ReactNode } from 'react'
import { LocaleContextProvider } from 'providers/LocaleContextProvider'
import Header from 'components/shape/Header'
import Footer from 'components/shape/Footer'
import { getDictionary, locales } from 'i18n/getDictionary'
import { MetadataSite, pageMetadata } from 'seo/MetadataSite'
import { siteConfig } from 'config/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

// Home page metadata + defaults for every page of this locale.
export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  if (!dictionary) return {}
  const metadata = pageMetadata(
    locale,
    '',
    undefined,
    dictionary.homePage.description,
  )

  return {
    ...metadata,
    title: {
      default: MetadataSite.title as string,
      template: `%s | ${siteConfig.name}`,
    },
  }
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = (await params).locale
  const dictionary = await getDictionary(locale)

  return (
    <LocaleContextProvider dictionary={dictionary}>
      {/* <WebVitals /> */}
      <Header />
      {children}
      <Footer />
    </LocaleContextProvider>
  )
}

export default LocaleLayout
