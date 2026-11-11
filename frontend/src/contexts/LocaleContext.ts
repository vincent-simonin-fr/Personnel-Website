'use client'

import { createContext } from 'react'
import { Dictionary } from 'types'

type LocaleContextProps = {
  dictionary: Dictionary
}

// null outside the provider, so useLocaleContext can fail with a clear message.
const LocaleContext = createContext<LocaleContextProps | null>(null)

export { LocaleContext }
