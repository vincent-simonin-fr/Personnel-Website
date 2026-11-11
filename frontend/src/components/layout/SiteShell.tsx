import 'styles/globals.css'
import { ReactNode } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { Providers } from 'providers/Providers'
import { LocaleContextProvider } from 'providers/LocaleContextProvider'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { jsonLd } from 'seo/MetadataSite'
import { siteFont } from 'site/siteFont'
import { Dictionary } from 'i18n/dictionary.types'

type SiteShellProps = {
  locale: string
  dictionary: Dictionary
  children: ReactNode
}

// The whole document around a page: [locale]/layout.tsx (the root layout) and
// global-not-found.tsx, which bypasses it, both render it so a 404 looks like the site.
const SiteShell = ({ locale, dictionary, children }: SiteShellProps) => (
  // suppressHydrationWarning: next-themes swaps the theme class before hydration.
  <html
    className={'dark'}
    lang={locale}
    data-scroll-behavior='smooth'
    suppressHydrationWarning>
    <body className={`${siteFont.className} antialiased *:text-primary`}>
      {/* Server-rendered so crawlers see it; `<` escaped to keep the JSON inert. */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Providers>
        <main className='flex min-h-screen w-screen flex-col items-center justify-center'>
          <LocaleContextProvider dictionary={dictionary}>
            <Header />
            {children}
            <Footer />
          </LocaleContextProvider>
          <ToastContainer
            aria-label={dictionary.a11y.notifications}
            toastClassName={`${siteFont.className}`}
            position='bottom-right'
            transition={Bounce}
          />
        </main>
      </Providers>
    </body>
  </html>
)

export default SiteShell
