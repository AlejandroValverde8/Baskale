import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API,
    authDomain: "baskale-7d540.firebaseapp.com",
    projectId: "baskale-7d540",
    storageBucket: "baskale-7d540.appspot.com",
    messagingSenderId: "57311874743",
    appId: "1:57311874743:web:71e6f69c64ee58f7b58732",
    databaseURL: "https://baskale-7d540-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  
  //Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);

  