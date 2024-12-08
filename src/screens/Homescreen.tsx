import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
  Keyboard,
  KeyboardEventIOS,
} from 'react-native'
import CharacterImg from '../components/CharacterImg'
import styled from 'styled-components/native'
import StreakTracker from './StreakTracker'

function Homescreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const scrollViewRef = useRef<ScrollView>(null)

  const year2YY = new Date().getFullYear().toString().slice(-2)
  const month2MM = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const day2DD = new Date().getDate().toString().padStart(2, '0')

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkTheme ? 'black' : 'white',
        alignItems: 'center',
      }}
    >
      <ScrollView
        style={{
          backgroundColor: 'pink',
          minWidth: '100%',
          minHeight: '100%',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        // 스크롤 인디케이터 색상 설정: 아예 안보이게
        indicatorStyle={isDarkTheme ? 'black' : 'white'}
        ref={scrollViewRef}
      >
        <Title
          isDarkTheme={isDarkTheme}
        >{`${year2YY}.${month2MM}.${day2DD} 🔥1`}</Title>
        <CharacterImg />
        <ImageBox>
          <StreakTracker />
        </ImageBox>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Homescreen

const ImageBox = styled.View`
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
