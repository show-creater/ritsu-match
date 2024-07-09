import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/component/navigator/Home'
import { NavigationContainer } from '@react-navigation/native';
import Setting from './src/view/Home/setting';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeNavi"
        screenOptions={{
          cardStyle: { backgroundColor: 'white' },
        }}>
        <Stack.Screen
          name="HomePrimary"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Home2"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home3"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home4"
          component={Home}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
