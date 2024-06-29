import React, { createContext, useState, useContext, useEffect } from 'react';
const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin]=useState(false);
  const [loginUser, setLoginUser]=useState('');
  const [isTimeout, setIsTimeout] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [myPageNow, setMyPageNow] = useState(true);

    return (
      <HomeContext.Provider value={{ isLogin, setIsLogin ,loginUser ,setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime, myPageNow, setMyPageNow}}>
        { children }
      </HomeContext.Provider>
    );
  };