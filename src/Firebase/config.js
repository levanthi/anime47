import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCYDt-OpLvuOya8wGP0BlUJ9J_TGVGJvEk",
  authDomain: "anime47-e1c56.firebaseapp.com",
  projectId: "anime47-e1c56",
  storageBucket: "anime47-e1c56.appspot.com",
  messagingSenderId: "20461960064",
  appId: "1:20461960064:web:c73e00ac242fac13679f65",
  measurementId: "G-HH8QP7RFJQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)