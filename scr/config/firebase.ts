// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXE0zppTRjjk3oJffJNG2IYUV48GRmHrQ",
  authDomain: "haseebshop-b99d4.firebaseapp.com",
  databaseURL: "https://haseebshop-b99d4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "haseebshop-b99d4",
  storageBucket: "haseebshop-b99d4.firebasestorage.app",
  messagingSenderId: "303059024949",
  appId: "1:303059024949:web:c6ebe170f4a4a6188cc57c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

export default app;
