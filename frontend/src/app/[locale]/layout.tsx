import { WebVitals } from 'components/WebVitals'
import { ReactNode, Suspense } from 'react'

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  // const locale = (await params).locale
  // const dictionary = await getDictionary(locale)

  // console.info('Loading main layout', locale, dictionary)

  return (
    // <Suspense fallback={null}>
    <>
      {/* <WebVitals /> */}
      {children}
    </>
    // </Suspense>
  )
}

export default LocaleLayout
