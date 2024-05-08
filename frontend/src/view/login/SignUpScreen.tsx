import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
        try {
          await sendEmailVerification(user.user);

          alert('E-mailをおくりました');
        } catch (e) {
          console.error(e)
          alert('なんか失敗したようですね');
        }
        navigation.navigate('SendEmail');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
        onPress={handleRegister}
        disabled={!email || !password}
      >
        <Text style={{ color: 'white' }}>登録する</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default SignUpScreen;