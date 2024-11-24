'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  // L'état qui gère l'initialisation du thème côté client
  const [mounted, setMounted] = useState(false)

  // Utilisez useEffect pour activer le rendu côté client uniquement
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si le composant n'est pas encore monté, ne pas appliquer le thème pour éviter l'erreur d'hydratation
  if (!mounted) return <div /> // Affiche rien jusqu'à ce que le composant soit monté

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark' storageKey='theme'>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}
