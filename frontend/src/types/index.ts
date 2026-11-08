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

/** Project lifecycle, in order: shown as a timeline on every project sheet. */
export const PHASES = ['specify', 'design', 'build', 'ship', 'maintain'] as const
export type Phase = (typeof PHASES)[number]

/** Abstract SVG drawn instead of screenshots (client projects are confidential). */
export const ILLUSTRATIONS = [
  'floorplan',
  'schedule',
  'devices',
  'roads',
  'layers',
] as const
export type Illustration = (typeof ILLUSTRATIONS)[number]

export type Project = {
  /** Stable key, e.g. 'ey-placement' (also referenced by homePage.featured.ids). */
  id: string
  client: string
  /** Employer through which the client was served, e.g. 'Kardham Digital'. */
  via?: string
  period: string
  /** Localized badge, e.g. 'En cours'. */
  status?: string
  title: string
  summary: string
  role: string
  phases: Phase[]
  stack: string[]
  illustration: Illustration
}

export type OtherProject = {
  client: string
  period: string
  title: string
  description: string
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
  /** Short label of each lifecycle phase. */
  phases: Record<Phase, string>
  projects: {
    title: string
    intro: string
    roleLabel: string
    viaLabel: string
    /** Prefix of the screen-reader sentence listing the covered phases. */
    phasesLabel: string
    items: Project[]
    othersTitle: string
    others: OtherProject[]
    servicesTitle: string
  }
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
