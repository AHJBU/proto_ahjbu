// Firebase connection utility
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxN3B8IlP4Byw_zqNoo7wIIRrV_3KfNxU",
  authDomain: "ahjbu-com.firebaseapp.com",
  projectId: "ahjbu-com",
  storageBucket: "ahjbu-com.firebasestorage.app",
  messagingSenderId: "911158844467",
  appId: "1:911158844467:web:23f87ee44f83e0c4f11746",
  measurementId: "G-FJG1G1LCYS"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, firebaseDB };
