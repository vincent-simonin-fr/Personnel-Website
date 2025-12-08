import { ReactNode, useMemo, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { User } from 'types'

type UserContextProviderProps = {
  children: ReactNode
  user: User
}

const UserContextProvider = ({ children, user }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState({})

  const value = useMemo(
    () => ({ user: currentUser, setUser: setCurrentUser }),
    [currentUser],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContextProvider }
