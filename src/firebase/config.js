// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArD8wxrlZjSpmgYp4OcWixiI0n-v2YBuU",
  authDomain: "toytopia-mdsifat-dev-firebase.firebaseapp.com",
  projectId: "toytopia-mdsifat-dev-firebase",
  storageBucket: "toytopia-mdsifat-dev-firebase.firebasestorage.app",
  messagingSenderId: "586181109033",
  appId: "1:586181109033:web:7321df0954cc372c044338",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
