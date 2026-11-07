import { PageTitle } from 'components/shape/PageTitle'
import { getDictionary } from 'i18n/getDictionary'

type LabProps = { params: Promise<{ locale: string; slug: string }> }

const Lab = async ({ params }: LabProps) => {
  const { locale, slug } = await params
  const { labs } = await getDictionary(locale)
  const lab = labs.items?.find((item) => item.to === `/labs/${slug}`)

  return (
    <>
      <PageTitle title={lab?.title ?? labs.title} />
      <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
        Labs : {slug}
      </div>
    </>
  )
}

export default Lab
