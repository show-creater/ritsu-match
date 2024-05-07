// Import the functions you need from the SDKs you need
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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5aMla3E6dssCOGddmvXR1PlZHrnvY1kw",
  authDomain: "ritsumatch.firebaseapp.com",
  projectId: "ritsumatch",
  storageBucket: "ritsumatch.appspot.com",
  messagingSenderId: "166191142782",
  appId: "1:166191142782:web:5eb69cca84564b66df852f",
  measurementId: "G-PW53BQCRZ9"
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
  updateDoc,
  docRef,
  deleteDoc,
};