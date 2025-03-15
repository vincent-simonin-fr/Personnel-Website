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
  en: () => import('./en-us.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
  de: () => import('./de.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  // const promise  = locale == 'fr' ? dictionaries.fr() : locale == 'de' ? dictionaries.de() : dictionaries.en() // Default to English
  // const dico = await promise
  return locale == 'fr' ? dictionaries.fr() : locale == 'de' ? dictionaries.de() : dictionaries.en() // Default to English
}
