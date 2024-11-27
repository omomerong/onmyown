import React from 'react'
import StreakStore from './StreakStore'

export const storesContext = React.createContext({
  streakStore: StreakStore,
})
