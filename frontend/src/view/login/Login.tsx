import React from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebaseConfig';
import {signInWithEmailAndPassword, browserLocalPersistence} from 'firebase/auth';
import { useHome } from '../../component/context/HomeContext';
import { collection, getDocs ,getDoc ,doc, setDoc, addDoc} from "firebase/firestore";
import { db } from '../../../firebaseConfig';

const Login=({navigation})=>{
    const {isLogin, setIsLogin}=useHome();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    
    const handleLogin = async () => {
        try {
            // メールアドレスとパスワードでログイン
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            //ログイン状態管理
            if (user.emailVerified) {
              setIsLogin(true);              
            }else{
              
            }

            const currentuser = auth.currentUser.uid;
            const randomNum=Math.random();
            await setDoc(doc(db, 'users', currentuser), {randomField: randomNum, userid: currentuser, name: '', age: 0, comment: '', faculty: '', heart: 0, image: ''})

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
            navigation.navigate('MyPage');
        } catch (error) {
          // エラー処理
          console.error('Login failed:', error.message);
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
        <KeyboardAvoidingView
        behavior="padding"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>ログイン画面</Text>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              width: 250,
              borderWidth: 1,
              padding: 5,
              borderColor: 'gray',
            }}
            onChangeText={setEmail}
            value={email}
            placeholder="メールアドレスを入力してください"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
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
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text style={{ color: 'white' }}>ログイン</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20, borderBottomWidth: 1}}
          onPress={()=> navigation.navigate('SignUpScreen')}
        >
          <Text>まだアカウントをお持ちでない方</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <HomeFooter navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    );
};
export default Login;