import 'styles/globals.css'
import { Providers } from 'providers/Providers'
import { Bounce, ToastContainer } from 'react-toastify'
import { jsonLd, MetadataSite, ViewportSite } from '../../seo/MetadataSite'
import Script from 'next/script'
import Head from 'next/head'
import { Hanken_Grotesk } from 'next/font/google'
import { headers } from 'next/headers'

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'] })

export const metadata = MetadataSite

export const viewport = ViewportSite

// fr or en-US or de
// Note: Pour SSG, on utilise une locale par défaut. La locale réelle sera gérée dans [locale]/layout.tsx
const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'fr' // Défaut à 'fr' si pas de locale trouvée
  const nonce = headersList.get('x-nonce')!

  return (
    <html className={'dark'} lang={locale} data-scroll-behavior='smooth'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
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
        nonce={nonce}
      />
      <body className={`${hankenGrotesk.className} antialiased *:text-primary`}>
        <Providers locale={locale}>
          <main className='flex min-h-screen w-screen flex-col items-center justify-center'>
            {children}
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
