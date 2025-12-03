import { NextResponse } from 'next/server'
import { cache } from 'react'
import { Dictionary } from 'types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  // Récupérer la locale depuis les params
  const locale = (await params).locale

  // Charger le dictionnaire
  const dictionary = await getDictionary(locale)

  // Retourner avec headers de cache ISR
  return NextResponse.json(dictionary, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('i18n/en-us.json').then((module) => module.default),
  fr: () => import('i18n/fr.json').then((module) => module.default),
  de: () => import('i18n/de.json').then((module) => module.default),
}

const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  return locale == 'fr'
    ? dictionaries.fr()
    : locale == 'de'
      ? dictionaries.de()
      : dictionaries.en() // Default to English
})
