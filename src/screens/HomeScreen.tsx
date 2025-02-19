import React, { useEffect, useRef, useState } from 'react'
import {
  Linking,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  Share,
  Alert,
} from 'react-native'
import CharacterImg from '../components/CharacterImg'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@react-navigation/elements'
import WebView from 'react-native-webview'

function HomeScreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const scrollViewRef = useRef<ScrollView>(null)

  const year2YY = new Date().getFullYear().toString().slice(-2)
  const month2MM = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const day2DD = new Date().getDate().toString().padStart(2, '0')

  const navigation = useNavigation()

  const appGroupId = 'group.org.reactjs.native.example.onmyown.Share'
  const uri = 'http://localhost:3000' // TODO: uri 환경변수 처리 => https://blog-omo.vercel.app/

  useEffect(() => {
    // 앱이 백그라운드일 때 딥링크로 열린 경우
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('백그라운드')
      }
    })

    // 앱이 포그라운드일 때 딥링크로 열린 경우
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('포그라운드')
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <WebView
      source={{ uri }}
      style={{ flex: 1, backgroundColor: isDarkTheme ? 'black' : 'white' }}
    />
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? 'black' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollView
        style={{
          minWidth: '100%',
          minHeight: '100%',
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        // 스크롤 인디케이터 색상 설정: 아예 안보이게
        indicatorStyle={isDarkTheme ? 'black' : 'white'}
        ref={scrollViewRef}
      >
        <View style={{ margin: 10 }} />
        <Title
          isDarkTheme={isDarkTheme}
        >{`${year2YY}.${month2MM}.${day2DD}`}</Title>
        <View style={{ margin: 50 }} />
        <CharacterImg />
        <Button
          style={{ margin: 15 }}
          onPress={() => navigation.navigate('StreakTracker')}
        >
          오늘 루틴 실천하기!
        </Button>
        {/* <StreakTrackerScreen /> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

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
