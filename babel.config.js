module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [['module-resolver'], ['module:react-native-dotenv']],
  assumptions: {
    setPublicClassFields: false,
  },
}
