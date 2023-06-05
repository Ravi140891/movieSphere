import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyABoMryVzpAM3ghn2tGUSLHp15s21adXqg",
  authDomain: "movie-sphere.firebaseapp.com",
  projectId: "movie-sphere",
  storageBucket: "movie-sphere.appspot.com",
  messagingSenderId: "946493215686",
  appId: "1:946493215686:web:7a3d3a0f363d27fb0658c7",
  measurementId: "G-SG6C0S0TSB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
