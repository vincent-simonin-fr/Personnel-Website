import { Dictionary } from 'i18n/dictionary.types'
import { Phase, Project } from './project.types'
import PhaseTimeline from 'components/projects/PhaseTimeline'

type ProjectCardProps = {
  project: Project
  labels: Pick<Dictionary['projects'], 'roleLabel' | 'phasesLabel'>
  phaseLabels: Record<Phase, string>
  /** 0-based position and list size, shown in the corner as '01 / 06'. Both omitted
      (no number) outside the full list. */
  index?: number
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
  // The card's position ('01 / 06'), only in the full list.
  const counter = index !== undefined && total !== undefined

  return (
    <article className='relative flex flex-col gap-4 rounded-3xl border border-primary-800 bg-primary-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8'>
      {/* One run of text: the dot is tied to the client (no-break space) and the period
          never splits, so a wrap leaves the dot at a line end, not starting the next.
          pr-14: room for the corner counter. */}
      <p
        className={`text-sm tracking-wider text-primary-300 uppercase ${counter ? 'pr-14' : ''}`}>
        {/* Served through an employer: "Kardham Digital x EY". */}
        {via ? `${via} x ${client}` : client}
        {' · '}
        <span className='whitespace-nowrap'>{period}</span>
        {status && (
          <span className='ml-3 inline-block rounded-full border border-accent px-2 py-0.5 text-xs tracking-normal text-brand normal-case'>
            {status}
          </span>
        )}
      </p>
      {counter && (
        <span
          aria-hidden
          className='absolute top-6 right-6 text-xs tracking-wider text-primary-300 sm:top-8 sm:right-8'>
          <span className='text-brand'>{pad(index! + 1)}</span> / {pad(total!)}
        </span>
      )}
      <Heading className='text-2xl leading-tight font-semibold text-balance wrap-break-word hyphens-auto text-primary-50 sm:text-[1.75rem]'>
        {title}
      </Heading>
      <p className='max-w-measure leading-relaxed text-pretty text-primary-200'>
        {summary}
      </p>
      <p className='max-w-measure text-sm text-pretty text-primary-100'>
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
              className='rounded-full border border-primary-700 px-3 py-1 text-xs text-primary-200'>
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default ProjectCard
