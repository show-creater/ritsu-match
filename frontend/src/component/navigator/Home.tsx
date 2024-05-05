import React from 'react'; // Reactをインポート
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeView from '../../view/Home/HomeView';
import MyPage from '../../view/Home/MyPage';
import Friends from '../../view/Home/Friends';
import Talk from '../../view/Home/Talk';
import SignUpScreen from '../../view/login/SignUpScreen';
import SendEmail from '../../view/login/SendEmail';

const Tab = createBottomTabNavigator();
const Home = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // すべてのタブでヘッダーを非表示に
                tabBarStyle: { display: 'none' } // ここでタブバーを非表示に設定
            }}
        >
            <Tab.Screen  name='Home' component={HomeView}
                options={{
                    headerShown:false,
                    tabBarIcon: ({focused}) => (<Ionicons name="notifications-outline" size={24} color='#30CB89' />
                ),
            }}>
            </Tab.Screen>
            <Tab.Screen  name='Friends' component={Friends}
                options={{
                    headerShown:false,
                    tabBarIcon: ({focused}) => (<Ionicons name="person-outline" size={24} color='#30CB89' />
                ),
            }}>
            </Tab.Screen>
            <Tab.Screen  name='Talk' component={Talk}
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
        </Tab.Navigator>
    )
};
export default Home;