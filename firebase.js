// firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyBT4U1i8EEDziwBWb-vT_J05fA4CMEzHeA",
  authDomain: "lab2atmd.firebaseapp.com",
  projectId: "lab2atmd",
  storageBucket: "lab2atmd.appspot.com",
  messagingSenderId: "731322141664",
  appId: "1:731322141664:web:fd99440646b96b94f07985"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

