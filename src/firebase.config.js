import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9_BB3F9JC5mgRthkPSKU84-MYnGXr18c",
  authDomain: "foodapp-8794a.firebaseapp.com",
  databaseURL: "https://foodapp-8794a-default-rtdb.firebaseio.com",
  projectId: "foodapp-8794a",
  storageBucket: "foodapp-8794a.appspot.com",
  messagingSenderId: "746154603019",
  appId: "1:746154603019:web:249c92f0383ec8394c4d0e",
  measurementId: "G-TFPHXPN51Z"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
