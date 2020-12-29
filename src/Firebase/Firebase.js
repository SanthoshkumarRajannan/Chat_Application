import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBMboOuZb7_HXE5ULqloXv3N5Ul1Ja2UwY",
    authDomain: "chat-application-007.firebaseapp.com",
    databaseURL : "https://chat-application-007-default-rtdb.firebaseio.com/",
    projectId: "chat-application-007",
    storageBucket: "chat-application-007.appspot.com",
    messagingSenderId: "973373312689",
    appId: "1:973373312689:web:24c3933cd2f6c7e0bc5c90",
    measurementId: "G-YHKVMMLE0E"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth,provider};
  export default db;