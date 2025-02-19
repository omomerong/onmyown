import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import StreakTrackerScreen from '../screens/StreakTrackerScreen'
import { createStaticNavigation } from '@react-navigation/native'
import TestScreen from '../screens/TestScreen'

const RootStack = createNativeStackNavigator({
  // TODO: login state 에 따라 분기 처리 가능한지
  initialRouteName: 'Test',
  // initialRouteName: 'Home',
  // initialRouteName: 'Login',
  screens: {
    Test: {
      screen: TestScreen,
      options: { headerShown: false },
    },
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: { headerShown: false },
    },
    StreakTracker: {
      screen: StreakTrackerScreen,
      options: { headerShown: false },
    },
  },
})
const RootNavigation = createStaticNavigation(RootStack)

export default RootNavigation
