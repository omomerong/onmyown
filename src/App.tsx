import React from 'react'
import { SafeAreaView } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homescreen from './screens/Homescreen'
// createClient
const queryClient = new QueryClient()

const App = () => {
  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient}>
        <Homescreen />
      </QueryClientProvider>
    </SafeAreaView>
  )
}

export default App
