import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let auth;
let db;
let googleProvider;

try {
    // Only initialize if we have an API key
    if (firebaseConfig.apiKey) {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        googleProvider = new GoogleAuthProvider();
    } else {
        console.warn('Firebase config is missing. Authentication will not work.');
        // Provide mock objects so the app doesn't crash
        auth = { onAuthStateChanged: (cb) => { cb(null); return () => { }; } };
        db = {};
        googleProvider = {};
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
    auth = { onAuthStateChanged: (cb) => { cb(null); return () => { }; } };
    db = {};
    googleProvider = {};
}

export { auth, db, googleProvider };
export default app;
