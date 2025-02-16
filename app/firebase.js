import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBR__Zo450aaGH6txZ-BGdCayCM5KpXn6c",
  authDomain: "medimate-730c7.firebaseapp.com",
  projectId: "medimate-730c7",
  storageBucket: "medimate-730c7.firebasestorage.app",
  messagingSenderId: "796035205930",
  appId: "1:796035205930:android:51f23ea3927ed7b572ac53",
  databaseURL: "https://medimate-730c7-default-rtdb.firebaseio.com/", // Add databaseURL
};

// ✅ Prevent re-initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Prevent multiple Auth initializations
export const auth = getAuth(app);

if (!auth.app.options) {
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Realtime Database
export const database = getDatabase(app);

// ✅ Export Firebase app
export default app;
