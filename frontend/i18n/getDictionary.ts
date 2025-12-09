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

export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  return dictionaries[locale]
})

// export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
//   const dict = await import(`./${locale}.json`)
//   return dict.default
// })
// import fr from './fr.json'
// import enus from './en-us.json'
// import de from './de.json'

// export function getDictionary(locale: string): Dictionary {
//   return dictionaries[locale] ?? dictionaries.fr
// }

// const dictionaries: Record<string, () => Promise<Dictionary>> = {
//   en: () => import('./en-us.json').then((module) => module.default),
//   fr: () => import('./fr.json').then((module) => module.default),
//   de: () => import('./de.json').then((module) => module.default),
// }

// export const getDictionary = (locale: string): Promise<Dictionary> => {
//   return locale == 'fr'
//     ? dictionaries.fr()
//     : locale == 'de'
//       ? dictionaries.de()
//       : dictionaries.en() // Default to English
// }
