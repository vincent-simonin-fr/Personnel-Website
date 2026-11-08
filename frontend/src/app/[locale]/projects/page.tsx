import ProjectScene from 'components/projects/ProjectScene'
import { getDictionary } from 'i18n/getDictionary'

type ProjectsProps = { params: Promise<{ locale: string }> }

const cardClass = 'rounded-large border-1 border-primary-700 bg-primary-900 p-5'

const Projects = async ({ params }: ProjectsProps) => {
  const { locale } = await params
  const { presentation, projects, phases } = await getDictionary(locale)

  return (
    <div className='flex w-[84vw] flex-col gap-16 py-8'>
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
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {projects.others.map((other) => (
            <li key={other.title} className={cardClass}>
              <p className='text-sm tracking-widest text-primary-300 uppercase'>
                {other.client} · {other.period}
              </p>
              <h3 className='mt-2 text-xl font-semibold'>{other.title}</h3>
              <p className='mt-2 leading-relaxed text-pretty text-primary-200'>
                {other.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col gap-8'>
        <h2 className='text-3xl font-semibold'>{projects.servicesTitle}</h2>
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {presentation.services.map((service) => (
            <li key={service.title} className={cardClass}>
              <h3 className='text-xl font-semibold'>{service.title}</h3>
              <p className='mt-2 leading-relaxed text-pretty text-primary-200'>
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Projects
