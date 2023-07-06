import { initializeApp } from "firebase/app";
import admin from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
  authDomain: "cygnicompetencehub.firebaseapp.com",
  projectId: "cygnicompetencehub",
  storageBucket: "cygnicompetencehub.appspot.com",
  messagingSenderId: "225273337132",
  appId: "1:225273337132:web:161ab4d7909b78531e0889",
  measurementId: "G-JY96C7V423",
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URI,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URI,
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com/`,
};

if (admin.apps.length === 0) {
  admin.initializeApp(firebaseConfig);
}
// const app = initializeApp(firebaseConfig)
export default defineNuxtPlugin(() => {});
