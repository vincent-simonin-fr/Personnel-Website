import { Dictionary, Phase, Project } from 'types'
import ProjectCard from 'components/ProjectCard'
import ProjectIllustration from './ProjectIllustration'

type ProjectSceneProps = {
  project: Project
  index: number
  total: number
  labels: Pick<Dictionary['projects'], 'roleLabel' | 'viaLabel' | 'phasesLabel'>
  phaseLabels: Record<Phase, string>
}

// One screen per project, three planes moving at different speeds while scrolling
// (CSS in globals.css: data-scene / data-parallax / data-parallax-fade). Static
// without scroll-driven animation support or with reduced motion.
const ProjectScene = ({
  project,
  index,
  total,
  labels,
  phaseLabels,
}: ProjectSceneProps) => (
  <section
    data-scene
    className='relative flex min-h-svh w-full items-center overflow-hidden py-16'>
    {/* Back plane: the client's name, barely lighter/darker than the page. */}
    <div
      aria-hidden
      data-parallax
      className='pointer-events-none absolute top-[6%] -left-4 text-[clamp(6rem,22vw,19rem)] leading-none font-extrabold tracking-tighter whitespace-nowrap text-primary-700 select-none [--parallax:120px] max-sm:[--parallax:16px] dark:text-primary-900'>
      {project.client}
    </div>

    <div className='relative grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] md:gap-0'>
      {/* Middle plane: illustration with a fuchsia halo. */}
      <div
        data-parallax
        className='relative [--parallax:48px] max-sm:[--parallax:8px] md:col-start-2 md:row-start-1 md:-ml-16'>
        <div
          aria-hidden
          className='absolute -inset-8 bg-[radial-gradient(circle_at_60%_40%,rgb(217_70_239/0.3),transparent_60%)] blur-2xl'
        />
        <div className='relative aspect-[4/3] overflow-hidden rounded-3xl border-1 border-primary-800 bg-primary-900 text-primary-500 shadow-2xl'>
          <ProjectIllustration
            kind={project.illustration}
            className='size-full p-6'
          />
        </div>
      </div>

      {/* Front plane: the project sheet. */}
      <div
        data-parallax-fade
        className='relative z-10 [--parallax:-40px] max-sm:[--parallax:-8px] md:col-start-1 md:row-start-1'>
        <ProjectCard
          project={project}
          labels={labels}
          phaseLabels={phaseLabels}
          index={index}
          total={total}
          as='h2'
        />
      </div>
    </div>
  </section>
)

export default ProjectScene
