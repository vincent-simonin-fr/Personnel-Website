'use client'

import { lazy } from 'react'
import { siteConfig } from 'site/siteConfig'
import OnScreen from 'components/ui/animations/OnScreen'

// WebGL: loaded and running only while near the viewport (OnScreen).
const MetaBalls = lazy(() => import('components/ui/animations/MetaBalls'))

// Behind the contact card (home CTA and /contact): fuchsia metaballs that follow the
// cursor. Transparent, so it works on both themes. Fills its positioned parent; from lg,
// stops left of the card (28rem wide + 8rem right padding) so the balls center in the
// free space instead of hiding behind it. Reduced motion: hidden, so OnScreen never
// mounts it (no WebGL, no render loop).
const ContactBackdrop = () => (
  <div aria-hidden className='absolute inset-0 motion-reduce:hidden lg:right-144'>
    <OnScreen>
      <MetaBalls
        color={siteConfig.color}
        cursorBallColor={siteConfig.color}
        cursorBallSize={2}
        ballCount={16}
        animationSize={30}
        enableMouseInteraction
        enableTransparency
        hoverSmoothness={0.05}
        clumpFactor={1}
        speed={0.5}
      />
    </OnScreen>
  </div>
)

export default ContactBackdrop
