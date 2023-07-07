import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
  authDomain: "cygnicompetencehub.firebaseapp.com",
  projectId: "cygnicompetencehub",
  storageBucket: "cygnicompetencehub.appspot.com",
  messagingSenderId: "225273337132",
  appId: "1:225273337132:web:161ab4d7909b78531e0889",
  measurementId: "G-JY96C7V423",
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com/`,
};

// const app = initializeApp({});
export default defineNuxtPlugin(() => {});
