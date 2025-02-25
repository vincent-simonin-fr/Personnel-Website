import { useQuery } from '@tanstack/react-query'
import { Dictionary, getDictionary } from 'i18n/dictionaries'
import React, { ReactNode, useState } from 'react'

type GlobalContextProps = {
  user: any
  locale: string
  dictionary?: Dictionary
  isLoading: boolean
  isError: boolean
  error: Error | null
  setUser: (user: any) => void
  setLoading: (loading: boolean) => void
  setLocale: (locale: string) => void
}

const GlobalContext = React.createContext<GlobalContextProps>({
  user: {},
  locale: 'en',
  dictionary: undefined,
  isLoading: true,
  isError: false,
  error: null,
  setUser: () => {},
  setLoading: () => {},
  setLocale: () => {},
})

type GlobalContextProviderProps = {
  children: ReactNode
}

const GlobalContextProvider = (props: GlobalContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocale, setCurrentLocale] = useState('en')

  const {
    data: dict,
    isLoading: isDictionaryLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['dictionary', currentLocale],
    queryFn: () => getDictionary(currentLocale),
    enabled: !!currentLocale,
  })
  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        locale: currentLocale,
        dictionary: dict,
        isLoading: isLoading && isDictionaryLoading,
        isError: isError,
        error: error,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        setLocale: setCurrentLocale,
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export { GlobalContextProvider, GlobalContext }
