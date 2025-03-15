import Button from 'components/ui/Button'
import Starfield from 'components/ui/animations/Starfields'

const Labs = () => {
  return (
    <div className='w-screen'>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor='black'
      />
      <div className='flex h-[calc(100vh-60px)] flex-col items-center justify-center text-4xl'>
        Labs is good{' '}
        <Button className='' color='primary'>
          Test
        </Button>
      </div>
    </div>
  )
}

export default Labs
