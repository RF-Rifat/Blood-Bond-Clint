// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJMKun3TZM0mMtdndyBlSh4ghvHES_YPw",
  authDomain: "bloodbond-1911f.firebaseapp.com",
  projectId: "bloodbond-1911f",
  storageBucket: "bloodbond-1911f.appspot.com",
  messagingSenderId: "322775750610",
  appId: "1:322775750610:web:3c062140c7e3c46e5cda0b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
