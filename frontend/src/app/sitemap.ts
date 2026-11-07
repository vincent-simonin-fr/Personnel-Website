import { MetadataRoute } from 'next'
import { siteConfig } from 'config/site'
import { locales } from 'i18n/getDictionary'
import { localeAlternates } from 'seo/MetadataSite'

// Published routes only (labs stay out until they have content).
const routes = ['', '/projects', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const absolute = (path: string) => `${siteConfig.url}${path}`

  return routes.flatMap((route) =>
    locales.map((locale) => ({
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
