// Import the functions you need from the SDKs you need
// require('dotenv').config();
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  docRef,
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from '@env';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${APIKEY}`,
  authDomain: `${AUTHDOMAIN}`,
  projectId: `${PROJECTID}`,
  storageBucket: `${STORAGEBUCKET}`,
  messagingSenderId: `${MESSAGINGSENDERID}`,
  appId: `${APPID}`,
  measurementId: `${MEASUREMENTID}`
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  auth,
  db,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  docRef,
  deleteDoc,
};