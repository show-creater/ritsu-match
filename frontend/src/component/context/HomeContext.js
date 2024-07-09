import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLoadDoc } from '../custom_hook/useLoadDoc';

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [isTimeout, setIsTimeout] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [myPageNow, setMyPageNow] = useState(true); //imagesettingとmypageの切り替え管理
  const [infor, setInfor] = useState({ name: '', heart: 0, faculty: '', image: '', age: 0, comment: '', heart_pushed: [], randomField: 0, userid: '' });
  const [userImage, setUserImage] = useState('');
  const [persondata, setPersondata] = useState([{ name: '', faculty: '', heart: '', image: '', age: 0, comment: '', heart_pushed: [], userid: '', randomField: '' }]);
  const [scrollcheck, setScrollcheck] = useState(false); //読み込みが完了してからスクロールが可能になるように設定
  const [unreadMessagesJSON,setUnreadMessageJSON]=useState({});
  const allChatMessages={}

  useLoadDoc({persondata, setPersondata, setScrollcheck, isLogin});

    return (
      <HomeContext.Provider value={{ isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime, myPageNow, setMyPageNow, infor, setInfor, userImage, setUserImage, persondata, setPersondata, scrollcheck, setScrollcheck,unreadMessagesJSON,setUnreadMessageJSON,allChatMessages}}>
        { children }
      </HomeContext.Provider>
    );
  };
