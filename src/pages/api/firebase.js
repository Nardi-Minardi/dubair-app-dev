import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAvS4kWKBn0BRQCG63LY4AiCgLj7VK0-4A",
//   authDomain: "al-playground-labs.firebaseapp.com",
//   projectId: "al-playground-labs",
//   storageBucket: "al-playground-labs.appspot.com",
//   messagingSenderId: "419356635890",
//   appId: "1:419356635890:web:769c028997a0762961566b",
//   measurementId: "G-CVQTX3GY3L"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBcUlsXeyNvDFsQK62xLuj8M1jgVQxdIIk",
  authDomain: "dubair-77c5b.firebaseapp.com",
  projectId: "dubair-77c5b",
  storageBucket: "dubair-77c5b.appspot.com",
  messagingSenderId: "711664493630",
  appId: "1:711664493630:web:2b0129136aa7ddd1905d6f",
  measurementId: "G-QNHDH0CRL0"
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
// export const facebookProvider = new FacebookAuthProvider();