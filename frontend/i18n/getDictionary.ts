import { Dictionary, ILLUSTRATIONS, PHASES, Project } from 'types'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { isLocale, Lang } from './locales'

import fr from './fr.json'
import enus from './en-us.json'
import de from './de.json'

// JSON imports widen string literals to `string`: the union-typed project fields are
// checked here at load time, so a typo fails loudly instead of rendering nothing.
type ProjectJson = Omit<Project, 'phases' | 'illustration'> & {
  phases: string[]
  illustration: string
}
type DictionaryJson = Omit<Dictionary, 'projects'> & {
  projects: Omit<Dictionary['projects'], 'items'> & { items: ProjectJson[] }
}

const oneOf = (values: readonly string[], value: string) => values.includes(value)

const checked = (key: Lang, dictionary: DictionaryJson): Dictionary => {
  // Client code reads the locale from the dictionary (links, switcher).
  if (dictionary.locale !== key)
    throw new Error(`i18n/${key}.json: "locale" must be "${key}"`)
  for (const { id, phases, illustration } of dictionary.projects.items) {
    if (
      !phases.every((p) => oneOf(PHASES, p)) ||
      !oneOf(ILLUSTRATIONS, illustration)
    )
      throw new Error(`i18n/${dictionary.locale}.json: invalid project "${id}"`)
  }
  return dictionary as Dictionary
}

// Record<Lang, …>: a language added to i18n/locales.ts without its dictionary fails to compile.
const dictionaries: Record<Lang, Dictionary> = {
  fr: checked('fr', fr),
  'en-us': checked('en-us', enus),
  de: checked('de', de),
}

// Unknown locale = 404, wherever it is read first: layouts, pages and metadata render in
// parallel, so a single check in the [locale] layout would not stop the others.
// Case: /foo.bar, skipped by the proxy (looks like a file), lands in [locale].
export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  if (!isLocale(locale)) notFound()
  return dictionaries[locale]
})
