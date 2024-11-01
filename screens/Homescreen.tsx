import React from 'react'
import { SafeAreaView } from 'react-native'
import Streak from '../components/Streak'
import CharacterImg from '../components/CharacterImg'
import styled from 'styled-components/native'

function Homescreen() {
  return (
    <SafeAreaView>
      <ImageBox style={{ backgroundColor: 'yellow' }}>
        <Title>
          <Streak dayStreak={9} />
        </Title>
        <CharacterImg />
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
