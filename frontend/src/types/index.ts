export type Lang = 'fr' | 'en-us' | 'de'

export type User = {
  id?: string
  email?: string
  name?: string
}

export type MenuItem = {
  label: string
  title: string
  to: string
  items?: MenuItem[]
}

export type Dictionary = {
  locale: string
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
    contactCta: { text: string; button: string }
    sections: Record<
      'design' | 'agility' | 'development' | 'innovation',
      { title: string; description: string }
    >
  }
  navigation: MenuItem[]
  // Hidden from the menus until the lab pages have content; move back into `navigation` to publish.
  labs: MenuItem
  notFound: {
    title: string
    subtitle: string
    buttonLabel: string
  }
  presentation: {
    introduction: string
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

export type Locale = {
  key: string
  label: string
  country: string
  icon: string
}
