// Portfolio model: the shape of `projects` in the dictionaries (see Dictionary in types).

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
  'interface',
] as const
export type Illustration = (typeof ILLUSTRATIONS)[number]

export type Project = {
  /** Stable key, e.g. 'ey-placement' (also referenced by homePage.featured.ids). */
  id: string
  client: string
  /** Employer through which the client was served, e.g. 'Kardham Digital' (shown as "Kardham Digital x EY"). */
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
  stack: string[]
}
