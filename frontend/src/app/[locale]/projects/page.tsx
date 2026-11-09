import ProjectScene from 'components/projects/ProjectScene'
import { getDictionary } from 'i18n/getDictionary'

type ProjectsProps = { params: Promise<{ locale: string }> }

const Projects = async ({ params }: ProjectsProps) => {
  const { locale } = await params
  const { projects, phases } = await getDictionary(locale)

  return (
    <div className='flex w-[84vw] flex-col gap-16 pt-8 pb-28'>
      <header className='flex min-h-[40vh] flex-col justify-end gap-4'>
        <h1 className='text-4xl font-semibold tracking-tight md:text-6xl'>
          {projects.title}
        </h1>
        <p className='max-w-3xl text-xl text-pretty text-primary-200'>
          {projects.intro}
        </p>
      </header>

      <div>
        {projects.items.map((project, index) => (
          <ProjectScene
            key={project.id}
            project={project}
            index={index}
            total={projects.items.length}
            labels={projects}
            phaseLabels={phases}
          />
        ))}
      </div>

      <section className='flex flex-col gap-8'>
        <h2 className='text-3xl font-semibold'>{projects.othersTitle}</h2>
        <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.others.map((other) => (
            // Lighter echo of the project cards: same glass card, a fuchsia hairline on
            // top and a soft glow in the corner, lifted on hover.
            <li
              key={other.title}
              className='group relative overflow-hidden rounded-3xl border border-primary-800 bg-primary-900/80 p-6 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-500/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8'>
              <span
                aria-hidden
                className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-fuchsia-500/80 to-transparent'
              />
              <span
                aria-hidden
                className='pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-fuchsia-500/15 opacity-70 blur-3xl transition-opacity duration-300 group-hover:opacity-100'
              />
              <p className='relative text-sm tracking-widest text-primary-300 uppercase'>
                <span className='font-bold text-brand'>{other.client}</span> ·{' '}
                {other.period}
              </p>
              <h3 className='relative mt-3 text-xl font-semibold text-primary-50'>
                {other.title}
              </h3>
              <p className='relative mt-2 leading-relaxed text-pretty text-primary-200'>
                {other.description}
              </p>
              {/* Same tags as the project cards. */}
              {other.stack.length > 0 && (
                <ul className='relative mt-4 flex flex-wrap gap-2'>
                  {other.stack.map((tech) => (
                    <li
                      key={tech}
                      className='rounded-full border border-primary-700 px-3 py-1 text-xs text-primary-200'>
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Projects
