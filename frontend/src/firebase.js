import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBk1LvsUgBi_puUQBbCq9JBMymv7sVgboU",
  authDomain: "cryptoapp-dev-9bee6.firebaseapp.com",
  projectId: "cryptoapp-dev-9bee6",
  storageBucket: "cryptoapp-dev-9bee6.appspot.com",
  messagingSenderId: "479626637198",
  appId: "1:479626637198:web:d1261cd98a9d6e72067edf",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;
