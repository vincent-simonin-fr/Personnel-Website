'use client'

type ErrorProps = {
  error: Error
}

const IsErrorComponent = ({ error }: ErrorProps) => {
  return (
    <div className='grid min-h-[calc(100vh-60px)] grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      Error: {error.message}
    </div>
  )
}

export default IsErrorComponent
