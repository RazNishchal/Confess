// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCSEd4sz7gR34E6JO_M72LdiTVC7ydI-ag",
  authDomain: "confess-here-6608a.firebaseapp.com",
  databaseURL: "https://confess-here-6608a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "confess-here-6608a",
  storageBucket: "confess-here-6608a.firebasestorage.app",
  messagingSenderId: "1092724726168",
  appId: "1:1092724726168:web:d9d240de187bc340a033ed",
  measurementId: "G-NS7VDVKGF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);

export { database, set, ref, onValue };
