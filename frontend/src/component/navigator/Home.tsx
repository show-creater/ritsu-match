import React from 'react'; // Reactをインポート
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeView from '../../view/Home/HomeView';
import MyPage from '../../view/Home/MyPage';
import Friends from '../../view/Home/Friends';
import TalkMatching from '../../view/Home/TalkMatching';
import SignUpScreen from '../../view/login/SignUpScreen';
import SendEmail from '../../view/login/SendEmail';
import { HomeProvider } from '../context/HomeContext';
import Login from '../../view/login/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { useHome } from '../context/HomeContext';
import HomeNavigator from './MyPageNavigator';
import TalkMatchingNavigator from './TalkMatching'; //横スクロールのアニメーションを実装するとき、Talkコンポーネントをこのコンポーネントに置き換える
import Setting from '../../view/Home/setting';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
    return (
        <HomeProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false, // すべてのタブでヘッダーを非表示に
                    tabBarStyle: { display: 'none' } // ここでタブバーを非表示に設定
                }}
            >
                <Tab.Screen  name='Home' component={HomeNavigator}
                    options={{
                        headerShown:false,
                        tabBarIcon: ({focused}) => (<Ionicons name="notifications-outline" size={24} color='#30CB89' />
                    ),
                }}>
                </Tab.Screen>
                <Tab.Screen  name='Friends' component={Setting}
                    options={{
                        headerShown:false,
                        tabBarIcon: ({focused}) => (<Ionicons name="person-outline" size={24} color='#30CB89' />
                    ),
                }}>
                </Tab.Screen>
                <Tab.Screen  name='Talk' component={TalkMatching}
                    options={{
                        headerShown:false,
                        tabBarIcon: ({focused}) => (<Ionicons name="chatbubble-ellipses-outline" size={24} color='#30CB89' />
                    ),
                }}>
                </Tab.Screen>
                <Tab.Screen  name='MyPage' component={MyPage}
                    options={{
                        headerShown:false,
                        tabBarIcon: ({focused}) => (<Ionicons name="person-circle-outline" size={24} color='#30CB89' />
                    ),
                }}>
                </Tab.Screen>

                <Tab.Screen name='SignUpScreen' component={SignUpScreen}>

                </Tab.Screen>

                <Tab.Screen name='SendEmail' component={SendEmail}>

                </Tab.Screen>
                <Tab.Screen name='Login' component={Login}>

                </Tab.Screen>
            </Tab.Navigator>
        </HomeProvider>
    )
};
export default Home;

function SignUpScreenStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_bottom', // 特定のスクリーンに上から下へのスライドアニメーションを適用
        }}
      >
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    );
}