import React from 'react'
import { Text } from 'react-native'

const Streak = (props: { dayStreak: number }) => {
  const dayStreak: number = props.dayStreak
  // TODO: 들어온 숫자에 대해 1️⃣ 숫자 이모지로 변환하는 코드

  return (
    <>
      <Text>Streak </Text>
      <Text>{dayStreak}</Text>
    </>
  )
}

export default Streak
