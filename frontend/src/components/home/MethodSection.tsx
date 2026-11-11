'use client'

import { useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { Dictionary, PHASES, Phase } from 'types'

type Method = Dictionary['homePage']['method']

type MethodSectionProps = {
  method: Method
  phaseLabels: Record<Phase, string>
}

type MethodStepProps = {
  index: number
  phase: Phase
  label: string
  step: Method['steps'][Phase]
  proofLabel: string
  onActive: (index: number) => void
}

const pad = (n: number) => String(n).padStart(2, '0')

// Reports itself as the active phase while it crosses the middle of the viewport.
const MethodStep = ({
  index,
  phase,
  label,
  step,
  proofLabel,
  onActive,
}: MethodStepProps) => {
  const { ref } = useIntersectionObserver({
    rootMargin: '-50% 0px -50% 0px',
    onChange: (isIntersecting) => isIntersecting && onActive(index),
  })

  return (
    <div
      ref={ref}
      data-phase={phase}
      // Screen-relative spacing keeps the rail lighting up one step at a time; none
      // after the last one, or it adds to the gap before the next section.
      className='flex flex-col gap-3 py-10 last:pb-0 md:py-[12vh] md:last:pb-0'>
      {/* Decorative number drawn by CSS (::before): contrast checkers skip it. */}
      <span
        aria-hidden
        data-n={pad(index + 1)}
        className='text-7xl leading-none font-extrabold tracking-tighter text-primary-700 before:content-[attr(data-n)] md:text-8xl dark:text-primary-900'
      />
      <p className='text-sm tracking-widest text-brand uppercase'>{label}</p>
      <h3 className='text-2xl font-semibold text-pretty md:text-3xl'>
        {step.title}
      </h3>
      <p className='max-w-2xl text-lg leading-relaxed text-pretty text-primary-200'>
        {step.text}
      </p>
      <p className='max-w-2xl border-l-2 border-fuchsia-500 pl-3 text-pretty text-primary-100'>
        <span className='text-primary-300'>{proofLabel} · </span>
        {step.proof}
      </p>
    </div>
  )
}

// "How I work": a sticky rail of the 5 phases (desktop) lights up as the matching
// step reaches the middle of the screen. The rail is decorative: each step carries
// its own phase label and heading.
const MethodSection = ({ method, phaseLabels }: MethodSectionProps) => {
  const [active, setActive] = useState(0)

  return (
    <section className='flex w-full flex-col gap-6'>
      <p className='text-sm tracking-widest text-primary-300 uppercase'>
        {method.kicker}
      </p>
      <h2 className='max-w-3xl text-3xl font-semibold text-pretty md:text-5xl'>
        {method.title}
      </h2>
      <div className='md:grid md:grid-cols-[14rem_1fr] md:gap-12'>
        <ol
          aria-hidden
          className='hidden self-start border-l border-primary-700 pl-4 md:sticky md:top-24 md:mt-10 md:block'>
          {PHASES.map((phase, i) => (
            <li
              key={phase}
              data-active={i <= active || undefined}
              className='flex items-center gap-3 py-2 font-semibold text-primary-300 transition-colors data-active:text-primary-50 motion-reduce:transition-none'>
              <span
                className={`size-2.5 rounded-full border ${i <= active ? 'border-fuchsia-500 bg-fuchsia-500 shadow-[0_0_10px_rgb(225_42_251/0.7)]' : 'border-primary-500'}`}
              />
              {phaseLabels[phase]}
            </li>
          ))}
        </ol>
        <div>
          {PHASES.map((phase, i) => (
            <MethodStep
              key={phase}
              index={i}
              phase={phase}
              label={phaseLabels[phase]}
              step={method.steps[phase]}
              proofLabel={method.proofLabel}
              onActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MethodSection
