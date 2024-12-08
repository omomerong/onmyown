import Reac, { useState, useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { storesContext } from '../store'
// import { useTestPosts } from '../api/queries/useTestPosts'
import { useUser } from '../api/queries/useUser'
import { TodoTemplate } from '../components/TodoTemplate'

const StreakTracker = observer(() => {
  const useStores = () => useContext(storesContext)
  const { streakStore } = useStores()

  // mock data test query
  // const { status, data, error, isFetching } = useTestPosts()
  // if (error) return

  // firestore data test query
  // useUser().then((res) =>
  //   res.map((re) => console.log('re: ', re.data().streak)),
  // )

  // firestore data test react query
  // const { status, data, error, isFetching } = useUser()
  // data?.map((res) => console.log('streak in View:', res.data().streak))

  const [todoCount, setTodoCount] = useState(1)

  // ISSUE: 이렇게 하면 새로운 투두 추가할 때마다 리렌더링돼서 데이터 날라감
  const handleEnterPress = () => {
    console.log('todoCount', todoCount)
    setTodoCount((prev) => prev + 1)
  }

  const handleBackspacePress = () => {
    setTodoCount((prev) => prev - 1)
  }

  return (
    <View>
      {/* <Text style={{ fontSize: '50%' }}>🔥 Streak: {streakStore.streak}</Text>
      <Text>🧊 Freeze Chance: {streakStore.freezeChance}</Text> */}

      {[...Array(todoCount)].map((_, index) => (
        <>
          <TodoTemplate
            key={index}
            index={index}
            onEnterPress={() => {
              handleEnterPress()
            }}
            onBackspacePress={() => {
              handleBackspacePress()
            }}
            autoFocus={index === 0 ? false : true}
          />
        </>
      ))}

      {/* <Button
        onPress={() => streakStore.completeTask()}
        title="Complete Task"
      />
      <Button
        onPress={() => streakStore.failToExtendStreak()}
        title="Fail to Extend Streak"
      /> */}
    </View>
  )
})

export default StreakTracker
