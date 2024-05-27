// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGlIq_FzcI_m3tDAm9-PO9JWHVPslKEeU",
  authDomain: "clone-8ee84.firebaseapp.com",
  projectId: "clone-8ee84",
  storageBucket: "clone-8ee84.appspot.com",
  messagingSenderId: "822159095364",
  appId: "1:822159095364:web:8d79146b810014307f6e11",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
