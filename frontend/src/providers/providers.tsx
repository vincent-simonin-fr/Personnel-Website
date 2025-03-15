'use client'

import { HeroUIProvider } from '@heroui/react'
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { AppContextProvider } from '../contexts/AppContext'
import { useRouter } from 'next/navigation'

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

export function Providers({ children }: { children: React.ReactNode }) {
  // L'état qui gère l'initialisation du thème côté client
  const [mounted, setMounted] = useState(false)

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()
  const router = useRouter()

  // Utilisez useEffect pour activer le rendu côté client uniquement
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si le composant n'est pas encore monté, ne pas appliquer le thème pour éviter l'erreur d'hydratation
  if (!mounted) return <div /> // Affiche rien jusqu'à ce que le composant soit monté

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='theme'
            themes={['dark', 'light', 'purple-dark']}>
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </AppContextProvider>
    </QueryClientProvider>
  )
}
