import { siteConfig } from 'config/site'
import { MetadataRoute } from 'next'

// let Items = Array.from({ length: 10 }, (_v,i) => ({   url: `${SITE_URL}/read/${i+1}`, lastModified: new Date() }));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/labs`,
      lastModified: new Date(),
    },
  ]
}
