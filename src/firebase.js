import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "your_ApiKey",
  authDomain: "*******",
  projectId: "*******",
  storageBucket: "********",
  messagingSenderId: "******",
  appId: "*********",
  measurementId: "*******"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);