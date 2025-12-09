// type LabsProps = object

import { PageTitle } from 'components/shape/PageTitle'

const Labs = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  return (
    <>
      <PageTitle pageIndex={2} />
      <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
        Labs : {slug}
      </div>
    </>
  )
}

export default Labs
