// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);