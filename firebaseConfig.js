// Import the functions you need from the Firebase SDKs, using CDN URLs for browser direct module loading
// Make sure this version matches the latest stable version or the one you intend to use.
// You can check https://firebase.google.com/docs/web/setup#available-libraries for the latest modular CDN URLs.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// IMPORTANT: REPLACE ALL "YOUR_..." PLACEHOLDERS WITH YOUR ACTUAL VALUES
// You can find these in the Firebase Console: Project settings -> General -> Your apps -> Web app -> Config
const firebaseConfig = {
  apiKey: "AIzaSyA9g2cmq0mQx517NBcQMLenbTwtsg9l8u0",
  authDomain: "ecommerce-web-1-ae670.firebaseapp.com",
  projectId: "ecommerce-web-1-ae670",
  storageBucket: "ecommerce-web-1-ae670.firebasestorage.app",
  messagingSenderId: "266350906778",
  appId: "1:266350906778:web:342c543c9d47da7b62fe23",
  measurementId: "G-4LY6ZBP9DF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services you want to use
const db = getFirestore(app);

// Export the initialized Firebase app and services
export { app, db };
