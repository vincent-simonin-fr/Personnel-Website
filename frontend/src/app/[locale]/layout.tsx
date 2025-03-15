import { WebVitals } from 'components/WebVitals'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page of Vincent Simonin, Full Stack Developer & Azure Cloud Expert',
}

const LocaleLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <WebVitals />
      {children}
    </>
  )
}

export default LocaleLayout
