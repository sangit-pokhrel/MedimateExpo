import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR__Zo450aaGH6txZ-BGdCayCM5KpXn6c",
  authDomain: "medimate-730c7.firebaseapp.com", // Constructed from project_id
  projectId: "medimate-730c7",
  storageBucket: "medimate-730c7.firebasestorage.app",
  messagingSenderId: "796035205930", // Found in project_number
  appId: "1:796035205930:android:51f23ea3927ed7b572ac53", // Found in mobilesdk_app_id
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
