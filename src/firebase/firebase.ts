import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA0qLVevoB4PdKMYy_E9U2K0v_tPwg2RKs',
  authDomain: 'task-buddy-5be35.firebaseapp.com',
  projectId: 'task-buddy-5be35',
  storageBucket: 'task-buddy-5be35.firebasestorage.app',
  messagingSenderId: '213600591212',
  appId: '1:213600591212:web:b4028552d293ac69c0a749',
  measurementId: 'G-QES8HHCBEW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
