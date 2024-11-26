import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import Streak from '../components/Streak'
import CharacterImg from '../components/CharacterImg'
import styled from 'styled-components/native'

// TODO: streak 전역 변수 관리

function Homescreen() {
  const [dayStreak, setDayStreak] = useState(0)
  return (
    <SafeAreaView>
      <ImageBox style={{ backgroundColor: '#FFF' }}>
        <Title>
          <Streak dayStreak={dayStreak} />
        </Title>
        <CharacterImg />
        <Title>🏃</Title>
        <Title>💡</Title>
        <Title>💻</Title>
        <Title>👥</Title>
      </ImageBox>
    </SafeAreaView>
  )
}

export default Homescreen

const ImageBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
const Title = styled.Text`
  font-family: 'MinSans-Bold';
  font-weight: bold;
  font-size: 35px;
`
