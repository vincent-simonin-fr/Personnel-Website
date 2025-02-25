// type LabsProps = object

const Labs = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug
  return (
    <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center'>
      Labs : {slug}
    </div>
  )
}

export default Labs
