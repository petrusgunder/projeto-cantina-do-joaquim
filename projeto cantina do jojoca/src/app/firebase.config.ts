import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBhuejn-USISsecPyEVstfFHBzdM0RJZVc",
  authDomain: "games-fe5c4.firebaseapp.com",
  projectId: "games-fe5c4",
  storageBucket: "games-fe5c4.firebasestorage.app",
  messagingSenderId: "752543266424",
  appId: "1:752543266424:web:d84172c52e00ee638b9f8d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
