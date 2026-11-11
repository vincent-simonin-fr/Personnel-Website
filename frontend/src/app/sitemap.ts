import { MetadataRoute } from 'next'
import { siteConfig } from 'config/site'
import { locales } from 'i18n/locales'
import { localeAlternates } from 'seo/MetadataSite'

// Every public route; a new one goes here too.
const routes = ['', '/projects', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const absolute = (path: string) => `${siteConfig.url}${path}`

  return routes.flatMap((route) =>
    locales.map(({ key: locale }) => ({
      url: absolute(`/${locale}${route}`),
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(localeAlternates(locale, route).languages).map(
            ([lang, path]) => [lang, absolute(path)],
          ),
        ),
      },
    })),
  )
}
