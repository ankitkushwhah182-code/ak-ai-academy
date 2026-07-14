// =====================================
// TVK Foundation
// Admin Login
// =====================================

import {
  auth,
  signInWithEmailAndPassword
} from "./firebase.js";

// ==========================
// Admin Email
// ==========================

const ADMIN_EMAIL = "tvkfoundation4@gmail.com";

// ==========================
// Elements
// ==========================

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

// ==========================
// Login
// ==========================

loginBtn.addEventListener("click", login);

async function login() {

    const adminEmail = email.value.trim();
    const adminPassword = password.value;

    msg.innerHTML = "";

    if (adminEmail === "" || adminPassword === "") {

        msg.style.color = "red";
        msg.innerHTML = "Please enter Email & Password";
        return;

    }

    if (adminEmail !== ADMIN_EMAIL) {

        msg.style.color = "red";
        msg.innerHTML = "Access Denied! Admin Only.";
        return;

    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = "Signing In...";

    try {

        await signInWithEmailAndPassword(
            auth,
            adminEmail,
            adminPassword
        );

        msg.style.color = "lime";
        msg.innerHTML = "Admin Login Successful...";

        setTimeout(() => {

            window.location.href = "admin.html";

        }, 800);

    }

    catch (error) {

        msg.style.color = "red";

        switch (error.code) {

            case "auth/invalid-credential":

                msg.innerHTML = "Invalid Email or Password";
                break;

            case "auth/wrong-password":

                msg.innerHTML = "Wrong Password";
                break;

            case "auth/user-not-found":

                msg.innerHTML = "Admin Account Not Found";
                break;

            case "auth/too-many-requests":

                msg.innerHTML = "Too many attempts. Try later.";
                break;

            default:

                msg.innerHTML = error.message;

        }

    }

    finally {

        loginBtn.disabled = false;
        loginBtn.innerHTML = "LOGIN AS ADMIN";

    }

}

// ==========================
// Enter Key Login
// ==========================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        login();

    }

});