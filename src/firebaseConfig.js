import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
const key = import.meta.env.VITE_SOME_KEY;

const firebaseConfig = {
    apiKey: key,
    authDomain: "react-firebase-auth-34265.firebaseapp.com",
    projectId: "react-firebase-auth-34265",
    storageBucket: "react-firebase-auth-34265.appspot.com",
    messagingSenderId: "1083352087546",
    appId: "1:1083352087546:web:74cccafaed8ac27e660243",
    measurementId: "G-R0Y94DD2JL"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;