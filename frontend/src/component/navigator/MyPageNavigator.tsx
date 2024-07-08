import MyPage from "../../view/Home/MyPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeView from "../../view/Home/HomeView";
import { useHome } from "../../component/context/HomeContext";
import React, { useEffect, useState } from "react";
import ChatView from "../../view/Chat/ChatView";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const {
    isLogin,
    setIsLogin,
    loginUser,
    setLoginUser,
    isTimeout,
    setIsTimeout,
    isTime,
    setIsTime,
  } = useHome();

  useEffect(() => {
    // 2秒遅延してステートをtrueに設定
    const timer = setTimeout(() => {
      setIsTime(true);
    }, 1000);
    // クリーンアップ関数
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("iijijijijij");
    console.log(isTimeout);
    console.log(isTime);
  }, [isTime]);

  return (
    <Stack.Navigator
      initialRouteName="HomeView"
      screenOptions={{
        animation: "slide_from_bottom", // 特定のスクリーンに上から下へのスライドアニメーションを適用
      }}
    >
      {isTimeout && isTime ? (
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="HomeView"
          component={HomeView}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="ChatView"
        component={ChatView}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
