import  { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA1PA4uesdUFIzfV7-zC4YKthJstgTU5I",
  authDomain: "konkora-database.firebaseapp.com",
  projectId: "konkora-database",
  storageBucket: "konkora-database.appspot.com", // Fixed storage bucket
  messagingSenderId: "219566941898",
  appId: "1:219566941898:web:1a2fc8162b1fdb8eb1b633",
  measurementId: "G-4TFT9P5G3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
export const initAnalytics = async () => {
  try {
    if (await isSupported()) {
      return getAnalytics(app);
    }
    return null;
  } catch (err) {
    console.warn('Analytics not supported in this environment:', err);
    return null;
  }
};

export default app;
 
 