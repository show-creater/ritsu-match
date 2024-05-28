import MyPage from '../../view/Home/MyPage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeView from '../../view/Home/HomeView';
import { useHome } from '../../component/context/HomeContext';
import React, { useRef,useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser}=useHome();
    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimeout(true);
          }, 1000);
    },[]);

    return (
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    animation: 'slide_from_bottom', // 特定のスクリーンに上から下へのスライドアニメーションを適用
            }}>
                {(isLogin || !isTimeout) ? 
                <Stack.Screen
                    name="Home"
                    component={HomeView}
                    options={{ headerShown: false }}
                /> :
                <Stack.Screen
                    name="MyPage"
                    component={MyPage}
                    options={{ headerShown: false }}
                />}
            </Stack.Navigator>
    )
}; 
export default HomeNavigator;