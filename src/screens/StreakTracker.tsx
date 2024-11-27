import React from 'react'
import { Button, Text, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { storesContext } from '../store'
// import { useTestPosts } from '../api/queries/useTestPosts'
import { useUser } from '../api/queries/useUser'

const StreakTracker = observer(() => {
  const useStores = () => React.useContext(storesContext)
  const { streakStore } = useStores()

  // mock data test query
  // const { status, data, error, isFetching } = useTestPosts()
  // if (error) return

  // firestore data test query
  // useUser().then((res) =>
  //   res.map((re) => console.log('re: ', re.data().streak)),
  // )

  // firestore data test react query
  const { status, data, error, isFetching } = useUser()
  data?.map((res) => console.log('streak in View:', res.data().streak))

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
