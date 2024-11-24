'use server-only'

import type { Metadata } from 'next'
import { Providers } from '../providers'
import localFont from 'next/font/local'
import '../globals.css'
import Header from 'components/Header'
import Footer from 'components/Footer'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Yuno IT',
  description: 'by V.Simonin',
}

export async function generateStaticParams() {
  return [{ locale: 'en-US' }, { locale: 'de' }, { locale: 'fr' }]
}

const LocaleLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) => {
  const { locale } = await params

  return (
    // Initial theme is dark
    <html className={'dark'} lang={locale} style={{ colorScheme: 'dark' }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default LocaleLayout
