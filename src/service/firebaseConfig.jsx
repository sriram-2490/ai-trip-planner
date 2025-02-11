// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZffjPQBkG6wjLDLbDd4Y5bTQdn0N7N0Y",
  authDomain: "travle-planner-6dbe3.firebaseapp.com",
  projectId: "travle-planner-6dbe3",
  storageBucket: "travle-planner-6dbe3.firebasestorage.app",
  messagingSenderId: "1067958386408",
  appId: "1:1067958386408:web:b66a486821c1f9281dd35d",
  measurementId: "G-YWKN4700RP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);