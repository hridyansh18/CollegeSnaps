import { initializeApp }
from "firebase/app";

import { getAuth }
from "firebase/auth";

import {
  getDatabase
} from "firebase/database";

const firebaseConfig = {

  apiKey:
    "AIzaSyCYiIaFnVpZHkjqcV_DgHEb1-PLWEPOyJI",

  authDomain:
    "collegesnaps-73a45.firebaseapp.com",

  databaseURL:
    "https://collegesnaps-73a45-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
    "collegesnaps-73a45",

  storageBucket:
    "collegesnaps-73a45.firebasestorage.app",

  messagingSenderId:
    "120585805165",

  appId:
    "1:120585805165:web:75981172d4f2fbc68e4e64"

};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const database =
  getDatabase(app);