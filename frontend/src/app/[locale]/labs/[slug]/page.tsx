import { PageTitle } from 'components/shape/PageTitle'
import { getDictionary } from 'i18n/getDictionary'

type LabProps = { params: Promise<{ locale: string; slug: string }> }

const Lab = async ({ params }: LabProps) => {
  const { locale, slug } = await params
  const dictionary = await getDictionary(locale)
  const labs = dictionary?.navigation.find((item) => item.to === '/labs')
  const lab = labs?.items?.find((item) => item.to === `/labs/${slug}`)

  return (
    <>
      <PageTitle title={lab?.title ?? labs?.title} />
      <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
        Labs : {slug}
      </div>
    </>
  )
}

export default Lab
