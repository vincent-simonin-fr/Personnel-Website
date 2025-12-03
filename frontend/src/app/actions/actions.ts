'use server'

import { cookies } from 'next/headers'
import { Dictionary } from 'types'

export async function setLocaleCookie(locale: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('NEXT_LOCALE', locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365, // 1 an en secondes
    path: '/',
  })
}

export async function getDictionaryFromAPI(locale: string): Promise<Dictionary> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/api/dictionaries/${locale}`,
    {
      next: { revalidate: 3600 },
    },
  )
  return response.json()
}
