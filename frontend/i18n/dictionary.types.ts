import type { OtherProject, Phase, Project } from 'components/projects/project.types'

export type MenuItem = {
  label: string
  title: string
  to: string
  items?: MenuItem[]
}

export type Dictionary = {
  locale: string
  homePage: {
    /** Home <title> and og:title (≤ 60 chars, starts with the name). */
    title: string
    description: string
    deployButtonLabel: string
    firstScreen: {
      salutation: string
      /** h1: before + accent (fuchsia) + after. */
      hook: { before: string; accent: string; after: string }
      subline: string
    }
    labelButtonToSkills: string
    /** Client and employer names, shown as text (no logos: usage rights unchecked). */
    references: { title: string; names: string[] }
    /** Home teaser of the projects page: `ids` are `projects.items[].id`. */
    featured: { kicker: string; ids: string[]; allProjects: string }
    /** IT career only (nothing before 2020). */
    career: {
      kicker: string
      title: string
      text: string
      items: { year: string; title: string; detail: string }[]
      certifications: string
    }
    contactCta: { text: string; button: string }
    /** "How I work": the 5 phases, each backed by a real project. */
    method: {
      kicker: string
      title: string
      proofLabel: string
      steps: Record<Phase, { title: string; text: string; proof: string }>
    }
  }
  navigation: MenuItem[]
  /** Short label of each lifecycle phase. */
  phases: Record<Phase, string>
  projects: {
    title: string
    intro: string
    roleLabel: string
    /** Prefix of the screen-reader sentence listing the covered phases. */
    phasesLabel: string
    items: Project[]
    othersTitle: string
    others: OtherProject[]
  }
  /** Screen-reader names of icon-only controls and landmarks (never shown). */
  a11y: {
    mainNav: string
    openMenu: string
    closeMenu: string
    openLanguageMenu: string
    languageMenu: string
    scrollToTop: string
    /** Theme button: names the theme it switches to. */
    lightTheme: string
    darkTheme: string
    github: string
    linkedin: string
    email: string
    /** Toast region; Alt+T is react-toastify's shortcut to reach it. */
    notifications: string
  }
  notFound: {
    /** The page's h1, for screen readers only (the scene shows the 404). */
    tagline: string
    buttonLabel: string
    /** Sprayed on the wall behind the scene, one sentence per side (2 items). */
    quote: string[]
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
