import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAAzY7NUDkeQga2mdxfr6z71C4KmJjTXXg",
  authDomain: "torneo-website.firebaseapp.com",
  databaseURL: "https://torneo-website.firebaseio.com",
  projectId: "torneo-website",
  storageBucket: "torneo-website.appspot.com",
  messagingSenderId: "820947774041"
};

const settings = {
  timestampsInSnapshots: true
};

export default !firebase.apps.length 
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

export const db = firebase.firestore();
db.settings(settings);

export const firebaseAuth = firebase.auth();