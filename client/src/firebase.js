import firebase from 'firebase/app';

import 'firebase/auth'; 
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyACFC3NXo6Qrx4Tp0rhhSaiHLUPS7Fuhp0",
  authDomain: "efportfolio-1e4e4.firebaseapp.com",
  databaseURL: "https://efportfolio-1e4e4.firebaseio.com",
  projectId: "efportfolio-1e4e4",
  storageBucket: "efportfolio-1e4e4.appspot.com",
  messagingSenderId: "1033595726429",
  appId: "1:1033595726429:web:de368a6874231c968f7bb4"
});

export default firebase;