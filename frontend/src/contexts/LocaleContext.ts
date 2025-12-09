'use client'

import { createContext } from 'react'
import { Dictionary } from 'types'

type LocaleContextProps = {
  dictionary: Dictionary
}

const LocaleContext = createContext<LocaleContextProps>({
  dictionary: {} as Dictionary,
})

export { LocaleContext }
