import MyPage from '../../view/Home/MyPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageSetting from '../../view/Home/ImageSetting';
import { useHome } from '../context/HomeContext';
import React, { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

const PhotoList = () => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, talkPage, setTalkPage, myPageNow, setMyPageNow } = useHome();
    const [isTimeout, setIsTimeout] = useState(false);

    return (
        <Stack.Navigator initialRouteName="MyPage"
            screenOptions={({ route }) => ({
                animation: route.name === 'MyPage' ? 'slide_from_left' : 'slide_from_right', // 特定のスクリーンに上から下へのスライドアニメーションを適用
            })}>
            {myPageNow ?
                <Stack.Screen
                    name="MyPage"
                    component={MyPage}
                    options={{ headerShown: false }}
                /> :
                <Stack.Screen
                    name="ImageSetting"
                    component={ImageSetting}
                    options={{ headerShown: false }}
                />}
        </Stack.Navigator>
    )
};
export default PhotoList;