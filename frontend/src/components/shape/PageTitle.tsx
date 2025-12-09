'use client'

import { useEffect } from 'react'
import { useLocaleContext } from 'hooks/useLocaleContext'

type Props = { pageIndex: number }

export function PageTitle({ pageIndex }: Props) {
  const { dictionary } = useLocaleContext()

  useEffect(() => {
    document.title = dictionary.navigation[pageIndex].title
  }, [pageIndex])

  return (
    <>
      <title>{document.title}</title>
      <meta name='description' content='example description' />
    </>
  )
}
