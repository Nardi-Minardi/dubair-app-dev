import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, } from "firebase/auth";
// import { GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcUlsXeyNvDFsQK62xLuj8M1jgVQxdIIk",
  authDomain: "dubair-77c5b.firebaseapp.com",
  projectId: "dubair-77c5b",
  storageBucket: "dubair-77c5b.appspot.com",
  messagingSenderId: "711664493630",
  appId: "1:711664493630:web:2b0129136aa7ddd1905d6f",
  measurementId: "G-QNHDH0CRL0"
};

// const app = initializeApp(firebaseConfig);

// export const googleProvider = new GoogleAuthProvider();
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const firebaseProjectId = firebaseConfig.projectId;
export const firebaseApiKey = firebaseConfig.apiKey;
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);