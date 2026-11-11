'use client'

import { createContext, ReactNode, useContext } from 'react'
import { Dictionary } from 'i18n/dictionary.types'

type LocaleContextProps = {
  dictionary: Dictionary
}

// null outside the provider, so useLocaleContext can fail with a clear message.
const LocaleContext = createContext<LocaleContextProps | null>(null)

type LocaleContextProviderProps = {
  children: ReactNode
  dictionary: Dictionary
}

// The [locale] layout's dictionary, for client components (server ones call getDictionary).
const LocaleContextProvider = ({
  children,
  dictionary,
}: LocaleContextProviderProps) => {
  const value = { dictionary }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

const useLocaleContext = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleContextProvider')
  }
  return context
}

export { LocaleContextProvider, useLocaleContext }
