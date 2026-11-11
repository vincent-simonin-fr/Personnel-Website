import type { Metadata } from 'next'
import { getDictionary } from 'i18n/getDictionary'
import { pageMetadata } from 'seo/MetadataSite'

type LabProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: LabProps): Promise<Metadata> {
  const { locale, slug } = await params
  const { labs, homePage } = await getDictionary(locale)
  const lab = labs.items?.find((item) => item.to === `/labs/${slug}`)
  return {
    ...pageMetadata(
      locale,
      `/labs/${slug}`,
      lab?.title ?? labs.title,
      homePage.description,
    ),
    robots: { index: false, follow: true },
  }
}

const Lab = async ({ params }: LabProps) => {
  const { slug } = await params

  return (
    <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
      Labs : {slug}
    </div>
  )
}

export default Lab
