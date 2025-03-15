'use server-only'

import Footer from 'components/shape/Footer'
import Header from 'components/shape/Header'
import 'styles/globals.css'
import { Providers } from '../providers/providers'
import { Bounce, ToastContainer } from 'react-toastify'
import { jsonLd, MetadataSite } from 'src/seo/MetadataSite'
import Script from 'next/script'
import Head from 'next/head'
import { Hanken_Grotesk } from 'next/font/google'

const hankenGrotesk = Hanken_Grotesk({ subsets: ['latin'] })

export { MetadataSite }

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html className={'dark'} lang={'en-US'} style={{ colorScheme: 'dark' }}>
      <Head>
        <Script
          id='schema-jsonld'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className={`${hankenGrotesk.className} antialiased *:text-primary`}>
        <Providers>
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
