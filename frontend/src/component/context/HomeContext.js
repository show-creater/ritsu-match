import React, { createContext, useState, useContext, useEffect } from 'react';
const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin]=useState(false);
  const [loginUser, setLoginUser]=useState('');

    return (
      <HomeContext.Provider value={{ isLogin, setIsLogin ,loginUser ,setLoginUser}}>
        { children }
      </HomeContext.Provider>
    );
  };