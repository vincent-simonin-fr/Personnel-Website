export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Vincent Simonin',
  url: 'https://www.dev.vincentsimonin.fr',
  description: 'Personal website of Vincent Simonin',
  links: {
    github: 'https://github.com/vincent-simonin-fr',
    linkedin: 'https://www.linkedin.com/in/vincentsimonin',
    email: 'mailto:vincent.simonin@hotmail.com',
  },
  authors: [{ name: 'Vincent Simonin', url: 'https://www.dev.vincentsimonin.fr' }],
  color: {
    hex: '#c026d3',
    tailwind: {
      text: 'text-fuchsia-600',
      ring: 'ring-fuchsia-600',
    },
  },
}
