import { siteConfig } from 'config/site'
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vincent Simonin',
    short_name: 'VS',
    description: 'Personal website of Vincent Simonin, Software Engineer & Azure Cloud Developer',
    start_url: siteConfig.url,
    display: 'standalone',
    categories: [
      'Full Stack Developer',
      'Azure Cloud Developer',
      'DevSecOps',
      'React.js',
      '.NET',
      'Web Development',
      'Cloud Architecture',
      'Software Engineering',
    ],
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicons/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
