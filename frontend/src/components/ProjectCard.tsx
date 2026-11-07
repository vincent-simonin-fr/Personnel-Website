import Image from 'next/image'
import { Project } from 'types'

type ProjectCardProps = { project: Project }

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, stack, url, image } = project

  return (
    <article className='flex h-full flex-col overflow-hidden rounded-large border-1 border-primary-700 bg-primary-900'>
      {image && (
        <div className='relative aspect-video w-full'>
          <Image
            src={image}
            alt=''
            fill
            sizes='(min-width: 1024px) 28vw, (min-width: 768px) 42vw, 84vw'
            className='object-cover'
          />
        </div>
      )}
      <div className='flex flex-1 flex-col gap-3 p-5'>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-pretty text-lg leading-relaxed'>{description}</p>
        {stack.length > 0 && (
          <ul className='mt-auto flex flex-wrap gap-2 pt-2'>
            {stack.map((tech) => (
              <li
                key={tech}
                className='rounded-full border-1 border-fuchsia-600 px-3 py-1 text-sm'>
                {tech}
              </li>
            ))}
          </ul>
        )}
        {url && (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-fuchsia-600 hover:underline'>
            {url.replace(/^https?:\/\//, '')} ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
