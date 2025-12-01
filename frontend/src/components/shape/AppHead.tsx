'use client'

import NextLink from 'next/link'
import { Button, Disclosure, Link, Surface } from '@heroui/react'

export function AppHead() {
  return (
    <Surface className='supports-backdrop-filter:bg-background/70 sticky top-0 z-50 border-b backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4'>
        {/* Brand */}
        <NextLink href='/' className='inline-flex items-center gap-2 font-semibold'>
          <span className='bg-foreground/10 size-6 rounded' />
          <span>MyApp</span>
        </NextLink>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 md:flex'>
          <NextLink href='/features' className='inline-flex'>
            <Link>Features</Link>
          </NextLink>
          <NextLink href='/pricing' className='inline-flex'>
            <Link>Pricing</Link>
          </NextLink>
          <NextLink href='/docs' className='inline-flex'>
            <Link>Docs</Link>
          </NextLink>
        </nav>

        {/* Desktop actions */}
        <div className='hidden items-center gap-2 md:flex'>
          <NextLink href='/login' className='inline-flex'>
            <Button variant='secondary'>Se connecter</Button>
          </NextLink>
          <NextLink href='/signup' className='inline-flex'>
            <Button>Créer un compte</Button>
          </NextLink>
        </div>

        {/* Mobile menu */}
        <div className='md:hidden'>
          <Disclosure>
            <Disclosure.Heading>
              <Disclosure.Trigger
                aria-label='Ouvrir le menu'
                className='inline-flex items-center gap-2 rounded-xl border px-3 py-2'>
                Menu
                <Disclosure.Indicator />
              </Disclosure.Trigger>
            </Disclosure.Heading>

            <Disclosure.Content className='bg-background absolute top-16 right-0 left-0 border-b'>
              <div className='mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4'>
                <NextLink href='/features' className='inline-flex'>
                  <Link>Features</Link>
                </NextLink>
                <NextLink href='/pricing' className='inline-flex'>
                  <Link>Pricing</Link>
                </NextLink>
                <NextLink href='/docs' className='inline-flex'>
                  <Link>Docs</Link>
                </NextLink>

                <div className='mt-2 flex gap-2'>
                  <NextLink href='/login' className='inline-flex flex-1'>
                    <Button fullWidth variant='secondary'>
                      Se connecter
                    </Button>
                  </NextLink>
                  <NextLink href='/signup' className='inline-flex flex-1'>
                    <Button fullWidth>Créer un compte</Button>
                  </NextLink>
                </div>
              </div>
            </Disclosure.Content>
          </Disclosure>
        </div>
      </div>
    </Surface>
  )
}
