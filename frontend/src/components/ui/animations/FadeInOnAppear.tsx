import { ReactNode } from 'react'

type FadeInOnAppearProps = {
  children: ReactNode
}

// CSS entrance animation: starts at first paint, no JS, and the content stays in the
// layout. Was a react-spring transition starting from `display: none` until hydration:
// the hero was out of the layout (CLS 0.16 on desktop) and painted late (LCP).
const FadeInOnAppear = ({ children }: FadeInOnAppearProps) => (
  <div className='animate-fade-in-up motion-reduce:animate-none'>{children}</div>
)

export default FadeInOnAppear
