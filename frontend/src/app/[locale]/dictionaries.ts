import { cache } from 'react'

export type MenuItem = {
  label: string
  title: string
  to: string
  items?: MenuItem[]
}

export type Dictionary = {
  homePage: {
    title: string
    description: string
    deployButtonLabel: string
    firstScreen: {
      salutation: string
      hook: {
        one: string
        two: string
        three: string
        four: string
        five: string
      }
      firstLine: string
      secondLine: string
    }
    labelButtonToSkills: string
  }
  navigation: MenuItem[]
  notFound: {
    title: string
    subtitle: string
    buttonLabel: string
  }
  presentation: {
    description: string
    services: {
      title: string
      description: string
    }[]
  }
  contactForm: {
    title: string
    firstNameLabel: string
    lastNameLabel: string
    emailLabel: string
    messageLabel: string
    submitButton: string
    resetButton: string
    firstNameError: string
    lastNameError: string
    emailError: string
    messageError: string
    firstNamePlaceholder: string
    lastNamePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    successMessage: string
    errorMessage: string
  }
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('i18n/en-us.json').then((module) => module.default),
  fr: () => import('i18n/fr.json').then((module) => module.default),
  de: () => import('i18n/de.json').then((module) => module.default),
}

export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  return locale == 'fr' ? dictionaries.fr() : locale == 'de' ? dictionaries.de() : dictionaries.en() // Default to English
})
