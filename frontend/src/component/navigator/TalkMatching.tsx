import Friends from '../../view/Home/Friends';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Talk from '../../view/Home/Talk';
import { useHome } from '../../component/context/HomeContext';
import React, { useEffect, useState } from 'react';
import ChatView from '../../view/Chat/ChatView';

const Stack = createNativeStackNavigator();

const TalkMatchingNavigator = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser, talkPage, setTalkPage}=useHome();
    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimeout(true);
          }, 2000);
    },[]);

    return (
            <Stack.Navigator initialRouteName="TalkSlide"
                screenOptions={({route}) => ({
                    animation: route.name === 'TalkSlide' ? 'slide_from_left' : 'slide_from_right', // 特定のスクリーンに上から下へのスライドアニメーションを適用
            })}>
                {talkPage ? 
                <Stack.Screen
                    name="TalkSlide"
                    component={Talk}
                    options={{ headerShown: false }}
                /> :
                <Stack.Screen
                    name="Friends"
                    component={Friends}
                    options={{ headerShown: false }}
                />}
                <Stack.Screen
                    name="ChatView"
                    component={ChatView}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    )
}; 
export default TalkMatchingNavigator;