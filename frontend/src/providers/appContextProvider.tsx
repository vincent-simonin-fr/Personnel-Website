import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { getDictionaryFromAPI } from 'actions'
import { AppContext } from '../contexts/AppContext'

type AppContextProviderProps = {
  children: ReactNode
  locale: string
}

const AppContextProvider = ({ children, locale }: AppContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocale, setCurrentLocale] = useState(locale)
  const [is404, setIs404] = useState(false)
  const [nonce, setNonce] = useState('')

  const {
    data: dictionary,
    isLoading: isDictionaryLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['dictionary', currentLocale],
    queryFn: () => getDictionaryFromAPI(currentLocale),
    enabled: !!currentLocale,
    staleTime: 1000 * 60 * 60 * 24, // Cache 1 heure
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (locale !== currentLocale) {
      setCurrentLocale(locale)
    }
  }, [locale])
  // Mémoïser les sous-groupes
  const userMemo = useMemo(
    () => ({ user: currentUser, setUser: setCurrentUser }),
    [currentUser],
  )

  const dictionaryMemo = useMemo(
    () => ({
      dictionary: dictionary,
      locale: currentLocale,
      isLoading: isLoading && isDictionaryLoading,
      isError,
      error,
    }),
    [dictionary, currentLocale, isLoading, isDictionaryLoading, isError, error],
  )

  const uiStateMemo = useMemo(
    () => ({
      is404,
      nonce,
      setLoading: setIsLoading,
      setLocale: setCurrentLocale,
      setIs404: setIs404,
    }),
    [is404, nonce],
  )

  // Combination
  const value = useMemo(
    () => ({
      ...userMemo,
      ...dictionaryMemo,
      ...uiStateMemo,
    }),
    [userMemo, dictionaryMemo, uiStateMemo],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContextProvider }
