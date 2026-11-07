'use client'

import {
  RuntimeLoader,
  useRive,
  useStateMachineInput,
  type Rive,
  type StateMachineInput,
} from '@rive-app/react-canvas'
import { useEffect } from 'react'
import { useIntersectionObserver, useMediaQuery } from 'usehooks-ts'

// Absolute URL (a relative one resolves against the locale path). The file is copied
// from node_modules on install so it always matches the runtime version.
RuntimeLoader.setWasmUrl('/rive/rive.wasm')

export type RiveInputs = Record<'click' | 'enter' | 'exit', StateMachineInput | null>
type RiveAction = (rive: Rive | null, inputs: RiveInputs) => void

export type RiveCanvasProps = {
  src: string
  stateMachines: string
  autoplay?: boolean
  /** Viewport margin used to fire the `enter`/`exit` inputs. */
  rootMargin?: string
  actions?: {
    onMouseEnter?: RiveAction
    onMouseLeave?: RiveAction
    onClick?: RiveAction
  }
}

// Loaded on demand by RivePlayer: never import this file directly.
const RiveCanvas = ({
  src,
  stateMachines,
  autoplay = false,
  rootMargin = '-10%',
  actions = {},
}: RiveCanvasProps) => {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  // useRive already pauses rendering while the canvas is off-screen.
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines,
    autoplay: autoplay && !reduceMotion,
  })
  const { ref, isIntersecting } = useIntersectionObserver({ rootMargin })

  // Hooks must run unconditionally; inputs without a matching action stay null.
  const click = useStateMachineInput(rive, stateMachines, 'click')
  const enter = useStateMachineInput(rive, stateMachines, 'enter')
  const exit = useStateMachineInput(rive, stateMachines, 'exit')
  const inputs: RiveInputs = {
    click: actions.onClick ? click : null,
    enter: actions.onMouseEnter ? enter : null,
    exit: actions.onMouseLeave ? exit : null,
  }

  // Déclencher l'animation quand l'élément entre dans la vue
  // eslint-disable-next-line react-hooks/immutability -- Rive inputs are imperative handles: setting `.value` is the API
  useEffect(() => {
    if (!inputs.enter || !inputs.exit) return
    inputs.exit.value = !isIntersecting
    inputs.enter.value = isIntersecting
  }, [isIntersecting, inputs.enter, inputs.exit])

  return (
    <div ref={ref} className='relative mx-auto w-full'>
      <RiveComponent
        width={240}
        height={240}
        className='aspect-[1/1] h-full w-full object-contain'
        {...(actions.onMouseEnter && {
          onMouseEnter: () => actions.onMouseEnter?.(rive, inputs),
        })}
        {...(actions.onMouseLeave && {
          onMouseLeave: () => actions.onMouseLeave?.(rive, inputs),
        })}
        {...(actions.onClick && {
          onClick: () => actions.onClick?.(rive, inputs),
        })}
      />
    </div>
  )
}

export default RiveCanvas
