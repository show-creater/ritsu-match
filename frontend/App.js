import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/component/navigator/Home'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeView"
          component={Home}
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
