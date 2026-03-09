const admin = require('firebase-admin');
require('dotenv').config();

let db = null;

const initializeFirebase = () => {
    try {
        let credential;

        // Option 1: Use FIREBASE_SERVICE_ACCOUNT_JSON env var (for cloud deployment)
        if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
            credential = admin.credential.cert(serviceAccount);
        } else {
            // Option 2: Use local serviceAccountKey.json file (for local development)
            const serviceAccount = require('../serviceAccountKey.json');
            credential = admin.credential.cert(serviceAccount);
        }

        if (!admin.apps.length) {
            admin.initializeApp({
                credential,
                databaseURL: process.env.DATABASE_URL
            });
        }

        db = admin.database();
        console.log('✅ Firebase Admin initialized successfully');
        return db;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error.message);
        console.warn('⚠️  Using fallback mode - Add serviceAccountKey.json or set FIREBASE_SERVICE_ACCOUNT_JSON env var');
        return null;
    }
};

const getDatabase = () => {
    if (!db) {
        db = initializeFirebase();
    }
    return db;
};

module.exports = {
    initializeFirebase,
    getDatabase,
    admin
};
