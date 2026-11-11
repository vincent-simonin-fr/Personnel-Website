import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getDictionary } from 'i18n/getDictionary'
import { pageMetadata } from 'seo/MetadataSite'

type Props = { children: ReactNode; params: Promise<{ locale: string }> }

// The page is a client component: its metadata lives in this server layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  return pageMetadata(
    locale,
    '/contact',
    dictionary.contactForm.title,
    dictionary.homePage.description,
  )
}

const ContactLayout = ({ children }: Props) => children

export default ContactLayout
