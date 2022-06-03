import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const development = process.env.REACT_APP_ENV === "DEV";

// Set the configuration for your app
const firebaseConfig = development
  ? {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY_DEV,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_DEV,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_DEV,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_DEV,
      appId: process.env.REACT_APP_FIREBASE_APP_ID_DEV,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_DEV,
    }
  : {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const fireStore = getFirestore(firebaseApp);
