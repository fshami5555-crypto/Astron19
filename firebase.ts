import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2s4ArbjS806RI07MyZsKXzaYmWVDNyxE",
  authDomain: "astren2025.firebaseapp.com",
  projectId: "astren2025",
  storageBucket: "astren2025.firebasestorage.app",
  messagingSenderId: "106395777763",
  appId: "1:106395777763:web:70b9c7f4c19a7e680f23d6",
  measurementId: "G-4MV5TFZM3W"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
