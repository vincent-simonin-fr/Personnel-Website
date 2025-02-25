import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkmode: 'class',
  plugins: [
    heroui({
      layout: {
        disabledOpacity: '0.3', // opacity-[0.3]
        radius: {
          small: '2px', // rounded-small
          medium: '4px', // rounded-medium
          large: '6px', // rounded-large
        },
        borderWidth: {
          small: '1px', // border-small
          medium: '1px', // border-medium
          large: '2px', // border-large
        },
      },
      themes: {
        // example for custom theme
        // add purple-dark to nextthemeprovider
        // add setTheme('purple-dark') to display the theme
        'purple-dark': {
          // extend: 'dark', // <- inherit default values from dark theme
          colors: {
            background: '#0D001A',
            foreground: '#C9A9E9',
            primary: {
              50: '#3B096C',
              100: '#520F83',
              200: '#7318A2',
              300: '#9823C2',
              400: '#c031e2',
              500: '#DD62ED',
              600: '#F182F6',
              700: '#FCADF9',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#DD62ED',
              foreground: '#C9A9E9',
            },
            focus: '#F182F6',
          },
        },
        dark: {
          // extend: 'dark', // <- inherit default values from dark theme
          colors: {
            background: '#0a0a0a',
            foreground: '#ededed',
            primary: {
              50: '#0f172a', // '#f8fafc',
              100: '#1e293b', // '#f1f5f9',
              200: '#334155', // '#e2e8f0',
              300: '#475569', // '#cbd5e1',
              400: '#64748b', // '#94a3b8',
              500: '#94a3b8', // '#64748b',
              600: '#cbd5e1', // '#475569',
              700: '#e2e8f0', // '#334155',
              800: '#f1f5f9', // '#1e293b',
              900: '#f8fafc', // '#0f172a',
              DEFAULT: '#94a3b8',
              foreground: '#ededed',
            },
            focus: '#F182F6',
          },
        },
      },
    }),
  ],
} satisfies Config
