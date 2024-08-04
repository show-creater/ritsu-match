import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLoadDoc } from '../custom_hook/useLoadDoc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from '../../../firebaseConfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [isTimeout, setIsTimeout] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [myPageNow, setMyPageNow] = useState(true); //imagesettingとmypageの切り替え管理
  const [infor, setInfor] = useState({ name: '', faculty: '', image: '', age: 0, comment: '', heart_pushed: [], randomField: 0, userid: '', hobbys: [] });
  const [userImage, setUserImage] = useState('');
  const [persondata, setPersondata] = useState([{ name: '', faculty: '', heart: '', image: '', age: 0, comment: '', heart_pushed: [], userid: '', randomField: '' }]);
  const [scrollcheck, setScrollcheck] = useState(true); //読み込みが完了してからスクロールが可能になるように設定
  const [unreadMessagesJSON, setUnreadMessageJSON] = useState({});
  const allChatMessages = {};
  const storage = getStorage();

  useLoadDoc({ persondata, setPersondata, setScrollcheck, isLogin });

  useEffect(() => {
    console.log('ログイン発火');
    const getImage = async () => {
      const storageRef = ref(storage, `user_image/${auth.currentUser.uid}`);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadURL);
      setUserImage(downloadURL);
      return downloadURL;
    };
    const loademail = async () => { //ローカルのログイン情報から自動ログイン
      let useremail = '';
      try {
        const stringValue = await AsyncStorage.getItem('useremail');
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          useremail = value;
        }
      } catch (e) {
        console.log(e);
      }
      return useremail;
    };
    const loadpassword = async () => {
      let userpassword = '';
      try {
        const stringValue = await AsyncStorage.getItem('userpassword');
        if (stringValue != null) {
          const value = JSON.parse(stringValue);
          userpassword = value;
        }
      } catch (e) {
        console.log(e);
      }
      return userpassword;
    };

    const handleLogin = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user.emailVerified) {
          setIsLogin(true);
          setLoginUser(user);
          setIsTimeout(true);
          console.log('getImage前');
          const image = await getImage();
          console.log(image, 'image画像を表示します');
          setUserImage(image);
          const docdata = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (docdata.data() != undefined) {
            console.log('setInforが実行されました');
            setInfor(docdata.data());
          }
        }
      } catch (error) {
        console.log('Login failed:', error.message);
        if (error.message == `Firebase Storage: Object 'user_image/${auth.currentUser.uid}' does not exist. (storage/object-not-found)`) {
          try {
            console.log('エラー処理実行');
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user.emailVerified) {
              const docdata = await getDoc(doc(db, "users", auth.currentUser.uid));
              if (docdata.data() != undefined) {
                console.log('setInforが実行されました');
                setInfor(docdata.data());
              }
            }
          } catch (e) {
            console.log(e.message);
          }
        }
      }
    };

    const login = async () => {
      let usemail = '';
      let uspassword = '';
      usemail = await loademail();
      uspassword = await loadpassword();
      handleLogin(usemail, uspassword);
    };
    login();
  }, []);

  return (
    <HomeContext.Provider value={{ isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime, myPageNow, setMyPageNow, infor, setInfor, userImage, setUserImage, persondata, setPersondata, scrollcheck, setScrollcheck, unreadMessagesJSON, setUnreadMessageJSON, allChatMessages }}>
      {children}
    </HomeContext.Provider>
  );
};
