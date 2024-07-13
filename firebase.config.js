const dotenv = require('dotenv').config();

export const config = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};