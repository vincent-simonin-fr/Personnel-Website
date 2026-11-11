import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getDictionary } from 'i18n/getDictionary'
import { pageMetadata } from 'seo/MetadataSite'

type Props = { children: ReactNode; params: Promise<{ locale: string }> }

// Metadata in a layout, not in page.tsx: there, its openGraph would replace the parent's
// and drop the og:image of [locale]/opengraph-image (checked on Next 16.4).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const title = dictionary.navigation.find((item) => item.to === '/projects')?.title
  return pageMetadata(locale, '/projects', title, dictionary.projects.intro)
}

const ProjectsLayout = ({ children }: Props) => children

export default ProjectsLayout
