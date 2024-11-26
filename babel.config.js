module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [['module-resolver']],
  assumptions: {
    setPublicClassFields: false,
  },
}
