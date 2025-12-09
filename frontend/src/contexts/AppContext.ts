import { createContext } from 'react'
import { Dictionary } from 'types'

type AppContextProps = {
  isLoading: boolean
  isError: boolean
  error: Error | null
  is404: boolean
  nonce: string
  setLoading: (loading: boolean) => void
  setIs404: (is404: boolean) => void
}

const AppContext = createContext<AppContextProps>({
  isLoading: true,
  isError: false,
  error: null,
  is404: false,
  nonce: '',
  setLoading: () => {},
  setIs404: () => {},
})

export { AppContext }
