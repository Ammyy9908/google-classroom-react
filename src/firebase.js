import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0r1CyrxDJeett2fV-YDUb8PGni_J6i0E",
    authDomain: "classroom-c49d7.firebaseapp.com",
    databaseURL: "https://classroom-c49d7.firebaseio.com",
    projectId: "classroom-c49d7",
    storageBucket: "classroom-c49d7.appspot.com",
    messagingSenderId: "447223160930",
    appId: "1:447223160930:web:d479bd20e92a138153f13b",
    measurementId: "G-F6ZR7NMZNE"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const auth = app.auth();
  const gp = new firebase.auth.GoogleAuthProvider();
  const db = app.firestore();
  export {auth,gp,db};