import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vincent Simonin',
    short_name: 'VS',
    description: 'Personal website of Vincent Simonin, Software Engineer & Azure Cloud Developer',
    start_url: 'https://www.dev.vincentsimonin.fr/',
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
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/favicons/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
