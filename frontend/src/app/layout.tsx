'use server-only'

import Footer from 'components/shape/Footer'
import Header from 'components/shape/Header'
import 'styles/globals.css'
import { Providers } from '../providers/providers'
import { Bounce, ToastContainer } from 'react-toastify'
import { jsonLd, MetadataSite, ViewportSite } from 'src/seo/MetadataSite'
import Script from 'next/script'
import Head from 'next/head'
import { Hanken_Grotesk } from 'next/font/google'
import { headers } from 'next/headers'

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'] })

export const metadata = MetadataSite

export const viewport = ViewportSite

// fr or en-US or de
const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'fr' // Défaut à 'fr' si pas de locale trouvée
  const nonce = headersList.get('x-nonce')!

  console.info('Loading root layout', locale)

  return (
    <html className={'dark'} lang={locale}>
      <Head>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=GTM-NKBC7G3V'
          strategy='afterInteractive'
          nonce={nonce}
        />
        <Script
          id='schema-jsonld'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className={`${hankenGrotesk.className} antialiased *:text-primary`}>
        <Providers locale={locale}>
          <main className='flex min-h-screen w-screen flex-col items-center justify-center'>
            <Header />
            {children}
            <Footer />
            <ToastContainer
              toastClassName={`${hankenGrotesk.className}`}
              position='bottom-right'
              transition={Bounce}
            />
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
