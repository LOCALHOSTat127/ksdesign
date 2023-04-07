import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE__API__KEY,
    authDomain: process.env.REACT_APP_FIREBASE__AUTH__DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE__PROJECT__ID,
    storageBucket: process.env.REACT_APP_FIREBASE__STORAGE__BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE__MSG__SENDER__ID,
    appId: process.env.REACT_APP_FIREBASE__APP__ID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;