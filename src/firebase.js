import firebase from "firebase";

import {FIREBASE_CONFIG} from "./config";

const FIREBASE = firebase.initializeApp(FIREBASE_CONFIG);
export const FIREBASE_SEC = firebase.initializeApp(FIREBASE_CONFIG, "Secondary");
export default FIREBASE;
