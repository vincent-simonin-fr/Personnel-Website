import { Dictionary } from 'i18n/dictionary.types'
import { Phase, Project } from './project.types'
import ProjectCard from 'components/projects/ProjectCard'
import ProjectIllustration from './ProjectIllustration'

type ProjectSceneProps = {
  project: Project
  index: number
  total: number
  labels: Pick<Dictionary['projects'], 'roleLabel' | 'phasesLabel'>
  phaseLabels: Record<Phase, string>
}

// One screen per project, three planes moving at different speeds while scrolling
// (CSS in globals.css: data-scene / data-parallax / data-parallax-fade). Static
// without scroll-driven animation support or with reduced motion. Side by side only
// from lg: below, the sheet's column is too narrow for long (German) titles.
const ProjectScene = ({
  project,
  index,
  total,
  labels,
  phaseLabels,
}: ProjectSceneProps) => (
  // pt-40: the planes sit lower than centered, so more of the client's name shows above them.
  <section
    data-scene
    className='relative flex min-h-svh w-full items-center pt-40 pb-16'>
    {/* Back plane: the client's name, barely lighter/darker than the page. Drawn by
        CSS (::before) because it is decoration: contrast checkers skip it. Only this
        layer clips, so the sheet's shadow is never cut at the scene's edge. */}
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0 overflow-hidden'>
      <div
        data-parallax
        data-name={project.client}
        className='absolute top-[6%] left-0 text-[clamp(6rem,22vw,19rem)] leading-none font-extrabold tracking-tighter text-primary-700 select-none [--parallax:120px] before:content-[attr(data-name)] max-sm:[--parallax:16px] dark:text-primary-900'
      />
    </div>

    <div className='relative grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-0'>
      {/* Front plane: the project sheet (first, so it leads when stacked). More see-through
          than on the home page, so the client's name shows behind it. */}
      <div
        data-parallax-fade
        className='relative z-10 [--parallax:-40px] max-sm:[--parallax:-8px] lg:col-start-1 lg:row-start-1 [&>article]:bg-primary-900/70'>
        <ProjectCard
          project={project}
          labels={labels}
          phaseLabels={phaseLabels}
          index={index}
          total={total}
          as='h2'
        />
      </div>

      {/* Middle plane: illustration with a fuchsia halo (blur bleeds out visually
          without widening the page, unlike a negative inset). */}
      <div
        data-parallax
        className='relative [--parallax:48px] max-sm:[--parallax:8px] lg:col-start-2 lg:row-start-1 lg:-ml-16'>
        <div
          aria-hidden
          className='absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgb(217_70_239/0.3),transparent_60%)] blur-2xl'
        />
        <div className='relative aspect-4/3 overflow-hidden rounded-3xl border border-primary-800 bg-primary-900/70 text-primary-500 shadow-2xl'>
          <ProjectIllustration
            kind={project.illustration}
            className='size-full p-6'
          />
        </div>
      </div>
    </div>
  </section>
)

export default ProjectScene
