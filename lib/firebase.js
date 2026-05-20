import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB79HQzi_hr2PbXAkO_4hTbX_7pSvUaZMc",
  authDomain: "only-drive-1.firebaseapp.com",
  projectId: "only-drive-1",
  storageBucket: "only-drive-1.firebasestorage.app",
  messagingSenderId: "324791197478",
  appId: "1:324791197478:web:70c8e40611bcdf71172be7",
  measurementId: "G-ZJQW7T8YYQ"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { app };
