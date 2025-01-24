import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import StreakTrackerScreen from '../screens/StreakTrackerScreen'
import { createStaticNavigation } from '@react-navigation/native'

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
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
