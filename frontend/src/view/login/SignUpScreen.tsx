import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, setDoc, doc, collection } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Animation1 from '../../component/animation/LoginAnimation';
import HomeFooter from '../../component/footer/HomeFooter';
import { useHome } from '../../component/context/HomeContext';
import { Svg, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import { ScrollView } from 'react-native-gesture-handler';

const SignUpScreen = ({ navigation }) => {
  const { isLogin, setIsLogin, loginUser, setLoginUser } = useHome();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [check, setCheck] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('0');
  const [faculty, setFaculty] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const storage = getStorage();

  const convertToBlob = async (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('こちらがユーザー情報です',user);
      try {
        await sendEmailVerification(user);
        const randomNum = Math.random();
        await setDoc(doc(db, 'users', user.uid), { randomField: randomNum, userid: user.uid, name: name, age: parseInt(age, 10), comment: '', faculty: faculty, heart_pushed: [], image: '', hobbys: [] });
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
        alert('E-mailをおくりました');
        setCheck(false);
      } catch (e) {
        console.error(e.message)

      }
      navigation.navigate('SendEmail');
    } catch (error) {
      console.log(error.message);
      if (error.message=='Firebase: Error (auth/email-already-in-use).'){
        setErrorMessage('そのメールアドレスは既に登録されています');
        setCheck(false);
      }else if(error.message=='Firebase: Password should be at least 6 characters (auth/weak-password).'){
        setErrorMessage('パスワードは6文字以上にしてください');
        setCheck(false);
      }      
    }
  };

  const styles = StyleSheet.create({
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      height: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    buttonContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 250
    }
  });

  return (
  <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'blue'}}> 
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#30CB89'
      // backgroundColor: check ? '#a9a9a9' : 'white'
    }}>{check && <Animation1 />}
     
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
          <Text style={{marginBottom: 30, fontSize: 30, color: 'white'}}>Ritsu-Friendship</Text>
          <View style={{ padding: 20, alignItems: 'center', backgroundColor: 'white', borderRadius: 7 }}>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>SignUp</Text>
            {errorMessage != '' && <Text style={{color: 'red'}}>{errorMessage}</Text>}
            <View style={{ marginBottom: 20, width: 250,  }}>
              <Text>E-mail</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                {/* <Text style={{fontSize:17, paddingLeft: 5}}>@ed.ritsumei.ac.jp</Text> */}
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
            <View style={{ marginBottom: 20 }}>
              <Text>名前</Text>
              <TextInput
                style={{
                  width: 250,
                  borderWidth: 1,
                  padding: 5,
                  borderColor: 'gray',
                }}
                onChangeText={setName}
                value={name}
                placeholder="名前を入力してください"
                autoCapitalize="none"
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text>年齢</Text>
              <TextInput
                style={{
                  width: 250,
                  borderWidth: 1,
                  padding: 5,
                  borderColor: 'gray',
                }}
                onChangeText={setAge}
                value={age}
                placeholder="年齢を入力してください"
                autoCapitalize="none"
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text>学部</Text>
              <TextInput
                style={{
                  width: 250,
                  borderWidth: 1,
                  padding: 5,
                  borderColor: 'gray',
                }}
                onChangeText={setFaculty}
                value={faculty}
                placeholder="学部を入力してください"
                autoCapitalize="none"
              />
            </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#88cb7f',
                  borderRadius: 10,
                }}
                onPress={() => { handleRegister(); setCheck(true); }}
                disabled={!email || !password}
              >
                <Text style={{ color: check ? '#a9a9a9' : 'white' }}>登録する</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20, borderBottomWidth: 1 }}
              onPress={() => navigation.navigate('Login')}
            >
              <Text>すでにアカウントをお持ちの方</Text>
            </TouchableOpacity>
            {/* {isLogin && <View style={styles.footer}>
            <HomeFooter navigation={navigation} />
          </View>} */}
          </View>
        </KeyboardAvoidingView>
      
    </View>
    </ScrollView>
  );
};
export default SignUpScreen;