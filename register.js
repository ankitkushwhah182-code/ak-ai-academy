// ========================================
// TVK Foundation
// register.js (Real Firebase Version)
// ========================================

import {
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc
} from "./firebase.js";

// Form
const form = document.getElementById("registerForm");

// Message
const msg = document.getElementById("msg");

form.addEventListener("submit", registerStudent);

async function registerStudent(e) {

    e.preventDefault();

    // Form Values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value;
    const address = document.getElementById("address").value.trim();

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        course === ""
    ) {

        msg.style.color = "red";
        msg.innerHTML = "Please fill all required fields.";
        return;

    }

    try {

        // Create Firebase Auth Account
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        // Save Student Data
        await setDoc(doc(db, "students", user.uid), {

            uid: user.uid,

            name: name,

            email: email,

            phone: phone,

            course: course,

            address: address,

            role: "student",

            status: "Pending",

            paymentStatus: "Pending",

            certificate: false,

            createdAt: new Date().toISOString()

        });

        msg.style.color = "lime";

        msg.innerHTML = "Registration Successful...";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

    }

    catch (error) {

        console.log(error);

        msg.style.color = "red";

        switch (error.code) {

            case "auth/email-already-in-use":

                msg.innerHTML = "Email already registered.";

                break;

            case "auth/invalid-email":

                msg.innerHTML = "Invalid Email.";

                break;

            case "auth/weak-password":

                msg.innerHTML =
                    "Password must be at least 6 characters.";

                break;

            default:

                msg.innerHTML = error.message;

        }

    }

}