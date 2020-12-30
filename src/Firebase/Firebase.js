import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC5FInHX5Ep4DaMCyKnwkLvJOhdg0bBzTc",
  authDomain: "chat-application-react-project.firebaseapp.com",
  databaseURL: "https://chat-application-react-project-default-rtdb.firebaseio.com",
  projectId: "chat-application-react-project",
  storageBucket: "chat-application-react-project.appspot.com",
  messagingSenderId: "554572504548",
  appId: "1:554572504548:web:da1e40830f5ddcc0f27bf1",
  measurementId: "G-J3VZRKFN21"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth,provider};
  export default db;