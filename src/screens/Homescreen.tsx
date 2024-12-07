import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import CharacterImg from '../components/CharacterImg'
import styled from 'styled-components/native'
import StreakTracker from './StreakTracker'

function Homescreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const year2YY = new Date().getFullYear().toString().slice(-2)
  const month2MM = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const day2DD = new Date().getDate().toString().padStart(2, '0')
  return (
    <SafeAreaView style={{ backgroundColor: isDarkTheme ? 'black' : 'white' }}>
      <Title
        isDarkTheme={isDarkTheme}
      >{`${year2YY}.${month2MM}.${day2DD} 🔥1`}</Title>
      <ScrollView>
        <ImageBox>
          <CharacterImg />
          <StreakTracker />
          <View style={{ flexDirection: 'row' }}>
            {/* <Title>🏃</Title>
          <Title>💡</Title>
          <Title>💻</Title>
          <Title>👥</Title>
          <Title>💵</Title> */}
          </View>
        </ImageBox>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Homescreen

const ImageBox = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
const Title = styled.Text<{ isDarkTheme: boolean }>`
  text-align: center;
  font-family: 'MinSans-Bold';
  font-weight: bold;
  font-size: 35px;
  color: ${(props) => (props.isDarkTheme ? 'white' : 'black')};
`
