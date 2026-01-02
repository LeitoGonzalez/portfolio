import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY8yUwI4Y59WGeizqD7qg7cTlovfCLtoU",
  authDomain: "portfolio-73b81.firebaseapp.com",
  projectId: "portfolio-73b81",
  storageBucket: "portfolio-73b81.firebasestorage.app",
  messagingSenderId: "761628999808",
  appId: "1:761628999808:web:ba246faec7e9a0381da665",
  measurementId: "G-NG6VSTG88Z"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);