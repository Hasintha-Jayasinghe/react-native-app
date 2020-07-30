import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnojNH90gto2LJfBcVMQrsmIbqbSZoCp0",
  authDomain: "schoolappproject-697f2.firebaseapp.com",
  databaseURL: "https://schoolappproject-697f2.firebaseio.com",
  projectId: "schoolappproject-697f2",
  storageBucket: "schoolappproject-697f2.appspot.com",
  messagingSenderId: "261169843364",
  appId: "1:261169843364:web:96b5c62c88ebb829162a31",
  measurementId: "G-002B3BYLFZ",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const storage = firebase.storage();
