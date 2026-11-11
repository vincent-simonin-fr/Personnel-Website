import { PHASES, Phase } from './project.types'

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
    {/* Wraps instead of fixed columns: long labels (de: Industrialisieren) never overlap. */}
    <ol aria-hidden className='flex flex-wrap gap-x-4 gap-y-2'>
      {PHASES.map((phase) => {
        const covered = phases.includes(phase)
        return (
          <li
            key={phase}
            className={`flex items-center gap-1.5 text-xs ${covered ? 'text-primary-50' : 'text-primary-300'}`}>
            <span
              className={`size-2.5 shrink-0 rounded-full border ${covered ? 'border-fuchsia-500 bg-fuchsia-500 shadow-[0_0_10px_rgb(225_42_251/0.7)]' : 'border-primary-500 bg-background'}`}
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
