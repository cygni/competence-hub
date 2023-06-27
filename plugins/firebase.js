import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAxPNtT3asb3vcsXIeg-DDKfQQYnY2-eLQ",
  authDomain: "cygni-competence-hub.firebaseapp.com",
  projectId: "cygni-competence-hub",
  storageBucket: "cygni-competence-hub.appspot.com",
  messagingSenderId: "936812239764",
  appId: "1:936812239764:web:c67f45faed8254fd4e8d81",
};

const app = initializeApp(firebaseConfig);
export default defineNuxtPlugin(() => {});
