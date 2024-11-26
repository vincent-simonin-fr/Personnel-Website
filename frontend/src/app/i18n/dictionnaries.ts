export type Dictionary = {
  homePage: {
    deployButtonLabel: string
  }
  notFound: {
    title: string
    subtitle: string
    buttonLabel: string
  }
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('./en-us.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
  de: () => import('./de.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  // const promise  = locale == 'fr' ? dictionaries.fr() : locale == 'de' ? dictionaries.de() : dictionaries.en() // Default to English
  // const dico = await promise
  console.log('getDictionary', locale)
  return locale == 'fr' ? dictionaries.fr() : locale == 'de' ? dictionaries.de() : dictionaries.en() // Default to English
}
