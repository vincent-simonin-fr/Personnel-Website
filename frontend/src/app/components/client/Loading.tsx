'use client'

import IsLoadingComponent from 'components/client/IsLoadingComponent'
import IsErrorComponent from 'components/client/IsErrorComponent'

type LoadingProps = {
  children: React.ReactNode
  isLoading: boolean
  isError: boolean
  error: Error | null
}

const Loading = ({ children, isLoading, isError, error }: LoadingProps) => {
  if (isLoading) {
    return <IsLoadingComponent />
  }

  if (isError) {
    return <IsErrorComponent error={error as Error} />
  }

  return <>{children}</>
}

export default Loading
