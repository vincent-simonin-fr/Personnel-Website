import { WebVitals } from 'components/WebVitals'

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
