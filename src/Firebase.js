// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
     apiKey: "AIzaSyByRAEn-Uy-t90ZtLoAvTwgeIUNDO26sYQ",
  authDomain: "whatsapp-5567d.firebaseapp.com",
  projectId: "whatsapp-5567d",
  storageBucket: "whatsapp-5567d.appspot.com",
  messagingSenderId: "911978756683",
  appId: "1:911978756683:web:d6d7a7232c56a879f42bce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
