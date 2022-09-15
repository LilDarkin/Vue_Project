// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9mgXTbDcK280kUf6I4_49KQR1wiaPGo4",
  authDomain: "integrative-38034.firebaseapp.com",
  databaseURL: "https://integrative-38034-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "integrative-38034",
  storageBucket: "integrative-38034.appspot.com",
  messagingSenderId: "884119849779",
  appId: "1:884119849779:web:b90e76cd8fa76dc40f8c46",
  measurementId: "G-E86WDBRX1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { app, auth }