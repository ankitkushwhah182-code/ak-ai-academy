// login.js

import {
  auth,
  signInWithEmailAndPassword
} from "./firebase.js";

// Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

// Login Function
loginBtn.addEventListener("click", async () => {

    const userEmail = email.value.trim();
    const userPassword = password.value;

    if (userEmail === "" || userPassword === "") {
        msg.innerHTML = "⚠️ Please enter Email & Password";
        msg.style.color = "orange";
        return;
    }

    try {

        await signInWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        msg.innerHTML = "✅ Login Successful...";
        msg.style.color = "lime";

        setTimeout(() => {

            window.location.href = "admin.html";

        }, 1000);

    } catch (error) {

        console.log(error);

        switch (error.code) {

            case "auth/invalid-email":
                msg.innerHTML = "❌ Invalid Email";
                break;

            case "auth/user-not-found":
                msg.innerHTML = "❌ User Not Found";
                break;

            case "auth/wrong-password":
                msg.innerHTML = "❌ Wrong Password";
                break;

            case "auth/invalid-credential":
                msg.innerHTML = "❌ Invalid Email or Password";
                break;

            default:
                msg.innerHTML = "❌ " + error.message;

        }

        msg.style.color = "red";
    }

});