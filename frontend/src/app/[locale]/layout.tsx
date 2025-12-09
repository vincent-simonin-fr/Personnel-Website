import { WebVitals } from 'components/WebVitals'
import { ReactNode } from 'react'
import { LocaleContextProvider } from 'providers/LocaleContextProvider'
import Header from 'components/shape/Header'
import Footer from 'components/shape/Footer'
import { getDictionary } from 'i18n/getDictionary'

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en-us' }, { locale: 'de' }]
}

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = (await params).locale
  const dictionary = await getDictionary(locale)

  // console.info('Loading main layout', locale, dictionary)

  return (
    // <Suspense fallback={null}>
    <>
      {/* <WebVitals /> */}
      <LocaleContextProvider dictionary={dictionary}>
        <Header />
        {children}
        <Footer />
      </LocaleContextProvider>
    </>
    // </Suspense>
  )
}

export default LocaleLayout
