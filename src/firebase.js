// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref, onDisconnect} from "firebase/database"
import "firebase/compat/database"
import firebase from "firebase/compat/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvoPQd8E-zGfu4wG38hLHmOQtExIMAiVA",
  authDomain: "realtime-ract-firebase.firebaseapp.com",
  databaseURL: "https://realtime-ract-firebase-default-rtdb.firebaseio.com",
  projectId: "realtime-ract-firebase",
  storageBucket: "realtime-ract-firebase.appspot.com",
  messagingSenderId: "721315688243",
  appId: "1:721315688243:web:1a2358cc81e317582bd846"
};

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref()


