import React from 'react'
import { Image, View } from 'react-native'

const CharacterImg = () => {
  return (
    <Image
      source={require('../public/images/myduck.png')}
      style={{
        width: 105,
        height: 225,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

export default CharacterImg
