// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZYVgM7DG5DYTi_skYdzlaOKKgaK3M0T8",
  authDomain: "react-next-shop-app-614e7.firebaseapp.com",
  projectId: "react-next-shop-app-614e7",
  storageBucket: "react-next-shop-app-614e7.appspot.com",
  messagingSenderId: "1041503601440",
  appId: "1:1041503601440:web:e489d2b15afa042ea2cd45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
