import React, { ReactNode, useState } from 'react'

type GlobalContextProps = {
  user: any
  loading: boolean
  locale: string
  DarkMode: boolean
  setUser: (user: any) => void
  setLoading: (loading: boolean) => void
  setLocale: (locale: string) => void
  setDarkMode: (isDarkMode: boolean) => void
}

const GlobalContext = React.createContext<GlobalContextProps>({
  user: {},
  loading: true,
  locale: 'en',
  DarkMode: true,
  setUser: () => {},
  setLoading: () => {},
  setLocale: () => {},
  setDarkMode: () => {},
})

type GlobalContextProviderProps = {
  children: ReactNode
}

// https://atakansava.medium.com/using-react-context-with-nextjs-288bde71f807
const GlobalContextProvider = (props: GlobalContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocale, setCurrentLocale] = useState('en')
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        locale: currentLocale,
        DarkMode: isDarkMode,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        setLocale: setCurrentLocale,
        setDarkMode: setIsDarkMode,
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export { GlobalContextProvider, GlobalContext }
