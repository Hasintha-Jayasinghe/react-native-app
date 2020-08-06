import * as firebase from "firebase";
const crypto = require("../crypto");

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

const genHash = (password) => {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
};

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
  const hashed = genHash(password);

  const exists = checkExists(username, email);
  if (!exists) {
    const id = Math.random() * 500;

    db.ref("users/" + parseInt(id.toString())).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: hashed,
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
      const hashedPassword = snapshot.child(id + "/password").val();
      const cpassword = genHash(password);

      if (cusername == username) {
        if (cpassword == hashedPassword) {
          window.uId = id.toString();
        }
      }
    }
  });
  let userId = window.uId;
  window.uId = null;
  return userId;
};

export const registerJob = (
  jobTitle,
  jobPrice,
  jobDes,
  jobCatergory,
  userId
) => {
  const id = Math.random() * 500;
  db.ref("jobs/" + parseInt(id.toString())).set({
    jobTitle: jobTitle,
    jobPrice: jobPrice,
    jobDes: jobDes,
    userId: userId,
    jobCatergory: jobCatergory,
    rating: "0",
  });
};

const getUserById = (userId) => {
  db.ref("users/" + userId).on("value", (snapshot) => {
    window.user = snapshot.child("username").val();
  });

  let user = window.user;
  window.user = null;
  return user;
};

export const getUserJobs = (userId) => {
  const jobs = [];

  db.ref("jobs").on("value", (snapshot) => {
    for (let id in snapshot.val()) {
      const cUserId = snapshot.child(id + "/userId").val();
      if (userId == cUserId) {
        const job = snapshot.child(id + "/jobTitle").val();
        const price = snapshot.child(id + "/jobPrice").val();
        const username = getUserById(snapshot.child(id + "/userId").val());
        jobs.push({ job: job, price: price, username: username });
      }
    }
  });

  return jobs;
};

export const getJobsWithLimit = (limit) => {
  const jobs = [];
  let i = 0;

  db.ref("jobs").on("value", (snapshot) => {
    for (let id in snapshot.val()) {
      if (i <= limit) {
        const job = snapshot.child(id + "/jobTitle").val();
        const price = snapshot.child(id + "/jobPrice").val();
        const username = getUserById(snapshot.child(id + "/userId").val());
        jobs.push({ job: job, price: price, username: username });
        i++;
      } else {
        break;
      }
    }
  });

  return jobs;
};
