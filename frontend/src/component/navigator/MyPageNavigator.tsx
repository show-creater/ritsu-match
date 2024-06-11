import MyPage from '../../view/Home/MyPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../../view/Home/HomeView';
import { useHome } from '../../component/context/HomeContext';
import React, { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser}=useHome();
    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimeout(true);
          }, 2000);
    },[]);

    return (
            <Stack.Navigator initialRouteName="HomeView"
                screenOptions={{
                    animation: 'slide_from_bottom', // 特定のスクリーンに上から下へのスライドアニメーションを適用
            }}>
                {(isLogin || !isTimeout) ? 
                <Stack.Screen
                    name="HomeView"
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