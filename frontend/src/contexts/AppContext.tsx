import { createContext } from 'react'
import { Dictionary } from 'types'

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
  nonce: string
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  setLocale: (locale: string) => void
  setIs404: (is404: boolean) => void
}

const AppContext = createContext<AppContextProps>({
  user: {},
  locale: 'fr',
  dictionary: undefined,
  isLoading: true,
  isError: false,
  error: null,
  is404: false,
  nonce: '',
  setUser: () => {},
  setLoading: () => {},
  setLocale: () => {},
  setIs404: () => {},
})

export { AppContext }
