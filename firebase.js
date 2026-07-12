// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// =========================
// TVK Foundation Firebase Config
// =========================

const firebaseConfig = {
  apiKey: "AIzaSyAQIys7rB9rhZPSnumi7abrfcc4Fyonv1o",
  authDomain: "tvkfoundation-be9ed.firebaseapp.com",
  projectId: "tvkfoundation-be9ed",
  storageBucket: "tvkfoundation-be9ed.firebasestorage.app",
  messagingSenderId: "822818938001",
  appId: "1:822818938001:web:50b1d621c41c124ece7330",
  measurementId: "G-W6WHXEGBCS"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Authentication

const auth = getAuth(app);

// Firestore Database

const db = getFirestore(app);

// Export Everything

export {
  auth,
  db,

  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc
};