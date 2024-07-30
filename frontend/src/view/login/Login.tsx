import React from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, browserLocalPersistence, signOut } from 'firebase/auth';
import { useHome } from '../../component/context/HomeContext';
import { collection, getDocs, getDoc, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import Animation1 from '../../component/animation/LoginAnimation';
import { Svg, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

const Login = ({ navigation }) => {
  const { isLogin, setIsLogin, isTimeout, setIsTimeout, isTime, setIsTime } = useHome();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [roading, setRoading] = useState(false);

  const handleLogin = async () => {
    try {
      setRoading(true);
      // メールアドレスとパスワードでログイン
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      //ログイン状態管理
      if (user.emailVerified) { //メール認証が完了していた場合
        console.log('メール認証が完了しています');
        setRoading(false);
        setIsLogin(true);
        setIsTimeout(false);
        setIsTime(false);

        //初回ログイン時にユーザー情報をasyncstorageに保存
        const saveemail = async () => {
          try {
            const stringValue = JSON.stringify(email);
            await AsyncStorage.setItem('useremail', stringValue);
          } catch (e) {
            console.log(e);
          }
        };
        saveemail();

        const savepassword = async () => {
          try {
            const stringValue = JSON.stringify(password);
            await AsyncStorage.setItem('userpassword', stringValue);
          } catch (e) {
            console.log(e);
          }
        };
        savepassword();

        // ログインが成功した場合の処理
        console.log('User logged in:', user);
        navigation.navigate('MyPageAndImage');
      } else {
        setErrorMessage('このアカウントはメール認証が完了していません');
        setRoading(false);
        signOut(auth);
      }

    } catch (error) {
      // エラー処理
      console.error('Login failed:', error.message);
      if (error.message == 'Firebase: Error (auth/invalid-credential).') {
        setErrorMessage('メールアドレス、もしくはパスワードが間違っています');
        setRoading(false);
      } else if (error.message == 'Firebase: Error (auth/invalid-email).') {
        setErrorMessage('アカウントが存在しません');
        setRoading(false);
      }
    }
  };

  const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 0,
      height: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },



  });

  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'blue' }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#30CB89'
      }}>{roading && <Animation1 />}

        <View style={{ top: 0, left: 0, position: 'absolute' }}>
          <Svg height="300" width="300">
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                r="50%"
                fx="100%"
                fy="100%"
              >
                <Stop offset="0%" stopColor="white" stopOpacity="0" />
                <Stop offset="100%" stopColor="white" stopOpacity="0.5" />
              </RadialGradient>
            </Defs>
            <Circle
              cx="30" // 円の中心のx座標
              cy="30" // 円の中心のy座標
              r="250"  // 円の半径
              fill="url(#grad)" // 円の塗りつぶしの色
            />
          </Svg>
        </View>
        <View style={{ bottom: 0, right: 0, position: 'absolute' }}>
          <Svg height="300" width="300">
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                r="50%"
                fx="100%"
                fy="100%"
              >
                <Stop offset="0%" stopColor="white" stopOpacity="0" />
                <Stop offset="100%" stopColor="white" stopOpacity="0.5" />
              </RadialGradient>
            </Defs>
            <Circle
              cx="270" // 円の中心のx座標
              cy="270" // 円の中心のy座標
              r="250"  // 円の半径
              fill="url(#grad)" // 円の塗りつぶしの色
            />
          </Svg>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            alignItems: 'center',
            position: 'absolute'
          }}
        >
          <Text style={{ marginBottom: 30, fontSize: 30, color: 'white' }}>Ritsu-Friendship</Text>
          <View style={{ padding: 20, alignItems: 'center', backgroundColor: 'white', borderRadius: 7 }}>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>Login</Text>
            {errorMessage != '' && <Text style={{ color: 'red', width: 250, paddingBottom: 10 }}>{errorMessage}</Text>}
            <View style={{ marginBottom: 20, width: 250, }}>
              <Text>E-mail</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    padding: 5,
                    borderColor: 'gray',
                  }}
                  onChangeText={setEmail}
                  value={email}
                  // placeholder="メールアドレスを入力してください"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Text style={{ fontSize: 17, paddingLeft: 5 }}></Text>
              </View>
            </View>
            <View style={{ marginBottom: 20, width: '100%' }}>
              <Text>Password</Text>
              <TextInput
                style={{
                  width: 250,
                  borderWidth: 1,
                  padding: 5,
                  borderColor: 'gray',
                }}
                onChangeText={setPassword}
                value={password}
                placeholder="パスワードを入力してください"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#88cb7f',
                borderRadius: 10,
              }}
              onPress={() => { handleLogin(); setRoading(true); }}
              disabled={!email || !password}
            >
              <Text style={{ color: roading ? '#a9a9a9' : 'white' }}>ログイン</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20, borderBottomWidth: 1 }}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text>まだアカウントをお持ちでない方</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
export default Login;