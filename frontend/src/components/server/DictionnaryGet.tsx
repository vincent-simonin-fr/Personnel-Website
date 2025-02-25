import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getDictionary } from '../../i18n/dictionaries'
import { GetStaticPropsContext } from 'next'

export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = context.params?.locale
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['dictionary', locale],
    queryFn: () => getDictionary(locale as string),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
