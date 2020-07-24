import firebase from 'firebase/app';
import 'firebase/firestore';



var firebaseConfig = {
    apiKey: "AIzaSyAppDEGdRHbjprWBB4QeTYscD4a0ZvqAHg",
    authDomain: "svelte-fire-7aa7d.firebaseapp.com",
    databaseURL: "https://svelte-fire-7aa7d.firebaseio.com",
    projectId: "svelte-fire-7aa7d",
    storageBucket: "svelte-fire-7aa7d.appspot.com",
    messagingSenderId: "539365005770",
    appId: "1:539365005770:web:75909bf49feb304c9d1733"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();