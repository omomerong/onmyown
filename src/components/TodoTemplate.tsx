import React, { useRef, useState } from 'react'
import {
  Pressable,
  Text,
  TextInput,
  View,
  useColorScheme,
  BackHandler,
} from 'react-native'

interface TodoTemplateProps {
  onEnterPress: () => void
  onBackspacePress: () => void
  autoFocus?: boolean
  index: number
}

export const TodoTemplate: React.FC<TodoTemplateProps> = ({
  onEnterPress,
  onBackspacePress,
  autoFocus = false,
  index,
}) => {
  const inputRef = useRef<TextInput>(null)
  const [isChecked, setIsChecked] = useState(false)
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const handleBackspace = (index: number, text: string) => {
    if (text.length === 0) {
      // 텍스트가 비어있을 때 해당 템플릿 삭제
      onBackspacePress()
    }
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
      }}
    >
      <Pressable
        onPress={() => setIsChecked(!isChecked)}
        style={{
          width: 25,
          height: 25,
          borderWidth: 1.5,
          borderColor: isChecked ? 'transparent' : '#C6C6C6',
          marginRight: 10,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isChecked ? '#FFCC63' : '#FFFFFF',
        }}
      >
        {index > 0 && (
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                top: '-105%',
                width: 2,
                height: 22,
                backgroundColor: '#FFCC63',
              }}
            />
          </View>
        )}
      </Pressable>
      {isChecked && (
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 40,
            borderWidth: 1,
            width: 45,
            borderColor: '#FFCC63',
            zIndex: 100,
          }}
        />
      )}
      <TextInput
        style={{
          flex: 1,
          fontWeight: 600,
          fontSize: 20,
          color: isDarkTheme ? 'white' : 'black',
        }}
        onChangeText={(value) => {
          if (value.length === 0) {
            handleBackspace(index, value)
          }
        }}
        onSubmitEditing={(e) => {
          onEnterPress()
        }}
        blurOnSubmit={false}
        ref={inputRef}
        autoFocus={autoFocus}
      />

      {isChecked && (
        <Text style={{ fontSize: 10, color: isDarkTheme ? 'white' : 'black' }}>
          {`${new Date().getHours().toString().padStart(2, '0')}:${new Date()
            .getMinutes()
            .toString()
            .padStart(2, '0')}`}
        </Text>
      )}
    </View>
  )
}
