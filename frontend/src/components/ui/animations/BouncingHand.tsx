// CSS keyframes (transform only: GPU-composited). Was a motion.span: the root not-found
// is part of the root layout tree, so it shipped the motion library (~138 KB) to every page.
const BouncingHand = () => {
  return (
    <span className='animate-bounce-y relative top-[0.1em] inline-block pl-1 align-middle text-4xl motion-reduce:animate-none'>
      👈
    </span>
  )
}

export default BouncingHand
