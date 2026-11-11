import type { Metadata } from 'next'
import { WebVitals } from 'components/layout/WebVitals'
import { ReactNode } from 'react'
import SiteShell from 'components/layout/SiteShell'
import { getDictionary } from 'i18n/getDictionary'
import { locales } from 'i18n/locales'
import { MetadataSite, pageMetadata, ViewportSite } from 'seo/MetadataSite'
import { siteConfig } from 'site/siteConfig'

export const viewport = ViewportSite

// Root layout (no app/layout.tsx): <html lang> comes from the URL, known at build time,
// so every page is prerendered. Reading request headers here would make them dynamic.
export async function generateStaticParams() {
  return locales.map(({ key }) => ({ locale: key }))
}

// Only prerendered params exist, here and in child segments: any other URL (e.g. a
// missing /photo.png, which the proxy doesn't rewrite) gets global-not-found.tsx.
export const dynamicParams = false

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

// Site defaults + home page metadata for this locale. Spread, not nested: Next merges
// metadata key by key (openGraph replaced as a whole), as when the defaults lived in a
// parent layout.
export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const { title, description } = dictionary.homePage

  return {
    ...MetadataSite,
    ...pageMetadata(locale, '', title, description),
    // Localized: the French title carries "Développeur", what French visitors search.
    title: { default: title, template: `%s | ${siteConfig.name}` },
  }
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const locale = (await params).locale
  const dictionary = await getDictionary(locale)

  return (
    <SiteShell locale={locale} dictionary={dictionary}>
      {/* <WebVitals /> */}
      {children}
    </SiteShell>
  )
}

export default LocaleLayout
