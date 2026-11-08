import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vincent Simonin',
    short_name: 'VS',
    description:
      'Personal website of Vincent Simonin, Software Engineer & Azure Cloud Developer',
    start_url: '/',
    display: 'standalone',
    // W3C app categories (store listing), not keywords.
    categories: ['business'],
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/favicons/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
