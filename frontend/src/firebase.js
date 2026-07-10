// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-e6341.firebaseapp.com",
  projectId: "genwebai-e6341",
  storageBucket: "genwebai-e6341.firebasestorage.app",
  messagingSenderId: "876165686448",
  appId: "1:876165686448:web:a7efbb02714b4b7cc5c775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider}