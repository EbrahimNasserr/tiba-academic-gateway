import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Initialize auth with persistence
const auth = typeof window !== 'undefined' 
  ? initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence]
    })
  : getAuth(app);

export { auth };
export default app; 