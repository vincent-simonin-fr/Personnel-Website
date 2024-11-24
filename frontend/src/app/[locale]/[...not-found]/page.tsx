import BouncingHand from 'components/BouncingHand'
import '../../globals.css'
import Link from 'next/link'
import { Dictionary, getDictionary } from '../../i18n/dictionnaries'

const NotFound = async ({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>) => {
  const { locale } = await params
  const dict: Dictionary = await getDictionary(locale ?? 'en-US')

  return (
    <div className='fetch flex h-[calc(100vh-72px)] flex-col items-center justify-center'>
      <h1 className='text-balance text-center text-4xl font-bold'>{dict?.notFound.title}</h1>
      <p className='text-balance text-center text-2xl'>{dict?.notFound.subtitle}</p>
      <Link className='text mt-10 text-xl hover:underline hover:opacity-[0.7]' href='/'>
        {dict?.notFound.buttonLabel} <BouncingHand />
      </Link>
    </div>
  )
}
export default NotFound
