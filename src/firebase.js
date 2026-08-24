// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth }     from "firebase/auth";
import { getStorage }  from "firebase/storage";
// (측정이 필요 없다면 analytics 생략하셔도 됩니다)
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCF-VkBwK00M3f7ni5SBlv3K1-H5UvqnAI",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "jihun-af54b.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "jihun-af54b",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "jihun-af54b.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "170957318472",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:170957318472:web:b1e338324d946aa0662b7d",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-HPEHB29YSL"
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app); // 측정 안 쓰시면 주석 처리

