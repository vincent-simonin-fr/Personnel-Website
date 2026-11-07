import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getDictionary } from 'i18n/getDictionary'
import { pageMetadata } from 'seo/MetadataSite'

type Props = { children: ReactNode; params: Promise<{ locale: string }> }

// The page is a client component: its metadata lives in this server layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const title = dictionary.navigation.find((item) => item.to === '/projects')?.title
  return pageMetadata(
    locale,
    '/projects',
    title,
    dictionary.presentation.description,
  )
}

const ProjectsLayout = ({ children }: Props) => children

export default ProjectsLayout
