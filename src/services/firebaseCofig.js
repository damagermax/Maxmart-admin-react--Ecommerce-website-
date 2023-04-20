import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADfMZjxURnm8oJWOHDgsvao5ZAiNIi_8c",
  authDomain: "max-mart-4e38c.firebaseapp.com",
  projectId: "max-mart-4e38c",
  storageBucket: "max-mart-4e38c.appspot.com",
  messagingSenderId: "138550948939",
  appId: "1:138550948939:web:266e48f6e8103bbbc449ce",
  measurementId: "G-RZKD135Q29",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
