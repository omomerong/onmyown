import React from 'react'
import { Button, Text, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { storesContext } from '../store'
import { useTestPosts } from '../api/queries/useTestPosts'

const StreakTracker = observer(() => {
  const useStores = () => React.useContext(storesContext)
  const { streakStore } = useStores()

  console.log('streak in View: streak', streakStore.streak)

  const { status, data, error, isFetching } = useTestPosts()

  if (error) return

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* TODO: Post List */}
      <Text style={{ fontSize: 30 }}>
        {data === undefined ? 'title' : data[0].title}
      </Text>
      <Text style={{ fontSize: 30 }}>🔥 Streak: {streakStore.streak}</Text>
      <Text style={{ fontSize: 30 }}>
        🧊 Freeze Chance: {streakStore.freezeChance}
      </Text>
      <Button
        onPress={() => streakStore.completeTask()}
        title="Complete Task"
      />
      <Button
        onPress={() => streakStore.failToExtendStreak()}
        title="Fail to Extend Streak"
      />
    </View>
  )
})

export default StreakTracker
