import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getDictionary } from 'i18n/getDictionary'
import { pageMetadata } from 'seo/MetadataSite'
import { siteConfig } from 'config/site'

type Props = { children: ReactNode; params: Promise<{ locale: string }> }

// Labs are unpublished placeholders (hidden from nav and sitemap): keep them out of search.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return {
    ...pageMetadata(locale, '/labs', dictionary.labs.title),
    // Object form: a plain string here would drop the template for /labs/[slug].
    title: { default: dictionary.labs.title, template: `%s | ${siteConfig.name}` },
    robots: { index: false, follow: true },
  }
}

const LabsLayout = ({ children }: Props) => children

export default LabsLayout
