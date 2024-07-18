// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBuvY-WLMSsr9mz6zW9vAx-Wq6eFMTQfvE",
  authDomain: "taskscheduler-429019.firebaseapp.com",
  projectId: "taskscheduler-429019",
  storageBucket: "taskscheduler-429019.appspot.com",
  messagingSenderId: "327223369173",
  appId: "1:327223369173:web:543ad48de9c75fd947315c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
