import { useQuery } from '@tanstack/react-query'

type TestPost = {
  id: number
  title: string
  body: string
}

export function useTestPosts() {
  return useQuery({
    queryKey: ['testPosts'],
    queryFn: async (): Promise<Array<TestPost>> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return await response.json()
    },
  })
}
