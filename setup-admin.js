require("dotenv").config({ path: ".env.local" });
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "admin@iqkhanrentacar.com";
const password = "adminPassword123!";

async function setupAdmin() {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log(`Successfully created admin account: ${email}`);
    } catch (e) {
        if (e.code === 'auth/email-already-in-use') {
            console.log(`Admin account ${email} already exists. Attempting to verify sign in...`);
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log(`Login verified for existing account: ${email}`);
            } catch (loginError) {
                console.log(`Could not verify login. The account might exist with a different password, or there's another error: ${loginError.message}`);

                // Let's create an alternative admin just to be sure there's one that works
                const altEmail = "admin2@iqkhanrentacar.com";
                try {
                    await createUserWithEmailAndPassword(auth, altEmail, password);
                    console.log(`Created alternative admin account: ${altEmail}`);
                } catch (altError) {
                    if (altError.code === 'auth/email-already-in-use') {
                        console.log(`Alternative admin also exists.`);
                    } else {
                        console.log(`Error creating alternative admin: ${altError.message}`);
                    }
                }
            }
        } else {
            console.error("Error creating admin:", e.message);
        }
    }
}

setupAdmin().then(() => process.exit(0));
