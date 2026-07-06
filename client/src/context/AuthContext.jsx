import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register with Email and Password
    const register = async (email, password, role, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            role: role,
            name: name,
            createdAt: new Date().toISOString()
        });

        return userCredential;
    };

    // Login with Email and Password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Login with Google
    const loginWithGoogle = async (role = 'Donor') => {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        // Check if user document exists, if not create it
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                role: role,
                name: user.displayName,
                profilePicture: user.photoURL,
                createdAt: new Date().toISOString()
            });
        }

        return userCredential;
    };

    // Logout
    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch user role from Firestore
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setCurrentUser({ ...user, ...userDoc.data() });
                    } else {
                        setCurrentUser(user);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
