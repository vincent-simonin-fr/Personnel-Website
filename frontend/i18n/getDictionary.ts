import { Dictionary } from 'types'
import { cache } from 'react'

import fr from './fr.json'
import enus from './en-us.json'
import de from './de.json'

const dictionaries: Record<string, Dictionary> = {
  fr,
  'en-us': enus,
  de,
}

/** Supported locales; the first one is the default. */
export const locales = Object.keys(dictionaries)

export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  return dictionaries[locale]
})
