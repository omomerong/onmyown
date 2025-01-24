import React from 'react'
import { SafeAreaView } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RootNavigation from './navigation/RootNavigation'
// createClient
const queryClient = new QueryClient()

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </SafeAreaView>
  )
}

export default App
