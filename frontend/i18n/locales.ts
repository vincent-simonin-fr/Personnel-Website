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

/** Path without its locale prefix. The proxy also serves locale-less URLs (rewrite),
 *  so both forms reach client code: '/de/projects' and '/projects' → '/projects', '/de' → '/'. */
export const stripLocale = (pathname: string) => {
  const [, first, ...rest] = pathname.split('/')
  return isLocale(first) ? `/${rest.join('/')}` : pathname
}

/** Best supported language for an Accept-Language header, e.g. 'de-AT,de;q=0.9,en;q=0.8'.
 *  Exact tag first, then the base language ('en-GB' → 'en-us', 'fr-CA' → 'fr'). */
export const matchLocale = (header: string | null): Lang | undefined => {
  const tags = (header ?? '')
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      return { tag, weight: q ? Number(q.slice(2)) : 1 }
    })
    .filter(({ tag, weight }) => tag && weight > 0)
    .sort((a, b) => b.weight - a.weight)

  const base = (tag: string) => tag.split('-')[0]
  for (const { tag } of tags) {
    const match =
      locales.find((l) => l.key === tag) ??
      locales.find((l) => base(l.key) === base(tag))
    if (match) return match.key
  }
}
