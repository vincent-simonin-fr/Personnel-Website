import { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'fr_FR',
  url: 'https://www.dev.vincentsimonin.fr',
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
  metadataBase: new URL('https://www.dev.vincentsimonin.fr'),
  title: 'Vincent Simonin - Full Stack Developer & Azure Cloud Expert',
  description:
    'Discover Vincent Simonin, a Full Stack and Cloud Azure expert, specializing in modern, scalable web applications. Explore his innovative design and development methods.',
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
      'Discover Vincent Simonin, a Full Stack and Cloud Azure expert, specializing in modern, scalable web applications. Explore his innovative design and development methods.',
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
    canonical: 'https://www.dev.vincentsimonin.fr/fr',
    languages: {
      'en-US': 'https://www.dev.vincentsimonin.fr/en-US',
      fr: 'https://www.dev.vincentsimonin.fr/fr',
      de: 'https://www.dev.vincentsimonin.fr/de',
    },
  },
  // verification: {
  //   // TODO: Add your Google site verification code here
  //   // google: 'your-google-site-verification',
  // },
  authors: [
    {
      name: 'Vincent Simonin',
      url: 'https://www.dev.vincentsimonin.fr',
    },
  ],
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincent Simonin',
  url: 'https://www.dev.vincentsimonin.fr',
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
  description:
    'Discover Vincent Simonin, a Full Stack and Cloud Azure expert, specializing in modern, scalable web applications. Explore his innovative design and development methods.',
  sameAs: ['https://github.com/vincent-simonin-fr', 'https://www.linkedin.com/in/vincentsimonin'],
  worksFor: {
    '@type': 'Organization',
    name: 'Best Company',
    url: 'https://microsoft.com',
  },
}
