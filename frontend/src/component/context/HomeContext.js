import React, { createContext, useState, useContext, useEffect } from 'react';
const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin]=useState(false);
  

    return (
      <HomeContext.Provider value={{ isLogin, setIsLogin }}>
        { children }
      </HomeContext.Provider>
    );
  };