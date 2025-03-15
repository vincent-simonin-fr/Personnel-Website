import { useQuery } from '@tanstack/react-query'
import { Dictionary, getDictionary } from 'i18n/dictionaries'
import React, { ReactNode, useState } from 'react'

type User = {
  id?: string
  email?: string
  name?: string
}

type AppContextProps = {
  user: User
  locale: string
  dictionary?: Dictionary
  isLoading: boolean
  isError: boolean
  error: Error | null
  is404: boolean
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  setLocale: (locale: string) => void
  setIs404: (is404: boolean) => void
}

const AppContext = React.createContext<AppContextProps>({
  user: {},
  locale: 'en',
  dictionary: undefined,
  isLoading: true,
  isError: false,
  error: null,
  is404: false,
  setUser: () => {},
  setLoading: () => {},
  setLocale: () => {},
  setIs404: () => {},
})

type AppContextProviderProps = {
  children: ReactNode
}

const AppContextProvider = (props: AppContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocale, setCurrentLocale] = useState('en')
  const [is404, setIs404] = useState(false)

  const {
    data: dictionary,
    isLoading: isDictionaryLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['dictionary', currentLocale],
    queryFn: () => getDictionary(currentLocale),
    enabled: !!currentLocale,
  })
  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        locale: currentLocale,
        dictionary: dictionary,
        isLoading: isLoading && isDictionaryLoading,
        isError: isError,
        error: error,
        is404: is404,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        setLocale: setCurrentLocale,
        setIs404: setIs404,
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContextProvider, AppContext }
