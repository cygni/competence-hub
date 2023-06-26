// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD8J4I7DT9EAfqxXO8FZWLXm17_I7KLxfs",
  authDomain: "competence-hub.firebaseapp.com",
  projectId: "competence-hub",
  storageBucket: "competence-hub.appspot.com",
  messagingSenderId: "348871633146",
  appId: "1:348871633146:web:a660f88f12d9b4b4b24143",
};

const app = initializeApp(firebaseConfig);
export default defineNuxtPlugin(() => {});
