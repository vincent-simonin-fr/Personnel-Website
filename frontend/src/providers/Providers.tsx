'use client'

import { RouterProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { useRouter } from 'next/navigation'
import { AppContextProvider } from './AppContextProvider'

// Only if using TypeScript
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

type ProvidersProps = {
  children: React.ReactNode
}

// No TanStack Query provider: no query exists, and it shipped its runtime on every page.
// Add QueryClientProvider back here when the first server-data fetch is introduced.
// Renders on the server too: theme-dependent output must use CSS (`dark:`), not
// `useTheme()` during render, or hydration mismatches.
export function Providers({ children }: ProvidersProps) {
  const router = useRouter()

  return (
    <>
      {/* HeroUI v3 has no provider; RouterProvider (React Aria) makes `href` on its
          links and menu items navigate with the Next router instead of a full reload. */}
      <RouterProvider navigate={router.push}>
        <NextThemesProvider
          attribute='class'
          defaultTheme='dark'
          storageKey='theme'
          themes={['dark', 'light']}>
          <AppContextProvider>{children}</AppContextProvider>
        </NextThemesProvider>
      </RouterProvider>
    </>
  )
}
