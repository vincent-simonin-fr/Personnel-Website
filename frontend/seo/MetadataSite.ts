import { Metadata, Viewport } from 'next'
import { siteConfig } from 'config/site'

export const ViewportSite: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark',
  viewportFit: 'cover',
}

const description =
  'Discover Vincent Simonin, a Full Stack and Cloud Azure expert, specializing in modern, scalable web applications. Explore his innovative design and development methods.'

// Site-wide defaults. Localized title/description/alternates come from [locale]/layout.tsx.
export const MetadataSite: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Vincent Simonin - Full Stack Developer & Azure Cloud Expert',
  description,
  keywords: [
    'Full Stack Developer',
    'Azure Cloud',
    'DevSecOps',
    'React.js',
    '.NET',
    'Web Development',
    'Cloud Architecture',
    'Software Engineering',
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Vincent Simonin - Full Stack Developer & Azure Cloud Expert',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Simonin - Full Stack Developer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: siteConfig.authors,
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: 'Full Stack Developer & Azure Cloud Expert',
  alumniOf: {
    '@type': 'Organization',
    name: 'DIIAGE',
  },
  knowsAbout: [
    'Web Development',
    'Cloud Architecture',
    'DevSecOps',
    'Software Engineering',
    'Software Architecture',
    'JavaScript',
    'TypeScript',
    'React',
    '.Net platform',
  ],
  description,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
}
