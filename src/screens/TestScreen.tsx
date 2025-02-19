import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import {
  setItem,
  getItem,
  removeItem,
} from '../../NativeModules/RCTUserDefaultsModule'

const TestScreen = () => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [storedValue, setStoredValue] = useState('')

  const handleSave = async () => {
    try {
      await setItem(key, value)
      setStoredValue(value)
      console.log('Saved successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoad = async () => {
    try {
      const result = await getItem(key)
      setStoredValue(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async () => {
    try {
      await removeItem(key)
      setStoredValue('')
      console.log('Removed successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>UserDefaults Test</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Key"
        value={key}
        onChangeText={setKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Value"
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLoad}>
        <Text style={styles.buttonText}>Load</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRemove}>
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
      <Text style={styles.result}>Stored Value: {storedValue}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
})

export default TestScreen
