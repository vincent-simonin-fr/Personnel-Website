'use client'

import { ReactNode } from 'react'
import { Dictionary } from 'types'
import { LocaleContext } from '../contexts/LocaleContext'

type LocaleContextProviderProps = {
  children: ReactNode
  dictionary: Dictionary
}

const LocaleContextProvider = ({
  children,
  dictionary,
}: LocaleContextProviderProps) => {
  const value = { dictionary }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export { LocaleContextProvider }
