import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9ciaaRN-Ss64dRH_rAehVANluRMIlYuw",
  authDomain: "moviestudio-69da8.firebaseapp.com",
  projectId: "moviestudio-69da8",
  storageBucket: "moviestudio-69da8.appspot.com",
  messagingSenderId: "236616441428",
  appId: "1:236616441428:web:4be2bfc9bee9f35b3617c1",
  measurementId: "G-BBSMGK4411",
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
