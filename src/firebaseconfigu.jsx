import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBf7ZpEYAX8-UWnS8ylvgDqlcyrnDNAtEg",
  authDomain: "social-media-p-github.firebaseapp.com",
  projectId: "social-media-p-github",
  storageBucket: "social-media-p-github.appspot.com",
  messagingSenderId: "798803408927",
  appId: "1:798803408927:web:2f19d2c342a275c082fd2a",
  measurementId: "G-PR0ZLT3BYH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);