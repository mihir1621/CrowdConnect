import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// In a real app, you would use a service account key JSON file
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// For this demo, we'll mock the middleware if Firebase isn't configured
let isFirebaseConfigured = false;

try {
    if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
        isFirebaseConfigured = true;
        console.log('Firebase Admin initialized');
    }
} catch (error) {
    console.error('Firebase Admin initialization error:', error);
}

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        if (isFirebaseConfigured) {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
        } else {
            // Mock user for development without Firebase credentials
            req.user = { uid: 'mock-uid-123', email: 'test@example.com' };
        }
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            // Here we would typically fetch the user from MongoDB using req.user.uid
            // and check if their role is in the allowed roles array.
            // For now, we'll just pass it through.
            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error checking role' });
        }
    };
};
