import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC25YVmfp2j0gWnOOophqBhymGk94GiCqk",
  authDomain: "crm-lite-b92d7.firebaseapp.com",
  projectId: "crm-lite-b92d7",
  storageBucket: "crm-lite-b92d7.firebasestorage.app",
  messagingSenderId: "388084748801",
  appId: "1:388084748801:web:211ecae9d6bcb196a3a600",
  measurementId: "G-2378VFNHJD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
