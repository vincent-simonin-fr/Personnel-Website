import { StateMachineInput, useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

type Inputs = {
  click: StateMachineInput | null
  enter: StateMachineInput | null
  exit: StateMachineInput | null
}

type RivePlayerProps = {
  src: string
  stateMachines: string
  autoplay?: boolean
  rootMargin?: string
  actions?: {
    onMouseEnter?: (rive: any, inputs: Record<string, any>) => void
    onMouseLeave?: (rive: any, inputs: Record<string, any>) => void
    onClick?: (rive: any, inputs: Record<string, any>) => void
  }
}

const RivePlayer = ({
  src,
  stateMachines,
  autoplay = false,
  rootMargin = '-10%',
  actions = {},
}: RivePlayerProps) => {
  const { rive, RiveComponent } = useRive({
    src: src,
    stateMachines: stateMachines,
    autoplay: autoplay,
  })
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    rootMargin: rootMargin,
  })

  const configureStateMachine = (): Inputs => {
    const inputs: Inputs = {
      click: null,
      enter: null,
      exit: null,
    }
    if (actions.onClick) inputs.click = useStateMachineInput(rive, stateMachines, 'click')
    if (actions.onMouseEnter) inputs.enter = useStateMachineInput(rive, stateMachines, 'enter')
    if (actions.onMouseLeave) inputs.exit = useStateMachineInput(rive, stateMachines, 'exit')

    return inputs
  }

  const inputs: Inputs = configureStateMachine()

  // Déclencher l'animation quand l'élément entre dans la vue
  useEffect(() => {
    if (isIntersecting && inputs.enter && inputs.exit) {
      inputs.exit.value = false
      inputs.enter.value = true
    } else if (!isIntersecting && inputs.enter && inputs.exit) {
      inputs.exit.value = true
      inputs.enter.value = false
    }
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

export default RivePlayer
