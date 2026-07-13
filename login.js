// ================================
// TVK Foundation
// login.js
// ================================

import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase.js";

// Agar user pehle se login hai
onAuthStateChanged(auth, (user) => {

  if (user) {

    // Admin Email
    if (user.email === "tvkfoundation4@gmail.com") {

      window.location.href = "admin.html";

    } else {

      window.location.href = "student-dashboard.html";

    }

  }

});

// Login Button

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

async function login() {

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const msg = document.getElementById("msg");

  if (email === "" || password === "") {

    msg.style.color = "red";

    msg.innerHTML = "Please enter Email & Password";

    return;

  }

  try {

    await signInWithEmailAndPassword(

      auth,

      email,

      password

    );

    msg.style.color = "lime";

    msg.innerHTML = "Login Successful...";

    // Redirect

    if (email === "tvkfoundation4@gmail.com") {

      setTimeout(() => {

        window.location.href = "admin.html";

      }, 1000);

    } else {

      setTimeout(() => {

        window.location.href = "student-dashboard.html";

      }, 1000);

    }

  } catch (error) {

    msg.style.color = "red";

    switch (error.code) {

      case "auth/user-not-found":

        msg.innerHTML = "User not found.";

        break;

      case "auth/wrong-password":

        msg.innerHTML = "Wrong password.";

        break;

      case "auth/invalid-email":

        msg.innerHTML = "Invalid email.";

        break;

      case "auth/invalid-credential":

        msg.innerHTML = "Invalid email or password.";

        break;

      default:

        msg.innerHTML = error.message;

    }

  }

}