'use client'

import { PageTitle } from 'components/shape/PageTitle'
import { useLocaleContext } from 'hooks/useLocaleContext'

type ProjectsProps = object

const Projects = ({}: ProjectsProps) => {
  const { dictionary } = useLocaleContext()

  return (
    <>
      <PageTitle pageIndex={1} />
      <div className='flex min-h-[calc(100vh-60px)] w-[84vw] flex-col items-start justify-center py-8'>
        <div className='mb-8 text-start text-2xl'>
          {dictionary && dictionary.presentation.introduction}
        </div>
        <div className='mx-auto grid h-full grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1'>
          <h2 className='mb-4 text-4xl font-semibold'>Mes services</h2>
          {dictionary &&
            dictionary.presentation.services.map((service, index) => (
              <div key={index} className=''>
                <h2 className='mb-4 text-4xl font-semibold'>{service.title}</h2>
                <div className='text-2xl'>{service.description}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Projects
