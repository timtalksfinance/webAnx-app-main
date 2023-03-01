import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAnIAFjVg5AVRcYY_LEj_Txg3w9WVQYJl0",
  authDomain: "infinite-a66d8.firebaseapp.com",
  projectId: "infinite-a66d8",
  storageBucket: "infinite-a66d8.appspot.com",
  messagingSenderId: "779721660568",
  appId: "1:779721660568:web:8bbc6095f475cdedefd8ed",
  databaseURL: "https://infinite-a66d8-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

export { app, auth, database };
