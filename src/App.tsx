import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RootNavigation from './navigation/RootNavigation'
// createClient
const queryClient = new QueryClient()

const App = () => {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkTheme ? 'black' : 'white' }}
    >
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </SafeAreaView>
  )
}

export default App
