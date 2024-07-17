// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBbbWcxMI4ZJIEi0jGVL-6rFMd36PV5X1c",
  authDomain: "taskscheduler-feb4b.firebaseapp.com",
  projectId: "taskscheduler-feb4b",
  storageBucket: "taskscheduler-feb4b.appspot.com",
  messagingSenderId: "190416359969",
  appId: "1:190416359969:web:ca3c3404fce86e03b5c960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
