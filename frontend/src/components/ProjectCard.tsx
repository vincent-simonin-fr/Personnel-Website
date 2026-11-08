import { Dictionary, Phase, Project } from 'types'
import PhaseTimeline from 'components/projects/PhaseTimeline'

type ProjectCardProps = {
  project: Project
  labels: Pick<Dictionary['projects'], 'roleLabel' | 'phasesLabel'>
  phaseLabels: Record<Phase, string>
  /** 0-based position, shown as '01'. */
  index: number
  /** When set, the card also shows '01 / 05'. */
  total?: number
  /** Heading level of the title: 'h2' right under a page h1, 'h3' inside a section. */
  as?: 'h2' | 'h3'
}

const pad = (n: number) => String(n).padStart(2, '0')

// Project sheet: frosted glass card (DESIGN.md, "Fiche projet").
const ProjectCard = ({
  project,
  labels,
  phaseLabels,
  index,
  total,
  as: Heading = 'h3',
}: ProjectCardProps) => {
  const { client, via, period, status, title, summary, role, phases, stack } =
    project

  return (
    <article className='relative flex flex-col gap-4 rounded-3xl border-1 border-primary-800 bg-primary-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8'>
      <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-14 text-sm tracking-widest text-primary-300 uppercase'>
        <span className='font-bold text-brand'>{pad(index + 1)}</span>
        {/* Served through an employer: "Kardham Digital x EY". */}
        <span>{via ? `${via} x ${client}` : client}</span>
        <span>· {period}</span>
        {status && (
          <span className='rounded-full border-1 border-fuchsia-500 px-2 py-0.5 text-xs tracking-normal text-brand normal-case'>
            {status}
          </span>
        )}
      </div>
      {total && (
        <span
          aria-hidden
          className='absolute top-6 right-6 text-xs tracking-widest text-primary-300 sm:top-8 sm:right-8'>
          <span className='text-brand'>{pad(index + 1)}</span> / {pad(total)}
        </span>
      )}
      <Heading className='text-2xl leading-tight font-semibold text-pretty break-words hyphens-auto text-primary-50 sm:text-3xl'>
        {title}
      </Heading>
      <p className='leading-relaxed text-pretty text-primary-200'>{summary}</p>
      <p className='text-sm text-primary-100'>
        <span className='text-primary-300'>{labels.roleLabel} · </span>
        {role}
      </p>
      <PhaseTimeline
        phases={phases}
        labels={phaseLabels}
        srLabel={labels.phasesLabel}
      />
      {stack.length > 0 && (
        <ul className='flex flex-wrap gap-2'>
          {stack.map((tech) => (
            <li
              key={tech}
              className='rounded-full border-1 border-primary-700 px-3 py-1 text-xs text-primary-200'>
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default ProjectCard
