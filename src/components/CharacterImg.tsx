import React from 'react'
import { Image, View } from 'react-native'

const CharacterImg = () => {
  return (
    <Image
      style={{
        width: 100,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
      }}
      src="~/public/images/myduck.png"
    />
  )
}

export default CharacterImg
