// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';  // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCkiC84Ak6gFy0UImx2WAuAdMZd37ML7gw",
  authDomain: "task-manager-601b8.firebaseapp.com",
  projectId: "task-manager-601b8",
  storageBucket: "task-manager-601b8.firebasestorage.app",
  messagingSenderId: "425599791250",
  appId: "1:425599791250:web:0ece28d78f8028f099764b",
  measurementId: "G-9H0YC7C1GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore
// Export the Firebase Auth instance

export { auth, db };
