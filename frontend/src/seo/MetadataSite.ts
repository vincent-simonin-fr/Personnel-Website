import { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'fr_FR',
  url: 'https://vincent-simonin.com',
  siteName: 'Vincent Simonin',
  images: [
    {
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Vincent Simonin - Full Stack Developer',
    },
  ],
}

export const MetadataSite: Metadata = {
  metadataBase: new URL('https://vincent-simonin.com'),
  title: {
    default: 'Vincent Simonin - Full Stack Developer & Azure Cloud Expert',
    template: '%s | Vincent Simonin',
  },
  description:
    "Expert en développement Full Stack et Cloud Azure, spécialisé dans la création d'applications web modernes et évolutives.",
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
  creator: 'Vincent Simonin',
  openGraph: {
    ...defaultOpenGraph,
    title: 'Vincent Simonin - Full Stack Developer & Azure Cloud Expert',
    description:
      "Expert en développement Full Stack et Cloud Azure, spécialisé dans la création d'applications web modernes et évolutives.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincent Simonin - Full Stack Developer',
    description: 'Expert en développement Full Stack et Cloud Azure',
    images: ['/images/twitter-image.jpg'],
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
  alternates: {
    canonical: 'https://vincent-simonin.com',
    languages: {
      'en-US': 'https://vincent-simonin.com/en-US',
      fr: 'https://vincent-simonin.com/fr',
      de: 'https://vincent-simonin.com/de',
    },
  },
  verification: {
    // TODO: Add your Google site verification code here
    google: 'your-google-site-verification',
  },
  authors: [
    {
      name: 'Vincent Simonin',
      url: 'https://vincent-simonin.com',
    },
  ],
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincent Simonin',
  url: 'https://vincent-simonin.com',
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
  image: 'https://vincent-simonin.com/images/profile.jpg',
  description: 'Full Stack Developer & Azure Cloud Expert',
  sameAs: ['https://github.com/vincent-simonin-fr', 'https://www.linkedin.com/in/vincentsimonin'],
  worksFor: {
    '@type': 'Organization',
    name: 'Best Company',
    url: 'https://microsoft.com',
  },
}
