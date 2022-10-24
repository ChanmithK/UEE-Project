import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZU35f3bUMqhJQ8-jJ5hwY23dm8qEpGmo",
  authDomain: "bloom-36435.firebaseapp.com",
  projectId: "bloom-36435",
  storageBucket: "bloom-36435.appspot.com",
  messagingSenderId: "101442099992",
  appId: "1:101442099992:web:364bac3f3cb275d6c95c6d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);