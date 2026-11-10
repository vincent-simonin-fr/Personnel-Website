// Single list of supported languages, read by the proxy, routes, switcher and SEO.
// No dictionary import here: the proxy and client components load this file.

/** The first one is the default (locale-less URLs, x-default). */
export const locales = [
  { key: 'fr', label: 'Français', hreflang: 'fr', og: 'fr_FR' },
  { key: 'en-us', label: 'English', hreflang: 'en-US', og: 'en_US' },
  { key: 'de', label: 'Deutsch', hreflang: 'de', og: 'de_DE' },
] as const

export type Lang = (typeof locales)[number]['key']

export const defaultLocale: Lang = locales[0].key

export const isLocale = (value: string): value is Lang =>
  locales.some((l) => l.key === value)
