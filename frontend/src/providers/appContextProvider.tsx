import { useQuery } from '@tanstack/react-query'
import { ReactNode, useMemo, useState } from 'react'
import { getDictionaryFromAPI } from 'actions'
import { AppContext } from '../contexts/AppContext'

type AppContextProviderProps = {
  children: ReactNode
  locale: string
}

const AppContextProvider = ({ children, locale }: AppContextProviderProps) => {
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
      ...dictionaryMemo,
      ...uiStateMemo,
    }),
    [dictionaryMemo, uiStateMemo],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContextProvider }
