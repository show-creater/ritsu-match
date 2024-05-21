import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  StyleSheet
} from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db, setDoc, doc } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Animation1 from '../../component/animation/animation1';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [check, setCheck]=useState(false);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
        try {
          await sendEmailVerification(user);
          alert('E-mailをおくりました');
          setCheck(false);
        } catch (e) {
          console.error(e)
          alert('なんか失敗したようですね');
        }
        navigation.navigate('SendEmail');
    } catch (error) {
      console.log(error.message);
    }
  };

  const styles = StyleSheet.create({ 
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

  return (
  <View style={{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: check ? '#a9a9a9' : 'white'
  }}>{check && <Animation1/>}
  <KeyboardAvoidingView
      behavior="padding"
      style={{
        alignItems: 'center',
        position: 'absolute'
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面</Text>
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
        onPress={()=>{handleRegister(); setCheck(true);}}
        disabled={!email || !password}
      >
        <Text style={{ color: check ? '#a9a9a9' : 'white' }}>登録する</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 20, borderBottomWidth: 1}}
        onPress={()=> navigation.navigate('Login')}
      >
        <Text>すでにアカウントをお持ちの方</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>
  );
};
export default SignUpScreen;