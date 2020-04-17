import firebase from "firebase";

import {FIREBASE_CONFIG} from "./config";

const FIREBASE = firebase.initializeApp(FIREBASE_CONFIG);
export default FIREBASE;
