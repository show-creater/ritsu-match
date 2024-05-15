import React, { createContext, useState, useContext, useEffect } from 'react';
const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [isLogin, setIsLogin]=useState(false);
  const [loginUser, setLoginUser]=useState({"_redirectEventId": undefined, "apiKey": "AIzaSyA5aMla3E6dssCOGddmvXR1PlZHrnvY1kw", "appName": "[DEFAULT]", "createdAt": "1715765141678", "displayName": undefined, "email": "shiomiaki0918403@gmail.com", "emailVerified": true, "isAnonymous": false, "lastLoginAt": "1715766018993", "phoneNumber": undefined, "photoURL": undefined, "providerData": [[Object]], "stsTokenManager": {"accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyYjIyZmQ0N2VkZTY4MmY2OGZhY2NmZTdjNGNmNWIxMWIxMmI1NGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcml0c3VtYXRjaCIsImF1ZCI6InJpdHN1bWF0Y2giLCJhdXRoX3RpbWUiOjE3MTU3NjYwMzUsInVzZXJfaWQiOiJMa1c0dHNZZ0RyVmk2S1RBdjhpRUdodHV6a0IzIiwic3ViIjoiTGtXNHRzWWdEclZpNktUQXY4aUVHaHR1emtCMyIsImlhdCI6MTcxNTc2NjAzNSwiZXhwIjoxNzE1NzY5NjM1LCJlbWFpbCI6InNoaW9taWFraTA5MTg0MDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2hpb21pYWtpMDkxODQwM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ScYKk-X2XyLEOAyLtCy88aNzfaFzOGXhrXrS3S39LsKkOnooBkUNt1ATZPBj_VyWJPSSJ7f-NKaIXa4D3NDjAsYfxZtZbXt2dVYjByjH1fS4I-QIlpgnfmykJUpNU12sCj08Im8wmCfXbI7xvq2jq4ldJydW9DHEAgL9jaS-8c0a30zaQIwtTZfXvRrAnbFWQgsCqdfT9niiwZ2UqQzsNOVVPMXIJH2JEKqQfcattj5hX9U-g58diSflkiyGlPUHUCbkh_y6YfKKNqau9nZorZIT7XA8QlwKoltcyCE8_lnraG4pe75GXuIdDpdoEb0OKAoUNJECjHC81jawkBGiNQ", "expirationTime": 1715769635492, "refreshToken": "AMf-vBwjirZ2753HKiVp-zyqi6cPpvAIJ3kd86gmewjXnqTib0tdXRm3QDwJIPwNEXOw61LQkEvKbi7E3FCdxoZTxwn24Wz8fWVnB1Xx2x7phxctZJp3dAIN-4gP-4HvcSps6ZMJuJtRZJLFGCXmiGiOTaJNRIg9IetM8VOJdJ3hVciK34wJLEUEheigTUacz4uw98xKGkyMOQmQXMtH83sVz5PnGnXWnQ"}, "tenantId": undefined, "uid": "LkW4tsYgDrVi6KTAv8iEGhtuzkB3"})

    return (
      <HomeContext.Provider value={{ isLogin, setIsLogin ,loginUser ,setLoginUser}}>
        { children }
      </HomeContext.Provider>
    );
  };