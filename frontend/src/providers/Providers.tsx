'use client'

import { RouterProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { useRouter } from 'next/navigation'

// Only if using TypeScript
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

type ProvidersProps = {
  children: React.ReactNode
}

// No TanStack Query: no query existed and it shipped its runtime on every page (package
// removed 2026-11-11). Reinstall it and add QueryClientProvider here with the first one.
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
          {children}
        </NextThemesProvider>
      </RouterProvider>
    </>
  )
}
