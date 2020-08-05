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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

const checkExists = (username, email) => {
  let exists = false;
  db.ref("users/").on("value", (snapshot) => {
    for (let id in snapshot.val()) {
      const cusername = snapshot.child(id + "/username").val();
      const cemail = snapshot.child(id + "/email").val();

      if (
        cemail == email ||
        cusername == username ||
        (cemail == email && cusername == username)
      ) {
        exists = true;
      }
    }
  });
  return exists;
};

export const registerUser = (
  firstName,
  lastName,
  email,
  username,
  password
) => {
  const exists = checkExists(username, email);
  if (!exists) {
    const id = Math.random() * 500;

    db.ref("users/" + parseInt(id.toString())).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });

    return id;
  } else {
    return "Exists!";
  }
};

export const loginUser = (username, password) => {
  db.ref("users").on("value", (snapshot) => {
    for (let id in snapshot.val()) {
      const cusername = snapshot.child(id + "/username").val();
      const cpassword = snapshot.child(id + "/password").val();

      if (cusername == username) {
        if (cpassword == password) {
          window.uId = id.toString();
        }
      }
    }
  });
  let userId = window.uId;
  window.uId = null;
  return userId;
};
