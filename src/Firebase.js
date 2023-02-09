// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCWVsZkBG3ikGP5lLU7O3sCTt9e_xvpow4",
    authDomain: "whatsapp-clone-5b383.firebaseapp.com",
    projectId: "whatsapp-clone-5b383",
    storageBucket: "whatsapp-clone-5b383.appspot.com",
    messagingSenderId: "493150635917",
    appId: "1:493150635917:web:29cafc25e39bf7e8959fc4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
