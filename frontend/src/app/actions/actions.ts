'use server'

import { cookies } from 'next/headers'

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
