import { MetadataRoute } from 'next'
import { siteConfig } from 'site/siteConfig'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
