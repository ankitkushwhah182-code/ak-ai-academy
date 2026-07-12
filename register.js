// ================================
// TVK Foundation
// register.js
// ================================

import {
  auth,
  db,
  createUserWithEmailAndPassword,
  collection,
  doc,
  setDoc
} from "./firebase.js";

const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const course = document.getElementById("course").value;
  const address = document.getElementById("address").value.trim();

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "students", user.uid), {

      uid: user.uid,
      name: name,
      email: email,
      phone: phone,
      course: course,
      address: address,
      status: "Pending",
      createdAt: new Date().toISOString()

    });

    msg.style.color = "lime";
    msg.innerHTML = "✅ Registration Successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);

  } catch (error) {

    console.error(error);

    msg.style.color = "red";

    switch (error.code) {

      case "auth/email-already-in-use":
        msg.innerHTML = "❌ Email already registered.";
        break;

      case "auth/invalid-email":
        msg.innerHTML = "❌ Invalid email address.";
        break;

      case "auth/weak-password":
        msg.innerHTML = "❌ Password should be at least 6 characters.";
        break;

      default:
        msg.innerHTML = "❌ " + error.message;

    }

  }

});