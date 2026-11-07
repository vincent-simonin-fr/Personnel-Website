'use client'

import { useEffect } from 'react'

type PageTitleProps = { title?: string }

export function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])

  return null
}
