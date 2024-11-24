import type { Metadata } from 'next'
import { Providers } from '../providers'
import localFont from 'next/font/local'
import '../globals.css'
import LocaleSwitcher from 'components/LocaleSwitcher'
import { ThemeSwitcher } from 'components/ThemeSwitcher'

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

const RootLayout = async ({
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div>
            <nav className='flex items-center justify-end gap-4 p-4 sm:p-6'>
              <LocaleSwitcher />
              <ThemeSwitcher />
            </nav>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
