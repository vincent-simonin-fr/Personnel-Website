import 'styles/globals.css'
import { Providers } from 'providers/Providers'
import { Bounce, ToastContainer } from 'react-toastify'
import { jsonLd, MetadataSite, ViewportSite } from 'seo/MetadataSite'
import { siteFont } from 'config/siteFont'
import { headers } from 'next/headers'

export const metadata = MetadataSite

export const viewport = ViewportSite

// Locale and CSP nonce come from request headers set by src/proxy.ts. Reading them
// makes every route dynamic, which the per-request nonce requires anyway.
const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'fr' // Défaut à 'fr' si pas de locale trouvée
  const nonce = headersList.get('x-nonce')!

  return (
    // suppressHydrationWarning: next-themes swaps the theme class before hydration.
    <html
      className={'dark'}
      lang={locale}
      data-scroll-behavior='smooth'
      suppressHydrationWarning>
      <body className={`${siteFont.className} antialiased *:text-primary`}>
        {/* Server-rendered so crawlers see it; `<` escaped to keep the JSON inert.
            suppressHydrationWarning: browsers hide nonce values from the DOM. */}
        <script
          type='application/ld+json'
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Providers nonce={nonce}>
          <main className='flex min-h-screen w-screen flex-col items-center justify-center'>
            {children}
            <ToastContainer
              toastClassName={`${siteFont.className}`}
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
