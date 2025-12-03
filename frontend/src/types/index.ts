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
