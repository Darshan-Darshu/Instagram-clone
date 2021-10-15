import {
  initializeApp,
  getApps,
  getApp,
} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbJvqnPWbegg0vFBfJ4y2ACfYZQX6WwEs",
  authDomain: "instagram-14420.firebaseapp.com",
  projectId: "instagram-14420",
  storageBucket: "instagram-14420.appspot.com",
  messagingSenderId: "1060503350183",
  appId: "1:1060503350183:web:4bc9df43028e927dde2482",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
