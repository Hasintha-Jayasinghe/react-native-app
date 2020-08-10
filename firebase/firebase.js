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
const storage = firebase.storage();

const genHash = (password) => {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
};

const checkExists = (username, email) => {
  let exists = false;
  db.ref("users/").on("value", (snapshot) => {
    for (let id in snapshot.val()) {
      const cUsername = snapshot.child(id + "/username").val();
      const cEmail = snapshot.child(id + "/email").val();
      if (cUsername == username || cEmail == email) {
        window.userExists = true;
      }
    }
  });
  exists = window.userExists;
  window.userExists = null;

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
      balance: 100,
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

const uploadImage = async (imageUri, jobTitle, userId) => {
  const path = "jobs/images/" + userId + "/" + jobTitle + "/image.jpg";
  const response = await fetch(imageUri);
  const blob = await response.blob();
  await storage.ref(path).put(blob);

  await storage
    .ref(path)
    .getDownloadURL()
    .then((data) => {
      window.url = data;
    });
  const url = window.url;
  window.url = null;
  return url;
};

export const registerJob = async (
  jobTitle,
  jobPrice,
  jobDes,
  jobCatergory,
  userId,
  imageUri
) => {
  const image = await uploadImage(imageUri);

  const id = Math.random() * 500;
  db.ref("jobs/" + parseInt(id.toString())).set({
    jobTitle: jobTitle,
    jobPrice: jobPrice,
    jobDes: jobDes,
    userId: userId,
    jobCatergory: jobCatergory,
    rating: "0",
    image: image,
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
        const image = snapshot.child(id + "/image").val();
        jobs.push({
          job: job,
          price: price,
          username: username,
          image: image,
          id: id,
        });
      }
    }
  });

  return jobs;
};

export const getJobs = () => {
  const jobs = [];

  db.ref("jobs").on("value", (snapshot) => {
    for (let id in snapshot.val()) {
      const job = snapshot.child(id + "/jobTitle").val();
      const price = snapshot.child(id + "/jobPrice").val();
      const username = getUserById(snapshot.child(id + "/userId").val());
      const userId = snapshot.child(id + "/userId").val();
      const image = snapshot.child(id + "/image").val();

      jobs.push({
        job: job,
        price: price,
        username: username,
        id: id,
        image: image,
        userId: userId,
      });
    }
  });
  return jobs;
};

export const getUsernameById = (userId) => {
  db.ref("users/" + userId).on("value", (snapshot) => {
    window.username = snapshot.child("username").val();
  });
  const username = window.username;
  window.username = null;

  return username;
};

export const getJobDes = (jobId) => {
  db.ref("jobs/" + jobId).on("value", (snapshot) => {
    window.des = snapshot.child("jobDes").val();
  });

  const des = window.des;
  window.des = null;

  return des;
};

export const deleteJob = (jobId) => {
  const userRef = db.ref("jobs/" + jobId);
  userRef.remove();
};

// ? All Needed To Hire
export const processIncome = (userId, amount, buyerId) => {
  db.ref("users/" + userId + "/balance").on("value", (snapshot) => {
    window.newBalance = parseInt(snapshot.val()) + parseInt(amount);
  });
  db.ref("users/" + buyerId + "/balance").on("value", (snapshot) => {
    window.newBuyerBalance = parseInt(snapshot.val()) - amount;
  });
  const newBalance = window.newBalance;
  window.newBalance = null;
  const newBuyerBalance = window.newBuyerBalance;
  window.newBuyerBalance = null;

  db.ref("users/" + userId).update({ balance: newBalance });
  db.ref("users/" + buyerId).update({ balance: newBuyerBalance });
};

export const getBalance = (userId) => {
  db.ref("users/" + userId.toString()).on("value", (snapshot) => {
    window.currentBalance = snapshot.child("balance").val();
  });

  const current = window.currentBalance;
  window.currentBalance = null;

  return current;
};

export const hire = (jobId, buyerId) => {
  const orderId = Math.random() * 809;
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const date = `${year}-${month + 1}-${day}`;

  db.ref("jobs/" + jobId + "/orders/" + parseInt(orderId)).update({
    details: {
      buyer: buyerId,
      date: date,
    },
  });
};

const getUserDetailsById = (userId) => {
  details = [];

  db.ref("users/" + userId).on("value", (snapshot) => {
    const username = snapshot.child("username").val();
    const email = snapshot.child("email").val();
    const firstName = snapshot.child("firstName").val();
    const lastName = snapshot.child("lastName").val();
    details.push({
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
  });

  return details;
};

// ? Function to get orders from a job
export const getOrders = (jobId) => {
  orders = [];
  db.ref("jobs/" + jobId + "/orders").on("value", (snapshot) => {
    for (let orderId in snapshot.val()) {
      const buyerId = snapshot.child(orderId + "/details/buyer").val();
      const date = snapshot.child(orderId + "/details/date").val();
      const userDetails = getUserDetailsById(buyerId);
      const { username, email, firstName, lastName } = userDetails[0];

      orders.push({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        date: date,
      });
    }
  });

  return orders;
};
