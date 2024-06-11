import React, { createContext, useState, useContext, useEffect } from 'react';
const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin]=useState(false);
  const [loginUser, setLoginUser]=useState('');
  const [talkPage, setTalkPage] = useState(true);

    return (
      <HomeContext.Provider value={{ isLogin, setIsLogin ,loginUser ,setLoginUser, talkPage, setTalkPage}}>
        { children }
      </HomeContext.Provider>
    );
  };