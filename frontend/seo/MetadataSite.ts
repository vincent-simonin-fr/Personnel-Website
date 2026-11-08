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
  'Vincent Simonin, full stack software engineer in Dijon, France: business applications in .NET, React, Angular and Azure, from specification to production.'

// Site-wide defaults. Localized title/description/alternates come from [locale]/layout.tsx.
export const MetadataSite: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Vincent Simonin - Full Stack Engineer & Azure Cloud Developer',
  description,
  // What the site actually shows (stack, sector, location), in French and English: the
  // main audience is French. Google ignores this tag; Bing and other engines may read it.
  keywords: [
    'Vincent Simonin',
    'Full Stack Engineer',
    'Ingénieur full stack',
    'Applications métier',
    '.NET',
    'Blazor',
    'React',
    'Angular',
    'Azure',
    'DevOps',
    'DevSecOps',
    'Cloud Architecture',
    'Software Engineering',
    'Web Development',
    'Smart Building',
    'Dijon',
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Vincent Simonin - Full Stack Engineer & Azure Cloud Developer',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Simonin - Full Stack Engineer',
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
  // Brand fuchsia "VS" monogram (files in public/favicons, /favicon.ico for crawlers).
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicons/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicons/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/favicons/apple-touch-icon.png', sizes: '180x180' },
  },
}

const ogLocales: Record<string, string> = {
  fr: 'fr_FR',
  'en-us': 'en_US',
  de: 'de_DE',
}

/** hreflang alternates + canonical for `path` (e.g. '/projects', '' for home). */
export const localeAlternates = (locale: string, path: string) => ({
  canonical: `/${locale}${path}`,
  languages: {
    fr: `/fr${path}`,
    'en-US': `/en-us${path}`,
    de: `/de${path}`,
    'x-default': `/fr${path}`,
  },
})

/** Per-route metadata: localized title, canonical/hreflang, and matching Open Graph. */
export const pageMetadata = (
  locale: string,
  path: string,
  title?: string,
  description?: string,
): Metadata => ({
  ...(title && { title }),
  ...(description && { description }),
  alternates: localeAlternates(locale, path),
  openGraph: {
    ...MetadataSite.openGraph,
    ...(title && { title }),
    ...(description && { description }),
    url: `/${locale}${path}`,
    locale: ogLocales[locale],
  },
})

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: 'Full Stack Engineer & Azure Cloud Developer',
  alumniOf: {
    '@type': 'Organization',
    name: 'DIIAGE',
  },
  // Read by Google (structured data): disciplines, then the stack and domains shown on
  // the projects page.
  knowsAbout: [
    'Software Engineering',
    'Software Architecture',
    'Web Development',
    'Cloud Architecture',
    '.NET',
    'Blazor',
    'React',
    'Angular',
    'Java Spring Boot',
    'PostgreSQL',
    'Microsoft Azure',
    'DevOps',
    'DevSecOps',
    'Continuous Integration and Delivery',
    'Smart Building',
    'Geographic Information Systems',
  ],
  // Same certifications as the home page career section (Microsoft Learn profile).
  hasCredential: [
    'Microsoft Certified: Azure Developer Associate',
    'Microsoft Certified: Azure Fundamentals',
    'Microsoft Certified: Azure AI Fundamentals',
  ].map((name) => ({
    '@type': 'EducationalOccupationalCredential',
    name,
    credentialCategory: 'certification',
    recognizedBy: { '@type': 'Organization', name: 'Microsoft' },
  })),
  description,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
}
