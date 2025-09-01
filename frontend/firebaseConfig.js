// Import required Firebase modules
import { initializeApp } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const auth=getAuth(app);

// Reference to the "Users" collection
const Users = collection(db, "Users");
const Resources = collection(db, "Resources");
const Feedback = collection(db, "Feedback");
const Admin = collection(db, "Admin");

// Export Users
export { Users, Resources, Feedback, Admin, auth, signInWithEmailAndPassword };
