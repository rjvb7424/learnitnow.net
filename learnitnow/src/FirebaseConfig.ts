// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG6YihaBuiJ4x0UZORp-kH3n6dFpuSUcQ",
  authDomain: "learn-it-now.firebaseapp.com",
  projectId: "learn-it-now",
  storageBucket: "learn-it-now.firebasestorage.app",
  messagingSenderId: "596593120916",
  appId: "1:596593120916:web:a68895b0ea92129605c681",
  measurementId: "G-YTKMR2F90X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };