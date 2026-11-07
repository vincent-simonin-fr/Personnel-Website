'use client'

import { HeroUIProvider } from '@heroui/react'
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { useRouter } from 'next/navigation'
import { AppContextProvider } from './AppContextProvider'

// Only if using TypeScript
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

type ProvidersProps = {
  children: React.ReactNode
  /** CSP nonce: next-themes injects an inline script to apply the theme before paint. */
  nonce: string
}

// Renders on the server too: theme-dependent output must use CSS (`dark:`), not
// `useTheme()` during render, or hydration mismatches.
export function Providers({ children, nonce }: ProvidersProps) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider
          attribute='class'
          defaultTheme='dark'
          storageKey='theme'
          nonce={nonce}
          themes={['dark', 'light']}>
          <AppContextProvider>{children}</AppContextProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
