import { ReactNode, useMemo, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

type AppContextProviderProps = {
  children: ReactNode
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [is404, setIs404] = useState(false)
  const [nonce, setNonce] = useState('')
  const error = null

  const value = useMemo(
    () => ({
      is404: is404,
      nonce,
      isLoading,
      isError,
      error,
      setLoading: setIsLoading,
      setIs404: setIs404,
    }),
    [is404, nonce],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContextProvider }
