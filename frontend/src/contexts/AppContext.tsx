import { createContext } from 'react'
import { Dictionary } from 'types'

type AppContextProps = {
  locale: string
  dictionary?: Dictionary
  isLoading: boolean
  isError: boolean
  error: Error | null
  is404: boolean
  nonce: string
  setLoading: (loading: boolean) => void
  setLocale: (locale: string) => void
  setIs404: (is404: boolean) => void
}

const AppContext = createContext<AppContextProps>({
  locale: 'fr',
  dictionary: undefined,
  isLoading: true,
  isError: false,
  error: null,
  is404: false,
  nonce: '',
  setLoading: () => {},
  setLocale: () => {},
  setIs404: () => {},
})

export { AppContext }
