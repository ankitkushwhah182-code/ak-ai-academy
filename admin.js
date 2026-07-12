// ==============================
// TVK Foundation Admin Panel
// admin.js
// ==============================

import {
    auth,
    db,
    onAuthStateChanged,
    signOut,
    collection,
    getDocs
} from "./firebase.js";

// ------------------------------
// Login Check
// ------------------------------

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    document.getElementById("adminEmail").innerHTML = user.email;

    loadDashboard();

});

// ------------------------------
// Logout
// ------------------------------

window.logout = async function () {

    await signOut(auth);

    window.location.href = "login.html";

};

// ------------------------------
// Dashboard
// ------------------------------

async function loadDashboard(){

    try{

        const studentRef = collection(db,"students");

        const snapshot = await getDocs(studentRef);

        document.getElementById("totalStudents").innerHTML =
        snapshot.size;

        let html="";

        snapshot.forEach(doc=>{

            const data=doc.data();

            html+=`

            <tr>

            <td>${data.name || "-"}</td>

            <td>${data.email || "-"}</td>

            <td>${data.course || "-"}</td>

            <td>

            ${data.status || "Pending"}

            </td>

            </tr>

            `;

        });

        document.getElementById("studentTable").innerHTML=html;

    }

    catch(e){

        console.log(e);

    }

}