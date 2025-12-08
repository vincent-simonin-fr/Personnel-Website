import { createContext } from 'react'
import { User } from 'types'

type UserContextProps = {
  user: User
}

const UserContext = createContext<UserContextProps>({
  user: {},
})

export { UserContext }
