import { PHASES, Phase } from 'types'

type PhaseTimelineProps = {
  phases: Phase[]
  labels: Record<Phase, string>
  /** Prefix of the sentence read by screen readers, e.g. 'Phases couvertes :'. */
  srLabel: string
}

// The dots are visual only: the covered phases are also spelled out for screen
// readers, so the information never relies on color alone.
const PhaseTimeline = ({ phases, labels, srLabel }: PhaseTimelineProps) => (
  <div>
    <ol
      aria-hidden
      className='relative flex before:absolute before:inset-x-1.5 before:top-1.5 before:h-px before:bg-primary-700'>
      {PHASES.map((phase) => {
        const covered = phases.includes(phase)
        return (
          <li
            key={phase}
            className={`relative flex-1 pt-5 text-xs ${covered ? 'text-primary-50' : 'text-primary-300'}`}>
            <span
              className={`absolute top-0 left-0 size-3 rounded-full border-1 ${covered ? 'border-fuchsia-500 bg-fuchsia-500 shadow-[0_0_12px_rgb(225_42_251/0.7)]' : 'border-primary-500 bg-background'}`}
            />
            {labels[phase]}
          </li>
        )
      })}
    </ol>
    <p className='sr-only'>
      {srLabel}{' '}
      {PHASES.filter((p) => phases.includes(p))
        .map((p) => labels[p])
        .join(', ')}
    </p>
  </div>
)

export default PhaseTimeline
