import ProjectCard from 'components/ProjectCard'
import { getDictionary } from 'i18n/getDictionary'

type ProjectsProps = { params: Promise<{ locale: string }> }

const Projects = async ({ params }: ProjectsProps) => {
  const { locale } = await params
  const { presentation, projects } = await getDictionary(locale)

  return (
    <div className='flex min-h-[calc(100vh-60px)] w-[84vw] flex-col items-start justify-center gap-16 py-8'>
      <p className='text-start text-2xl'>{presentation.introduction}</p>

      {projects.items.length > 0 && (
        <section className='w-full'>
          <h2 className='mb-8 text-4xl font-semibold'>{projects.title}</h2>
          <ul className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {projects.items.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className='grid w-full grid-cols-1 gap-8'>
        <h2 className='mb-4 text-4xl font-semibold'>{projects.servicesTitle}</h2>
        {presentation.services.map((service) => (
          <div key={service.title}>
            <h3 className='mb-4 text-4xl font-semibold'>{service.title}</h3>
            <p className='text-2xl'>{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Projects
