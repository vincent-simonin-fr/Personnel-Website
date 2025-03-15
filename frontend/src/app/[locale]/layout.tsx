import { WebVitals } from 'components/WebVitals'
import { ReactNode } from 'react'
import { getDictionary } from './dictionaries'
import { headers } from 'next/headers'
import Head from 'next/head'
import Script from 'next/script'

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = (await params).locale
  const dictionary = await getDictionary(locale)
  const headersList = await headers()
  const nonce = headersList.get('x-nonce')!

  return (
    <>
      <Head>
        <Script
          src='https://www.googletagmanager.com/gtag/js'
          strategy='afterInteractive'
          nonce={nonce}
        />
      </Head>
      {/* <WebVitals /> */}
      {children}
    </>
  )
}

export default LocaleLayout
