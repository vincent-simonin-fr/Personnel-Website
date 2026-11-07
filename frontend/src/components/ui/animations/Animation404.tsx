'use client'

import RivePlayer from 'components/ui/animations/RivePlayer'

export default function Animation404() {
  return (
    <RivePlayer
      src='/animations/cute_monster.riv'
      stateMachines='StateMachine'
      autoplay
      actions={{
        onClick: (rive, inputs) => {
          if (rive && inputs.click) {
            inputs.click.value = true
          }
        },
        onMouseEnter: (rive, inputs) => {
          if (rive) {
            rive.play()
          }
        },
      }}
    />
  )
}
